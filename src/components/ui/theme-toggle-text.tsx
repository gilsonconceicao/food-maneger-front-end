"use client"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"


export function ThemeToggleText() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <Button variant="outline" onClick={toggleTheme} className="gap-2">
      {theme === "dark" ? (
        <>
          <Sun className="h-4 w-4" />
          Modo Claro
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          Modo Escuro
        </>
      )}
    </Button>
  )
}
