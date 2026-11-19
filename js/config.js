/* =========================
   CONFIGURARE SITE
========================= */

const CONFIG = {

    packages: [

        {
            id: "2-ore",
            name: "2 ore",
            price: 800,
            description: "Perfect pentru evenimente mai restrânse.",
            features: [
                "Cabină foto timp de 2 ore",
                "Fotografii nelimitate",
                "Template personalizat",
                "Recuzită inclusă",
                "Asistență pe durata evenimentului"
            ]
        },

        {
            id: "4-ore",
            name: "4 ore",
            price: 1200,
            popular: true,
            description: "Cea mai bună alegere pentru o petrecere completă.",
            features: [
                "Cabină foto timp de 4 ore",
                "Fotografii nelimitate",
                "Template personalizat",
                "Recuzită inclusă",
                "Asistență pe durata evenimentului"
            ]
        },

        {
            id: "personalizat",
            name: "Personalizat",
            price: null,
            description: "Pentru evenimente cu cerințe speciale.",
            features: [
                "Durată personalizată",
                "Template personalizat",
                "Recuzită inclusă",
                "Opțiuni adaptate evenimentului",
                "Ofertă personalizată"
            ]
        }

    ]

};
