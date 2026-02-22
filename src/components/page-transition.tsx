"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setShow(false);
      // Micro-delay then fade in - keeps it snappy
      const frame = requestAnimationFrame(() => {
        setShow(true);
      });
      prevPathname.current = pathname;
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname]);

  return (
    <div
      className={`transition-opacity duration-150 ease-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
