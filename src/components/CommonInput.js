'use client'
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { dummyResponses } from "@/data";
import Genbutton from "./button"
import { PiArrowBendDownRightThin } from "react-icons/pi";
import { FaCode, FaGraduationCap, FaArrowUp } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import { GrAttachment } from "react-icons/gr";
import { LuLightbulb } from "react-icons/lu";
import { RiVoiceAiFill } from "react-icons/ri";
import { AiOutlineClose } from 'react-icons/ai';
import ActionCards from "./ActionCards";
import { useContext, useRef, useEffect, useState } from "react";
import { InputContext } from "@/context";
import { Button } from "./ui/button";
import AttachCard from "./AttachCard";

function CommonInput() {
    const { setChatMode, setChat, setInput, showCanvas, input, highlightedText, setHighlightedText } = useContext(InputContext);
    const textareaRef = useRef(null);

    const idGen = () => Date.now().toString() + Math.random().toString(36).substring(2, 5);

    function send() {
        setChatMode(true);
        const conversation = {
            id: idGen(),
            input: {
                reply: highlightedText,
                userInput: input
            },
            output: dummyResponses[Math.floor(Math.random() * dummyResponses.length)]
        };

        setChat(prev => [...prev, conversation]);
        setInput('');
        setHighlightedText('');
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    const [activeCard, setActiveCard] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);

    const handleCardHover = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        setActiveCard(true);
    };

    const handleCardLeave = () => {
        const timeout = setTimeout(() => {
            setActiveCard(false);
        }, 100);
        setHoverTimeout(timeout);
    };

    const handleAttachCardHover = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
    };

    const handleAttachCardLeave = () => {
        const timeout = setTimeout(() => {
            setActiveCard(false);
        }, 100);
        setHoverTimeout(timeout);
    };

    const color = showCanvas ? 'bg-zinc-200 border-0' : 'bg-white'
    const actions = [
        { id: 'attach', label: 'Attach', icon: <GrAttachment /> },
        { id: 'search', label: 'Search', icon: <TfiWorld /> },
        { id: 'reason', label: 'Reason', icon: <LuLightbulb /> },
    ];

    return (
        <div className="relative w-full">
            <Card className={`w-full rounded-3xl shadow-2xl flex flex-col items-start justify-center ${color}`}>
                <CardContent className="">
                    {highlightedText && (
                        <div className="w-full flex items-center justify-between p-3 sm:p-4 shadow-md rounded-lg border bg-zinc-100 border-zinc-300">
                            <div className="flex items-center gap-2 text-sm text-zinc-700 flex-1 overflow-hidden">
                                <PiArrowBendDownRightThin className="text-lg text-zinc-500" />
                                <span className="truncate">{highlightedText}</span>
                            </div>
                            <button
                                className="ml-4 text-zinc-500 hover:text-red-500 transition-colors"
                                onClick={() => setHighlightedText("")}
                            >
                                <AiOutlineClose className="text-lg" />
                            </button>
                        </div>
                    )}

                    <form className="w-full">
                        <div className="flex items-center justify-center w-full">
                            <textarea
                                ref={textareaRef}
                                placeholder="Ask anything"
                                className="w-full p-3 text-sm sm:text-base border-0 resize-none outline-none bg-transparent overflow-y-auto min-h-[40px] max-h-[200px]"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                rows={1}
                            />
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full px-2 sm:px-4 pb-4">
                    <div className="flex flex-wrap gap-2 justify-start w-full sm:w-auto">
                        {actions.map(action => (
                            <CardAction key={action.id}>
                                <Button
                                    variant="thickOutline"
                                    asChild
                                    onMouseEnter={handleCardHover}
                                    onMouseLeave={handleCardLeave}
                                    className="border rounded-3xl font-normal cursor-pointer"
                                >
                                    <span className="flex text-2xl items-center gap-2">
                                        {action.icon}
                                        {action.label}
                                    </span>
                                </Button>
                            </CardAction>
                        ))}
                    </div>


                    <div className="w-full sm:w-auto flex justify-end">
                        {showCanvas ?
                            <Genbutton
                                func={send}
                                text={''}
                                className="!rounded-full"
                                icon={<FaArrowUp />}
                            /> :
                            <Genbutton
                                func={send}
                                text={input ? '' : 'Voice'}
                                className="!rounded-full"
                                icon={input ? <FaArrowUp /> : <RiVoiceAiFill />}
                            />
                        }
                    </div>
                </CardFooter>
            </Card>

            {activeCard && (
                <div
                    className="absolute bottom-16 left-0 z-10"
                    onMouseEnter={handleAttachCardHover}
                    onMouseLeave={handleAttachCardLeave}
                >
                    <AttachCard />
                </div>
            )}
        </div>
    );
}

export default CommonInput;