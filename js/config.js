/* =========================
   CONFIGURARE SITE
========================= */

const CONFIG = {
   
    googleScriptUrl:"https://script.google.com/macros/s/AKfycbzXf-sPfHLA6ZikTzFpb4cRPLrXJU7SypvwPwVuyx-_jpiaTMXreVaNBAi0e7oH5N5DwA/exec",
    business: {
        name: "Cabina Foto",
        email: "mandica.alex05@gmail.com",
        whatsapp: "40725434875"
       
    },

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
        },
        
        {
            id: "nenumarate",
            name: "Ore nenumarate",
            price: 300,
            popular: false,
            description: "Numa' asa, daca e.",

            features: [
                "Cabină foto timp de 4 ore",
                "Fotografii nelimitate",
                "Template personalizat",
                "Recuzită inclusă",
                "Asistență pe durata evenimentului"
            ]
        }

    ],

    colors: [
        {
            name: "Alb",
            value: "#FFFFFF"
        },
        {
            name: "Negru",
            value: "#1F1F1F"
        },
        {
            name: "Auriu",
            value: "#C6A15B"
        },
        {
            name: "Roz pudrat",
            value: "#D9B8B0"
        },
        {
            name: "Verde",
            value: "#74866B"
        },
        {
            name: "Albastru",
            value: "#738AA3"
        }
    ]

};
