import { useContext, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdFormatQuote } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { RiEdit2Line } from "react-icons/ri";
import { InputContext } from "@/context";

function Output({ output, id }) {
    const quoteRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const { setHighlightedText, showCanvas, setShowCanvas, canvasContent, setCanvasContent } = useContext(InputContext);

    const [showQuote, setShowQuote] = useState({});
    const [quotePosition, setQuotePosition] = useState({ x: 0, y: 0 });

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTextSelection = (id) => {

        setTimeout(() => {
            const selection = window.getSelection();
            const selectedText = selection?.toString()?.trim();
            console.log('Selected text:', selectedText);

            if (selectedText && selectedText.length > 0) {
                try {
                    const range = selection.getRangeAt(0);
                    const rect = range.getBoundingClientRect();

                    setQuotePosition({
                        x: rect.left + window.scrollX,
                        y: rect.top + window.scrollY - 40
                    });

                    setShowQuote({ [id]: selectedText });
                    console.log('Quote set for id:', id);
                } catch (error) {
                    console.log('Error getting selection range:', error);
                }
            } else {
                setShowQuote({});
            }
        }, 10);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {

            if (quoteRef.current && !quoteRef.current.contains(e.target)) {

                const textContainer = e.target.closest('.select-text');
                if (!textContainer) {
                    setShowQuote({});
                    window.getSelection().removeAllRanges();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div
                className="w-full flex items-center justify-start mt-2 relative"
                onMouseUp={() => handleTextSelection(id)}
                onMouseDown={() => {
                    setShowQuote({});
                }}
            >
                <div className="select-text">
                    <p>{output.header}</p>
                    <hr className="border-zinc-300 my-4 shadow-sm" />
                    <p>{output.content}</p>
                    <hr className="border-zinc-300 my-4 shadow-sm" />
                    <p>{output.conclusion}</p>
                </div>

                <div
                    className="absolute left-0 bottom-[-30px] flex items-center text-sm cursor-pointer text-zinc-500 hover:text-black transition-all duration-200"
                    onClick={() =>
                        handleCopy(
                            [output.header, output.content, output.conclusion].join(" ")
                        )
                    }
                >
                    {copied ? <FaCheck /> : <IoCopyOutline />}
                </div>

                <div
                    className="absolute left-10 bottom-[-30px] flex items-center text-sm cursor-pointer text-zinc-500 hover:text-black transition-all duration-200"
                    onClick={() => {
                        setShowCanvas(true);
                        setCanvasContent(id);
                    }}
                >
                    <RiEdit2Line />
                </div>
            </div>

            {showQuote && Object.keys(showQuote).length > 0 && (
                <div
                    ref={quoteRef}
                    className="fixed bg-zinc-100 text-white px-3 py-2 rounded-full shadow-sm z-50 flex items-center gap-2 cursor-pointer hover:bg-zinc-200 quote-button"
                    style={{
                        left: quotePosition.x,
                        top: quotePosition.y
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setHighlightedText(Object.values(showQuote)[0]);
                        setShowQuote({});
                        window.getSelection().removeAllRanges();
                    }}
                >
                    <MdFormatQuote className="text-sm text-black" />
                </div>
            )}
        </>
    );
}

export default Output;