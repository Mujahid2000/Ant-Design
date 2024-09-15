import { CloseOutlined, DeleteFilled, MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Form, Image, Input, Layout, message, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { Text } = Typography;
const { Sider } = Layout;
import Title from "antd/es/typography/Title";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const [data, setData] = useState([]);
  const [sidebar, setSideBar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const storedProducts = localStorage.getItem("cartProducts");

    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setData(parsedProducts);
    } else {
      console.log("No products found in localStorage.");
    }
  }, [data]);


  const onFinish = (values) => {
    console.log('Received values from the form: ', values);
    message.success('Your message has been sent!');
    form.resetFields(); // Reset form after submission
  };

  // Handle form submission failure
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please fill in all required fields.');
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
     <div
      className={`${
        openMenu ? "bg-opacity-100" : "bg-opacity-5"
      } bg-[#24a8ff] fixed z-50 w-full text-white mx-auto shadow-lg`}
    >
      {/* Navigation bar for desktop and larger devices */}
      <div className="bg-[#24a8ff] py-4 fixed w-full justify-between px-8 flex items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img
            className="h-8 w-8 rounded-full"
            src="https://i.ibb.co/6Yxs70d/2021-10-26-23h27-03.png"
            alt="Logo"
          />
          <span className="ml-4 uppercase font-black text-lg">clara thella</span>
        </Link>

        {/* Menu Icon for Mobile */}
        <Button
          className="block md:hidden"
          onClick={() => setOpenMenu(!openMenu)}
          icon={openMenu ? <CloseOutlined /> : <MenuOutlined />}
          style={{ color: "white", fontSize: "24px", background: "transparent", border: "none" }}
        />

        {/* Navigation Links */}
        <div
          className={`${
            openMenu ? "flex" : "hidden"
          } flex-col md:flex md:flex-row gap-8 items-center absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-[#24a8ff] md:bg-transparent px-8 py-4 md:py-0 md:px-0 transition-all duration-500 md:transition-none`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-base text-center">
            <li className="py-2 md:py-0">
              <Link to="/">Home</Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/addproduct">Add Product</Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/productList">Product List</Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/service">Services</Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="">Blog</Link>
            </li>
          </ul>

          {/* Cart and Contact Button */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button
              onClick={() => setSideBar(!sidebar)}
              type="transparent"
              icon={<ShoppingCartOutlined />}
              style={{ color: "white", fontSize: "20px" }}
            >
              {data.length}
            </Button>
            <Button
              onClick={showModal}
              className="rounded-full font-bold px-8 py-2"
              style={{ backgroundColor: "#24a8ff", color: "white" }}
            >
              Contact me
            </Button>
          </div>
        </div>
      </div>
    </div>

  <Layout
  className={`${sidebar==true? 'mr-0 ease-in-out duration-700': '-mr-96 ease-in-out duration-700'} `}
        style={{
          display: "flex",
          flexDirection: "row-reverse", // To reverse the order of Content and Sider
          marginTop: "65px",
          position: "fixed",
          zIndex: 50,
          right: 0, // Push the layout to the right side
          height: "100vh",
          
          
        }}
      >
        {/* Sider on the right */}
        <Sider
  breakpoint="lg"
  collapsedWidth="0"
  onBreakpoint={(broken) => {
    
  }}
  onCollapse={(collapsed, type) => {
    console.log(collapsed, type);
  }}
  width={280}
  style={{
    background: "#fff",
    overflowY: "scroll",
    position: "relative", 
    scrollbarWidth: 'none' // Ensure proper positioning
  }}
>
  <div style={{ paddingBottom: "100px" }}> {/* Add padding to ensure there's space above the buttons */}
    {data.map((product, index) => (
      <Card
        key={index}
        style={{
          width: 280,
          height: 150,
          borderRadius: "0",
        }}
      >
        <div className="flex justify-between gap-2 items-center">
          <div>
            <Image src={product.image} width={50}></Image>
          </div>
          <div>
            <Title level={5}>{product.title}</Title>
            <Text>{product.price}</Text>
          </div>
          <div>
            <Button
              style={{ border: "none" }}
              icon={
                <DeleteFilled
                  style={{ fontSize: "16px", textAlign: "center" }}
                />
              }
            >
              
            </Button>
          </div>
        </div>
      </Card>
    ))}
  </div>

  {/* Fix the buttons to the bottom */}
  <div
    className="flex justify-around"
    style={{
      position: "fixed",
      bottom: 0,
      width: "280px",
      backgroundColor: "#fff",
      padding: "10px 0",
      boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)", // Optional: adds a shadow for better visual separation
    }}
  >
    <Button style={{ backgroundColor: "#24a8ff", color: "white" }}>
      Clear All
    </Button>
    <Button style={{ backgroundColor: "#24a8ff", color: "white" }}>
      Check Out
    </Button>
  </div>
</Sider>

      </Layout>

      <div className="   " >
      
    </div>

    <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ maxWidth: '600px', margin: '0 auto', }}>
    <Title className=' text-center'>Contact Us</Title>
      <Form
        form={form}
        name="contact"
        layout="vertical"
        onFinish={onFinish} // Successful submit handler
        onFinishFailed={onFinishFailed} // Failed submit handler
        style={{padding: '2rem'}}
      >
        {/* Name Field */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter your name!', // Required validation message
            },
          ]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid email!', // Email validation message
            },
            {
              required: true,
              message: 'Please enter your email!', // Required validation message
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Phone Number"
          name="number"
          rules={[
            {
              type: Number,
              message: 'The input is not a valid email!', // Email validation message
            },
            {
              required: true,
              message: 'Please enter your email!', // Required validation message
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        {/* Message Field */}
        <Form.Item
          label="Message"
          name="message"
          rules={[
            {
              required: true,
              message: 'Please enter your message!', // Required validation message
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter your message" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button style={{ backgroundColor: '#24a8ff', color: 'white', }} size='large' htmlType="submit" block>
            Send Message
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    </div>
  );
};

export default Navbar;
