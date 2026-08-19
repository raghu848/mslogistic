const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const {
  getDashboardStats,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} = require('../controllers/inquiryController');
const {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require('../controllers/adminController');

// All admin routes require authentication and at least admin role
router.use(authenticate);
router.use(authorize('admin', 'superadmin'));

// Dashboard stats
router.get('/dashboard', getDashboardStats);

// Inquiries CRUD
router.get('/inquiries', getInquiries);
router.get('/inquiries/:id', getInquiryById);
router.patch('/inquiries/:id', updateInquiryStatus);
router.delete('/inquiries/:id', deleteInquiry);

// Admin user management (superadmin only)
router.get('/users', authorize('superadmin'), getAdmins);
router.post('/users', authorize('superadmin'), createAdmin);
router.patch('/users/:id', authorize('superadmin'), updateAdmin);
router.delete('/users/:id', authorize('superadmin'), deleteAdmin);

module.exports = router;
