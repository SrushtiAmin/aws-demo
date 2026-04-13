import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import "dotenv/config";

async function main() {
    const connectionString = process.env.DATABASE_URL!;
    console.log("Connecting to:", connectionString.split("@")[1]); // Mask password

    const adapter = new PrismaNeonHttp(connectionString, {});
    const prisma = new PrismaClient({ adapter });

    try {
        console.log("Fetching users...");
        const users = await prisma.user.findMany();
        console.log("Users found:", users);

        if (users.length === 0) {
            console.log("No users found. Creating a test user...");
            const newUser = await prisma.user.create({
                data: {
                    email: `test-${Date.now()}@example.com`,
                    name: "Test User",
                },
            });
            console.log("Created user:", newUser);
        }
    } catch (error) {
        console.error("Error connecting to database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
