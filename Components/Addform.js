import React from "react";
import "../Assets/Styles/Addform.css"
import Buttons from "./Buttons";
import InputBox from "./InputBox";

export default function Addform() {

    const [show, toggleShow] = React.useState(true);

    return (
        <div>
            <Buttons
                style={{
                    borderRadius: 5, fontSize: "15px", width: "100%",
                }}
                text={"SEND CODE"}
                value={"signup"}
                onClick={() => toggleShow(!show)}
            />
            {show &&
                <InputBox
                    type="email"
                    required
                    allowClear
                    placeholder="Email address"
                    style={{
                        borderRadius: "5px"
                    }}
                    size="large"
                />}
        </div>
    )
}
