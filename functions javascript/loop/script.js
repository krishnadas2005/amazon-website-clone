function loop(){
    var number=document.getElementById("number").value;
    for(var i=1;i<=10;i++)
        {
        document.write(number+"X"+1+"="+number*i+"<br>")
    }
}