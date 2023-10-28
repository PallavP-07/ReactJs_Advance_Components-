import React, { useState, useEffect } from "react";
import Addicon from "../../../../Assets/Images/Addcoloricon.svg";
import Removeicon from "../../../../Assets/Images/Removecoloricon.svg";
import Uploadicon from "../../../../Assets/Images/Uploadcoloricon.svg";
import Editicon from "../../../../Assets/Images/Editcoloricon.svg";
import Heading from "../../../Heading";
import AntTable from "../../../AntTable";
import PrizesModal from "./PrizeModal/Modal";
import Apidata from "../../Services/AdminServices";
import { toast } from "react-toastify";
import Render from "../../Home/ImageRender";
import { AgGridReact } from "ag-grid-react";
const Topprize = () => {
  const imageInputRef = React.useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [QuesassignModalOpen, setQuesassignModalOpen] = useState(false);
  const [topPrize, setTopPrize] = useState();
  const [position, setPosition] = useState();
  const [file, setFile] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "No",
      field: "no",
      flex: 0.5,
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Position",
      field: "position",
      flex: 1,
      sortingOrder: ["asc", "desc"],
      sortable: true,
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Prize Position",
      field: "prizePosition",
      flex: 1,
      sorting: true,
      sortingOrder: ["asc", "desc"],
      sortable: true,
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "FileName",
      field: "filename",
      flex: 1,
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "Delete",
      field: "delete",
      flex: 0.4,
      cellRenderer: "imgRender",
      cellClass: 'locked-col',
      lockPosition: true,
    },
  ]);

  useEffect(() => {
    initData();
  }, []);
  useEffect(() => {
    deleted();
  }, []);
  const initData = async () => {
    let Getbanner = await Apidata.GetAdminprizetable();
    let getdata = Getbanner.data.Results;
    let formatChange = [];
    getdata.map((data, index) => {
      let obj = {
        id: data._id,
        no: index + 1,
        position: data.position,
        prizePosition: data.prizePosition,
        filename: data.fileName,
        delete: (
          <div>
            <img src={Removeicon} onClick={() => deleted(data._id)} />
          </div>
        ),
      };
      formatChange.push(obj);
    });
    setDataSource([...formatChange]);
  };
  const handleCancel = () => {
    setQuesassignModalOpen(false);
    setTopPrize()
    setPosition()
  };
  const showModal = () => {
    setQuesassignModalOpen(true);
  };

  const handlechange = (event, name) => {
    const { value, files } = event.target;
    setFile(files[0]);
  };

  const deleted = async (data) => {
    let fieldName = data.colDef.field;
    if (fieldName == "delete") {
      let datas = data.data.id;
      var answer = window.confirm("Delete the  data?");
      if (answer) {
        var res = await Apidata.DelAdminprizetable(datas);
        if (res.status == 200) {
          toast.success(res.statusText);
          setQuesassignModalOpen(false);
          initData();
          setIsModalOpen(false);
        }
      }
    }
  };

  const handlechangeData = (data) => {
    const Prize = data;
    setTopPrize(Prize);
  };
  const handlechangeEvent = (event) => {
    const Position = event.target.value;
    setPosition(Position);
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("data", file);
    formData.append("data", file.name);
    formData.append("data", position);
    formData.append("data", topPrize);
    var res = await Apidata.Adminprizetable(formData);
    if (res.status == 200) {
      toast.success(res.statusText);
      setQuesassignModalOpen(false);
      initData();
      setPosition();
      setTopPrize();
      setFile(null);
      imageInputRef.current.value = "";
    }
  };
  return (
    <>
      <div className="col-12 d-flex flex-row justify-content-between p-2">
        <div className="d-md-flex flex-md-row justify-content-start align-items-center ">
          <Heading
            heading="Prizes"
            style={{
              color: " #344054",
              fontSize: "16px",
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
      <div className='subTitleAdmin d-md-flex flex-md-row justify-content-start align-items-center p-1'>Please Add Top Prize Size (1200 * 600) (width * height) to get perfect view</div>
      <div className='subTitleAdmin d-md-flex flex-md-row justify-content-start align-items-center p-1'>Please Add Weekly Prize Size (200 * 120) (width * height) to get perfect view</div>
      <div
        className=" ag-theme-alpine mt-2"
        style={{ height: "80vh", width: "auto" }}
      >
        <AgGridReact
          rowData={dataSource}
          columnDefs={columnDefs}
          frameworkComponents={{
            imgRender: Render.DelImageRender,
          }}
          onCellClicked={deleted}
          pagination={true}
          paginationPageSize={10}
          suppressDragLeaveHidesColumns={true}
        // suppressDragLeaveHidesColumn
        />
      </div>
      <PrizesModal
        handlechange={handlechange}
        handleSubmit={handleSubmit}
        isModalOpen={QuesassignModalOpen}
        handleCancel={handleCancel}
        handlechangeEvent={handlechangeEvent}
        handlechangeData={handlechangeData}
        positionValue={position}
        PrizeValue={topPrize}
        imageInputRef={imageInputRef}
      />
    </>
  );
};

export default Topprize;
