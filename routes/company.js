const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyGetController')
/* GET users listing. */
router.get('/find1',companyController.find_v1);
router.get('/find2',companyController.find_v2 );
router.get('/find3',companyController.find_v3 );
router.get('/find4',companyController.find_v4 );
router.get('/findOne1',companyController.findOne_v1 );
router.get('/findOne2',companyController.findOne_v2 );
router.get('/findbyID',companyController.findbyID);

module.exports = router;
