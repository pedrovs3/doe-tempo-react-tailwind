import jwt_decode from 'jwt-decode'

export const decodeJwt = () => {
    const token = localStorage.getItem("token")
    const decoded = jwt_decode(token)
    return decoded
}

