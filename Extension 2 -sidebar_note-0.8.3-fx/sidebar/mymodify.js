






document.getElementById('selectcolor').addEventListener("change", function(){

  var x = document.getElementById("selectcolor").value;
  document.getElementById("note").setAttribute("style", "background-color:"+x);




});



document.getElementById('selectfontcolor').addEventListener("change", function(){

  var x = document.getElementById("selectfontcolor").value;
  document.getElementById("note").setAttribute("style", "color:"+x);




});


document.getElementById('selectfontsize').addEventListener("change", function(){

  var x = document.getElementById("selectfontsize").value;
  document.getElementById("note").setAttribute("style", "font-size:"+x+"px;");


});
