import { useMemo, useState } from 'react'
import SiteHeader from '../molecules/SiteHeader'
import SiteFooter from '../molecules/SiteFooter'
import { projects, type Project, type ProjectDetailType } from '../../data/projects'
import SEO from '../atoms/SEO'

function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [detailType, setDetailType] = useState<ProjectDetailType>('technical')

  const activeDetails = useMemo(() => {
    if (!activeProject) return []
    return detailType === 'technical' ? activeProject.technicalDetails : activeProject.nonTechnicalDetails
  }, [activeProject, detailType])

  return (
    <main className="portfolio-shell projects-page" id="projects-page">
      <SEO
        title="Projects | James Caldwell Full-Stack Developer"
        description="Explore James Caldwell&apos;s software projects across healthcare technology, React, TypeScript, ASP.NET Core, GraphQL, and product-focused web development."
        path="/projects"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Projects by James Caldwell',
          url: 'https://jcaldwell.io/projects',
          mainEntity: { '@type': 'ItemList', itemListElement: projects.map((project, index) => ({ '@type': 'ListItem', position: index + 1, name: project.title, description: project.summary })) },
        }}
      />
      <SiteHeader />

      <section className="projects-intro" aria-labelledby="projects-title">
        <p className="eyebrow">Selected work / 04</p>
        <h1 id="projects-title">Product thinking,<br /><span>built into the work.</span></h1>
        <p className="projects-intro__copy">
          A showcase of development work that blends business context, user experience,
          and technical implementation across client work and product-oriented builds.
        </p>
      </section>

      <section className="projects-grid" aria-label="Project list">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`project-card${project.id === 'quest-outreach-platform' ? ' project-card--quest' : ''}`}
          >
            <div className="project-card__image-wrap">
              <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
            </div>

            <div className="project-card__body">
              <p className="project-card__eyebrow">{project.subtitle}</p>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>

              <ul className="project-card__tags" aria-label={`${project.title} technologies`}>
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>

              <div className="project-card__actions">
                <button
                  type="button"
                  className="project-card__button"
                  onClick={() => {
                    setActiveProject(project)
                    setDetailType('technical')
                  }}
                >
                  Technical details
                </button>
                <button
                  type="button"
                  className="project-card__button project-card__button--secondary"
                  onClick={() => {
                    setActiveProject(project)
                    setDetailType('non-technical')
                  }}
                >
                  Non-technical details
                </button>
              </div>

              {project.liveUrl && (
                <a className="project-card__link" href={project.liveUrl} target="_blank" rel="noreferrer">
                  View site
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      <SiteFooter />

      {activeProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
          <div className="project-modal__backdrop" onClick={() => setActiveProject(null)} aria-hidden="true" />
          <div className="project-modal__panel">
            <button
              type="button"
              className="project-modal__close"
              onClick={() => setActiveProject(null)}
              aria-label="Close project details"
            >
              ×
            </button>

            <p className="project-card__eyebrow">{activeProject.subtitle}</p>
            <h3 id="project-modal-title">{activeProject.title}</h3>

            <div className="project-modal__toggle" role="tablist" aria-label="Project detail tabs">
              <button
                type="button"
                className={detailType === 'technical' ? 'is-active' : ''}
                onClick={() => setDetailType('technical')}
                aria-selected={detailType === 'technical'}
              >
                Technical details
              </button>
              <button
                type="button"
                className={detailType === 'non-technical' ? 'is-active' : ''}
                onClick={() => setDetailType('non-technical')}
                aria-selected={detailType === 'non-technical'}
              >
                Non-technical details
              </button>
            </div>

            <ul className="project-modal__list">
              {activeDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>

            {activeProject.liveUrl && (
              <a className="project-card__link" href={activeProject.liveUrl} target="_blank" rel="noreferrer">
                Visit project
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default ProjectsPage
