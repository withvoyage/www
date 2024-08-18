import {
  ArrowLeft,
  ShipWheel,
} from 'lucide-react';
import { Button } from 'slate-ui';

export function PageNotFound() {
  return (
    <div className="bg-gray-50 w-screen gap-2 h-screen flex flex-col items-center justify-center">
      <ShipWheel size={96} strokeWidth={1.5} />
      <h1>404</h1>
      <p>Page not found</p>
      <Button
        onClick={() => window.history.back()}
        className="mt-3"
        iconLeft={ArrowLeft}
      >
        Go back
      </Button>
    </div>
  );
}
