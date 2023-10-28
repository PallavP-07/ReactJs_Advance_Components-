
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
 import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const AssigneeWork = () => {

  const [rowData,setRowData] = useState(null)
 




  const columnDefs= [
    { headerName: "projectName",field: "projectName" },
    { headerName: "taskName", field: "taskName",},
    {headerName: "assignee",field: "assignee",},
    { headerName: "empId", field: "empId" },
    { headerName: "startDate", field: "startDate" },
    { headerName: "endDate", field: "endDate" },
    { headerName: "description", field: "description" },
    { headerName: "percentage", field: "percentage" },
    { headerName: "status", field: "status" },
    {headerName: "Action",field:"_id",
        cellRendererFramework:(params)=><div>
          <button className='btn_1' onClick={()=>deleteBtn(params.value)}>delete</button>
        
         </div>}
     
  ]
 

const onGridReady=(params)=>{
  console.log("grid is ready")
  fetch("http://localhost:7000/gettask").then(res=>res.json())
  .then(res=>{console.log(res)
    let data = res
    setRowData(data)
  })
}


const deleteBtn = async (id) => {
  console.log(id);
  const confirm = window.confirm("Are you sure, you want to delete this Task?", id)
  if (confirm) {
    fetch(`http://localhost:7000/deletetask/${id}`, { method: "DELETE" }).then(resp => resp.json())
      .then(resp => onGridReady())
  }

}
const clickedRow = (params) => {
  console.log("params")
  let coldef = params.colDef.field
  let data = params.data
  if (coldef === "_id") {
    console.log(data);
  }

}
  return (
    <>
    <div><Navbar/></div>
    <div className="ag-theme">
   
      <h1 className="hedingForAssigne" >Assigne Work</h1>
    
         
      <div className="ag-theme-alpine" style={ { height: '400px', width: '90%', textAlign: 'center', margin: 'auto'} }>
        <AgGridReact
         onCellClicked={clickedRow}
            columnDefs={columnDefs}
            rowData={rowData}
            onGridReady={onGridReady}>
        </AgGridReact>
      </div>

    </div>

    </>
  );
}

export default AssigneeWork;