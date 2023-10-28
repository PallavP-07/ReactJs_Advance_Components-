import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../../Buttons";
import "../../../Assets/Styles/Signupcard.css";
import "../../../Assets/Styles/Checkbox.css";
import { CloseOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Tabnavigation from "../../Tabnavigation";
import CheckBox from "../../CheckBox";
import Apidata from "../../../services/TeamService";
import ApidataFav from "../../../services/LoginServices";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import InputBox from "../../InputBox";
import { useSelector } from "react-redux";
import Loader from "../../Loader";

const Signupcard = ({ Selected, setTogglebtn, togglebtn, setIndex, progress}) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const imgUrl = "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/";
    const favIcon = "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/favicon.ico";
    const userData = useSelector(state => state.userReducer);
    let userId = userData.user._id;
    let tokken = userData.token

    const tab2 = [
        {
            name: t("FOOTBALL"),
            index: 0,
            visible: true,
            link: "FootBall",
        },

    ];
    const [option, setOption] = useState([]);
    const [loader, setLoader] = useState(true);
    const [allLeague, setAllLeague] = useState([]);
    const [dupAllLeague, setDupAllLeague] = useState([]);
    const [navlink1, setNavlinks1] = useState(tab2);
    const [products, setProducts] = useState([]);
    const [dupproducts, setDupProducts] = useState([]);
    const [selected, setSelected] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(15);
    const [fauvorite, setFauvorite] = useState([]);
    const [search, setSearch] = useState("");
    const [leaguesearch, setLeaguesearch] = useState("");

    useEffect(() => {
        setNavlinks1(tab2);
    }, [i18n.language]);

    useEffect(() => {
        handleChange();
        LeagueData();
        favTeamsndLeague();
    }, []);

    useEffect(() => {
        const results = dupproducts.filter((s) => s.code &&
            s.name.toLowerCase().includes(search.toLowerCase())
        );
        setProducts(results);
    }, [search]);


    useMemo(() => {
        const results = dupAllLeague.filter((s) =>
            s.country.toLowerCase().includes(leaguesearch.toLowerCase())
        );
        setAllLeague(results);
    }, [leaguesearch]);


    const CountryData = async () => {
        let countryList = await Apidata.GetCountryUrl();
        let getCountry = countryList.data;
        let formatChange = [];
        getCountry.map((data, index) => {
            let obj = {
                value: data.id,
                label: data.cityName,
            };
            formatChange.push(obj);
        });
        setOption([...formatChange]);
    };

    const favTeamsndLeague = async () => {
        let teamsAndLeague = await ApidataFav.UserFavTeamsleagueApi(userId)
        let favData = teamsAndLeague.data.data;
        favData.map(item => item["progress"] = progress)
        setFauvorite([...favData])
    }

    const handleChange = async () => {
        let GetTeams = await Apidata.GetTeamUrl();
        setDupProducts(
            GetTeams.data.response.contestant.map((val) => ({
                ...val,
                isChecked: false,
            }))
        );
        setProducts(
            GetTeams.data.response.contestant.map((val) => ({
                ...val,
                isChecked: false,
            }))
        );
        setLoader(false)
    };

    const LeagueData = async () => {
        let leagueList = await Apidata.GetCountryLeagueUrl();
        let getAllLeague = leagueList.data.allLeague;
        setDupAllLeague(getAllLeague.map((val) => ({
            ...val,
            isChecked: false,
        })))
        setAllLeague(
            getAllLeague.map((val) => ({
                ...val,
                isChecked: false,
            }))
        );
    };

    const FavTeamSelected = () =>
        toast("Favourite teams selected successfully.");

    const SubmitApi = async (tag) => {
        if (tag == "Next") {
            setIndex("Select leagues to follow");
            setSelected("Select leagues to follow");
            let toggle_ = [...togglebtn];
            toggle_[0].visible = false;
            toggle_[1].visible = true;
            setTogglebtn(toggle_);
        } else {
            let favrouiteList;
            if (fauvorite.length > 0) {
                favrouiteList = await Apidata.FavoriteTeamsUrl(fauvorite);
                if (favrouiteList.status == 200) {
                    if (undefined !== tokken) {
                        toast.success("Favourite teams selected successfully.")
                        navigate("/home");
                    } else {
                        toast.warn(favrouiteList.statusText)
                        navigate("/");
                    }
                }
            } else {
                setFauvorite([]);
                favrouiteList = await Apidata.FavoriteTeamsUrl(fauvorite);
                toast.warn("No Favourite Teams and League has selected.")
                navigate("/home");
            }

        }
    };

    

    const handleChangeTitle1 = (inx) => {
        navlink1.map((item) => {
            if (item.index == inx.index) {
                item.visible = true;
            } else {
                item.visible = false;
            }
            return item;
        });
        setNavlinks1([...navlink1]);
    };

    const handleCheckteams = (item, tag) => {
        if (tag == "team") {
            let obj = {
                contestantId: item.id,
                tournamentCalendarId: "null",
                type: "team",
                code: item.code,
                progress: progress,
            };
            let findUnq = fauvorite.findIndex(
                (f) => f.contestantId == obj.contestantId
            );
            if (findUnq > -1) {
                setFauvorite(fauvorite.filter((f, i) => i !== findUnq));
            } else {
                setFauvorite([...fauvorite, obj]);
            }
        } else {
            let sampleId
            if (undefined == item.countryCode) {
                sampleId = item.country.toUpperCase()
            } else {
                sampleId = item.countryCode
            }
            let obj = {
                contestantId: "null",
                tournamentCalendarId: item.tournamentCalendarId,
                type: "league",
                code: `${item.competitionCode}_${sampleId}`,
                progress: progress,
            };
            let findUnq = fauvorite.findIndex(
                (f) => f.tournamentCalendarId == obj.tournamentCalendarId
            );
            if (findUnq > -1) {
                setFauvorite(fauvorite.filter((f, i) => i !== findUnq));
            } else {
                setFauvorite([...fauvorite, obj]);
            }
        }
    };

    const renderCheckboxsteams = (teams) => {
        return (teams && teams.length > 0 && teams.slice(minValue, maxValue)).map(
            (item, index) => (
                <div key={item.id} className="signupcard">
                    <div>
                        <div className="d-flex flex-row justify-content-start pt-1">
                            <CheckBox
                                checked={
                                    fauvorite.filter((f) => f.contestantId == item.id).length > 0
                                }
                                onChange={(e) => handleCheckteams(item, "team")}
                            />
                        </div>
                        <img
                            src={`${imgUrl}${item.code}${".png"}`}
                            style={{ width: 50, height: 50,margin:5  }}
                            alt={item.code}
                            onError={(event) => {
                                event.target.src = favIcon;
                                event.onerror = null;
                            }}
                        />
                        <div>{item.code}</div>
                    </div>
                </div>
            )
        );
    };
    const handlechangepage = (page, pageSize) => {
        setMinValue((pageSize - 1) * 15);
        setMaxValue(pageSize * 15);
    };

    const handleRemove = (data) => {
        if (data.type == "team") {
            setFauvorite(
                fauvorite.filter((f) => f.contestantId !== data.contestantId)
            );
        } else {
            setFauvorite(
                fauvorite.filter(
                    (f) => f.tournamentCalendarId !== data.tournamentCalendarId
                )
            );
        }
    };
    return (
        <div>
            {Selected == 0 ? (
                <>
                    <div className="d-flex justify-content-end mr-2 mt-4">
                        <div>
                            <InputBox
                                prefix={<SearchOutlined />}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t('SEARCH_TEAM')}
                                style={{
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: 35,

                                }}
                                iconRender={<SearchOutlined />}
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <Tabnavigation
                            navlink={navlink1}
                            handleChangeTitle={handleChangeTitle1}
                        />
                    </div>
                    {loader ? <Loader /> :
                        <div className="scrollbar  mt-2  ">
                            <div className="container text-center row px-0 row-cols-md-5  ">
                                <div className="row col-md-12 d-flex flex-row mx-1">
                                    {products.length > 0 && renderCheckboxsteams(products)}
                                </div>
                            </div>
                        </div>
                    }
                    <Pagination
                        onChange={(pageSize, page) => handlechangepage(page, pageSize)}
                        className="text-center mt-2"
                        defaultPageSize={15}
                        total={products.length} />
                </>
            ) : (
                <>
                    <div className="d-flex justify-content-end mr-2 mt-4 ">
                        <div>
                            <InputBox
                                prefix={<SearchOutlined />}
                                onChange={(e) => setLeaguesearch(e.target.value)}
                                placeholder={t('SEARCH_LEAGUE')}
                                style={{
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: 35,
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <Tabnavigation
                            navlink={navlink1}
                            handleChangeTitle={handleChangeTitle1}
                        />
                    </div>
                    <div className="scrollbar mt-2">
                        <div className="container text-center row  px-3">
                            {allLeague.map((data, index) => (
                                <div className="signupcard ">
                                    <div>
                                        <div className="d-flex flex-row justify-content-start pt-1">
                                            <CheckBox
                                                checked={
                                                    fauvorite.filter(
                                                        (f) =>
                                                            f.tournamentCalendarId ==
                                                            data.tournamentCalendarId
                                                    ).length > 0
                                                }
                                                onChange={(e) => handleCheckteams(data, "league")}
                                            />
                                        </div>
                                        <img
                                            src={`${imgUrl}${data.competitionCode}_${data.countryCode ? data.countryCode : data.country.toUpperCase()}${".png"}`}
                                            style={{ width: 50, height: 50,margin:5 }}
                                            alt={data.countryCode ? data.countryCode : data.competitionCode}
                                            onError={(event) => {
                                                event.target.src = favIcon;
                                                event.onerror = null;
                                            }}
                                        />
                                        <div style={{ marginBottom: 10 }}>{data.countryCode ? data.countryCode : data.competitionCode}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
            <hr className="horizontal_divider" />
           
            <div className="d-flex flex-wrap " >
                {fauvorite &&
                    fauvorite.map((cal) => {
                        return (
                            <div className="m-1">
                                <div className="signupcards" >
                                    <div className="d-flex flex-row justify-content-end " >
                                        <CloseOutlined
                                            className='p-1'
                                            style={{ fontSize: 8, }}
                                            onClick={() => handleRemove(cal)}
                                        />
                                    </div>
                                    <div className="d-flex flex-row justify-content-center ">
                                        <img
                                        src={`${imgUrl}${cal.code}${".png"}`}
                                        style={{ width: 25 }}
                                        onError={(event) => {
                                            event.target.src = favIcon;
                                            event.onerror = null;
                                        }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="d-flex justify-content-center ">
                <Buttons
                    className="signupcardbtn"
                    text={Selected == 0 ? t('NEXT') : t('SUBMIT')}
                    onClick={() =>
                        SubmitApi(Selected == 0 ? t('NEXT') : t('SUBMIT'))
                    }
                />
            </div>
        </div>
    );
};

export default Signupcard;


