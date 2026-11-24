document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const status = document.getElementById("contactStatus");

    if (!form || !status) {
        return;
    }


    /* =========================
       COMPLETEAZA PACHETUL
       DIN SESSION STORAGE
    ========================= */

    const packageField =
        form.querySelector('[name="package"]');


    if (packageField) {

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
                "Nu am putut citi pachetul selectat."
            );

        }

    }


    /* =========================
       TRIMITERE FORMULAR
    ========================= */

    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        const submitButton =
            form.querySelector(
                'button[type="submit"]'
            );


        /* Dezactivam temporar butonul */

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Se trimite...";

        }


        status.textContent =
            "Trimitem cererea...";


        /* =========================
           DATE FORMULAR
        ========================= */

        const formData =
            new FormData(form);


        /* Honeypot anti-spam */

        const website =
            formData.get("website");


        if (website) {

            status.textContent =
                "Cererea a fost trimisă.";

            resetSubmitButton();

            return;

        }


        /* =========================
           TRIMITERE GOOGLE SHEETS
        ========================= */

        try {

            if (!CONFIG.googleScriptUrl) {

                throw new Error(
                    "Lipsește googleScriptUrl din config.js"
                );

            }


            /*
               no-cors este intenționat.

               GitHub Pages trimite formularul
               către Google Apps Script.
            */

            await fetch(
                CONFIG.googleScriptUrl,
                {
                    method: "POST",

                    mode: "no-cors",

                    body: formData,

                    keepalive: true
                }
            );


            status.textContent =
                "Cererea a fost trimisă cu succes!";


            /* =========================
               WHATSAPP - DOAR TELEFON
            ========================= */

            if (isMobileDevice()) {

                openWhatsApp(formData);

            }


        } catch (error) {

            console.error(
                "Eroare formular:",
                error
            );


            status.textContent =
                "Nu am putut trimite cererea. Te rugăm să încerci din nou.";


            resetSubmitButton();

            return;

        }


        resetSubmitButton();


        /* =========================
           RESET FORMULAR
        ========================= */

        /*
           Nu facem reset imediat pe telefon
           înainte de construirea mesajului WhatsApp.

           Mesajul a fost deja construit
           în openWhatsApp().
        */

        form.reset();

    });



    /* =========================
       RESET BUTON
    ========================= */

    function resetSubmitButton() {

        if (!submitButtonExists()) {
            return;
        }


        const button =
            form.querySelector(
                'button[type="submit"]'
            );


        button.disabled = false;

        button.textContent =
            "Cere oferta";

    }


    function submitButtonExists() {

        return Boolean(
            form.querySelector(
                'button[type="submit"]'
            )
        );

    }



    /* =========================
       DETECTARE TELEFON
    ========================= */

    function isMobileDevice() {

        return (
            window.matchMedia(
                "(max-width: 768px)"
            ).matches
        );

    }



    /* =========================
       WHATSAPP
    ========================= */

    function openWhatsApp(formData) {

        const whatsappNumber =
            CONFIG.business.whatsapp;


        if (!whatsappNumber) {
            return;
        }


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


        /* Gasim numele pachetului */

        let packageName =
            packageId;


        if (
            typeof CONFIG !== "undefined" &&
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


        /* =========================
           MESAJ WHATSAPP
        ========================= */

        const whatsappMessage = [
            "Bună! 👋",
            "",
            "Tocmai am completat formularul pentru cabina foto.",
            "",
            `Nume: ${name}`,
            `Telefon: ${phone}`,
            `Email: ${email}`,
            `Eveniment: ${eventType}`,
            `Data: ${eventDate || "Nespecificată"}`,
            `Locație: ${location || "Nespecificată"}`,
            `Pachet: ${packageName || "Nespecificat"}`,
            "",
            "Mesaj:",
            message || "-"
        ].join("\n");


        const whatsappUrl =
            `https://wa.me/${whatsappNumber}` +
            `?text=${encodeURIComponent(
                whatsappMessage
            )}`;


        /*
           Mică întârziere pentru ca browserul
           să pornească cererea către Apps Script
           înainte să deschidă WhatsApp.
        */

        setTimeout(() => {

            window.location.href =
                whatsappUrl;

        }, 500);

    }

});
