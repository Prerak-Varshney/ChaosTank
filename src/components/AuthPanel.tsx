import React from "react";

interface AuthPanelProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    error?: string;
}

const AuthPanel = ({ title, subtitle, children, error }: AuthPanelProps) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary/20 text-foreground p-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-card/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {title}
                    </h2>
                    <p className="text-muted-foreground">{subtitle}</p>
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                {children}
            </div>
        </div>
    );
};

export default AuthPanel;
