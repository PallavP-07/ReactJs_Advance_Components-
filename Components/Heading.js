import React from 'react'

const Heading = ({ className, heading, style }) => {
    return (
        <div className={className}>
            <div className="headingstyle" style={style}>{heading}</div>
        </div>
    )
}

export default Heading;