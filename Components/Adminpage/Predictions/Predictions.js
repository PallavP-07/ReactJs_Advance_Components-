import React, { useState, useEffect } from 'react'
import Buttons from '../../Buttons'
import Heading from '../../Heading'
import { colors } from "../../../Components/Color"
import TopScore from './Topscore/TopScore'
import DropdownSearch from '../../DropdownSearch'
import Addicon from "../../../Assets/Images/Addcoloricon.svg"
import AdminApidata from "../Services/AdminServices"
import Apidata from "../../../services/PredictionService"
import { toast } from 'react-toastify'
import _ from "lodash";
import InputBox from '../../InputBox'
import moment from "moment";
import utils from "../../utils";
const AdminPredictions = () => {
    const [Matchoption, setMatchoption] = useState()
    const [Pickleague, setPickleague] = useState();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectMatchday, setSelectMatchday] = useState([]);
    const [selectmatch, setSelectmatch] = useState([]);
    const [asignmatchday, setAsignmatchaday] = useState("")
    const [inputvisible, setInputvisible] = useState(true)
    useEffect(() => {
        if (!_.isEmpty(Matchoption)) {
            handleChange(Matchoption[0]);
            setSelectedOptions(Matchoption[0].label);
        } else {
            setSelectedOptions("");
        }
    }, [Matchoption]);
    const handleChange = async (value) => {
        setSelectMatchday(value)
        setSelectedOptions(value?.label);
        let obj = {
            tournamentCalendarId: Pickleague.tournamentCalendarId,
            matchDayId: value.value
        }
        let Getres = await Apidata.GetPicksixdata(obj)
        setSelectmatch([])
        let Getseletedmatch = Getres.data.data
        let selectMatchTeam = Getseletedmatch.map((data, index) => {
            let dateandtime = `${data.matchDate} ${data.matchTime}`
            return {
                ...data,
                id: data.macthInfoId,
                no: index + 1,
                matches: data.matchName,
                datetime: utils.getLocalTimewithFormat(dateandtime),
            }
        })
        setSelectmatch([...selectMatchTeam])
    }
    const Submitteam = async () => {
        if (selectmatch.length === 6 && selectMatchday.leagueId != undefined) {
            let formatChange = []
            let Matchdate = []
            selectmatch.map((data, index) => {
                formatChange.push(data.id);
                let obj = { matchDate: data.matchDate }
                Matchdate.push(obj);
            })
            let filterDate = Matchdate.sort((a, b) => new moment(a.matchDate) -
                new moment(b.matchDate))
            let obj = {
                leagueId: selectMatchday.leagueId,
                matchDayID: selectMatchday.value,
                matchInfoIds: formatChange,
                startDate: filterDate[0].matchDate,
                endDate: ""
            }
            // var answer = window.confirm("You are Create the Pick 6 Match?");
            // if (answer) {
            let res = await AdminApidata.Picksix(obj);
            if (res.status === 200) {
                toast.success(`${"Pick 6 Matches is "}${res.data.message}`);
            }
            // }
        } else {
            toast.warn("Pls Select the 6 Teams & Matchdays ")
        }
    }
    const Matchchange = (event) => {
        const { value } = event.target;
        setAsignmatchaday(value)
    }
    const addMatch = async () => {
        if (asignmatchday == "") {
            toast.warn("Required field is missing...")
            return
        }
        let obj = {
            matchDays: asignmatchday,
            leagueName: Pickleague.leaguename,
            leagueCode: Pickleague.leagueCode,
            leagueId: Pickleague.tournamentCalendarId,
        }
        var answer = window.confirm("You are Create the MatchDay?");
        if (answer) {
            let Matches = await AdminApidata.Addmatchdays(obj)
            let Response = Matches.data.data
            let MatchChange = [];
            Response.map((datas, index) => {
                let obj = {
                    label: datas.matchDays,
                    value: datas._id,
                    leagueId: datas.premierLeagueID,
                };
                MatchChange.push(obj);
            });
            setMatchoption([...MatchChange]);
            setAsignmatchaday("")
            setInputvisible(!inputvisible)
            if (Matches.status === 200) {
                toast.success(`${"Matchday is "}${Matches.data.message}`);
            }
        }
    }

    return (
        <>
            <div class="m-2">
                <div >
                    <div className="col-md-12 d-md-flex flex-md-row justify-content-between p-2">
                        <Heading
                            heading="Predictions"
                            style={{
                                color: " #344054",
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                        />
                    </div>
                    <div className=' col-md-12 d-flex flex-row justify-content-between'>
                        <div className='col-md-10 d-flex flex-row gap-2 adminpredictionmatchdaydropdown'>
                            <div>
                                <DropdownSearch
                                    handleSelect={handleChange}
                                    placeholder={selectedOptions}
                                    selectedOptions={selectedOptions}
                                    optionList={Matchoption}
                                />
                            </div>
                            <div className='d-flex flex-columns align-items-center' onClick={() => { setInputvisible(!inputvisible) }}>
                                <img src={Addicon} />
                            </div>
                            {
                                inputvisible === false && <>
                                    <div className='d-flex flex-columns align-items-center'>
                                        <InputBox
                                            allowClear
                                            placeholder={"Add Week"}
                                            style={{
                                                borderRadius: "5px",
                                                width: "100%"
                                            }}
                                            value={asignmatchday}
                                            onChange={(e) => Matchchange(e, "matchdays")}
                                        />
                                    </div>
                                    <div className='d-flex flex-columns align-items-center'>
                                        <Buttons
                                            style={{
                                                backgroundColor: colors.common_color,
                                                color: colors.white,
                                                borderRadius: "6px",
                                            }}
                                            text={"Submit"}
                                            onClick={() => addMatch()}
                                        />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <TopScore
                        selectmatch={selectmatch}
                        setSelectmatch={setSelectmatch}
                        Submitteam={Submitteam}
                        setPickleague={setPickleague}
                        setMatchoption={setMatchoption}
                        Matchoption={Matchoption}
                    />
                </div>
            </div>
        </>
    )
}

export default AdminPredictions