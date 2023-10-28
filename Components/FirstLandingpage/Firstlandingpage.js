import React, { useEffect, useState } from "react";
import "../../Assets/Styles/FirstLandingPage.css";
import Image1 from "../../Assets/Images/Image1.png";
import LandImg from "../../Assets/Images/LandImg2.png";
import Carousel from "react-multi-carousel";
import FirstNavBar from "../FirstNavBar/FirstNavBar";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import shape from "../../Assets/Images/shape.svg";
import chart from "../../Assets/Images/predictEdit.svg";
import contact from "../../Assets/Images/contact.svg";
import giftbox from "../../Assets/Images/giftbox.svg";
import Cards from "./Cards";
import { useSelector } from "react-redux";
import Apidata from "../Adminpage/Services/AdminServices";
import ApiPrizedata from "../../services/PrizesService";

const optaData = `
<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="utf-8">
			<title>Opta Standings Widget</title>
			<link rel="stylesheet" href="http://widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css">
		</head>
		<body>
			<div style="width: 100%, height: 400px">
				<opta-widget sport="football" widget="standings" template="normal" live="false" competition="8" season="2015" match="" team="" team_padding="" navigation="" default_nav="1" side="combined" data_detail="default" dividers="" show_key="false" show_crests="false" points_in_first_column="false" show_form="6" group="" crop="" competition_naming="full" team_naming="full" team_link="" date_format="dddd D MMMM YYYY" sorting="false" show_logo="true" breakpoints="400"></opta-widget>
			</div>
		</body>
	</html>
`
const htmlDecode = (html) => {
  return html.replace(/&([a-z]+);/ig, (match, entity) => {
    const entities = { amp: '&', apos: '\'', gt: '>', lt: '<', nbsp: '\xa0', quot: '"' };
    entity = entity.toLowerCase();
    if (entities.hasOwnProperty(entity)) {
      return entities[entity];
    }
    return match;
  });
}
const scriptsrc = `
<script src="http://widget.cloud.opta.net/v3/v3.opta-widgets.js"></script>
`
const scriptCode = `<script type="text/javascript">
{(function() {
opta_settings = {
  subscription_id: '978d5d7e1501e56a5e0b49e800ca7d65',
  language: 'en_GB',
  timezone: 'Europe/London'
};
})()}
</script>`
const responsive = {
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
const sponsorResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
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
const testimonialResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  LargeDesktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1400, min: 992 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 992, min: 468 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 467, min: 0 },
    items: 1,
  },
};

const Firstlandingpage = () => {
  const [prizesempty, setPrizesEmpty] = useState(true);
  const logout = useSelector((state) => state);
  let navigate = useNavigate();
  const handleClick = (value) => {
    if (value == "signin") {
      navigate("/signin");
    }
  };

  const { t, i18n } = useTranslation();
  const [imgdata, setImgdata] = useState([]);
  useEffect(() => {
    initData();
  }, []);
  const initData = async () => {
    let GetClients = await Apidata.GetClienttable();
    let getdata = GetClients.data.Results;
    setImgdata(getdata);
  };
  let Sponsers = imgdata.filter((data) => {
    return data.type === "Sponsers";
  });
  let Clients = imgdata.filter((data) => {
    return data.type === "Clients";
  });

  const [prizedata, setPrizedata] = useState([]);

  useEffect(() => {
    prizeData();
  }, []);

  const prizeData = async () => {
    let GetPrizedata = await ApiPrizedata.GetPrizes();
    let getprizedata = GetPrizedata.data.Results;
    setPrizedata(getprizedata);
  };
  let Top_Prizes = prizedata.filter((data) => {
    return data.prizePosition === "Top Prize";
  });
  let Weekly_Prize = prizedata.filter((data) => {
    return data.prizePosition === "Weekly Prize";
  });

  return (
    <>
      <FirstNavBar />
      <section id="home" className="banner">
        <div className="container-fluid">
          <div className="px-md-5">
            <div className="row">
              <div className="col-md-7">
                <div className=" word1 top">
                  {t("LANDING_BANNER_DESCRIPTION")}
                  <br />
                  <span>{t("LANDING_KNOWLEDGE")}</span>&nbsp;&
                  <span className="orangeText fw-bold">
                    &nbsp;{t("LANDING_WIN")}
                  </span>
                </div>
                <div className="font2">
                  {t("LANDING_BANNER_SUBDESCRIPTION1")} <br />{" "}
                  {t("LANDING_BANNER_SUBDESCRIPTION2")}
                </div>
              </div>
              <div className="col-md-7 d-flex flex-row justify-content-end bannerRightImage">
                <div className="">
                  <div className="landimg">
                    <img
                      src={LandImg}
                      alt="LandingImg"
                      className="img-fluid"
                      width={550}
                      height={1108}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="howToPlay mb-5"
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
      >
        <div className="container-fluid">
          <div className="px-md-5">
            <div className="row">
              <div className="landtext">{t("HOW_TO_PLAY")}</div>
              <div className=" d-md-flex flex-md-row justify-content-between">
                <div class="row col-md-12 row-cols-md-4">
                  <div class="col">
                    <Cards
                      cardBox={"col-md-12 card box1 boxAnimation"}
                      img={shape}
                      detail={t("SELECT_MATCHES")}
                      style={"subText headingText1"}
                    />
                  </div>
                  <div class="col">
                    <Cards
                      cardBox={"col-md-12 card box1 boxAnimation2"}
                      img={chart}
                      detail={t("LANDING_PREDICT")}
                      style={"subText headingText2"}
                    />
                  </div>
                  <div class="col">
                    <Cards
                      cardBox={"col-md-12 card box1 boxAnimation3"}
                      img={contact}
                      detail={t("JOIN_MATCH_ROOMS")}
                      style={"subText headingText3"}
                    />
                  </div>
                  <div class="col">
                    <Cards
                      cardBox={"col-md-12 card box1 boxAnimation4"}
                      img={giftbox}
                      detail={t("WIN")}
                      style={"subText headingText4"}
                    />
                  </div>
                </div>
              </div>
              <div class="prizes1 "></div>
            </div>
          </div>
        </div>
      </section>
      <div class="prizes2"></div>
      <br /> <br /> <br />
      {prizesempty === true ? (
        <section className="topPrize">
          <div className="col-12">
            <div className="background cartext">
              {Top_Prizes != 0 ?
                < div className="text-center">
                  <h5 className="heading mt-4 pt-5">{t("TOP_PRIZE")}</h5>
                  {Top_Prizes.map((data) => {
                    return (
                      <>
                        <div className="top2 text-center">
                          {t("TOP_PRIZE_DESCRIPTION")}
                          <br />
                        </div>
                        <div className="car">
                          <img
                            src={data.s3Url}
                            className="img-fluid"
                            width={1000}
                          ></img>
                        </div>
                      </>
                    );
                  })}
                </div> : <></>
              }
              < div className="text-center">
                {Weekly_Prize != 0 ?
                  <>
                    < h5 className="heading mb-5 pt-4">{t("WEEKLY_PRIZES")}</h5>
                    <Carousel
                      responsive={weeklyPrizesResponsive}
                      ArrowOnDeviceType={["desktop", "mobile"]}
                    >
                      {Weekly_Prize.map((data) => {
                        return (
                          <>
                            <div className="col-sm">
                              <img src={data.s3Url} className="img-fluid"></img>
                            </div>
                          </>
                        );
                      })}
                    </Carousel>
                  </>
                  : <></>
                }
              </div>
            </div>
          </div>
        </section>
      ) : null}
      <section className="testimonial">
        <div className="heading">{t("WHAT_OUR_FANS_ARE_SAYING")}</div>
        <div className="col-md-12">
          <div className="mt-5 text-center">
            <Carousel
              responsive={testimonialResponsive}
              removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
              dir={i18n.language == "ar" ? "rtl" : "ltr"}
            >
              <div
                className="card cardstyle"
                dir={i18n.language == "ar" ? "rtl" : "ltr"}
              >
                <div className="d-md-flex">
                  <div className="col-md-4">
                    <img
                      src={Image1}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body text-start">
                      <h5 className="text5 text-start">{t("ALBERT_DIDIER")}</h5>
                      <p className="text-muted">{t("EUISMOD_IPSUM")}</p>
                      <p className="text6">
                        <span className="doubleQuotes">“</span>
                        {t("FANS_CARD_DESCRIPTION")}
                        <span className="doubleQuotes">“</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card cardstyle"
                dir={i18n.language == "ar" ? "rtl" : "ltr"}
              >
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={Image1}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body text-start">
                      <h5 className="text5 text-start">{t("ALBERT_DIDIER")}</h5>
                      <p className="text-muted text-start">
                        {t("EUISMOD_IPSUM")}
                      </p>
                      <p className="text6">
                        <span className="doubleQuotes">“</span>
                        {t("FANS_CARD_DESCRIPTION")}
                        <span className="doubleQuotes">“</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card cardstyle"
                dir={i18n.language == "ar" ? "rtl" : "ltr"}
              >
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={Image1}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body text-start">
                      <h5 className="text5 text-start">{t("ALBERT_DIDIER")}</h5>
                      <p className="text-muted text-start">
                        {t("EUISMOD_IPSUM")}
                      </p>
                      <p className="text6">
                        <span className="doubleQuotes">“</span>
                        {t("FANS_CARD_DESCRIPTION")}
                        <span className="doubleQuotes">“</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card cardstyle"
                dir={i18n.language == "ar" ? "rtl" : "ltr"}
              >
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={Image1}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>

                  <div className="col-md-8">
                    <div className="card-body text-start">
                      <h5 className="text5 text-start">{t("ALBERT_DIDIER")}</h5>
                      <p className="text-muted text-start">
                        {t("EUISMOD_IPSUM")}
                      </p>
                      <p className="text6">
                        <span className="doubleQuotes">“</span>
                        {t("FANS_CARD_DESCRIPTION")}
                        <span className="doubleQuotes">“</span>
                      </p>
                      <div id="sponsor1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
          <div class="sponsor2"></div>
        </div>
      </section>
      {imgdata.length != 0 && (
        <>
          {
            Sponsers != 0 ?
              <section
                className="sponsors"
                dir={i18n.language == "ar" ? "rtl" : "ltr"}
              >
                <div className="heading mb-5">{t("SPONSORS")}</div>
                <div id="clients1"></div>
                <div className="sponser text-center">
                  <Carousel
                    responsive={sponsorResponsive}
                    containerclassName="justify-content-center"
                    itemclassName="carousel-item-padding-40-px"
                  >
                    {Sponsers.map((data) => {
                      return (
                        <div className="col-sm">
                          <img src={data.s3Url} className="img-fluid"></img>
                        </div>
                      );
                    })}
                  </Carousel>
                  <div id="clients2"> </div>
                </div>
              </section> : <></>
          }
          {
            Clients != 0 ?
              <section className="client" dir={i18n.language == "ar" ? "rtl" : "ltr"}>
                <div className="heading mb-5">{t("CLIENTS_PARTNERS")}</div>
                <div className="clients text-center">
                  <Carousel
                    responsive={responsive}
                    autoPlaySpeed={1000}
                    containerclassName="justify-content-center"
                  >
                    {Clients.map((data) => {
                      return (
                        <div className="col-sm">
                          <img src={data.s3Url} className="img-fluid"></img>
                        </div>
                      );
                    })}
                  </Carousel>
                  <div id="faq"></div>
                </div>
              </section> : <></>
          }
        </>
      )}
      <section
        className="faq"
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
      >
        <div className="container">
          <div className="row">
            <div className="title text-center">
              {t("FAQS")}
              <span></span>
            </div>
            <div className="col-12 col-sm-12 col-lg-6">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      {t("FAQ1")}
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>{t("FAQ1_ANS1")}</p>
                      <p>{t("FAQ1_ANS2")}</p>
                      <p>{t("FAQ1_ANS3")}</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      {t("FAQ2")}
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>{t("FAQ2_ANS1")}</p>
                      <p>{t("FAQ2_ANS2")}</p>
                      <p>{t("FAQ2_ANS3")}</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      {t("FAQ3")}
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>{t("FAQ3_ANS1")}</p>
                      <p>{t("FAQ3_ANS2")}</p>
                      <p>{t("FAQ3_ANS3")}</p>
                      <p>{t("FAQ3_ANS4")}</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      {t("FAQ4")}
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>{t("FAQ4_ANS1")}</p>
                      <p>{t("FAQ4_ANS2")}</p>
                      <p>{t("FAQ4_ANS3")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-lg-6">
              <div className="accordion" id="accordionExamplee">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      {t("FAQ5")}
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExamplee"
                  >
                    <div className="accordion-body">
                      <p>{t("FAQ5_ANS1")}</p>
                      <p>{t("FAQ5_ANS2")}</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingSix">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      {t("FAQ6")}
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingSix"
                    data-bs-parent="#accordionExamplee"
                  >
                    <div className="accordion-body">
                      <p>{t("FAQ6_ANS1")}</p>
                      <p>{t("FAQ6_ANS2")}</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingSeven">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSeven"
                      aria-expanded="false"
                      aria-controls="collapseSeven"
                    >
                      {t("FAQ7")}
                    </button>
                  </h2>
                  <div
                    id="collapseSeven"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingSeven"
                    data-bs-parent="#accordionExamplee"
                  >
                    <div className="accordion-body">
                      <p>{t("FAQ7_ANS1")}</p>
                      <p>{t("FAQ7_ANS2")}</p>
                      <p>{t("FAQ7_ANS3")}</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingEight">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEight"
                      aria-expanded="false"
                      aria-controls="collapseEight"
                    >
                      {t("FAQ8")}
                    </button>
                  </h2>
                  <div
                    id="collapseEight"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingEight"
                    data-bs-parent="#accordionExamplee"
                  >
                    <div className="accordion-body">
                      <p>{t("FAQ8_ANS1")}</p>
                      <p>{t("FAQ8_ANS2")}</p>
                      <p>{t("FAQ8_ANS3")}</p>
                      <p>{t("FAQ8_ANS4")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Firstlandingpage;
