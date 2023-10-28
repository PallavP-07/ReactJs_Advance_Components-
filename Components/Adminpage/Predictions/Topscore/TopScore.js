import React, { useState, useEffect } from "react";
import Heading from "../../../Heading";
import Addicon from "../../../../Assets/Images/Addcoloricon.svg";
import { colors } from "../../../Color";
import DropdownSearch from "../../../DropdownSearch";
import Apidata from "../../Services/AdminServices";
import Buttons from "../../../Buttons";
import { AgGridReact } from "ag-grid-react";
import Render from "../../Home/ImageRender";
import QuestionModal from "./GetQuestionModal/GetQuestionModal";
import AssignQuesmodal from "./AssignQuestionmodal/AssignQuesmodal";
import { toast } from "react-toastify";
import Answermodal from "./AnswerModal/AnswerModal";
import _ from "lodash";
import utils from "../../../utils";
import moment from "moment";
import Loader from "../../../Loader";
import { Table, Tooltip } from "antd";

const TopScore = ({ setPickleague, setMatchoption, setSelectmatch, selectmatch, Submitteam, question, answerOpt, setQuesoption }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [QuesassignModalOpen, setQuesassignModalOpen] = useState(false);
  const [option, setOption] = useState([]);
  const [matchdata, setMatchdata] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isAnswerModal, setIsAnswermodal] = useState(false);
  const [rowData, setRowData] = useState();
  const [isAnswerClear, setIsAnswerClear] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "No",
      field: "no",
      flex: 0.2,
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Matches",
      field: "matches",
      flex: 0.8,
      sorting: true,
      sortingOrder: ["asc", "desc"],
      sortable: true,
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Date & Time",
      field: "datetime",
      flex: 0.7,
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Add",
      field: "add",
      flex: 0.3,
      cellRenderer: "imgRender",
      cellClass: 'locked-col',
      lockPosition: true,
    },
  ]);

  const [selectcolumnDefs, setselectColumnDefs] = useState([
    {
      headerName: "Matches",
      field: "matches",
      flex: 0.8,
      sorting: true,
      sortingOrder: ["asc", "desc"],
      sortable: true,
      cellClass: 'locked-col',
      lockPosition: true,
      render: cell => <Tooltip title={cell}>{cell[0]}</Tooltip>
    },
    {
      headerName: "Date & Time",
      field: "datetime",
      flex: 0.9,
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Delete",
      field: "delete",
      flex: 0.4,
      cellRenderer: "delRender",
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Ques",
      field: "question",
      flex: 0.4,
      cellRenderer: "quesRender",
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Ans",
      field: "answer",
      flex: 0.4,
      cellRenderer: "quesRender",
      cellClass: 'locked-col',
      lockPosition: true,
    },
  ]);

  const [quescolumnDefs, setQuescolumnDefs] = useState([
    {
      headerName: "No",
      field: "no",
      flex: 0.2,
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Question",
      field: "question",
      flex: 1,
      sorting: true,
      sortingOrder: ["asc", "desc"],
      sortable: true,
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Remove",
      field: "remove",
      flex: 0.4,
      cellRenderer: "delRender",
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Edit",
      field: "edit",
      flex: 0.4,
      cellRenderer: "editRender",
      cellClass: 'locked-col',
      lockPosition: true,
    },
  ]);

  const [questions, setQuestions] = useState({
    id: "",
    question: "",
  });
  const [getquestions, setgetquestions] = useState([]);

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    Getquestions();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(option)) {
      handleChange(option[0]);
      setSelectedOptions(option[0].label);
    }
  }, [option]);

  useEffect(() => {
    if (!_.isEmpty(option)) {
      handleChange(option[0]);
      setSelectedOptions(option[0].label);
    }
  }, [option]);

  const initData = async () => {
    let Getpredictionteams = await Apidata.Getpredictiontable();
    let getdata = Getpredictionteams.data.allLeague;
    let updatedCountryCode = getdata.map((data) => {
      let countryCode = data?.countryCode ? `(${data.countryCode})` : "";
      return {
        ...data,
        value: data.tournamentCalendarId,
        label: `${data.leagueName} ${countryCode}`,
      }
    });
    setOption([...updatedCountryCode]);
    setMatchdata();
  };

  const resultsAndupcoming = (data) => {
    return (data?.filter((item, index) => {
      let date = `${item.matchTime} ${item.matchDate}`
      return moment().isBefore(moment(date));
    })
    )
  }

  const handleChange = async (data) => {
    let tournment = {
      tournamentCalendarId: data.value,
      leaguename: data.label,
      leagueCode: data.countryCode
    };
    let LeagueId = data.value;
    setSelectedOptions(data.label)
    setPickleague(tournment);
    let Getres = await Apidata.ChooseLeague(LeagueId);
    let Response = Getres.data.data;
    setMatchoption([]);
    setMatchdata([]);
    setSelectmatch([]);
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
    setIsLoading(true)
    let GetMatches = await Apidata.Getteams(tournment);
    setIsLoading(false)
    let formatChange = [];
    let getdata = GetMatches.data.matches;
    if (GetMatches.status === 200) {
      let filteredData = resultsAndupcoming(getdata)
      filteredData.map((data, index) => {
        let date = `${data.matchDate} ${data.matchTime}`
        let obj = {
          id: data.macthInfoId,
          no: index + 1,
          matches: data.matchName,
          datetime: utils.getLocalTimewithFormat(date),
          matchDate: date
        };
        formatChange.push(obj);
      });
      setMatchdata([...formatChange]);
    } else {
      toast.warning(GetMatches.statusText);
      setSelectmatch([]);
      setMatchdata([]);
    }
  };

  const selectteam = (data) => {
    let fieldName = data.colDef.field;
    if (fieldName == "add") {
      let datas = data.data;
      let array = [];
      let obj = {
        id: datas.id,
        matches: datas.matches,
        datetime: utils.getLocalTime(datas.datetime),
        matchDate: utils.getLocalTime(datas.matchDate)
      };
      array.push(obj);
      if (selectmatch.length == 0) {
        setSelectmatch((prevState) => {
          return [...prevState, ...array];
        });
      } else {
        let idChecking = selectmatch.some((e) => e.id == datas.id);
        if (!idChecking && selectmatch.length <= 5) {
          setSelectmatch((prevState) => {
            return [...prevState, ...array];
          });
        }
        // else{
        //   toast.warning("already selected the team")
        // }
      }
    }
  };

  const cellselection = (data) => {
    let fieldName = data.colDef.field;
    if (fieldName == "delete") {
      let datas = data.data;
      let afterSplice = selectmatch.filter((item) => {
        if (item.id !== datas.id) {
          return item;
        }
      });
      setSelectmatch([...afterSplice]);
    } else if (fieldName == "question") {
      let datas = data.data;
      setRowData(datas);
      setIsModalOpen(true);
    } else if (fieldName == "answer") {
      let rowData = data.data;
      setRowData(rowData);
      setIsAnswermodal(true);
    }
  };

  const handleCancel = () => {
    setQuestions({ id: "", question: "" });
    setIsModalOpen(false);
  };

  const Quesassignhandlechange = (event, name) => {
    const { value } = event.target;
    setQuestions({ ...questions, [name]: value });
  };
  const handleSubmit = async (id) => {
    if (id) {
      let updatequestions = await Apidata.updateQuestion(questions, id);
      toast.success(updatequestions.statusText);
      setQuestions({ id: "", question: "" });
      setQuesassignModalOpen(false);
      Getquestions();
    } else {
      let Postquestions = await Apidata.Postquestions(questions);
      if (Postquestions.status == 200) {
        toast.success(Postquestions.statusText);
        setQuestions({ id: "", question: "" });
        setQuesassignModalOpen(false);
        Getquestions();
      }
    }
  };

  const assignqueshandleCancel = () => {
    setQuesassignModalOpen(false);
  };

  const handleAnswerCancel = () => {
    setIsAnswermodal(false);
    setIsAnswerClear(true)
  };

  const showModal = () => {
    setQuesassignModalOpen(true);
  };

  const Getquestions = async () => {
    let Getquestions = await Apidata.Getquestions();
    let getdata = Getquestions.data.Results;
    let formatChange = [];
    getdata.map((data, index) => {
      let obj = {
        id: data._id,
        no: index + 1,
        question: data.question,
      };
      formatChange.push(obj);
    });
    setgetquestions([...formatChange]);
  };

  const Questioncellselection = async (data) => {
    let fieldName = data.colDef.field;
    if (fieldName == "remove") {
      let datas = data.data.id;
      let res = await Apidata.Deletequestions(datas);
      if (res.status == 200) {
        toast.success(res.statusText);
        setQuesassignModalOpen(false);
        Getquestions();
      }
    } else if (fieldName == "edit") {
      let datas = data.data;
      setQuestions({ id: data.data.id, question: data.data.question });
      setQuesassignModalOpen(true);
    }
  };

  return (
    <div>
      <div className="col-md-12 d-md-flex flex-md-row justify-content-between p-2">
        <div className=" col-md- 9 d-md-flex flex-md-row justify-content-start align-items-center ">
          <Heading
            heading="Top points scorers in my league"
            style={{
              color: " #344054",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          />
        </div>
        <div className="d-flex col-md-3 flex-row justify-content-between align-items-center gap-1">
          <div className=" col-2 align-items-center">Filter:</div>
          <div className=" col-10 align-items-center adminpredictiondropdown">
            <DropdownSearch
              handleSelect={handleChange}
              placeholder={selectedOptions}
              selectedOptions={selectedOptions}
              optionList={option}
            />
          </div>
        </div>
      </div>
      <div className="row row-cols-md-2 ">
        <div className="col-md-6">
          <>
            <div
              className=" ag-theme-alpine mt-2"
              style={{ height: "50vh", width: "auto" }}
            >
              <AgGridReact
                rowData={selectmatch}
                columnDefs={selectcolumnDefs}
                frameworkComponents={{
                  delRender: Render.DelImageRender,
                  quesRender: Render.AddImageRender,
                }}
                onCellClicked={cellselection}
                suppressDragLeaveHidesColumns={true}
              />
            </div>
            <div className="col-md-12 d-flex flex-row justify-content-end py-2">
              <Buttons
                style={{
                  color: colors.white,
                  borderRadius: 5,
                  fontSize: "15px",
                  width: "20%",
                  backgroundColor: "#F48220",
                }}
                text={"Submit"}
                onClick={Submitteam}
              />
            </div>
          </>
          <>
            <div className="col-12 d-flex flex-row justify-content-between mt-2">
              <div className="d-md-flex flex-md-row justify-content-start align-items-center ">
                <Heading
                  heading="Questions"
                  style={{
                    color: " #344054",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                />
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex align-items-center">
                  <img src={Addicon} />
                </div>
                <a className="LeagueItems" onClick={showModal}>
                  Add Row
                </a>
              </div>
            </div>
            <div
              className=" ag-theme-alpine mt-2"
              style={{ height: "50vh", width: "auto" }}
            >
              <AgGridReact
                rowData={getquestions}
                columnDefs={quescolumnDefs}
                frameworkComponents={{
                  delRender: Render.DelImageRender,
                  editRender: Render.EditImageRender,
                }}
                onCellClicked={Questioncellselection}
                suppressDragLeaveHidesColumns={true}
              />
            </div>
          </>
        </div>
        <div className="col-md-6">
          <div
            className=" ag-theme-alpine mt-2"
            style={{ height: "62vh", width: "auto" }}>
            {isLoading ? <Loader /> :
              <AgGridReact
                rowData={matchdata}
                columnDefs={columnDefs}
                frameworkComponents={{
                  imgRender: Render.AddImageRender,
                }}
                onCellClicked={selectteam}
                pagination={true}
                paginationPageSize={7}
                suppressDragLeaveHidesColumns={true}
              />
            }
          </div>
        </div>
      </div>
      {isModalOpen && (
        <QuestionModal
          handleSubmit={handleSubmit}
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          setIsModalOpen={setIsModalOpen}
          rowData={rowData}
          setAnswerClear={setIsAnswerClear}
        />
      )}
      {QuesassignModalOpen && (
        <AssignQuesmodal
          handlechange={Quesassignhandlechange}
          handleSubmit={handleSubmit}
          questions={questions}
          isModalOpen={QuesassignModalOpen}
          handleCancel={assignqueshandleCancel}
        />
      )}
      {isAnswerModal && (
        <Answermodal
          isModalOpen={isAnswerModal}
          handleCancel={handleAnswerCancel}
          rowData={rowData}
          isAnswerClear={isAnswerClear}
        />
      )}
    </div>
  );
};

export default TopScore;
