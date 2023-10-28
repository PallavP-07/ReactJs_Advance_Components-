import React from 'react'
import "../../../Assets/Styles/Matchroomcard.css"
import { Tooltip } from "antd";

const Matchroomcard = ({ TeamAimg, TeamBimg, Userblackicon, Liveicon, Netlogoicon, Sharelogoicon, Userlogoicon }) => {
    return (
        <Tooltip placement="top" title={'Coming Soon'}>
            <div className="card col-md-10 matchroomcard" >
                <div className="card-body col-md-12 d-md-flex flex-md-row justify-content-center " >
                    <div className='leftbox col-md-8 '>
                        <div className=" col-12 d-flex flex-row">
                            <div className="roomcardtitle col-9 d-flex flex-row justify-content-start">
                                <h5>UEFA Champions League</h5>
                            </div>
                            <div className=" col-3 d-flex flex-row justify-content-center">
                                <div className="d-flex flex-column justify-content-center">
                                    <img src={Liveicon} alt='mic'></img>
                                </div>
                                <div className='live d-flex align-items-center'>
                                    <h5>Live</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-center '>
                            <div className=' col-6 d-flex flex-row justify-content-center'>
                                <div className='break col-6 d-flex flex-column justify-content-center' >
                                    NY Yorks
                                </div>
                                <div className='col-6 matchroomimage px-2'>
                                    <img src={TeamAimg} width={46} height={46} />
                                </div>
                            </div>
                            <div className=' col-1 d-flex flex-column justify-content-center'>
                                vs
                            </div>
                            <div className=' col-5 d-flex flex-row justify-content-center'>
                                <div className='col-6 matchroomimage px-2'>
                                    <img src={TeamBimg} width={46} height={46} />
                                </div>
                                <div className='break col-6 d-flex flex-column justify-content-center px-2' >
                                    Napoli
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 d-flex flex-row'>
                        <div className='col-8 col-sm-10 d-flex flex-column justify-content-center'>
                            <div className='col-12 text-center'>
                                <img src={Userblackicon} />
                            </div>
                            <div className='col-12 text-center userfan '>
                                <h5>150 Fans in Room</h5>
                            </div>
                        </div>
                        <div className='col-4 col-sm-2 d-flex flex-column gap-2 rightcontent'>
                            <div className=''> <img src={Userlogoicon} /></div>
                            <div className=''> <img src={Sharelogoicon} /></div>
                            <div className=''> <img src={Netlogoicon} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </Tooltip>

    )
}

export default Matchroomcard