// src/app.d.ts
declare global {
    namespace App {
        interface Locals {
            user: {
                token: string;
                id: string;
                name: string;
                email: string;
                isActive: boolean;
                roles: string[];
                group: { id: string; name: string };
                account: { id: string; name: string };
                warehouses:any[]
            } | null;
        }

        interface PageData {
            user: App.Locals['user']; // ← disponible en $page.data.user
        }
    }
}

export {};


