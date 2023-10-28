import React from "react";
import "../../../Assets/Styles/League.css";
import LeagueTable from "./ScoreofLeaguTAble";
import Heading from "../../Heading";
import { useTranslation } from 'react-i18next';
import { Radio } from "antd";

const TopPointLeague = ({ leagueDataTablem, onhandleDateFilter, value,UserData }) => {
  const { t, i18n } = useTranslation();

  const columns = [
    {
      title: t('NUMBER'),
      dataIndex: "No",
      key: "No",
    },
    {
      title: t('USERNAME'),
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: t('POINTS'),
      dataIndex: "points",
      key: "points",
    },
  ];

  return (
    <>
        <div className="mainDiv mb-5 mb-md-3" >
          <Heading
            className='p-3 '
            heading={t('TOP_POINTS_SCORERS_IN_MY_LEAGUE')}
            style={{ color: " #344054", fontSize: "16px", fontWeight: "bold" }}
          />
          <div className=" ps-3 col-md-12 d-md-flex flex-md-row justify-content-start align-items-center ">
            <Radio.Group onChange={onhandleDateFilter} value={value}>
              <Radio value={1}>{t('ALL')}</Radio>
              <Radio value={2}>{t('LAST_7_DAYS')}</Radio>
              <Radio value={3}>{t('LAST_30_DAYS')}</Radio>
              <Radio value={4}>{t('LAST_YEAR')}</Radio>
            </Radio.Group>
          </div>
          <div className="p-3" >
            <LeagueTable dataSource={leagueDataTablem} columns={columns} UserData={UserData}/>
          </div>
        </div>
    </>
  )
};
export default TopPointLeague;
