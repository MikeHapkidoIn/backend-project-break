// rutas de producto
const express = require('express')
const router = express.Router();

const Post = require ("../models/Post.js");


router.post("/create", async(req, res) =>{
  try{
    const post = await Post.create ({title:req.body.title, body:req.body.body});
    res.status(201).send(post)

  }catch (err){
    console.error(error);
    res.status(500).send ({message: "Hay un problema al crear el Post"})
  }
})





router.get("/", async (req, res)=> {
  try {
    const posts = await Post.find();
    res.status(200).send (posts);
  } catch (err) {
    res.status(500).send ({message:"Hay un error al recoger los Posts"})
  }
})

router.get("/id/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the post" });
    }
  });


  router.get("/title/:title", async(req, res) => {
    try {
        const post = await Post.find({ title: req.params.title });
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the post" });
    }
});


router.put ('/id/:id', async(req, res)=>{
  try{
    const post = await Post.findByIdAndUpdate(req.params.id, {title: req.body.title, body:req.body.body});
    if (!post)return res.status(404).send({message:"No se ha encontrado"});
    res.status(200).send(post);

  }catch (err){
    res.status(500).send({message: "No se ha podido actualizar"})
  }
});


router.delete ('/delete/:id', async(req, res)=>{
  try{
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post)return res.status(404).send({message:"No se ha encontrado"});
    res.status(200).send({message: "Se ha borrado correctamente"});

  }catch (err){
    res.status(500).send({message: "No se ha podido eliminar"})
  }
});

module.exports = router; */