const { User } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] }
  });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] }
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // 1) Filter out unwanted fields that shouldn't be updated
  const filteredBody = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    emailNotifications: req.body.emailNotifications,
    smsNotifications: req.body.smsNotifications,
    whatsappNotifications: req.body.whatsappNotifications
  };

  // 2) Update user document
  const [updated] = await User.update(filteredBody, {
    where: { id: req.params.id },
    individualHooks: true
  });

  if (!updated) {
    return next(new AppError('No user found with that ID', 404));
  }

  const updatedUser = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] }
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deleted = await User.destroy({
    where: { id: req.params.id }
  });

  if (!deleted) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] }
  });

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    emailNotifications: req.body.emailNotifications,
    smsNotifications: req.body.smsNotifications,
    whatsappNotifications: req.body.whatsappNotifications
  };

  // 3) Update user document
  const [updated] = await User.update(filteredBody, {
    where: { id: req.user.id },
    individualHooks: true
  });

  const updatedUser = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] }
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.destroy({
    where: { id: req.user.id }
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
});