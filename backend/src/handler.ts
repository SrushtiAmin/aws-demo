import express from "express";
import serverless from "serverless-http";
import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import "dotenv/config";

const app = express();
app.use(express.json());

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeonHttp(connectionString, {});
const prisma = new PrismaClient({ adapter });

app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.post("/users", async (req, res) => {
    const { email, name } = req.body;
    try {
        const user = await prisma.user.create({
            data: { email, name },
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
    }
});

app.get("/", (req, res) => {
    res.json({ message: "Serverless Prisma 7 Demo is running!" });
});

export const handler = serverless(app);
