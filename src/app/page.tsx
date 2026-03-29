import { prisma } from '@/lib/db';
import { Bot, Cpu, Database, Server, ChevronDown, CheckCircle2, Star, ArrowRight, UserCircle, Target, Mail, Code, Briefcase, Globe, Link as LinkIcon, GraduationCap, Award, FileText } from 'lucide-react';
import Link from 'next/link';
import Chatbot from '@/components/Chatbot';

const IconMap: Record<string, any> = {
  Mail, Code, Briefcase, Globe, Link: LinkIcon, GraduationCap, Award, UserCircle, FileText
};

function RenderAboutItems({ jsonStr, title }: { jsonStr: string, title: string }) {
  let items = [];
  try { items = JSON.parse(jsonStr); } catch (e) { }
  if (!items || items.length === 0) return null;

  return (
    <div style={{ padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.map((it: any, i: number) => {
          const IconComponent = IconMap[it.icon] || LinkIcon;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconComponent size={20} color="var(--primary)" />
              </div>
              {it.value.startsWith('http') ? (
                <a href={it.value} target="_blank" rel="noreferrer" style={{ color: 'var(--foreground)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }} className="hover-primary">
                  {it.value.replace(/^https?:\/\//, '')}
                </a>
              ) : (
                <span style={{ fontWeight: 500 }}>{it.value}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const revalidate = 0; // Disable static caching so admin changes appear immediately
export const dynamic = 'force-dynamic';

export default async function Home() {
  const allProjects = await prisma.project.findMany({
    orderBy: [
      { isFeatured: 'desc' },
      { sortOrder: 'desc' },
      { id: 'desc' }
    ],
  });

  const featuredProjects = allProjects.filter((p) => p.isFeatured);
  const otherProjects = allProjects.filter((p) => !p.isFeatured);
  const aboutMe = await prisma.aboutMe.findFirst() || null;

  return (
    <main className="container" style={{ paddingBottom: '100px' }}>
      <header style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 100 }}>
        <Link href="/admin" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'none', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
          Admin Login
        </Link>
      </header>
      {/* Hero Section */}
      <section style={{ minHeight: '80vh', paddingTop: '100px', paddingBottom: '100px', marginBottom: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} className="animate-fade-in-up">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(155, 81, 224, 0.1)', borderRadius: '24px', color: 'var(--primary)', marginBottom: '24px', fontWeight: 600 }}>
          <Bot size={18} /> AI Engineering Portfolio
        </div>
        <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          데이터로 일상을 읽고, <span className="gradient-text">AI로 문제를 해결합니다.</span>
        </h1>

        <div style={{ position: 'relative', width: '100%', maxWidth: '900px', height: '340px', margin: '16px auto 32px auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {/* 하단 점진적 페이드 아웃 타원/그라데이션 (배경과 자연스럽게 어울리게 섞임) */}
          <div style={{ position: 'absolute', bottom: '-20px', left: 0, width: '100%', height: '120px', background: 'linear-gradient(to bottom, transparent, var(--background))', zIndex: 10, pointerEvents: 'none' }} />

          {/* 왼쪽 사진 (약간 기울어짐) */}
          <div style={{ position: 'absolute', left: '12%', zIndex: 1, transform: 'rotate(-6deg)', borderRadius: '16px', overflow: 'hidden', width: '250px', height: '260px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', opacity: 0.85, transition: 'all 0.3s ease' }} className="hero-img-card">
            {/* height calc(100% + 40px)로 설정해 아래 40px(약 1cm AI 워터마크)를 잘라냄 */}
            <img src="/images/photo1.png" alt="AI Generated 1" style={{ width: '100%', height: 'calc(100% + 40px)', objectFit: 'cover', objectPosition: 'top' }} />
          </div>

          {/* 중앙 사진 (제일 위로 올라오고 정방향) */}
          <div style={{ position: 'absolute', zIndex: 3, transform: 'translateY(-10px)', borderRadius: '16px', overflow: 'hidden', width: '280px', height: '300px', boxShadow: '0 25px 50px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }} className="hero-img-card">
            <img src="/images/photo3.png" alt="AI Generated 2" style={{ width: '100%', height: 'calc(100% + 40px)', objectFit: 'cover', objectPosition: 'top' }} />
          </div>

          {/* 오른쪽 사진 (약간 기울어짐) */}
          <div style={{ position: 'absolute', right: '12%', zIndex: 2, transform: 'rotate(6deg)', borderRadius: '16px', overflow: 'hidden', width: '250px', height: '260px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', opacity: 0.85, transition: 'all 0.3s ease' }} className="hero-img-card">
            <img src="/images/photo2.png" alt="AI Generated 3" style={{ width: '100%', height: 'calc(100% + 40px)', objectFit: 'cover', objectPosition: 'top' }} />
          </div>

        </div>

        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '32px', position: 'relative', zIndex: 11 }}>
          안녕하세요, 심효진입니다. 저는 복잡한 파이프라인 구축부터 모델 최적화까지, 현실의 불편함을 자동화로 해결하는 데 가치를 둡니다
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="#projects" className="btn-primary">
            View Projects <ChevronDown size={18} />
          </a>
          <a href="#about" className="btn-primary" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--foreground)' }}>
            About Me <UserCircle size={18} />
          </a>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{ marginBottom: '100px' }} className="animate-fade-in-up delay-100">
        <h2 className="section-title" style={{ textAlign: 'center', fontSize: '2rem' }}>Core Capabilities</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Cpu size={32} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>AI & Model Engineering</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              PyTorch, MediaPipe, Scikit-learn, OpenAI API, Hugging Face, RAG, SBERT, LangChain
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 500 }}>
                💡  Real-time Vision (SOS recognition) & NLP
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Database size={32} color="var(--secondary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Data & MLOps Pipeline</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              MLflow, Apache Airflow, GitHub Actions, Elasticsearch, ELK Stack, MongoDB, MySQL, Vector DBs
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 500 }}>
                💡  Workflow Automation & Semantic Search
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Server size={32} color="var(--accent)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Engineering & Deploy</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Python (FastAPI / Flask), Streamlit, React, Next.js, HTML/CSS, Git, Discord & Kakao API
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 500 }}>
                💡  Fast AI Prototyping & Service Integration
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="animate-fade-in-up delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginBottom: '150px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', fontSize: '2.5rem' }}>Featured Projects</h2>

        {featuredProjects.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '64px 24px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No featured projects yet. Please visit Admin to feature a project.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {featuredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        )}

        {otherProjects.length > 0 && (
          <details style={{ marginTop: '24px' }} className="load-more-details">
            <summary style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', cursor: 'pointer', outline: 'none' }}>
              <div className="btn-primary" style={{ padding: '12px 24px', fontSize: '1.1rem' }}>
                View Other Projects <ChevronDown size={20} />
              </div>
            </summary>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '48px' }}>
              {otherProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          </details>
        )}
      </section>

      {aboutMe ? (
        <section id="about" className="animate-fade-in-up" style={{ marginBottom: '100px', padding: '48px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
          <h2 className="section-title" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '32px' }}>About Me</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', background: 'rgba(155, 81, 224, 0.05)', borderRadius: '12px', border: '1px solid rgba(155, 81, 224, 0.1)' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '16px', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Profile Name</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <UserCircle size={28} /> {aboutMe.name}
              </div>
            </div>
            <RenderAboutItems jsonStr={aboutMe.emails} title="Contact & Email" />
            <RenderAboutItems jsonStr={aboutMe.snsLinks} title="SNS & Links" />
            <RenderAboutItems jsonStr={aboutMe.careers} title="Careers & Experience" />
            <RenderAboutItems jsonStr={aboutMe.educations} title="Education" />
            <RenderAboutItems jsonStr={aboutMe.certifications} title="Certifications" />
          </div>
        </section>
      ) : (
        <section id="about" className="animate-fade-in-up" style={{ marginBottom: '100px', padding: '64px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--card-border)', textAlign: 'center' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>About Me</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Admin 페이지 하단에서 About Me 정보를 직접 등록해주세요!</p>
        </section>
      )}

      {/* Local AI Portfolio Chatbot */}
      <Chatbot data={{ projects: allProjects, aboutMe }} />
    </main>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <article className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {project.imageUrl && (
        <div style={{ width: '100%', height: '300px', overflow: 'hidden', borderBottom: '1px solid var(--card-border)' }}>
          <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <div style={{ padding: '32px', borderBottom: '1px solid var(--card-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{project.title}</h3>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.875rem' }}>
            <CheckCircle2 size={16} color="var(--secondary)" /> Contribution: {project.contribution}%
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
          {project.techStack.split(',').map((tech: string, i: number) => (
            <span key={i} style={{ padding: '4px 10px', background: 'var(--card-bg)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--accent)', border: '1px solid var(--card-border)' }}>
              {tech.trim()}
            </span>
          ))}
          <span style={{ marginLeft: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.role.toLowerCase() === 'team' ? '#3b82f6' : '#10b981' }}></span>
            {project.role}
          </span>
        </div>

        <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>
          <strong style={{ color: 'var(--primary)', marginRight: '8px' }}>목표 :</strong>
          {project.objective}
        </p>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px', marginBottom: '8px' }}>
          <h4 style={{ color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>Content & Description</h4>
          <p style={{ marginBottom: '0', whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '0.95rem' }}>{project.content}</p>
        </div>

        {project.architecture && (
          <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(155, 81, 224, 0.05)', borderRadius: '8px', border: '1px solid rgba(155, 81, 224, 0.2)' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '16px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={18} /> Architecture Flow</h4>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '1rem', fontWeight: 500 }}>
              {project.architecture.split('->').map((step: string, index: number, arr: any[]) => (
                <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ padding: '8px 16px', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--card-border)', color: 'var(--foreground)' }}>{step.trim()}</span>
                  {index < arr.length - 1 && <ArrowRight size={18} color="var(--primary)" />}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
          <h4 style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '12px' }}>
            <Bot size={18} /> Troubleshooting
          </h4>
          <div style={{ paddingLeft: '26px', whiteSpace: 'pre-line', fontSize: '0.95rem', color: 'var(--foreground)' }}>
            {project.troubleshooting}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
          <h4 style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '12px' }}>
            <Database size={18} /> Solution
          </h4>
          <div style={{ paddingLeft: '26px', whiteSpace: 'pre-line', fontSize: '0.95rem', color: 'var(--foreground)' }}>
            {project.solution}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
          <h4 style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '12px' }}>
            <Server size={18} /> Achievements & Results
          </h4>
          <div style={{ paddingLeft: '26px', whiteSpace: 'pre-line', fontSize: '0.95rem', color: 'var(--foreground)' }}>
            {project.achievements}
          </div>
        </div>
      </div>
    </article>
  );
}
