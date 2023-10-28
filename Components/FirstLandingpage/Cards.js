import React from "react";
import "../FirstLandingpage/Card.css"

const Cards = ({ img, detail, subHeading = '', style = '', cardBox = '' }) => {
  return (
    <div className={cardBox}>
      <img src={img} alt="" className="shape" />
      {subHeading ? <span className="subHeading py-1">{subHeading}</span> : ''}
      <span className={style}>{detail}</span>
    </div>
  );
};

export default Cards;
