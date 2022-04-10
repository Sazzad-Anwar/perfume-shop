import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";

const Product = ({ product, addToCartHandler }) => {
  return (
    <div className="relative h-80 w-52 border-purple-800 bg-purple-100">
      <Link href={`/products/${product.name.split(" ").join("-")}`}>
        <a className="cursor-pointer">
          <div className="flex items-center justify-center px-3 py-3">
            <Image
              src={product.images[0]}
              layout="intrinsic"
              height={150}
              width={150}
              alt={product.name}
            />
          </div>
          <div className="px-3 pt-3 text-center">
            <Rating rating={product.rating} size="text-base" />
            <h4 className="mb-0 text-base line-clamp-2">{product.name}</h4>
            <p className="text-base font-bold text-purple-800">
              $ {product.price}
            </p>
          </div>
        </a>
      </Link>
      <button
        onClick={() => {
          addToCartHandler(product);
        }}
        className="normal-transition absolute bottom-0 flex w-full items-center justify-center bg-purple-800 px-4 py-2 text-white hover:bg-purple-600"
      >
        Add to basket
      </button>
    </div>
  );
};

export default Product;
