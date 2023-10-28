import React, { useState, useEffect } from "react";
import Apidata from "../../services/FixtureService";
import { AgGridReact } from "ag-grid-react";
import { count } from "rsuite/esm/utils/ReactChildren";
import "../../Assets/Styles/Prediction.css";
import "../../Assets/Styles/Widget.css";
import PopularPred from "../Prediction/PredictionCard/PopularPrediction";
import { UpArrowImageRender } from "../Adminpage/Home/ImageRender";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import ELStriker from "../../Assets/Images/ElStriker.png";

const Fixture2 = () => {
  const { i18n, t } = useTranslation();
  const [competitionData, setCompetitionData] = useState("");
  const [macthData, setMacthData] = useState("");
  const [seasonData, setSeasonData] = useState("");
  const [teamA_Name, setTeamA_Name] = useState("");
  const [teamB_Name, setTeamB_Name] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login_user = useSelector((state) => state?.userReducer);
  let navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const competitionId = urlParams.get("competitionId");
    const macthId = urlParams.get("macthId");
    const seasonId = urlParams.get("seasonId");
    setCompetitionData(competitionId);
    setMacthData(macthId);
    setSeasonData(seasonId);
    templateAPI(macthId);
    WidgetAnalysisApI(macthId);
    const interval = setInterval(() => templateAPI(macthId), 60000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  // setInterval(() => {
  //   templateAPI(macthData);
  // }, 30000);

  const [rowData, setRowdata] = useState([]);
  const [rowData1, setRowdata1] = useState([]);
  const [rowDataTimeLine, setRowDataTimeLine] = useState([]);
  const [Teamanalysis, setTeamanalysis] = useState([]);
  const [columnDefs] = useState([
    {
      field: "name",
      flex: 0.5,
      sorting: true,
      sortable: true,
      cellClass: "locked-col",
      lockPosition: true,
    },
    {
      field: "shirtNo",
      sorting: true,
      sortingOrder: ["asc", "desc"],
      sortable: true,
      flex: 0.3,
      sort: "asc",
      cellClass: "locked-col",
      lockPosition: true,
    },
    {
      field: "position",
      flex: 0.3,
      sorting: true,
      sortable: true,
      cellClass: "locked-col",
      lockPosition: true,
    },
  ]);
  const [columnDefs1] = useState([
    {
      field: "name",
      flex: 0.5,
      sorting: true,
      sortable: true,
      cellClass: "locked-col",
      lockPosition: true,
      minWidth: 200,
    },
    {
      field: "shirtNo",
      sorting: true,
      sortable: true,
      flex: 0.3,
      sort: "asc",
      cellClass: "locked-col",
      lockPosition: true,
      sortingOrder: ["asc", "desc"],
      minWidth: 100,
    },
    {
      field: "position",
      sorting: true,
      flex: 0.3,
      sortable: true,
      cellClass: "locked-col",
      lockPosition: true,
      minWidth: 200,
    },
  ]);
  const [columnDefsTimeLine] = useState([
    {
      field: "time",
      flex: 0.2,
      sorting: true,
      sortable: true,
      cellClass: "locked-col",
      sortingOrder: ["asc", "desc"],
      sort: "asc",
      lockPosition: true,
      minWidth: 100,
    },

    {
      field: "eventType",
      sorting: true,
      sortable: true,
      flex: 0.4,
      cellClass: "locked-col",
      lockPosition: true,
      sortingOrder: ["asc", "desc"],
      minWidth: 150,
    },
    {
      field: "team",
      sorting: true,
      sortable: true,
      flex: 0.5,
      cellClass: "locked-col",
      lockPosition: true,
      sortingOrder: ["asc", "desc"],
      minWidth: 200,
    },
    {
      field: "scorerName",
      sorting: true,
      sortable: true,
      flex: 0.7,
      cellClass: "locked-col",
      lockPosition: true,
      sortingOrder: ["asc", "desc"],
      cellRenderer: "imgRender",
      minWidth: 200,
    },
  ]);
  const WidgetAnalysisApI = async (macthId) => {
    let GetWidgetData = await Apidata.WidgetAnalysisData(macthId);
    let response = GetWidgetData?.data?.analysis[macthId];

    let data = response.sort((a, b) => a.percentage - b.percentage).reverse();
    setTeamanalysis(data);
  };
  const templateAPI = async (macthId) => {
    setIsLoading(true);
    let GetWidgetData = await Apidata.WidgetTemplate(macthId);
    setIsLoading(false);
    let widgetData = GetWidgetData?.data?.response?.match;
    let goals = widgetData[0].liveData.goal;
    let card = widgetData[0].liveData.card;
    let substitute = widgetData[0].liveData.substitute;

    var data = widgetData[0]?.liveData;
    let widgetTeamName = widgetData[0]?.matchInfo;
    let TeamAName = widgetTeamName?.contestant[0]?.officialName;
    let TeamAID = widgetTeamName?.contestant[0]?.id;
    let TeamBName = widgetTeamName?.contestant[1]?.officialName;
    var count =
      data.lineUp[0]?.player?.length >= data?.lineUp[1]?.player?.length
        ? data?.lineUp[0]?.player?.length
        : data?.lineUp[1]?.player?.length;
    var lineupArr = [];
    var lineupArr1 = [];

    for (let i = 0; i < count; i++) {
      var players = {};
      var players1 = {};

      players.name = data?.lineUp[0]?.player[i]?.firstName;
      players.shirtNo = data?.lineUp[0]?.player[i]?.shirtNumber;
      players.position = data?.lineUp[0]?.player[i]?.position;
      players1.name = data?.lineUp[1]?.player[i]?.firstName;
      players1.shirtNo = data?.lineUp[1]?.player[i]?.shirtNumber;
      players1.position = data?.lineUp[0]?.player[i]?.position;
      lineupArr.push(players);
      lineupArr1.push(players1);
    }
    setTeamA_Name(TeamAName)
    setTeamB_Name(TeamBName)
    let timeLineArr = []

    goals.map((item) => {
      var timeLine = {};
      timeLine.time = item.timeMin;
      timeLine.scorerName = item.scorerName;
      timeLine.eventType = "Goal";
      timeLine.team = TeamAID == item.contestantId ? TeamAName : TeamBName;
      timeLine.oFFPlayer = "";
      timeLineArr.push(timeLine);
    });

    card.map((item) => {
      var timeLine = {};
      timeLine.time = item.timeMin;
      timeLine.scorerName = item.playerName;
      timeLine.eventType = item.type == "YC" ? "Yellow Card" : "Red Card";
      timeLine.team = TeamAID == item.contestantId ? TeamAName : TeamBName;
      timeLine.oFFPlayer = "red";
      timeLineArr.push(timeLine);
    });

    substitute.map((item) => {
      var timeLine = {};
      timeLine.time = item.timeMin;
      timeLine.scorerName = "Out - " + item.playerOffName + " In - " + item.playerOnName;
      timeLine.eventType = "Substitute";
      timeLine.team = TeamAID == item.contestantId ? TeamAName : TeamBName;
      timeLine["oFFPlayer"] = item.playerOffName;
      timeLine["onPlayer"] = item.playerOnName;
      timeLineArr.push(timeLine);
    });

    setRowDataTimeLine([...timeLineArr]);
    setRowdata(lineupArr);
    setRowdata1(lineupArr1);
  };
  const GotoHomepage = () => {
    if (login_user.user.email === "admin@gmail.com") {
      localStorage.setItem("SelectedMenuItem", t("HOME"));
      navigate("/adminhome");
    } else {
      localStorage.setItem("SelectedMenuItem", t("HOME"));
      navigate("/home");
    }
  };

  return (
    <>
      <div className="widgetHeade">
        <div
          className="firstNavbar navbarInside widgetNav p-0 px-1"
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <nav className="navbar navbar-expand-xl">
            <div className="container-fluid">
              <a className="navbar-brand margin-auto" onClick={GotoHomepage}>
                <div className="col col-md-12 ">
                  <img src={ELStriker} width={"90%"} alt="ElStriker" />
                </div>
              </a>
              {/* <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mynavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button> */}
              {/* <div className=" collapse navbar-collapse" id="mynavbar">
                <div className="col col-md-3">
                  <div className="col-12  d-flex justify-content-center gap-1">
                    {
                      login_user.user.usertype === "admin" ? <></> :
                        <div className="col-3 d-flex flex-row justify-content-start align-items-center  ">
                          <Selectbox
                            option={options}
                            defaultValue={i18n.language}
                            handleChange={handleChange}
                            style={{
                              width: "100%",
                            }}
                          />
                        </div>
                    }
                  </div>
                </div>
              </div> */}
            </div>
          </nav>
        </div>
      </div>


      <div className="col-12 px-md-5">
        <div className="d-flex flex-row">
          <div className="col-12">
            <opta-widget
              widget="live_action"
              competition={competitionData}
              season={seasonData}
              match={macthData}
              template="normal"
              data_type="runningball"
              dimension="3D"
              live="true"
              show_match_header="true"
              show_score="true"
              show_halftime_score="false"
              show_attendance="false"
              show_venue="false"
              show_team_formation="false"
              show_referee="false"
              show_date="false"
              date_format="dddd D MMMM YYYY"
              show_crests="true"
              show_competition_name="false"
              competition_naming="full"
              team_naming="full"
              show_direction_of_play="false"
              goal_replay="false"
              show_timeline="false"
              show_event_counters="true"
              show_weather="false"
              show_match_countdown="false"
              show_event_message_logo="false"
              weather_animation="5"
              plot_events="2"
              animation_speed="normal"
              team_colours="true"
              branding="stats_perform"
              flattened_background="true"
              zoom="true"
              show_dfp="false"
              dfp_controls="false"
              dfp_playstate="Autoplay, mute"
              dfp_mode="default"
              dfp_initial_delay="0"
              dfp_ad_spacing="10"
              external_link_target="_blank"
              flyaway="false"
              flyaway_closure="3"
              flyaway_width="500"
              flyaway_position="bottom_right"
              flyaway_return="true"
              show_live="false"
              show_logo="false"
              show_title="false"
              breakpoints="300, 600"
              sport="football"
            ></opta-widget>
          </div>
        </div>
      </div>
      <div className="col-12 px-md-5">
        <div className="text-center text-decoration-underline fw-bold m-4 fs-4">
          TIME-LINE & POPULAR PREDICTION
        </div>

        <div className="d-md-flex flex-md-row gap-3">
          {Teamanalysis.length > 0 && (
            <div className="col-md-4">
              <div className="predictioncard predictioncardd card p-4">
                <div className="col-12 predictcontent predictcontentt py-2 d-flex flex-row justify-content-evenly">
                  <div className="col-12 d-flex justify-content-center flex-column align-items-center">
                    <PopularPred
                      teamanalysis={Teamanalysis}
                      count={10}
                      widgetPredictionTextStyle={{
                        color: "#fff",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "20px",
                        fontSize: "30px",
                        marginBottom: "30px",
                        justifyContent: "center!important",
                        textAlign: "center",
                      }}
                      ProgressPercentageStyle={{
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "15px",
                        textAlign: "center",
                        margin: "5px",
                        color: "#FFFFFF",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={
              Teamanalysis.length > 0
                ? "col-md-8 mt-2 mt-md-0"
                : "col-md-12 mt-2 mt-md-0"
            }
          >
            {/* <p className="text-center fw-bold mt-3">{teamB_Name}</p> */}
            <div
              className="ag-theme-alpine"
              style={{ height: "50vh", width: "auto" }}
            >
              <AgGridReact
                rowData={rowDataTimeLine}
                columnDefs={columnDefsTimeLine}
                suppressDragLeaveHidesColumns={true}
                frameworkComponents={{
                  imgRender: UpArrowImageRender,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 px-md-5 mt-4">
        <div className="text-center text-decoration-underline fw-bold mt-1 fs-4">
          LINE-UP
        </div>
        <div className="d-md-flex flex-md-row gap-3">
          <div className="col-md-6 ">
            <p className="text-center fw-bold mt-3">{teamA_Name}</p>
            <div
              className="ag-theme-alpine "
              style={{ height: "80vh", width: "auto" }}
            >
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                suppressDragLeaveHidesColumns={true}
              />
            </div>
          </div>
          <div className="col-md-6">
            <p className="text-center fw-bold mt-3">{teamB_Name}</p>
            <div
              className="ag-theme-alpine"
              style={{ height: "80vh", width: "auto" }}
            >
              <AgGridReact
                rowData={rowData1}
                columnDefs={columnDefs1}
                suppressDragLeaveHidesColumns={true}
              />
            </div>
          </div>
        </div>
      </div>
      <br></br>
      {/* <div className="col-12 px-2 px-md-5">
        <div className="d-flex flex-row gap-1">
          <div className="col-1"></div>
          <div className="col-5">
            <opta-widget
              widget="live_action"
              competition={competitionData}
              season={seasonData}
              match={macthData}
              template="timeline"
              data_type="runningball"
              dimension="3D"
              live="true"
              show_match_header="true"
              show_score="true"
              show_halftime_score="false"
              show_attendance="false"
              show_venue="true"
              show_team_formation="true"
              show_referee="true"
              show_date="true"
              date_format="dddd D MMMM YYYY"
              show_crests="false"
              show_competition_name="true"
              competition_naming="full"
              team_naming="full"
              show_direction_of_play="false"
              goal_replay="false"
              show_timeline="true"
              show_event_counters="false"
              show_weather="true"
              show_match_countdown="true"
              show_event_message_logo="false"
              weather_animation="5"
              plot_events="2"
              animation_speed="normal"
              team_colours="true"
              branding="stats_perform"
              flattened_background="true"
              zoom="true"
              show_dfp="false"
              dfp_controls="false"
              dfp_playstate="Autoplay, mute"
              dfp_mode="default"
              dfp_initial_delay="0"
              dfp_ad_spacing="10"
              external_link_target="_blank"
              flyaway="false"
              flyaway_closure="3"
              flyaway_width="500"
              flyaway_position="bottom_right"
              flyaway_return="true"
              show_live="true"
              show_logo="false"
              show_title="true"
              breakpoints="415, 600"
              sport="football"
            ></opta-widget>
          </div>
          <div className="col-5">
            <opta-widget
              widget="live_action"
              competition={competitionData}
              season={seasonData}
              match={macthData}
              template="line-up"
              data_type="runningball"
              dimension="3D"
              live="true"
              show_match_header="true"
              show_score="true"
              show_halftime_score="false"
              show_attendance="false"
              show_venue="true"
              show_team_formation="true"
              show_referee="true"
              show_date="true"
              date_format="dddd D MMMM YYYY"
              show_crests="false"
              show_competition_name="true"
              competition_naming="full"
              team_naming="full"
              show_direction_of_play="false"
              goal_replay="false"
              show_timeline="true"
              show_event_counters="false"
              show_weather="true"
              show_match_countdown="true"
              show_event_message_logo="false"
              weather_animation="5"
              plot_events="2"
              animation_speed="normal"
              team_colours="true"
              branding="stats_perform"
              flattened_background="true"
              zoom="true"
              show_dfp="false"
              dfp_controls="false"
              dfp_playstate="Autoplay, mute"
              dfp_mode="default"
              dfp_initial_delay="0"
              dfp_ad_spacing="10"
              external_link_target="_blank"
              flyaway="false"
              flyaway_closure="3"
              flyaway_width="500"
              flyaway_position="bottom_right"
              flyaway_return="true"
              show_live="true"
              show_logo="false"
              show_title="true"
              breakpoints="415, 600"
              sport="football"
            ></opta-widget>
          </div>
          <div className="col-1"></div>
        </div>
      </div> */}
    </>
  );
};

export default Fixture2;
