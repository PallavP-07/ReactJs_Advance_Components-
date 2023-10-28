import React, { useState, useEffect } from 'react'
import DropdownSearch from '../../DropdownSearch';
import MainCard from '../PredictionCard/MainCard'
import Apidata from "../../../services/PredictionService"
import moment from "moment";
import _ from "lodash"
import ApiGroupStageContentdata from "../../../services/PredictionService"
import { toast } from 'react-toastify';
import Loader from "../../Loader";

const Picksix = ({ Matchdayoption = [], leagueId = {} }) => {
    const [getMatches, setGetMatches] = useState([])
    const [disabled, setDisabled] = useState(true);
    const [prediction, setPrediction] = useState([]);
    const [question, setQuestion] = useState([]);
    const [analysis, setAnalysis] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [points, setPoints] = useState([]);
    const [selectedMatchDay, setselectedMatchDay] = useState({});
    useEffect(() => {
        if (!_.isEmpty(Matchdayoption)) {
            let _index = 0
            for (let i = 0; i < Matchdayoption.length; i++) {
                if (moment().isBefore(moment(Matchdayoption[i].startDate))) {
                    _index = i
                    break;
                }
            }
            handleChanged(Matchdayoption[_index])
            setselectedMatchDay(Matchdayoption[_index])
        }
    }, [Matchdayoption]);

    useEffect(() => {
        if (prediction.length > 0 && getMatches.length > 0 && question.length > 0) {
            calculateAndGetPoints()
        }
    }, [prediction, getMatches, question]);

    const calculateAndGetPoints = async () => {
        let obj = {
            prediction: prediction,
            stages: getMatches,
            question: question,
            matchType: "Pick-Six"
        }
        let Getres = await ApiGroupStageContentdata.calculateGetPoints(obj)
        setPoints(Getres.data.points)
    }

    const handleChanged = async (data) => {
        let sendId = data.value
        let obj = {
            tournamentCalendarId: leagueId,
            matchDayId: sendId
        }
        setIsLoading(true)
        let Getres = await Apidata.GetPicksixdata(obj)
        setIsLoading(false)
        if (Getres.status === 200) {
            let analysis = Getres?.data?.analysis
            let prediction = Getres?.data?.prediction || [];
            let questions = Getres?.data?.questions
            setAnalysis(analysis)
            setPrediction(prediction)
            setQuestion(questions)
            let matchesResponse = Getres.data.data
            let updatedMatchTeam = matchesResponse.map((data, index) => {
                return {
                    ...data
                }
            })
            let matchDate = `${matchesResponse[0].matchDate} ${matchesResponse[0].matchTime}`
            let dateZ = matchDate.replaceAll('Z', 'T')
            if (moment().local().isBefore(moment(dateZ).subtract(30, "minutes"))) {
                setDisabled(false)
            }
            else {
                setDisabled(true)
            }
            setGetMatches([...updatedMatchTeam])
            setselectedMatchDay(data);
        } else if (Getres.status === 201) {
            setGetMatches([]);
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
                    matchType: "Pick-Six",
                    results: [{
                        place: index,
                        point: event,
                    },
                    ],
                    groupName: ``,
                    matchID: matchInfo?.macthInfoId,
                    macthDayID: selectedMatchDay?.value,
                    leagueID: matchInfo.competitionId,
                    questionID: "",
                    stageID: "",
                }
                savePredictionAndUpdate(dropDownJSON);
            }
        } else {
            let dropDownJSON = {
                tournamentCalenderID: matchInfo?.tournamentCalendarId,
                matchType: "Pick-Six",
                results: [{
                    place: index,
                    point: event,
                },
                ],
                matchID: matchInfo?.macthInfoId,
                groupName: ``,
                leagueID: matchInfo?.competitionId,
                macthDayID: selectedMatchDay?.value,
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
            <div className="col-6 col-md-4 pick6matchdropdown d-flex flex-row justify-content-start py-1 mt-2">
                <DropdownSearch
                    handleSelect={handleChanged}
                    placeholder={selectedMatchDay?.label}
                    selectedOptions={selectedMatchDay?.label}
                    optionList={Matchdayoption} />
            </div>
            <div className="row row-cols-md-3 py-1">
                {isLoading ? <Loader /> : <>
                    {
                        getMatches?.length > 0 && getMatches.map((data, index) => {
                            return (
                                <>
                                    <div className='col col-12 p-2'>
                                        <MainCard
                                            matchDayId={selectedMatchDay?.value}
                                            savePrediction={savePredictionAndUpdate}
                                            key={data?.matchInfo?.id}
                                            disabled={disabled}
                                            datas={data}
                                            handleSelect={handleSelect}
                                            handleBlur={handleSelectBlur}
                                            DisableInput={false}
                                            question={_.find(question, { matchId: data?.macthInfoId })}
                                            prediction={_.find(prediction, { "matchID": data?.macthInfoId }) || {}}
                                            point={_.find(points, { "matchInfoID": data?.macthInfoId }) || {}}
                                            teamanalysis={analysis[data?.macthInfoId]}
                                            footer={true} />
                                    </div>
                                </>
                            )
                        })
                    }
                </>}
            </div>
        </>

    )
}

export default Picksix