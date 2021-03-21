/*task = [];*/
var isItImportant = false;
var detailShow = true;

function toggleDetails(){
    if(detailShow){
        $('#capture').hide();
        detailShow=false;
    }else{
        detailShow= true;
        $('#capture').show();
    }
}

function toggleImportant(){
    console.log("Icon clicked");

    if(!isItImportant){
        $('#iImportant').removeClass('far').addClass('fas');
    isItImportant = true;
    }else{
        isItImportant = false;
        $("#iImportant").removeClass('fas').addClass("far")
    }

}
function saveTask() {
    console.log("Save clicked");


var title=$("#txtTitle").val();
var date=$("#txtDnT").val();
var description=$("#txtDes").val();
var status=$("#selStat").val();
var location=$("#txtLoc").val();
var color=$("#txtColor").val();

var myTask= new Task(0, isItImportant, title, date, description, status, location, color);

/*console.log(myTask);//obj
console.log(JSON.stringify(myTask));//json string*/


console.log("Starting ajax");
// save to server
    $.ajax({
        url: "/api/postTask",
        type:"POST",
        data: JSON.stringify(myTask),
        contentType: "application/json",
        
        success:function(res) {
            console.log('Server says:', res);

            // diplay task
            displayTask(res);
        },
        error:function(errorDet) {
            console.log('Error', errorDet);
        }
    });
    /*console.log("Code below ajax");*/
}

function displayTask(task) {
    // create the syntax
    let syntax = `<div class="task" style="background-color: ${task.color};"> 
    <div class="important-container">
    <i class="imp-task far fa-star"></i> 
    </div>
    <div class="task-container">
    <h5>${task.title}</h5>
    
    <p>${task.description}</p>
    </div>
    
    <div class="date-icon">
    <label class= 'task-sect'><b>Due Date:</b><br>
    ${task.dueDate}</label>
    <label class='task-sect'><b>Location:</b><br>${task.location}</label>
                 </div>
                 
                   <button type="button" onclick="deleteNewTask(${task.id})" class=" btnDelete${task.id} btn btn-danger"><i class="far fa-trash-alt"></i></button>
                
                    
                </div>
    
            </div>`;
            // <div class='task-sect-t'></div>
/*var syntax =
`<div>
    <h4>${task.title}</h4>
    <p>${task.description}</p>
    <label>${task.dueDate}</label>
    <i class= "far fa-star"></i> 
    </div>`;*/
    
    //append the syntax to existing html
    $('#tasks-list').append(syntax);
    
}

function retrieveData(){
    $.ajax({
        url: "/api/getTask",
        type: "GET",
        success:function(cData){
            console.log("You got it!!", cData);

            for(let i =0; i < cData.length; i++){
                let task = cData[i];
                if(task.user === "M.A."){
                    displayTask(task);
                }
            }

        },
        error: function(wrongD){

            console.log("No no no no, My Friend :(", wrongD);

        }
    });
} 


function testRequest() {
    $.ajax({
        url: "https://restclass.azurewebsites.net/api/test",
        type: "GET",
        success:function(res){
            console.log("Yees it works!!", res);
        },
        error: function(errorD){

            console.log("Ouch we have an error, :(", errorD);

        }
    });
}

function init() {
    console.log("Task Manager");
    /*    $('#txtColor').spectrum({
        type:"component"
    });*/
    retrieveData()
    //event
    $("#iImportant").click(toggleImportant);
    $("#btnSave").click(saveTask);
    $("#btnHnS").click(toggleDetails);
}
//mark task as important//

// delete button inside the server 
/*function deleteNewTask(id) {
    console.log("Delete this task first", id);

    //create an ajax
    //url: serverURL + 'tasks' + id 

    // on success function --> remove it from the screen
}

// delete button//
function deleteNewTask(e){

    const item = e.target;
    
    if(item.classList[0] === 'btnDelete'){
        const todo = item.parentElement;
        todo.remove();
    }
    if(item.classList[0] === 'imp-task'){
        
    item.classList.toggle('fas');
    }
}*/
function deleteNewTask(id){

    // create an ajax
    $.ajax({
        // url: serverUrl + "/tasks/" + id,
        type:"DELETE",
        // remove task from screen on success
        success: function(){
            console.log("Deleted from server:", id);
            const item = $(`.btnDelete${id}`);

            if(item){
            const todo = item[0].parentElement;
            todo.remove();
            }
        
        },
        error: function(errorDetails){
            console.log("Error: "+ errorDetails);
        }
        

    });
    
}



window.onload=init;

/*
Task
-Id
-Title
-Date & Time
-Important
-Decription
-Status
-Location
-Color
*/
