'use server'

import { cookies } from 'next/headers'

export type Theme = 'light' | 'dark'

export async function toggleTheme() {
    const cookieStore = await cookies()
    const currentTheme = cookieStore.get('theme')
    const newTheme = currentTheme?.value === 'dark' ? 'light' : 'dark'
    
    cookieStore.set({
        name: "theme",
        value: newTheme,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    })

    return newTheme
}

export async function getTheme(): Promise<Theme> {
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')?.value ?? 'dark';
    return theme as Theme;
}