import React from 'react'
import { DownOutlined   } from '@ant-design/icons';
import { Select } from 'antd';
const Selectbox = ({ placeholder, bordered, style, option, defaultValue, handleChange,isSearchable,isDisabled }) => {
  const { Option } = Select;
  return (
    < >
      <Select
        size={'middle'}
        defaultValue={defaultValue}
        value={defaultValue}
        placeholder={placeholder}
        bordered={bordered}
        style={style}
        onChange={handleChange}
        isSearchable={isSearchable}
        disabled={isDisabled}
      > 
        {option.map((data) => {
          return (
            <Option style={{color: 'black'}} value={data.value}>{data.label}</Option>
          )
        })}
      </Select>
    </ >
  )
}

export default Selectbox;

