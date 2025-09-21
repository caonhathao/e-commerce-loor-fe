import {Route} from "react-router-dom";
import VendorHome from "../pages/vendor/manage/VendorHome.tsx";
import VendorManage from "../pages/vendor/manage/VendorManage.tsx";
import NewProduct from "../components/vendor/Control/NewProduct.tsx";
import VendorVariant from "../pages/vendor/product/VendorVariant.tsx";
import NewVariant from "../components/vendor/Control/NewVariant.tsx";
import UpdateProduct from "../components/vendor/Control/UpdateProduct.tsx";
import UpdateVariant from "../components/vendor/Control/UpdateVariant.tsx";
import VendorOrders from "../pages/vendor/manage/VendorOrders.tsx";
import VendorProfile from "../pages/vendor/manage/VendorProfile.tsx";
import ProtectedRouter from "./ProtectedRouter.tsx";
import {ProductProvider} from "../context/ProductContext.tsx";
import VendorLayout from "../layout/VendorLayout.tsx";
import VendorOrderDetail from "../pages/vendor/manage/VendorOrderDetail.tsx";
import NotFound from "../pages/global/NotFound.tsx";
import {VendorProvider} from "../context/VendorContext.tsx";

const VendorRouters = () => {
    return (
        <>
            <Route path={'/vendor'}
                   element={
                       <ProtectedRouter
                           requiredRoles={['ROLE_VENDOR']}
                       />
                   }
            >
                <Route element={
                    <VendorProvider>
                        <ProductProvider>
                            <VendorLayout/>
                        </ProductProvider>
                    </VendorProvider>}>

                    <Route index element={<VendorHome/>}/>
                    <Route path="manage" element={<VendorManage/>}/>
                    <Route path="manage/create" element={<NewProduct/>}/>
                    <Route path="manage/show-variant/:id" element={<VendorVariant/>}/>
                    <Route path="manage/show-variant/create-new-variant/:id" element={<NewVariant/>}/>
                    <Route path="manage/show-variant/update-main-description/:id"
                           element={<UpdateProduct/>}/>
                    <Route path="manage/show-variant/update-variant-description/:id"
                           element={<UpdateVariant/>}/>
                    <Route path="orders" element={<VendorOrders/>}/>
                    <Route path="orders/order-detail/:id" element={<VendorOrderDetail/>}/>
                    <Route path="support" element={<div>Support Coming Soon</div>}/>
                    <Route path="shop-info" element={<VendorProfile/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Route>
            </Route>
        </>
    )
}
export default VendorRouters