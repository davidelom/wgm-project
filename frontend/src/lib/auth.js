// Simule une base de données d'utilisateurs
const mockUsers = [
    {
        id: "1",
        email: "admin@example.com",
        password: "admin123", // Ne jamais stocker les mots de passe en clair en production !
        username: "Admin",
        fullName: "Admin User",
    },
];

// Simule un délai réseau
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simule une API d'authentification
export const authApi = {
    async login(email, password) {
        await delay(500); // Simule la latence réseau

        const user = mockUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const token = btoa(
            JSON.stringify({ userId: user.id, email: user.email })
        );

        // Stocke le token dans le localStorage comme un vrai système d'auth
        localStorage.setItem("authToken", token);

        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                fullName: user.fullName,
            },
            token,
        };
    },

    async register(data) {
        await delay(500);

        if (mockUsers.some((u) => u.email === data.email)) {
            throw new Error("Email already exists");
        }

        const newUser = {
            id: String(mockUsers.length + 1),
            ...data,
        };

        mockUsers.push(newUser);

        return this.login(data.email, data.password);
    },

    async logout() {
        await delay(200);
        localStorage.removeItem("authToken");
    },

    async getCurrentUser() {
        const token = localStorage.getItem("authToken");
        if (!token) return null;

        try {
            const { userId } = JSON.parse(atob(token));
            const user = mockUsers.find((u) => u.id === userId);
            if (!user) return null;

            return {
                id: user.id,
                email: user.email,
                username: user.username,
                fullName: user.fullName,
            };
        } catch {
            return null;
        }
    },
};
