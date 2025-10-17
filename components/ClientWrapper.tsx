"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Chat from "./Chat";

const MatrixRain = dynamic(() => import("./matrix-rain"), {
  ssr: false,
  loading: () => null
});

export default function ClientWrapper({ accessToken }: { accessToken: string }) {
  return (
    <>
      <Suspense fallback={null}>
        <MatrixRain />
      </Suspense>
      
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Chat accessToken={accessToken} />
      </div>
    </>
  );
}
