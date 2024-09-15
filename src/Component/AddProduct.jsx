import { Button, Form, Input, Select, notification } from 'antd';
import axios from 'axios';
import { useContext } from 'react';
import { ProductContext } from './Context';


const { Option } = Select;

const AddProduct = () => {
    const { addProduct  } = useContext(ProductContext);

  const onFinish = (values) => {
    // Logging the form data
    console.log('Submitted Values:', values);

    // POST request to the API
    axios
      .post('https://fakestoreapi.com/products', values)
      .then((response) => {
        console.log('Product added:', response.data);
        addProduct(response.data);
        notification.success({
          message: 'Product Added',
          description: 'Your product has been added successfully!',
        });
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: 'Error',
          description: 'There was an issue adding your product.',
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <main className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>

        <Form
          name="add_product_form"
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          {/* Title */}
          <Form.Item
            name="title"
            label="Product Title"
            rules={[{ required: true, message: 'Please input the product title!', whitespace: true }]}
          >
            <Input placeholder="Enter product title" />
          </Form.Item>

          {/* Price */}
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the product price!' }]}
          >
            <Input type="number" placeholder="Enter price" />
          </Form.Item>

          {/* Image Link */}
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: 'Please provide an image link!', whitespace: true }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            name="description"
            label="Product Description"
            rules={[{ required: true, message: 'Please input the product description!' }]}
          >
            <Input.TextArea placeholder="Enter product description" showCount maxLength={150} />
          </Form.Item>

          {/* Category */}
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
             <Select placeholder="Select category">
              <Option value="men's clothing">men's clothing</Option>
              <Option value="women's clothing">women's clothing</Option>
              <Option value="jewelery">jewelery</Option>
              <Option value="electronics">electronics</Option>
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full py-2 font-semibold"
              style={{ backgroundColor: '#24a8ff', color: '#fff' }}
            >
              Submit Product
            </Button>
          </Form.Item>
        </Form>
      </main>
    </div>
  );
};

export default AddProduct;
