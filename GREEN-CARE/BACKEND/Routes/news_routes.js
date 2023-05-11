const express = require("express");
const newsController = require("../Controllers/news_controller");

//const authController = require("../Controllers/auth_controller");
const router = express.Router();

router.get("/", newsController.getAllNews);
router.post("/add", newsController.addNews); //edited for image upload
router.put("/update/:id", newsController.updateNews);
router.get("/:id", newsController.getById);
router.delete("/:id", newsController.deleteNews);
router.get("/user/:id", newsController.getByUserId); // getting nes from the user

module.exports = router;
