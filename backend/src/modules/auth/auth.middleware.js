import ApiError from "../../common/utils/apiError.js";
import { prisma } from "../../common/config/db.js";
import { verifyAccessToken } from "../../common/utils/jwt.js";

const authenticate = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw ApiError.unauthorized("Not authenticated");
  }

  let decoded;

  try {
    decoded = verifyAccessToken(token);
  } catch (error) {
    throw ApiError.unauthorized("Invalid or expired access token");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
  });

  if (!user) {
    throw ApiError.unauthorized("User not found");
  }

  const { passwordHash: _, ...safeUser } = user;

  req.user = safeUser;

  next();
};

export default authenticate;