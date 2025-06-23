'use client'
import { useState } from "react"
import { Button } from "./ui/button"

function Genbutton({ variant, text, icon, func }) {
    const [property, setProperty] = useState(variant)
    return (

        <Button variant={property} onClick={() => {
            if (property === 'outline' || property === 'thickOutline') { setProperty('secondary') }
            else{
                setProperty(variant)
            }
        }} asChild className='border rounded-3xl font-normal cursor-pointer'>
            <span className="flex text-2xl items-center">
                {icon}
                {text}
            </span>
        </Button>


    )
}

export default Genbutton