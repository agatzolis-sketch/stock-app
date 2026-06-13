import { createContext, useContext } from "react";

const ApiKeysContext = createContext({
  apiKeys: { alphaVantage: "", anthropic: "", finnhub: "" },
  setApiKeys: () => {},
});

export const ApiKeysProvider = ApiKeysContext.Provider;
export const useApiKeys = () => useContext(ApiKeysContext);
export default ApiKeysContext;
