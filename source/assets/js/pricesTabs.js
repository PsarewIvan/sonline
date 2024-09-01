(() => {
    const tabs = document.querySelectorAll('.js-prices-tabs');
    const prices = document.querySelectorAll('.js-prices-price');

    tabs.forEach((tabElement) => {
        const buttons = tabElement.querySelectorAll('button');

        tabElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('js-prices-tab')) {
                buttons.forEach((button) => button.classList.remove('active'));
                event.target.classList.add('active');

                const plan = event.target.dataset.plan;

                if (plan) updateDates(plan);
            }
        });
    });

    function updateDates(plan) {
        prices.forEach((priceEl) => {
            const price = priceEl.dataset.prices;

            try {
                const priceValue = JSON.parse(price)?.[plan];

                if (priceValue) priceEl.innerHTML = priceValue;
            } catch (err) {}
        });
    }
})();
