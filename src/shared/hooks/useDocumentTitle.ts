import { useEffect, useRef } from "react";

export const useDocumentTitle = (title?: string) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    const originalTitle = defaultTitle.current;

    if (title && document.title !== title) {
      document.title = title;
    }

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};
