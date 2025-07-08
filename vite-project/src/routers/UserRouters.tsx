import {Route} from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter.tsx";
import {UserLayout} from "../layout/UserLayout.tsx";
import UserCart from "../pages/Customer/user/UserCart.tsx";

const UserRouters = () => {
    return (
        <>
            <Route path={'/user'} element={
                <ProtectedRouter requiredRoles={['ROLE_USER']}/>
            }>
                <Route element={<UserLayout/>}>
                    <Route index element={<div>Home</div>}/>
                    <Route path={'show-cart'} element={<UserCart/>}/>
                </Route>
            </Route>
        </>
    )
}
export default UserRouters