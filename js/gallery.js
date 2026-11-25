document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MODELE
    ========================= */

    const templates = [

        {
            id: "botez-01",
            name: "Botez 01",
            category: "botez",
            image: "assets/images/templates/botez/botez-01.png"
        },

        {
            id: "botez-02",
            name: "Botez 02",
            category: "botez",
            image: "assets/images/templates/botez/botez-02.png"
        },

        {
            id: "majorat-01",
            name: "Majorat 01",
            category: "majorat",
            image: "assets/images/templates/majorat/majorat-01.png"
        }

    ];


    /* =========================
       PANOURI
    ========================= */

    const panels = [

        {
            id: "panou-01",
            name: "Panou 01",
            category: "panou",
            image: "assets/images/panouri/panou-01.png"
        },

        {
            id: "panou-02",
            name: "Panou 02",
            category: "panou",
            image: "assets/images/panouri/panou-02.png"
        },

        {
            id: "panou-03",
            name: "Panou 03",
            category: "panou",
            image: "assets/images/panouri/panou-03.png"
        }

    ];


    /* =========================
       ELEMENTE PAGINA
    ========================= */

    const templatesGrid =
        document.getElementById("templatesGrid");

    const filterButtons =
        document.querySelectorAll(".template-filter");

    const panelCards =
        document.querySelectorAll(".panel-card");


    /* =========================
       ELEMENTE LIGHTBOX
    ========================= */

    const lightbox =
        document.getElementById("templateLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxCategory =
        document.getElementById("lightboxCategory");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");


    /* =========================
       STARE LIGHTBOX
    ========================= */

    let currentIndex = 0;

    let visibleTemplates = [...templates];

    let activeItems = [...templates];


    /* =========================
       FORMAT CATEGORIE
    ========================= */

    function formatCategory(category) {

        const categories = {

            nunta: "Nuntă",

            botez: "Botez",

            majorat: "Majorat",

            cununie: "Cununie",

            aniversare: "Aniversare",

            corporate: "Corporate",

            panou: "Panou"

        };


        return categories[category] || category;

    }


    /* =========================
       AFISARE MODELE
    ========================= */

    function renderTemplates(items) {

        if (!templatesGrid) {
            return;
        }


        templatesGrid.innerHTML = "";


        items.forEach((template) => {

            const card =
                document.createElement("article");


            card.className = "template-card";

            card.dataset.category =
                template.category;

            card.dataset.id =
                template.id;


            card.innerHTML = `

                <div class="template-image">

                    <img
                        src="${template.image}"
                        alt="${template.name}"
                        loading="lazy"
                    >

                </div>

                <div class="template-info">

                    <span class="template-category">
                        ${formatCategory(template.category)}
                    </span>

                    <h3>
                        ${template.name}
                    </h3>

                </div>

            `;


            card.addEventListener("click", () => {

                activeItems = [...visibleTemplates];


                const selectedIndex =
                    activeItems.findIndex(
                        (item) =>
                            item.id === template.id
                    );


                openLightbox(selectedIndex);

            });


            templatesGrid.appendChild(card);

        });

    }


    /* =========================
       FILTRARE MODELE
    ========================= */

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const selectedCategory =
                button.dataset.category;


            filterButtons.forEach((item) => {

                item.classList.remove("active");

            });


            button.classList.add("active");


            if (selectedCategory === "toate") {

                visibleTemplates =
                    [...templates];

            } else {

                visibleTemplates =
                    templates.filter(
                        (template) =>
                            template.category ===
                            selectedCategory
                    );

            }


            renderTemplates(visibleTemplates);

        });

    });


    /* =========================
       PANOURI
    ========================= */

    panelCards.forEach((card, index) => {

        card.addEventListener("click", () => {

            activeItems = [...panels];


            /*
               Dacă ordinea cardurilor din HTML
               este Panou 01, 02, 03,
               folosim direct indexul cardului.
            */

            currentIndex = index;


            openLightbox(currentIndex);

        });

    });


    /* =========================
       DESCHIDERE LIGHTBOX
    ========================= */

    function openLightbox(index) {

        if (
            !lightbox ||
            activeItems.length === 0
        ) {
            return;
        }


        if (
            index < 0 ||
            index >= activeItems.length
        ) {
            currentIndex = 0;

        } else {

            currentIndex = index;

        }


        updateLightbox();


        lightbox.classList.add("active");


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =========================
       ACTUALIZARE LIGHTBOX
    ========================= */

    function updateLightbox() {

        const item =
            activeItems[currentIndex];


        if (!item) {
            return;
        }


        if (lightboxImage) {

            lightboxImage.src =
                item.image;

            lightboxImage.alt =
                item.name;

        }


        if (lightboxTitle) {

            lightboxTitle.textContent =
                item.name;

        }


        if (lightboxCategory) {

            lightboxCategory.textContent =
                formatCategory(item.category);

        }


        /*
           Ascundem săgețile dacă există
           o singură imagine în colecție.
        */

        const showNavigation =
            activeItems.length > 1;


        if (lightboxPrev) {

            lightboxPrev.hidden =
                !showNavigation;

        }


        if (lightboxNext) {

            lightboxNext.hidden =
                !showNavigation;

        }

    }


    /* =========================
       INCHIDERE LIGHTBOX
    ========================= */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove("active");


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    /* =========================
       IMAGINE ANTERIOARA
    ========================= */

    function showPrevious() {

        if (activeItems.length === 0) {
            return;
        }


        currentIndex--;


        if (currentIndex < 0) {

            currentIndex =
                activeItems.length - 1;

        }


        updateLightbox();

    }


    /* =========================
       IMAGINE URMATOARE
    ========================= */

    function showNext() {

        if (activeItems.length === 0) {
            return;
        }


        currentIndex++;


        if (
            currentIndex >=
            activeItems.length
        ) {

            currentIndex = 0;

        }


        updateLightbox();

    }


    /* =========================
       BUTOANE LIGHTBOX
    ========================= */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                showPrevious();

            }
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                showNext();

            }
        );

    }


    /* =========================
       CLICK PE FUNDAL
    ========================= */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =========================
       TASTATURA
    ========================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowLeft") {

                showPrevious();

            }


            if (event.key === "ArrowRight") {

                showNext();

            }

        }
    );


    /* =========================
       INITIALIZARE
    ========================= */

    renderTemplates(visibleTemplates);

});
