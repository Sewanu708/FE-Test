import CommonInput from "@/components/CommonInput"
import { InputContext } from "@/context";
import { useContext, useEffect, useRef, useState } from "react"
import { GoCopy } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import Output from "@/components/Output";
function ChatDetails() {
    const { chat, setHighlightedText } = useContext(InputContext)
    const [copied, setCopied] = useState(false);

    const bottomRef = useRef(null);


    

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    return <div className="w-full md:max-w-[70%] max-w-[95%] flex flex-col flex-1 h-full mx-auto relative">

        <div className="flex-1 overflow-y-auto px-2 space-y-8 py-4 scrollbar-hide">
            {chat?.map((item, index) => (
                <div key={index} className="w-full">
                    <div className="w-full h-auto group flex items-center justify-end relative">
                        <div className="w-fit px-4 py-2 bg-zinc-200 rounded-3xl">
                            {item.input}
                        </div>
                        <div
                            className="absolute right-0 bottom-[-14px] opacity-0 group-hover:opacity-100 flex items-center text-sm cursor-pointer text-zinc-500 hover:text-black transition-all duration-200"
                            onClick={() => handleCopy(item.input)}
                        >
                            {copied ? <FaCheck /> : <GoCopy />}
                        </div>
                    </div>
                    <Output output={item.output} index={index} />
                </div>
            ))}
            <div ref={bottomRef} />
        </div>


       

        <div className="sticky bottom-0 bg-white pb-2 pt-4">
            <CommonInput />
            <p className="text-xs font-semibold text-center text-zinc-900 mt-2">ChatGPT can make mistakes. Check important info.</p>
        </div>
    </div>
}

export default ChatDetails