import React from "react";
import { Modal } from "antd";

const Modals = ({ content, open, handleFunc, button }) => {
  return (
    <>
      <Modal
        title=""
        open={open}
        onCancel={handleFunc}
        width={255}
        padding={10}
        borderRadius={20}
        footer={[
          { button }
        ]}
      >
        {content}
      </Modal>
    </>
  );
};

export default Modals;
