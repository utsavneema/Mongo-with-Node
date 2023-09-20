const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiControllers");
const excelTask = require("../controllers/excelTask")
const salesAggregate = require("../controllers/salesAggregate");
const productsApi = require("../controllers/products")
const users = require("../controllers/recursion")

const timeout = require("connect-timeout");

router.use(timeout('100s'));

router.get('/recursion', users.userRecursion)

//for products
router.get('/product', productsApi.operators)

router.post('/upload-file', excelTask.fileUpload)
router.post('/products', excelTask.productsInsert)

//for categories
router.get('/getCategory', apiController.getDetails);
router.post('/insert', apiController.postDetails);
router.get('/lookup', apiController.lookupAggregate)

//for items
router.get('/items', apiController.getItems)
router.put('/update-items', apiController.updateItems)
router.put('/updateitem/:id', apiController.updateItemsbyID)
router.post("/insert-item", apiController.insertItems)

//for sales
router.post('/sales', salesAggregate.avgPrice)
// router.get('/sales', salesAggregate.firstAggregation)

module.exports = router;