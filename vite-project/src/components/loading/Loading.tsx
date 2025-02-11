import loadGif from '../../assets/gif/Double Ring@1x-1.0s-200px-200px.gif'

const Loading = () => {
    return (
        <div className={'w-screen h-screen'}>
            <div className={'w-full h-full flex items-center justify-center'}>
                <img src={loadGif} alt={'loading.gif'}/>
            </div>
        </div>
    )
}
export default Loading;