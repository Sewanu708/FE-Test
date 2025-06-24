'use client'
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { suggestedIdeas } from "@/data";
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
import { useContext, useState } from "react";
import SuggestionCard from "./SuggestionCard";
import { InputContext } from "@/context";
import CommonInput from "./CommonInput";
import ChatDetails from "@/context/ChatDetails";


function ChatRoom() {
    const [Ideas, setIdeas] = useState({
        display: false, idea: ''
    })
    const { chatMode, setChatMode, input } = useContext(InputContext)
    return (
        <div className="w-full md:max-w-[70%] rounded-3xl max-w-[95%] flex flex-col">
            {<h2 className="text-3xl text-center mb-8">What can I help with?</h2>}
           
                <CommonInput />
                {
                    <div className="mt-8 pl-6 mr-4">
                        {
                            // Ideas.display ? 
                            input &&
                            <SuggestionCard items={Object.values(suggestedIdeas).flat()} />

                            //     : 
                            // <div className="flex items-center justify-center gap-4 mt-8">
                            //         {<ActionCards items={[['Brainstorm', <LuLightbulb color="#FFDB56" />], ['Code', <FaCode color="#9F9FF8" />], ['Summarize text', <IoDocumentTextOutline color="#FFB55B" />], ['Get advice', <FaGraduationCap color="#92BFFF" />], ['More', '']]} setIdeas={setIdeas} usage={0}/>}

                            //     </div>
                        }
                    </div>
                }
              
            </div>


            )
}

            export default ChatRoom