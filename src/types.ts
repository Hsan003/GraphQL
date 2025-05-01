export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Skill {
  id: string;
  designation: string;
}

export interface Cv {
  id: string;
  name: string;
  age: number;
  job: string;
  ownerId: string;
}

export interface CvSkill {
  id: string;
  cvId: string;
  skillId: string;
}

export interface DbContext {
  users: User[];
  cvs: Cv[];
  skills: Skill[];
  cvSkills: CvSkill[];
}
