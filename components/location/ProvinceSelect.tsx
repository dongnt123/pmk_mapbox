import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { provinces } from "@prisma/client";
import { cn } from "@/lib/utils";
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
import { usefetchProvinceByCity } from "@/lib/queries/queriesAndMutations";
import { useLocationContext } from "@/context/LocationContext";

const ProvinceSelect = () => {

  const { position, setPosition } = useLocationContext();
  const { data: allProvinces } = usefetchProvinceByCity(position.city);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between rounded-md">
          {position.province === "" ? "Select province..." : position.province}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-light text-dark">
        <Command>
          <CommandInput placeholder="Search province..." />
          <ScrollArea className="h-[200px] md:h-[300px]">
            <CommandEmpty>No province found.</CommandEmpty>
            <CommandGroup>
              {allProvinces && allProvinces?.map((province: provinces) => (
                <CommandItem
                  className={`${position.province !== province.name ? "hover:bg-muted cursor-pointer" : "pointer-events-none"}`}
                  key={province.id}
                  value={province.name}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    setPosition(prevState => ({
                      ...prevState,
                      province: currentValue
                    }))
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", position.province === province.name ? "opacity-100" : "opacity-0")} />
                  {province.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ProvinceSelect