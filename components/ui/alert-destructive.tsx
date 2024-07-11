import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertDestructiveProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}
export function AlertDestructive({
  title,
  description,
  ...props
}: AlertDestructiveProps) {
  return (
    <Alert variant="destructive" {...props}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
