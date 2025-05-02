import { pubsub } from "./pubsub";

export const Mutation = {
  createCv: async (
    _parent: any,
    { data }: any,
    { prisma }: any
  ): Promise<any> => {
    const { name, age, job, ownerId, skillIds } = data;
    const user = await prisma.user.findUnique({ where: { id: ownerId } });
    if (!user) throw new Error(`User with id=${ownerId} not found`);

    const skills = await prisma.skill.findMany({
      where: { id: { in: skillIds } },
    });
    if (skills.length !== skillIds.length)
      throw new Error(`One or more Skill IDs are invalid`);

    const cv = await prisma.cv.create({
      data: {
        name,
        age,
        job,
        owner: { connect: { id: ownerId } },
        skills: { connect: skillIds.map((id: number) => ({ id })) },
      },
      include: { owner: true, skills: true },
    });

    await pubsub.publish("CV_CREATED", { cvCreated: cv });
    return cv;
  },

  updateCv: async (
    _parent: any,
    { data }: any,
    { prisma }: any
  ): Promise<any> => {
    const { id, name, age, job, ownerId, skillIds } = data;
    const existing = await prisma.cv.findUnique({ where: { id } });
    if (!existing) throw new Error(`Cv with id=${id} not found`);

    if (ownerId !== undefined) {
      const user = await prisma.user.findUnique({ where: { id: ownerId } });
      if (!user) throw new Error(`User with id=${ownerId} not found`);
    }

    if (skillIds !== undefined) {
      const skills = await prisma.skill.findMany({
        where: { id: { in: skillIds } },
      });
      if (skills.length !== skillIds.length)
        throw new Error(`One or more Skill IDs are invalid`);
    }

    const cv = await prisma.cv.update({
      where: { id },
      data: {
        name: name ?? undefined,
        age: age ?? undefined,
        job: job ?? undefined,
        ...(ownerId !== undefined
          ? { owner: { connect: { id: ownerId } } }
          : {}),
        ...(skillIds !== undefined
          ? { skills: { set: skillIds.map((sid: number) => ({ id: sid })) } }
          : {}),
      },
      include: { owner: true, skills: true },
    });

    await pubsub.publish("CV_UPDATED", { cvUpdated: cv });
    return cv;
  },

  deleteCv: async (
    _parent: any,
    { id }: any,
    { prisma }: any
  ): Promise<any> => {
    const existing = await prisma.cv.findUnique({ where: { id } });
    if (!existing) throw new Error(`Cv with id=${id} not found`);

    const cv = await prisma.cv.delete({
      where: { id },
      include: { owner: true, skills: true },
    });

    await pubsub.publish("CV_DELETED", { cvDeleted: cv });
    return cv;
  },
};

export { pubsub };
