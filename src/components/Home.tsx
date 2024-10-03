import { Link } from "react-router-dom";
import Logo from "../assets/crown-logo.png"
function Home() {
  return (
    <>
      <main className="main-home">
        <img src={Logo} alt="" />
        <form action=""><input type="text" placeholder="Enter username" /></form>

        <Link className="btn" to="/items">
          Enter site
        </Link>
      </main>
    </>
  );
}

export default Home;
