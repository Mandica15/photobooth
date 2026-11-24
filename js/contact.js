document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("contactForm");

    const submitButton =
        document.getElementById("submitButton");

    const formStatus =
        document.getElementById("formStatus");

    const packageSelect =
        document.getElementById("package");


    if (!form) {
        return;
    }


    /* =========================
       POPULARE PACHETE
    ========================= */

    if (
        packageSelect &&
        typeof CONFIG !== "undefined" &&
        Array.isArray(CONFIG.packages)
    ) {

        CONFIG.packages.forEach((packageItem) => {

            const option =
                document.createElement("option");

            option.value =
                packageItem.name;

            option.textContent =
                packageItem.name;

            packageSelect.appendChild(option);

        });


        /* =========================
           PACHET SELECTAT ANTERIOR
        ========================= */

        try {

            const selections =
                JSON.parse(
                    sessionStorage.getItem(
                        "photoBoothSelections"
                    )
                );


            if (
                selections &&
                selections.package &&
                selections.package.name
            ) {

                packageSelect.value =
                    selections.package.name;

            }

        } catch (error) {

            console.warn(
                "Nu am putut citi pachetul salvat.",
                error
            );

        }

    }


    /* =========================
       TRIMITERE FORMULAR
    ========================= */

    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        /* Verificăm formularul */

        if (!form.checkValidity()) {

            form.reportValidity();

            return;
        }


        /* Verificăm URL-ul Apps Script */

        const scriptUrl =
    CONFIG?.googleScriptUrl ||
    CONFIG?.business?.googleScriptUrl;


if (!scriptUrl) {

    formStatus.textContent =
        "Formularul nu este configurat momentan.";

    formStatus.className =
        "form-status error";

    return;
}
{

            formStatus.textContent =
                "Formularul nu este configurat momentan.";

            formStatus.className =
                "form-status error";

            return;
        }


        /* Blocăm butonul */

        submitButton.disabled = true;

        submitButton.textContent =
            "Se trimite...";


        formStatus.textContent =
            "Trimitem cererea...";

        formStatus.className =
            "form-status sending";


        /* Pregătim datele */

        const formData =
            new FormData(form);


        try {

            /*
             * Google Apps Script Web App.
             *
             * no-cors este intenționat.
             * Browserul trimite datele, dar nu încearcă
             * să citească răspunsul Apps Script.
             */

            await fetch(
                scriptUrl,
                {
                    method: "POST",

                    mode: "no-cors",

                    body: formData
                }
            );


            /* =========================
               SUCCES
            ========================= */

            formStatus.textContent =
                "Cererea a fost trimisă. Mulțumim! 📸";

            formStatus.className =
                "form-status success";


            /* Resetăm formularul */

            form.reset();


            /* Ștergem selecția pachetului */

            try {

                const selections =
                    JSON.parse(
                        sessionStorage.getItem(
                            "photoBoothSelections"
                        )
                    ) || {};


                delete selections.package;


                sessionStorage.setItem(
                    "photoBoothSelections",
                    JSON.stringify(selections)
                );

            } catch (error) {

                console.warn(
                    "Nu am putut actualiza selecțiile.",
                    error
                );

            }


        } catch (error) {

            console.error(
                "Eroare formular:",
                error
            );


            formStatus.textContent =
                "Cererea nu a putut fi trimisă. Încearcă din nou.";

            formStatus.className =
                "form-status error";

        }


        /* Reactivăm butonul */

        submitButton.disabled = false;

        submitButton.textContent =
            "Cere oferta";

    });

});
