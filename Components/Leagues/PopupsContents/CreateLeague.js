import React, { useState, useEffect } from "react";
import Button from "../../Buttons";
import { colors } from "../../Color";
import InputBox from "../../InputBox";
import { useTranslation } from 'react-i18next';
import Apidata from "../../../services/LeagueService";
import { toast } from "react-toastify";
import ToggleButton from "../../ToggleButton";
import { useSelector } from 'react-redux';


export const CreateLeagueContent = ({ setFile, file, imageInputRef, setIsModalOpen, createLeague, setCreateLeague, setCreateLeaguePrivate, createLeaguePrivate }) => {
  const login_user = useSelector(state => state.userReducer);
  const userid = login_user.user._id
  const [Selected, setSelected] = useState(0);
  const { t, i18n } = useTranslation();
  const leaguetab = [
    {
      name: t('CORPORATE_LEAGUE'),
      index: 0,
      visible: true,
    },
    {
      name: t('PRIVATE_LEAGUE'),
      index: 1,
      visible: false,

    }
  ]
  const [togglebtn, setTogglebtn] = useState([leaguetab])

  useEffect(() => {
    setTogglebtn(leaguetab);
  }, [i18n.language]);

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

  const handlechange = (event, name) => {
    const { value, files } = event.target;
    setCreateLeague({ ...createLeague, [name]: value });
    setFile(files[0]);
  }
  //corporate league creation
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('data', file)
    formData.append('data', file.name)
    formData.append('data', createLeague.Club_name)
    formData.append('data', createLeague.League_name)
    formData.append('data', userid)
    var res = await Apidata.CreateLeague(formData)
    if (res.status == 200) {
      toast.success(res.statusText)
      setCreateLeague({
        Club_name: "Corporate",
        League_name: ""
      })
      setIsModalOpen(false)
      imageInputRef.current.value = "";
      setFile(null);
    } else {
      toast.warn(res.status)
      setCreateLeague({
        Club_name: "Corporate",
        League_name: ""
      })
      setIsModalOpen(false)
      imageInputRef.current.value = "";
      setFile(null);
    }
  }
  const handlechangePrivate = (event, name) => {
    const { value } = event.target;
    setCreateLeaguePrivate({ ...createLeaguePrivate, [name]: value });
  }
  //private league creation
  const handleSubmitPrivate = async () => {
    const formData = new FormData()
    formData.append('data', createLeaguePrivate.Club_name)
    formData.append('data', createLeaguePrivate.League_name)
    formData.append('data', userid)
    var res = await Apidata.CreateLeague(formData)
    if (res.status == 200) {
      toast.success(res.statusText)
      setCreateLeaguePrivate({
        Club_name: "Private",
        League_name: "",
      })
      setIsModalOpen(false)
    } else {
      toast.warn("Your LeagueName Already exist")
      setCreateLeaguePrivate({
        Club_name: "Private",
        League_name: "",
      })
    }
  }

  return (
    <>
      <div className="">
        <div className="col-12 p-2 d-flex">
          <ToggleButton
            togglebtn={togglebtn}
            handleSelect={handleSelect}
          />
        </div>
        {Selected == 0 ? (
          <div>
            <div className="p-2">
              <InputBox
                allowClear
                placeholder={t('LEAGUE_NAME')}
                style={{
                  borderRadius: "5px",
                }}
                value={createLeague.League_name}
                onChange={(e) => handlechange(e, "League_name")}
              />
            </div>
            <div className="p-2 col-12 align-items-center gap-2">
              <span style={{ fontWeight: "500" }}>{t('UPLOAD_LOGO_PROFILE_IMAGE')}</span>
              <br />
              <div className="mt-2">
                <input type="file" ref={imageInputRef} onChange={(e) => handlechange(e, "fileName")} />
              </div>
            </div>
            <div className='col-12 d-flex flex-row justify-content-center text-center'>
              <div className='col-6 '>
                <Button
                  style={{
                    backgroundColor: colors.common_color,
                    color: colors.white,
                    borderRadius: 4,
                  }}
                  value={t('CREATE')}
                  text={t('CREATE')}
                  onClick={handleSubmit}
                />
              </div>
            </div>
            <div >
            </div>
          </div>

        ) : (
          <>
            <div className="p-2">
              <InputBox
                allowClear
                placeholder={t('LEAGUE_NAME')}
                style={{
                  borderRadius: "5px",
                }}
                value={createLeaguePrivate.League_name}
                onChange={(e) => handlechangePrivate(e, "League_name")}
              />
            </div>
            <div className='col-12 d-flex flex-row justify-content-center text-center'>
              <div className='col-6 '>
                <Button
                  style={{
                    backgroundColor: colors.common_color,
                    color: colors.white,
                    borderRadius: 4,
                  }}
                  value={t('CREATE')}
                  text={t('CREATE')}
                  onClick={handleSubmitPrivate}
                />
              </div>
            </div>
          </>

        )}
      </div>

    </>
  );
};

