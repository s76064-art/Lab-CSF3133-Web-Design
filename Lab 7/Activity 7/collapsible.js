document.addEventListener("DOMContentLoaded", function () {
    const collapsibleButton = document.querySelector(".collapsible");
    const content1 = document.getElementById("content1")

    collapsibleButton.addEventListener("click", function () {
        if (content1.style.display === "block") {
            content1.style.display = "none";
        } else {
            content1.style.display = "block";
        }
    });

    const collapsibleButton2 = document.getElementById("collapsible2")
    const content2 = document.getElementById("content2")

    collapsibleButton2.addEventListener("click", function () {
        if (content2.style.display === "block") {
            content2.style.display = "none";
        } else {
            content2.style.display = "block";
        }
    });
});