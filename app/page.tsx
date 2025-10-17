import dynamic from "next/dynamic";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

const MatrixRain = dynamic(() => import("@/components/matrix-rain"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error('Unable to get access token');
  }

  return (
    <>
      {/* Matrix Rain Background - Fixed position, lowest z-index */}
      <MatrixRain />
      
      {/* Chat Interface - Relative position, higher z-index */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto'
      }}>
        <Chat accessToken={accessToken} />
      </div>
    </>
  );
}
