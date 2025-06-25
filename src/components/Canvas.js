import { AiOutlineClose } from 'react-icons/ai';
import Genbutton from "./button"
import { GoQuestion } from "react-icons/go"
import { IoCopyOutline, IoRefresh } from "react-icons/io5";
import { HiMiniArrowUturnLeft, HiMiniArrowUturnRight } from "react-icons/hi2";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import CanvasContent from "./CanvasContent";
import { InputContext } from "@/context";
import { useContext } from "react";

function Canvas() {
    const { setShowCanvas } = useContext(InputContext);
    return (
        <div className="relative w-full h-full flex flex-col">
          
            <nav className="w-full sticky top-0 z-20 bg-white border-zinc-200 py-4 px-4 md:px-12 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <AiOutlineClose className="text-xl text-zinc-500 cursor-pointer hover:text-zinc-800 transition" onClick={() => setShowCanvas(false)} />
                    <span className="text-base md:text-lg font-medium text-zinc-700">
                        Hey! How&apos;s it going?
                    </span>
                </div>

                <div className="flex items-center flex-wrap gap-4">
                    <IoRefresh className="text-zinc-300 cursor-pointer hover:text-zinc-500 transition" />
                    <HiMiniArrowUturnLeft className=" text-zinc-300 cursor-pointer hover:text-zinc-500 transition" />
                    <HiMiniArrowUturnRight className="text-zinc-700 cursor-pointer hover:text-black transition" />
                    <IoCopyOutline className=" text-zinc-700 cursor-pointer hover:text-black transition" />
                    <FaArrowUpFromBracket className=" text-zinc-300 cursor-pointer hover:text-zinc-500 transition" />

                    <Genbutton text="Log in" />
                    <Genbutton
                        variant="outline"
                        text="Sign up"
                        className="border-2 border-zinc-400 hover:border-zinc-600"
                    />

                    <GoQuestion className="text-2xl text-zinc-700 cursor-pointer hover:text-black transition" />
                </div>
            </nav>
            
          
            <div className="flex-1 items-start mt-16 px-8 flex">
                <CanvasContent />
                <div className="absolute bottom-0"> 
                    <GoQuestion className="text-2xl text-zinc-700 cursor-pointer hover:text-black transition" />
                </div>
            </div>
        </div>
    )
}

export default Canvas