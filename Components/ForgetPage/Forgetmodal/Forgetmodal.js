import {  Modal } from "antd";
import React from "react";
import ForgetMain from "../ForgetMain";

const Forgetmodal = ({ title, open, onCancel, style, func, phoneNumber }) => {  
  return (
    <>
      <Modal title={title} open={open} style={style} footer={[]} onCancel={onCancel} >
        <ForgetMain onCancel={onCancel} func={func} phoneNumber={phoneNumber}/>
      </Modal>
    </>
  );
};

export default Forgetmodal;
