"use client";

import { useEffect } from "react";

const TARGET = "/Personal-Website/";

export default function NotFound() {
  useEffect(() => {
    window.location.replace(TARGET);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 text-center">
      <p>
        Redirecting to <a href={TARGET}>{TARGET}</a>...
      </p>
    </main>
  );
}
