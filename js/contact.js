document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("contactForm");

    const status =
        document.getElementById("formStatus");

    const submitButton =
        document.getElementById("submitButton");

    const packageField =
        document.getElementById("package");


    if (!form || !status) {
        console.error("Formularul de contact nu a fost găsit.");
        return;
    }


    /* =========================
       PACHETE IN FORMULAR
    ========================= */

    if (
        packageField &&
        typeof CONFIG !== "undefined" &&
        Array.isArray(CONFIG.packages)
    ) {

        /*
         * Evităm dublarea opțiunilor dacă scriptul
         * este inițializat din nou.
         */

        packageField.innerHTML = `
            <option value="">
                Alege pachetul
            </option>
        `;


        CONFIG.packages.forEach((packageItem) => {

            const option =
                document.createElement("option");

            option.value =
                packageItem.id;

            option.textContent =
                packageItem.name;

            packageField.appendChild(option);

        });


        /* Pachet ales anterior */

        try {

            const selections =
                JSON.parse(
                    sessionStorage.getItem(
                        "photoBoothSelections"
                    )
                ) || {};


            if (
                selections.package &&
                selections.package.id
            ) {

                packageField.value =
                    selections.package.id;

            }

        } catch (error) {

            console.warn(
                "Nu am putut citi pachetul salvat.",
                error
            );

        }

    }


    /* =========================
       SUBMIT FORMULAR
    ========================= */

    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        /* Validare HTML */

        if (!form.checkValidity()) {

            form.reportValidity();

            return;

        }


        /* Verificăm configurarea */

        if (
            typeof CONFIG === "undefined" ||
            !CONFIG.googleScriptUrl
        ) {

            showError(
                "Formularul nu este configurat momentan."
            );

            console.error(
                "CONFIG.googleScriptUrl lipsește."
            );

            return;

        }


        const formData =
            new FormData(form);


        /* Honeypot */

        if (formData.get("website")) {

            showSuccess(
                "Cererea a fost trimisă."
            );

            return;

        }


        /* =========================
           BUTON - LOADING
        ========================= */

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Se trimite...";

        }


        status.className =
            "form-status sending";

        status.textContent =
            "Trimitem cererea...";


        /* =========================
           DEBUG
        ========================= */

        console.log(
            "Apps Script URL:",
            CONFIG.googleScriptUrl
        );

        console.log(
            "Date trimise:",
            Object.fromEntries(
                formData.entries()
            )
        );


        /* =========================
           POST CATRE APPS SCRIPT
        ========================= */

        try {

            await fetch(
                CONFIG.googleScriptUrl,
                {
                    method: "POST",

                    mode: "no-cors",

                    body: formData
                }
            );


            showSuccess(
                "Cererea a fost trimisă cu succes! 📸"
            );


            /* =========================
               WHATSAPP PE TELEFON
            ========================= */

            if (isMobileDevice()) {

                openWhatsApp(formData);

            }


            /*
             * Resetăm după ce am construit
             * mesajul pentru WhatsApp.
             */

            form.reset();


        } catch (error) {

            console.error(
                "Eroare la trimiterea formularului:",
                error
            );


            showError(
                "Nu am putut trimite cererea. Încearcă din nou."
            );

        } finally {

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Cere oferta";

            }

        }

    });



    /* =========================
       SUCCESS / ERROR
    ========================= */

    function showSuccess(message) {

        status.textContent =
            message;

        status.className =
            "form-status success";

    }


    function showError(message) {

        status.textContent =
            message;

        status.className =
            "form-status error";

    }



    /* =========================
       TELEFON
    ========================= */

    function isMobileDevice() {

        return window.matchMedia(
            "(max-width: 768px)"
        ).matches;

    }



    /* =========================
       WHATSAPP
    ========================= */

    function openWhatsApp(formData) {

        if (
            !CONFIG.business ||
            !CONFIG.business.whatsapp
        ) {
            return;
        }


        const whatsappNumber =
            CONFIG.business.whatsapp;


        const name =
            formData.get("name") || "";

        const phone =
            formData.get("phone") || "";

        const email =
            formData.get("email") || "";

        const eventType =
            formData.get("eventType") || "";

        const eventDate =
            formData.get("eventDate") || "";

        const location =
            formData.get("location") || "";

        const packageId =
            formData.get("package") || "";

        const message =
            formData.get("message") || "";


        /* Numele pachetului */

        let packageName =
            packageId;


        if (
            Array.isArray(CONFIG.packages)
        ) {

            const selectedPackage =
                CONFIG.packages.find(
                    (item) =>
                        item.id === packageId
                );


            if (selectedPackage) {

                packageName =
                    selectedPackage.name;

            }

        }


        /* Mesaj */

        const whatsappMessage = [

            "Bună! 👋",

            "",

            "Tocmai am completat formularul pentru cabina foto.",

            "",

            `Nume: ${name}`,

            `Telefon: ${phone}`,

            `Email: ${email || "-"}`,

            `Eveniment: ${eventType}`,

            `Data: ${eventDate || "Nespecificată"}`,

            `Locație: ${location}`,

            `Pachet: ${packageName || "Nespecificat"}`,

            "",

            "Mesaj:",

            message || "-"

        ].join("\n");


        /* URL WhatsApp CORECT */

        const whatsappUrl =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(
                whatsappMessage
            );


        /*
         * Dăm puțin timp requestului
         * către Apps Script să pornească.
         */

        setTimeout(() => {

            window.location.href =
                whatsappUrl;

        }, 700);

    }

});
