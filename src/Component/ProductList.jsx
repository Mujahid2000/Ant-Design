import { useContext, useEffect, useState } from 'react';
import { Form, Image, Input, InputNumber, Popconfirm, Rate, Table, Typography } from 'antd';
import { ProductContext } from './Context';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ProductList = () => {
  const { products, loading } = useContext(ProductContext);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]); // Keep dataSource as the main state
  const [editingKey, setEditingKey] = useState('');
  
  const isEditing = (record) => record.id === editingKey; // Use `id` for comparison
  
  const edit = (record) => {
    form.setFieldsValue({
      title: '',
      price: '',
      description: '',
      ...record, // Set the form with the product's current values
    });
    setEditingKey(record.id); // Set the editing key to the record's `id`
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row, // Merge new values into the record
        });
        setDataSource(newData); // Update the state with the new data
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  useEffect(() => {
    setDataSource(products); // Initialize products data
  }, [products]);

  const handleDelete = (id) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData); // Remove the product from the data
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      responsive: ['md'],
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      editable: true,
      render: (text) => <b>{text}</b>,
      width: 200,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      editable: true,
      render: (price) => `$${price}`,
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      editable: true,
      ellipsis: true,
      responsive: ['lg'],
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled defaultValue={rating?.rate} />,
      width: 150,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image src={image} alt="product" width={60} />,
      width: 100,
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
      width: 100,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)} // Use `id` instead of `key`
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
      width: 150,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'price' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="max-w-[1440px] mx-auto">
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{ onChange: cancel }}
        />
      </Form>
    </div>
  );
};

export default ProductList;
