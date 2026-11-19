/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");


if (menuToggle && mobileMenu) {

    // Deschide / închide meniul
    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.classList.toggle("active");

        mobileMenu.classList.toggle("active");


        // Accesibilitate
        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Închide meniul"
                : "Deschide meniul"
        );

    });


    // Închide meniul după selectarea unui link
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

const packagesGrid = document.getElementById("packagesGrid");


if (packagesGrid && typeof CONFIG !== "undefined") {

    CONFIG.packages.forEach((packageItem) => {

        const card = document.createElement("article");

        card.className = "package-card";


        // Evidențiem pachetul recomandat
        if (packageItem.popular) {
            card.classList.add("popular");
        }


        // Lista beneficiilor
        const features = packageItem.features
            .map((feature) => {
                return `<li>${feature}</li>`;
            })
            .join("");


        // Preț sau text pentru oferta personalizată
        const price = packageItem.price !== null
            ? `
                <div class="package-price">
                    ${packageItem.price}
                    <span>lei</span>
                </div>
            `
            : `
                <div class="package-price custom-price">
                    Cere ofertă
                </div>
            `;


        // Eticheta "Recomandat"
        const popularBadge = packageItem.popular
            ? `<div class="package-badge">Recomandat</div>`
            : "";


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
