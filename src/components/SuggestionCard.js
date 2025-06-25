import { InputContext } from "@/context"
import { useContext } from "react"

function SuggestionCard({ items }) {
    const { input, setInput } = useContext(InputContext)
    const query = input.trim().toLowerCase();

    const filtered = items
        .filter((item) => item.toLowerCase().startsWith(query))
        .slice(0, 5);

    return (
        <ul className="list-none">
            {filtered.map((item) => {
                const before = item.slice(0, query.length);
                const after = item.slice(query.length);

                return (
                    <li
                        key={item}
                        onClick={() => setInput(item)}
                        className="py-2 pl-4 cursor-pointer border-b"
                    >
                        <span className="text-zinc-400">{before}</span>{after}
                    </li>
                );
            })}
        </ul>
    );
}

export default SuggestionCard;
    