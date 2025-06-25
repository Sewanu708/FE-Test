import { useContext, useState } from "react";
import { TbMessageCircle } from "react-icons/tb";
import { RiBold } from "react-icons/ri";
import { FiItalic } from "react-icons/fi";
import { IoTextOutline } from "react-icons/io5";
import { InputContext } from "@/context";
function CanvasContent() {
    const { setHighlightedText, showCanvas, chat, setShowCanvas, canvasContent, setCanvasContent } = useContext(InputContext)
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
                y: rect.top + -40
            });

            setShowQuote({ [index]: selectedText });
        } else {
            setShowQuote({});
        }
    }

    const conversation = chat.find(item => item.id === canvasContent)
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
                <div
                    className="fixed bg-white text-black px-3 py-2 rounded-full shadow-sm z-50 flex items-center gap-2 cursor-pointer hover:bg-zinc-200 quote-button"
                    style={{
                        left: quotePosition.x,
                        top: quotePosition.y
                    }}
                    onClick={() => setHighlightedText(Object.values(showQuote)[0])}
                >
                    <div className="flex items-center">
                        <TbMessageCircle />
                        <span className="ml-1">Ask ChatGPT</span>
                    </div>

                    <div className="h-2 w-[1px] bg-zinc-200"></div>

                    <div><RiBold /></div>
                    <div><FiItalic /></div>
                    <div><IoTextOutline /></div>
                </div>
            )}</div>
    )
}

export default CanvasContent