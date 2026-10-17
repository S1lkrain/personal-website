import { site } from './content/site'

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-4 text-center">
      <h1 className="text-4xl font-bold">{site.name}</h1>
      <p className="text-neutral-500">{site.subtitle}</p>
      <p className="mt-6 text-sm text-neutral-400">Site under construction</p>
    </main>
  )
}
