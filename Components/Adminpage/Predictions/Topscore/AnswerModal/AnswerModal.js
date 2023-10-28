import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import InputBox from "../../../../InputBox";
import Uploadicon from "../../../../../Assets/Images/Uploadcoloricon.svg";
import Buttons from "../../../../Buttons";
import { colors } from "../../../../Color";
import DropdownSearch from "../../../../DropdownSearch";
import Apidata from "../../../Services/AdminServices";
import { indexOf, update } from "lodash";
import { toast } from "react-toastify";

const Answermodal = ({
  isModalOpen,
  handleCancel,
  handlechange,
  handleSubmit,
  setIsModalOpen,
  rowData,
  quesOptionID,
  isAnswerClear,
}) => {
  const [option, setOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [gridTeam, setGridTeam] = useState([]);
  const [leagueId, setLeagueId] = useState();
  const [matchId, setMatchId] = useState(rowData.id);

  const selecthandleChange = (data) => {
    setSelectedOptions(data);
  };

  useEffect(() => {
    GetquestionSingle();
  }, []);

  const GetquestionSingle = async () => {
    let payload = {
      matchId: matchId,
    };
    let Getquestions = await Apidata.GetquestionSingle(payload);
    let getdata = Getquestions.data.Results;
    let formatChange = [];
    let questionId = getdata.question;
    let leagueId = getdata._id;
    setLeagueId(leagueId);
    setGridTeam(getdata.options);
    getdata.options.map((data) => {
      let obj = {
        label: data,
        value: data,
        id: questionId,
        leagueId: leagueId,
      };
      formatChange.push(obj);
    });
    if (!isAnswerClear) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions({ label: getdata.answer, value: getdata._id });
    }
    setOption([...formatChange]);
  };

  const handleUpdate = async () => {
    let payload = {
      answer: selectedOptions.label,
    };
    let updateAnswer = await Apidata.UpdateAnswerOptions(payload, leagueId);
    let getdata = updateAnswer.data.Results;
    if (updateAnswer.status == 200) {
      toast.success(updateAnswer.statusText);
      handleCancel();
    }
  };

  return (
    <Modal
      title="Answers"
      open={isModalOpen}
      onCancel={handleCancel}
      borderRadius={20}
      footer={[]}
    >
      <div>
        <div className="p-2">
          <label htmlFor="" className="">
            Choose the Answers
          </label>
          <DropdownSearch
            handleSelect={selecthandleChange}
            placeholder={"Select Answer"}
            selectedOptions={selectedOptions}
            optionList={option}
          />
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
              onClick={handleUpdate}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Answermodal;
