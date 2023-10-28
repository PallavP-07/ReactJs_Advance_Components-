import React from "react";
import { Table } from "antd";
const AntTable = ({ dataSource, columns }) => {
    return (
        <>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}

export default AntTable