import {jwtDecode} from "jwt-decode";

const JWTDecode = (token: string | null) => {
    if (!token) return null;
    return jwtDecode(token)
};

export default JWTDecode;