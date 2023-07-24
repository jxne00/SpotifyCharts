// function to show and hide a div block
function showHideDiv() {
    var mydiv = document.getElementById("queryUsed");
    (mydiv.style.display === "block")
        ? mydiv.style.display = "none"
        : mydiv.style.display = "block";
}
