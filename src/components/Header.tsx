import { ReactNode } from "react";
import { Link } from "react-router-dom";

type HeaderProps = {
  children: ReactNode
}

function Header({children}:HeaderProps) {
  return (
    <>
      <header className="site-header">
        <Link to="/">
          <h1 className="">Exchange Kings</h1>
        </Link>
        {children}
      </header>
    </>
  );
}

export default Header;
