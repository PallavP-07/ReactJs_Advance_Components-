import React, { useState, useEffect } from 'react'
import Heading from '../../../Heading';
import Addicon from "../../../../Assets/Images/Addcoloricon.svg"
import Clientsmodal from './Clientsmodal/Clientsmodal';
import Apidata from "../../Services/AdminServices"
import { toast } from 'react-toastify';
import { AgGridReact } from 'ag-grid-react';
import Render from "../../Home/ImageRender"
const Clients = () => {
    const imageInputRef = React.useRef();
    const [QuesassignModalOpen, setQuesassignModalOpen] = useState(false);
    const [sponserstate, setSponserstate] = useState()
    const [clientstate, setClientstate] = useState()
    const [file, setFile] = useState()
    const [dataSource, setDataSource] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: "No",
            field: 'no',
            flex: 0.5,
            cellClass: 'locked-col',
            lockPosition: true,
        },
        {
            headerName: "Name",
            field: 'sponsername',
            flex: 1,
            sortingOrder: ['asc', 'desc'],
            sortable: true,
            cellClass: 'locked-col',
            lockPosition: true,
        },
        {
            headerName: "Type ",
            field: 'type',
            flex: 1,
            sorting: true,
            sortingOrder: ['asc', 'desc'],
            sortable: true,
            cellClass: 'locked-col',
            lockPosition: true,
        },
        {
            headerName: "Delete",
            field: 'delete',
            flex: 0.4,
            cellRenderer: "delRender",
            cellClass: 'locked-col',
            lockPosition: true,
        }
    ]);

    useEffect(() => {
        initData();
    }, []);
    useEffect(() => {
        deleted();
    }, []);
    const initData = async () => {
        let Getbanner = await Apidata.GetClienttable()
        let getdata = Getbanner.data.Results
        let formatChange = []
        getdata.map((data, index) => {
            let obj = {
                id: data._id,
                no: index + 1,
                sponsername: data.name,
                type: data.type,
            }
            formatChange.push(obj)
        })
        setDataSource([...formatChange])
    };

    const handleCancel = () => {
        setQuesassignModalOpen(false);
        setSponserstate()
        setClientstate()
    };
    const showModal = () => {
        setQuesassignModalOpen(true);
    };

    const handlechange = (event) => {
        const { files } = event.target;
        setFile(files[0]);
    };

    const handlechangeEvent = (event) => {
        const name = event.target.value
        setSponserstate(name)
    };
    const handlechangeData = (data) => {
        const Type = data
        setClientstate(Type)
    };
    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('data', file)
        formData.append('data', sponserstate)
        formData.append('data', clientstate)
        var res = await Apidata.UploadClient(formData)
        if (res.status == 200) {
            toast.success(res.statusText)
            setQuesassignModalOpen(false)
            initData();
            setSponserstate()
            setClientstate()
            setFile(null)
            imageInputRef.current.value = "";
        }
    };
    const deleted = async (data) => {
        let fieldName = data.colDef.field
        if (fieldName == "delete") {
            let datas = data.data.id
            var answer = window.confirm("Delete the  data?");
            if (answer) {
                var res = await Apidata.DeleteClient(datas)
                if (res.status == 200) {
                    toast.success(res.statusText)
                    setQuesassignModalOpen(false)
                    initData();
                }
            }
        }
    };

    return (
        <div className='mt-2' >
            <div className="col-12 d-flex flex-row justify-content-between p-2">
                <div className="d-md-flex flex-md-row justify-content-start align-items-center ">
                    <Heading
                        heading="Sponsers / Clients & Partners"
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
            <div className='subTitleAdmin d-md-flex flex-md-row justify-content-start align-items-center p-1'>Please Add Weekly Sponsors & Client Size (200 * 120) (width * height) to get perfect view</div>
            <div className=" ag-theme-alpine mt-2" style={{ height: "80vh", width: "auto" }}>
                <AgGridReact
                    rowData={dataSource}
                    columnDefs={columnDefs}
                    frameworkComponents={{
                        delRender: Render.DelImageRender

                    }}
                    onCellClicked={deleted}
                    pagination={true}
                    paginationPageSize={10}
                    suppressDragLeaveHidesColumns={true}
                />
            </div>

            <Clientsmodal
                isModalOpen={QuesassignModalOpen}
                handleCancel={handleCancel}
                handlechange={handlechange}
                handleSubmit={handleSubmit}
                handlechangeEvent={handlechangeEvent}
                handlechangeData={handlechangeData}
                sponsernamevalue={sponserstate}
                ClientValue={clientstate}
                imageInputRef={imageInputRef}
            />
        </div>
    )
}

export default Clients