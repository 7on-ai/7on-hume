import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";

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
    <div className={"grow flex flex-col relative"}>
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 z-0 bg-black">
        <MatrixRain />
      </div>
      
      {/* Chat Interface - ทับอยู่ด้านบน */}
      <div className="relative z-10">
        <Chat accessToken={accessToken} />
      </div>
    </div>
  );
}
