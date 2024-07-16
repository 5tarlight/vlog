import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <a href="https://github.com/5tarlight">
          <FaGithub />
        </a>
        <div>&copy; {new Date().getFullYear()} YEAHx4</div>
      </div>
    </footer>
  );
}
