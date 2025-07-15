import {jwtDecode} from "jwt-decode";
import {jwtPayloadData} from "../utils/data-types.tsx";


const JWTDecode = (token: string | null): jwtPayloadData | null => {
    if (!token) return null;
    return jwtDecode<jwtPayloadData>(token)
};

export default JWTDecode;