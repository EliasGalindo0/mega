// components/Loading.js

import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Image src={"/loading.gif"} alt={"loading"} width={500} height={500} />
    </div>
  );
};

export default Loading;
