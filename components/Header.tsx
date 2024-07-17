import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <header>
      <a href="/" className="header-logo">
        YEAHx4 Blog
      </a>
      <div className="search-icon">
        <a href="/search">
          <FaSearch />
        </a>
      </div>
    </header>
  );
}
