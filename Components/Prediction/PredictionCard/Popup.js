import "../../../Assets/Styles/Prediction.css"
import React, { useState, useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import Apidata from "../../../services/PredictionService"
import _ from "lodash"
import Loader from "../../Loader"
function Popup({ teamImg, handleCancel, matchID = {}, toTeam, fromteam }) {
    const [teamhistory, setTeamhistory] = useState();
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (!_.isEmpty(matchID)) {
            GetHistory(matchID)
        }
    }, [matchID]);

    const GetHistory = async (matchID) => {
        setIsLoading(true)
        let Getres = await Apidata.GetpicksixmatchHistory(matchID)
        setIsLoading(false)
        let Responsedata = Getres?.data?.data
        let data = Responsedata?.map((item) => {
            item?.match.map((obj, i) => {
                obj["status"] = item?.lastSix.charAt(i);
                return obj
            })
            return item
        })
        setTeamhistory(data)
    }

    return (
        <>
            <div className="d-flex flex-column p-2">
                <div className='d-flex justify-content-end'>
                    <CloseOutlined width="1em" onClick={handleCancel} />
                </div>
                <div className="d-flex justify-content-around">
                    <div className="col-md-6">
                        <div className="d-md-flex align-items-center px-2">
                            <img src={teamImg[0]} className="teamImg" />
                            <div className="teamPop">{fromteam}</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-md-flex align-items-center px-2">
                            <img src={teamImg[1]} className="teamImg" />
                            <div className="teamPop">{toTeam}</div>
                        </div>
                    </div>
                </div>
                {isLoading ? <Loader /> : <>
                    <div className="d-flex p-3" >
                        {
                            teamhistory?.map((data) => {
                                return (
                                    <>
                                        <div className='col-6 mainpopup px-2'>
                                            {
                                                data?.match?.map((obj) => {
                                                    console.log("obj====>", obj);
                                                    return (
                                                        <>
                                                            <div className='d-flex flex-row gap-1'>
                                                                <div className='col-2 d-flex '>
                                                                    <div className={obj.status === "W" ? "winball" : "lossball"}>
                                                                        {obj.status}
                                                                    </div>
                                                                </div>
                                                                <div className='col-10 '>
                                                                    <div className='wontext '>{`${obj.contestants.homeContestantName} | ${obj.contestants.awayContestantName}`}</div>
                                                                    <div className='wontext '>{`${obj.contestants.homeScore} - ${obj.contestants.awayScore}`}</div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </>}
            </div>
        </>
    )
}

export default Popup;