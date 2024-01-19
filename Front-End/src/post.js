import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";


export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
   const API_URL= process.env.REACT_APP_API_URL || 'http://localhost:4000'; // Default URL if env variable is not set
  // JSX for rendering the post details
  return (
    <div className="post">
      {/* Link to the individual post page */}
      <div className="image">
        <Link to={`/post/${_id}`}>
          {/* Displaying the post cover image */}
          <img src={`${API_URL}/` + cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        {/* Link to the individual post page with the post title */}
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        {/* Information about the post author and creation time */}
        <p className="info">
          <a className="author">{author.userName}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        {/* Displaying the post summary */}
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
