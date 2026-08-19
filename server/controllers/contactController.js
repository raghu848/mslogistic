const ContactInquiry = require('../models/ContactInquiry');

const submitContact = async (req, res, next) => {
  try {
    const { name, email, mobile, organizationName, address, message } = req.body;

    if (!name || !email || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, mobile, and message are required fields.',
      });
    }

    const inquiry = await ContactInquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      organizationName: organizationName ? organizationName.trim() : '',
      address: address ? address.trim() : '',
      message: message.trim(),
      status: 'new',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been submitted successfully.',
      data: {
        id: inquiry._id,
        createdAt: inquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact };
