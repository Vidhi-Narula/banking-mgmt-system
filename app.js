const express=require('express');
const app=express();
const port=3004;
const mysql = require("./connections").con;
app.set("view engine", "hbs");
app.set("views","./view");
app.use(express.static(__dirname + "/public"));


app.get('/', (req,res)=>{
    res.render("index");
});

app.get('/create', (req,res)=>{
    res.render("create");
});

app.get('/delete', (req,res)=>{
    res.render("delete");
});

app.get('/about', (req,res)=>{
    res.render("about");
});




app.get('/contact', (req,res)=>{
    res.render("contact");
});



app.get('/money', (req,res)=>{
    res.render("money");
});





app.get("/history", (req, res) => {
    let qry="select * from trans";
    mysql.query(qry, (err, results) => {
        if(err) throw err
        else{
            res.render("history", { data: results });
        }

    })
});

app.get("/userhistory", (req, res) => {
    let qry="select * from users";
    mysql.query(qry, (err, results) => {
        if(err) throw err
        else{
            res.render("userhistory", { data: results });
        }

    })
});

app.get('/addUser', (req,res)=>{
  

    const {id,name, email, balance}=req.query;

    let qry="select * from users where id=?";
    mysql.query(qry, [id], (err,results) => {
        if(err)
            throw err
        else{
           
            if(results.length>0){
                res.render("create", { checkmesg: true })
            }
            else{
               
                let qry2="insert into users values(?,?,?,?)";
                mysql.query(qry2, [id,name, email, balance], (err, results)=>{
                   
                    if(results.affectedRows > 0){
                        res.render("create", { mesg: true })
                    }
                })
            }
        }
    })
});


app.get('/addMoney', (req,res)=>{
  

    const {id,name, to, transaction}=req.query;

    let qry="select * from trans where id=?";
    mysql.query(qry, [name], (err,results) => {
        if(err)
            throw err
        else{
           
            if(results.length>0){
                res.render("money", { checkmesg: true })
            }
            else{
               
                let qry2="insert into trans values(?,?,?,?)";
                mysql.query(qry2, [id,name, to, transaction], (err, results)=>{
                   
                    if(results.affectedRows > 0){
                        res.render("money", { mesg: true })
                    }
                })
            }
        }
    })

  


});


app.get("/deleteUser", (req, res) => {
    

    const { id } = req.query;

    let qry = "delete from users where id=?";
    mysql.query(qry, [id], (err, results) => {
        if(err)
            throw err
        else{
            if(results.affectedRows > 0){
                res.render("delete", { mesg1: true, mesg2: false })
            }
            else{
                res.render("delete", { mesg1: false, mesg2: true })
            }
        }
    });
})



app.listen(port,(err)=>{
    if(err)
        throw err
    else
        console.log("Sever is running at port %d:", port);
})