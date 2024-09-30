import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <main>
        <p>Hello</p>
        <Link className="bg-[#7851A9] text-[#FFBC00]" to="/items">
          List Items
        </Link>
      </main>
    </>
  );
}

export default Home;
