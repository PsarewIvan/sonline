(() => {
    const topbar = document.querySelector('.js-topbar');
    const topbarClose = document.querySelectorAll('.js-topbar-close');

    topbarClose.forEach((button) => {
        button.addEventListener('click', () => {
            if (topbar) {
                topbar.classList.add('hidden');
            }
        });
    });
})();
