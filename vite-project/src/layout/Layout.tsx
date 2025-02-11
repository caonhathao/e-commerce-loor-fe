import Header from "../components/Header.tsx";
import '../assets/css/components/Layout.css'

const Layout = ({child}) => {
    return (
        <div className={'layout-container'}>
            <div className={'layout-content'}>
                <div className={'layout-header'}>
                    <Header />
                </div>
                <div className={'layout-body'}>
                    {child}
                </div>
                <div className={'layout-footer'}></div>
            </div>
        </div>
    )
}
export default Layout