import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
    const { t, i18n } = useTranslation();
    let navigate = useNavigate();

    const handleChangeRules = () => {
        navigate('/rules')
    }
    const handleChangePrivacy = () => {
        navigate('/privacy')
    }
    const handleChangeTnC = () => {
        navigate("/termsncondition");
      };
    
    return (
        <>
            <div className="PrivacyPolicy mb-2">
            &nbsp;<a onClick={handleChangePrivacy}>{t("PRIVACY_POLICY")} </a>&nbsp; |  &nbsp;<a onClick={handleChangeTnC}>{ t("TERMS_CONDITIONS")}</a>&nbsp;  |  &nbsp;<a onClick={handleChangeRules}>{t('RULES')}</a>&nbsp;
            </div>
        </>
    )
}
