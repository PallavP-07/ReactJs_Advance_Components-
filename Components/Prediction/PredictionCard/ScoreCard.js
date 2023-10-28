import "../../../Assets/Styles/Prediction.css"
import _ from 'lodash'
function ScoreCard({ summary }) {
    return (
        <>
            {
                summary[0] !== undefined && <div className="col-12 d-flex flex-column align-items-center">
                    <div className="summaryText">
                        Final Score
                    </div>
                    <div className="SummaryText">{summary[0]}&nbsp;-&nbsp;{summary[1]}</div>
                </div>
            }
        </>
    )
}

export default ScoreCard;