'use client'
import { useContext, useState } from "react";
import { InputContext } from "@/context";
import CommonInput from "./CommonInput";
import { suggestedIdeas } from "@/data";
import { FaCode, FaGraduationCap, FaArrowUp } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuLightbulb } from "react-icons/lu";

function ChatRoom() {
    const [Ideas, setIdeas] = useState({ display: false, idea: '' });
    const { input, setInput } = useContext(InputContext);

    const allIdeas = Object.values(suggestedIdeas).flat();
    const query = input.trim().toLowerCase();
    const filteredSuggestions = allIdeas
        .filter((item) => item.toLowerCase().startsWith(query))
        .slice(0, 5);

    const actions = [
        { label: "Brainstorm", icon: <LuLightbulb color="#FFDB56" /> },
        { label: "Code", icon: <FaCode color="#9F9FF8" /> },
        { label: "Summarize text", icon: <IoDocumentTextOutline color="#FFB55B" /> },
        { label: "Get advice", icon: <FaGraduationCap color="#92BFFF" /> },
        { label: "More", icon: null }
    ];

    return (
        <div className="w-full md:max-w-[70%] max-w-[95%] flex flex-col rounded-3xl">
            <h2 className="text-3xl text-center mb-8">What can I help with?</h2>

            <CommonInput />

            <div className="mt-8 pl-6 mr-4">
                {input ? (
                    <ul className="list-none">
                        {filteredSuggestions.map((item, index) => {
                            const before = item.slice(0, query.length);
                            const after = item.slice(query.length);
                            return (
                                <li
                                    key={index}
                                    onClick={() => setInput(item)}
                                    className="py-2 pl-4 cursor-pointer border-b text-sm text-zinc-700 hover:bg-zinc-100"
                                >
                                    <span className="text-zinc-400">{before}</span>{after}
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                        {actions.map(({ label, icon }, index) => (
                            <button
                                key={label + index}
                                onClick={() => setIdeas({ display: true, idea: label })}
                                className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-3xl text-sm shadow hover:bg-zinc-50 transition-all"
                            >
                                {icon}
                                {label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatRoom;
