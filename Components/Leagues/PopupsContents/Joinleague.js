import React, { useState } from "react";
import Button from "../../Buttons";
import { colors } from "../../Color";
import Heading from "../../Heading";
import InputBox from "../../InputBox";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import Apidata from "../../../services/LeagueService";

export const JoinleagueContent = ({ setopenModal, setCreateLeagueId, createLeagueId }) => {
  const login_user = useSelector(state => state.userReducer);
  const userid = login_user.user._id
  const { t, i18n } = useTranslation();

  const handlechange = (event, name) => {
    const { value, files } = event.target;
    setCreateLeagueId({ ...createLeagueId, [name]: value });
  }

  const handleSubmit = async () => {
    const joinleague = {
      "leagueId": createLeagueId.leagueId,
      "userId": userid
    }
    var res = await Apidata.JoinLeague(joinleague)
    if (res.status == 200) {
      setCreateLeagueId({ leagueId: "" })
      setopenModal(false)
      toast.success(res.statusText)
    } else if (res.status == 400) {
      setCreateLeagueId({ leagueId: "" })
      setopenModal(false)
      toast.warn(res.statusText)
    }
  }

  return (
    <>
      <div>
        <Heading
          className="p-2 "
          heading={t("JOIN_LEAGUE")}
          style={{ color: " #344054", fontSize: "16px", fontWeight: "bold" }}
        />

        <div className="pt-2">
          <InputBox
            allowClear
            placeholder={t("ENTER_CODE")}
            style={{
              borderRadius: "5px",
            }}
            value={createLeagueId.leagueId}
            onChange={(e) => handlechange(e, "leagueId")}
          />
        </div>
      </div>
      <div className='col-12 d-flex flex-row justify-content-center text-center'>
        <div className='col-6 mt-2 '>
          <Button
            style={{
              backgroundColor: colors.common_color,
              color: colors.white,
              borderRadius: 4,
            }}
            value={t('JOIN')}
            text={t('JOIN')}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

