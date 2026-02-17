import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getOrCreateUser(clerkUserId: string) {
  let user = await prisma.user.findUnique({
    where: { id: clerkUserId },
  });

  if (!user) {
    const clerkUser = await currentUser();
    user = await prisma.user.create({
      data: {
        id: clerkUserId,
        email: clerkUser?.emailAddresses[0]?.emailAddress || "",
      },
    });
  }

  return user;
}
