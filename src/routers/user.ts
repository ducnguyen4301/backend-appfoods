const router = require('express').Router();

const {createUser,signinUser} = require('../controllers/user');
const {userValidator,validate} = require('../middleware/userValidator');
router.post('/create',userValidator,validate, createUser);
router.post('./signin',signinUser);
module.exports = router;