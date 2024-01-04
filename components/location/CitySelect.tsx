import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { cities } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usefetchAllCities } from "@/lib/queries/queriesAndMutations";
import { useLocationContext } from "@/context/LocationContext";
import { ProvinceSelect } from ".";

const CitySelect = () => {

  const { position, setPosition } = useLocationContext();
  const { data: allCities } = usefetchAllCities();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full md:mt-3 flex flex-col justify-start items-start gap-2 md:gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between rounded-md">
            {position.city}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 bg-light text-dark">
          <Command>
            <CommandInput placeholder="Search city..." />
            <ScrollArea className="max-h-[200px] md:max-h-[300px]">
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {allCities && allCities?.map((city: cities) => (
                  <CommandItem
                    className={`${position.city !== city.name ? "hover:bg-muted cursor-pointer" : "pointer-events-none"}`}
                    key={city.id}
                    value={city.name}
                    onSelect={(currentValue) => {
                      setOpen(false);
                      setPosition(prevState => ({
                        ...prevState,
                        city: currentValue,
                        province: ""
                      }))
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", position.city === city.name ? "opacity-100" : "opacity-0")} />
                    {city.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      <ProvinceSelect />
    </div >
  )
}

export default CitySelect