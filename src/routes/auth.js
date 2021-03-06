const { Router } = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

router.post(
  '/register',
  authMiddleware.verifyAdmin,
  authController.userRegister
)
router.post('/login', authController.userLogin)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)

module.exports = router
