export const registered = {
    required: ["email", "password"],
    pattern: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, // min 6 char, 1 letter + 1 number
    }
};

export const customer = {
    required: ["name", "email"],
    pattern: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
};