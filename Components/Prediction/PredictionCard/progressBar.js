function Progressbar({ ProgressData, summary, ProgressPercentageStyle }) {
    let replace = summary.replaceAll(',', '')
    return (
        <>
            <div className=" col-12 d-flex justify-content-center" >
                <div className=" col-3 ProgressPercentage " style={ProgressPercentageStyle}>{replace[0] || 0}&nbsp;-&nbsp;{replace[1] || 0}</div>
                <div className=" col-6 progress progressBar">
                    <div className=" innerProgress"
                        style={{
                            width: `${ProgressData.toString()}%`,
                        }}
                        role="progressbar"
                        aria-valuenow={ProgressData}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                </div>
                <div className=" col-3 ProgressPercentage">{ProgressData}%</div>
            </div>
        </>
    )
}

export default Progressbar;