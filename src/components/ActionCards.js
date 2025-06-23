import React from 'react'
import Genbutton from './button'

function ActionCards({ items }) {
    return (
        items.map((item, index) => <Genbutton text={item[0]} variant="thickOutline" key={index} icon={item[1]} />
        ))
}

export default ActionCards