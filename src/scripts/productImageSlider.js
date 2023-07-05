document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".slider");

    sliders.forEach(function (slider) {
        const sliderItems = slider.querySelectorAll(".sliderItems li");
        const sliderBigImage = slider.querySelector(".bigImage img");

        if (sliderItems && sliderBigImage) {
            sliderItems.forEach((item) =>
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    sliderBigImage.src = e.target.src;
                    slider.querySelector(".sliderActive").removeAttribute("class");
                    e.target.closest("li").setAttribute("class", "sliderActive");
                })
            );
        }
    });
});
