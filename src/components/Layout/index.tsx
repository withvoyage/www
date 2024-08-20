import {
  LucideIcon,
  ShipWheel,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  cn,
} from 'slate-ui'
import { ButtonProps } from 'slate-ui/dist/cjs/components/Button/Button.types'

export function SplashCTAButton({
  className,
  cta = 'Join Beta',
  icon = ShipWheel,
  ...rest
}: ButtonProps & { cta?: string; icon?: LucideIcon }) {
  return (
    <Button
      variant="primary"
      className={cn('w-fit gap-2', className)}
      onClick={() => {
        window.open('https://cal.com/bryan-houlton-5uvxqc/beta-onboarding', '_blank')
      }}
      iconLeft={icon}
      {...rest}
    >
      {cta}
    </Button>
  )
}

export function SplashWrapper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Voyage - Website Marketing</title>
        <meta
          name="description"
          content="Voyage is a website marketing platform that helps you build, test, and optimize your website for better performance
          and higher conversions."
        />
      </Helmet>

      <div className="flex flex-col w-screen max-w-screen min-h-screen items-center">
        <div className="flex justify-between p-4 h-16 fixed top-0 right-0 left-0 z-50 bg-white border-b">
          <div className="flex gap-1 items-center">
            <Button variant="subtle" onClick={() => navigate('/')} className="px-2 mr-4">
              <ShipWheel size={24} strokeWidth={1.4} />
              <span className="font-bold">voyage</span>
            </Button>

            {[
              {
                text: 'Pricing',
                href: '/#pricing',
              },
              {
                text: 'Handbook',
                href: '/handbook/company/what-we-believe',
              },
            ].map((item) => (
              <a href={item.href} key={item.href} className="hidden md:block">
                <Button variant="subtle">{item.text}</Button>
              </a>
            ))}
          </div>

          <SplashCTAButton />
        </div>

        <div className="my-16 w-full flex-1 max-w-screen flex flex-col">{children}</div>

        <footer className="flex justify-between items-center w-screen h-16 bg-white p-4 border-t">
          <span className="text-xs text-muted w-1/3">© 2024 Pylon Solutions, Co. All rights reserved.</span>

          <div className="hidden md:block text-xs text-muted text-center w-1/3">Built with ❤️ in San Francisco, CA</div>

          <div className="flex gap-4 w-1/3 justify-end">
            <Button variant="subtle" onClick={() => navigate('/privacy')}>
              Privacy
            </Button>
            <Button variant="subtle" onClick={() => navigate('/terms')}>
              Terms
            </Button>
          </div>
        </footer>
      </div>
    </>
  )
}
