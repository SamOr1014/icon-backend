import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function initUser () {
    const admin = await prisma.user.createMany({
        data: [
            {
                username: "admin",
                password: "admin",
                email: "admin@xyz.com",
            },
            {
                username: "user",
                password: "user",
                email: "user@xyz.com"
            }
        ]
    })
    console.log("done seed",{admin})
}

initUser().then(async () => {
    await prisma.$disconnect()
}).catch(async (error) => {
    console.log(error)
    await prisma.$disconnect()
    process.exit(1)
})