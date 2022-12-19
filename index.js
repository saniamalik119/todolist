// jshint version:6
const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const mongoose = require("mongoose")
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch("error occured");
async function main(){
   await mongoose.connect("mongodb+srv://sania-node:sania-node@todo.x3aci0i.mongodb.net/todoDb", {useNewUrlParser: true})
}

const listShema = new mongoose.Schema({
   Name: String,
   
  
})
const Item = mongoose.model("Item", listShema)


const item1 = new Item({
   Name: "Make Your Day productive"
});
// const item2 = new Item({
//    Name: "my father name is Barkat"
// })

const defultItems = [ item1];

app.get("/", (req, res) =>{
   var today = new Date();
   var options = {
      weekday: "long",
      day : "numeric",
      month: "long"
   }
var day = today.toLocaleDateString("en-US", options)
Item.find({}, function(err, foundItem){
   if(foundItem.length === 0 ){
      
      Item.insertMany(defultItems, function(err){
         if(err){
            console.log(err)
         }else{
            console.log("succcess")
         }
      })
   res.redirect("/")
   }else{
      res.render("list", {kindOfDay: day, newListItems: foundItem})
   }
})


})

app.post("/delete", (req, res) => {
   const deleteItemId = req.body.deleteBtn
Item.findByIdAndDelete(deleteItemId, (err) => {
   if(!err){
      console.log("success")
      res.redirect("/")
   }else{
      console.log(err)
   }
})
})





app.post("/", (req, res) =>{
    var itemName = req.body.newItem
   const item = new Item({
      Name: itemName
   })
   item.save()
   res.redirect("/")
})


app.listen(process.env.PORT, () => console.log("pot is running"))
