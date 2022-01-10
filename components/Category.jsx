import Link from "next/link";
import Image from "next/image"

const Category = ({category, subCategory}) => {
    return (
        <Link href={`/categories/${category.id}/${subCategory.name.toLowerCase()}`}>
            <a>
                <Image layout="intrinsic" className="scale-100 hover:scale-110 normal-transition" height={200} width={200} src={subCategory.img} alt="mega-menu-img-1" />
                <p className="text-left text-purple-800 hover:text-purple-300 lg:text-center uppercase normal-transition">{subCategory.name}</p>
            </a>
        </Link>
    )
}

export default Category
