import React, { useState, useEffect } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { FiLock, FiUnlock } from "react-icons/fi"
import "../../../Assets/Styles/Prediction.css"
import PopularPred from "./PopularPrediction";
import ScoreCard from "../PredictionCard/ScoreCard";
import Trivia from "../PredictionCard/Trivia";
import Napoli from "../../../Assets/Images/Ateams.png"
import Team from "../PredictionCard/Team";
import Popup from "../PredictionCard/Popup";
import NumericInput from "../../NumericInput";
import Heading from "../../Heading";
import _ from 'lodash'
import moment from "moment";
import utils from "../../utils";
import lockclose from "../../../Assets/Images/lockclose.svg"
import lockopen from "../../../Assets/Images/lockopen.svg"

const imgUrl = "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/";
const favIcon =
    "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/favicon.ico";
function MainCard({ footer, matchDayId = "", teamanalysis, question = {}, savePrediction, handleSelect, point = {}, handleBlur, datas = {}, index, togglebtn, prediction, disabled = {} }) {
    const [ActivePopup, setActivePopup] = useState(false);
    const [matchID, setMatchID] = useState("");
    const [predictedResult, setPredictedResult] = useState([]);
    const [knockdate, setKnockDate] = useState();
    const [contestants, setContestants] = useState([]);
    const [optionsList, setOptionsList] = useState([]);
    const [questionName, setQuestionName] = useState({});
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [exactAnswer, setExactAnswer] = useState("");
    const [pointResult, setPointResult] = useState("");
    const [Teamanalysis, setTeamanalysis] = useState([]);
    useEffect(() => {
        if (!_.isEmpty(question)) {
            let options = question?.options;
            if (!_.isEmpty(options)) {
                setExactAnswer(question?.answer);
                setOptionsList(options?.map(obj => ({ "label": obj, "value": obj })))
            }
            let questionName = question?.question?.length > 0 ? question?.question[0] : "";
            if (!_.isEmpty(questionName)) {
                setQuestionName(questionName);
            }
        }
    }, [question]);

    useEffect(() => {

        if (!_.isEmpty(datas)) {
            setMatchID(datas);
            let contestants = datas?.matchInfo?.contestant;
            if (!_.isEmpty(contestants)) {
                setContestants(contestants)
            }
            if (datas?.date_time) {
                let dateZ = datas?.date_time
                setKnockDate(dateZ);
            } else {
                let date = datas.matchDate.replaceAll('Z', 'T')
                // let time = data.matchTime.replaceAll('Z', '.000Z')
                let dateZ = `${date}${datas.matchTime}`;
                let dateFormat = moment(dateZ).format('LLL');
                setKnockDate(dateFormat);
            }
        }
    }, [datas]);

    useEffect(() => {
        if (togglebtn == 1) {
            let matchInfo = datas
            setMatchID(matchInfo)
            let date = datas.matchDate.replaceAll('Z', 'T')
            // let time = data.matchTime.replaceAll('Z', '.000Z')
            let dateZ = `${date}${datas.matchTime}`;
            let dateFormat = utils.getLocalTime(dateZ)
            setKnockDate(dateFormat)
        }
    }, []);

    useEffect(() => {
        if (!_.isEmpty(prediction)) {
            let predictdata = prediction?.results
            if (!_.isEmpty(predictdata)) {
                setPredictedResult(predictdata);
            } else {
                setPredictedResult([]);
            }
            setSelectedAnswer(prediction?.secondaryAnswer);
        } else {
            setPredictedResult([]);
            setSelectedAnswer("");
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
        if (!_.isEmpty(teamanalysis)) {
            let data = teamanalysis.sort((a, b) => a.percentage - b.percentage).reverse();
            setTeamanalysis(data);
        } else {
            setTeamanalysis();
        }
    }, [teamanalysis]);

    const handleCancel = () => {
        setActivePopup(false);
    };
    const handleOptionChange = async (answer) => {
        if (!_.isEmpty(prediction)) {
            let predictionData = { ...prediction };
            predictionData['secondaryAnswer'] = answer;
            savePrediction(predictionData);
        } else {
            let dropDownJSON = {
                tournamentCalenderID: matchID?.tournamentCalendarId,
                matchType: "Pick-Six",
                results: [],
                matchID: matchID?.macthInfoId,
                groupName: ``,
                leagueID: matchID?.competitionId,
                macthDayID: matchDayId,
                questionID: question?._id,
                secondaryAnswer: answer
            }
            savePrediction(dropDownJSON);
        }
        setSelectedAnswer(answer);
    }

    return (
        <>
            <div className="predictioncard card " >
                <div className={disabled ? "card-body unlockedPostion" : "card-body"}>
                    <div className={"col-12 d-flex flex-row"}>
                        <div className="col-4">
                            {disabled ?
                                <div className="col-2 lockedimage1">
                                    <img src={lockclose}></img>
                                </div> :
                                <div className="col-2 lockedimage">
                                    <img src={lockopen}></img>
                                </div>
                            }
                        </div>
                        <div className="col-4 d-flex flex-row justify-content-center mb-2 pointsheader">
                            {pointResult && <Heading
                                heading={`${pointResult} Point`}
                                style={{ color: "#ffffff", fontSize: "14px", fontWeight: "400" }}
                            />
                            }
                        </div>
                        <div className="col-4 d-flex flex-row justify-content-end mb-2" onClick={() => { setActivePopup(true) }}>
                            <GoKebabHorizontal className="threeDot" />
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row align-items-center '>
                        <div className=' col-6 d-flex text-center flex-row'>
                            <div className='col-6 '>
                                <img src={`${imgUrl}${matchID?.homeCountryCode}${'.png'}`} alt={matchID?.homeCountryCode} className='predictionImage'
                                    onError={(event) => {
                                        event.target.src = favIcon;
                                        event.onerror = null;
                                    }}
                                />
                                <div className='pt-2 fw-bold teampredict'>
                                    {
                                        matchID?.fromTeam ? matchID?.fromTeam : "??"
                                    }
                                </div>
                            </div>
                            <div className=' col-6 d-flex justify-content-center inputboxstyle' >
                                <NumericInput
                                    disabled={disabled}
                                    required
                                    style={{
                                        borderRadius: "5px",
                                        width: "56px",
                                        height: "50px",
                                        textAlign: "center"
                                    }}
                                    handleSelect={(event) => handleSelect(event, 0, matchID)}
                                    handleSelectBlur={(event) => handleBlur(event, 0, matchID, index)}
                                    value={_.find(predictedResult, { "place": 0 }) || {}}
                                />
                            </div>
                        </div>
                        <div className=' col-6 d-flex text-center flex-md-row '>
                            <div className=' col-6 d-flex justify-content-center inputboxstyle' >
                                <NumericInput
                                    disabled={disabled}
                                    maxLength={1}
                                    required
                                    style={{
                                        borderRadius: "5px",
                                        width: "56px",
                                        height: "50px",
                                        textAlign: "center"
                                    }}
                                    handleSelect={(event) => handleSelect(event, 1, matchID)}
                                    handleSelectBlur={(event) => handleBlur(event, 1, matchID, index)}
                                    value={_.find(predictedResult, { "place": 1 }) || {}}
                                />
                            </div>
                            <div className='col-6'>
                                <img src={`${imgUrl}${matchID?.awayCountryCode}${'.png'}`} alt={matchID?.awayCountryCode} className='predictionImage'
                                    onError={(event) => {
                                        event.target.src = favIcon;
                                        event.onerror = null;
                                    }}
                                />
                                <div className='pt-2 fw-bold teampredict'>
                                    {
                                        matchID?.toTeam ? matchID?.toTeam : "??"
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-12 d-flex flex-row justify-content-center align-items-center py-2'>
                        <div className="col-12 d-flex flex-row justify-content-center maincardtime">{knockdate}</div>
                    </div>

                    <div className="col-12 predictcontent py-2 d-flex flex-row justify-content-evenly">
                        {
                            teamanalysis !== undefined &&
                            <div className='col-5 d-flex  flex-column align-items-center'>
                                <PopularPred teamanalysis={Teamanalysis} />
                            </div>
                        }
                        {
                            matchID?.goal?.total?.home !== undefined &&
                            <>
                                <div className='col-auto vl bg-dark d-flex justify-content-start flex-column align-items-center '></div>
                                <div className='col-5  d-flex flex-row justify-content-center align-items-center '>
                                    <ScoreCard summary={[matchID?.goal?.total?.home, matchID?.goal?.total?.away]} />
                                </div>
                            </>
                        }
                    </div>
                    {
                        footer ?
                            <div className="col-12 footercontent d-flex flex-row justify-content-evenly align-items-center">
                                {!_.isEmpty(questionName) &&
                                    <div className='col-5  d-flex justify-content-start flex-column align-items-center  ' style={{ wordWrap: 'normal' }} >
                                        <Trivia teamImg={Napoli}
                                            disabled={disabled}
                                            predictedAnswer={selectedAnswer}
                                            options={optionsList}
                                            questionName={questionName?.question || ""}
                                            handleOptionChange={handleOptionChange}
                                        />
                                    </div>}
                                {!_.isEmpty(exactAnswer) &&
                                    <>
                                        <div className='col-auto vl d-flex justify-content-start flex-column align-items-center '></div>
                                        <div className='col-5 d-flex justify-content-start flex-column align-items-center '>
                                            <Team teamImg={Napoli} exactAnswer={exactAnswer} />
                                        </div>
                                    </>}
                            </div>
                            :
                            <></>
                    }
                </div>
                {ActivePopup == true ? (
                    <div className="popup " style={ActivePopup == true ? { position: "absolute", left: '0', right: '0' } : {}}>
                        <div className="">
                            <Popup
                                matchID={matchID?.macthInfoId}
                                fromteam={matchID?.fromTeam}
                                toTeam={matchID?.toTeam}
                                teamImg={[`${imgUrl}${matchID?.homeCountryCode}${'.png'}`, `${imgUrl}${matchID?.awayCountryCode}${'.png'}`]}
                                handleCancel={handleCancel}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}
export default MainCard