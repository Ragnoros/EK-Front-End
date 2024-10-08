import Logo from "../assets/crown-logo.png";
import { useEffect, useState, useContext, ReactNode } from "react";
import { getAllUsers, getUserByUsername } from "../api";
import { UserContext } from "../contexts/User";
import AddItem from "./AddItem";

type UsersState = {
  username: string;
};

type HomeProps = {
  children: ReactNode;
  user: {};
};

function Home({ children, user }: HomeProps) {
  const [users, setUsers] = useState<UsersState[]>([]);
  const [username, setUsername] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  useEffect(() => {
    getAllUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const msg = document.getElementById("err-msg") as HTMLParagraphElement;
    const form = e.target as HTMLFormElement;
    const usernameInput = form.elements.namedItem(
      "username"
    ) as HTMLInputElement;
    const username = usernameInput.value;
    console.log(username);
    getUserByUsername(username)
      .then((user) => {
        console.log(user);
        msg.textContent = "";
        localStorage.setItem("user_id", user._id);
        setIsLoggedIn(true);
        setUsername("");
      })
      .catch((err) => {
        msg.textContent = "Invalid Username";
      });
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          {children}
          <AddItem user={user} />
        </>
      ) : (
        <>
          <main className="main-home">
            <img src={Logo} alt="" />
            <form onSubmit={(event) => login(event)}>
              <input
                type="text"
                name="username"
                value={username}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(event.target.value)
                }
                placeholder="Enter username"
              />
              <p id="err-msg"></p>
              <button className="btn">Sign in</button>
            </form>
            <p>Usernames</p>
            <ul>
              {users?.map((user, i) => (
                <li key={i}>{user.username}</li>
              ))}
            </ul>
          </main>
        </>
      )}
    </>
  );
}

export default Home;
