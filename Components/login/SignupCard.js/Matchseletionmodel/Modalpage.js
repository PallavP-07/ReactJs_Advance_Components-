import React, { useState } from 'react';
import { Modal } from 'antd';
import Signupcard from '../Signupcard';
import ToggleButton from '../../../ToggleButton';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Modalpage = ({ open, onOk, okText, progress }) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Selected, setSelected] = useState(0);
    const [togglebtn, setTogglebtn] = useState("")

    const handleOk = () => {
        setIsModalOpen(true);
    };
    const onCancel = () => {
        toast.warn("No Favourite Teams and League has selected.")
        navigate("/home");
        setIsModalOpen(false);
      };

    const tab1 = [
        {
            name: t('POPUP_TITLE_HEADING'),
            index: 0,
            visible: true,
        },
        {
            name: t('POPUP_TITLE1_HEADING'),
            index: 1,
            visible: false,

        }
    ]

    useEffect(() => {
        setTogglebtn(tab1)
    }, [i18n.language]);

    useEffect(() => {
        if (togglebtn === null) {
            let updatedTab1 = tab1?.map((tab, index) => {
                if (index == 0) {
                    return {
                        ...tab,
                        visible: true,
                    }
                } else {
                    return {
                        ...tab
                    }
                }
            })
            setTogglebtn(updatedTab1);
        } else {
        }
    }, []);


    const handleSelect = (inx) => {
        if (Selected != inx.index)
            setSelected(inx.index)
        togglebtn.map((item) => {
            if (item.index == inx.index) {
                item.visible = true;
            } else {
                item.visible = false;
            }
            return item;
        });
        setTogglebtn([...togglebtn]);
    }
    return (
        <div >
            <Modal
                style={{
                    top: 30,
                }}
                open={open}
                onOk={onOk}
                onCancel={onCancel}
                okText={okText}
                width={600}
                footer={
                    <></>
                }
            >
                <div className="mt-4">
                    <div className='d-flex justify-content-center'>
                        <ToggleButton
                            togglebtn={togglebtn}
                            handleSelect={handleSelect}
                        />
                    </div>
                    <div>
                        <Signupcard
                            Selected={Selected}
                            setTogglebtn={setTogglebtn}
                            togglebtn={togglebtn}
                            setIndex={setSelected}
                            progress={progress}                           
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Modalpage;

