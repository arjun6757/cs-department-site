import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(undefined);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    "http://localhost:3000/api/auth/whoami",
                    { credentials: "include" },
                );
                const result = await response.json();

                if (!response.ok && response.status === 401) {
                    setUser(null);
                    setError(response.statusText);
                    return;
                }

                setUser(result.data);
            } catch (err) {
                setError(err.message || "Error occured while fetching user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            setError("");
        }
    }, [user]);

    return (
        <AuthContext.Provider
            value={{ user, setUser, error, setError, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useUser = () => {
    return useContext(AuthContext);
};
