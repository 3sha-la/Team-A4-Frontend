import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const getUserProfile = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (req.body.email && req.body.email.toLowerCase().trim() !== user.email) {
      const emailExists = await User.findOne({
        email: req.body.email.toLowerCase().trim(),
        _id: { $ne: user._id },
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email is already in use',
        });
      }

      user.email = req.body.email.toLowerCase().trim();
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email not found',
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    const resetToken = jwt.sign(
      { id: user._id, purpose: 'password-reset' },
      process.env.JWT_SECRET,
      { expiresIn: '15m' },
    );

    res.json({
      success: true,
      message: 'Reset token generated',
      resetToken,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { resetToken, newPassword } = req.body;

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

    if (decoded.purpose !== 'password-reset') {
      return res.status(400).json({
        success: false,
        message: 'Invalid reset token',
      });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reset token',
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    next(error);
  }
};
