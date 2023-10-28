import React, { useState } from "react";
import { Modal } from "antd";
import InputBox from "../../../../InputBox";
import Uploadicon from "../../../../../Assets/Images/Uploadcoloricon.svg";
import Addicon from "../../../../../Assets/Images/Addcoloricon.svg";
import Removeicon from "../../../../../Assets/Images/Removecoloricon.svg";
import Buttons from "../../../../Buttons";
import { colors } from "../../../../Color";
import DropdownSearch from "../../../../DropdownSearch";
import Apidata from "../../../Services/AdminServices";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const GetQuestionModal = ({
  isModalOpen,
  handleCancel,
  setIsModalOpen,
  rowData,
  setAnswerClear,
}) => {
  const [option, setOption] = useState([]);
  const [Quesoption, setQuesoption] = useState();
  const [Answer, setAnswer] = useState();
  const [AssignOption, setAssignOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [matchID, setMatchID] = useState(rowData.id);
  const [duplicateAssignOption, setDuplicateAssignOption] = useState([]);

  const [selectedOptionId, setSelectedOptionsId] = useState();

  useEffect(() => {
    Getquestions();
  }, []);

  useEffect(() => {
    getSingleQuestionOption();
  }, [option]);

  useEffect(() => {
  }, [duplicateAssignOption]);

  const getSingleQuestionOption = async () => {
    let payload = {
      matchId: matchID,
    };
    let Getquestions = await Apidata.GetquestionSingle(payload);
    if (Getquestions.status == 200) {
      let getdata = Getquestions.data.Results;
      let filterQuestion = option.filter((item) => {
        return item.value == getdata.question;
      });
      setDuplicateAssignOption(getdata.options);
      setAssignOption(getdata.options);
      setSelectedOptionsId(filterQuestion[0].value);
      setSelectedOptions(filterQuestion[0]);
    }
  };

  const Getquestions = async () => {
    let Getquestions = await Apidata.Getquestions();
    let getdata = Getquestions.data.Results;
    let formatChange = [];
    getdata.map((data) => {
      let obj = {
        label: data.question,
        value: data._id,
      };
      formatChange.push(obj);
    });
    setOption([...formatChange]);
  };

  const handlechange = (event, name) => {
    const { value } = event.target;
    setQuesoption(value);
  };

  const answerChange = (event) => {
    const { value } = event.target;
    setAnswer(value);
  };

  const optionSelection = () => {
    if (Quesoption == "" || undefined == Quesoption) {
      toast.warn("Required field is missing...")
      return
    }
    let array = [];
    array.push(Quesoption);
    setAssignOption((prevState) => {
      return [...prevState, ...array];
    });
    setQuesoption();
  };
  const removeArray = (index) => {
    let afterSplice = AssignOption.filter((item, inx) => {
      if (inx !== index) {
        return item;
      }
    });
    setAssignOption([...afterSplice]);
  };
  const selecthandleChange = (data) => {
    if (data.value != selectedOptionId) {
      setAssignOption([]);
      setAnswerClear(false);
    } else {
      setAssignOption(duplicateAssignOption);
    }
    setSelectedOptions(data);
  };

  const handleSubmit = async () => {
    let obj = {
      options: AssignOption,
      matchId: matchID,
    };
    let CreateQuestion = await Apidata.CreateQuestion(
      obj,
      selectedOptions.value
    );

    if (CreateQuestion.status == 200) {
      toast.success(CreateQuestion.statusText);
      setQuesoption([]);
      setAnswer([]);
      setAssignOption([]);
      setSelectedOptions([]);
      setIsModalOpen(false);
    }
  };

  return (
    <Modal
      title="Questions"
      open={isModalOpen}
      onCancel={handleCancel}
      borderRadius={20}
      footer={[]}
    >
      <div>
        <div className="p-2">
          <label htmlFor="" className="">
            Choose the Question
          </label>
          <DropdownSearch
            handleSelect={selecthandleChange}
            placeholder={"Select Questions"}
            selectedOptions={selectedOptions}
            optionList={option}
          />
        </div>
        <div className="p-2">
          <label htmlFor="" className="my-2">
            Assign the Option
          </label>
          <div className=" col-12  d-flex flex-row">
            <div className=" col-11  ">
              <InputBox
                allowClear
                placeholder={"Type Here"}
                style={{
                  borderRadius: "5px",
                }}
                value={Quesoption}
                onChange={(e) => handlechange(e, "option")}
              />
            </div>
            <div
              className=" col-1 d-flex  justify-content-center align-items-center"
              onClick={() => optionSelection()}
            >
              <img src={Addicon} />
            </div>
          </div>
        </div>
        <div className="p-2">
          {AssignOption.map((data, index) => {
            return (
              <>
                <div key={index} className="col-12 d-flex flex-row py-2">
                  <div className=" col-11 d-flex  justify-content-start ">
                    {data}
                  </div>
                  <div className=" col-1 d-flex  justify-content-center align-items-center">
                    <img src={Removeicon} onClick={() => removeArray(index)} />
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <div className="col-12 d-flex flex-row justify-content-center text-center">
          <div className="col-6 ">
            <Buttons
              style={{
                backgroundColor: colors.common_color,
                color: colors.white,
                borderRadius: "6px",
              }}
              text={"Submit"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GetQuestionModal;
