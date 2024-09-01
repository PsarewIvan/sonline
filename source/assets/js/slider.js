(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const sliders = document.querySelectorAll('.itc-slider');
        const mobileBreakpoint = 768;

        window.addEventListener('resize', initMobileSliders);
        initMobileSliders();

        function initMobileSliders() {
            sliders.forEach((sliderElement) => {
                let sliderInstance = sliderElement.itcSliderInstance || null;

                if (window.innerWidth < mobileBreakpoint) {
                    if (!sliderInstance) {
                        sliderInstance =
                            ItcSlider.getOrCreateInstance(sliderElement);
                        sliderElement.itcSliderInstance = sliderInstance;
                    }
                } else if (sliderInstance) {
                    sliderInstance.reset();
                    sliderInstance.dispose();
                    sliderElement.itcSliderInstance = null;
                }
            });
        }
    });
})();
