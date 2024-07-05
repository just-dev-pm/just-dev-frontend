"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [isPasswordVisable, setIsPasswordVisible] = React.useState(false);
    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          className={cn("pr-10", className)}
          type={isPasswordVisable ? "text" : "password"}
        />
        <span className="absolute top-[7px] right-1 cursor-pointer select-none">
          {isPasswordVisable ? (
            <EyeIcon onClick={() => setIsPasswordVisible(false)} />
          ) : (
            <EyeOffIcon onClick={() => setIsPasswordVisible(true)} />
          )}
        </span>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
