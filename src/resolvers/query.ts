export const Query: any = {
  allCvs: (_parent: any, _args: any, { prisma }: any): Promise<any[]> => {
    return prisma.cv.findMany();
  },

  getCv: (_parent: any, { id }: any, { prisma }: any): Promise<any> => {
    return prisma.cv.findUnique({ where: { id } });
  },

  getCvSkills: (_parent: any, { id }: any, { prisma }: any): Promise<any[]> => {
    return prisma.cv.findUnique({ where: { id } }).skills();
  },

  getCvOwner: (_parent: any, { id }: any, { prisma }: any): Promise<any> => {
    return prisma.cv.findUnique({ where: { id } }).owner();
  },
};
