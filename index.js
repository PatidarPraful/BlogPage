const { compile } = require('ejs');
const { captureRejectionSymbol } = require('events');
const express = require('express')
const app = express();
var methodOverride = require('method-override')
const port = 8080;

const path = require('path')

const { v4: uuidv4 } = require('uuid');
uuidv4(); 
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "prafull30",
        content : "I love coding, NIT Bhopal ",
    },

    {
        id : uuidv4(),
        username : "hacker",
        content : "hacking is an art not crime",
    },

    {
        id : uuidv4(),
        username : "unknown",
        content : "don't know what's going on in life !",
    },
]

app.get("/posts", (req,res)=> {
    res.render("index.ejs", {posts}); 
})

app.get("/posts/new", (req,res)=> {
    res.render("new.ejs")
})

app.post("/posts", (req,res) => {
    let username = req.body.username;
    let content = req.body.content;
    let id = uuidv4(); 
    posts.push({id, username, content});
    res.redirect("/posts");
})

app.get("/posts/:id", (req,res) => {
    let id = req.params.id;
    let post = posts.find((p) => id === p.id);
    
    res.render("show.ejs", {post})
    
})
 
app.patch("/posts/:id", (req,res) => {
    let id = req.params.id;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts")

})

app.get("/posts/:id/edit", (req,res) => {
    let id = req.params.id;
    let post = posts.find((p) => id === p.id);

     res.render("edit.ejs",{post})
})

app.delete("/posts/:id", (req,res) => {
    let id = req.params.id;
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
})

app.listen(port, ()=> {
    console.log("listening to port : 8080")
})