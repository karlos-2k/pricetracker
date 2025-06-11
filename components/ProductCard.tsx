import { Product } from '@/types';
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';

interface Props {
  product: Product;  // Defining the product prop as a Product object
}
const productCard = ({product}: Props) => {  // Destructuring the product prop
  return (
    <Link href={`/products/${product._id}`} className='sm:w-[292px] sm:max-w-[292px] w-full flex-1 flex flex-col gap-4 rounded-md' >
        <div className='flex-1 relative flex flex-col gap-5 p-4 rounded-md'>
            <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="max-h-[250px] object-contain w-full h-full bg-transparent"
            />
        </div>

        <div>
          <h3 className='text-secondary text-xl leading-6 font-semibold truncate'>{product.title}</h3>

          <div className='flex-justify-between'>
            <p className='text-black opacity-50 text-lg capitalize'>
              {product.category}
            </p>
            <p className='text-black text-lg font-semibold'>
              <span>{product?.currency}</span>
              <span>{product?.currentPrice}</span>
            </p>
          </div>
        </div>
    </Link>

  )
}

export default productCard