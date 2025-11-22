import Project from "../models/project.model.js";
import { validateMemberNotExists } from "../services/member.service.js";
import { createProjectService, updateProjectService, validateProjectNotExists } from "../services/project.service.js";
import { success, error } from "../utils/response.js";
import { validationResult } from "express-validator";
export const createProject = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return error(res, "Validation failed", 400, errors.array());
        }
        const project = await createProjectService(req.body);
        success(res, "Project created successfully", project);
    } catch (err) {
        if (err && err.status && err.message) {
            return error(res, "Looi", err.status, err.message);
        }
        error(res, err.message);
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        success(res, "Projects retrieved successfully", projects);
    } catch (err) {
        error(res, err.message);
    }
};

export const getProjectById = async (req, res) => {
    try {
        await validateProjectNotExists(req.params.id);
        const project = await Project.findById(req.params.id);
        success(res, "Project retrieved successfully", project);
    } catch (error) {
        error(res, err.message);
    }
};

export const deleteProject = async (req, res) => {
    try {
        await validateProjectNotExists(req.params.id);
        const project = await Project.findByIdAndDelete(req.params.id);
        success(res, "Project deleted successfully", project);
    } catch (err) {
        error(res, err.message);
    }
};

export const updateProject = async (req, res) => {
    try {
        const result = await updateProjectService(req.params.id, req.body);
        success(res, "Project updated successfully", result);
    } catch (err) {
        error(res, err.message);
    }
};
