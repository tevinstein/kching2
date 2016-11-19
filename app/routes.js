//create new express router
const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    dataController = require('./controllers/data.controller'),
    multer = require('multer'),
    //upload = multer({ dest: './uploads/' }),
	storage = multer.diskStorage({
	    destination: function(req, file, cb) {
	        cb(null, './public/images/')
	    },
	    filename: function(req, file, cb) {
	        cb(null, file.originalname)
	    }
	}),
	upload = multer({storage:storage})


//export router
module.exports = router
    //
    //define routes

//main routes
router.get('/', mainController.showHome)
router.post('/add', dataController.addTheData)

//show all datas
router.get('/datas/:id', dataController.showDatas)

//create data
router.get('/datas/:id/add', dataController.showAdd)
router.post('/datas/:id/add', upload.single('upl'), dataController.processAdd)

//edit data
router.get('/datas/:id/:expensesid/edit', dataController.showEdit)
router.post('/datas/:id/:expensesid/edit', upload.single('upl'), dataController.processEdit)

//delete data
router.get('/datas/:id/:expensesid/delete', dataController.deleteData)

//show single data
router.get('/datas/:id/:expensesid', dataController.showData)
