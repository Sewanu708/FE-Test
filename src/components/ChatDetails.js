import CommonInput from "@/components/CommonInput";
import { InputContext } from "@/context";
import { useContext, useEffect, useRef, useState } from "react";
import { GoCopy } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import Output from "@/components/Output";
import Agreement from "./Agreement";

function ChatDetails() {
    const { chat, setHighlightedText, showCanvas, input } = useContext(InputContext);
    const [copied, setCopied] = useState(false);
    const [loadingItems, setLoadingItems] = useState(new Set());
    const bottomRef = useRef(null);
    const [agree, setAgree] = useState(true);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat, loadingItems]);


    useEffect(() => {
        if (chat.length > 0) {
            const latestItem = chat[chat.length - 1];


            setLoadingItems(prev => new Set([...prev, latestItem.id]));

            const timer = setTimeout(() => {
                setLoadingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(latestItem.id);
                    return newSet;
                });
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [chat]);

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (showCanvas) {
            setAgree(false);
            return;
        }
        const id = setTimeout(() => {
            setAgree(false);
        }, 3000);
        return () => clearTimeout(id);
    }, [showCanvas]);

    return (
        <div className="w-full flex flex-col h-full max-w-screen-lg px-2 mx-auto relative">
            <div className="flex-1 overflow-y-auto space-y-8 py-4 scrollbar-hide">
                {chat?.map((item) => (
                    <div key={item.id} className="w-full mb-20 sm:mb-24">
                        <div className="w-full group flex flex-col items-end justify-end mb-12 relative px-1 sm:px-0">
                            {item.input?.reply && (
                                <div className="flex items-center text-zinc-400 text-sm mb-2">
                                    <MdOutlineSubdirectoryArrowRight className="mr-1" />
                                    <span className="truncate max-w-xs sm:max-w-sm">{item.input?.reply}</span>
                                </div>
                            )}
                            <div className="w-fit max-w-[85%] sm:max-w-[60%] px-4 py-2 bg-zinc-200 rounded-3xl text-sm sm:text-base">
                                {item.input?.userInput}
                            </div>
                            <div
                                className="absolute -bottom-6 right-2 opacity-0 group-hover:opacity-100 flex items-center text-sm cursor-pointer text-zinc-500 hover:text-black transition-all duration-200 z-10"
                                onClick={() => handleCopy(item.input.userInput)}
                            >
                                {copied ? <FaCheck /> : <GoCopy />}
                            </div>
                        </div>

                        {loadingItems.has(item.id) ? (
                            <div className="w-4 h-4 bg-black rounded animate-pulse"></div>
                        ) : (
                            <Output output={item.output} id={item.id} />
                        )}
                    </div>
                ))}

                <div ref={bottomRef} />
            </div>
            <div className="sticky bottom-0 ">
                {agree &&
                    <Agreement />}
                <CommonInput />
                <p className="text-xs font-semibold text-center text-zinc-900 mt-2">
                    ChatGPT can make mistakes. Check important info.
                </p>
            </div>
        </div>
    );
}

export default ChatDetails;