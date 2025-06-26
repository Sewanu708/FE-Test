import { useContext, useState, useEffect, useRef } from "react";
import { TbMessageCircle } from "react-icons/tb";
import { RiBold } from "react-icons/ri";
import { FiItalic } from "react-icons/fi";
import { IoTextOutline } from "react-icons/io5";
import { InputContext } from "@/context";
function CanvasContent() {
    const { setHighlightedText, chat, canvasContent,  } = useContext(InputContext)
    const [showQuote, setShowQuote] = useState({});
    const [quotePosition, setQuotePosition] = useState({ x: 0, y: 0 });
    function handleTextSelection(index) {
        const selection = window.getSelection();
        const selectedText = selection?.toString()?.trim();

        if (selectedText && selectedText.length > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            setQuotePosition({
                x: rect.left,
                y: rect.top - 70
            });

            setShowQuote({ [index]: selectedText });
        } else {
            setShowQuote({});
        }
    }

    const conversation = chat.find(item => item.id === canvasContent)
    const quoteRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (quoteRef.current && !quoteRef.current.contains(e.target)) {
                setShowQuote({})
            }
        }
        document.addEventListener('onMouseDown', handleClickOutside)
        return () => document.removeEventListener('onMouseDown', handleClickOutside)
    }, [])
    return (
        <div> <div onMouseUp={() => handleTextSelection(conversation.id)}
            className="w-full flex items-center justify-start px-4 mt-2 relative"
        >
            <div className="select-text">
                <p>{conversation.output.header}</p>
                <hr className="border-zinc-300 my-4 shadow-sm" />
                <p>{conversation.output.content}</p>
                <hr className="border-zinc-300 my-4 shadow-sm" />
                <p>{conversation.output.conclusion}</p>
            </div>

        </div>
            {Object.keys(showQuote).length > 0 && (
                <div ref={quoteRef}
                    className="fixed bg-white text-black px-4 py-2 rounded-full shadow-sm z-50 flex items-center gap-2 cursor-pointer  quote-button"
                    style={{
                        left: quotePosition.x,
                        top: quotePosition.y + 40
                    }}
                    onClick={() => setHighlightedText(Object.values(showQuote)[0])}
                >
                    <div className="flex group items-center">
                        <TbMessageCircle className="group-hover:text-zinc-400 group-hover:scale-90 transition duration-200 ease-in" />
                        <span className="ml-1 group-hover:text-zinc-400 group-hover:scale-90 transition duration-200 ease-in">Ask ChatGPT</span>
                    </div>

                    <div className="h-2 w-[1px] bg-zinc-300"></div>

                    <div className="hover:text-zinc-400 hover:scale-90 transition duration-200 ease-in"><RiBold /></div>
                    <div className="hover:text-zinc-400 hover:scale-90 transition duration-200 ease-in"><FiItalic /></div>
                    <div className="hover:text-zinc-400 hover:scale-90 transition duration-200 ease-in"><IoTextOutline /></div>
                </div>
            )}</div>
    )
}

export default CanvasContent