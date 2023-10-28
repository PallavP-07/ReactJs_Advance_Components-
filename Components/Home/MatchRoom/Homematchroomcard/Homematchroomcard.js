import React from 'react'
import "../../../../Assets/Styles/Homematchroomcard.css"
const Homematchroomcard = ({ TeamBimg, TeamAimg, Usercoloricon }) => {
    return (
        <div className=" Matchroomcard card " >
            <div className=" card-body text-center col-md-12 p-1" >
                <div className='matchroomborder col-12 p-1 d-flex flex-row justify-content-center gap-1'>
                    <div className=' col-5 d-flex flex-row justify-content-center'>
                        <img src={TeamAimg} width={40} className="img-fluid" />
                    </div>
                    <div className=' vs col-auto d-flex align-items-center'>
                        Vs
                    </div>
                    <div className=' col-5 d-flex flex-row justify-content-center'>
                        <img src={TeamBimg} width={40} className="img-fluid" />
                    </div>
                </div>
                <div className='col-md-12 d-md-flex flex-md-row justify-content-center align-items-center gap-1 p-2'>
                    <div className=' col-md-2  d-md-flex align-items-center justify-content-center'>
                        <img src={Usercoloricon} width={18} className="img-fluid" />
                    </div>
                    <div className='score col-md-10 d-md-flex justify-content-start align-items-center'>
                        Active Fans 110
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homematchroomcard