document.getElementById('selectcolor').addEventListener("change", function(){

  var x = document.getElementById("selectcolor").value;
  document.getElementById("contenuto_nota").setAttribute("style", "background-color:"+x);

});


