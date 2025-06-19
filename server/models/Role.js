import mongoose from "mongoose";

const RoleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Role", RoleSchema);
