const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiControllers");
const excelTask = require("../controllers/excelTask")

const timeout = require("connect-timeout")
router.use(timeout('100s'));

// router.get('/test', apiController.testing)
router.post('/upload-file', excelTask.fileUpload)
router.post('/products', excelTask.productsInsert)

//for categories
router.get('/getCategory', apiController.getDetails);
router.post('/insert', apiController.postDetails);

//for items
router.get('/items', apiController.getItems)
router.put('/update-items', apiController.updateItems)
router.put('/updateitem/:id', apiController.updateItemsbyID)
router.post("/insert-item", apiController.insertItems)

//for sales
router.get('/sales', apiController.salesAggregation)

module.exports = router;