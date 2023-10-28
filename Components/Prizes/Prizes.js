import React, { useEffect, useState } from "react";
import "../../Assets/Styles/Prizes.css";
import Heading from "../Heading";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import Apidata from "../Adminpage/Services/AdminServices";
import BannerApidata from "../../Components/Adminpage/Services/AdminServices";

const Prizes = () => {
  const weeklyPrizesResponsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 468 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 467, min: 0 },
      items: 1,
    },
  };

  const { t, i18n } = useTranslation();
  const [imgdata, setImgdata] = useState([]);
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    initData();
    bannerImg();
  }, []);
  const bannerImg = async () => {
    let adbanner = await BannerApidata.GetAdminhometopbannertable();
    let banner = adbanner.data.Results;
    setBannerData(banner);
  };
  const initData = async () => {
    let Getbanner = await Apidata.GetAdminprizetable();
    let getdata = Getbanner.data.Results;
    setImgdata(getdata);
  };
  let Topprize = imgdata.filter((data) => {
    return data.prizePosition === "Top Prize";
  });
  let Weeklyprize = imgdata.filter((data) => {
    return data.prizePosition === "Weekly Prize";
  });
  return (
    <div className="col-md-12 px-0 px-md-3 mb-4 ">
      <div className="mt-2 col-md-12 d-flex flex-row justify-content-center ">
        {bannerData.length > 0 &&
          bannerData.map((data) => {
            return data.screenName === "Prize" &&
              data.screenPosition === "Top" ? (
              <img src={data.s3Url} className="img-fluid adBanner" alt="..." />
            ) : null;
          })}
      </div>
      <div className="px-3 ">
        <Heading
          // className='p-2'
          heading={t("PRIZES")}
          style={{
            color: " #344054",
            fontSize: "16px",
            fontWeight: "bold",
            padding: 2,
          }}
        />
      </div>
      <div className="col-md-12 d-md-flex flex-md-row justify-content-center  ">
        <div className=" col-md-10 pt-2 ps-3 Prizesbox">
          <div className="col-md-12">
            <Heading
              // className='p-2'
              heading={t("HOW_TO_WIN_PRIZES")}
              style={{
                color: " #344054",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
            <ul>
              <li>{t("PRIZES_SUMMMARY")}</li>
            </ul>
          </div>
          <div className="col-md-12">
            <Heading
              // className='p-2'
              heading={t("TOP_PRIZE")}
              style={{
                color: " #344054",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
            <div className="col-md-12 mt-3">
              {Topprize.map((data) => {
                return (
                  <>
                    <div className="col-sm d-flex justify-content-center align-items-center m-5">
                      <div className="TopPrizebg">
                        <img
                          src={data.s3Url}
                          className="img-fluid giftimg "
                        ></img>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="col-md-12 mt-2 ">
            <Heading
              // className='p-2'
              heading={t("WEEKLY_LEADERBOARD_PRIZES")}
              style={{
                color: " #344054",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />

            <Carousel
              responsive={weeklyPrizesResponsive}
              ArrowOnDeviceType={["desktop", "mobile"]}
            >
              {Weeklyprize.map((data) => {
                return (
                  <>
                    <div className="col-sm d-flex justify-content-center align-items-center m-5">
                      <div class="weeklygiftbg"></div>
                      <div>
                        <img
                          src={data.s3Url}
                          className="img-fluid giftimg "
                        ></img>
                      </div>
                    </div>
                  </>
                );
              })}
            </Carousel>
          </div>
        </div>
        <div className="col-md-2 d-md-flex flex-md-row justify-content-end d-none d-md-block">
          <div className="d-flex ms-md-3 justify-content-around align-items-start">
            {bannerData.length > 0 &&
              bannerData.map((data, index) => {
                return data.screenName === "Prize" &&
                  data.screenPosition === "Left" ? (
                  <img src={data.s3Url} className="img-fluid" alt="..." />
                ) : null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prizes;
