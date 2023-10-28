import React, { useState } from 'react'
import Heading from '../../Heading'
import { useTranslation } from 'react-i18next';

const ContentHeading = () => {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <div className='pt-2'>
                {t('MY_LEAGUE_PERFORMANACE_DESCRIPTION')}
            </div>
            <div >
                <div className='d-flex flex-row align-items-center'>
                    <div className='col-2 col-md-6'>
                        <Heading heading={t('STEPS')} style={{ color: "black", fontSize: "14px", fontWeight: 500 }} />
                    </div>
                </div>
                <ul>
                    <li>{t('CREATE_YOUR_OWN_LEAGUE')}</li>
                    <li>{t('INVITE_ALL_YOUR_FRIENDS')}</li>
                    <li>{t('SEE_IF_YOU_CAN')}</li>
                    <li>{t('CAN_YOUR_LEAGUE')}</li>
                </ul>
            </div>
            <div>
                <Heading heading={t('LEAUGE_PRIZES')} style={{ color: "black", fontSize: "14px", fontWeight: 500 }} />
                <div>
                    {t('LEAGUE_PRIZES_DESCRIPTION1')}
                </div>
                <h5 className='mt-2'>{t('LEAGUE_PRIZES_DESCRIPTION2')}</h5>
            </div>
        </div>
    )
}

export default ContentHeading