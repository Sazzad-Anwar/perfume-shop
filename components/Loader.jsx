import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loader = ({ fullScreen, loadingTitle }) => {
  if (fullScreen) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <Spin indicator={antIcon} />
        <h1 className="animate-pulse text-xl">
          {loadingTitle ? loadingTitle : "Loading..."}{" "}
        </h1>
      </div>
    );
  } else {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Spin indicator={antIcon} />
        <h1 className="animate-pulse text-xl">
          {loadingTitle ? loadingTitle : "Loading..."}
        </h1>
      </div>
    );
  }
};

export default Loader;
