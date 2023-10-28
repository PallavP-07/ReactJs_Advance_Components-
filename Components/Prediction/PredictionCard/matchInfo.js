import NY from "../../../Assets/Images/Ateams.png"
import Napoli from "../../../Assets/Images/Bteams.png"
import "../../../Assets/Styles/Prediction.css"

function MatchInfo({ DisableInput }) {
    return (
        <>
            <div className="d-flex col-12 align-items-center text-center">
                <div className="col-3">
                    <img src={NY} />
                    <div className="team">NY Yorks</div>
                </div>
                <div className="d-flex flex-column align-items-center col-6">
                    <div>
                        <input type="tel" maxLength={1} className="predictInput" disabled={DisableInput} />
                        <input type="tel" maxLength={1} className="predictInput" disabled={DisableInput} />
                    </div>
                    <div className="d-flex pt-2">
                        <div className="matchInfo">13 Sep</div>
                        &nbsp;<span style={{ color: "#ffffff" }}>|</span>&nbsp;
                        <div className="matchInfo">22:15</div>
                    </div>
                </div>
                <div className="col-3">
                    <img src={Napoli} />
                    <div className="team">Napoli</div>
                </div>
            </div>
        </>
    )
}

export default MatchInfo;