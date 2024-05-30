import React from "react";

import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <div>404 Page Not Found</div>
      <Link to="/">Home</Link>
    </div>
  );
}

export default NotFoundPage;
