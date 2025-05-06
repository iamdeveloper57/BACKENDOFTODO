const mongoose = require('mongoose');
require('dotenv').config();
const mongooseURL = process.env.MONGOOSE_URL
mongoose.connect(mongooseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Db connected");
}).catch((e)=>{
    console.error(e);
});

mongoose.connection.on("disconnected", ()=>{
    console.log("db disconnected");
})

module.exports = mongoose;