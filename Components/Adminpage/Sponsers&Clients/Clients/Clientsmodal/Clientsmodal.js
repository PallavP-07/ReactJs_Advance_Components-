import React, { useState } from 'react'
import { Modal } from "antd";
import InputBox from '../../../../InputBox';
import Buttons from '../../../../Buttons';
import { colors } from '../../../../Color';
import Selectbox from '../../../../Selectbox';


const Clientsmodal = ({ isModalOpen, handleCancel, handlechange,ClientValue,sponsernamevalue,imageInputRef, handleSubmit ,handlechangeEvent,handlechangeData}) => {

    const [option, setOption] = useState([{ label: "Sponsers", value: "Sponsers" }, { label: "Clients", value: "Clients" }]);

    return (
        <Modal
            title="Sponsers and Clients"
            open={isModalOpen}
            onCancel={handleCancel}
            borderRadius={20}
            footer={[]}
        >
            <div>
                <div className="p-2">
                    <InputBox
                        allowClear
                        placeholder={'Sponsers or Clients Name'}
                        style={{
                            borderRadius: "5px",
                        }}
                        value={sponsernamevalue}
                        onChange={(e) => handlechangeEvent(e,"name")}
                    />
                </div>
                <div className="p-2">
                    <Selectbox
                        option={option}
                        defaultValue={ClientValue}
                        placeholder="Select"
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

export default Clientsmodal