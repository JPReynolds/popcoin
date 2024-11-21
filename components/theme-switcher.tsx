'use client'

import { Moon, Sun } from "lucide-react"
import { useState, useTransition } from "react"
import { Theme, toggleTheme } from "@/lib/theme"

export function ThemeSwitcher({ initialTheme }: { initialTheme: Theme }) {
    const [theme, setTheme] = useState<Theme>(initialTheme)
    const [isPending, startTransition] = useTransition()

    const handleToggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)

        startTransition(async () => {
            try {
                await toggleTheme()
            } catch (error) {
                setTheme(theme)
                console.error('Theme toggle failed', error)
            }
        })
    }

    return (
        <button
            className="p-2 rounded-md"
            onClick={handleToggleTheme}
            disabled={isPending}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon className="h-5 w-5" />
            ) : (
                <Sun className="h-5 w-5" />
            )}
        </button>
    )
}