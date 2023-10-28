import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Components/Sidebar/Sidebar.css";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = ({ sidehandleChangeTitle, sideMenus }) => {
  const login_user = useSelector((state) => state?.userReducer);
  const Adminstyle = login_user.user.usertype
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();
  const colors = ["#F48220"];

  return (
    <div className="Sidemenu" >
      {sideMenus.map((data, index) => {
        return (
          <>
            {data.visible || localStorage.getItem("SelectedMenuItem") == data.name ? (
              <div
                className="col-md-12 d-md-flex flex-md-row p-2 mt-0 mt-sm-3 clicked gap-2"
                onClick={() => sidehandleChangeTitle(data)}
              >
                {colors.map((color) => (
                  <Tooltip
                    title={data.name}
                    color={color}
                    key={color}
                    placement="bottom"
                  >
                    <div className="col-md-2 d-grid  d-md-flex flex-md-row justify-content-center sidebarcontent">
                      <img src={data.img} width={"20px"} />
                    </div>
                  </Tooltip>
                ))}
                <div className="col-md-10 mt-1 d-none d-md-block">
                  {data.name}
                </div>
              </div>
            ) : (
              <div
                className="col-md-12 d-md-flex flex-md-row p-2 mt-0 mt-sm-3 unclicked gap-2"
                onClick={() => sidehandleChangeTitle(data)}
              >
                {colors.map((color) => (
                  <Tooltip
                    title={data.name}
                    color={color}
                    key={color}
                    placement="bottom"
                  >
                    <div className="col-md-2 d-grid  d-md-flex flex-md-row justify-content-center sidebarcontent">
                      <img src={data.img} width={"20px"} />
                    </div>
                  </Tooltip>
                ))}
                <div className="col-md-10 mt-1 d-none d-md-block">
                  {data.name}
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Sidebar;