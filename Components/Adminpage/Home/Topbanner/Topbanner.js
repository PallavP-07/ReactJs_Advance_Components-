import React, { useState, useEffect } from "react";
import Addicon from "../../../../Assets/Images/Addcoloricon.svg";
import Heading from "../../../Heading";
import Topbannermodal from "./Topbannermodal/Topbannermodal";
import Apidata from "../../Services/AdminServices";
import { AgGridReact } from "ag-grid-react";
import ImageRender from "../ImageRender";
import { toast } from 'react-toastify';

const Topbanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tablestate, settablestate] = useState({
    screenName: "",
    screenPosition: "",
    screenKey: 0,
  });

  const ImgError = () => toast("Sorry, this image doesn't look like the size we wanted.  but we require 15000 x 294 size image.");
  const ImgSuccess = () => toast("Nice, image is the right size. It can be uploaded")
  const imageInputRef = React.useRef();
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
      headerName: "Screenname",
      field: "screenname",
      flex: 1,
      sortingOrder: ["asc", "desc"],
      sortable: true,
      cellClass: 'locked-col',
      lockPosition: true,
    },
    {
      headerName: "ScreenPosition",
      field: "screenposition",
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
    // { headerName: "Update", field: 'update', flex: 1 ,},
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

  const initData = async (data) => {
    let Getbanner = await Apidata.GetAdminhometopbannertable();
    let getdata = Getbanner.data.Results;
    let formatChange = [];
    getdata.map((data, index) => {
      let obj = {
        id: data._id,
        no: index + 1,
        screenname: data.screenName,
        screenposition: data.screenPosition,
        filename: data.fileName,
      };
      formatChange.push(obj);
    });
    setDataSource([...formatChange]);
  };
  const handleCancel = () => {
    settablestate({
      screenName: "",
      screenPosition: "",
      screenKey: 0,
    });
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const deleted = async (data) => {
    let fieldName = data.colDef.field;
    if (fieldName == "delete") {
      var answer = window.confirm("Delete the  data?");
      if (answer) {
        var res = await Apidata.DelAdminhometopbannertable(data.data.id);
        if (res.status == 200) {
          initData();
          toast.success(res.statusText);
        }
      }
    }
  };
  const [file, setFile] = useState();
  const handlechange = (event) => {
    const { files } = event.target;
    setFile(files[0]);
  };
  const handlechangeData = (value, name) => {
    settablestate({ ...tablestate, [name]: value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("data", file);
    formData.append("data", file.name);
    formData.append("data", tablestate.screenName);
    formData.append("data", tablestate.screenPosition);
    formData.append("data", tablestate.screenKey);
    var res = await Apidata.Adminhometopbannertable(formData);
    if (res.status == 200) {
      toast.success(res.statusText);
      initData();
      settablestate({
        screenName: "",
        screenPosition: "",
        screenKey: 0,
      });
      setIsModalOpen(false);
      imageInputRef.current.value = "";
      setFile(null);
    }
  };
  return (
    <div className="col-12">
      <div className="col-12 d-flex flex-row justify-content-between mt-2">
        <div className="d-md-flex flex-md-row justify-content-start align-items-center ">
          <Heading
            heading="Ad Banners "
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
      <div className="subTitleAdmin d-md-flex flex-md-row justify-content-start align-items-center pt-2">
        Please Add Top Image Size (Home) (1500 * 294) (width * height) to get
        perfect view
      </div>
      <div className="subTitleAdmin d-md-flex flex-md-row justify-content-start align-items-center">
        Please Add Side Image Size (Fixtures & Prize) (206 * 697) (width *
        height) to get perfect view
      </div>
      <div
        className="ag-theme-alpine mt-2"
        style={{ height: "80vh", width: "auto" }}
      >
        <AgGridReact
          rowData={dataSource}
          columnDefs={columnDefs}
          frameworkComponents={{
            imgRender: ImageRender.DelImageRender,
          }}
          onCellClicked={deleted}
          pagination={true}
          paginationPageSize={10}
          suppressDragLeaveHidesColumns={true}
        />
      </div>
      <Topbannermodal
        handlechangeData={handlechangeData}
        handlechange={handlechange}
        handleSubmit={handleSubmit}
        isModalOpen={isModalOpen}
        tablestate={tablestate}
        file={file}
        imageInputRef={imageInputRef}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Topbanner;
