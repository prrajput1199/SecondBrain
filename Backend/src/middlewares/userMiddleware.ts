import { Express,NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

function UserMiddleware(req: Request, res: Response, next: NextFunction) {

    const userToken = req.headers.token;
    if (!userToken) return res.status(401).json({ message: "No token provided" });

    try {
        const decodedToken = jwt.verify(userToken as string, process.env.JWT_USER_SECRET as string) as JwtPayload;

        if (decodedToken && typeof decodedToken !== 'string') {
            req.userID = decodedToken.token;
            next();
        } else {
            res.status(401).json({ message: "Invalid token structure" });
            return;
        }
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
}

export default UserMiddleware;