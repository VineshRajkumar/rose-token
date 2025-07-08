
import { Request, Response } from "express";
import { decodedId } from "../services/user.services";
import prisma from "../services/prisma";


export const me = async (req: Request, res: Response) => {

    try {
        const { token } = req.cookies;
        if (!token) {
             res.status(401).json({ message: "No token provided" });
        }

        const id = decodedId(token);

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
            }
        });

        if (!user) {
             res.status(404).json({ message: "User not found" });
        }


         res.status(200).json({ user })
    } catch (error) {
        console.error("Error in /me:", error);
         res.status(500).json({ message: error });
    }


};