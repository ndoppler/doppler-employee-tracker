const router = require('express').Router();

// Import our modular routers for /department, /role, & /employee
const departmentRouter = require('./department.js');
const roleRouter = require('./role.js');
const employeeRouter = require('./employee.js');

router.use('/department', departmentRouter);
router.use('/role', roleRouter);
router.use('/employee', employeeRouter);

module.exports = router;