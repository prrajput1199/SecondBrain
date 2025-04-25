import { Request, Router } from "express";
import { contentModel, linkModel, tagModel, userModel } from "../db";
import { z } from "zod";
import bcrypt from "bcrypt";
const userRouter = Router();
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserMiddleware from "../middlewares/userMiddleware";
import mongoose from "mongoose";
import { random } from "../uttils";
dotenv.config();

userRouter.post("/signup", async function (req, res) {
    const { userName, userEmail, userPassword } = req.body;

    const userSchema = z.object({
        userName: z.string().min(1, { message: "Please Enter your username" }).max(20, { message: "Username must not exceed 20 characters" }),
        userEmail: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Invalid email" }),
        userPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(20, { message: "Password must not exceed 20 characters" }).regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[\W_]/, "Password must contain at least one special character"),
    })

    const { success, error } = userSchema.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: error.issues[0].message
        })

        return;
    }

    const hashedPassword = await bcrypt.hash(userPassword, 8);

    try {
        await userModel.create({
            email: userEmail,
            password: hashedPassword,
            Name: userName
        })

        const findUser = await userModel.findOne({
            email: userEmail
        })

        const Token = jwt.sign({
            token: findUser?._id
        }, process.env.JWT_USER_SECRET as string,{
            expiresIn: "7d",
          })

        res.json({
            message: "successfully signed up",
            token: Token
        })

    } catch (error) {
        res.json({
            message: error
        })
    }
})


// @ts-ignore
userRouter.post("/signin", async function (req, res) {
    const { userEmail, userPassword } = req.body;

    const findUser = await userModel.findOne({
        email: userEmail
    })

    if (!findUser) {
        res.status(411).json({
            message: "Enter a valid email address"
        })
        return;
    }

    const { password } = findUser;


    const hashedPassword = await bcrypt.compare(userPassword, password as string);

    if (!hashedPassword) {
        res.status(411).json({
            message: "Incorrect password. Please try again"
        })
        return;
    }

    if (hashedPassword) {
        const Token = jwt.sign({
            token: findUser._id
        }, process.env.JWT_USER_SECRET as string,{
            expiresIn: "7d",
          })

        res.json({
            message: "successfully signedin",
            token: Token
        })
    }
})

// @ts-ignore
userRouter.post("/content", UserMiddleware, async function (req, res) {
    const { type, link, title, tags, notes } = req.body;

    const UserID = req.userID;

    try {
        await contentModel.create({
            type: type,
            link: link,
            title: title,
            tags: tags,
            notes: notes,
            userId: UserID,
        })


        res.status(200).json({ message: "Content created successfully" });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// @ts-ignore
userRouter.get("/content", UserMiddleware, async function (req, res) {
    const userID = req.userID;

    const userContent = await contentModel.find({
        userId: userID
    }).populate("userId", "Name")

    res.json({
        content: userContent
    })
});

// @ts-ignore
userRouter.delete("/content", UserMiddleware, async function (req, res) {
    const { contentID } = req.body;
    const userID = req.userID;
    try {
        const user = await contentModel.deleteMany({
            _id: new mongoose.Types.ObjectId(contentID),
            userId: userID,
        })

        res.json({
            message: "Your content has been deleted",
            user: user
        })

    } catch (error) {
        res.json({
            message: error,

        })
    }
});

// @ts-ignore
userRouter.post("/brain/share", UserMiddleware, async function (req, res) {

    const share = req.body.Share;
    const userId = req.userID;
    const Hash = random(8);

    if (share) {
        const existingLink = await linkModel.findOne({
            userId: userId
        })

        if (existingLink) {
            res.json({
                message: "Shareable link already exist",
                Link: existingLink.Hash
            });

            return;
        }

        await linkModel.create({
            userId: userId,
            Hash: Hash
        })
    }
    else {
        await linkModel.deleteOne({
            userId: userId,
        })
    }

    res.json({
        message: "Sharable link is created",
        Link: Hash
    })
})

userRouter.get("/brain/share/:shareId", async function (req, res) {
    const shareLink = req.params.shareId;
    const FindUser = await linkModel.findOne({
        Hash: shareLink.toString()
    });

    const User = await userModel.findOne({
        _id: FindUser?.userId
    })

    const userContent = await contentModel.find({
        userId: FindUser?.userId
    })

    res.json({
        Name: User?.Name,
        Content: userContent
    })
});

// @ts-ignore
userRouter.post("/check-email", async function (req, res) {
    const { email } = req.body;
    try {
        const finduser = await userModel.findOne({ email });
        if (!finduser)
            return res.status(404).json({ message: "Enter correct email address" });

        res.status(200).json({ message: "Email exists. You can reset password." });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
})

// @ts-ignore
userRouter.put("/reset-password", async function (req, res) {
    const { email, newPassword } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Email not found in database." });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
})

export default userRouter; 