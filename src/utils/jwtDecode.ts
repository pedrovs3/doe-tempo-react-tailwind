import jwt_decode from 'jwt-decode'

export const decodeJwt = () => {
    const token = localStorage.getItem("token")
    return jwt_decode(token)
}

