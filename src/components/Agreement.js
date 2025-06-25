import Image from "next/image"
import { Card, CardContent } from "./ui/card"


function Agreement() {
    return (
        <Card className="w-full rounded-3xl border-2 mb-8">
            <CardContent className="w-full">
                <p>By messaging ChatGPT, you agree to our <span className="capitalize underline">terms</span> and you have read our <span className="capitalize underline"> privacy policy</span></p>
                <p>Don&apos;t share sensitive info. Chats may be reviewed and used to train our models . <span className=" underline">Learn more</span></p>
            </CardContent>
        </Card>
    )
}

export default Agreement