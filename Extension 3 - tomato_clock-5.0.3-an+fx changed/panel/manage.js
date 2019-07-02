

const myreminder_field = document.getElementById('myreminder');

const gettingItem = browser.storage.local.get('myreminder_storage');
gettingItem.then((res) => {
try{
  if(res.myreminder_storage){
    myreminder_field.value = res.myreminder_storage;
  }
}catch(e){}
});
myreminder_field.addEventListener('keyup',()=>{
    browser.storage.local.set({ myreminder_storage: myreminder_field.value });
}, false);







document.getElementById('selectcolor').addEventListener("change", function(){

  var x = document.getElementById("selectcolor").value;
  document.getElementById("myreminder").setAttribute("style", "background-color:"+x+";width:430px;");




});



document.getElementById('selectfontcolor').addEventListener("change", function(){

  var x = document.getElementById("selectfontcolor").value;
  document.getElementById("myreminder").setAttribute("style", "color:"+x+";width:430px;");




});


document.getElementById('selectfontsize').addEventListener("change", function(){

  var x = document.getElementById("selectfontsize").value;
  document.getElementById("myreminder").setAttribute("style", "font-size:"+x+"px;width:430px;");




});
