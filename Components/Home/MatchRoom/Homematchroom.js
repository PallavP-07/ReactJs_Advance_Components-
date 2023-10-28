import React from 'react'
import Heading from '../../Heading'
import "../../../Assets/Styles/Homematchroom.css"
import TeamAimg from "../../../Assets/Images/Ateams.png"
import TeamBimg from "../../../Assets/Images/Bteams.png"
import Usercoloricon from "../../../Assets/Images/Usercoloricon.svg"
import Matchroomcard from './Homematchroomcard/Homematchroomcard'
import { useTranslation } from 'react-i18next';
import { Tooltip } from "antd";

const Homematchroom = () => {
    const { t, i18n } = useTranslation();
    return (
        <div className='mt-2' >
            <div className='px-1 ' >
                <Heading
                    heading={t('MATCH_ROOMS (COMING_SOON)')}
                    style={{
                        color: " #344054",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                />
            </div>
            <Tooltip placement="top" title={'Coming Soon'}>
                <div className="col-md-12 Matchroom p-3 ">
                    <>
                        <div className='px-2 ' >
                            <Heading
                                heading={t('MY_TEAMS_LEAGUES')}
                                style={{
                                    color: " #344054",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                }}
                            />
                        </div>
                        <div className=" col-md-12 row row-cols-md-3 matchroomcardss">
                            <div className="col col-12 p-2">
                                <Matchroomcard TeamAimg={TeamAimg}
                                    TeamBimg={TeamBimg}
                                    Usercoloricon={Usercoloricon} />
                            </div>
                            <div className="col col-12 p-2">
                                <Matchroomcard TeamAimg={TeamAimg}
                                    TeamBimg={TeamBimg}
                                    Usercoloricon={Usercoloricon} />
                            </div>
                            <div className="col col-12 p-2">
                                <Matchroomcard TeamAimg={TeamAimg}
                                    TeamBimg={TeamBimg}
                                    Usercoloricon={Usercoloricon} />
                            </div>

                        </div>
                    </>
                    <>
                        <div className='px-2 mt-2' >
                            <Heading
                                heading={t('POPULAR_MATCHES')}
                                style={{
                                    color: " #344054",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                }}
                            />
                        </div>
                        <div className=" col-md-12 row row-cols-md-3 matchroomcardss">
                            <div className="col col-12 p-2">
                                <Matchroomcard TeamAimg={TeamAimg}
                                    TeamBimg={TeamBimg}
                                    Usercoloricon={Usercoloricon} />
                            </div>
                            <div className="col col-12 p-2">
                                <Matchroomcard TeamAimg={TeamAimg}
                                    TeamBimg={TeamBimg}
                                    Usercoloricon={Usercoloricon} />
                            </div>
                            <div className="col col-12 p-2">
                                <Matchroomcard TeamAimg={TeamAimg}
                                    TeamBimg={TeamBimg}
                                    Usercoloricon={Usercoloricon} />
                            </div>
                        </div>
                    </>
                </div>
            </Tooltip>
        </div>
    )
}

export default Homematchroom