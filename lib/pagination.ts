export const ELLIPSIS = "ELLIPSIS" as const;
export type PaginationItemType = number | typeof ELLIPSIS;

export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): PaginationItemType[] => {
  const totalPageNumbers = siblingCount + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    return [...Array.from({ length: leftItemCount }, (_, i) => i + 1), ELLIPSIS, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    return [1, ELLIPSIS, ...Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1)];
  }

  return [
    1,
    ELLIPSIS,
    ...Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i),
    ELLIPSIS,
    totalPages
  ];
};