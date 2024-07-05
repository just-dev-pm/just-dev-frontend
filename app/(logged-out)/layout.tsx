import LightDarkToggle from "@/components/ui/light-dark-toggle";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

function LoggedOutLayout(props: Props) {
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-24 gap-4">
      {children}
      <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2" />
    </div>
  );
}

export default LoggedOutLayout;
