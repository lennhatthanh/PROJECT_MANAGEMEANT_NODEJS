import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
            require: true,
        },
        member: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Member",
            default: [],
        },
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
