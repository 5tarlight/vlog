import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <header>
      <Link href="/" className="header-logo">
        YEAHx4 Blog
      </Link>
      <div className="search-icon">
        <a href="/search">
          <FaSearch />
        </a>
      </div>
    </header>
  );
}
