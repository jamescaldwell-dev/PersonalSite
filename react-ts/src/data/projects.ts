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
    id: 'bristol-seafood-grill',
    title: 'Bristol Seafood Grill',
    subtitle: 'Upscale restaurant experience',
    summary:
      'A polished multi-location dining website designed to convey a premium atmosphere while making menu and reservation experiences easy to navigate.',
    image: '/src/assets/design-foundations/bristol.jpg',
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
    subtitle: 'Multi-location brand system',
    summary:
      'A scalable restaurant website built to maintain brand consistency while giving each location its own local information and user experience.',
    image: '/src/assets/design-foundations/DevonSeafood.jpg',
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
    technologies: ['React', 'TypeScript', 'Material UI', 'Firebase', 'ASP.NET Core API', 'Axios', 'T-SQL', 'Node.js'],
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
    id: 'quest-outreach-platform',
    title: 'Quest Outreach Platform',
    subtitle: 'Healthcare outreach operations',
    summary:
      'A modular, scalable outreach platform supporting email, fax, phone, and direct mail campaigns for healthcare practice offices with large-volume operational needs.',
    image: '/src/assets/design-foundations/QOP.jpg',
    imageAlt: 'Quest Outreach Platform project preview',
    technologies: ['C#', 'ASP.NET Core', 'HotChocolate', 'MassTransit', 'T-SQL', 'MongoDB', 'Azure Blob Storage', 'React', 'TypeScript', 'GraphQL', 'React Relay', 'MUI', 'Azure DevOps'],
    technicalDetails: [
      'Worked within a microservices-based architecture built for scale, modularity, and operational resilience in a high-volume outreach environment.',
      'Used GraphQL and React Relay patterns to keep data fetching efficient while maintaining predictable state and performance for front-end work.',
      'Focused on reliability, maintainability, and workflow organization in a system where throughput and process clarity mattered as much as the interface.',
      'Built and refined delivery practices that supported complex workflows across teams and deployment pipelines.'
    ],
    nonTechnicalDetails: [
      'Strong alignment in Scrum ceremonies can make complex work feel manageable and reduce wasted effort across teams.',
      'I saw how different strengths across a development team can be leveraged to improve speed and quality when the team is organized well.',
      'The balance between process and flexibility is essential when a project is scaling and requirements are evolving.',
      'Good testing strategy and stakeholder understanding can save significant time and reduce risk under delivery pressure.'
    ]
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    subtitle: 'Brand and product storytelling',
    summary:
      'A personal portfolio designed to present technical capability, creative direction, and communication in a way that feels polished, human, and memorable.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern workspace with screen and minimal desk setup',
    liveUrl: 'https://jcaldwell.io/',
    technologies: ['React', 'TypeScript', 'Material UI', 'Firebase', 'EmailJS'],
    technicalDetails: [
      'Built an interactive portfolio experience balancing thoughtful motion, clear hierarchy, and strong information architecture.',
      'Focused on performance and accessibility so the portfolio remains usable, fast, and clear across devices and assistive technologies.',
      'Designed the experience around conversion paths and content clarity so visitors can understand capabilities and begin a conversation quickly.',
      'Used reusable patterns so the site remains maintainable as new work and case studies are added.'
    ],
    nonTechnicalDetails: [
      'Personal branding works best when it feels authentic instead of overly polished without voice or personality.',
      'I learned that interactive elements can deepen engagement when they support the narrative rather than distract from it.',
      'A thoughtful contact experience can have a direct impact on whether a visitor reaches out or moves on.',
      'Performance and accessibility are not optional—they are part of the quality of the experience itself.'
    ]
  }
]
