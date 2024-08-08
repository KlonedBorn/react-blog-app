import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "view";

export default function useView() {
  // Load the initial view from localStorage or default to "explore"
  const [view, setView] = useState(() => {
    const storedView = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedView ? storedView : "explore";
  });

  // Update localStorage whenever the view changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, view);
  }, [view]);

  return [view, setView];
}
