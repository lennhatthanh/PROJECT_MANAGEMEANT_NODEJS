import Member from "../models/member.model.js";
import Project from "../models/project.model.js";
import { validateMemberNotExists } from "./member.service.js";
export const validateProjectNotExists = async (projectId) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            throw { status: 404, message: "PROJECT_NOT_FOUND" };
        }
        return project;
    } catch (error) {
        console.error("Error validating member:", error);
        throw error;
    }
};

export const validateOwnerNotExist = async (ownerId) => {
    try {
        const owner = await Member.findById(ownerId);
        if (!owner) {
            throw { status: 404, message: "OWNER_NOT_FOUND" };
        }
    } catch (error) {
        console.log("🚀 ~ validateOwnerNotExist ~ error:", error);
        throw error;
    }
};
export const validateMembersNotDuplicateAndMemberExits = async (projectData) => {
    try {
        const hasDuplicate = projectData.member.length !== new Set(projectData.member).size;
        if (hasDuplicate) {
            throw { status: 400, message: "MEMBER_DUPLICATED" };
        }
        for (const id of projectData.member) {
            await validateMemberNotExists(id);
        }
    } catch (error) {
        console.log("🚀 ~ validateMembersNotDuplicateAndMemberExits ~ error:", error);
        throw error;
    }
};
export const validateDescriptionLessThan500 = async (projectData) => {
    try {
        const hasDuplicate = projectData.member.length > 500;
        if (hasDuplicate) {
            throw { status: 400, message: "DESCIPTION_500" };
        }
    } catch (error) {
        console.log("🚀 ~ validateDescriptionLessThan500 ~ error:", error);
        throw error;
    }
};
export const createProjectService = async (projectData) => {
    try {
        await validateOwnerNotExist(projectData.owner);
        await validateMembersNotDuplicateAndMemberExits(projectData);
        await validateDescriptionLessThan500(projectData);
        const project = await Project.create(projectData);
        return project;
    } catch (error) {
        console.log("🚀 ~ createProject ~ error:", error);
        throw error;
    }
};

export const updateProjectService = async (id, projectData) => {
    try {
        await validateProjectNotExists(id);
        await validateOwnerNotExist(projectData.owner);
        await validateMembersNotDuplicateAndMemberExits(projectData);
        await validateDescriptionLessThan500(projectData);
        const project = await Project.findByIdAndUpdate(id, projectData, { new: true });
        return project;
    } catch (error) {
        console.log("🚀 ~ createProject ~ error:", error);
        throw error;
    }
};
