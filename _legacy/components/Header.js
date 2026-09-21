import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

   useEffect(() => {
     if (isOpen) {
       document.body.classList.add("menu-open");
     } else {
       document.body.classList.remove("menu-open");
     }
   }, [isOpen]);
  
  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <div className="bg-ivoryWhite sticky top-0 z-50 flex justify-between align-center">
      <div className=" md:mx-0">
        <div className="md:hidden pt-5 pb-3 px-4">
          <Link href={"/"}>
            <Image
              src={"/logo_svg.svg"}
              width={250}
              height={250}
              alt={"Logo image"}
            />
          </Link>
        </div>
        <div className="hidden md:flex py-4 px-6">
          <Link href={"/"}>
            <Image
              src={"/logo_svg.svg"}
              width={500}
              height={500}
              alt={"Logo image"}
            />
          </Link>
        </div>
      </div>

      <Menu
        className="fixed top-0 right-0"
        isOpen={isOpen}
        onOpen={handleIsOpen}
        onClose={handleIsOpen}
        right
      >
        <Link href={"/"} onClick={closeSideBar}>
          Home
        </Link>
        <Link href={"/articles"} onClick={closeSideBar}>
          Features
        </Link>
        <Link href={"/community"} onClick={closeSideBar}>
          Community
        </Link>
        <Link href={"/events"} onClick={closeSideBar}>
          Events
        </Link>
        <Link href={"/gallery"} onClick={closeSideBar}>
          Gallery
        </Link>
        {/* <Link href={"/get-involved"} onClick={closeSideBar}>
            Get Involved
          </Link>
          <Link href={"/contact"} onClick={closeSideBar}>
            Contact
          </Link> */}
      </Menu>
    </div>
  );
}
