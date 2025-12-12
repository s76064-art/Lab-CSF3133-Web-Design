document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.getElementById("progress-bar");
    const increaseButton = document.getElementById("increase-progress");
    const decreaseButton = document.getElementById("decrease-progress");
    const resetButton = document.getElementById("reset-progress");
    const loadingBar = document.getElementById("loading-bar")

    let progress = 0;

    increaseButton.addEventListener("click", function () {
        if (progress < 100) {
            progress += 10;
            progressBar.style.width = progress + "%"
        } else {
            alert("Progress is complete!")
        }
    })

    decreaseButton.addEventListener("click", function () {
        if (progress > 0) {
            progress -= 10;
            progressBar.style.width = progress + "%"
        }
    })

    resetButton.addEventListener("click",function(){
         progress = 0;
        progressBar.style.width = 0 + "%";
    })


    for (let i = 0; i <= 100; i+= 10){
        setTimeout(function(){
            loadingBar.style.width = i + "%";
        },Math.floor(Math.random()*6) * i)
    }

})

