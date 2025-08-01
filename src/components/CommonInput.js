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
import { AiFillCloseCircle } from "react-icons/ai";
import { InputContext } from "@/context";
import { Button } from "./ui/button";
import AttachCard from "./AttachCard";
import { PiNewspaperThin } from "react-icons/pi";
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
    const [attached, setAttached] = useState(true);


    const cardRef = useRef(null)

    useEffect(() => {
        const handleClick = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                setActiveCard(false);
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setActiveCard(false);
        }, 5000);

        return () => {
            clearTimeout(timeout)
        }
    }, [activeCard])

    useEffect(()=>{
        const textHTMLElement = textareaRef.current
        if (textHTMLElement){
            textHTMLElement.style.height ='auto';
            textHTMLElement.style.height = handleTextDynamicSize(textHTMLElement) + 'px'
        }
    },[input])

    const color = showCanvas ? 'bg-zinc-200 border-0' : 'bg-white'
    const actions = [
        { id: 'attach', label: 'Attach', icon: <GrAttachment /> },
        { id: 'search', label: 'Search', icon: <TfiWorld /> },
        { id: 'reason', label: 'Reason', icon: <LuLightbulb /> },
    ];

    const handleTextDynamicSize = (textHTMLElement) =>{
        const {borderTopWidth, borderBottomWidth, paddingTop,lineHeight, fontSize, paddingBottom} = window.getComputedStyle(textHTMLElement)

        const scrollHeight = textHTMLElement.scrollHeight + parseFloat(borderTopWidth) + parseFloat(borderBottomWidth)
        console.log(scrollHeight)
        return Math.min(scrollHeight,500)
        
    }
    return (
        <div className="relative w-full">
            <Card className={`w-full rounded-3xl shadow-2xl flex flex-col items-start group justify-center ${color}`}>
                <CardContent className="w-full">
                    {highlightedText && (
                        <div className="w-full flex items-center justify-between p-3 sm:p-4 shadow-md rounded-lg border bg-zinc-100 border-zinc-300">
                            <div className="flex items-center gap-2 text-sm text-zinc-700 flex-1 overflow-hidden">
                                <PiArrowBendDownRightThin className="text-lg text-zinc-500" />
                                <span className="">{highlightedText}</span>
                            </div>
                            <button
                                className="ml-4 text-zinc-500 cursor-pointer hover:text-zinc-300 transition-colors"
                                onClick={() => setHighlightedText("")}
                            >
                                <AiOutlineClose className="text-lg" />
                            </button>
                        </div>
                    )}
                    {(showCanvas && attached) && (
                        <div className="w-full relative flex items-center justify-between p-3 sm:p-4 shadow-md rounded-lg border bg-zinc-100 border-zinc-300">
                            <div className="flex items-center gap-2 text-sm text-zinc-700 flex-1 overflow-hidden">
                                <PiNewspaperThin className="text-lg text-zinc-500" />
                                <span className="">New Document</span>
                            </div>
                            <AiFillCloseCircle className="absolute group-hover:block hidden top-[-3px] left-[-3px] cursor-pointer" onClick={() => setAttached(false)} />
                        </div>
                    )}
                    <form className="w-full">
                        <div className="flex items-center justify-center w-full">
                            <textarea
                                ref={textareaRef}
                                placeholder="Ask anything"
                                className="w-full p-3 text-sm sm:text-base border-0 resize-none outline-none bg-transparent min-h-[40px] max-h-[200px]"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                rows={2}
                            />
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full px-2 sm:px-4 pb-4">
                    <div className="flex flex-wrap gap-2 justify-start w-full sm:w-auto">

                        {actions.map(action => {
                            if (action.id === 'attach') {
                                return (<CardAction key={action.id}>
                                    <Button
                                        variant="thickOutline"
                                        asChild
                                        ref={cardRef}
                                        onClick={() => {
                                            setActiveCard(true)
                                        }}
                                        className="border rounded-3xl font-normal cursor-pointer"
                                    >
                                        <span className="flex text-2xl items-center gap-2">
                                            {action.icon}
                                            {action.label}
                                        </span>
                                    </Button>
                                </CardAction>)
                            } else {
                                return (<CardAction key={action.id}>
                                    <Button
                                        variant="thickOutline"
                                        asChild

                                        className="border rounded-3xl font-normal cursor-pointer"
                                    >
                                        <span className="flex text-2xl items-center gap-2">
                                            {action.icon}
                                            {action.label}
                                        </span>
                                    </Button>
                                </CardAction>)
                            }

                        })}
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


            {
                activeCard && <div className="absolute bottom-[-40px] left-[-20px]">
                    <AttachCard />
                </div>
            }

        </div>
    );
}

export default CommonInput;