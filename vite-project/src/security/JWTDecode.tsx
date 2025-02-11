const JWTDecode = (token: string | null) => {
    if (token === null || token === undefined) {
        throw new Error('Invalid token');
    } else {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error("Invalid JWT token format");
        }
        return JSON.parse(atob(parts[1]));
    }
}

export default JWTDecode;