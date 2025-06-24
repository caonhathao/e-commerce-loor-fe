import {Route} from "react-router-dom";
import VendorHome from "../pages/Brand/Vendor/VendorHome.tsx";
import VendorManager from "../pages/Brand/Vendor/VendorManager.tsx";
import NewProduct from "../components/vendor/Control/NewProduct.tsx";
import VendorVariant from "../pages/Brand/Product/VendorVariant.tsx";
import NewVariant from "../components/vendor/Control/NewVariant.tsx";
import UpdateProduct from "../components/vendor/Control/UpdateProduct.tsx";
import UpdateVariant from "../components/vendor/Control/UpdateVariant.tsx";
import VendorOrders from "../pages/Brand/Vendor/VendorOrders.tsx";
import VendorProfile from "../pages/Brand/Vendor/VendorProfile.tsx";
import ProtectedRouter from "./ProtectedRouter.tsx";
import {ProductProvider} from "../context/ProductContext.tsx";
import VendorLayout from "../layout/VendorLayout.tsx";

const VendorRouters = () => {
    return (
        <>
            <Route
                element={
                    <ProtectedRouter
                        requiredRoles={['ROLE_VENDOR']}
                    />
                }
            >
                <Route element={<ProductProvider>
                    <VendorLayout/>
                </ProductProvider>}>

                    <Route index element={<VendorHome/>}/>
                    <Route path="manage" element={<VendorManager/>}/>
                    <Route path="manager/create" element={<NewProduct/>}/>
                    <Route path="manager/show-variant/:id" element={<VendorVariant/>}/>
                    <Route path="manager/show-variant/create-new-variant/:id" element={<NewVariant/>}/>
                    <Route path="manager/show-variant/update-main-description/:id"
                           element={<UpdateProduct/>}/>
                    <Route path="manager/show-variant/update-variant-description/:id"
                           element={<UpdateVariant/>}/>
                    <Route path="orders" element={<VendorOrders/>}/>
                    <Route path="support" element={<div>Support Coming Soon</div>}/>
                    <Route path="shop-info" element={<VendorProfile/>}/>
                </Route>
            </Route>
        </>
    )
}
export default VendorRouters