import { useContext, useEffect, useState } from "react";
import { setTrade, trade, tradeSuccess } from "../api";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/User";

type TradeProps = {
  user: {
    username: string;
  };
};

type MatchData = {
  match_img_string: string;
  match_username: string;
  match_item_name: string;
  _id: string;
  settrade: boolean;
  matching_id: string;
};

type AddressData = {
  address: AddressValues[];
};

type AddressValues = {
  street: string;
  city: string;
  post_code: string;
};

function Trade({ user }: TradeProps) {
  const { isLoggedIn } = useContext(UserContext);
  const { matching_id, username } = useParams<{
    matching_id: string;
    username: string;
  }>();
  const [matches, setMatches] = useState<MatchData[]>([]);
  const userId = localStorage.getItem("user_id");
  const [yourItem, setYourItem] = useState(false);
  const [theirItem, setTheirItem] = useState(false);
  const [address, setAddress] = useState<AddressData[]>([]);
  useEffect(() => {
    if (matching_id) {
      trade(matching_id, username).then((trade) => {
        setMatches(trade);
        console.log(trade);
      });
    }
  }, [matching_id]);

  function tradeCheck(_id: string, bool: boolean) {
    setTrade(_id, bool).then((tradeData) => {
      console.log(tradeData);
      matches[0]?.settrade ? setYourItem(true) : setYourItem(false);
      localStorage.setItem(`trade-${matches[0]?.matching_id}`, "true");
    });
  }

  useEffect(() => {
    if (matching_id) {
      tradeSuccess(matching_id).then((tradeData) => {
        console.log(tradeData);
        setAddress(tradeData);
        setTheirItem(true);
      });
    }
  }, [matching_id]);

  const copyAddress = () => {
    const addressText = `${address[1]?.address[0]?.street}, ${address[1]?.address[0]?.city}, ${address[1]?.address[0]?.post_code}`;

    navigator.clipboard
      .writeText(addressText)
      .then(() => {
        console.log("Address copied to clipboard!");
        const copyBtn = document.getElementById(
          "copy-btn"
        ) as HTMLElement | null;
        if (copyBtn) {
          copyBtn.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#e8eaed'><path d='m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z'/></svg>`;
        }
      })
      .catch((err) => {
        console.error("Failed to copy address: ", err);
      });
  };

  const copyTooltip = { tooltip: "Copy" };

  return (
    <>
      {localStorage.getItem("user_id") ? (
        <>
          <main className="main-trade">
            {matches[0]?.settrade === true && matches[1]?.settrade === true ? (
              <>
                <div className="address">
                  <address id="address">
                    <p>{address[1]?.address[0]?.street}</p>
                    <p>{address[1]?.address[0]?.city}</p>
                    <p>{address[1]?.address[0].post_code}</p>
                  </address>
                  <button
                    id="copy-btn"
                    className="btn btn--icon"
                    onClick={copyAddress}
                    {...copyTooltip}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed"
                    >
                      <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                {localStorage.getItem(`trade-${matches[0]?.matching_id}`) ? (
                  <>
                    {matches[0]?.settrade === true ? (
                      <>
                        <h2>Trade accepted</h2>
                      </>
                    ) : (
                      <>
                        <h2>Trade rejected</h2>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <section>
                      <img src={matches[0]?.match_img_string} alt="" />
                      <p>{matches[0]?.match_item_name}</p>
                    </section>
                  </>
                )}
                {theirItem ? (
                  <>
                    {matches[1]?.settrade === true ? (
                      <>
                        <h2>Trade accepted</h2>
                      </>
                    ) : (
                      <>
                        <h2>Trade rejected</h2>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <section>
                      <img src={matches[1]?.match_img_string} alt="" />
                      <p>{matches[1]?.match_item_name}</p>
                    </section>
                  </>
                )}

                <button onClick={() => tradeCheck(matches[0]?._id, true)}>
                  Accept
                </button>
                <button onClick={() => tradeCheck(matches[0]?._id, false)}>
                  Reject
                </button>
              </>
            )}
          </main>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Trade;
