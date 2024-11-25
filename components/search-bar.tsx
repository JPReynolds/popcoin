"use client"

import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");

    const updateQueryParams = useDebounce((newQuery: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newQuery) {
          params.set("query", newQuery);
        } else {
          params.delete("query");
        }
        router.push(`?${params.toString()}`);
    }, 400)
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQuery(newQuery);

      updateQueryParams(newQuery)

    };
  
    return (
      <div className="relative w-full max-w-sm">
        <Search 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" 
            size={18}
        />
        <Input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
            className="pl-9"
        />
      </div>
    );
  };