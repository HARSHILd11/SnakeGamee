const express=require("express");
const app=express();
app.listen(8088,()=>{
    console.log("Listening on port 8088");
});

const path=require("path");
app.use(express.static(path.join(__dirname,"/public")))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
const mongoose=require("mongoose");

async function main(){
   await mongoose.connect('mongodb+srv://TicTacToe:HarshilDBtictactoe@tictactoe.xhz6uj9.mongodb.net/?retryWrites=true&w=majority&appName=tictactoe');
};

main().then((res)=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
});

const Schema=mongoose.Schema;



const snake=new Schema({
    name:{
        type:String,
        require:true,
    },
    score:{
        type:Number,
        require:true,

        
    },
    HighestScore:Number,

});

const snakegame=mongoose.model("snakegame",snake);




app.get("/snake",async(req,res)=>{
    const highest=await snakegame.find({}).sort({score:-1}).limit(1);
    res.render("snake.ejs",{highest});
    console.log(highest[0].score)
});

app.post("/snake",async(req,res)=>{
    const data=new snakegame(req.body)
    console.log(req.body);

    await data.save().then(()=>{
        console.log("saved")
    })
    
})