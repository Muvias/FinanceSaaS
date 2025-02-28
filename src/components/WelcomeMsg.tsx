'use client'

import { useUser } from "@clerk/nextjs"

export function WelcomeMsg() {
    const { isLoaded, user } = useUser();

    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-4xl font-medium text-white">Bem-vindo de volta{isLoaded ? ", " : " "}{user?.firstName} 🤗</h2>

            <p className="text-sm lg:text-base text-[#89b6fd]">Este é o seu relatório financeiro geral</p>
        </div>
    )
}
