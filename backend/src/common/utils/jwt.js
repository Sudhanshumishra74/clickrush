import crypto from "crypto"
import jwt from "jsonwebtoken"

const generateKey = () => {
  return crypto.randomBytes(32).toString("hex")
}

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { 
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m" })
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { 
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "1d" })
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

export {
    generateKey,
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken
}