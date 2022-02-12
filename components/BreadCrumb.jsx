import Link from "next/link"

const BreadCrumb = ({ breadCrumbs }) => {

    return (
        <div className="flex items-center text-base font-semibold">
            {breadCrumbs?.map((breadCrumb, index) => {
                if (breadCrumb.isLink) {
                    return (
                        <Link href={breadCrumb.link}>
                            <a className=" text-gray-500 flex items-center hover:text-black normal-transition">
                                {breadCrumb.name}
                                <i className="bi bi-chevron-compact-right mx-3 text-gray-500"></i>
                            </a>
                        </Link>
                    )
                }

                if (index === breadCrumbs.length - 1) {
                    return (
                        <p className=" text-purple-800 truncate mb-0">{breadCrumb.name}</p>
                    )
                } else {

                    return (
                        <div key={breadCrumb.name + '-' + index} className="flex items-center">
                            <p className=" text-gray-500 truncate mb-0">{breadCrumb.name}</p>
                            <i className="bi bi-chevron-compact-right mx-3 text-gray-500"></i>
                        </div>
                    )
                }

            })}
        </div>
    )
}

export default BreadCrumb