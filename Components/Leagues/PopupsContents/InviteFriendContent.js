import React, { useState } from "react";
import fb from "../../../Assets/Images/FB.svg";
import snap from "../../../Assets/Images/snap.svg";
import ig from "../../../Assets/Images/ig.svg";
import twitter from "../../../Assets/Images/twitter.svg";
import twitch from "../../../Assets/Images/twitch.svg";
import Button from "../../Buttons";
import { colors } from "../../Color";
import { useTranslation } from 'react-i18next';
import "../../../Assets/Styles/InviteFriend.css"

export const InviteFriendContent = ({ leagueIDvar }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [islinkCopied, setIsLinkCopied] = useState(false);
  const { t, i18n } = useTranslation();

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }
  async function copyTextToLinkClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }
  const handleCopyClick = () => {
    copyTextToClipboard(leagueIDvar)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleCopyClickLink = () => {
    copyTextToLinkClipboard(setvalue)
      .then(() => {
        setIsLinkCopied(true);
        setTimeout(() => {
          setIsLinkCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  let setvalue = `http://localhost:3000/leagues?${leagueIDvar}`
  return (
    <>
      <div>
        <div className="d-flex justify-content-between pt-2">
          <h4>{t('LEAGUE_LINK')}</h4>
        </div>
        <p>
          {t('LEGAL_LINK_DESCRIPION')}
        </p>

        <div className="d-flex justify-content-between pt-4">
           <input type="text" value={setvalue} readOnly className="copycode" />
          <div>
            <Button
              style={{
                backgroundColor: colors.white,
                color: colors.orange,
                borderRadius: 4,
                width: "108px",
                height: "42px",
                fontFamily: "Inter",
                border: "1px solid #F48220",
              }}
              value={t('COPY')}
              text={islinkCopied ? 'Copied!' : t('COPY')}
              onClick={handleCopyClickLink}
            />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center pt-4">
          <a href='https://www.facebook.com/' target='_blank'>
          <img src={fb} className="p-2" />
          </a>
          <a href='https://twitter.com/' target='_blank'>
          <img src={twitter} className="p-2" />
          </a>
          <a href='https://instagram.com/' target='_blank'>
          <img src={ig} className="p-2" />
          </a>
          <a href='https://www.twitch.tv/' target='_blank'>
          <img src={twitch} className="p-2" />
          </a>
          <a href='https://www.snapchat.com/' target='_blank'>
          <img src={snap} className="p-2" />
          </a>
        </div>

        <div className="d-flex justify-content-between pt-2">
          <h4>{t('LEAGUE_CODE')}</h4>
        </div>
        <p>{t('LEAGUE_CODE_DESCRIPTION')}</p>

        <div className="d-flex justify-content-between pt-2">
          <input type="text" value={leagueIDvar} readOnly className="copycode" />
          <Button
            style={{
              backgroundColor: colors.white,
              color: colors.orange,
              borderRadius: 4,
              width: "108px",
              height: "42px",
              fontFamily: "Inter",
              border: "1px solid #F48220",
            }}
            value={t('COPY')}
            text={isCopied ? 'Copied!' : t('COPY')}
            onClick={handleCopyClick}
          />
        </div>
      </div>
    </>
  )
}