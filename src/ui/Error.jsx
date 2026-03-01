import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <h1 className="text-4xl font-bold text-stone-800">
        Something went wrong 😢
      </h1>
      <p className="max-w-md text-center text-lg text-stone-600">
        {error.data || error.message}
      </p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
