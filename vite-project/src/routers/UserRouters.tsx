import { Route } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter.tsx";
import { UserLayout } from "../layout/UserLayout.tsx";
import UserCart from "../pages/guest/customer/UserCart.tsx";
import UserOrders from "../pages/guest/customer/UserOrders.tsx";
import UserNotify from "../pages/guest/customer/UserNotify.tsx";
import UserProfile from "../pages/guest/customer/UserProfile.tsx";

const UserRouters = () => {
  return (
    <>
      <Route
        path={"/user"}
        element={<ProtectedRouter requiredRoles={["ROLE_USER"]} />}
      >
        <Route element={<UserLayout />}>
          <Route index element={<UserProfile />} />
          <Route path={"show-cart"} element={<UserCart />} />
          <Route path={"show-orders"} element={<UserOrders />} />
          <Route path={"show-orders/:order_id"} element={<UserOrders />} />
          <Route path={"show-notifications"} element={<UserNotify />} />
        </Route>
      </Route>
    </>
  );
};
export default UserRouters;
