const express=require("express");
const port=process.env.PORT || 3000;
const app=express();
const http=require("http");
const path=require("path");
const server=http.createServer(app);
const socketio=require("socket.io");
// app.use(express.json());
const socket=socketio(server);
app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
  res.render("index");
})
//io
socket.on("connection",function(instance){
  console.log(instance.id,"connected");
  instance.on("send-location",data=>{
    console.log(data,"ip address")
    socket.emit("receive-location",{id:instance.id,...data});
    instance.on("disconnect",function(){
      console.log("disconnect",instance.id)
      socket.emit("user-disconnect",{id:instance.id});
    })
  })
})
server.listen(3000, () => {
  console.log('Server running on localhost:3000');
});