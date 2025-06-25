import Image from "next/image"
import Genbutton from "./button"
import img from '../../public/Group.png'
function AttachCard() {
    return (
        <div>
            <div>
                <Image src={img} />
            </div>
            <div className="flex flex-col gap-y-2">
                <h3 className="text-2xl font-semibold">Try advanced features for free</h3>
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