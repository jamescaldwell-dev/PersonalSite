import resumePdf from '../../assets/design-foundations/JamesCaldwellResume.pdf'
import SiteHeader from '../molecules/SiteHeader'
import SiteFooter from '../molecules/SiteFooter'

const experience = [
  {
    period: 'July 2022 to Sept 2026',
    title: 'Software Engineer',
    company: 'Quest Analytics, LLC',
    location: 'Overland Park, KS / Remote',
    intro: 'Helping make healthcare more accessible for Americans through thoughtful technology.',
    highlights: [
      'Part of the founding team for a new outreach platform, supporting its successful 2023 launch.',
      'Develop and maintain outreach applications managing healthcare practitioner data.',
      'Improved page load times from approximately 45 seconds to under 5 seconds through API optimization and lazy loading.',
      'Set a high standard for clean code principles and design patterns for maintainable solutions.',
      'Collaborate with cross-functional teams to launch and grow the outreach platform.',
      'Contribute to architecture discussions and code reviews to ensure quality and scalability.',
      'Implement unit tests and functional tests to ensure reliability and performance.',
    ],
    technologies: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'GraphQL', 'MongoDB', 'Azure', 'T-SQL'],
  },
  {
    period: 'Apr 2019 to Aug 2022',
    title: 'Technical Trainer & Co-Lead',
    company: 'Centriq Training',
    location: 'Kansas City, MO',
    intro: 'Helping career changers build the technical confidence and practical skills to enter the industry.',
    highlights: [
      'Instructed full-stack development bootcamp students through career transition.',
      'Developed curriculum for ReactJS and ASP.NET Core technologies.',
      'Mentored students through hands-on projects and career preparation.',
      'Led a team of instructors to improve student outcomes and engagement.',
    ],
    technologies: ['React', 'ASP.NET Core', 'JavaScript', 'C#', 'SQL', 'HTML/CSS', 'Firebase', 'Git'],
  },
  {
    period: 'Sept 2018 to Mar 2019',
    title: 'Full Stack Developer (Contract)',
    company: "Houlihan's Restaurant Group",
    location: 'Leawood, KS',
    intro: 'Translating brand and marketing goals into responsive, accessible web experiences.',
    highlights: [
      'Built and maintained bristolseafoodgrill.com and devonseafood.com.',
      'Developed responsive web applications in ASP.NET WebForms and a CMS-driven environment.',
      'Partnered with marketing and design teams on digital presence strategy and implementation.',
      'Wrote a SQL stored procedure for a “Find the closest restaurant” feature, improving search functionality.',
    ],
    technologies: ['ASP.NET MVC', 'ASP.NET WebForms', 'DotNetNuke', 'Evoq CMS', 'C#', 'JavaScript', 'SQL Server'],
  },
  {
    period: '2011 to 2017',
    title: "Children's Ministry Coordinator",
    company: 'Christ Lutheran Church',
    location: 'Overland Park, KS',
    intro: 'Leading people, programs, and community experiences with care and clarity.',
    highlights: [
      "Led a team of 100+ volunteers across children's ministry programs.",
      'Created and implemented weekly curriculum for various age groups.',
      'Developed volunteer recruitment and training programs.',
      'Grew the summer camp program from 100 to more than 200 participants.',
    ],
    technologies: ['Team Leadership', 'Curriculum Design', 'Volunteer Training', 'Program Growth'],
  },
]

const skillGroups = [
  ['Programming', 'C#', 'JavaScript', 'TypeScript', 'SQL'],
  ['Frameworks', 'ASP.NET Core', 'React', 'Node.js', 'Express', 'Material UI', 'Entity Framework Core'],
  ['Data & Cloud', 'SQL Server', 'MongoDB', 'Firebase', 'Azure', 'Azure DevOps', 'Docker'],
  ['Quality', 'Unit Testing', 'xUnit', 'DataDog', 'Postman', 'Swagger', 'FullStory'],
]

const resumeStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'James Caldwell',
  url: 'https://jcaldwell.io/',
  jobTitle: 'Software Engineer & Technical Trainer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Monticello',
    addressRegion: 'MN',
    addressCountry: 'US',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Quest Analytics, LLC',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineer',
    occupationLocation: {
      '@type': 'City',
      name: 'Overland Park, Kansas',
    },
    skills: 'C#, ASP.NET Core, React, TypeScript, GraphQL, MongoDB, Azure, T-SQL',
  },
}

function ResumePage() {
  return (
    <main className="portfolio-shell resume-page" id="resume">
      <script type="application/ld+json">{JSON.stringify(resumeStructuredData)}</script>
      <SiteHeader />

      <section className="resume-intro" aria-labelledby="resume-title">
        <div>
          <p className="eyebrow">Resume / 2026</p>
          <h1 id="resume-title">A career built<br /><span>around people.</span></h1>
        </div>
        <div className="resume-intro__aside">
          <p>Software engineer and technical trainer focused on thoughtful products, clear systems, and useful outcomes.</p>
          <a className="action-link" href={resumePdf} download="JamesCaldwellResume.pdf">
            Download PDF <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <div className="resume-layout">
        <aside className="resume-index" aria-label="Resume sections">
          <p className="resume-section-label">On this page</p>
          <a href="/resume#resume-experience">Experience <span>01</span></a>
          <a href="/resume#resume-education">Education <span>02</span></a>
          <a href="/resume#resume-skills">Skills <span>03</span></a>
          <p className="resume-index__location">Monticello, MN<br />United States</p>
        </aside>

        <div className="resume-content">
          <section className="resume-section" id="resume-experience" aria-labelledby="experience-title">
            <div className="resume-section__heading">
              <p className="eyebrow">01 / Work experience</p>
              <h2 id="experience-title">The work<br /><em>so far.</em></h2>
            </div>
            <div className="experience-list">
              {experience.map((role) => (
                <article className="experience-item" key={`${role.company}-${role.period}`}>
                  <p className="experience-item__period">{role.period}</p>
                  <div>
                    <h3>{role.title}</h3>
                    <p className="experience-item__company">{role.company} <span>•</span> {role.location}</p>
                    <p className="experience-item__intro">{role.intro}</p>
                    <ul>
                      {role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                    <div className="tag-list" aria-label={`${role.company} technologies`}>
                      {role.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-section resume-details" id="resume-education" aria-labelledby="education-title">
            <div className="resume-section__heading">
              <p className="eyebrow">02 / Education</p>
              <h2 id="education-title">Always<br /><em>learning.</em></h2>
            </div>
            <div className="education-list">
              <div><p>2018</p><h3>Certificate in Full Stack Web Development</h3><span>Centriq Training / Graduate</span></div>
              <div><p>2011</p><h3>Bachelor of Arts in Psychology</h3><span>Grace University / Graduated with Honors</span></div>
              <div><p>Certification</p><h3>CompTIA CTT+</h3><span>Certified Technical Trainer</span></div>
            </div>
          </section>

          <section className="resume-section resume-details" id="resume-skills" aria-labelledby="skills-title">
            <div className="resume-section__heading">
              <p className="eyebrow">03 / Technical skills</p>
              <h2 id="skills-title">Tools for<br /><em>the job.</em></h2>
            </div>
            <div className="skill-groups">
              {skillGroups.map(([label, ...skills]) => <div className="skill-group" key={label}><h3>{label}</h3><p>{skills.join(' / ')}</p></div>)}
            </div>
          </section>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}

export default ResumePage