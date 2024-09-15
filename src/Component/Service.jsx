
import { Form, Input, Button, message } from 'antd';
import Title from 'antd/es/typography/Title';

// Contact Form component
const ContactForm = () => {
  const [form] = Form.useForm();

  // Handle form submission
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

  return (
    <div className="   " style={{ maxWidth: '600px', margin: '0 auto', }}>
      <Title className='mt-20 text-center'>Contact Us</Title>
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
    </div>
  );
};

export default ContactForm;
