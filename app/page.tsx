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
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Matrix Rain Background - z-0 */}
      <div className="absolute inset-0 z-0">
        <MatrixRain />
      </div>
      
      {/* Chat Interface - z-10 */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <Chat accessToken={accessToken} />
      </div>
    </div>
  );
}
