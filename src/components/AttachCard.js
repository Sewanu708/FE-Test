import Image from "next/image"
import Genbutton from "./button"
import img from '../../public/Group.png'
function AttachCard() {
    return (
        <div className="w-[300px] bg-white rounded-b">
            <div className="w-full">
                <Image src={img} alt="nothing" className="w-full" />
            </div>
            <div className="flex flex-col gap-y-2 p-4">
                <h3 className="text-xl font-semibold">Try advanced features for free</h3>
                <p>Get smarter bresponses, upload files,create images, and more by logging in.</p>
                <div className="flex items-center justify-start gap-x-4">
                    <Genbutton text="Log in" />
                    <Genbutton variant="outline" text="Sign up" className="border-2" />
                </div>
            </div>
        </div>
    )
}

export default AttachCard