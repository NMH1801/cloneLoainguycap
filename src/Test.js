import { Table, Select } from 'antd';
import { useState } from 'react';

const dataSource = [
  // dữ liệu của bảng
];

const columns = [
  // cấu hình cột
];

export const Test = () => {
  const [pageSize, setPageSize] = useState(10); // Số lượng hàng trên mỗi trang

  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };

  return (
    <div>
      <Select value={pageSize.toString()} onChange={handlePageSizeChange}>
        <Select.Option value="10">10</Select.Option>
        <Select.Option value="20">20</Select.Option>
        <Select.Option value="30">30</Select.Option>
      </Select>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: pageSize,
        }}
      />
    </div>
  );
};
