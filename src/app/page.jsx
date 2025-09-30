"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function HomePage() {
  const router = useRouter();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch("/api/menus");
      const data = await res.json();
      setMenus(data.menus);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserClick = () => {
    router.push("/login");
  };

  return (
    <div className="bg-[#FFF8F0] h-full">
      <div className="flex flex-col gap-3 p-5 max-w-xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Dapur Bunda Bahagia</h1>

          <div className="flex gap-2 items-center">
            <IoCartOutline size={24} className="hover:cursor-pointer" />
            <FaRegUser
              onClick={handleUserClick}
              size={18}
              className="hover:cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          {menus.map((menu) => (
            <Dialog key={menu.menu_id}>
              <DialogTrigger asChild>
                <button>
                  <div className="m-1">
                    <img
                      src={menu.image}
                      className="aspect-video rounded-t-lg object-cover"
                      alt=""
                    />

                    <div className="bg-[#2d4067] rounded-b-lg px-2 py-1 text-white">
                      <p className="font-semibold mb-1">{menu.name}</p>

                      <p className="text-sm line-clamp-2 mb-2.5">
                        {menu.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <p className="text-[#2d4067] text-sm font-semibold text-end px-2 pb-0.5 bg-[#FFF8F0] rounded-sm w-fit self-end mb-1">
                          Rp{menu.price}
                        </p>

                        <FaArrowRightLong className="hover:cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>{menu.name}</DialogHeader>
                <img src={menu.image} className="aspect-video rounded-lg" />
                <DialogDescription>{menu.description}</DialogDescription>
                <Button variant="outline">Rp{menu.price}</Button>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
