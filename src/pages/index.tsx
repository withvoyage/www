import { HTMLProps } from 'react'

import {
  FlaskRound,
  LocateFixed,
} from 'lucide-react'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import {
  cn,
  Icon,
} from 'slate-ui'

import {
  SplashCTAButton,
  SplashWrapper,
} from '@components/Layout'
import { getRandomBlueishColor } from '@utils/colors'

// Generate a similar set of lines, but they all converge
// to the middle of the possible range of values at the center of
// the x-axis domain.
const flare = 10 // How much the data closer to the ends of the domain should flare out
const amplitude = 1 // How much the data should vary
const length = 15
const numLines = 7
const midpoint = (length - 1) / 2
const clampSpread = 2
const series = Array.from({ length: numLines }, (_, i) => ({
  name: i,
  data: Array.from({ length }, (_, i) => ({
    category: i,
    value:
      Math.abs(i - midpoint) < clampSpread
        ? 0
        : (Math.random() - 0.5) * amplitude * (1 + (flare * Math.abs(i - midpoint)) / midpoint),
  })),
}))
const minPossible = -0.5 * amplitude * (1 + flare)
const maxPossible = 0.5 * amplitude * (1 + flare)

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
      <div className="flex flex-col items-center gap-4 mt-48 mb-32">
        <h1 className="text-5xl font-bold text-center z-10">
          A growth stack <br></br>that grows with you.
        </h1>
        <p className="text-lg text-center z-10">
          Modern marketing tools aren't built for startups.<br></br>Voyage is.
        </p>

        <div className="flex justify-center items-center w-screen py-48 -my-32 relative text-center">
          <SplashCTAButton className="z-10" />
          <div className="absolute  h-full w-full aspect-video z-0 opacity-50">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={400}>
                <XAxis dataKey="category" hide type="category" allowDuplicatedCategory={false} />
                <YAxis dataKey="value" hide domain={[minPossible, maxPossible]} />
                {series.map((s) => (
                  <Line
                    dataKey="value"
                    data={s.data}
                    name={s.name.toString()}
                    key={s.name}
                    dot={false}
                    type="monotone"
                    stroke={getRandomBlueishColor()}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Demo */}
      <iframe
        src="https://capture.navattic.com/clzyv15xo000003jv943s9dfu"
        style={{ aspectRatio: '16 / 9' }}
        className="border-none outline outline-4 outline-offset-2 rounded-lg mx-24 max-h-[80vh] mt-12 hidden lg:block"
        allow="fullscreen"
        id="navattic-embed"
      />

      <div className="w-full p-16 flex text-center flex-col items-center gap-2 my-32" id="pricing">
        <h1 className="text-4xl font-bold">Usage-Based Pricing</h1>
        <p className="text-center text-lg max-w-lg">Usage-based + big free tier.</p>
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
                  title: 'Optimize',
                  text: '1,000 visitors per month free, then $25 per 1,000 visitors',
                  cta: 'Optimize your Messaging',
                  iconCta: FlaskRound,
                },
              ],
            },
          ].map(({ name, items }) => (
            <div className="flex flex-col gap-4 w-fit" key={name}>
              <div className="flex gap-4 mt-4 items-center">
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
