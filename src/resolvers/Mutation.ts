import { DbContext } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { pubSub } from '../pubSubInstance';


export const Mutation = {
    addCv: (
        _parent: unknown,
        args: { input: { name: string; age: number; job: string; ownerId: string; skillIds: string[] } },
        context: DbContext
    ) => {
        const { name, age, job, ownerId, skillIds } = args.input;

        // Vérifier existence de l'utilisateur
        const userExists = context.users.some((user) => user.id === ownerId);
        if (!userExists) throw new Error("User not found");

        // Vérifier que toutes les compétences existent
        for (const skillId of skillIds) {
            if (!context.skills.some((skill) => skill.id === skillId)) {
                throw new Error(`Skill with id ${skillId} not found`);
            }
        }

        const newCvId = uuidv4();
        const newCv = { id: newCvId, name, age, job, ownerId };
        context.cvs.push(newCv);

        // Lier les compétences
        skillIds.forEach((skillId, index) => {
            context.cvSkills.push({ id: uuidv4(), cvId: newCvId, skillId });
        });
        pubSub.publish('cvAdded', { cvAdded: newCv });
        return newCv;
    },

    updateCv: (
        _parent: unknown,
        args: { input: { id: string; name?: string; age?: number; job?: string; ownerId?: string; skillIds?: string[] } },
        context: DbContext
    ) => {
        const { id, name, age, job, ownerId, skillIds } = args.input;
        const cv = context.cvs.find((cv) => cv.id === id);
        if (!cv) throw new Error("CV not found");

        if (ownerId && !context.users.some((user) => user.id === ownerId)) {
            throw new Error("User not found");
        }

        if (skillIds) {
            for (const skillId of skillIds) {
                if (!context.skills.some((skill) => skill.id === skillId)) {
                    throw new Error(`Skill with id ${skillId} not found`);
                }
            }

            // Supprimer les anciennes compétences liées
            context.cvSkills = context.cvSkills.filter((link) => link.cvId !== id);

            // Ajouter les nouvelles compétences
            skillIds.forEach((skillId, index) => {
                context.cvSkills.push({ id: uuidv4(), cvId: id, skillId });
            });
        }

        // Mise à jour des champs
        if (name) cv.name = name;
        if (age !== undefined) cv.age = age;
        if (job) cv.job = job;
        if (ownerId) cv.ownerId = ownerId;
        pubSub.publish('cvUpdated', { cvUpdated: cv });
        return cv;
    },

    deleteCv: (_parent: unknown, args: { id: string }, context: DbContext) => {
        const index = context.cvs.findIndex((cv) => cv.id === args.id);
        if (index === -1) return false;

        const deletedId = args.id;
        // Supprimer le CV
        context.cvs.splice(index, 1);

        // Supprimer les liens skills
        context.cvSkills = context.cvSkills.filter((link) => link.cvId !== args.id);
        pubSub.publish('cvDeleted', { cvDeleted: deletedId });
        return true;
    },
};
