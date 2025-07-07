import { Request, Response } from "express";
import * as authService from "../services/auth.services"
import { generateToken } from "../utils/generateToken";


export const signup = async (req: Request, res: Response) => {
    try {
        const user = await authService.signup(req.body);
        const token = generateToken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User SignUp successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
            },
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({
            message: "Something went wrong during signup",
        });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const user = await authService.login(req.body);
        const token = generateToken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "User login successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
            },
        });

    } catch (error) {
        console.error("login Error:", error);
        res.status(500).json({
            message: "Something went wrong during login",
        });
    }
};

export const logout = async (req: Request, res: Response) => {
 
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({ message: "User logged out successfully" });
 
};
