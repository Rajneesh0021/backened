const {Router} = require('express');
const postRoute= Router();
const {postModel}=require('../model/post.model')
const {verifyToken}= require('../authentication/user.authenticate')

postRoute.get('/',async (req,res)=>{
const query= req.query
try {
    let posts = await postModel.find(query)
res.send(posts)

} catch (error) {
    res.send(error.message)

}
})

postRoute.post('/add' , async (req,res)=>{
   const payload =req.body;
   try {
    let posts= postModel(payload)
    await posts.save()
    res.send({"message":"post added successfully"})
   } catch (error) {
    res.send(error.message)
   }
})
    


postRoute.patch('/update/:id', async (req,res)=>{
    let id= req.params.id
    let body= req.body
    
    try {
        let posts = await postModel.findByIdAndUpdate(id, req.body)
    res.send({"message":"updated successfully"})

    
    } catch (error) {
        res.send(error.message)
    
    }
})
postRoute.delete('/delete:id', async (req,res)=>{
    let id= req.params.id
    console.log(id);
    try {
       
        let posts = await postModel.findByIdAndDelete(id)
    res.send({"message":"deleted successfully"})    
    } catch (error) {
        res.send(error.message)
    
    }
    
})



module.exports={postRoute};