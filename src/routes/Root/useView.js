import { useContext, useEffect, useState } from "react";
import { ViewContext } from "./ViewContext";

export default function useView() {
  const context = useContext(ViewContext);
  const [view, setView] = useState(context);
  useEffect(() => {}, []);
  return [view, setView];
}
