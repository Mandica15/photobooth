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
       ELEMENTE PAGINA
    ========================= */

    const templatesGrid =
        document.getElementById("templatesGrid");

    const filterButtons =
        document.querySelectorAll(".template-filter");

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

  


    if (!templatesGrid) {
        return;
    }


    let currentTemplateIndex = 0;

    let visibleTemplates = [...templates];


    /* =========================
       AFISARE MODELE
    ========================= */

    function renderTemplates(items) {

        templatesGrid.innerHTML = "";


        items.forEach((template) => {

            const originalIndex =
                templates.findIndex(
                    (item) =>
                        item.id === template.id
                );


            const card =
                document.createElement("article");


            card.className =
                "template-card";

            card.dataset.category =
                template.category;

            card.dataset.index =
                originalIndex;


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
                        ${formatCategory(
                            template.category
                        )}
                    </span>

                    <h3>
                        ${template.name}
                    </h3>

                </div>

            `;


            card.addEventListener(
                "click",
                () => {

                    const visibleIndex =
                        visibleTemplates.findIndex(
                            (item) =>
                                item.id === template.id
                        );


                    openLightbox(
                        visibleIndex
                    );

                }
            );


            templatesGrid.appendChild(
                card
            );

        });

    }


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

            corporate: "Corporate"

        };


        return (
            categories[category] ||
            category
        );

    }


    /* =========================
       FILTRE
    ========================= */

    filterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const category =
                    button.dataset.category;


                filterButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                if (category === "toate") {

                    visibleTemplates =
                        [...templates];

                } else {

                    visibleTemplates =
                        templates.filter(
                            (template) =>
                                template.category ===
                                category
                        );

                }


                renderTemplates(
                    visibleTemplates
                );

            }
        );

    });


    /* =========================
       DESCHIDERE LIGHTBOX
    ========================= */

    function openLightbox(index) {

        if (
            !lightbox ||
            visibleTemplates.length === 0
        ) {
            return;
        }


        currentTemplateIndex = index;


        updateLightbox();


        lightbox.classList.add(
            "active"
        );


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

        const template =
            visibleTemplates[
                currentTemplateIndex
            ];


        if (!template) {
            return;
        }


        if (lightboxImage) {

            lightboxImage.src =
                template.image;

            lightboxImage.alt =
                template.name;

        }


        if (lightboxTitle) {

            lightboxTitle.textContent =
                template.name;

        }


        if (lightboxCategory) {

            lightboxCategory.textContent =
                formatCategory(
                    template.category
                );

        }

    }


    /* =========================
       INCHIDERE LIGHTBOX
    ========================= */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    /* =========================
       MODEL ANTERIOR
    ========================= */

    function showPrevious() {

        if (
            visibleTemplates.length === 0
        ) {
            return;
        }


        currentTemplateIndex--;


        if (currentTemplateIndex < 0) {

            currentTemplateIndex =
                visibleTemplates.length - 1;

        }


        updateLightbox();

    }


    /* =========================
       MODEL URMATOR
    ========================= */

    function showNext() {

        if (
            visibleTemplates.length === 0
        ) {
            return;
        }


        currentTemplateIndex++;


        if (
            currentTemplateIndex >=
            visibleTemplates.length
        ) {

            currentTemplateIndex = 0;

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
            showPrevious
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            showNext
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

    renderTemplates(
        visibleTemplates
    );

});
