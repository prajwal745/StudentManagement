import { Popconfirm, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const TableComponent = ({ dataSource, inputColumns, handleDelete }) => {
  const defaultColumns = [
    ...inputColumns,
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record)}
          >
            <a>
              <DeleteOutlined
                style={{
                  color: "red",
                }}
              />
            </a>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return <Table bordered dataSource={dataSource} columns={columns} />;
};

export default TableComponent;
