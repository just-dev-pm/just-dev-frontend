"use client";
import { Form } from "@/components/ui/form";
import React from "react";
import { Button, ButtonToolbar, Modal } from "rsuite";
import { CategoryFormField } from "./category";
import { useNewRelationContext } from "./context";
import { FromFormField } from "./from";
import { RelationTypePicker } from "./picker";
import { ToFormField } from "./to";

const Trigger = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isPre, setIsPre] = React.useState(true);

  const context = useNewRelationContext();

  if (!context) {
    throw new Error("未包裹 ContextProvider");
  }

  const { form, onSubmit, taskId } = context;
  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen}>添加关联</Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>添加任务关联</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Placeholder.Paragraph /> */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-center">
              <RelationTypePicker
                onChange={v => {
                  if (v === "A") {
                    form.setValue("to.id", taskId);
                    setIsPre(true);
                  } else {
                    form.setValue("from.id", taskId);
                    setIsPre(false);
                  }
                }}
              />
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="m-4 flex flex-col gap-4">
                  {isPre ? <FromFormField /> : <ToFormField />}
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
                    添加
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

export { Trigger as AddRelationTrigger };
