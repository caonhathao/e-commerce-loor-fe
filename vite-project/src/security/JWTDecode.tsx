import {jwtDecode} from "jwt-decode";

const JWTDecode = (token: string | null) => {
    if (!token) throw new Error("Invalid token");
    return jwtDecode(token)
};

export default JWTDecode;