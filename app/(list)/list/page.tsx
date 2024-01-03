"use client";

import { useState } from "react";

import { ListLocation } from "@/components/list";
import { LeftSideBar, Loader } from "@/components/shared";
import { useContentContext } from "@/context/ContentContext";
import { usefetchListLocation } from "@/lib/queries/queriesAndMutations";
import { Input } from "@/components/ui/input";

const ListPage = () => {

  const { menuSideBarStatus } = useContentContext();
  const [searchParam, setSearchParam] = useState<string>("");
  const { data: allLocations, isFetching } = usefetchListLocation(30, 1, {
    field: "street_name_address",
    order: "desc"
  }, searchParam);

  return (
    <div className={`
    ${menuSideBarStatus ? "-translate-x-[0] w-full" : "-translate-x-[500px] md:-translate-x-[300px] w-[calc(100%+300px)]"}
    relative h-full transition-all ease-in-out duration-500 flex`}>
      <LeftSideBar />
      <div className="w-full flex flex-1 p-10">
        <div className="w-full">
          <div className="flex items-center pb-4">
            <div className="a">
              <Input
                placeholder="Filter address..."
                value={searchParam === "" ? "Select address..." : searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
                className="max-w-sm focus-visible:border-dark focus-visible:ring-0"
              />
            </div>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">Columns<ChevronDown className="ml-2 h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-light">
                {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
                  return (
                    <DropdownMenuCheckboxItem key={column.id} className="capitalize cursor-pointer" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
          {isFetching ? <Loader /> : <ListLocation data={allLocations.locations} />}
          {/* <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default ListPage