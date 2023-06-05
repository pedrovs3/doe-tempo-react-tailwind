import jwt_decode from 'jwt-decode'

export const decodeJwt = () => {
    const token = localStorage.getItem("token").split(' ')[1]
    return jwt_decode(token)
}

