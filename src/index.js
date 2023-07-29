const express =require('express');
const cookieParser = require("cookie-parser");
const app=express();
const path=require("path")
app.use(cookieParser())
const port=3006;
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("running");
})
// app.use(express.static(path.join(__dirname, "../public")));
// app.use(express.static('../public'))
app.use('/static', express.static('../public'));
app.use("/api/folder",require("./routes/folder"));
app.use("/api/user",require("./routes/user"));
app.use("/api/email",require("./routes/email"));
app.use("/api/auth/google",require("./routes/auth"))
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
