"use client";
import { useProject } from "@/app/api/project/get-project";
import { useProfile } from "@/app/api/user/get-profile";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loading from "@/components/ui/loading";
import { cn } from "@/lib/utils";
import { CircleCheckIcon, CircleXIcon, GroupIcon } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { SelectPicker } from "rsuite";

/*
"status_pool": {
        "incomplete": [
            {
                "id": "62",
                "status": {
                    "name": "要清回最政",
                    "description": "常律算儿术为定包四克眼况量。月铁几光能处周历门料住和场北现。装必分由确公变意火战群合政劳风那千难。"
                }
            },
            {
                "id": "80",
                "status": {
                    "name": "究论全线个",
                    "description": "进多即书何取入大快历非圆去。深动气段常则圆务头众展地我。与议特放确红极界局前风本却次者。"
                }
            }
        ],
        "complete": {
            "name": "价她拉设电",
            "description": "级王其叫热近单验国前与育三。科报结识空样所观经听车断化。形标个县去发产收样多不题劳七她算极。人种业则号出第产带员政会领。"
        }
    }
*/
export function PreventOverflowContainer({ children, maxHeight = "72vh" }) {
  const container = React.useRef();
  const content = React.useRef();

  const containerStyle = {
    overflow: "auto",
    position: "relative",
  };

  const contentStyle = {};

  React.useEffect(() => {
    container.current.scrollTop = content.current.clientHeight / 2 - 60;
    container.current.scrollLeft =
      content.current.clientWidth / 2 - container.current.clientWidth / 2;
  }, [container, content]);

  return (
    <div
      style={{ ...containerStyle, maxHeight }}
      className="p-8 px-12"
      ref={container}
    >
      <div style={contentStyle} ref={content}>
        {children(() => container.current)}
      </div>
    </div>
  );
}
export const SelectStatus = ({ statusPool, field, getContainer, form }) => {
  const { incomplete, complete } = statusPool;

  // 将不完整状态的数组转换成适合 SelectPicker 使用的格式
  const incompleteOptions = incomplete.map(item => ({
    label: item.status.name,
    value: item.id,
    tag: "incomplete",
    description: item.status.description,
  }));

  // 完成状态的选项
  const completeOption = {
    label: complete.name,
    value: "complete",
    tag: "complete",
    description: complete.description,
  };

  // 所有状态选项
  const options = [completeOption, ...incompleteOptions];

  const renderMenuItem = (label, item) => {
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
      <div
        className={cn(
          "flex gap-2 select-none",
          label === "complete" && "text-green-700"
        )}
      >
        <GroupIcon />
        <span>{label}</span>
      </div>
    );
  };

  const renderValue = (value, items) => {
    return (
      <div
        className={cn(
          "flex gap-2 items-center",
          items.tag === "complete" && "text-green-700"
        )}
      >
        {items.tag === "complete" ? <CircleCheckIcon /> : <CircleXIcon />}
        <span>{items.label}</span>
      </div>
    );
  };

  return (
    <SelectPicker
      data={options}
      groupBy="tag"
      labelKey="label"
      valueKey="value"
      placeholder="Select Status"
      container={getContainer}
      renderMenuItem={renderMenuItem}
      renderMenuGroup={renderMenuGroup}
      renderValue={renderValue}
      menuClassName="z-50 my-4 max-h-[40vh] overflow-auto"
      onChange={v => {
        if (v === "complete") {
          form.setValue("status.category", "complete");
        } else {
          form.setValue("status.category", "incomplete");
          form.setValue("status.id", v);
        }
      }}
    />
  );
};

export const UserRender = ({ field, getContainer, form }) => {
  const { profile } = useProfile();

  if (!profile?.id) return <Loading />;
  return (
    <>
      <FormItem className="flex flex-col">
        <FormLabel>任务状态</FormLabel>
        <FormControl>
          <SelectStatus
            statusPool={profile.status_pool}
            field={field}
            getContainer={getContainer}
            form={form}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
};

export const ProjectRender = ({ field, id, getContainer, form }) => {
  const { data, isLoading, mutate } = useProject(id);
  useEffect(() => {
    if (!data.name) {
      mutate();
    }
  }, []);
  if (!data.name || isLoading) return <Loading />;
  return (
    <>
      <FormItem className="flex flex-col">
        <FormLabel>任务状态</FormLabel>
        <FormControl>
          <SelectStatus
            statusPool={data.status_pool}
            field={field}
            getContainer={getContainer}
            form={form}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
};
