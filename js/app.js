document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


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

            link.addEventListener("click", () => {

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

            });

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
                            <li>
                                ${feature}
                            </li>
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


            /* Card */

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
                        ${
                            packageItem.price !== null
                                ? "Alege pachetul"
                                : "Cere ofertă"
                        }
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

            } catch {

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


    const animatePrice = (element) => {

        const target =
            Number(element.dataset.price);


        if (!Number.isFinite(target)) {
            return;
        }


        const duration = 900;

        const startTime =
            performance.now();


        const updatePrice = (currentTime) => {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
               Ease-out:
               rapid la început,
               mai lent spre final.
            */

            const eased =
                1 -
                Math.pow(
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

                element.textContent =
                    target.toLocaleString(
                        "ro-RO"
                    );

                element.classList.add(
                    "price-finished"
                );

            }

        };


        requestAnimationFrame(
            updatePrice
        );

    };



    /* Respectăm setarea de reducere
       a animațiilor din telefon/browser */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        priceNumbers.forEach((price) => {

            const target =
                Number(price.dataset.price);

            price.textContent =
                target.toLocaleString("ro-RO");

        });

    } else if ("IntersectionObserver" in window) {

        const priceObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        animatePrice(
                            entry.target
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.5
                }

            );


        priceNumbers.forEach((price) => {

            priceObserver.observe(price);

        });

    } else {

        /*
           Fallback pentru browsere
           fără IntersectionObserver.
        */

        priceNumbers.forEach((price) => {

            animatePrice(price);

        });

    }

});
