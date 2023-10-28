
import React, { useEffect, useState } from 'react';
import "../../Assets/Styles/AccSettings.css";
import { useTranslation } from "react-i18next";
import Apidata from "../../services/LoginServices";
import { useSelector } from "react-redux";


const AccTeamCard = () => {
    const { t, i18n } = useTranslation();
    const [favTeams, setFavTeams] = useState([]);
    const userData = useSelector(state => state.userReducer);
    let userId = userData.user._id;
    const imgUrl = "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/";
    const favIcon = "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/favicon.ico";
    
   useEffect(()=>{
    favTeamsndLeague();
   },[]);

   const favTeamsndLeague = async() => {
    let teamsAndLeague = await Apidata.UserFavTeamsleagueApi(userId)
    let favData = teamsAndLeague.data.data;
    setFavTeams(favData)
   }


    return (        
        <div className="container text-center row px-2" >
            {favTeams.map((item,index) => (
                <div className="teamCard d-flex justify-content-center align-items-center px-1 m-1 ">
                        <div key={index} >                            
                          <img
                            src={`${imgUrl}${item.code}${".png"}`}
                            style={{ width: 50,height:50, }}
                            onError={(event) => {
                            event.target.src = favIcon;
                            event.onerror = null;
                             }}
                          />
                          <br/>
                        </div>
                </div>
              ))
            }
            
        </div>


    )
}

export default AccTeamCard;
