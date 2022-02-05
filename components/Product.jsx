import Image from 'next/image';
import Link from 'next/link';
import Rating from './Rating';

const Product = ({ product, addToCartHandler }) => {
    return <div className='relative h-80 w-52 bg-purple-100 border-purple-800'>
        <Link href={`/products/${product.name.split(' ').join('-')}`}>
            <a className='cursor-pointer'>
                <div className="flex justify-center items-center px-3 py-3">
                    <Image src={product.images[0]} layout='intrinsic' height={150} width={150} alt={product.name} />
                </div>
                <div className="text-center px-3 pt-3">
                    <Rating rating={product.rating} size="text-base" />
                    <h4 className='text-base line-clamp-2 mb-0'>{product.name}</h4>
                    <p className='text-base font-bold text-purple-800'>$ {product.price}</p>
                </div>
            </a>
        </Link>
        <button onClick={() => {
            addToCartHandler(product);
        }} className='flex justify-center items-center w-full hover:bg-purple-600 text-white normal-transition bg-purple-800 px-4 py-2 absolute bottom-0'>
            Add to basket
        </button>
    </div>;
};

export default Product;
