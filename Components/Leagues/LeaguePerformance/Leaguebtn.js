import React, { useState } from "react";
import { Modal } from "antd";
import Heading from "../../Heading";
import { PrivateSettingContent } from "../PopupsContents/PrivateSettingsContent";
import ToggleButton from "../../ToggleButton";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import DropdownSearch from "../../DropdownSearch";

const LeagueButton = ({setLeagueAdminData,leagueAdminData,leagueData,handleleagueAdmin,leagueAdmin,handleDeleteLeague,UserData,selectedLeagueValues, leagueDataTablem, loadUserLeague,selectedLeagueOption,setSelectedLeagueOption,leagueDetails,setLeagueDetails, selectedLeague, leagueIDvar, leaguetype }) => {
  console.log("leagueData",leagueData);
  const { t, i18n } = useTranslation();
  const [settingmodal, setsettingmodal] = useState(false);
  const [Selected, setSelected] = useState(0);
 const [leagueAdmins, setLeagueAdmins] = useState([]);
  const [active, setActive] = useState("");
  const leaguetab = [
    {
      name: t('PRIVATE_LEAGUE'),
      index: 0,
      visible: true,
    },
    {
      name: t('CORPORATE_LEAGUE'),
      index: 1,
      visible: false,
    }
  ]
  const [togglebtn, setTogglebtn] = useState([leaguetab])

  useEffect(() => {
    setTogglebtn(leaguetab);
    handleOptionList()
  }, [i18n.language]);

  useEffect(() => {
    setLeagueDetails([])
    handleOptionList()
  }, [Selected]);


useEffect(() => {
}, [leaguetype])

  const handleSelect = (inx) => {
    setSelected(inx.index);
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

  const openbox1 = (event) => {
    setActive(event.target.id);
    setsettingmodal(true);
  };
  const closeboxS = () => {
    setsettingmodal(false);
    setActive(false);
  };

  const handleOptionList = () => {
    if (Selected == 1) {
      let getLeagueArr = []
      leaguetype.map((items) => {
        console.log("items",items);
        if (items.type === "Corporate") {
          let obj = {
            value: items.value,
            label: items.label,
            leaguAdmin : items.leagueAdmin
          }
          getLeagueArr.push(obj)
        }
      })
      setLeagueDetails([...getLeagueArr])
      setSelectedLeagueOption(getLeagueArr[0]?.label)
      loadUserLeague(getLeagueArr[0]);
      setLeagueAdmins([getLeagueArr])
    } else
      if (Selected == 0) {
        let getLeagueArr = []
        leaguetype.map((items) => {
          if (items.type === "Private") {
            let obj = {
              value: items.value,
              label: items.label,
              leaguAdmin : items.leagueAdmin
            }
            getLeagueArr.push(obj)
          }
        })
        setLeagueDetails([...getLeagueArr])
        setSelectedLeagueOption(getLeagueArr[0]?.label)
        loadUserLeague(getLeagueArr[0]);
        setLeagueAdmins([getLeagueArr])
      }
  }

  return (
    <>

      <div className="col-md-12 d-md-flex flex-md-row  justify-content-between">
        <div className="col-md-6  align-items-center my-1">
          <ToggleButton
            togglebtn={togglebtn}
            handleSelect={handleSelect}
          />
        </div>
      </div>
      <div class="d-md-flex justify-content-start align-items-center  pt-3">
        <div className="d-flex col-12 flex-md-row  gap-3 align-items-center pt-2 ">
          <Heading
            heading={t('FILTER')}
            style={{
              fontFamily: "Inter",
              color: " #344054",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
          <div className="col-md-2">
            <DropdownSearch
              handleSelect={loadUserLeague}
              selectedOptions={selectedLeague}
              placeholder={selectedLeagueOption}
              optionList={leagueDetails}
              className="selectboxleader"
              style={{
                fontSize: "12px",
                width: "90%",
              }}
            />
          </div>
          <div>
            <button onClick={openbox1} key={1} id={"1"} className={active === "1" ? "league-Toggle-Button-selected leaguebtn" : "league-Toggle-Button-selected leaguebtn"}>
              Invite Friends
            </button>
          </div>
        </div>
      </div>
      <Modal
        title=""
        open={settingmodal}
        onCancel={closeboxS}
        borderRadius={20}
        footer={[<div style={{ textAlign: "center" }}></div>]}
      >
        <PrivateSettingContent 
        leagueIDvar={leagueIDvar} 
        leagueDataTablem={leagueDataTablem} 
        UserData={UserData}
        selectedLeagueValues={selectedLeagueValues}
        handleDeleteLeague={handleDeleteLeague}
        leagueAdmin={leagueAdmin}
        handleleagueAdmin={handleleagueAdmin}
        leaguetype={leaguetype}
        leagueDetails={leagueDetails}
        leagueAdmins={leagueAdmins}
        leagueData={leagueData}
        leagueAdminData={leagueAdminData}
        setLeagueAdminData={setLeagueAdminData}
        />
      </Modal>
    </>
  );
};

export default LeagueButton;
