import React, { useState } from 'react';
import { Input } from 'antd';

export const Test = () => {
  const [value, setValue] = useState('');

  // Hàm xử lý thay đổi giá trị
  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  // Kiểm tra nếu có giá trị được chọn thì sử dụng placeholder trống
  const placeholder = value ? '' : 'Tìm kiếm theo tên hoặc số điện thoại';

  return (
    <Input
      size="large"
      className="inputUser"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

