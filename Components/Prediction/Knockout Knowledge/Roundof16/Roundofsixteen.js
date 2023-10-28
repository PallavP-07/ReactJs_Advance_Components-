import React, { useEffect, useState } from 'react'
import Instruction from '../../Instruction'
import MainCard from '../../PredictionCard/MainCard'
import { useTranslation } from 'react-i18next';
import ApiGetMatchesForOtherStages from "../../../../services/PredictionService"
import ApiGroupStageContentdata from "../../../../services/PredictionService"
import moment from 'moment';
import _, { flatMap } from "lodash"
import Loader from '../../../Loader';
import { toast } from 'react-toastify';
const Roundofsixteen = ({ menuWithIndex, togglebtn }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(true);
  const [matchInfo, setMatchInfo] = useState([]);
  const { t, i18n } = useTranslation();
  const [prediction, setPrediction] = useState([]);
  const [tabState, setTabState] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [analysis, setAnalysis] = useState();
  const [points, setPoints] = useState([]);
  useEffect(() => {
    GetMatchesForStage()
  }, []);

  useEffect(() => {
    let stageDate = `${menuWithIndex.menuStageStartDate}`;
    let stageStartDate = moment(stageDate.replaceAll('T', '')).format("MMM Do YY");
    let stageDate1 = `${menuWithIndex.menuStageEndDate}`
    let stageEndDate = moment(stageDate1.replaceAll('T', '')).format("MMM Do YY");
    setStartDate(stageStartDate)
    setEndDate(stageEndDate)
  }, []);

  useEffect(() => {
    if (prediction.length > 0 && matchInfo.length > 0) {
      calculateAndGetPoints()
    }
  }, [prediction, matchInfo]);

  const calculateAndGetPoints = async () => {
    let obj = {
      prediction: prediction,
      stages: matchInfo,
      matchType: "knock-out-match",
    }
    let Getres = await ApiGroupStageContentdata.calculateGetPoints(obj)
    console.log("res==>", Getres)
    setPoints(Getres.data.points)
  }

  useEffect(() => {
    if (!_.isEmpty(menuWithIndex)) {
      setTabState({
        tournamentCalendarId: menuWithIndex.menuTournamentCalendarId,
        stageId: menuWithIndex.menuStageId,
        menuIndexs: menuWithIndex.menuIndex,
        menuStageStartDate: menuWithIndex.menuStageStartDate,
        menuStageEndDate: menuWithIndex.menuStageEndDate
      })
    }
  }, [menuWithIndex]);

  const GetMatchesForStage = async () => {
    let sendingData = {
      tournamentCalendarId: menuWithIndex.menuTournamentCalendarId,
      stageId: menuWithIndex.menuStageId,
      menuIndexs: menuWithIndex.menuIndex
    }
    setIsLoading(true)
    let matchDetails = await ApiGetMatchesForOtherStages.GetMatchesForOtherStages(sendingData)
    setIsLoading(false)
    // console.log("response==>", matchDetails.status)
    if (matchDetails.status === 200) {
      let predictionAnalysis = matchDetails?.data?.predictionAnalysis
      // console.log("predictionAnalysis", predictionAnalysis);
      let matchInfo = matchDetails?.data?.data;
      let prediction = matchDetails?.data?.prediction || [];
      let matchDate = `${matchInfo[0]?.matchDate} ${matchInfo[0]?.matchTime}`
      if (moment().local().isBefore(moment(matchDate).subtract(30, "minutes"))) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
      setPrediction(prediction)
      setMatchInfo([...matchInfo])
      setAnalysis(predictionAnalysis)
    }
    else if (matchDetails.status === 201) {
      setMatchInfo([]);
    }
  }

  const savePredictionAndUpdate = async (data) => {
    let savePrediction = await ApiGroupStageContentdata.InsertPrediction(data)
    if (savePrediction?.status !== 200) {
      toast.warning(savePrediction.Message);
    } else {
      toast.success("Prediction is updated successfully");
      if (prediction.length > 0) {
        let isGroupExist = _.find(prediction, { "matchID": savePrediction?.data?.data?.matchID })
        if (_.isEmpty(isGroupExist)) {
          setPrediction([...prediction, savePrediction?.data?.data]);
        } else {
          let updatedPrediction = prediction?.map(obj => {
            if (obj?.matchID === savePrediction?.data?.data?.matchID) {
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

  const handleSelectBlur = async (event, index, matchInfo, matchNo) => {
    if (prediction.length > 0) {
      let filterData = prediction.filter((item) => item.matchID === matchInfo.macthInfoId);
      if (filterData.length > 0) {
        let updatedPredictedData = filterData.map(obj => {
          let newResult = obj?.results;
          let isUpdateContestantId = _.find(newResult, { place: index });
          if (_.isEmpty(isUpdateContestantId)) {
            newResult.push({
              place: index,
              point: event,
            })
          } else {
            newResult = newResult?.map(obj => {
              if (obj?.place === index) {
                return {
                  place: index,
                  point: event,

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
          tournamentCalenderID: matchInfo?.tournamentCalendarId,
          matchType: "Knock-Out",
          results: [{
            place: index,
            point: event,
          },
          ],
          groupName: `${matchInfo?.stage} - ${matchNo}`,
          matchID: matchInfo?.macthInfoId,
          macthDayID: "",
          leagueID: matchInfo.competitionId,
          questionID: "",
          stageID: tabState?.stageId,
        }
        savePredictionAndUpdate(dropDownJSON);
      }
    } else {
      let dropDownJSON = {
        tournamentCalenderID: matchInfo?.tournamentCalendarId,
        matchType: "Knock-Out",
        results: [{
          place: index,
          point: event,
        },
        ],
        matchID: matchInfo?.macthInfoId,
        groupName: `${matchInfo?.stage} - ${matchNo}`,
        macthDayID: "",
        leagueID: matchInfo?.competitionId,
        stageID: tabState?.stageId,
        questionID: ""
      }
      savePredictionAndUpdate(dropDownJSON);
    }
    return;
  }

  const handleSelect = async () => {
  }
  return (
    <>
      <Instruction Instructions={[`${t('8TH_FINALS_DESCRIPTION1')} ${menuWithIndex.menuName}`, t('8TH_FINALS_DESCRIPTION2'), t('8TH_FINALS_DESCRIPTION3')]} />
      <div className='col-6 mt-3'>
        <a>{t('FROM')} {startDate} {t('TO')} {endDate}</a>
        <div className='Point mt-1'>{"X / " + matchInfo.length * 3} {t('X12_POINTS')}</div>
      </div>
      {isLoading ? <Loader /> : <>
        <div className=" col-md-10 row row-cols-md-2 mt-2">
          {matchInfo.map((match, index) => {
            return (
              <div className='col col-12 p-2'>
                <MainCard
                  disabled={disabled}
                  key={match?.macthInfoId}
                  DisableInput={false}
                  footer={false}
                  handleSelect={handleSelect}
                  handleBlur={handleSelectBlur}
                  datas={match}
                  togglebtn={togglebtn}
                  tabState={tabState}
                  point={_.find(points, { "matchInfoID": match?.macthInfoId }) || {}}
                  prediction={_.find(prediction, { "matchID": match?.macthInfoId }) || {}}
                  teamanalysis={analysis[match?.macthInfoId]}
                />
              </div>
            )
          })}
        </div>
      </>
      }
    </>

  )
}

export default Roundofsixteen