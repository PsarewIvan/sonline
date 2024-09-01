(() => {
    let hasMenuOpen = false;

    const nav = document.querySelector('.js-topnav');
    const burger = document.querySelector('.js-topnav-button');

    burger?.addEventListener('click', onBurgerClick);

    function onBurgerClick() {
        if (hasMenuOpen) {
            hasMenuOpen = false;
            nav?.classList.add('open');
            burger?.classList.remove('open');
            document.body.classList.remove('body-lock');
        } else {
            hasMenuOpen = true;
            nav?.classList.remove('hidden');
            burger?.classList.add('open');
            document.body.classList.add('body-lock');
        }
    }
})();
