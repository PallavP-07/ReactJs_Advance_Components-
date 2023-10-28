import React from 'react'
import { Bars } from 'react-loader-spinner';
const Loader = () => {
    return (
        <Bars
            height="80"
            width="80"
            color="#F48220"
            ariaLabel="bars-loading"
            wrapperStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            wrapperClass=""
            visible={true}
        />
    )
}

export default Loader