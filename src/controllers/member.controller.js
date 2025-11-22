import Member from "../models/member.model.js";
import { validateMemberNotExists } from "../services/member.service.js";
import { success, error } from "../utils/response.js";
import { validationResult } from "express-validator";
export const createMember = async (req, res) => {
    try {
        const { name, email } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return error(res, "Validation failed", 400, errors.array());
        }
        const member = await Member.create({ name: name.trim(), email: email.trim() });
        success(res, "Member created successfully", member);
    } catch (err) {
        error(res, err.message);
    }
};

export const getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        success(res, "Members retrieved successfully", members);
    } catch (err) {
        error(res, err.message);
    }
};

export const getMemberById = async (req, res) => {
    try {
        await validateMemberNotExists(req.params.id);
        const member = await Member.findById(req.params.id);
        success(res, "Member retrieved successfully", member);
    } catch (err) {
        if (err && err.status && err.message) {
            return error(res, "Looi", err.status, err.message);
        }
        error(res, err.message);
    }
};

export const deleteMember = async (req, res) => {
    try {
        await validateMemberNotExists(req.params.id);
        const member = await Member.findByIdAndDelete(req.params.id);
        success(res, "Member deleted successfully", member);
    } catch (err) {
        if (err && err.status && err.message) {
            return error(res, "Looi", err.status, err.message);
        }
        error(res, err.message);
    }
};

export const updateMember = async (req, res) => {
    try {
        const { name, email } = req.body;
        await validateMemberNotExists(req.params.id);
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            { name: name.trim(), email: email.trim() },
            { new: true }
        );
        success(res, "Member updated successfully", member);
    } catch (err) {
        if (err && err.status && err.message) {
            return error(res, "Looi", err.status, err.message);
        }
        error(res, err.message);
    }
};
