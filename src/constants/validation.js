export default ({
    optionsByTypeValidation: {
        REQUIRED: { min: 1 },
        PASSWORD_WEAK: { regex: "([0-9a-zAz]){6,}" },
        PASSWORD_STRONGER: {
            regex: [
                "([#$@%&*]){1,}",
                "([a-z]){1,}",
                "([A-Z]){1,}",
                "([0-9a-zA-Z]){9,}"
            ]
        },
    },

    labelValidation: {
        REQUIRED: "Validar obrigatóriedade",
        EMAIL: "Validar email",
        DATE: "Validar data",
        PASSWORD_WEAK: "Validar senha de forma fraca",
        PASSWORD_STRONGER: "Validar senha de forma forte"
    }
})