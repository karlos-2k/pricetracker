import { Product } from '@/types';
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';

interface Props {
  product: Product;  // Defining the product prop as a Product object
}
const productCard = ({product}: Props) => {  // Destructuring the product prop
  return (
    <Link href={`/product/${product._id}`} className='product-card' >
        <div className='product-card-img-container'>
            <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="product-card_img"
            />
        </div>
    </Link>

  )
}

export default productCard