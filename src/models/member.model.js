import mongoose from "mongoose";
const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
    },
    { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);
export default Member;
