import React from 'react'
import Genbutton from './button'
import { CardAction } from './ui/card'

function ActionCards({ items, setIdeas, usage, func = () => {} }) {
    return items.map(([label, icon]) => (
        <CardAction
            key={label} 
            onClick={() => {
                if (usage === 1) return;
                setIdeas(prev => ({ ...prev, display: !prev.display, idea: label }));
            }}
        >
            <Genbutton text={label} variant="thickOutline" icon={icon} />
        </CardAction>
    ));
}

export default ActionCards;
