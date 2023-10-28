
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
 import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import NavbarUser from '../Components/UserNavbar';
import { Link} from 'react-router-dom';
import './Home.css'


const WorkProgress = () => {

  const [rowData,setRowData] = useState([])



  const actionButton=(params)=>{
        console.log(params);
        alert(`${params.data.make} ${params.value}`)
      }
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
         
         <Link to={`/Updateemp/${params.value}`}  ><button className='btn_2'>Update</button></Link>

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




// const Navigate = useNavigate()

  // const GoToUpdate =() =>{
  //   Navigate('/Updateemp');

  // }
  return (
    <>
    <div><NavbarUser/></div>
    <div className="App">
   
      <h1 className="hedingForAssigne" >Work  Progress</h1>
    
         
      <div className="ag-theme-alpine" style={ {height: '400px', width:'55%', textAlign:'center' , margin:'auto'} }>
        <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            onGridReady={onGridReady}>
        </AgGridReact>
      </div>

    </div>

    </>
  );
}

export default WorkProgress;