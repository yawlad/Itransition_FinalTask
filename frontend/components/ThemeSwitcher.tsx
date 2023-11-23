"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";


const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Image
      src={theme === "light" ? "/moon.svg" : "/sun.svg"}
      alt={"moon/sun"}
      width={30}
      height={30}
      className="rounded-full scale-[-1] rotate-[20deg] cursor-pointer bg-white p-1 border"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
};
export default ThemeSwitcher