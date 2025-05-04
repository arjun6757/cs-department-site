import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [userError, setUserError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/auth/whoami")
                const result = await response.json();

                if (!response.ok && response.status === 401) {
                    setUser(null);
                    setUserError(response.statusText);
                    return;
                }

                setUser(result.data)

            } catch (err) {
                setUserError(err.message || "Error occured while fetching user")
            }
        }

        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, userError, setUserError }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUser = () => {
    return useContext(AuthContext);
}