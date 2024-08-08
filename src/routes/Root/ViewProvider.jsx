import { ViewContext } from "./ViewContext";

export default function ViewProvider({ children }) {
  return <ViewContext.Provider value={"view"}>{children}</ViewContext.Provider>;
}
