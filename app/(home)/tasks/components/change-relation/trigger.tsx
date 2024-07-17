"use client";
import { Form } from "@/components/ui/form";
import React from "react";
import { Button, ButtonToolbar, Modal } from "rsuite";
import { CategoryFormField } from "./category";
import { useChangeRelationContext } from "./context";

const Trigger = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const context = useChangeRelationContext();

  if (!context) {
    throw new Error("未包裹 ContextProvider");
  }

  const { form, onSubmit } = context;
  return (
    <>
      <ButtonToolbar>
        <Button
          onClick={handleOpen}
          appearance="link"
          className="text-blue-400 focus:text-blue-700 hover:text-blue-700"
        >
          修改类型
        </Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>修改任务关联类型</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Placeholder.Paragraph /> */}
          <div className="flex flex-col justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="m-4 flex flex-col gap-4">
                  <CategoryFormField />
                </div>
                <Modal.Footer>
                  <Button
                    onClick={async () => {
                      await form.trigger();
                      if (form.formState.isValid) handleClose();
                    }}
                    appearance="primary"
                    type="submit"
                  >
                    保存修改
                  </Button>
                  <Button onClick={handleClose} appearance="subtle">
                    取消
                  </Button>
                </Modal.Footer>
              </form>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export { Trigger as ChangeRelationTrigger };
