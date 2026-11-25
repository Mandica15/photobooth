document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MODELE TEST
    ========================= */

    const templates = [

        {
            id: "nunta-01",
            name: "Elegant Gold",
            category: "nunta",
            categoryName: "Nuntă",
            image: "assets/images/templates/nunta-01.jpg"
        },

        {
            id: "nunta-02",
            name: "Classic Wedding",
            category: "nunta",
            categoryName: "Nuntă",
            image: "assets/images/templates/nunta-02.jpg"
        },

        {
            id: "botez-01",
            name: "Little Moments",
            category: "botez",
            categoryName: "Botez",
            image: "assets/images/templates/botez-01.jpg"
        },

        {
            id: "majorat-01",
            name: "Party Night",
            category: "majorat",
            categoryName: "Majorat",
            image: "assets/images/templates/majorat-01.jpg"
        },

        {
            id: "cununie-01",
            name: "Simple Elegance",
            category: "cununie",
            categoryName: "Cununie",
            image: "assets/images/templates/cununie-01.jpg"
        },

        {
            id: "corporate-01",
            name: "Corporate Clean",
            category: "corporate",
            categoryName: "Corporate",
            image: "assets/images/templates/corporate-01.jpg"
        }

    ];


    /* =========================
       ELEMENTE
    ========================= */

    const templatesGrid =
        document.getElementById("templatesGrid");

    const templatesEmpty =
        document.getElementById("templatesEmpty");

    const filterButtons =
        document.querySelectorAll(
            ".template-filter"
        );


    if (!templatesGrid) {
        return;
    }


    /* =========================
       AFISARE MODELE
    ========================= */

    function renderTemplates(category = "toate") {

        templatesGrid.innerHTML = "";


        const filteredTemplates =
            category === "toate"
                ? templates
                : templates.filter(
                    (template) =>
                        template.category === category
                );


        /* Categorie goală */

        if (filteredTemplates.length === 0) {

            if (templatesEmpty) {
                templatesEmpty.hidden = false;
            }

            return;

        }


        if (templatesEmpty) {
            templatesEmpty.hidden = true;
        }


        /* Generare carduri */

        filteredTemplates.forEach((template) => {

            const card =
                document.createElement("article");


            card.className =
                "template-card";


            card.dataset.templateId =
                template.id;


            card.innerHTML = `

                <div class="template-image">

                    <img
                        src="${template.image}"
                        alt="Model ${template.name}"
                        loading="lazy"
                    >

                </div>


                <div class="template-info">

                    <span class="template-category">
                        ${template.categoryName}
                    </span>

                    <div class="template-name">
                        ${template.name}
                    </div>

                </div>

            `;


            templatesGrid.appendChild(card);

        });

    }


    /* =========================
       FILTRE
    ========================= */

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const selectedCategory =
                button.dataset.category;


            /* Eliminăm selecția precedentă */

            filterButtons.forEach(
                (filterButton) => {

                    filterButton.classList.remove(
                        "active"
                    );

                }
            );


            /* Selectăm filtrul apăsat */

            button.classList.add(
                "active"
            );


            renderTemplates(
                selectedCategory
            );

        });

    });


    /* =========================
       INITIALIZARE
    ========================= */

    renderTemplates();

});
