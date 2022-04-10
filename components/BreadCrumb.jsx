import Link from "next/link";

const BreadCrumb = ({ breadCrumbs }) => {
  return (
    <div className="flex items-center text-base font-semibold">
      {breadCrumbs?.map((breadCrumb, index) => {
        if (breadCrumb.isLink) {
          return (
            <Link href={breadCrumb.link}>
              <a className=" normal-transition flex items-center text-gray-500 hover:text-black">
                {breadCrumb.name}
                <i className="bi bi-chevron-compact-right mx-3 text-gray-500"></i>
              </a>
            </Link>
          );
        }

        if (index === breadCrumbs.length - 1) {
          return (
            <p className=" mb-0 truncate text-purple-800">{breadCrumb.name}</p>
          );
        } else {
          return (
            <div
              key={breadCrumb.name + "-" + index}
              className="flex items-center"
            >
              <p className=" mb-0 truncate text-gray-500">{breadCrumb.name}</p>
              <i className="bi bi-chevron-compact-right mx-3 text-gray-500"></i>
            </div>
          );
        }
      })}
    </div>
  );
};

export default BreadCrumb;
