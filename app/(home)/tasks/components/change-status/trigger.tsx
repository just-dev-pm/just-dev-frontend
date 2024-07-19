"use client";
import { StatusPool } from "@/app/(home)/components/status/response";
import { Form } from "@/components/ui/form";
import React, { FunctionComponent } from "react";
import { Button, Modal } from "rsuite";
import { useChangeStatusContext } from "./context";
import { ChangeStatusFormField } from "./select-status";

interface TriggerProps {
  statusId: string;
  statusPool: StatusPool;
  Control: FunctionComponent;
}
const Trigger = ({ statusId, statusPool, Control }: TriggerProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { form, onSubmit } = useChangeStatusContext();
  const handleClose = () => setOpen(false);
  console.log("任务状态id", statusId);
  return (
    <div>
      <div onClick={handleOpen} className="flex">
        <Control />
      </div>

      <Modal open={open} onClose={handleClose} className="w-[20vw]">
        <Modal.Header>
          <Modal.Title>更新任务状态</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex justify-center">
          <Form {...form}>
            <ChangeStatusFormField
              defaultValue={statusId!}
              statusPool={statusPool}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={async () => {
              await form.trigger();
              if (form.formState.isValid) {
                setOpen(false);
                form.handleSubmit(onSubmit)();
              }
            }}
            appearance="primary"
          >
            更新
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { Trigger as ChangeStatusTrigger };
