//Counter code
var button = document.getElementById('counter');

button.onclick = function() {
    //create a new request
    var request = new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE){
            //take action
            if(request.status===200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    //Make the request
    request.open('GET','http://ayushbsp98.imad.hasura-app.io/counter',true);
    request.send(null);
};

//submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    // make a  request to the server and send the name
    
    //Capture the lit of name and make it a list
    var names = ['name1','name2','name3','name'];
    var list='';
    for(var i=0;i<names.length;i++){
        list += '<li>'+names[i]+'</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
};