"use client"
 
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { Genres } from "@/app/types"
import { useSearchParams, useRouter } from "next/navigation"

const fetchGenres = async (): Promise<Genres> => {
  const res = await fetch('/api/genres');
  if (!res.ok) {
    throw new Error('Failed to fetch genres');
  }
  return res.json();
};


const genresOptions = queryOptions({
    queryKey: ["genres"],
    queryFn: fetchGenres,
})

export function MovieGenreDropdown() {
  const [open, setOpen] = React.useState(false)
  const searchParams = useSearchParams();
  const genreParams = searchParams.get("genres");
  const router = useRouter();

  const { data, isPending } = useQuery<Genres>(genresOptions);

  const selectedGenres = genreParams ? genreParams.split(',').map(Number) : [];

  const handleSelect = (genreId: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (selectedGenres.includes(genreId)) {
      const updatedGenres = selectedGenres.filter(id => id !== genreId);
      if (updatedGenres.length === 0) {
        newParams.delete('genres');
      } else {
        newParams.set('genres', updatedGenres.join(','));
      }
    } else {
      const updatedGenres = [...selectedGenres, genreId];
      newParams.set('genres', updatedGenres.join(','));
    }
    
    router.push(`?${newParams.toString()}`);
  };
  
  if (isPending) return <div>Loading...</div>
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          Genre
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search genres..." />
          <CommandList>
            <CommandEmpty>No genres found.</CommandEmpty>
            <CommandGroup>
              {data?.map((genre) => (
                <CommandItem
                  key={genre.id}
                  value={genre.name}
                  onSelect={() => {
                    handleSelect(genre.id)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      Boolean(selectedGenres?.includes(genre.id)) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {genre.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}