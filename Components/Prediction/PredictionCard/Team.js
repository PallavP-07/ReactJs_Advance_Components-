import "../../../Assets/Styles/Prediction.css"
function Team({ exactAnswer }) {
    return (
        <div className="d-md-flex flex-column">
            <div className="TriviaQuestion">
                Correct Answer
            </div>
            <div className='col-12 d-flex justify-content-center align-items-center'>
                <div className='col-10 d-flex justify-content-center arrowcolor'>
                    {exactAnswer}
                </div>
            </div>
        </div>
    )
}

export default Team;