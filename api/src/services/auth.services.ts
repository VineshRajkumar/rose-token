import { hashedPassword, verifyPassword } from "../utils/hash";
import prisma from "./prisma";

interface SignupInput {
  name: string;
  email: string;
  username: string;
  password: string;
}


export const signup = async (data:SignupInput)=>{

    const {name,email,username,password}=data;
    
    const existingUser= await prisma.user.findFirst({
        where:{OR:[{email},{username}]},
    });

    if(existingUser){
        throw new Error("Email or username already in use");
    }

  
const hash = await hashedPassword(password);
const user = await prisma.user.create(
    {data:{
        username,
        email,
        name,
        password:hash,
    },
    select:{
        id:true,
        email:true,
        name:true,
        username:true
    }}
);

return user;
};

export const login = async ({email,password}:{email:string,password:string})=>{

    const user= await prisma.user.findUnique({where:{email}});

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await verifyPassword(user.password, password);

  if (!isValid) {
    throw new Error("Invalid password");
  }

  return user;

};
