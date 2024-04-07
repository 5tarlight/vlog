import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center items-center mt-16 p-4">
      <div className="border-t-gray-300 w-full border-t-2 max-w-[1024px] flex justify-between items-center h-32 md:px-16 px-2">
        <div>
          &copy; 2024. <b>YEAHx4</b> all rights reserved.
        </div>
        <div className="text-[2rem]">
          <a
            href="https://github.com/5tarlight"
            target="_blank"
            className="text-black"
          >
            <FaGithubSquare />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
