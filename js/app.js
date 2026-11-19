document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!menuToggle || !mobileMenu) {
        return;
    }

    // Deschidere / închidere meniu

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("is-open");

        menuToggle.classList.toggle("is-open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    // Închide meniul după apăsarea unui link

    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("is-open");

            menuToggle.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

});
