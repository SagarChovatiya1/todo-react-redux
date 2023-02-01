const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connection is done")
})
.catch((err)=>{
    console.log(err)
})
