"use client";

import { useContentContext } from "@/context/ContentContext";
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

  const { menuSideBarStatus } = useContentContext();

  return (
    <div className={`${menuSideBarStatus ? "w-[300px] border" : "w-0 border-none"} h-[400px] md:h-full transition-none md:transition-all md:ease-in-out md:duration-500 fixed md:static z-[20] md:z-[10]
    bg-light top-[70px] left-5 md:border-none rounded-lg md:rounded-none shadow-md md:shadow-none`}>
      {menuSideBarStatus && (
        <Accordion type="single" collapsible className="w-full p-[20px]">
          {sidebarLinks.map((item, index) => (
            <AccordionItem key={item.title} value={`item-${index}`} className="border-none">
              <AccordionTrigger className="select-none hover:no-underline px-[10px] py-[15px] rounded-[4px] hover:bg-[#F6F9FF] hover:text-primary group">
                <div className="flex justify-start items-center gap-2 text-sm md:text-base font-bold">
                  <MenuButtonIcon className="fill-dark group-hover:fill-primary" />
                  {item.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-[5px]">
                <ul>
                  {item.submenu.map((menu) => (
                    <li key={menu.title} className="p-[12px] md:p-[20px] group flex justify-start items-center gap-2">
                      <ListIcon className="stroke-dark group-hover:stroke-primary" />
                      <Link href={menu.link} className="text-dark hover:text-primary text-sm md:text-base">{menu.title}</Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
      }
    </div >
  )
}

export default LeftSideBar