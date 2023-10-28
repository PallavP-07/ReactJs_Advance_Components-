import React, { useState } from 'react'
import { Modal } from "antd";
import Buttons from '../../../../Buttons';
import { colors } from '../../../../Color';
import Selectbox from '../../../../Selectbox';

const Topbannermodal = ({ isModalOpen, handleCancel, handlechange, handleSubmit, imageInputRef, handlechangeData, tablestate }) => {
    const [option, setOption] = useState([{ label: "Home", value: "Home" },
    { label: "Fixture", value: "Fixture" },
    { label: "Prediction", value: "Prediction" },
    { label: "Prize", value: "Prize" },
    { label: "My Leagues", value: "MyLeagues" },
    { label: "Leaderboard", value: "Leaderboard" },
    { label: "Match Rooms", value: "MatchRooms" },
    { label: "How to Play", value: "HowtoPlay" },
    { label: "Signin", value: "Signin" },
    { label: "Signup", value: "Signup" },

    ]);

    const [position, setPosition] = useState([{ label: "Top", value: "Top" },
    { label: "Bottom", value: "Bottom" },
    { label: "Left", value: "Left" },
    { label: "Right", value: "Right" }]);

    return (
        <Modal
            title="Ad Banners  "
            open={isModalOpen}
            onCancel={handleCancel}
            borderRadius={20}
            footer={[]}
        >
            <div>
                <div className="p-2">
                    <Selectbox
                        option={option}
                        defaultValue={tablestate.screenName || "Select"}
                        handleChange={(e) => handlechangeData(e, "screenName")}
                        bordered={true}
                        style={{
                            width: "80%",
                        }}
                    />
                </div>
                <div className="p-2">
                    <Selectbox
                        option={position}
                        defaultValue={tablestate.screenPosition || "Select"}
                        handleChange={(e) => handlechangeData(e, "screenPosition")}
                        bordered={true}
                        style={{
                            width: "80%",
                        }}
                    />
                </div>
                <div className="p-2">
                    <input type="file"
                        ref={imageInputRef}
                        onChange={(e) => handlechange(e, "fileName")} />
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

export default Topbannermodal