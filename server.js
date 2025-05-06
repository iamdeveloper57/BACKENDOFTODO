const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db'); 
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());
app.use(cors());


app.get("/", (req, res)=>{
    res.status(200).json({ message: "Hello form server" });
});

// todo endpoint
const todo = require('./routers/todoRoutes');
app.use("/api/todo",authMiddleware, todo);

// user endpoint
const user = require('./routers/userRoutes');
app.use('/api/user', user);

app.listen(4000, ()=>{
    console.log("server started")
})