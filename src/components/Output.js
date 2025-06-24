import { useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { RiEdit2Line } from "react-icons/ri";
function Output({ output, index }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async (text) => {
        try {
            const a = await navigator.clipboard.writeText(text);
            setCopied(true)
            
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }
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

    function handleQuoteClick(selectedText) {
        setHighlightedText(selectedText)
    }

    useEffect(() => {
        function handleClickOutside() {
            setShowQuote({});
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (<>
        <div
            className="w-full flex items-center justify-start mt-2 relative"
            onMouseUp={() => handleTextSelection(index)}
        >
            <div className="select-text">
                <p>{output.header}</p>
                <hr className="border-zinc-300 my-4 shadow-sm" />
                <p>{output.content}</p>
                <hr className="border-zinc-300 my-4 shadow-sm" />
                <p>{output.conclusion}</p>
            </div>
            <div
                className="absolute left-0 bottom-[-30px]  flex items-center text-sm cursor-pointer text-zinc-500 hover:text-black transition-all duration-200"
                onClick={() => handleCopy([output.header,output.content,output.conclusion].join(' '))}
            >
                {copied ? <FaCheck /> : <IoCopyOutline />}
            </div>
            <div
                className="absolute left-10 bottom-[-30px]  flex items-center text-sm cursor-pointer text-zinc-500 hover:text-black transition-all duration-200"
            >
                <RiEdit2Line />
            </div>
        </div>
        {Object.keys(showQuote).length > 0 && (
            <div
                className="fixed bg-zinc-100 text-white px-3 py-2 rounded-full shadow-sm z-50 flex items-center gap-2 cursor-pointer hover:bg-zinc-200"
                style={{
                    left: quotePosition.x,
                    top: quotePosition.y
                }}
                onClick={() => handleQuoteClick(Object.values(showQuote)[0])}
            >
                <FaQuoteRight className="text-sm text-black" />
            </div>
        )}
    </>

    )
}

export default Output