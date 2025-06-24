import _404 from '../../assets/img/404.png'

const NotFound = () => {
    return (
        <div className={'w-full h-fit flex flex-col justify-center items-center'}>
            <img src={_404} alt={'404'}/>
            <div className={'text-center w-[80%]'}>
                <p>Rất tiếc, trang mà bạn đang cố gắng truy cập hiện không còn nữa, có thể là do <strong>đã bị
                    gỡ</strong> hoặc <strong>sai đường dẫn.</strong></p>
            </div>
        </div>
    )
}
export default NotFound