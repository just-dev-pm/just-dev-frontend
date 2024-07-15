"use client";
import { useState } from "react";

interface IProps {
  name: string;
}
export default function HoverName(props: IProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="relative z-10 w-40 truncate">{props.name}</div>
      {hovering && props.name.length > 6 && (
        <div className="absolute top-0 bg-white dark:bg-black shadow-lg min-w-[22vw] z-[400]">
          {props.name}
        </div>
      )}
    </div>
  );
}
