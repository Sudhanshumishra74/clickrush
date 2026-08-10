import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/apiResponse.js";


const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge:24 * 60 * 60 * 1000,
  path: "/api/v1/auth",
};

const accessCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 15 * 60 * 1000,
  path: "/",
};
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await authService.register({
    name,
    email,
    password,
  });

  return ApiResponse.created(
    res,
    "User registered successfully",
    user
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { user, refreshToken, accessToken } = await authService.login({
    email,
    password,
  });
 res.cookie("accessToken", accessToken, accessCookieOptions);

  res.cookie( "refreshToken", refreshToken, refreshCookieOptions);


  return ApiResponse.ok(
    res,
    "User logged in successfully",
    { user} 
  );
};

const logout = async (req, res) => {

  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await authService.logout(refreshToken);
  }

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/api/v1/auth",
  });

  return ApiResponse.ok(res, "User logged out successfully");
};

const refresh = async (req, res) => {
  //console.log("Cookies:", req.cookies);
  const refreshToken = req.cookies.refreshToken;

  const {
    accessToken,
    refreshToken: newRefreshToken,
  } = await authService.refresh(refreshToken);

  res.cookie(
    "accessToken",
    accessToken,
    accessCookieOptions
  );

  res.cookie(
    "refreshToken",
    newRefreshToken,
    refreshCookieOptions
  );

  return ApiResponse.ok(
    res,
    "Token refreshed successfully"
  );
};

const me = async (req, res) => {
  return ApiResponse.ok(
    res,
    "User fetched successfully",
    req.user
  );
};

export {
  register, login, logout, refresh,me
};