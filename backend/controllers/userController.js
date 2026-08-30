const mockUsers = [
  {
    id: 'usr_101',
    firstName: 'Thrishala',
    lastName: 'Weerasekara',
    email: 'thrisha@gmail.com',
    phone: '0772586942',
    address: {
      country: 'Sri Lanka',
      city: 'Colombo',
      postalCode: '00100',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getUsers = async (req, res) => {
  return res.status(200).json({
    success: true,
    count: mockUsers.length,
    users: mockUsers,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = mockUsers.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
};

const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const user = mockUsers.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    });
  }

  const { firstName, lastName, email, phone, address } = req.body;
  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.address = address || user.address;
  user.updatedAt = new Date().toISOString();

  return res.status(200).json({
    success: true,
    message: 'User profile updated successfully.',
    user,
  });
};

module.exports = { getUsers, getUserById, updateUserProfile };
