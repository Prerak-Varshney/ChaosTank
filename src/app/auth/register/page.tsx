"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Button from "@/components/Button";
import AuthPanel from "@/components/AuthPanel";
import Input from "@/components/Input";

const RegisterPage = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register(formData);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthPanel
            title="Create Account"
            subtitle="Join ChaosTank to manage your water levels"
            error={error}
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required={true}
                    disabled={loading}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required={true}
                    disabled={loading}
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required={true}
                    disabled={loading}
                />
                <Button loading={loading} buttonName="Register" type="submit" variant="filled" fullWidth />
            </form>
            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/auth/login"
                    className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                    Login
                </Link>
            </p>
        </AuthPanel>
    );
};

export default RegisterPage;