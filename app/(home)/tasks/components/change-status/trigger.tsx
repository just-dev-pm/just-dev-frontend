"use client";
import { StatusControl } from "@/app/(home)/components/status/status-pool/status/control";
import { Form } from "@/components/ui/form";
import React from "react";
import { Button, Modal } from "rsuite";
import { useChangeStatusContext } from "./context";
import { ChangeStatusFormField } from "./select-status";

interface TriggerProps {
  statusId: string;
}
const Trigger = ({ statusId }: TriggerProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { form, onSubmit } = useChangeStatusContext();
  const handleClose = () => setOpen(false);
  return (
    <>
      <div onClick={handleOpen} className="flex">
        <StatusControl statusId={statusId!} />
      </div>

      <Modal open={open} onClose={handleClose} className="w-[20vw]">
        <Modal.Header>
          <Modal.Title>更新任务状态</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex justify-center">
          <Form {...form}>
            <ChangeStatusFormField defaultValue={statusId!} />
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
    </>
  );
};

export { Trigger as ChangeStatusTrigger };
