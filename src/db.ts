import { Cv, Skill, User, Role, CvSkill, DbContext } from './types';

export const users: User[] = [
  { id: 1, name: 'Amir', email: 'amir@insat.tn', role: Role.ADMIN },
  { id: 2, name: 'Hsan', email: 'hsan@insat.tn', role: Role.ADMIN },
  { id: 3, name: 'Mohamed', email: 'mohamed@insat.tn', role: Role.USER },
  { id: 4, name: 'Moncef', email: 'moncef@insat.tn', role: Role.USER },
];

export const skills: Skill[] = [
  { id: 1, designation: 'Belote' },
  { id: 2, designation: 'CP' },
  { id: 3, designation: 'C++' },
  { id: 4, designation: 'Java' },
  { id: 5, designation: 'Music' },
  { id: 6, designation: 'React' },
];

export const cvs: Cv[] = [
  { id: 1, name: 'Amir CV', age: 21, job: 'Engineer', ownerId: 1 },
  { id: 2, name: 'Hsan CV', age: 21, job: 'Engineer', ownerId: 2 },
  { id: 3, name: 'Mohamed CV', age: 21, job: 'Engineer', ownerId: 3 },
  { id: 4, name: 'Moncef CV', age: 21, job: 'Engineer', ownerId: 4 },
];

export const cvSkills: CvSkill[] = [
  { id: 1, cvId: 1, skillId: 1 },
  { id: 2, cvId: 1, skillId: 2 },
  { id: 3, cvId: 2, skillId: 3 },
  { id: 4, cvId: 2, skillId: 4 },
  { id: 5, cvId: 3, skillId: 5 },
  { id: 6, cvId: 4, skillId: 1 },
  { id: 7, cvId: 4, skillId: 2 },
];

export const dbContext: DbContext = { users, cvs, skills, cvSkills };
