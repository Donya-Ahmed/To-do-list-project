const route=require("express").Router()
const taskController=require("../controller/taskController")
route.get("",taskController.allTasks)
route.get("/addTask",taskController.addTask)
route.get("/error",(req,res)=>{res.render("error")})
route.get("/showSingle/:title",taskController.showSingle)
route.get("/editSingle/:title",taskController.editSingle)
route.post("/editSingleLogic/:title",taskController.editSingleLogic)
route.get("/delSingle/:title",taskController.delSingle)
route.post("/delAll",taskController.dellAll)



module.exports=route