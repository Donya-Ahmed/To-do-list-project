const dealWithData =require("./helpers/dealWithData")

const allTasks=(req,res)=>{
    const allTasks=dealWithData.readDataFromJSON("./models/data.json")

    res.render('allTasks',{
        pageTitle:"all tasks",
        allTasks ,
        hasTasks:(allTasks.length!=0)? true:false

    })
}
const addTask=(req,res)=>{

    if(req.query.title && req.query.content){
        const allTasks=dealWithData.readDataFromJSON("./models/data.json")
        const task=allTasks.find(task=>task.title == req.query.title)
        if(task){
          res.redirect('/error')
        }
        else{
           allTasks.push({
            title:req.query.title,
            content:req.query.content
        })

        dealWithData.writeDataToFile("./models/data.json",allTasks)
        return res.redirect('/')
        }
        
    }
    res.render('addTask',{pageTitle:"add new task"})
}

const showSingle=(req,res)=>{
   
    const allTasks=dealWithData.readDataFromJSON("./models/data.json")
    const task = allTasks.find(task=> task.title == req.params.title )

  res.render('single',{
      pageTitle:"show single task",
      task
  })
// res.send(req.params.title)

    //  res.send(task)
}
const editSingle=(req,res)=>{
    const allTasks=dealWithData.readDataFromJSON("./models/data.json")
    const task = allTasks.find(task=> task.title == req.params.title )
   

  res.render('editTask',{
      pageTitle:"edit single task",
      task
  })


}

const editSingleLogic=(req,res)=>{
    const allTasks=dealWithData.readDataFromJSON("./models/data.json")
    const index = allTasks.findIndex(task=> task.title == req.params.title )
    const task = allTasks.find(task=> task.title == req.body.title )
    if(task){
        res.redirect('/error') 
    }
    else{
        allTasks[index].title=req.body.title
        allTasks[index].content=req.body.content
      
        dealWithData.writeDataToFile('./models/data.json', allTasks)
        res.redirect('/')
    }

   
}
const delSingle=(req,res)=>{
    const allTasks=dealWithData.readDataFromJSON("./models/data.json")
    const index = allTasks.findIndex(task=> task.title == req.params.title )
    allTasks.splice(index,1)
    dealWithData.writeDataToFile('./models/data.json', allTasks)
    res.redirect('/')
}
const dellAll=(req,res)=>{
    dealWithData.writeDataToFile('./models/data.json', [])
    res.redirect('/') 
}
module.exports={allTasks,addTask,showSingle,editSingle,editSingleLogic,delSingle,dellAll}