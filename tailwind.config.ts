/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Primary
                "primary": "#b6c4ff",
                "on-primary": "#00277f",
                "primary-container": "#00206e",
                "on-primary-container": "#6a89f7",
                "primary-fixed": "#dce1ff",
                "primary-fixed-dim": "#b6c4ff",
                "on-primary-fixed": "#001550",
                "on-primary-fixed-variant": "#133ca8",
                "inverse-primary": "#3456c1",

                // Secondary
                "secondary": "#ecffe3",
                "on-secondary": "#003907",
                "secondary-container": "#13ff43",
                "on-secondary-container": "#007117",
                "secondary-fixed": "#72ff70",
                "secondary-fixed-dim": "#00e639",
                "on-secondary-fixed": "#002203",
                "on-secondary-fixed-variant": "#00530e",

                // Tertiary
                "tertiary": "#97ccfe",
                "on-tertiary": "#003353",
                "tertiary-container": "#002b47",
                "on-tertiary-container": "#5f94c4",
                "tertiary-fixed": "#cee5ff",
                "tertiary-fixed-dim": "#97ccfe",
                "on-tertiary-fixed": "#001d32",
                "on-tertiary-fixed-variant": "#004a75",

                // Error
                "error": "#ffb4ab",
                "on-error": "#690005",
                "error-container": "#93000a",
                "on-error-container": "#ffdad6",

                // Surface & Background
                "background": "#111318",
                "on-background": "#e2e2e8",
                "surface": "#111318",
                "on-surface": "#e2e2e8",
                "surface-variant": "#333539",
                "on-surface-variant": "#c5c6d2",
                "surface-tint": "#b6c4ff",
                "surface-dim": "#111318",
                "surface-bright": "#37393e",
                "inverse-surface": "#e2e2e8",
                "inverse-on-surface": "#2f3035",

                // Surface Containers
                "surface-container-lowest": "#0c0e12",
                "surface-container-low": "#1a1c20",
                "surface-container": "#1e2024",
                "surface-container-high": "#282a2e",
                "surface-container-highest": "#333539",

                // Outline
                "outline": "#8e909c",
                "outline-variant": "#444650",
            },
            fontFamily: {
                headline: ["var(--font-space-grotesk)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.125rem",
                lg: "0.25rem",
                xl: "0.5rem",
                full: "0.75rem",
            },
        },
    },
    plugins: [],
};