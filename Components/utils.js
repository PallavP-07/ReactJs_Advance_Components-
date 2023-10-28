import Liveicon from "../Assets/Images/Liveicon.svg"
let moment = require("moment")

const getLocalTimeByDays = (date) => {
    if (moment().isBefore(moment(date))) {
        if (moment(date).diff(moment(), 'days') < 1) {
            if (moment(date).diff(moment(), 'h') <= 0) {
                return moment(date).diff(moment(), 'minutes') + " mins to Live"
            } else {
                return moment(date).diff(moment(), 'h') + " hrs to Live"
            }
        }
        return moment(date).local().format("LLL");
    } else {
        if (moment().isBefore(moment(date).add(3, "hours"))) {

            return (
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column justify-content-center">
                        <img src={Liveicon} alt='mic'></img>
                    </div>
                    <div className="d-flex align-items-center">Live</div>
                </div>
            )
        }
        return moment(date).local().format("LLL");
    }
}

const getLocalTime = (date) => {
    return moment(date).local().format("LLL");
}
const getLocalTimewithFormat = (date) => {
    return moment(date).local().format("lll");
}
export default {
    getLocalTime: getLocalTime,
    getLocalTimeByDays: getLocalTimeByDays,
    getLocalTimewithFormat:getLocalTimewithFormat
}
