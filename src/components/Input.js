'use client'
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"

import Genbutton from "./button"
import { FaCode } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { GrAttachment } from "react-icons/gr";
import { LuLightbulb } from "react-icons/lu";
import { RiVoiceAiFill } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";

import ActionCards from "./ActionCards";
import { useState } from "react";

function CommonInput() {
    const [Ideas, setIdeas] = useState({
    display: false, idea: ''
})
    return (
        <div className="w-full md:max-w-[70%] rounded-3xl max-w-[95%] ">
            <Card className='w-full rounded-3xl shadow-2xl  flex flex-col items-center  justify-center'>
                <CardContent className='w-full'>
                    <form className='w-full'>
                        <div className="flex items-center justify-center w-full">
                            <input
                                id="email"
                                type="email"
                                placeholder="Ask anything"
                                className="w-full border-0 outline-0"

                            />

                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-between gap-2">

                        {
                            <ActionCards items={[['Attach', <GrAttachment />], ['Search', <TfiWorld />], ['Reason', <LuLightbulb />]]} />}

                    </div>
                    <div>
                        <Genbutton text='Voice' icon={<RiVoiceAiFill />} />
                    </div>
                </CardFooter>

            </Card>
            {

            }
            <div className="flex items-center justify-center gap-4 mt-8">
                {<ActionCards items={[['Brainstorm', <LuLightbulb color="#FFDB56" />], ['Code', <FaCode color="#9F9FF8" />], ['Summarize text', <IoDocumentTextOutline color="#FFB55B" />], ['Get advice', <FaGraduationCap color="#92BFFF" />], ['More', '']]} />}

            </div>
        </div>


    )
}

export default CommonInput