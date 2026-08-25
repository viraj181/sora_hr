import ComingSoon from "@/image/ComingSoon.png";

import Image from "next/image";

const Dashboard = () => {
  return (
    <>
      <div className="p-4 flex-1">
        <div className="min-h-full bg-white flex items-center justify-center border border-borderLine rounded-lg">
          <Image
            src={ComingSoon}
            alt="Coming Soon"
            width={0}
            height={0}
            className="w-full max-w-140"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;