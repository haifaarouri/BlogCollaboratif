import Role from "../models/Role.js";

export const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find();
    return res.status(200).send(roles);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const createRole = async (req, res, next) => {
  try {
    if (req.body.name && req.body.name !== "") {
      const newRole = new Role(req.body);
      await newRole.save();
      return res.json({ message: "Role Created !" });
    } else {
      return res.status(400).json({ message: "Bad request !" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const role = await Role.findById({ _id: req.params.id });

    if (role) {
      const newData = await Role.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json({ message: "Role updated successfully !" });
    } else {
      return res.status(404).json({ message: "Role not found !" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const role = await Role.findById({ _id: req.params.id });

    if (role) {
      const newData = await Role.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: "Role deleted successfully !" });
    } else {
      return res.status(404).json({ message: "Role not found !" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error !" });
  }
};
