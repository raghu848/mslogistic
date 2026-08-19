const User = require('../models/User');

const getAdmins = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password -__v').lean();
    res.json({
      success: true,
      users: users.map((u) => ({ ...u, id: u._id })),
    });
  } catch (error) {
    next(error);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists' });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role === 'superadmin' ? 'superadmin' : 'admin',
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    const { name, role, isActive, password } = req.body;
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'Admin account not found' });
    }

    if (targetUser._id.toString() === req.user._id.toString()) {
      if (isActive === false) {
        return res.status(400).json({ success: false, message: 'Cannot deactivate your own account' });
      }
      if (role && role !== 'superadmin') {
        return res.status(400).json({ success: false, message: 'Cannot remove your own superadmin role' });
      }
    }

    if (name) targetUser.name = name.trim();
    if (role && ['admin', 'superadmin'].includes(role)) targetUser.role = role;
    if (typeof isActive === 'boolean') targetUser.isActive = isActive;
    if (password && password.length >= 6) targetUser.password = password;

    await targetUser.save();

    res.json({
      success: true,
      message: 'Admin account updated successfully',
      user: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        isActive: targetUser.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Admin account not found' });
    }

    res.json({ success: true, message: 'Admin account deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdmins, createAdmin, updateAdmin, deleteAdmin };
