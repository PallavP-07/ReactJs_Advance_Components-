import React, { useState } from 'react'
import { Modal } from "antd";
import Buttons from '../../Buttons';
import { colors } from '../../Color';
import InputBox from '../../InputBox';
const Exitinguser = ({ isModalOpen, handleCancel }) => {

    return (
        <>
            <Modal
                title="Change Password"
                open={isModalOpen}
                onCancel={handleCancel}
                borderRadius={20}
                footer={[]}
            >
                <div>
                    <div className="p-2">
                        <InputBox
                            allowClear
                            placeholder={'New Password'}
                            style={{
                                borderRadius: "5px",
                            }}
                        />
                    </div>
                    <div className="p-2">
                        <InputBox
                            allowClear
                            placeholder={'Confirm Password'}
                            style={{
                                borderRadius: "5px",
                            }}
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
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default Exitinguser