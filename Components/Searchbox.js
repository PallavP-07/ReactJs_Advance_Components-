import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Search } = Input;
const Searchbox = ({ placeholder, allowClear, style, onSearch,bordered,size }) => (
  <Space direction="vertical">
    <Search
      placeholder={placeholder}
      allowClear={allowClear}
      onSearch={onSearch}
      style={style}
      bordered={bordered}
      size={size}
    />

  </Space>
);

export default Searchbox;