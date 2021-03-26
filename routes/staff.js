const express = require("express")
const router = express.Router()
const passportJWT = require('../middleware/passportJWT')  //passby jwt
const checkAdmin = require('../middleware/checkAdmin')


const staffController = require("../controllers/staffController")
const staffControllerForAdd = require("../controllers/staffControllerForAdd")
const staffControllerForDelete = require("../controllers/staffControllerForDelete")
const staffControllerForPUT = require("../controllers/staffControllerForPUT")
const staffControllerForPATCH = require("../controllers/staffControllerForPATCH")

/* GET users listing. */
router.get("/v1",[passportJWT.isLogin],[checkAdmin.isAdmin], staffController.findV1)
router.get("/v2", staffController.findV2)

//insert or add data
router.post("/v1", staffControllerForAdd.dddDataV1)
router.post("/v2", staffControllerForAdd.dddDataV2)

//find not found
router.get("/findNot_v2/:id", staffController.findNotFound_v1)

//delete
router.delete("/v1/:id", staffControllerForDelete.deleteV1)
router.delete("/v2/:id", staffControllerForDelete.deleteV2)

//PUT
router.put("/v1", staffControllerForPUT.putV1)
router.put("/v2", staffControllerForPUT.putV2)
router.put("/v3", staffControllerForPUT.putV3)

//PATCH  **update some filed
router.patch("/v1", staffControllerForPATCH.patchV1)

module.exports = router
