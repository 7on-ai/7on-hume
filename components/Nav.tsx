"use client";

import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import Sevenon from "./logos/Sevenon";
import pkg from "@/package.json";
import { useTheme } from "next-themes";

export const Nav = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 h-14 bg-black/30 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            window.open(pkg.homepage, "_blank", "noopener noreferrer");
          }}
          variant="ghost"
          className="flex items-center gap-1.5 rounded-full text-green-400 hover:text-green-300 hover:bg-green-400/10"
        >
          <Sevenon className="size-4" />
          <span>Join Waitlist</span>
        </Button>

        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          variant="ghost"
          className="flex items-center gap-1.5 rounded-full text-green-400 hover:text-green-300 hover:bg-green-400/10"
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
          <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
        </Button>
      </div>
    </div>
  );
};
