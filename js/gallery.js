document.addEventListener("DOMContentLoaded", () => {

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
        }

    ];


    const templatesGrid =
        document.getElementById("templatesGrid");


    if (!templatesGrid) {
        return;
    }


    /* Eliminăm modelele demo */

    templatesGrid.innerHTML = "";


    /* Generăm modelele reale */

    templates.forEach((template) => {

        const card =
            document.createElement("article");


        card.className = "template-card";

        card.dataset.category =
            template.category;


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
                    ${template.category}
                </span>

                <h3>
                    ${template.name}
                </h3>

            </div>

        `;


        templatesGrid.appendChild(card);

    });

});
