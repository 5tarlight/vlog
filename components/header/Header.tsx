import Link from "next/link";
import LightBulb from "./LightBulb";

const Header = () => {
  return (
    <header className="flex h-16 justify-center border-b-gray-200 border-b-2 mb-16 w-full">
      <div className="w-full max-w-[1200px] flex justify-between h-full items-center px-4">
        <h1 className="text-[2rem]">
          <Link href="/" className="text-black select-none">
            YEAHx4
          </Link>
        </h1>
        {/* <div>2</div> */}
        <div>
          <LightBulb />
        </div>
      </div>
    </header>
  );
};

export default Header;
