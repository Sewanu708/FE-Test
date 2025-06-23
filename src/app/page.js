'use client'
import { RiEdit2Line } from "react-icons/ri";
import Genbutton from "@/components/button";
import { IoIosArrowDown } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import CommonInput from "@/components/Input";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white text-black flex flex-col">
      <nav className="w-full flex items-center justify-between py-4 px-12">
        <div className="flex gap-1.5 items-center justify-center">
          <RiEdit2Line className="text-[18px] text-zinc-800 m-2" />
          <span className="text-2xl">ChatGPT</span>
          <IoIosArrowDown className="text-[18px] text-zinc-500" />
        </div>
        <div className="flex gap-2 items-center">
          <Genbutton text="Log in" />
          <Genbutton variant="outline" text="Sign up" className="border-2" />
          <GoQuestion className="text-2xl ml-2 text-zinc-700" />
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-y-8 items-center justify-center">
        <h2 className="text-3xl">What can I help with?</h2>
        <CommonInput />
      </div>
    </main>

  );
}
