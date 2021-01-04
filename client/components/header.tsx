import Link from "next/link";

 function Header({ currentUser }) {
  const links = [
    !currentUser && { label: "Sign up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
        return (
          <li key={href} className="nav-item">
            <Link href={href}>
              <a href="" className="nav-link">{label}</a>
            </Link>
          </li>
        );
    });
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">NiTex</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-item-center">{links}</ul>
      </div>
    </nav>
  );
}

export default Header;