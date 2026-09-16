export type FaqEntry = {
  id: string
  question: string
  answer: string
}

export const faqEntries: FaqEntry[] = [
  {
    id: 'why-seo',
    question: 'Why is SEO important?',
    answer:
      'Most of your future customers are searching on their phones before they ever call or walk in. SEO makes sure your business shows up in those local searches - on Google and in your Google Business Profile - instead of a competitor down the road. Without it, a great-looking website can still stay invisible.',
  },
  {
    id: 'why-not-diy',
    question: 'Why not make the website on your own?',
    answer:
      'You could, but it takes real time to learn the tools, write the content, and keep everything secure and up to date. We handle the technical details, from hosting to SEO, so you can spend that time running your business. You get a professional result vetted by a software engineer, without the learning curve.',
  },
  {
    id: 'process',
    question: 'What does the process look like?',
    answer:
      'We start by building a live preview of your website, often before we even meet, so you can see real value right away. From there we review it together, make revisions based on your feedback, and launch once you are happy with it. After launch, we can keep your site updated through an ongoing care plan.',
  },
  {
    id: 'timeline',
    question: 'How quickly can I expect my website to be completed?',
    answer:
      'Many simple sites can launch the same day once you approve the preview. More custom builds typically take one to two weeks depending on content, revisions, and the scope of the project - and more complex solutions can take longer.',
  },
]
