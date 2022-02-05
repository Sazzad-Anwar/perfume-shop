import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loader = ({ fullScreen }) => {

    if (fullScreen) {
        return (
            <div className='w-screen h-screen flex flex-col justify-center items-center'>
                <Spin indicator={antIcon} />
                <h1 className="text-xl animate-pulse">Loading...</h1>
            </div>
        )
    } else {
        return (
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <Spin indicator={antIcon} />
                <h1 className="text-xl animate-pulse">Loading...</h1>
            </div>
        )
    }

}

export default Loader
