export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Skill {
  id: number;
  designation: string;
}

export interface Cv {
  id: number;
  name: string;
  age: number;
  job: string;
  ownerId: number;
}

export interface CvSkill {
  id: number;
  cvId: number;
  skillId: number;
}

export interface DbContext {
  users: User[];
  cvs: Cv[];
  skills: Skill[];
  cvSkills: CvSkill[];
}
