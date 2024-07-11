import { ButtonProps } from "@/components/ui/button";
import React from "react";
import { Button } from "@/components/ui/button";

export const DeleteButton: React.FC<ButtonProps> = props => {
  return (
    <Button
      className="text-red-600 hover:text-red-400"
      variant="link"
      size="sm"
      type="button"
      {...props}
    >
      删除
    </Button>
  );
};
