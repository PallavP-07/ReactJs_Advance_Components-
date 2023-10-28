import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "../../../Assets/Styles/League.css"

const LeagueTable = ({ dataSource, columns, rowClassName, UserData }) => {

  const changedColorRow = (userId) => {
    let checkingUserId = false
    if (userId.userId == UserData) {
      checkingUserId = true
    }
    if (checkingUserId) {
      return "tablebg"
    } else {
      return ""
    }

  }
  return (
    <>
      <Table dataSource={dataSource} columns={columns} rowClassName={(data, index) => changedColorRow(data)} />
    </>
  );
};

export default LeagueTable;
