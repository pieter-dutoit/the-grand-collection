"use client";

import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Button
      isIconOnly
      variant='light'
      aria-label='Dark Mode'
      onClick={() => setTheme(isLight ? "dark" : "light")}
      size='sm'
    >
      {isMounted ? isLight ? <Moon size={20} /> : <Sun size={20} /> : null}
    </Button>
  );
}
