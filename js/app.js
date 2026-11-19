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
