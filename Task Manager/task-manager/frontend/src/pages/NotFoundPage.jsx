import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div>
      <p>
        No task found!! Please got to the <Link to="/">Home page</Link>
      </p>
    </div>
  );
}
