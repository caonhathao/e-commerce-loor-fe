import {Route} from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter.tsx";
import {UserLayout} from "../layout/UserLayout.tsx";
import UserCart from "../pages/Customer/user/UserCart.tsx";
import {UserProvider} from "../context/UserContext.tsx";
import UserReceipt from "../pages/Customer/user/UserReceipt.tsx";

const UserRouters = () => {
    return (
        <>
            <Route path={'/user'} element={
                <ProtectedRouter requiredRoles={['ROLE_USER']}/>
            }>
                <Route element={<UserProvider>
                    <UserLayout/>
                </UserProvider>}>
                    <Route index element={<div>Home</div>}/>
                    <Route path={'show-cart'} element={<UserCart/>}/>
                    <Route path={'show-receipts'} element={<UserReceipt/>}/>
                </Route>
            </Route>
        </>
    )
}
export default UserRouters