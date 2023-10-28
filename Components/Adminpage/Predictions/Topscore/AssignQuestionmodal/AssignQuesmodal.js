import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import InputBox from '../../../../InputBox';
import Buttons from '../../../../Buttons';
import { colors } from '../../../../Color';
const AssignQuesmodal = ({ isModalOpen, handleCancel, handlechange, questions, handleSubmit }) => {
    return (
        <Modal
            title="Assign Questions"
            open={isModalOpen}
            onCancel={handleCancel}
            borderRadius={20}
            footer={[]}
        >
            <div>
                <div className="p-2">
                    <InputBox
                        allowClear
                        placeholder={'Enter the Question'}
                        style={{
                            borderRadius: "5px",
                        }}
                        value={questions.question}
                        onChange={(e) => handlechange(e, "question")}
                    />
                </div>
                <div className='col-12 d-flex flex-row justify-content-center text-center'>
                    <div className='col-6 '>
                        <Buttons
                            style={{
                                backgroundColor: colors.common_color,
                                color: colors.white,
                                borderRadius: "6px",
                            }}
                            text={'Submit'}
                            onClick={() => { handleSubmit(questions.id) }}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AssignQuesmodal;
