import React from "react";
import DropDownForTems from "./DropDown"
import { useTranslation } from 'react-i18next';

function Groupstagecard() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className=" d-md-flex flex-md-column ">
        <h5 className="GroupHadding">{t('GROUP_A')}</h5>        
        <div className=" SecondCard ">
        <div className='text-center text-white mb-1'>2 Points</div>
          <div className='col-md-12 d-md-flex'>
          <div className="col-md-12 ">
            <div className="cardbody d-flex  ">
              <div className="col-6 d-flex flex-row justify-content-center align-items-center">
                <h5 className="headingstyle ">{t('TOP_OF_GROUP')}</h5>
              </div>
              <div className="col-6  d-flex flex-row justify-content-center">
                <DropDownForTems />
              </div>
            </div>
            <div className="p-2" >
              <div className="hrrowtwoo "></div>
            </div>
            <div className="cardbody d-flex  ">
              <div className="col-6 d-flex flex-row justify-content-center align-items-center">
                <h5 className="headingstyle">{t('SECOND_IN_GROUP')}</h5>
              </div>
              <div className="col-6  d-flex flex-row justify-content-center">
                <DropDownForTems />
              </div>
            </div>
          </div>
          </div>
         
        </div>
      </div>

     
    </>
  );
}

export default Groupstagecard;
