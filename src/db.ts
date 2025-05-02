import { Cv, Skill, User, Role, CvSkill, DbContext } from "./types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const dbContext = () => ({
  prisma,
});
