import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 8080; // default port to listen


app.use(bodyParser.urlencoded({ extended: true }));//set ejs to view html on wepage
app.set('view engine', 'ejs');

// define a route handler for the default home page

//#######################################################################################################################

var task = ["hello"];                                       //default task
var complete = [];
app.post( "/addtask", ( req, res ) => {
    let newtask = req.body.newtask;
    task.push(newtask);                                     //add task
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
    
        //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});


app.get("/", function(req, res) {    
    res.render("index", { task: task});  //render tassk
});

//#######################################################################################################################
// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );