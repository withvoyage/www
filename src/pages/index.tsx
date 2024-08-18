import { HTMLProps } from 'react'

import { FlaskRound, LocateFixed, LucideIcon, ShipWheel } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Button, cn, Icon } from 'slate-ui'
import { ButtonProps } from 'slate-ui/dist/cjs/components/Button/Button.types'

import { getRandomColor } from '@utils/colors'

const series = Array.from({ length: 3 }, (_, i) => ({
  name: 'Variant ' + i,
  data: Array.from({ length: 10 }, (_, i) => ({
    category: i,
    value: Math.random(),
  })),
}))

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
        window.open('https://cal.com/bryan-houlton-5uvxqc/voyage-beta', '_blank')
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

      <div className="flex flex-col w-screen min-h-screen items-center gap-4">
        <div className="flex justify-between p-4 fixed top-0 right-0 left-0 z-50 bg-white border-b">
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
            ].map((item) => (
              <a href={item.href} key={item.href} className="hidden md:block">
                <Button variant="subtle">{item.text}</Button>
              </a>
            ))}
          </div>

          <SplashCTAButton />
        </div>

        {children}

        <footer className="flex justify-between items-center w-full p-4 border-t">
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

export function TabContent({ children, className, ...rest }: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex rounded-lg justify-center gap-4 px-4 sm:px-8 md:px-16 min-h-[50vh] bg-gray-100 items-center',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function SplashPage() {
  return (
    <SplashWrapper>
      <div className="flex flex-col items-center gap-4 mt-64 mb-32 px-4 sm:px-8 md:px-16">
        <h1 className="text-5xl font-bold text-center z-10">Evolve your landing page.</h1>
        <p className="text-lg text-center z-10">
          Voyage automatically splits your visitors into customer segments,<br></br>then tests variants of copy and CTAs
          for each segment.
        </p>
        <SplashCTAButton className="z-10" />
        <div className="absolute hidden md:flex top-16 left-0 -translate-x-8 -right-16 aspect-video z-0 opacity-20">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={400} height={300}>
              <XAxis dataKey="category" hide type="category" allowDuplicatedCategory={false} />
              <YAxis dataKey="value" hide />
              {series.map((s) => (
                <Line
                  dataKey="value"
                  data={s.data}
                  name={s.name}
                  key={s.name}
                  type="monotone"
                  stroke={getRandomColor()}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="min-h-[90vh] mt-64 w-full p-16 flex text-center flex-col items-center gap-2" id="pricing">
        <h1 className="text-4xl font-bold">Usage-Based Pricing</h1>
        <p className="text-center text-lg max-w-lg">
          Enjoy a sizeable monthly free tier and only pay for what you use.
          <br></br>
          No sales team, no hassle.
        </p>
        <SplashCTAButton className="mt-8" />

        <div className="flex flex-col items-center gap-4 mt-4">
          {[
            {
              name: 'Simple Pricing',
              items: [
                {
                  icon: LocateFixed,
                  title: 'Website Reveal',
                  text: '250 reveals per month free, then $0.25 per reveal',
                  cta: 'Start Revealing',
                  iconCta: LocateFixed,
                },
                {
                  icon: FlaskRound,
                  title: 'Evolution',
                  text: '1,000 visitors per month free, then $25 per 1,000 visitors',
                  cta: 'Evolve your Site',
                  iconCta: FlaskRound,
                },
              ],
            },
          ].map(({ name, items }) => (
            <div className="flex flex-col gap-4 w-fit" key={name}>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 border-b" />
                <span className="text-sm uppercase text-muted">{name}</span>
                <div className="flex-1 border-b" />
              </div>
              <div className="flex gap-4 flex-wrap justify-center">
                {items.map((item) => (
                  <div className="flex flex-col border bg-muted rounded p-4 gap-2 w-96" key={item.title}>
                    <div className="flex gap-2 items-center">
                      <Icon icon={item.icon} variant="subtle" />
                      <h1 className="text-lg font-bold">{item.title}</h1>
                    </div>
                    <p className="text-muted flex-1 text-left">{item.text}</p>
                    <SplashCTAButton cta={item.cta} icon={item.iconCta} className="ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SplashWrapper>
  )
}
