const Loader = () => {
    return (
        <div className='w-screen h-screen absolute inset-0 flex flex-col justify-center items-center z-30 backdrop-blur-md'>
            <div className="h-5 w-5 rounded-full ring-2 border-2 border-white bg-purple-800 ring-purple-800 animate-pulse" />
            <h1 className="text-xl animate-pulse text-purple-800">Loading...</h1>
        </div>
    )
}

export default Loader
