import mongoose from "mongoose";


const mongoConnection =()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:process.env.DB_NAME
    }).then(()=>{
           console.log("MONGO DB CONNECTED");
    }).catch((err)=>{
        console.log("err while connecting mongo db")
    })
}

export default mongoConnection;