import React, { useState } from 'react'
import { Modal } from "antd";
import Uploadicon from "../../../../../Assets/Images/Uploadcoloricon.svg"
import { Upload, Button, message } from 'antd';
import InputBox from '../../../../InputBox';
import Buttons from '../../../../Buttons';
import { colors } from '../../../../Color';
import Selectbox from '../../../../Selectbox';
const Modals = ({ isModalOpen, handleCancel, positionValue, handlechange, imageInputRef, PrizeValue, tablestate, handleSubmit, handlechangeEvent, handlechangeData }) => {

    const [option, setOption] = useState([{ label: "Top Prize", value: "Top Prize" }, { label: "Weekly Prize", value: "Weekly Prize" }]);

    return (
        <Modal
            title="Prizes"
            open={isModalOpen}
            onCancel={handleCancel}
            borderRadius={20}
            footer={[]}
        >
            <div>
                <div className="p-2">
                    <InputBox
                        allowClear
                        placeholder={'Prize Position(1/2/3)'}
                        style={{
                            borderRadius: "5px",
                        }}
                        value={positionValue}
                        onChange={(e) => handlechangeEvent(e, "name")}
                    />
                </div>
                <div className="p-2">
                    <Selectbox
                        option={option}
                        defaultValue={PrizeValue}
                        placeholder="Prize(TopPrize or WeeklyPrize)"
                        handleChange={handlechangeData}
                        bordered={true}
                        style={{
                            width: "60%",
                        }}
                    />
                </div>
                <div className="p-2">
                    <input type="file" ref={imageInputRef} onChange={(e) => handlechange(e, "fileName")} />
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
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Modals