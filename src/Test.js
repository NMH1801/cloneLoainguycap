import { Input } from "antd"
import {SearchOutlined} from "@ant-design/icons"
import "./test.css"
export const Test =() =>{
  return (
    <>
    <Input placeholder="input search text" size="large"
    prefix={
      <SearchOutlined />
      }
      />
      <Input></Input>

      </>
)
}
