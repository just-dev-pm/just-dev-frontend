"use client";
import { cn } from "@/lib/utils";
import { CircleCheckIcon, CircleXIcon, GroupIcon } from "lucide-react";
import React from "react";
import { SelectPicker, SelectPickerProps } from "rsuite";

interface ChangeStatusProps extends SelectPickerProps<string> {}

/**
 * 1. data=[]
 * 2. onChange
 * @returns React.FC<>
 */
export const SelectStatus: React.FC<ChangeStatusProps> = props => {
  const renderMenuItem = (label, item) => {
    if (!item) return <></>;
    const f = item.tag === "complete";
    return (
      <div
        className={`flex gap-2  items-center z-[100]} 
        `}
      >
        {f ? <CircleCheckIcon /> : <CircleXIcon />}
        <span>{label}</span>
      </div>
    );
  };

  const renderMenuGroup = (label, item) => {
    return (
      item && (
        <div
          className={cn(
            "flex gap-2 select-none",
            label === "complete" && "text-green-700"
          )}
        >
          <GroupIcon />
          <span>{label}</span>
        </div>
      )
    );
  };

  const renderValue = (value, items) => {
    return (
      items && (
        <div
          className={cn(
            "flex gap-2 items-center",
            items.tag === "complete" && "text-green-700"
          )}
        >
          {/* {items.tag === "complete" ? <CircleCheckIcon /> : <CircleXIcon />} */}
          <span>{items.label}</span>
        </div>
      )
    );
  };

  return (
    <SelectPicker
      groupBy="tag"
      labelKey="label"
      valueKey="value"
      placeholder="设置状态"
      // renderMenuItem={renderMenuItem}
      renderMenuGroup={renderMenuGroup}
      renderValue={renderValue}
      appearance="subtle"
      className="text-ellipsis text-nowrap w-48 border-none all:border-none"
      menuClassName="z-50 my-4 max-h-[40vh] overflow-auto"
      {...props}
    />
  );
};
