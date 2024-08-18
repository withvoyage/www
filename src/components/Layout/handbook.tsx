import { PropsWithChildren } from 'react'

import { Code2, Crown, HandPlatter, Lightbulb, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ActionIcon, Button } from 'slate-ui'

import { SplashWrapper } from './'

export const SIDEBAR_GROUPS: {
  name: string
  items: { name: string; icon: any; link: string; locked?: boolean; hidden?: boolean }[]
}[] = [
  {
    name: 'Company',
    items: [
      {
        name: 'Who We Are',
        icon: Users,
        link: '/handbook/company/who-we-are',
      },
      {
        name: 'What We Believe',
        icon: Crown,
        link: '/handbook/company/what-we-believe',
      },
      {
        name: 'Who We Serve',
        icon: HandPlatter,
        link: '/handbook/company/who-we-serve',
      },
    ],
  },
  {
    name: 'Product',
    items: [
      {
        name: 'Long Term Vision',
        icon: Lightbulb,
        link: '/handbook/product/long-term-vision',
      },
      {
        name: 'Installation',
        icon: Code2,
        link: '/handbook/product/installation',
      },
    ],
  },
]

export function HandbookLayout({ children }: PropsWithChildren) {
  const navigate = useNavigate()
  return (
    <SplashWrapper>
      <div className="w-screen h-full flex flex-1 items-stretch">
        <div className="fixed bg-muted top-16 bottom-16 left-0 h-full p-3 border-r flex flex-col items-center lg:items-stretch w-16 lg:w-72 gap-2">
          {SIDEBAR_GROUPS.map((group) => (
            <div className="flex flex-col gap-1 w-full" key={group.name}>
              <div className="gap-2 items-center hidden lg:flex w-full pl-2 mt-3">
                <span className="text-sm text-muted">{group.name}</span>
                <hr className="flex-1 border-b-0.5" />
              </div>
              <div className="flex flex-col gap-1 w-full">
                {group.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <div key={item.name} className="flex w-full">
                      <div className="block lg:hidden mx-auto">
                        <ActionIcon
                          className="gap-2"
                          icon={item.icon}
                          disabled={item.locked}
                          variant={window.location.pathname.split('/')[1] === item.link ? 'secondary' : 'subtle'}
                          onClick={() => navigate(item.link)}
                          data-link={item.link}
                        />
                      </div>

                      <Button
                        className={`gap-2 flex-1 hidden lg:flex lg:w-48 ${item.locked ? 'opacity-50' : ''}`}
                        variant={window.location.pathname === item.link ? 'primary' : 'subtle'}
                        iconLeft={item.locked ? Lock : item.icon}
                        disabled={item.locked}
                        onClick={() => navigate(item.link)}
                        data-link={item.link}
                      >
                        {item.name}
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white  ml-16 lg:ml-72 min-w-0 flex-1 rounded-lg p-8 gap-8 overflow-y-auto flex flex-col">
          {children}
        </div>
      </div>
    </SplashWrapper>
  )
}
