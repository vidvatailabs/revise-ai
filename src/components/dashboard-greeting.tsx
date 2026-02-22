"use client";

import { useEffect, useState } from "react";

interface DashboardGreetingProps {
  isReturningUser: boolean;
}

export function DashboardGreeting({ isReturningUser }: DashboardGreetingProps) {
  const [greeting, setGreeting] = useState<string>("Welcome!");

  useEffect(() => {
    // Calculate greeting based on user's local timezone (client-side)
    const hour = new Date().getHours();
    let newGreeting: string;
    
    if (!isReturningUser) {
      newGreeting = "Welcome!";
    } else if (hour >= 5 && hour < 12) {
      newGreeting = "Good morning!";
    } else if (hour >= 12 && hour < 17) {
      newGreeting = "Good afternoon!";
    } else if (hour >= 17 && hour < 21) {
      newGreeting = "Good evening!";
    } else {
      newGreeting = "Midnight hustle!";
    }
    
    setGreeting(newGreeting);
  }, [isReturningUser]);

  return (
    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
      {greeting} {greeting === "Midnight hustle!" ? "🌙" : "👋"}
    </h1>
  );
}
