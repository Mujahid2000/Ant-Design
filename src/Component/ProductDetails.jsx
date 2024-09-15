import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Rate, Card, Image, Button } from 'antd';
import { FacebookFilled, MessageFilled, ShoppingCartOutlined, TwitterSquareFilled } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { ProductContext } from './Context';

const ProductDetails = () => {
  const { id } = useParams();
  const { receiveParams, detailsProduct, loading, error } = useContext(ProductContext);

  // Send the id to context to fetch the product
  receiveParams(id);

  // If the product is still loading
  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  // If there's an error
  if (error) {
    return <div className="text-center text-red-500 py-20">Error fetching product: {error.message}</div>;
  }

  // Handle adding product to cart
  const handleCart = (product) => {
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    cartProducts.push(product);
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  };

  // Render product details
  return (
    <div className="pt-20 max-w-7xl mx-auto">
      <Card
        style={{ maxWidth: 2000, display: 'flex', margin: '0 auto', padding: '20px' }}
        bodyStyle={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}
      >
        <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center">
          {/* Product Image */}
          <Image
            width={400}
            src={detailsProduct?.image}
            alt={detailsProduct?.title}
            style={{ objectFit: 'contain', marginBottom: '20px' }}
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-2/3">
          <Paragraph style={{ textTransform: 'uppercase', color: '#888' }}>
            {detailsProduct?.category}
          </Paragraph>
          <Title level={2}>{detailsProduct?.title}</Title>

          {/* Rating Section */}
          <div className="flex items-center gap-2 mt-3">
            <Rate style={{ fontSize: 18 }} disabled allowHalf defaultValue={detailsProduct?.rating?.rate} />
            <span className="text-gray-600 text-base">
              {detailsProduct?.rating?.rate} out of {detailsProduct?.rating?.count} reviews
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center mt-4 gap-3">
            <FacebookFilled style={{ fontSize: 20, color: '#3b5998' }} />
            <TwitterSquareFilled style={{ fontSize: 20, color: '#1DA1F2' }} />
            <MessageFilled style={{ fontSize: 20, color: '#25D366' }} />
          </div>

          {/* Product Description */}
          <Paragraph style={{ marginTop: 20, textAlign: 'justify' }}>
            {detailsProduct?.description}
          </Paragraph>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mt-8">
            <Title level={4} className="text-lg text-[#24a8ff]">
              Price: ${detailsProduct?.price}
            </Title>
            <Button
              type="primary"
              size="large"
              className="bg-[#24a8ff] hover:bg-sky-600 text-white"
              icon={<ShoppingCartOutlined />}
              onClick={() => handleCart(detailsProduct)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
