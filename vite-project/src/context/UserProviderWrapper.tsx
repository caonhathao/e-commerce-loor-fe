import {Outlet} from "react-router-dom";
import {UserProvider} from "../context/UserContext.tsx";

const UserProviderWrapper = () => {
    return (
        <UserProvider>
            <Outlet/>
        </UserProvider>
    );
};

export default UserProviderWrapper;
