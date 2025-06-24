'use client'
import { RiEdit2Line } from "react-icons/ri";
import Genbutton from "@/components/button";
import { IoIosArrowDown } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import ChatRoom from "@/components/ChatRoom";
import { InputContext } from "@/context";
import { useContext } from "react";
import ChatDetails from "@/context/ChatDetails";

export default function Home() {
  const { chatMode } = useContext(InputContext)
  return (
    <main className="w-full h-screen bg-white text-black flex flex-col overflow-hidden">

    
      <nav className="w-full fixed top-0 left-0 right-0 z-10 bg-white flex items-center justify-between py-4 md:px-12 ">
        <div className="flex gap-1.5 items-center justify-center">
          <RiEdit2Line className="text-[18px] text-zinc-800 m-2" />
          <span className="text-[18px]">ChatGPT</span>
          <IoIosArrowDown className="text-[20px] text-zinc-500" />
        </div>
        <div className="flex gap-2 items-center">
          <Genbutton text="Log in" />
          <Genbutton variant="outline" text="Sign up" className="border-2" />
          <GoQuestion className="text-2xl ml-2 text-zinc-700" />
        </div>
      </nav>

      
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto pt-20">
        {
          chatMode ? <ChatDetails /> : <ChatRoom />
        }
      </div>
    </main>


  );
}
