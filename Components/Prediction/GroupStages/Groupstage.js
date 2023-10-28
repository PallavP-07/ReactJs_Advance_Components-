import React, { useState } from 'react'
import CardwithtopTwoTeams from './Components/CardwithTopTwoTeams'
import "../../../Assets/Styles/Groupstage.css"
import Instruction from '../Instruction';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import ApiGroupStageContentdata from "../../../services/PredictionService"
import _ from "lodash"
import { toast } from 'react-toastify';
import moment from 'moment';
import Loader from "../../Loader";

const Groupstage = ({ groupstages = {} }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(true);
  const [groupStage, setGroupStage] = useState([]);
  const [prediction, setPrediction] = useState([])
  const [startDate, setStartDate] = useState();
  const [startDateNotime, setStartDateNotime] = useState();
  const [endDateNotime, setEndDateNotime] = useState();
  const [endDate, setEndDate] = useState();
  const [points, setPoints] = useState([]);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (!_.isEmpty(groupstages)) {
      groupStagesdata();
    }
  }, [])

  useEffect(() => {
    let stageDate = `${groupstages.stageStartDate}`
    let dateZstageDate = stageDate.replaceAll('T', '')
    let stageStartDate = moment(dateZstageDate).format("MMM Do YY");
    let stageDate1 = `${groupstages.stageEndDate}`
    let dateZstageDate1 = stageDate1.replaceAll('Z', '')
    let stageEndDate = moment(dateZstageDate1).format("MMM Do YY");
    setStartDate(stageStartDate)
    setEndDate(stageEndDate)
  }, []);

  useEffect(() => {
    if (prediction.length > 0 && groupStage.length > 0) {
      calculateAndGetPoints()
    }
  }, [prediction, groupStage]);

  const calculateAndGetPoints = async () => {
    let obj = {
      prediction: prediction,
      stages: groupStage,
      matchType: "knock-out-group",
    }
    let Getres = await ApiGroupStageContentdata.calculateGetPoints(obj)
    console.log("res==>", Getres)
    setPoints(Getres.data.points)
  }


  const groupStagesdata = async () => {
    let sendingData = {
      tournamentCalendarId: groupstages?.tournamentCalendarId,
      stageId: groupstages?.stageId
    }
    setIsLoading(true)
    let groupMatchResponse = await ApiGroupStageContentdata.GetMatchesForTheStage(sendingData);
    setIsLoading(false)
    if (groupMatchResponse?.status !== 200) {
    } else {
      let stageDetails = groupMatchResponse.data.stage;
      let updatedStageDetails = stageDetails?.map((group, index) => {
        let teams = group.teams
        let formatTeams = teams.map((teamdatas, index) => {
          return {
            label: teamdatas.contestantName,
            value: teamdatas.contestantId,
            contestantId: teamdatas.contestantId,
            contestantCode: teamdatas.contestantCode
          }
        })
        return {
          groupname: group.groupName,
          competitionId: group.competitionId,
          groupID: group.groupID,
          formatTeams
        }
      });

      let matchDate = `${stageDetails[0]?.startDate} ${"00:00:00Z"}`

      let dateZ = matchDate.replaceAll('Z', 'T')
      if (moment().local().isBefore(moment(dateZ).subtract(30, "minutes"))) {
        setDisabled(false)
      }
      setGroupStage([...updatedStageDetails]);
      setPrediction([...groupMatchResponse?.data?.prediction])
    }
  }

  let tournamentCalendarId = groupstages.tournamentCalendarId;
  const savePredictionAndUpdate = async (data) => {
    let savePrediction = await ApiGroupStageContentdata.InsertPrediction(data)
    if (savePrediction?.status !== 200) {
      toast.warning(savePrediction.Message);
    } else {
      toast.success("Prediction is updated successfully");
      if (prediction.length > 0) {
        let isGroupExist = _.find(prediction, { "groupID": savePrediction?.data?.data?.groupID })

        if (_.isEmpty(isGroupExist)) {
          setPrediction([...prediction, savePrediction?.data?.data]);
        } else {
          let updatedPrediction = prediction?.map(obj => {
            if (obj?.groupID === savePrediction?.data?.data?.groupID) {
              return {
                ...savePrediction?.data?.data
              }
            } else {
              return {
                ...obj,
              }
            }
          })
          setPrediction(updatedPrediction);
        }
      } else {
        setPrediction([savePrediction?.data?.data])
      }
    }
  }

  const handleSelect = async (group, event, index,) => {
    if (prediction.length > 0) {
      let filterData = prediction.filter((item) => item.groupID === group.groupID)
      if (filterData.length > 0) {
        let isSameCountryExist = _.find(filterData[0].results, { id: event.value });
        if (!(_.isEmpty(isSameCountryExist))) {
          toast.warn("This Country Already Selected")
          return
        }
        let updatedPredictedData = filterData.map(obj => {
          let newResult = obj?.results;

          let isUpdateContestantId = _.find(newResult, { place: index });
          if (_.isEmpty(isUpdateContestantId)) {
            newResult.push({
              place: index,
              id: event?.contestantId,
              label: event?.label
            })
          } else {
            newResult = newResult?.map(obj => {
              if (obj?.place === index) {
                return {
                  place: index,
                  id: event?.contestantId,
                  label: event?.label

                }
              } else {
                return {
                  ...obj,
                }
              }
            })
          }
          return {
            ...obj,
            results: newResult
          }
        })
        savePredictionAndUpdate(updatedPredictedData[0]);
      } else {
        let dropDownJSON = {
          tournamentCalenderID: tournamentCalendarId,
          matchType: "Knock-Out",
          results: [{
            place: index,
            id: event.contestantId,
            label: event.label
          },
          ],
          groupID: group?.groupID,
          groupName: group?.groupname,
          macthDayID: "",
          leagueID: group?.competitionId,
          stageID: groupstages?.stageId,
          questionID: ""
        }
        savePredictionAndUpdate(dropDownJSON);
      }
    } else {
      let dropDownJSON = {
        tournamentCalenderID: tournamentCalendarId,
        matchType: "Knock-Out",
        results: [{
          place: index,
          id: event.contestantId,
          label: event.label
        },
        ],
        groupID: group?.groupID,
        groupName: group?.groupname,
        macthDayID: "",
        leagueID: group?.competitionId,
        stageID: groupstages?.stageId,
        questionID: ""
      }
      savePredictionAndUpdate(dropDownJSON);
    }
  }
  useEffect(() => {
  }, [groupStage]);

  return (
    <>
      <div class="mb-5 mt-2 pb-5 px-2">
        <Instruction Instructions={[`${groupstages.name} - ${t("GROUP_STAGE_DESCRIPTION1")}`, t('GROUP_STAGE_DESCRIPTION2')]} />
        <div className='col-6 mt-3'>
          <div className='col-md-12 mb-1 dateText'>{t('FROM')} {startDate} {t('TO')} {endDate}</div>
          <div className='Point'>{"X / " + groupStage.length * 2} {t('X12_POINTS')}</div>
        </div>
        {isLoading ? <Loader /> : <>
          <div className=" col-md-12 row row-cols-md-2">
            {groupStage.length > 0 && groupStage.map((groupData) => {
              return (
                <div className='col col-12 p-2'>
                  <CardwithtopTwoTeams
                    disabled={disabled}
                    key={groupData?.groupID}
                    groupData={groupData}
                    handleSelect={handleSelect}
                    prediction={_.find(prediction, { "groupID": groupData?.groupID }) || {}}
                    endDate={endDate}
                    point={_.find(points, { "matchInfoID": groupData?.groupID }) || {}}
                    groupStage={groupStage}
                  />
                </div>
              )
            })}
          </div>
        </>
        }
        <br /><br /><br />
      </div>
    </>
  )
}

export default Groupstage