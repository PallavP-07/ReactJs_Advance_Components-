import React, { useState, useEffect } from 'react';
import Selectbox from "../../Selectbox";

function Trivia({ teamImg = "", options = [], predictedAnswer = "", questionName = "", handleOptionChange, disabled }) {
    const handleChange = (value) => {
        handleOptionChange(value)
    };
    useEffect(() => {
    }, [options, questionName]);

    return (
        <>
            <div className="col-12 d-md-flex flex-column justify-content-center align-items-center">
                <div className="col-12 d-flex justify-content-start align-items-center TriviaQuestion">
                    {questionName}
                </div>
                <div className=' col-12 d-flex justify-content-start align-items-center mt-1'>
                    <Selectbox
                        isDisabled={disabled}
                        bordered={false}
                        option={options}
                        defaultValue={predictedAnswer || "Select"}
                        handleChange={handleChange}
                        style={{
                            width: "100%",
                            backgroundColor: 'white',
                            color: "black",
                            borderRadius: "5px"
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default Trivia;