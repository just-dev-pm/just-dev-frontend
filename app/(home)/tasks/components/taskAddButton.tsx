import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type Props = {
    message: string
    className?:string
}

function AddButton({message,className}:Props){
    return (
        <Button variant="outline" className={cn("flex gap-2 pl-3",className)}>
            <Plus />
            <Label>{message}</Label>
        </Button>
    )
}

export default AddButton