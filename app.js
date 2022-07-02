//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");




const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//inside the render we place the ejs file name and inside the " " we palce the text that we are going to
//use in the localhost:3000/text
let posts = [ ];
app.get("/",function(req,res){
  res.render("home");
});
app.get("/patients",function(req,res){
  res.render("patients",{posts:posts});
});
app.get("/about",function(req,res){
  res.render("about");
});

app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose",function(req,res){
const post={
  title:req.body.postTitle,
  content:req.body.postBody
};
posts.push(post);
res.redirect("/patients");
});

app.get("/posts/:postName",function(req,res){
const requestedTitle = _.lowerCase(req.params.postName);
posts.forEach(function(post){
  const storedTitle = _.lowerCase(post.title);
if(storedTitle === requestedTitle)
{

  res.render("post",{ title:post.title,content:post.content});
}
});
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
