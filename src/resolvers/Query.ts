import { DbContext } from '../types';

export const Query = {
  allCvs: (_parent: unknown, _args: unknown, context: DbContext) => {
    return context.cvs;
  },

  getCv: (_parent: unknown, args: { id: number }, context: DbContext) => {
    return context.cvs.find((cv) => cv.id === args.id);
  },

  getCvSkills: (_parent: unknown, args: { id: number }, context: DbContext) => {
    const cvSkillLinks = context.cvSkills.filter(
      (link) => link.cvId === args.id
    );
    return cvSkillLinks.map((link) =>
      context.skills.find((skill) => skill.id === link.skillId)
    );
  },

  getCvOwner: (_parent: unknown, args: { id: number }, context: DbContext) => {
    const cv = context.cvs.find((cv) => cv.id === args.id);
    if (!cv) return null;
    return context.users.find((user) => user.id === cv.ownerId);
  },
};
