import React from 'react'
import Genbutton from './button'
import { CardAction } from './ui/card'
function ActionCards({ items, setIdeas, usage , func = ()=>{}}) {

    return (
        items.map((item, index) => <CardAction key={index} onClick={() => {
            if (usage===1) return;
            setIdeas(prev => ({ ...prev, display: !prev.display, idea: item[0] }))
        }}><Genbutton text={item[0]} variant="thickOutline" icon={item[1]} /></CardAction>
        ))
}

export default ActionCards