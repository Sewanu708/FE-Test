'use client'
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { dummyResponses, suggestedIdeas } from "@/data";
import Genbutton from "./button"
import { FaCode } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { GrAttachment } from "react-icons/gr";
import { LuLightbulb } from "react-icons/lu";
import { RiVoiceAiFill } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import ActionCards from "./ActionCards";
import { useContext, useEffect, useRef, useState } from "react";
import SuggestionCard from "./SuggestionCard";
import { InputContext } from "@/context";
function CommonInput() {
    const { setChatMode, setChat, setInput, input } = useContext(InputContext);

    function send() {
        setChatMode(true)
        const conversation = {
            input,
            output: dummyResponses[Math.floor(Math.random()*dummyResponses.length)]
        }

        setChat(prev => ([...prev, conversation]))
        setInput('')
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            send();
        }
    };
    return (

        <Card className='w-full rounded-3xl shadow-2xl  flex flex-col items-center  justify-center'>
            <CardContent className='w-full'>
                <form className='w-full'>
                    <div className="flex items-center justify-center w-full">
                        <textarea
                            id="text"
                            type="text"
                            placeholder="Ask anything"
                            className="w-full border-0  resize-none outline-0"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />

                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex items-center justify-between w-full">
                <div className="flex items-center justify-between gap-2">

                    {
                        <ActionCards items={[['Attach', <GrAttachment />], ['Search', <TfiWorld />], ['Reason', <LuLightbulb />]]} usage={1} />}

                </div>
                <div>
                    <Genbutton func={() => send()} text={input ? '' : 'Voice'} className={'!rounded-full'} icon={input ? <FaArrowUp /> : <RiVoiceAiFill />} />
                </div>
            </CardFooter>
        </Card>

    )
}

export default CommonInput