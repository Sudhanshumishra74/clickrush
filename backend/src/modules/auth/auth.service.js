import { prisma } from "../../common/config/db.js";
import ApiError from "../../common/utils/apiError.js";
import bcrypt from "bcrypt";
import  {generateKey,generateAccessToken,verifyAccessToken, generateRefreshToken, verifyRefreshToken } from "../../common/utils/jwt.js"

const  register = async ({name,email,password}) => {
    const user =  await prisma.user.findUnique({
        where: {
            email: email 
        }
    }) 

    if(user) throw ApiError.conflict()

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
             passwordHash,
            }
        })
        
const { passwordHash: _, ...safeUser } = newUser;

return safeUser;
}


const login =  async ({email,password}) =>{
    const user =  await prisma.user.findUnique({
        where: {
            email:email
        }
    })

    if(!user) throw ApiError.unauthorized("Invalid email or password")

      const isPassword =  await bcrypt.compare(
            password,
            user.passwordHash
        )
   if (!isPassword) throw ApiError.unauthorized("Invalid email or password");

  const accessToken = generateAccessToken({
    userId: user.id,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
  });

  // Save refresh token in database
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  const { passwordHash: _, ...safeUser } = user;

  return {
    accessToken,
    refreshToken,
    user: safeUser,
  };
};

const logout = async (refreshToken) => {
  await prisma.refreshToken.deleteMany({
    where: {
      token: refreshToken,
    },
  });
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.unauthorized("Refresh token required");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const storedToken = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });

  if (!storedToken) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  if (storedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({
      where: {
        id: storedToken.id,
      },
    });

    throw ApiError.unauthorized("Refresh token expired");
  }

  if (storedToken.userId !== decoded.userId) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const newAccessToken = generateAccessToken({
    userId: decoded.userId,
  });

  const newRefreshToken = generateRefreshToken({
    userId: decoded.userId,
  });

  await prisma.$transaction([
    prisma.refreshToken.delete({
      where: {
        id: storedToken.id,
      },
    }),

    prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: decoded.userId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};



export  {
    register,login , logout, refresh
}