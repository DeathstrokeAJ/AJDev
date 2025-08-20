// app/blog/page.tsx
import { Metadata } from 'next'
import NerdNotesPage from '@/components/nerd-notes'

export const metadata: Metadata = {
  title: 'NerdNotes | Adithya Parambil - Developer Blog',
  description: 'Technical insights, coding adventures, and developer thoughts from Adithya Parambil',
  openGraph: {
    title: 'NerdNotes - Developer Blog',
    description: 'Technical insights and coding adventures',
    type: 'website',
  },
}

export default function BlogPage() {
  return <NerdNotesPage />
}