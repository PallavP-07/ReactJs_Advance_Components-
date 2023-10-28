import React from "react";
import "../../../Assets/Styles/Quick.css";
import Heading from "../../Heading";
import Pick6img from "../../../Assets/Images/Pick6img.png";
import Knockoutimg from "../../../Assets/Images/Knockoutimg.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Quickplay = () => {
  const { t, i18n } = useTranslation();

  let navigate = useNavigate();
  const MyKnockClick = () => {
    localStorage.setItem("SelectedMenuItem", t("PREDICTIONS"));
    navigate("/prediction", {
      state: { inx: 1, visible: true, name: t("KNOCKOUT_KNOWLEDGE") },
    });
  };

  const MyPick6Click = () => {
    localStorage.setItem("SelectedMenuItem", t("PREDICTIONS"));
    navigate("/prediction", {
      state: { inx: 0, visible: true, name: t("PICK_6") },
    });
  };

  return (
    <div className="mt-2">
      <div className="px-2">
        <Heading
          // className='p-2'
          heading={t("HOME_PREDICT")}
          style={{
            color: " #344054",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        />
      </div>
      <div
        className="col-md-12 d-md-flex flex-md-row justify-content-center gap-2 Quick p-4"
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
      >
        <div
          className="col-md-6 d-flex flex-row justify-content-center p-2"
          onClick={MyPick6Click}
        >
          <img src={Pick6img} className="img-fluid predicimg" alt="..." />
        </div>
        <div
          className="col-md-6 d-flex flex-row justify-content-center p-2"
          onClick={MyKnockClick}
        >
          <img src={Knockoutimg} className="img-fluid predicimg" alt="..." />
        </div>
      </div>
    </div>
  );
};

export default Quickplay;
