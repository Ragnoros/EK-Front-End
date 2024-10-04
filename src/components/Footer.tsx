import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="w-full	grid place-items-center h-16">
        <p className="">Code Kings &copy; {new Date().getFullYear()}</p>
        <Link to="/terms">Terms & conditions</Link>
      </footer>
    </>
  );
}

export default Footer;
