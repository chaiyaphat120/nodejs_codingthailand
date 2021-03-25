const express = require('express');
const router = express.Router();
const shopController = require('../controllers/Shop/ShopController')
/* GET users listing. */
router.get('/',shopController.index);
router.get('/menu',shopController.menu); //โชว์ shop + รายการเมนู
router.get('/:id',shopController.getShopWithMenu);  //โชว์รายการเมนู จาก id shop
router.post('/',shopController.insert);  

module.exports = router;
