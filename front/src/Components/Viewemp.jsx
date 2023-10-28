import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import './Home.css'
import axios from 'axios';

function Viewemp() {
  const [rowData, setRowData] = useState([])


  const columnDefs = [
    { headerName: "empName", field: "empName" },
    { headerName: "empId", field: "empId", },
    { headerName: "empMobile", field: "empMobile", },
    { headerName: "empEmail", field: "empEmail" },
    { headerName: "password", field: "password" },
    { headerName: "username", field: "username" },
    {

      headerName: "Action", field: "_id",

      cellRendererFramework: (params) => <div>
        <button className='btn_3' onClick={() => GoToassignpage()}>Assignwork</button>
        
        <button className='btn_4'> <Link to={`/getEmpid/${params.value}` } className='view_Link'>view</Link></button> 
       
      </div>
    }

  ]

  const Navigate = useNavigate()

  const GoToassignpage = () => {

    Navigate('/addtask')

  }



  const onGridReady = (params) => {
    console.log("grid is ready")
    fetch("http://localhost:7000/getEmp").then(res => res.json())
      .then(res => {
        console.log(res)
        let data = res
        setRowData(data)
      })
  }


  // const onGridReady=async (req,res)=>{

  //   try {
  //   const response=await axios.get("http://localhost:7000/getEmp")
  //   console.log(response);
      
  //   } catch (error) {
      
  //   }
  // }


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
      <div><Navbar /></div>
      <div className="App">

       

<div className='ag-theme'>
<h1 className="hedingForAssigne" >Employee List</h1>
        <div className="ag-theme-alpine" style={{ height: '400px', width: '90%', textAlign: 'center', margin: 'auto' }}>
          <AgGridReact
            onCellClicked={clickedRow}
            columnDefs={columnDefs}
            rowData={rowData}
            onGridReady={onGridReady}>
          </AgGridReact>
        </div>
        </div>

      </div>

    </>
  );
}



export default Viewemp