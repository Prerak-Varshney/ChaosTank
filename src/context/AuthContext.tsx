"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, { credentials: "include" });
            const data = await res.json();
            if (data.status === "success") {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (formData: LoginData) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            let data;
            try {
                data = await res.json();
            } catch (err) {
                throw new Error(`Server Error: ${res.status} ${res.statusText}`);
            }

            if (data.status === "success") {
                await checkAuth();
                router.push("/");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    };

    const register = async (formData: RegisterData) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            let data;
            try {
                data = await res.json();
            } catch (err) {
                throw new Error(`Server Error: ${res.status} ${res.statusText}`);
            }

            if (data.status === "success") {
                await checkAuth();
                router.push("/");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch("/api/v1/logout", { method: "POST", credentials: "include" });
            setUser(null);
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
