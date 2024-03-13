const express = require("express");

const router = express.Router();

const { getAllUsers, getAllContacts, deleteUserId, getSingleUserData, UpdateUserId, deleteContactById } = require("../Controllers/admin-controllers");

const authMiddleware = require("../Middlewares/auth-middleware");
const adminMiddleware = require("../Middlewares/admin-middleware");

router.route("/users").get(authMiddleware,adminMiddleware,getAllUsers);
router.route("/users/:id").get(authMiddleware,adminMiddleware,getSingleUserData);
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,UpdateUserId);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,deleteUserId);
router.route("/contacts").get(authMiddleware,adminMiddleware,getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware,adminMiddleware,deleteContactById)

module.exports = router;