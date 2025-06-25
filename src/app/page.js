'use client';

import { useContext } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiSidebarLight } from "react-icons/pi";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import Genbutton from "@/components/button";
import ChatRoom from "@/components/ChatRoom";
import ChatDetails from "@/components/ChatDetails";
import Canvas from "@/components/Canvas";
import { InputContext } from "@/context";

export default function Home() {
  const { chatMode, setChat, setChatMode, showCanvas, setShowCanvas } = useContext(InputContext);


  return (
    <main className="w-full h-screen bg-white text-black flex flex-col overflow-hidden">
      {showCanvas ? (
        <PanelGroup direction="horizontal" className="w-full h-full">

          <Panel>
            <div className="w-full h-full flex flex-col bg-zinc-200">
              <nav className="w-full flex items-center justify-between py-4 px-4 md:px-12  ">
                <div className="flex gap-1.5 items-center justify-center">
                  <PiSidebarLight className="text-[18px] text-zinc-800 m-2" />
                  <RiEdit2Line className="text-[18px] text-zinc-800 m-2" onClick={() => {
                    setChatMode(false)
                    setShowCanvas(false)
                    setChat([])
                  }} />
                  <span className="text-[18px]">ChatGPT</span>
                  <IoIosArrowDown className="text-[20px] text-zinc-500" />
                </div>
                <div className="flex gap-2 items-center">
                  <GoQuestion className="text-2xl ml-2 text-zinc-700" />
                  <HiOutlineDotsVertical className="text-2xl ml-2 text-zinc-700" />
                </div>

              </nav>
              <div className="flex-1 flex items-center justify-center overflow-y-auto px-4">
                {chatMode ? <ChatDetails /> : <ChatRoom />}
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-[1px] bg-zinc-300 hover:bg-zinc-400 cursor-col-resize" />


          <Panel defaultSize={60} minSize={30} maxSize={70}>

            <Canvas />

          </Panel>
        </PanelGroup>
      ) : (
        <>

          <nav className="w-full flex items-center justify-between py-4 px-4 md:px-12  bg-white">
            <div className="flex gap-1.5 items-center justify-center">
              <PiSidebarLight className="text-[18px] text-zinc-800 m-2 flex sm:hidden" />
              <RiEdit2Line className="text-[18px] text-zinc-800 m-2" onClick={() => {
                setChatMode(false)
                 setChat([])
              }} />
              <span className="text-[18px]">ChatGPT</span>
              <IoIosArrowDown className="text-[20px] text-zinc-500" />
            </div>
            <div className="hidden sm:flex gap-2 items-center">
              <Genbutton text="Log in" />
              <Genbutton variant="outline" text="Sign up" className="border-2" />
              <GoQuestion className="text-2xl ml-2 text-zinc-700" />
            </div>
            <div className="flex sm:hidden">
              <HiOutlineDotsVertical />
            </div>
          </nav>
          <div className="flex-1 items-center justify-center flex overflow-y-auto px-4 pt-4">
            {chatMode ? <ChatDetails /> : <ChatRoom />}
          </div>
        </>
      )}
    </main>
  );
}