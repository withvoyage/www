import { SplashWrapper } from './';

export function PricingPage() {
  return (
    <SplashWrapper>
      <div className="h-[90vh] w-full p-16 flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold">Usage-Based Pricing</h1>
        <p className="text-center text-lg max-w-lg">
          Enjoy a sizeable free tier and only pay for what you use.
          <br></br>
          No sales team, no hassle.
        </p>
      </div>
    </SplashWrapper>
  );
}
