import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import "../../../Assets/Styles/Leaguebtn.css"
import { Modal } from "antd";
import { CreateLeagueContent } from '../PopupsContents/CreateLeague';
import { JoinleagueContent } from '../PopupsContents/Joinleague';

const LeagueButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [active, setActive] = useState("");
  const { t, i18n } = useTranslation();
  const [createLeague, setCreateLeague] = useState({
    Club_name: "Corporate",
    League_name: "",
  })
  const [createLeaguePrivate, setCreateLeaguePrivate] = useState({
    Club_name: "Private",
    League_name: "",
  })

  const [createLeagueId, setCreateLeagueId] = useState({
    leagueId: "",
  })
  const imageInputRef = React.useRef();
  const [file, setFile] = useState()
  const showModal = (event) => {
    setActive(event.target.id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setCreateLeague({
      Club_name: "Corporate",
      League_name: "",
    })
    setCreateLeaguePrivate(
      {
        Club_name: "Private",
        League_name: "",
      }
    )
    setIsModalOpen(false);
    imageInputRef.current.value = "";
    setFile(null);
  };
  //For join league
  const openbox = (event) => {
    setActive(event.target.id);
    setopenModal(true);
  };
  const closebox = () => {
    setCreateLeagueId({
      leagueId: "",
    })
    setopenModal(false);
  };
  
  return (
    <div className="col-12 col-md-12 d-md-flex flex-md-row justify-content-end align-items-center">
      <div className="d-flex justify-content-end align-items-center gap-2 ">
        <button onClick={showModal} key={1} id={"1"} className={active === "1" ? "league-Toggle-Button-selected leaguebtn" : "league-Toggle-Button leaguebtn"}>
          {t('CREATE_LEAGUE')}
        </button>
        <button className={active === "2" ? "league-Toggle-Button-selected leaguebtn" : "league-Toggle-Button leaguebtn"} onClick={openbox} key={2} id={"2"}>
          {t('JOIN_LEAGUE')}
        </button>
      </div>
      <Modal
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
        borderRadius={20}
        footer={[]}
      >
        <CreateLeagueContent
          file={file}
          imageInputRef={imageInputRef}
          setFile={setFile}
          setIsModalOpen={setIsModalOpen}
          createLeague={createLeague}
          setCreateLeague={setCreateLeague}
          createLeaguePrivate={createLeaguePrivate}
          setCreateLeaguePrivate={setCreateLeaguePrivate} />
      </Modal>
      <Modal
        title=""
        open={openModal}
        onCancel={closebox}
        borderRadius={20}
        footer={[]}
      >
        <JoinleagueContent createLeagueId={createLeagueId} setCreateLeagueId={setCreateLeagueId} setopenModal={setopenModal} />
      </Modal>
    </div>
  )
}

export default LeagueButtons