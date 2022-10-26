import Image from "next/image";
import React from "react";
import spinner from "../public/loading.gif";

const Spinner = () => {
  return (
    <div>
      <Image className="w-[200px] m-auto block" alt="loading..." src={spinner} />
    </div>
  );
};

export default Spinner;
