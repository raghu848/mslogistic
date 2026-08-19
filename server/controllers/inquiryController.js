const ContactInquiry = require('../models/ContactInquiry');

const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalInquiries,
      newInquiries,
      contactedInquiries,
      inProgressInquiries,
      resolvedInquiries,
      recentInquiries,
    ] = await Promise.all([
      ContactInquiry.countDocuments(),
      ContactInquiry.countDocuments({ status: 'new' }),
      ContactInquiry.countDocuments({ status: 'contacted' }),
      ContactInquiry.countDocuments({ status: 'in-progress' }),
      ContactInquiry.countDocuments({ status: 'resolved' }),
      ContactInquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    res.json({
      success: true,
      stats: {
        total: totalInquiries,
        new: newInquiries,
        contacted: contactedInquiries,
        inProgress: inProgressInquiries,
        resolved: resolvedInquiries,
      },
      recentInquiries: recentInquiries.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        mobile: item.mobile,
        organizationName: item.organizationName,
        status: item.status,
        createdAt: item.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};

const getInquiries = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const search = req.query.search ? req.query.search.trim() : '';
    const status = req.query.status ? req.query.status.trim() : 'all';
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { mobile: searchRegex },
        { organizationName: searchRegex },
        { message: searchRegex },
      ];
    }

    const skip = (page - 1) * limit;

    const [totalCount, inquiries] = await Promise.all([
      ContactInquiry.countDocuments(filter),
      ContactInquiry.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const totalPages = Math.ceil(totalCount / limit) || 1;

    res.json({
      success: true,
      inquiries: inquiries.map((i) => ({
        id: i._id,
        name: i.name,
        email: i.email,
        mobile: i.mobile,
        organizationName: i.organizationName || '',
        address: i.address || '',
        message: i.message,
        status: i.status,
        createdAt: i.createdAt,
        updatedAt: i.updatedAt,
      })),
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await ContactInquiry.findById(req.params.id).lean();
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, inquiry: { ...inquiry, id: inquiry._id } });
  } catch (error) {
    next(error);
  }
};

const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await ContactInquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({
      success: true,
      message: `Status updated to ${status}`,
      inquiry: { id: inquiry._id, status: inquiry.status, updatedAt: inquiry.updatedAt },
    });
  } catch (error) {
    next(error);
  }
};

const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await ContactInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
};
