import { useEffect, useState } from "react";

/**
 * Calculates page numbers for report sections during print
 * Assumes A4 page height
 */
export function usePageTracker() {
  const [pageMap, setPageMap] = useState({});

  useEffect(() => {
    // Delay to ensure layout is fully rendered
    setTimeout(() => {
      const PAGE_HEIGHT = 1122; // approx A4 height in px
      const elements = document.querySelectorAll("[data-index-id]");
      const map = {};

      elements.forEach((el) => {
        const id = el.getAttribute("data-index-id");
        const offsetTop = el.offsetTop;
        const pageNumber = Math.floor(offsetTop / PAGE_HEIGHT) + 1;
        map[id] = pageNumber;
      });

      setPageMap(map);
    }, 500);
  }, []);

  return pageMap;
}
