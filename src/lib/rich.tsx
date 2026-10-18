import { Fragment } from 'react'

/** Renders **bold** segments in a content string. */
export function Rich({ text }: { text: string }) {
  return text
    .split('**')
    .map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i}>{part}</strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    )
}
