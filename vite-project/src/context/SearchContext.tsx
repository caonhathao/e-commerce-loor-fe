import { createContext, useState } from "react";

export const SearchContext = createContext<{
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}>({ searchQuery: "", setSearchQuery: () => {} });

// Provider
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
