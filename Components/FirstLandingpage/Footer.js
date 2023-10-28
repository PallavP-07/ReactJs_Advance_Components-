import React from "react";
import "../../Assets/Styles/FirstLandingPage.css";
import logoWhite from "../../Assets/Images/logoWhite.png";
import fb from "../../Assets/Images/fb.png";
import twitter from "../../Assets/Images/twitter.png";
import twilio from "../../Assets/Images/twilio.png";
import insta from "../../Assets/Images/instagram.png";
import snapchat from "../../Assets/Images/snapchat.png";
import tikTok from "../../Assets/Images/tik-tok.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();

  const handleChangeRules = () => {
    navigate("/rules");
  };
  const handleChangePrivacy = () => {
    navigate("/privacy");
  };
  const handleChangeTnC = () => {
    navigate("/termsncondition");
  };
  const handleChangeWidget = () => {
    navigate("/widget");
  };
  return (
    <>
      <section className="footer" dir={i18n.language == "ar" ? "rtl" : "ltr"}>
        <div className="footer-body">
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col col-md-5">
                  <div className="footerlogo">
                    <img
                      src={logoWhite}
                      alt="Footer Logo"
                      className="img-fluid"
                    />
                  </div>
                  <div className="social-icons">
                    <div className="row">
                      <div className="col">
                        <a
                          href="https://www.facebook.com/elstrikerapp"
                          target="_blank"
                        >
                          <img
                            src={fb}
                            alt="Footer Logo"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                      <div className="col">
                        <a
                          href="https://twitter.com/elstrikerapp?s=21&t=BsBQ2_kg6Ip8rgXhVRvPhg"
                          target="_blank"
                        >
                          <img
                            src={twitter}
                            alt="Footer Logo"
                            className="img-fluid"
                          />
                        </a>
                      </div>

                      <div className="col">
                        <a
                          href="https://instagram.com/elstrikerapp?igshid=YmMyMTA2M2Y="
                          target="_blank"
                        >
                          <img
                            src={insta}
                            alt="Footer Logo"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                      <div className="col">
                        <a href="#" target="_blank">
                          <img
                            src={twilio}
                            alt="Footer Logo"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                      <div className="col">
                        <img
                          src={snapchat}
                          alt="Footer Logo"
                          className="img-fluid"
                        />
                      </div>
                      <div className="col">
                        <a href="https://www.tiktok.com/@elstrikerapp?_t=8WfcP4u7Mdl&_r=1">
                          <img
                            src={tikTok}
                            alt="Footer Logo"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="getintouch">
                    <div className="title">{t("GET_IN_TOUCH")}</div>
                    <div className="inputdata">
                      <input type="email" placeholder={t("ENTER_YOUR_EMAIL")} />
                      <button className="send">{t("SEND")}</button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <ul className="footer-menu-1">
                    <li>
                      <Link to="home" smooth={true} duration={100}>
                        <a>{t("HOME")}</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="prizes2" smooth={true} duration={100}>
                        <a>{t("PRIZES")}</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="sponsor2" smooth={true} duration={100}>
                        <a>{t("SPONSORS")}</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="clients2" smooth={true} duration={100}>
                        <a>{t("CLIENTS_PARTNERS")}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-3">
                  <ul className="footer-menu-2">
                    <li>
                      <a onClick={handleChangePrivacy}>{t("PRIVACY_POLICY")}</a>
                    </li>
                    <li>
                      <a onClick={handleChangeTnC}>{t("TERMS_CONDITIONS")}</a>
                    </li>
                    <li>
                      <a onClick={handleChangeRules}>{t("RULES")}</a>
                    </li>
                    <li>
                      <Link to="faq" smooth={true} duration={100}>
                        <a>{t("FAQS")}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
