import React, { useEffect, useState } from 'react'

import { GitPullRequest } from 'lucide-react'
import Markdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import remarkBreaks from 'remark-breaks'
import { Button } from 'slate-ui'

import { HandbookLayout } from '@components/Layout/handbook'

const kebabToTitle = (str: string) => {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function HandbookPage() {
  const { '*': page } = useParams()
  const [content, setContent] = useState('')

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

    loadMarkdown()
  }, [page])

  return (
    <HandbookLayout>
      {page && (
        <div className="mkdwn">
          <h1>{kebabToTitle(page.split('/').at(-1) || '')}</h1>
          <span className="text-muted text-sm flex gap-2 items-center">
            Last Updated: {new Date().toLocaleDateString()}
            <span>|</span>
            <a href="https:// ">
              <Button size="sm" variant="secondary" iconLeft={GitPullRequest}>
                Make an edit
              </Button>
            </a>
          </span>

          <Markdown remarkPlugins={[remarkBreaks]}>{content.replace(/\\/gi, '\n')}</Markdown>
        </div>
      )}
    </HandbookLayout>
  )
}
