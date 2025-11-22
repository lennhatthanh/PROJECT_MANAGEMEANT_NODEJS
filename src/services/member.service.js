import Member from "../models/member.model.js";

export const validateMemberNotExists = async (memberId) => {
    try {
        const member = await Member.findById(memberId);
        if (!member) {
           throw { status: 404, message: "MEMBER_NOT_FOUND" };
        }
        return member;
    } catch (error) {
        console.error("Error validating member:", error);
        throw error;
    }
};
