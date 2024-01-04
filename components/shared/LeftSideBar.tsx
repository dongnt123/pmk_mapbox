"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

import { sidebarLinks } from "@/constants";
import { ListIcon, MenuButtonIcon } from "./Icon";

const LeftSideBar = () => {

  return (
    <Accordion type="single" collapsible className="w-full h-full p-[20px] bg-white">
      {sidebarLinks.map((item, index) => (
        <AccordionItem key={item.title} value={`item-${index}`} className="border-none">
          <AccordionTrigger className="select-none hover:no-underline px-[10px] py-[15px] rounded-[4px] hover:bg-[#F6F9FF] hover:text-sky-500 group">
            <div className="flex justify-start items-center gap-2 text-sm md:text-base font-bold">
              <MenuButtonIcon className="fill-primary group-hover:fill-sky-500" />
              {item.title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-[5px]">
            <ul>
              {item.submenu.map((menu) => (
                <li key={menu.title} className="p-[12px] md:p-[20px] group flex justify-start items-center gap-2">
                  <ListIcon className="stroke-primary group-hover:stroke-sky-500" />
                  <Link href={menu.link} className="text-primary hover:text-sky-500 text-sm md:text-base">{menu.title}</Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default LeftSideBar