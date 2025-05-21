import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { API } from "../actions/index.js";

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
                    `${API}/auth/whoami`,
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

export const useAuth = () => {
    return useContext(AuthContext);
};
