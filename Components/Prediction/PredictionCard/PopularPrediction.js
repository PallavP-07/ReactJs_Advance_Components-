import React, { useState, useEffect } from "react";
import "../../../Assets/Styles/Prediction.css"
import Progressbar from "../PredictionCard/progressBar";
function PopularPred({ teamanalysis, count = 4, widgetPredictionTextStyle, ProgressPercentageStyle }) {
    return (
        <>
            <div className="col-12 d-flex justify-content-start predictionText py-1" style={widgetPredictionTextStyle}>Popular Predictions</div>
            {
                teamanalysis?.slice(0, count).map((data) => {
                    return (
                        <>
                            <Progressbar ProgressData={Math.round(data?.percentage)} summary={data?.goal} ProgressPercentageStyle={ProgressPercentageStyle}  />
                        </>
                    )
                })
            }
        </>
    )
}

export default PopularPred;