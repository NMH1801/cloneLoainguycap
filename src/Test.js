import React, { useState } from 'react';
import { Table } from 'antd';

export const Test = () => {
  const [dataSource, setDataSource] = useState([
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 35 },
  ]);

  const handleTableChange = (pagination, filters, sorter) => {
    setDataSource((prevDataSource) => {
      if (sorter.field) {
        const sortedData = [...prevDataSource].sort((a, b) => {
          if (sorter.order === 'ascend') {
            return a[sorter.field] - b[sorter.field];
          } else if (sorter.order === 'descend') {
            return b[sorter.field] - a[sorter.field];
          }
          return 0;
        });

        return sortedData;
      }
      return prevDataSource;
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      onChange={handleTableChange}
    />
  );
};

