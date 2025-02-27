import loadGif from "../../assets/gif/Double Ring@1x-1.0s-200px-200px.gif";

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999]">
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-300 opacity-55 z-[20]"></div>
            <div className="relative z-[999]">
                <img src={loadGif} alt="loading.gif" />
            </div>
        </div>
    );
};

export default Loading;
