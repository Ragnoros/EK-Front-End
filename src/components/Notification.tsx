import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteUserById, getUserMatchesById } from "../api";
import { Link } from "react-router-dom";

type NotifcationProps = {
  user: {
    username: string;
  };
};

type NotificationsState = {
  match_img_string: string;
  match_item_name: string;
  match_user_name: string;
  match_user_id: string;
};

function Notifcation({ user }: NotifcationProps) {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [notifications, setNotifications] = useState<NotificationsState[]>([]);
  const userId = localStorage.getItem("user_id") ?? "";

  function signOut() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  const dialog = document.getElementById(
    "settings"
  ) as HTMLDialogElement | null;

  const notificationTooltip = { tooltip: "Notifications" };
  const settingsTooltip = { tooltip: "Settings" };
  const signOutTooltip = { tooltip: "Sign out" };

  function deleteUser(userId: string) {
    deleteUserById(userId).then(() => {
      localStorage.clear();
      isLoggedIn(false);
    });
  }

  useEffect(() => {
    let intervalId;

    const fetchMatches = async () => {
      if (userId) {
        try {
          const match = await getUserMatchesById(userId);
          setNotifications(match);
        } catch (error) {
          console.error("Error fetching matches:", error);
        }
      }
    };

    fetchMatches();

    intervalId = setInterval(fetchMatches, 1000);

    return () => clearInterval(intervalId);
  }, [userId]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <p>Signed in as {user?.username}</p>
          <input type="checkbox" name="" id="notification" />
          <div>
            <label
              htmlFor="notification"
              className="btn btn--icon"
              aria-label="notifications"
              {...notificationTooltip}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z" />
              </svg>
              {notifications.length < 1 ? null : (
                <span className="btn__badge">{notifications.length}</span>
              )}
            </label>
            <button
              className="btn btn--icon"
              onClick={() => dialog?.showModal()}
              aria-label="settings"
              {...settingsTooltip}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z" />
              </svg>
            </button>
            <button
              onClick={signOut}
              className="btn btn--icon"
              aria-label="sign out"
              {...signOutTooltip}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
            </button>
          </div>

          <ul className="site-header__notification-list">
            {notifications.length < 1 ? (
              <li>
                <p>No Notifications</p>
              </li>
            ) : (
              notifications.map((match, i) => (
                <li key={i} className="site-header__notification-item">
                  <Link to={`trades/${userId}/${match.match_user_id}`}>
                    <img src={match?.match_img_string} alt="" />
                    <p>{match?.match_item_name}</p>
                    <p>{match?.match_user_name}</p>
                  </Link>
                </li>
              ))
            )}
          </ul>
          <dialog id="settings">
            <header>
              <h2>Settings</h2>
            </header>
            <ul>
              <li>
                <button onClick={() => deleteUser(userId)}>
                  Delete account
                </button>
              </li>
            </ul>
            <footer>
              <button onClick={() => dialog?.close()} className="btn--text">
                Cancel
              </button>
              <button className="btn--text">Save</button>
            </footer>
          </dialog>
        </>
      ) : null}
    </>
  );
}

export default Notifcation;
