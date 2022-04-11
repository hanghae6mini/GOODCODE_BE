const router = require("express").Router();
const userController = require("../controller/user");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/signup", authMiddleware, userController.signUp);

router.post("/login", authMiddleware, userController.login);

router.put('/', authMiddleware, userController.modifyProfile);

router.get('/', authMiddleware, userController.getUser);

router.get("/auth", authMiddleware, userController.authUser);

module.exports = router;