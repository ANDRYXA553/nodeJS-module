const router = require('express').Router();

const { userControllers } = require('../controllers');
const { userMiddlewares } = require('../middlewares');

router.get('/', userControllers.getAllUsers);

router.get('/:id', userMiddlewares.isUserExist, userControllers.getUserById);

router.post('/', userMiddlewares.isDataCorrect, userMiddlewares.isUserAlreadyExist, userControllers.createUser);

router.delete('/:id', userMiddlewares.isUserExist, userControllers.deleteUser);

router.patch('/:id', userMiddlewares.isUserExist, userMiddlewares.isDataCorrect, userControllers.updateUser);

module.exports = router;

