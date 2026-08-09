import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/apiResponse.js";

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

export {
  register,
};