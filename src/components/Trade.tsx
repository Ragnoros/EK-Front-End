import { useContext, useEffect, useState } from "react";
import { setTrade, trade } from "../api";
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
};

function Trade({ user }: TradeProps) {
  const { isLoggedIn } = useContext(UserContext);
  const { matching_id } = useParams<{ matching_id: string }>();
  const [matches, setMatches] = useState<MatchData[]>([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (matching_id) {
      trade(matching_id).then((trade) => {
        setMatches(trade);
        console.log(trade);
      });
    }
  }, [matching_id]);

  function tradeCheck(match_id: string, bool: boolean) {
    setTrade(match_id, bool).then((tradeData) => {
      console.log(tradeData);
    });
  }

  return (
    <>
      {localStorage.getItem("user_id") ? (
        <>
          <main>
            <section>
              <img src={matches[0]?.match_img_string} alt="" />
              <p>{matches[0]?.match_item_name}</p>
            </section>
            <section>
              <img src={matches[1]?.match_img_string} alt="" />
              <p>{matches[1]?.match_item_name}</p>
            </section>
            <button onClick={() => tradeCheck(matches[0]?._id, true)}>
              Accept
            </button>
            <button onClick={() => tradeCheck(matches[0]?._id, false)}>
              Reject
            </button>
          </main>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Trade;
