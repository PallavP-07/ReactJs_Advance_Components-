import React, { useState } from 'react'
import Heading from '../../Heading'
import "../../../Assets/Styles/Leaderboard.css"
import { useTranslation } from 'react-i18next';

const Leaderboard = ({ leaderData }) => {
    const { t, i18n } = useTranslation();

    return (
        <div className='mt-2' >
            <div className='px-2 ' >
                <Heading
                    heading={t('LEADERBORAD')}
                    style={{
                        color: " #344054",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                />
            </div>
            <div className=" Leaderboard " >
                <table className="table ">
                    <thead style={{ backgroundColor: "#F48220" }}>
                        <tr style={{ color: "white" }}>
                            <th scope="col"></th>
                            <th scope="col">{t('LEADERBOARD_NAME')}</th>
                            <th scope="col">{t('LEADERBOARD_COUNTRY')}</th>
                            <th scope="col">{t('LEADERBOARD_POINTS')}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {leaderData && leaderData.length > 0 && leaderData.slice(0, 5).map((data, index) => {
                            return <tr key={index}>
                                <th scope="row">
                                    <div className='col-2  d-flex justify-content-center align-items-center mt-2'>
                                        {index + 1}
                                    </div>
                                </th>
                                <td>
                                    <div className='d-flex flex-row gap-2'>
                                        <div className='col-2'>
                                            <img src={data.userPic} className="img-fluid"
                                                style={{ width: 35, height: 35, borderRadius: 35 }}></img>
                                        </div>
                                        <div className='col-8 d-flex align-items-center'>
                                            {data.userName}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-2  d-flex flex-row align-items-center mt-2'>
                                        {data.country}
                                    </div>
                                </td>
                                <td>
                                    <div className='col-2  d-flex flex-row align-items-center mt-2'>
                                        {data.points}
                                    </div>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Leaderboard