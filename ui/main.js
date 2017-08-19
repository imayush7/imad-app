console.log('Loaded!');
//move the image

var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}

var img = document.getElementById('madi');
img.onclick = function(){
    var interval = setInterval(moveRight,100);
};
