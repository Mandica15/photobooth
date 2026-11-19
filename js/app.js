document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


    const closeMobileMenu = () => {

        if (!menuToggle || !mobileMenu) {
            return;
        }

        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Deschide meniul"
        );

    };


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.classList.toggle("active");

            mobileMenu.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Închide meniul"
                    : "Deschide meniul"
            );

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach((link) => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

    }



    /* =========================
       PACHETE
    ========================= */

    const packagesGrid =
        document.getElementById("packagesGrid");


    if (
        packagesGrid &&
        typeof CONFIG !== "undefined" &&
        Array.isArray(CONFIG.packages)
    ) {

        /*
           Curățăm containerul înainte
           de generarea cardurilor.
        */

        packagesGrid.innerHTML = "";


        CONFIG.packages.forEach((packageItem) => {

            const card =
                document.createElement("article");


            card.className = "package-card";


            if (packageItem.popular) {
                card.classList.add("popular");
            }


            /* Beneficii */

            const features =
                packageItem.features
                    .map((feature) => {

                        return `
                            <li>${feature}</li>
                        `;

                    })
                    .join("");


            /* Preț */

            const price =
                packageItem.price !== null
                    ? `
                        <div class="package-price">

                            <span
                                class="price-number"
                                data-price="${packageItem.price}"
                            >
                                0
                            </span>

                            <span class="price-currency">
                                lei
                            </span>

                        </div>
                    `
                    : `
                        <div class="package-price custom-price">
                            Cere ofertă
                        </div>
                    `;


            /* Badge Recomandat */

            const popularBadge =
                packageItem.popular
                    ? `
                        <div class="package-badge">
                            Recomandat
                        </div>
                    `
                    : "";


            /* Text buton */

            const buttonText =
                packageItem.price !== null
                    ? "Alege pachetul"
                    : "Cere ofertă";


            /* Conținut card */

            card.innerHTML = `

                ${popularBadge}

                <div class="package-content">

                    <h3>
                        ${packageItem.name}
                    </h3>

                    <p class="package-description">
                        ${packageItem.description}
                    </p>

                    ${price}

                    <ul class="package-features">
                        ${features}
                    </ul>

                    <a
                        href="#contact"
                        class="btn btn-primary package-select"
                        data-package="${packageItem.id}"
                    >
                        ${buttonText}
                    </a>

                </div>

            `;


            packagesGrid.appendChild(card);

        });

    }



    /* =========================
       SELECTARE PACHET
    ========================= */

    const packageButtons =
        document.querySelectorAll(".package-select");


    packageButtons.forEach((button) => {

        button.addEventListener("click", () => {

            if (
                typeof CONFIG === "undefined" ||
                !Array.isArray(CONFIG.packages)
            ) {
                return;
            }


            const packageId =
                button.dataset.package;


            const selectedPackage =
                CONFIG.packages.find(
                    (item) =>
                        item.id === packageId
                );


            if (!selectedPackage) {
                return;
            }


            let selections = {};


            try {

                selections =
                    JSON.parse(
                        sessionStorage.getItem(
                            "photoBoothSelections"
                        )
                    ) || {};

            } catch (error) {

                selections = {};

            }


            selections.package = {

                id: selectedPackage.id,

                name: selectedPackage.name,

                price: selectedPackage.price

            };


            sessionStorage.setItem(
                "photoBoothSelections",
                JSON.stringify(selections)
            );

        });

    });



    /* =========================
       ANIMATIE PRETURI
    ========================= */

    const priceNumbers =
        document.querySelectorAll(".price-number");


    const showFinalPrice = (element) => {

        const target =
            Number(element.dataset.price);


        if (!Number.isFinite(target)) {
            return;
        }


        element.textContent =
            target.toLocaleString("ro-RO");

    };


    const animatePrice = (element) => {

        const target =
            Number(element.dataset.price);


        if (!Number.isFinite(target)) {
            return;
        }


        const duration = 2000;

        let startTime = null;


        const updatePrice = (currentTime) => {

            if (startTime === null) {
                startTime = currentTime;
            }


            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
               Animație ease-out:
               rapidă la început,
               lentă spre final.
            */

            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.round(
                    target * eased
                );


            element.textContent =
                currentValue.toLocaleString(
                    "ro-RO"
                );


            if (progress < 1) {

                requestAnimationFrame(
                    updatePrice
                );

            } else {

                showFinalPrice(element);

                element.classList.add(
                    "price-finished"
                );

            }

        };


        requestAnimationFrame(updatePrice);

    };


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        priceNumbers.forEach((price) => {
            showFinalPrice(price);
        });

    } else if ("IntersectionObserver" in window) {

        const priceObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        animatePrice(entry.target);

                        observer.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.65
                }

            );


        priceNumbers.forEach((price) => {

            priceObserver.observe(price);

        });

    } else {

        priceNumbers.forEach((price) => {

            animatePrice(price);

        });

    }

});
