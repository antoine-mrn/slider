const arrowsDirection = document.querySelectorAll(".chevron")
const allSlide = [...document.querySelectorAll(".slide")]

const sliderInfo = {
    lock: false,
    direction: 0,
    activeSlide: 0,
    nextSlide: 0
}

let direction = 0
let activeSlide = 0
let nextSlide = 0

arrowsDirection.forEach(arrow => arrow.addEventListener("click", handleSlide))

function handleSlide(e) {
    if(sliderInfo.lock) return

    sliderInfo.lock = true

    sliderInfo.direction = e.target.classList[0].includes("previous") ? -1 : 1
    sliderInfo.activeSlide = allSlide.findIndex(slide => slide.classList.contains("active"))

    if(sliderInfo.direction === -1) {
        sliderInfo.nextSlide = sliderInfo.activeSlide === 0 ? allSlide.length - 1 : sliderInfo.activeSlide - 1
    }
    else {
        sliderInfo.nextSlide = sliderInfo.activeSlide === allSlide.length - 1 ? 0 : sliderInfo.activeSlide + 1
    }

    fadeOut()
    allSlide[sliderInfo.activeSlide].addEventListener("transitionend", fadeIn)

}

function fadeOut() {
// Préparation de la future slide
    slidingAnimation({
        el: allSlide[sliderInfo.nextSlide],
        props: {
            transform: `translateX(${-sliderInfo.direction*50}%)`,
            opacity: 0
        }
    })
// Mouvement de la slide qui disparait

    slidingAnimation({
        el: allSlide[sliderInfo.activeSlide],
        props: {
            transition: "transform 0.4s cubic-bezier(.46,-0.79,.28,.92), opacity 0.4s ease-out",
            transform: `translateX(${sliderInfo.direction*50}%)`,
            opacity: 0
        }
    })
    allSlide[sliderInfo.activeSlide].classList.remove("active")
}

function fadeIn(e) {
    slidingAnimation({
        el: allSlide[sliderInfo.nextSlide],
        props: {
            transition: "transform 0.4s ease-out, opacity 0.6s ease-out",
            transform: "translateX(0)",
            opacity: 1
        }
    })
    allSlide[sliderInfo.nextSlide].classList.add("active")
    e.target.removeEventListener("transitionend", fadeIn)

    setTimeout(() => {
        sliderInfo.lock = false
    }, 400);
}

function slidingAnimation(animationObject) {
    for(const prop in animationObject.props) {
        animationObject.el.style[prop] = animationObject.props[prop]
    }
}