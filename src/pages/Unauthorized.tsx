import { Link } from "react-router";

function Unauthorized() {
  return (
    <div>
      <h1>Loser!!! Not authorized</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
export default Unauthorized;
