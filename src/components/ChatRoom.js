'use client';

import { useContext, useState } from "react";
import { InputContext } from "@/context";
import CommonInput from "./CommonInput";
import { suggestedIdeas } from "@/data";
import { LuLightbulb } from "react-icons/lu";
import { FaCode, FaGraduationCap, FaArrowUp } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import { GrAttachment } from "react-icons/gr";
import { RiVoiceAiFill } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";

function ChatRoom() {
    const [Ideas, setIdeas] = useState({ display: false, idea: '' });
    const { input, chatMode } = useContext(InputContext);

    const actions = [
        { label: 'Brainstorm', icon: <LuLightbulb color="#FFDB56" /> },
        { label: 'Code', icon: <FaCode color="#9F9FF8" /> },
        { label: 'Summarize text', icon: <IoDocumentTextOutline color="#FFB55B" /> },
        { label: 'Get advice', icon: <FaGraduationCap color="#92BFFF" /> },
        { label: 'More', icon: null },
    ];

    const utilityActions = [
        { label: 'Attach', icon: <GrAttachment /> },
        { label: 'Search', icon: <TfiWorld /> },
        { label: 'Reason', icon: <LuLightbulb /> },
    ];

    const filteredSuggestions = Object.values(suggestedIdeas)
        .flat()
        .filter((idea) => idea.toLowerCase().startsWith(input.trim().toLowerCase()))
        .slice(0, 5);

    return (
        <div className="w-full md:max-w-[70%] rounded-3xl max-w-[95%] flex flex-col mx-auto px-2">
            {!chatMode && <h2 className="text-3xl text-center mb-8">What can I help with?</h2>}

            {/* Input Box */}
            <CommonInput />

            {/* Suggestions */}
            {!chatMode && (
                <div className="mt-8">
                    {Ideas.display && input ? (
                        <ul className="list-none border rounded-md p-4 bg-white shadow-sm">
                            {filteredSuggestions.map((suggestion, idx) => {
                                const highlight = input.trim().toLowerCase();
                                const before = suggestion.slice(0, highlight.length);
                                const after = suggestion.slice(highlight.length);
                                return (
                                    <li
                                        key={idx}
                                        onClick={() => setInput(suggestion)}
                                        className="py-2 pl-4 cursor-pointer border-b last:border-b-0 text-sm"
                                    >
                                        <span className="text-zinc-400">{before}</span>
                                        {after}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            {actions.map((action, index) => (
                                <button
                                    key={index}
                                    className="border border-zinc-300 rounded-3xl px-4 py-2 flex items-center gap-2 text-sm hover:shadow transition"
                                    onClick={() =>
                                        setIdeas({ display: !Ideas.display, idea: action.label })
                                    }
                                >
                                    {action.icon}
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Optional: Utility actions */}
            <div className="mt-6 flex flex-wrap gap-3">
                {utilityActions.map((util, idx) => (
                    <button
                        key={idx}
                        className="text-sm px-4 py-2 border rounded-full flex items-center gap-2 hover:bg-zinc-100"
                    >
                        {util.icon}
                        {util.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ChatRoom;
