import { useState, useEffect } from "react";

export const useGlobalSearch = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + K para abrir busca global
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setIsSearchVisible(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openSearch = () => setIsSearchVisible(true);
  const closeSearch = () => setIsSearchVisible(false);

  return {
    isSearchVisible,
    openSearch,
    closeSearch
  };
};