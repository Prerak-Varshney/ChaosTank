"use client";

import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4 text-center">
            <h1 className="text-9xl font-extrabold tracking-widest text-primary opacity-20 select-none">
                404
            </h1>
            <div className="flex flex-col items-center space-y-6">
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl font-bold tracking-tight">Page Not Found</h2>
                    <p className="text-muted-foreground max-w-[500px]">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                    </p>
                </div>
                <Link href="/">
                    <Button buttonName="Return Home" />
                </Link>
            </div>
        </div>
    );
}
