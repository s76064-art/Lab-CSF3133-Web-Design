
document.addEventListener('DOMContentLoaded', function () {
    let progressbar = document.getElementById("progress-bar");
    let progressContainer = document.getElementById("loading-container")
    load(progressbar, progressContainer);
    slideshow()
});

document.getElementById("collapse-button").addEventListener("click",function(){
    let innerContent = document.getElementById("inner-content");

    if (innerContent.style.display === "block"){
        innerContent.style.display = "none"
    }else{
        innerContent.style.display = "block"
    }
});

document.getElementById("collapse-button-1").addEventListener("click",function(){
    let innerContent = document.getElementById("inner-content-1");

    if (innerContent.style.display === "block"){
        innerContent.style.display = "none"
    }else{
        innerContent.style.display = "block"
    }
});

//Wait function
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Loading bar
async function load(progressbar, progressContainer) {
    progressbar.style.width = "0%";

    for (let i = 0; i <= 100; i += 10) {
        await wait((Math.random() * 1000) + 1);
        progressbar.style.width = `${i}%`;
        console.log(1);
    }

    progressContainer.style.animation = "fade-out 0.3s ease";
    await wait(100);
    progressContainer.style.display = "none";
}

//Slide show
async function slideshow() {
    let slideshows = document.getElementsByClassName("slide")

    let prevSlidshow = slideshows[0];
    while (true) {

        for (let i = 0; i < slideshows.length; i++) {
            prevSlidshow.style.opacity = "0";
            await wait(1000);
            prevSlidshow.style.display = "none";

            slideshows[i].style.display = "block";
            await wait(10);
            slideshows[i].style.opacity = "1";
            prevSlidshow = slideshows[i];
            await wait(5000);
        }
    }
}