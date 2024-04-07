"use client";

import { useState } from "react";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";

const LightBulb = () => {
  const [dark, setDark] = useState(false);

  return (
    <div onClick={() => setDark(!dark)} className="text-xl">
      {dark ? <FaRegLightbulb /> : <FaLightbulb />}
    </div>
  );
};

export default LightBulb;
