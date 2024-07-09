import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const NoStyleInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, ...props }, ref) => {
    const [content,SetContent] = React.useState(value)
    const handleInputOnchange = (event: { target: { value: React.SetStateAction<string | number | readonly string[] | undefined> } }) => {
        SetContent(event.target.value)
    }
    return (
      <input
        type={type}
        className={cn(
          "flex rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={content}
        onChange={handleInputOnchange}
        {...props}
      />
    )
  }
)
NoStyleInput.displayName = "NoStyleInput"

export { NoStyleInput }
