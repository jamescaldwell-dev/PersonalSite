import bristolImage from '../assets/design-foundations/bristol.jpg'
import devonImage from '../assets/design-foundations/DevonSeafood.jpg'
import questImage from '../assets/design-foundations/QOP-optimized.webp'

export type ProjectDetailType = 'technical' | 'non-technical'

export type Project = {
  id: string
  title: string
  subtitle: string
  summary: string
  image: string
  imageAlt: string
  liveUrl?: string
  technologies: string[]
  technicalDetails: string[]
  nonTechnicalDetails: string[]
}

export const projects: Project[] = [
  {
    id: 'quest-outreach-platform',
    title: 'Quest Outreach Platform',
    subtitle: 'Healthcare outreach operations',
    summary:
      'A modular, scalable enterprise-level outreach platform supporting email, fax, phone, and direct mail campaigns for healthcare practice offices with large-volume operational needs.',
    image: questImage,
    imageAlt: 'Quest Outreach Platform project preview',
    technologies: ['C#', 'ASP.NET Core', 'HotChocolate', 'MassTransit', 'T-SQL', 'MongoDB', 'Azure Blob Storage', 'React', 'TypeScript', 'GraphQL', 'React Relay', 'MUI', 'Azure DevOps'],
    technicalDetails: [
      'Worked within a microservices-based architecture built for scale, modularity, and operational resilience in a high-volume outreach environment.',
      'Used GraphQL and React Relay patterns to keep data fetching efficient while maintaining predictable state and performance for front-end work.',
      'Focused on reliability, maintainability, and workflow organization in a system where throughput and process clarity mattered as much as the interface.',
      'Built and refined AI-assisted delivery practices that supported key development tasks such as code reviews, documentation, and test coverage while improving team efficiency and quality.'
    ],
    nonTechnicalDetails: [
      'Strong alignment in Scrum ceremonies can make complex work feel manageable and reduce wasted effort across teams.',
      'I saw how different strengths across a development team can be leveraged to improve speed and quality when the team is organized well.',
      'The balance between process and flexibility is essential when a project is scaling and requirements are evolving.',
      'Good testing strategy and stakeholder understanding can save significant time and reduce risk under delivery pressure.'
    ]
  },
  {
    id: 'bristol-seafood-grill',
    title: 'Bristol Seafood Grill',
    subtitle: 'Upscale restaurant experience',
    summary:
      'A polished multi-location dining website designed to convey a premium atmosphere while making menu and reservation experiences easy to navigate.',
    image: bristolImage,
    imageAlt: 'Bristol Seafood Grill project preview',
    liveUrl: 'https://bristolseafoodgrill.com/',
    technologies: ['ASP.NET MVC', 'ASP.NET WebForms', 'DotNetNuke', 'C#', 'JavaScript', 'SQL Server', 'HTML/CSS'],
    technicalDetails: [
      'Built a multi-page restaurant experience that translated a premium brand into a highly usable digital flow for menu browsing and reservations.',
      'Worked within a CMS-driven architecture to maintain content and location-specific variation without compromising consistency.',
      'Focused on responsive layout patterns, reusable content blocks, and streamlined navigation for a lower-friction user journey.',
      'Collaborated closely with stakeholders to balance brand fidelity with practical UX adjustments that improved conversion paths.'
    ],
    nonTechnicalDetails: [
      'Recognized the importance of personal organization and time management in a solo contract role by tracking tasks and deadlines in a clear workflow.',
      'Learned that stakeholder communication is crucial for trust, alignment, and project success on client work.',
      'Saw how simplifying the experience can reduce bounce risk and make the site feel more refined in the customer journey.',
      'Confirmed that asking clarifying questions early can prevent wasted effort and reduce surprises later in the project.'
    ]
  },
  {
    id: 'devon-seafood-grill',
    title: 'Devon Seafood Grill',
    subtitle: 'Upscale restaurant experience',
    summary:
      'A scalable restaurant website built to maintain brand consistency while giving each location its own local information and user experience.',
    image: devonImage,
    imageAlt: 'Devon Seafood Grill project preview',
    liveUrl: 'https://devonseafood.com/',
    technologies: ['ASP.NET MVC', 'ASP.NET WebForms', 'DotNetNuke', 'C#', 'JavaScript', 'SQL Server', 'HTML/CSS'],
    technicalDetails: [
      'Created a scalable content model that made it easier to support multiple locations with local variations while preserving a consistent brand voice.',
      'Built reusable components and patterns that informed later React-based work and made future feature development more predictable.',
      'Treated testing as a core part of delivery to reduce risk before launch and improve quality during content and UX changes.',
      'Focused on practical refinement and implementation detail so requirements translated cleanly into functional outcomes.'
    ],
    nonTechnicalDetails: [
      'This project reinforced how important it is to ask the right questions early so scope and expectations stay clear from kickoff to delivery.',
      'I learned that more detailed product understanding leads to better refinements and fewer gaps between design and implementation.',
      'The work showed how scalable systems can support business goals without creating unnecessary complexity for authors or customers.',
      'A careful testing mindset is often more valuable than rushing to meet a deadline with incomplete validation.'
    ]
  },
  {
    id: 'react-resource-hub',
    title: 'React Resource Hub',
    subtitle: 'Developer education platform',
    summary:
      'A learning platform for React developers focused on practical tutorials, curated resources, and examples that help people build real confidence with the tools.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Laptop and developer workspace with code on screen',
    technologies: ['React', 'TypeScript', 'Bootstrap', 'Firebase', 'ASP.NET Core API', 'Axios', 'T-SQL', 'Node.js'],
    technicalDetails: [
      'Designed a content-rich interface that balances discovery, learning progression, and editorial clarity for a range of experience levels.',
      'Built the experience around reusable UI patterns and clear information architecture so content remains approachable as the library grows.',
      'Prioritized practical examples and guided flows that help developers move from browsing to hands-on learning without friction.',
      'Structured the platform so interactive content and curated resources work together to improve retention and comprehension.'
    ],
    nonTechnicalDetails: [
      'Developer education works best when examples are concrete and relevant to real tasks rather than abstract theory alone.',
      'I learned that curation is just as important as creation because the best learning experiences reduce noise and guide attention.',
      'Community-driven features can improve engagement when they support discovery and accountability rather than adding unnecessary complexity.',
      'Progressive complexity helps learners build confidence without overwhelming them too early in their journey.'
    ]
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    subtitle: 'React portfolio repository',
    summary:
      'This repository powers a responsive personal portfolio that combines project storytelling, clean route-based navigation, an image-rich About page, and a server-backed contact experience.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern workspace with screen and minimal desk setup',
    technologies: ['React', 'TypeScript', 'Vite', 'React Router', 'CSS', 'Express', 'Resend API', 'Sharp'],
    technicalDetails: [
      'Built the frontend with React, TypeScript, and Vite, using focused page, organism, molecule, and atom components.',
      'Added React Router for clean URLs such as /about, /resume, /projects, and /contact with static-host SPA fallback support.',
      'Created a responsive About gallery with optimized WebP assets, lazy loading, intrinsic dimensions, and restrained scroll motion.',
      'Designed the current contact experience around direct email and LinkedIn links, keeping personal communication simple and familiar for visitors.'
    ],
    nonTechnicalDetails: [
      'Personal branding works best when it feels authentic instead of overly polished without voice or personality.',
      'I learned that interactive elements can deepen engagement when they support the narrative rather than distract from it.',
      'A thoughtful contact experience can have a direct impact on whether a visitor reaches out or moves on.',
      'Performance and accessibility are not optional—they are part of the quality of the experience itself.'
    ]
  },
  {
    id: 'tech-outfitters',
    title: 'Tech Outfitters',
    subtitle: 'Small business web studio launch',
    summary:
      'A from-scratch landing page and brand for my new web business helping small businesses in the Monticello, Otsego, and Big Lake area launch fast, affordable, engineer-vetted websites.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Laptop displaying a website design in progress',
    liveUrl: 'https://techoutfitters.jcaldwell.io',
    technologies: ['React', 'TypeScript', 'Vite', 'Express', 'Resend API', 'Cloudflare'],
    technicalDetails: [
      'Scaffolded an independent React, TypeScript, and Vite app with its own atomic component structure, mirroring proven conventions from this portfolio.',
      'Built a services grid, accessible FAQ accordion, and a contact form backed by a dedicated Express API with rate limiting, origin checks, and CAPTCHA verification.',
      'Designed an original visual identity blending modern tech aesthetics with a rugged, outdoor-outfitter tone and generous whitespace.',
      'Kept CAPTCHA verification provider-neutral on the server so the client widget can be swapped without rewriting form logic.'
    ],
    nonTechnicalDetails: [
      'Starting a business alongside my wife Erin meant translating a business plan into clear, honest marketing copy without overstating what we offer yet.',
      'Keeping pricing transparent, even as placeholder figures, builds trust with small business owners who are wary of hidden costs.',
      'A fast, same-day preview experience mirrors how we want clients to feel about working with us: quick, capable, and low-friction.',
      'Building for a real local audience reinforced how important plain language and clear next steps are over technical polish alone.'
    ]
  }
]
