import { prisma } from "../../common/config/db.js";
import ApiError from "../../common/utils/apiError.js";
import bcrypt from "bcrypt";

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



export  {
    register
}