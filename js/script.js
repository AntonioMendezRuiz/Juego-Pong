var container = document.getElementById("container");
var lienzo = document.getElementById("lienzo");

function ampliar(){
    container.style.width = "100%";
    container.style.height = "100vh";
    container.style.margin = "0";

    lienzo.style.width = "auto";
    lienzo.style.height = "100vh";
    lienzo.style.backgroundSize = "cover";
    lienzo.style.backgroundRepeat = "no-repeat";
}