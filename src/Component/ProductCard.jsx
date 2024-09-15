import { Button, Card } from 'antd';

import{ useContext } from 'react';
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import Meta from 'antd/es/card/Meta';
import   './product.css'
import {  Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ProductContext } from './Context';
const ProductCard = () => {
    const { Title } = Typography;
    const { products, loading, error } = useContext(ProductContext);

      const handleCart = (products) => {
        let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        cartProducts.push(products);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      };
      
    
    return (
        <div className='max-w-[1440px] mt-10 mx-auto'>
            <Title underline  className='text-center'>Our Products</Title>
        <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1  gap-7 items-center place-content-center justify-center'>
            {
                products.map((pro, index)=>(
                    <Card key={index} 
      hoverable
      style={{ width: 350 }}
      cover={
        <img
          alt={pro.title}
          src={pro.image}
          style={{ height: 350 , objectFit: 'fill',padding: '19px', }}
        />
      }
      actions ={[
        <Button onClick={()=>handleCart(pro, pro.id)} style={{border: 'none'}} type='small' key={pro.id} icon={<ShoppingCartOutlined />}  className="uppercase py-5 text-base px-4 rounded-lg bg-[#24a8ff] border-2 border-transparent text-white text-md mr-4 hover:bg-[#24a8ff]">
          Add  Cart
        </Button>,
        <Link key={index} to={`/productDetails/${pro.id}`}>
        <Button type='small'  icon={<EyeOutlined />}  className="uppercase py-5 text-base px-4 rounded-lg bg-[#24a8ff] border-2 border-transparent text-white text-md mr-4 hover:bg-[#24a8ff]">
          View Details
        </Button>
        </Link>
      ]}
    >
      <Meta
      key={pro.id}
        title={pro.title}
        description={
          <div>
            <p>{pro.description.slice(0, 60)}</p>
            <p className="font-bold">{pro.price}</p>
          </div>
        }
      />
    </Card>
                ))
            }
            
        </div>
        </div>
    );
};

export default ProductCard;