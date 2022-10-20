import { useRouteError } from "react-router";

const ErrorBoundary = () => {
  let error = useRouteError();
  console.error(error);
  return (
    <div>
      There was an error rendering this component, check the console for error
      messages.
    </div>
  );
};

export default ErrorBoundary;
