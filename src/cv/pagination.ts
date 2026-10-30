import { uid } from "@/cv/geometry";
import { computeElementAutoHeight, resizeElementWithFlow } from "@/cv/profile";
import type { CVElement, Doc, Page } from "@/cv/types";
import { PAGE_H, SHEET } from "@/cv/types";

export const TEMPLATE_ID_RE =
  /^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-\d+$|^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-/;

const TOP_FLOW_Y = 48;
const BOTTOM_SAFE_Y = PAGE_H - 18; // 1105px (leaves 18px bottom margin before 1123px)
const PULLBACK_SAFE_Y = PAGE_H - 24; // 1099px when pulling back to previous page

export function isStudioFreeElement(el: CVElement): boolean {
  if (el.hidden) return false;
  if (el.type === "photo" && Boolean(el.content.src)) return true;
  if (!el.bind && !TEMPLATE_ID_RE.test(el.id)) return true;
  return false;
}

export function isDecorativeElement(el: CVElement): boolean {
  if (el.type === "rect" || el.type === "ellipse" || el.type === "photo") return true;
  if (el.type === "rule" && (el.h > 200 || el.y < 180)) return true;
  // Creative template bottom dark footer text (unbound text element with light color at bottom)
  if (
    el.type === "text" &&
    !el.bind &&
    TEMPLATE_ID_RE.test(el.id) &&
    el.y >= 1000 &&
    (el.style.color === "#b7b1a6" || el.style.color === "#f6f3ec")
  ) {
    return true;
  }
  return false;
}

export function isFlowableElement(el: CVElement): boolean {
  if (el.hidden) return false;
  if (isStudioFreeElement(el)) return false;
  if (isDecorativeElement(el)) return false;
  if (el.bind) {
    return ["summary", "experience", "education", "skills", "languages"].includes(el.bind.kind);
  }
  // Template section heading or horizontal divider rule in the body
  if (el.type === "heading" && TEMPLATE_ID_RE.test(el.id) && el.y >= 40) {
    return true;
  }
  if (el.type === "rule" && TEMPLATE_ID_RE.test(el.id) && el.h <= 6 && el.y >= 180) {
    return true;
  }
  return false;
}

export function horizontalOverlap(a: { x: number; w: number }, b: { x: number; w: number }): number {
  return Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
}

export function boxesOverlap(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number },
  pad = 0,
): boolean {
  return (
    a.x < b.x + b.w + pad &&
    a.x + a.w + pad > b.x &&
    a.y < b.y + b.h + pad &&
    a.y + a.h + pad > b.y
  );
}

export type FlowGroup = {
  elements: CVElement[];
  x: number;
  w: number;
  top: number;
  bottom: number;
  height: number;
};

/**
 * Groups flowable elements on a page so that each section heading (and divider rule)
 * stays attached to the first bound element immediately below it in the same column.
 * Never splits a heading from its first content block.
 */
export function buildColumnFlowGroups(flowElements: CVElement[]): FlowGroup[] {
  if (!flowElements.length) return [];
  const sorted = [...flowElements].sort((a, b) => (Math.abs(a.y - b.y) <= 4 ? a.x - b.x : a.y - b.y));
  const used = new Set<string>();
  const groups: FlowGroup[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const el = sorted[i];
    if (used.has(el.id)) continue;

    // If this is an unbound template heading or divider rule, attach it to the next bound element in the same column
    if (!el.bind && (el.type === "heading" || el.type === "rule")) {
      const groupEls: CVElement[] = [el];
      used.add(el.id);

      let lastBottom = el.y + el.h;
      for (let j = i + 1; j < sorted.length; j++) {
        const candidate = sorted[j];
        if (used.has(candidate.id)) continue;
        if (horizontalOverlap(el, candidate) <= 32) continue;
        const vGap = candidate.y - lastBottom;
        if (vGap >= -12 && vGap <= 56) {
          groupEls.push(candidate);
          used.add(candidate.id);
          lastBottom = Math.max(lastBottom, candidate.y + candidate.h);
          if (candidate.bind) break; // Attached to the first bound element of the section
        }
      }

      const top = Math.min(...groupEls.map((e) => e.y));
      const bottom = Math.max(...groupEls.map((e) => e.y + e.h));
      const minX = Math.min(...groupEls.map((e) => e.x));
      const maxRight = Math.max(...groupEls.map((e) => e.x + e.w));
      groups.push({
        elements: groupEls,
        x: minX,
        w: maxRight - minX,
        top,
        bottom,
        height: bottom - top,
      });
    } else {
      used.add(el.id);
      groups.push({
        elements: [el],
        x: el.x,
        w: el.w,
        top: el.y,
        bottom: el.y + el.h,
        height: el.h,
      });
    }
  }

  return groups.sort((a, b) => a.top - b.top);
}

/**
 * Checks if a Studio free element blocks automatic pagination on a page
 * (e.g. a free element overlaps or sits in the flow column where bound elements overflow).
 */
export function hasFreeElementBlockingPagination(page: Page): boolean {
  const freeEls = page.elements.filter(isStudioFreeElement);
  if (!freeEls.length) return false;
  const flowEls = page.elements.filter(isFlowableElement);
  const hasOverflow = flowEls.some((el) => el.y + el.h > BOTTOM_SAFE_Y);
  if (!hasOverflow) return false;

  for (const free of freeEls) {
    for (const flow of flowEls) {
      if (horizontalOverlap(free, flow) > 24 && free.y >= flow.y - 40) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Ensures all bound flow elements on every page have at least their auto-computed height
 * so no text is visually clipped, shifting following elements in the same column via resizeElementWithFlow.
 */
function ensureAutoHeightsOnPages(doc: Doc): Doc {
  const pages = doc.pages.map((page) => {
    let nextPage = page;
    // Sort top-to-bottom so flow adjustments cascade downwards in order
    const boundIds = [...nextPage.elements]
      .filter((el) => !el.hidden && el.bind && ["summary", "experience", "education", "skills", "languages"].includes(el.bind.kind))
      .sort((a, b) => a.y - b.y)
      .map((el) => el.id);

    for (const id of boundIds) {
      const currentEl = nextPage.elements.find((e) => e.id === id);
      if (!currentEl) continue;
      const neededH = computeElementAutoHeight(currentEl);
      if (neededH > currentEl.h + 2) {
        nextPage = resizeElementWithFlow(nextPage, id, neededH);
      }
    }
    return nextPage;
  });
  return { ...doc, pages };
}

/**
 * Main A4 automatic pagination engine for bound elements in Guided mode (and explicit pagination action).
 * - Preserves Studio free elements (never moves or deletes them).
 * - Pulls flow groups back to previous page when content is shortened and space becomes available.
 * - Pushes overflowing flow groups (above 1123px) to the next page (creating it if needed).
 * - Removes trailing empty pages if they contain no Studio free elements.
 */
export function paginateDocFlow(
  inputDoc: Doc,
  options?: { force?: boolean },
): { doc: Doc; blockedByFreeElement: boolean } {
  const force = Boolean(options?.force);
  const workingDoc = ensureAutoHeightsOnPages(inputDoc);
  let blockedByFreeElement = false;

  const pages: Page[] = workingDoc.pages.map((p) => ({
    ...p,
    elements: p.elements.map((el) => ({ ...el })),
  }));

  // STEP 1: PULL-BACK PASS (When content on page p was shortened, pull groups from page p+1 back to page p)
  for (let p = 0; p < pages.length - 1; p++) {
    const currPage = pages[p];
    const nextPage = pages[p + 1];

    if (!force && hasFreeElementBlockingPagination(currPage)) {
      continue;
    }

    const nextFlowEls = nextPage.elements.filter(isFlowableElement);
    if (!nextFlowEls.length) continue;

    const nextGroups = buildColumnFlowGroups(nextFlowEls);
    const pulledElementIds = new Set<string>();

    for (const group of nextGroups) {
      // Find the bottom-most element in the same column on currPage (excluding decorative footers/full-height rects)
      const sameColOnCurr = currPage.elements.filter((el) => {
        if (el.hidden) return false;
        if (isDecorativeElement(el)) return false;
        return horizontalOverlap(el, group) > 32;
      });

      // Only pull back into a column consecutively: if a previous group in the same column on nextPage wasn't pulled, don't jump over it
      const skippedEarlierInSameCol = nextGroups.some(
        (earlier) =>
          earlier.top < group.top &&
          horizontalOverlap(earlier, group) > 32 &&
          !earlier.elements.every((e) => pulledElementIds.has(e.id)),
      );
      if (skippedEarlierInSameCol) continue;

      const colBottom = sameColOnCurr.length
        ? Math.max(...sameColOnCurr.map((e) => e.y + e.h))
        : TOP_FLOW_Y;

      const gap = group.elements[0]?.type === "heading" ? 18 : 12;
      const targetTop = sameColOnCurr.length ? colBottom + gap : TOP_FLOW_Y;
      const targetBottom = targetTop + group.height;

      if (targetBottom <= PULLBACK_SAFE_Y) {
        const dy = targetTop - group.top;
        const movedEls = group.elements.map((el) => ({
          ...el,
          y: Math.round(el.y + dy),
        }));

        // Check that movedEls won't collide with any Studio free element on currPage
        const freeOnCurr = currPage.elements.filter(isStudioFreeElement);
        const collidesWithFree = movedEls.some((mEl) =>
          freeOnCurr.some((fEl) => boxesOverlap(mEl, fEl, 4)),
        );

        if (!collidesWithFree) {
          currPage.elements.push(...movedEls);
          for (const mEl of movedEls) pulledElementIds.add(mEl.id);
        }
      }
    }

    if (pulledElementIds.size > 0) {
      nextPage.elements = nextPage.elements.filter((el) => !pulledElementIds.has(el.id));

      // Shift remaining flow groups on nextPage up cleanly to TOP_FLOW_Y per column
      const remainingFlow = nextPage.elements.filter(isFlowableElement);
      if (remainingFlow.length > 0) {
        const remGroups = buildColumnFlowGroups(remainingFlow);
        // Group by distinct columns
        const shiftedIds = new Set<string>();
        for (const rg of remGroups) {
          if (rg.elements.some((e) => shiftedIds.has(e.id))) continue;
          const colGroups = remGroups.filter((g) => horizontalOverlap(g, rg) > 32);
          const minTop = Math.min(...colGroups.map((g) => g.top));
          const shiftUp = TOP_FLOW_Y - minTop;
          if (Math.abs(shiftUp) >= 2) {
            const colElIds = new Set(colGroups.flatMap((g) => g.elements.map((e) => e.id)));
            nextPage.elements = nextPage.elements.map((el) => {
              if (colElIds.has(el.id)) {
                shiftedIds.add(el.id);
                return { ...el, y: Math.max(24, Math.round(el.y + shiftUp)) };
              }
              return el;
            });
          }
        }
      }
    }
  }

  // STEP 2: FORWARD PAGINATION PASS (Move groups that exceed PAGE_H onto the next page)
  let pIdx = 0;
  const MAX_PAGES = 8;
  while (pIdx < pages.length && pages.length <= MAX_PAGES) {
    const page = pages[pIdx];
    const flowEls = page.elements.filter(isFlowableElement);
    const overflowingEls = flowEls.filter((el) => el.y + el.h > BOTTOM_SAFE_Y);

    if (!overflowingEls.length) {
      pIdx += 1;
      continue;
    }

    if (!force && hasFreeElementBlockingPagination(page)) {
      blockedByFreeElement = true;
      pIdx += 1;
      continue;
    }

    const groups = buildColumnFlowGroups(flowEls);
    // Find groups to move to page pIdx + 1:
    // In any column where a group overflows BOTTOM_SAFE_Y (and is not already the first group at the very top of the page),
    // move that group and all subsequent groups in the same column to the next page.
    const groupsToMove: FlowGroup[] = [];
    const movedGroupSet = new Set<FlowGroup>();

    for (const g of groups) {
      if (movedGroupSet.has(g)) continue;
      const isAtVeryTop = g.top <= TOP_FLOW_Y + 16;
      if (g.bottom > BOTTOM_SAFE_Y && !isAtVeryTop) {
        // Move this group and all groups below it in the same column
        for (const candidate of groups) {
          if (movedGroupSet.has(candidate)) continue;
          if (candidate.top >= g.top && horizontalOverlap(candidate, g) > 32) {
            movedGroupSet.add(candidate);
            groupsToMove.push(candidate);
          }
        }
      }
    }

    if (!groupsToMove.length) {
      pIdx += 1;
      continue;
    }

    // Ensure next page exists
    if (pIdx + 1 >= pages.length) {
      const nextNum = pages.length + 1;
      const existingId = `page-${nextNum}`;
      const newPageId = pages.some((pg) => pg.id === existingId) ? `page-${uid()}` : existingId;
      pages.push({
        id: newPageId,
        name: `Page ${nextNum}`,
        background: page.background || SHEET,
        elements: [],
      });
    }

    const nextPage = pages[pIdx + 1];
    const movingIds = new Set(groupsToMove.flatMap((g) => g.elements.map((e) => e.id)));

    // Remove moving elements from current page
    page.elements = page.elements.filter((el) => !movingIds.has(el.id));

    // Position moved groups at the top of nextPage (per column), preserving internal spacing
    const processedCols = new Set<FlowGroup>();
    const newlyPlacedOnNext: CVElement[] = [];

    for (const g of groupsToMove) {
      if (processedCols.has(g)) continue;
      const colMovedGroups = groupsToMove
        .filter((cg) => horizontalOverlap(cg, g) > 32)
        .sort((a, b) => a.top - b.top);
      colMovedGroups.forEach((cg) => processedCols.add(cg));

      let cursorY = TOP_FLOW_Y;
      for (let i = 0; i < colMovedGroups.length; i++) {
        const cg = colMovedGroups[i];
        if (i > 0) {
          const prevCg = colMovedGroups[i - 1];
          const originalGap = Math.max(10, Math.min(32, cg.top - prevCg.bottom));
          cursorY += originalGap;
        }
        const dy = cursorY - cg.top;
        for (const el of cg.elements) {
          newlyPlacedOnNext.push({
            ...el,
            y: Math.round(el.y + dy),
          });
        }
        cursorY += cg.height;
      }

      // If nextPage already had flow elements in this column, shift them down below cursorY + 16
      const existingInCol = nextPage.elements.filter(
        (el) => isFlowableElement(el) && horizontalOverlap(el, g) > 32,
      );
      if (existingInCol.length > 0) {
        const minExistingY = Math.min(...existingInCol.map((e) => e.y));
        if (minExistingY < cursorY + 16) {
          const pushDown = cursorY + 16 - minExistingY;
          const existingIds = new Set(existingInCol.map((e) => e.id));
          nextPage.elements = nextPage.elements.map((el) =>
            existingIds.has(el.id) ? { ...el, y: Math.round(el.y + pushDown) } : el,
          );
        }
      }
    }

    nextPage.elements = [...newlyPlacedOnNext, ...nextPage.elements];
    pIdx += 1;
  }

  // STEP 3: CLEAN UP EMPTY TRAILING/INTERMEDIATE PAGES (Page >= 2) THAT HAVE NO STUDIO FREE BLOCKS
  const cleanedPages = pages.filter((page, idx) => {
    if (idx === 0) return true; // Always keep Page 1
    const hasFree = page.elements.some(isStudioFreeElement);
    if (hasFree) return true; // Never delete a page with Studio free blocks
    const hasVisibleContent = page.elements.some((el) => !el.hidden && !isDecorativeElement(el));
    return hasVisibleContent;
  });

  // Normalize standard page names ("Page 1", "Page 2", ...) if they follow the default naming pattern
  const finalPages = cleanedPages.map((page, idx) => {
    const isDefaultName = /^Page \d+$/i.test(page.name.trim());
    return {
      ...page,
      name: isDefaultName ? `Page ${idx + 1}` : page.name,
    };
  });

  return {
    doc: {
      ...workingDoc,
      pages: finalPages,
    },
    blockedByFreeElement,
  };
}

/**
 * Compacts vertical spacing on a page without reducing font sizes,
 * then runs pagination so blocks that now fit on earlier pages move up.
 */
export function compactPageSpacing(doc: Doc, targetPageId?: string): Doc {
  const pages = doc.pages.map((page) => {
    if (targetPageId && page.id !== targetPageId) return page;
    const flowEls = page.elements.filter(isFlowableElement);
    if (!flowEls.length) return page;

    // Fit each bound element's height tightly to its required auto height
    const fittedElements = page.elements.map((el) => {
      if (!el.hidden && el.bind && ["summary", "experience", "education", "skills", "languages"].includes(el.bind.kind)) {
        const autoH = computeElementAutoHeight(el);
        return { ...el, h: autoH };
      }
      return el;
    });

    const groups = buildColumnFlowGroups(fittedElements.filter(isFlowableElement));
    const processed = new Set<FlowGroup>();
    const yPatches = new Map<string, number>();

    for (const g of groups) {
      if (processed.has(g)) continue;
      const colGroups = groups
        .filter((cg) => horizontalOverlap(cg, g) > 32)
        .sort((a, b) => a.top - b.top);
      colGroups.forEach((cg) => processed.add(cg));

      if (!colGroups.length) continue;
      let cursorY = colGroups[0].top;

      for (let i = 0; i < colGroups.length; i++) {
        const cg = colGroups[i];
        if (i > 0) {
          const isSectionStart = cg.elements[0]?.type === "heading" || cg.elements[0]?.type === "rule";
          cursorY += isSectionStart ? 12 : 8;
        }
        const dy = cursorY - cg.top;
        for (const el of cg.elements) {
          yPatches.set(el.id, Math.max(24, Math.round(el.y + dy)));
        }
        cursorY += cg.height;
      }
    }

    return {
      ...page,
      elements: fittedElements.map((el) => (yPatches.has(el.id) ? { ...el, y: yPatches.get(el.id)! } : el)),
    };
  });

  return paginateDocFlow({ ...doc, pages }, { force: true }).doc;
}
