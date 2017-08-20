//Counter code
var button = document.getElementById('counter');

var span;

button.onclick = function() {
    //create a new request
    var request = new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE){
            //take action
            if(request.status===200){
                var counter = request.responseText;
                span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    //Make the request
    request.open('GET','http://ayushbsp98.imad.hasura-app.io/counter',true);
    request.send(span);
};