const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/user.controllers')

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser)

module.exports = router;

