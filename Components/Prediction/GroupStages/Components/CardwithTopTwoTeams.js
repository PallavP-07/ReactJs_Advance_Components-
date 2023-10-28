import React, { useState, useEffect } from "react";
import "../../../../Assets/Styles/Groupstage.css";
import { useTranslation } from 'react-i18next';
import DropdownSearch from "../../../DropdownSearch";
import _ from "lodash"
import moment from "moment";
import Heading from "../../../Heading";
import lockclose from "../../../../Assets/Images/lockclose.svg"
import lockopen from "../../../../Assets/Images/lockopen.svg"

const CardwithtopTwoTeams = ({ groupData, endDate, prediction = {}, point = {}, handleSelect, disabled }) => {
  const [predictedResult, setPredictedResult] = useState([]);
  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");
  const [teamA, setTeamA] = useState(groupData.formatTeams[0].label);
  const [teamB, setTeamB] = useState(groupData.formatTeams[1].label);
  const { t, i18n } = useTranslation();
  const [teamsVisible, setTeamsVisible] = useState(false)
  const [pointResult, setPointResult] = useState("");

  useEffect(() => {
    if (!_.isEmpty(predictedResult)) {
      let teamOne = _.find(predictedResult, { place: 0 });
      let teamTwo = _.find(predictedResult, { place: 1 });
      if (!_.isEmpty(teamOne)) {
        setTeamOne({ label: teamOne?.label, value: teamOne?.id })
      }
      if (!_.isEmpty(teamTwo)) {
        setTeamTwo({ label: teamTwo?.label, value: teamTwo?.id })
      }
    }
  }, [predictedResult]);

  useEffect(() => {
    if (!_.isEmpty(prediction)) {
      let predictedResult = prediction?.results;
      if (!_.isEmpty(predictedResult)) {
        setPredictedResult(predictedResult);
      }
    }
  }, [prediction]);
  useEffect(() => {
    if (point?.points) {
      setPointResult(point?.points);
    } else {
      setPointResult("");
    }
  }, [point]);

  useEffect(() => {
    handleInvisible()
  }, [])

  const handleInvisible = () => {
    let currentDate = moment().local().format("LLL");
    let endDateFormat = moment(endDate).local().format("LLL");
    if (currentDate === endDateFormat) {
      setTeamsVisible(true)
    }
  }
  return (
    <>
      <div className="col-md-12  d-md-flex flex-md-column">
        <h5 className="GroupHadding mt-2">{groupData.groupname}</h5>
        <div className={disabled ? "SecondCard1" : "SecondCard"}>
          <div className='text-center text-white mb-1 d-none'>
            {pointResult && <Heading
              heading={`${pointResult} Point`}
              style={{ color: "#ffffff", fontSize: "14px", fontWeight: "400" }}
            />
            }
          </div>
          <div className='col-md-12 d-md-flex'>
            <div className="col">
              <div className="cardbody d-flex  ">
                <div className="col-1">
                  {disabled ?
                    <div className="col-2 lockedimage1">
                      <img src={lockclose}></img>
                    </div> :
                    <div className="col-2 lockedimage">
                      <img src={lockopen}></img>
                    </div>
                  }
                </div>
                <div className="col-5 d-flex flex-row justify-content-center align-items-center">
                  <h5 className="headingstyle ">{t('TOP_OF_GROUP')}</h5>
                </div>
                <div className="col-5  d-flex flex-row justify-content-center groupstage">
                  <DropdownSearch
                    isDisabled={disabled}
                    optionList={groupData.formatTeams}
                    handleSelect={(event) => handleSelect(groupData, event, 0)}
                    placeholder="Select spot 1"
                    selectedOptions={teamOne}
                  />
                </div>
              </div>
              <div className="p-2" >
                <div className="hrrowtwoo "></div>
              </div>
              <div className="cardbody d-flex  ">
                <div className="col-1">

                </div>
                <div className="col-5 d-flex flex-row justify-content-center align-items-center ">
                  <h5 className="headingstyle me-2">{t('SECOND_IN_GROUP')}</h5>
                </div>
                <div className="col-5  d-flex flex-row justify-content-center groupstage">
                  <DropdownSearch
                    isDisabled={disabled}
                    optionList={groupData.formatTeams}
                    handleSelect={(event) => handleSelect(groupData, event, 1)}
                    placeholder="Select spot 2"
                    selectedOptions={teamTwo}
                  />
                </div>
              </div>
            </div>
            {teamsVisible &&
              <div className="col-4 text-center d-flex flex-column justify-content-around cardborderleft">
                <div className="col-12 d-flex flex-row justify-content-center">
                  <h5 className="headingstyle  p-2">Top 2 teams</h5>
                </div>
                <div className="secondhadding d-flex flex-column justify-content-center">
                  <div className="col-12 d-flex flex-row justify-content-center">
                    {/* <div className="col-6 d-flex flex-row justify-content-center">
                      <img src={USA} width={30} height={30} />
                      </div> */}
                    <div className="col-6 d-flex flex-row justify-content-start">
                      <h5 className="toptowteamname ps-2">{teamA}</h5>
                    </div>
                  </div>
                </div>
                <div className=" col-12 d-flex flex-row justify-content-center ">
                  {/* <div className=" col-6 d-flex flex-row justify-content-center" >
                    <img src={Bahrain} />
                    </div> */}
                  <div className=" col-6 d-flex flex-row justify-content-start" >
                    <h5 className="toptowteamname ps-2">{teamB}</h5></div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default CardwithtopTwoTeams;
