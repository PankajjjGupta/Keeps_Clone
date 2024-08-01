import { useRouteError } from "react-router-dom";

export function ErrorPage() {

  return (
    <div id="error-page" className="text-white flex flex-col items-center justify-center h-screen">
      <h1>Oops!</h1>
      <p>404 Page Not Found!</p>
    </div>
  );
}