/* =========================
   MOBILE MENU
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");


    if (menuToggle && mobileMenu) {

        /* Deschidere / închidere meniu */

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("is-open");

            menuToggle.classList.toggle(
                "is-open",
                isOpen
            );

            /* Accesibilitate */

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


        /* Închide meniul când apăsăm pe un link */

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("is-open");

                menuToggle.classList.remove("is-open");

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


            /* Clasa cardului */

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
                    `;


            /* Badge recomandat */

            const popularBadge =
                packageItem.popular
                    ? `
                        <div class="package-badge">
                            Recomandat
                        </div>
                    `
                    : "";


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

});

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
                (item) => item.id === packageId
            );


        if (!selectedPackage) {
            return;
        }


        /* Citim selecțiile existente */

        const selections =
            JSON.parse(
                sessionStorage.getItem("photoBoothSelections")
            ) || {};


        /* Salvăm pachetul */

        selections.package = {
            id: selectedPackage.id,
            name: selectedPackage.name,
            price: selectedPackage.price
        };


        /* Salvăm tot obiectul */

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
           lent spre final.
        */

        const eased =
            1 - Math.pow(1 - progress, 3);


        const currentValue =
            Math.round(target * eased);


        element.textContent =
            currentValue.toLocaleString("ro-RO");


        if (progress < 1) {

            requestAnimationFrame(updatePrice);

        } else {

            element.classList.add(
                "price-finished"
            );

        }

    };


    requestAnimationFrame(updatePrice);

};


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
            threshold: 0.6
        }

    );


priceNumbers.forEach((price) => {

    priceObserver.observe(price);

});
