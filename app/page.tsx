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
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#000'
    }}>
      {/* Matrix Rain Background - Layer 0 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <MatrixRain />
      </div>
      
      {/* Chat Interface - Layer 10 */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Chat accessToken={accessToken} />
      </div>
    </div>
  );
}
