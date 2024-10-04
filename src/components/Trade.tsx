import { useEffect } from "react";
import { trade } from "../api";
import { useParams } from "react-router-dom";

function Trade() {
  const { user_id, their_user_id } = useParams<{
    their_user_id: string;
    user_id: string;
  }>();
  // const [matches, setMatches] = useState([]);
  useEffect(() => {
    if (user_id && their_user_id) {
      trade(user_id, their_user_id).then((trade) => {
        console.log(trade);
      });
    }
  }, [user_id, their_user_id]);

  return (
    <>
      <main>
        <button>Accept</button>
        <button>Reject</button>
      </main>
    </>
  );
}

export default Trade;
