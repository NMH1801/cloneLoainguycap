import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import {
  SearchOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
export const Test = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (method) => {
        setIsModalOpen(true);
      };
      const handleModalClose = () => {
        setIsModalOpen(false);
      };
    const [number, setNumber] = useState(1);
    return(<>
            <Button onClick={() => { setNumber(""); showModal() }}></Button>
            <Button onClick={() => { setNumber(1); showModal() }}>1</Button>
            <Button onClick={() => { setNumber(2); showModal() }}>2</Button>
            <Modal
        title={isModalOpen ? "Thêm mới" : "Sửa"}
        open={isModalOpen} 
        onCancel={handleModalClose}
        footer={null}
      >
        <CustomForm
          number={number}
        />
      </Modal>
        </>
    )

};

const CustomForm =({number})=>{
    return <>
    <Form>
      <Form.Item>
        <Input           prefix={<UserOutlined />}
          placeholder="Tên hiển thị" value={number}>
            
          </Input>
        </Form.Item>
    </Form>
    </>
    
}