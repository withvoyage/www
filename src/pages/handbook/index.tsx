import React, { useEffect, useState } from 'react'

import { Construction, GitPullRequest, TriangleAlert } from 'lucide-react'
import Markdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import { Button, Icon } from 'slate-ui'

import { HANDBOOK_SIDEBAR, HandbookLayout } from '@components/Layout/handbook'

type Contributor = {
  avatar_url: string
  login: string
  email: string
  profile_url: string
}

export function HandbookPage() {
  const { '*': page } = useParams()
  const [content, setContent] = useState('')
  const [lastEdited, setLastEdited] = useState<Date | null>(null)
  const [contributors, setContributors] = useState<Contributor[]>([])

  const githubLink = `https://github.com/withvoyage/www/blob/main/public/handbook/${page}.md`

  useEffect(() => {
    const loadMarkdown = async () => {
      if (!page) return
      try {
        const path = '/handbook/' + page + '.md'
        fetch(path)
          .then((res) => res.text())
          .then((text) => {
            setContent(text)
          })
      } catch (err) {
        setContent('# Not Found\nThe requested page was not found.')
      }
    }

    const loadLastEdited = async () => {
      const url = 'https://api.github.com/repos/withvoyage/www/commits?path=public/handbook/' + page + '.md'

      fetch(url)
        .then((response) => response.json())
        .then(async (commits) => {
          if (commits && commits.length > 0) {
            const lastCommit = commits[0]
            const lastEditedTime = lastCommit.commit.author.date
            setLastEdited(new Date(lastEditedTime))

            // @ts-ignore
            const contributors = commits.map((commit) => commit.commit.author)
            const uniqueEmails = new Set(contributors.map((contributor: { email: string }) => contributor.email))

            // Get profile images
            const profiles = await Promise.all(
              [...uniqueEmails].map(async (email) => {
                const url = `https://api.github.com/search/users?q=${email}`
                const response = await fetch(url)
                const profiles = await response.json()
                if (profiles.items.length === 0) return null
                const item = profiles.items[0]
                return {
                  ...item,
                  email,
                  profile_url: item.html_url,
                }
              })
            )

            console.log(profiles)
            setContributors(profiles.filter((profile) => profile !== null))
          }
        })
        .catch((error) => console.error('Error fetching the file data:', error))
    }

    loadLastEdited()
    loadMarkdown()
  }, [page])

  const item = HANDBOOK_SIDEBAR.flatMap((group) => group.items).find((item) => item.link === `/handbook/${page}`)

  return (
    <HandbookLayout>
      {page && (
        <div className="mkdwn">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl !mt-0">{item?.name}</h1>

            {contributors.length > 0 && (
              <div className="hidden md:flex gap-4 items-center border rounded-lg bg-muted p-2">
                <span className="text-sm text-muted">Contributors:</span>
                <div className="flex -gap-4">
                  {contributors.map((contributor) => (
                    <a href={contributor.profile_url} target="_blank">
                      <img
                        key={contributor.email}
                        className="rounded-full h-8 w-8 border"
                        src={contributor.avatar_url}
                        alt={contributor.login}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <span className="text-muted text-sm flex gap-2 items-center">
            Last Updated: {lastEdited ? lastEdited.toDateString() : 'Unknown'}
            <span className="hidden md:d-block">|</span>
            <a href={githubLink} target="_blank" className="hidden md:d-block">
              <Button size="sm" variant="secondary" iconLeft={GitPullRequest}>
                Make an edit
              </Button>
            </a>
          </span>

          {!content.includes('!DOCTYPE') && (
            <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkBreaks]} className="mt-4">
              {content}
            </Markdown>
          )}
        </div>
      )}

      {(!content || content.includes('!DOCTYPE')) && (
        <div className="border rounded-lg bg-muted flex-1 flex flex-col relative p-8 overflow-hidden gap-2">
          <div className="flex items-center gap-2">
            <Icon icon={TriangleAlert} size="lg" />
            <h2>Uh oh!</h2>
          </div>
          <p>Looks like this page doesn't exist yet.</p>
          <p className="flex">
            If you think it should, feel free to{' '}
            <a href={githubLink} target="_blank" className="text-info-700 ml-1">
              <Button size="sm" variant="secondary" iconLeft={GitPullRequest}>
                make a pull request
              </Button>
            </a>
            .
          </p>

          <Construction size={512} strokeWidth={0.5} className="absolute right-0 -bottom-36 text-info-700 opacity-50" />
        </div>
      )}
    </HandbookLayout>
  )
}
