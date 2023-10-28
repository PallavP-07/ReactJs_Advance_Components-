import React, { useState, useEffect } from "react";
import LeagueTable from "../LeaguePerformance/ScoreofLeaguTAble";
import Addcoloricon from "../../../Assets/Images/Addcoloricon.svg";
import Minusicon from "../../../Assets/Images/Minusicon.svg";
import { Modal } from "antd";
import { InviteFriendContent } from "../PopupsContents/InviteFriendContent";
import Heading from "../../Heading";
import { useTranslation } from 'react-i18next';
import ApiRemoveUser from "../../../services/LeaderBoardService"
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { DeleteOutlined } from '@ant-design/icons'

export const PrivateSettingContent = ({ setLeagueAdminData, leagueAdminData, leagueData, handleDeleteLeague, selectedLeagueValues, leagueIDvar, leagueDataTablem }) => {
  const UserData = useSelector(state => state.userReducer.user._id);
  const [LeagueDetails, setLeagueDetails] = useState([])
  const { t, i18n } = useTranslation();

  const [inviteFriendpopup, setinviteFriendpopup] = useState(false);

  const openboxFI = () => {
    setinviteFriendpopup(true);

  };
  const closeboxFI = () => {
    setinviteFriendpopup(false);

  };

  useEffect(() => {
    handleDataTable()
    handleLeagueAdmin()
  }, [leagueDataTablem]);

  const handleRemove = async (userId) => {
    if (userId !== UserData) {
      let GetRemoveUser = await ApiRemoveUser.GetRemoveUser({ userId: userId, leagueId: leagueIDvar });
      if (GetRemoveUser.status == 200) {
        toast.success(GetRemoveUser.statusText)
        let deletedUserDetails = []
        leagueDataTablem.map(data => {
          if (data.userId !== userId) {
            let obj = {
              userName: data.userName,
              Suspend: <div><img src={Minusicon} onClick={() => handleRemove(data.userId)} /></div>,
            }
            deletedUserDetails.push(obj)
          }
        })
        setLeagueDetails([...deletedUserDetails]);
      }
    } else {
      toast.warn("You Can't remove yourself")
    }
  }

  const handleDataTable = () => {
    let leagueDataArr = []
    leagueDataTablem.map((data, index) => {
      let obj = {
        userName: data.userName,
        userId: data.userId,
        Suspend: <div><img src={Minusicon} onClick={() => handleRemove(data.userId)} /></div>,
      };
      leagueDataArr.push(obj);
    });
    setLeagueDetails([...leagueDataArr]);
  }
  const Column = [
    {
      title: t('USERNAME'),
      dataIndex: "userName",
      key: "userName",
    },

    {
      title: t('SUSPEND'),
      dataIndex: "Suspend",
      key: "Suspend",
    },
  ];
  const handleLeagueAdmin = () => {

    if (leagueData.leaguAdmin === UserData) {
      setLeagueAdminData(true);
    }
  }

  return (
    <>
      <p>
        <div className="d-flex justify-content-center fw-bold" style={{ fontSize: "16px" }}>{selectedLeagueValues}</div>
        <div className="d-flex justify-content-between align-items-center pt-3 ">
          <Heading
            className='p-2 '
            heading={t('PRIVATE_SETTING')}
            style={{ color: " #344054", fontSize: "16px", fontWeight: "bold" }}
          />
          {leagueAdminData &&
            <div
              className="d-flex align-items-center justify-content-between"
              onClick={openboxFI}
              style={{ cursor: "pointer" }}
            >
              <img src={Addcoloricon} className="px-2" /> {t('INVITE_FRIENDS')}
            </div>
          }
        </div>

        <div className="pt-4">
          <LeagueTable dataSource={LeagueDetails} columns={Column} UserData={UserData} leagueAdminData={leagueAdminData} />
        </div>
        {leagueAdminData &&
          <div className="d-flex flex-row gap-1" onClick={handleDeleteLeague}>
            <DeleteOutlined
              style={{ color: "#F48220", fontSize: "16px" }}
            />
            <div>Delete League</div>
          </div>
        }
      </p>
      <Modal
        title=""
        open={inviteFriendpopup}
        onCancel={closeboxFI}
        width={500}
        padding={10}
        borderRadius={20}
        footer={[<div style={{ textAlign: "center" }}></div>]}
      >
        <InviteFriendContent leagueIDvar={leagueIDvar} />
      </Modal>
    </>
  );
};
