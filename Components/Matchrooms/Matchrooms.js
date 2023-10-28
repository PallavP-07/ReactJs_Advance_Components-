import React, { useState } from 'react'
import Heading from '../Heading'
import TeamAimg from "../../Assets/Images/Ateams.png"
import TeamBimg from "../../Assets/Images/Bteams.png"
import Userblackicon from "../../Assets/Images/Userblackicon.svg"
import Liveicon from "../../Assets/Images/Liveicon.svg"
import Sharelogoicon from "../../Assets/Images/Sharelogoicon.svg"
import Userlogoicon from "../../Assets/Images/Userlogoicon.svg"
import Netlogoicon from "../../Assets/Images/Netlogoicon.svg"
import "../../Assets/Styles/Matchroom.css"
import Matchroomcard from './Matchroomcard/Matchroomcard'
import { useTranslation } from 'react-i18next';
import BannerApidata from "../../Components/Adminpage/Services/AdminServices";
import { useEffect } from 'react'


const Matchrooms = () => {
  const { t, i18n } = useTranslation();
  const [bannerData, setBannerData] = useState([])

  useEffect(() => {
    bannerImg();
  }, [])

  const bannerImg = async () => {
    let adbanner = await BannerApidata.GetAdminhometopbannertable();
    let banner = adbanner.data.Results
    setBannerData(banner);
  }

  return (
    <div className="px-2"
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
    >
      <div className="mt-2 col-md-12 d-flex flex-row justify-content-center">
        {
          bannerData.length > 0 && bannerData.map((data) => {
            return data.screenName === "MatchRooms" && data.screenPosition === "Top" ?
              <img src={data.s3Url} className="img-fluid adBanner" alt="..." /> : null
          })
        }
      </div>
      <div className=' col-md-12 d-md-flex flex-md-row ' >
        <div className='col-md-6' >
          <Heading
            className='px-2 mt-2 matchroomheading'
            heading={t("LIVE_MATCH_ROOMS (COMING_SOON)")}
            style={{ color: " #344054", fontSize: "16px", fontWeight: "700" }}
          />
          <div className='col-md-12 '>
            <Heading
              className=' p-2 '
              heading={t("MY_TEAMS_LEAGUES")}
              style={{ color: " #344054", fontSize: "14px", fontWeight: "bold" }}
            />
            <Matchroomcard
              TeamAimg={TeamAimg}
              TeamBimg={TeamBimg}
              Userblackicon={Userblackicon}
              Liveicon={Liveicon}
              Userlogoicon={Userlogoicon}
              Netlogoicon={Netlogoicon}
              Sharelogoicon={Sharelogoicon} />
          </div>
          <div className='col-md-12 pt-3 '>
            <Heading
              className='p-2'
              heading={t('POPULAR_MATCHES')}
              style={{ color: " #344054", fontSize: "14px", fontWeight: "bold" }}
            />
            <Matchroomcard
              TeamAimg={TeamAimg}
              TeamBimg={TeamBimg}
              Userblackicon={Userblackicon}
              Liveicon={Liveicon}
              Userlogoicon={Userlogoicon}
              Netlogoicon={Netlogoicon}
              Sharelogoicon={Sharelogoicon} />
          </div>
        </div>
        
        <div className='mt-2 col-md-6 p-2 pb-5 mb-5 d-none' >
          <Heading
            heading="chat"
            style={{ color: " #344054", fontSize: "11px", fontWeight: "bold" }}
          />
        </div>
       <div className='  p-2 pb-5 mb-5 '></div>
      </div>      
    </div>
  )
}

export default Matchrooms