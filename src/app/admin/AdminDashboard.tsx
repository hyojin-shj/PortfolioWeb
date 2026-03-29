'use client';

import { useState } from 'react';
import { createProject, deleteProject, login, logout, toggleFeaturedAction, updateProject, saveAboutMe } from './actions';
import { Trash2, LogOut, PlusCircle, Save, Star, Edit3, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Project, AboutMe } from '@prisma/client';

export default function AdminDashboard({ initialSession, projects, initialAboutMe }: { initialSession: boolean, projects: Project[], initialAboutMe: AboutMe | null }) {
  const [session, setSession] = useState(initialSession);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(password);
    if (res.success) {
      setSession(true);
      setError('');
    } else {
      setError(res.error || 'Login failed');
    }
  };

  const handleLogout = async () => {
    await logout();
    setSession(false);
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editProject) {
      await updateProject(editProject.id, formData);
    } else {
      await createProject(formData);
    }
    setShowForm(false);
    setEditProject(null);
    (e.target as HTMLFormElement).reset();
    router.refresh();
  };

  const handleAboutMeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await saveAboutMe(formData);
    alert('About Me saved successfully!');
    router.refresh();
  };

  const handleEditClick = (p: Project) => {
    setEditProject(p);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      router.refresh();
    }
  };

  if (!session) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="section-title" style={{ fontSize: '1.75rem', textAlign: 'center', marginBottom: '1.5rem' }}>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--card-border)' }}
            />
            {error && <div style={{ color: '#ff4b4b', fontSize: '0.85rem' }}>{error}</div>}
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>Login</button>
            <Link href="/" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>Return to Home</Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 24px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href="/" className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'white' }}>View Site</Link>
          <button onClick={handleLogout} className="btn-primary" style={{ background: '#333' }}><LogOut size={16} /> Logout</button>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <button onClick={() => { setShowForm(!showForm); setEditProject(null); }} className="btn-primary" style={{ marginBottom: '24px' }}>
          <PlusCircle size={18} /> {showForm ? 'Cancel Form' : 'Add New Project'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="glass-panel animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} key={editProject ? editProject.id : 'new'}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{editProject ? 'Edit Project' : 'Create Project'}</h2>
            <input name="title" required placeholder="Project Title (e.g. AI Vision Dashboard)" style={inputStyle} defaultValue={editProject?.title || ''} />
            <input name="objective" required placeholder="Objective / Goal" style={inputStyle} defaultValue={editProject?.objective || ''} />
            <textarea name="content" required placeholder="Project Content & Description" style={{ ...inputStyle, minHeight: '100px' }} defaultValue={editProject?.content || ''} />
            <select name="role" required style={inputStyle} defaultValue={editProject?.role || 'Personal'}>
              <option value="Personal">Personal Project</option>
              <option value="Team">Team Project</option>
            </select>
            <input name="techStack" required placeholder="Tech Stack & Tools (e.g. Python, React, PyTorch)" style={inputStyle} defaultValue={editProject?.techStack || ''} />
            <input name="architecture" placeholder="Architecture Flow (e.g. User -> API -> DB)" style={inputStyle} defaultValue={editProject?.architecture || ''} />
            <textarea name="troubleshooting" required placeholder="Troubleshooting (Problem)" style={{ ...inputStyle, minHeight: '100px' }} defaultValue={editProject?.troubleshooting || ''} />
            <textarea name="solution" required placeholder="Solution (How you fixed it)" style={{ ...inputStyle, minHeight: '100px' }} defaultValue={editProject?.solution || ''} />
            <textarea name="achievements" required placeholder="Achievements / Results" style={{ ...inputStyle, minHeight: '100px' }} defaultValue={editProject?.achievements || ''} />
            <input name="imageUrl" placeholder="Thumbnail Image URL (Optional)" style={inputStyle} defaultValue={editProject?.imageUrl || ''} />
            <input name="contribution" required type="number" min="0" max="100" placeholder="Contribution % (e.g. 100)" style={inputStyle} defaultValue={editProject?.contribution || ''} />
            <input name="sortOrder" required type="number" placeholder="Sort Priority (Higher numbers appear first, e.g. 100)" style={inputStyle} defaultValue={editProject?.sortOrder ?? 0} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" name="isFeatured" style={{ width: '18px', height: '18px' }} defaultChecked={editProject?.isFeatured || false} />
              <span>Mark as Featured Project</span>
            </label>
            
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
              <Save size={18} /> {editProject ? 'Update Project' : 'Save Project'}
            </button>
          </form>
        )}
      </div>

      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Existing Projects</h2>
        {projects.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No projects found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {projects.map((p) => (
              <div key={p.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: p.isFeatured ? '4px solid #facc15' : 'none' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {p.title}
                    {p.isFeatured && <Star size={16} fill="#facc15" color="#facc15" />}
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Rank: {p.sortOrder})</span>
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{p.techStack}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEditClick(p)} className="btn-primary" style={{ background: 'transparent', padding: '8px', border: '1px solid var(--card-border)' }} title="Edit Project">
                    <Edit3 size={18} />
                  </button>
                  <button onClick={async () => await toggleFeaturedAction(p.id, p.isFeatured)} className="btn-primary" style={{ background: 'transparent', padding: '8px', border: '1px solid var(--card-border)' }} title={p.isFeatured ? "Unfeature" : "Feature"}>
                    <Star size={18} fill={p.isFeatured ? "#facc15" : "transparent"} color={p.isFeatured ? "#facc15" : "var(--foreground)"} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="btn-danger" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '64px', borderTop: '1px solid var(--card-border)', paddingTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }} ><UserCircle size={24} /> About Me Configuration</h2>
        <form onSubmit={handleAboutMeSubmit} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input name="name" required placeholder="Name (e.g. Jane Doe)" style={inputStyle} defaultValue={initialAboutMe?.name || ''} />
          
          <DynamicList name="emails" title="Emails" initialData={initialAboutMe?.emails} defaultIcon="Mail" />
          <DynamicList name="snsLinks" title="SNS & Links" initialData={initialAboutMe?.snsLinks} defaultIcon="Link" />
          <DynamicList name="educations" title="Education" initialData={initialAboutMe?.educations} defaultIcon="GraduationCap" />
          <DynamicList name="certifications" title="Certifications" initialData={initialAboutMe?.certifications} defaultIcon="Award" />
          <DynamicList name="careers" title="Careers & Experience (경력)" initialData={initialAboutMe?.careers} defaultIcon="Briefcase" />

          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
            <Save size={18} /> Save About Me
          </button>
        </form>
      </div>

    </div>
  );
}

function DynamicList({ name, title, initialData, defaultIcon }: { name: string, title: string, initialData?: string | null, defaultIcon: string }) {
  const [items, setItems] = useState<any[]>(() => {
    try { return initialData ? JSON.parse(initialData) : []; } catch (e) { return []; }
  });

  const updateItem = (index: number, key: string, value: string) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{title}</h3>
        <button type="button" onClick={() => setItems([...items, { icon: defaultIcon, value: '' }])} style={{ background: 'transparent', color: 'var(--primary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <PlusCircle size={16} /> Add
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px' }}>
            <select value={item.icon} onChange={(e) => updateItem(i, 'icon', e.target.value)} style={{ ...inputStyle, width: '120px', padding: '8px' }}>
              <option value="Mail">Mail</option>
              <option value="Code">Github/Code</option>
              <option value="Briefcase">Linkedin/Work</option>
              <option value="Globe">Globe</option>
              <option value="Link">Link</option>
              <option value="GraduationCap">Education</option>
              <option value="Award">Award</option>
              <option value="User">User</option>
              <option value="FileText">File</option>
            </select>
            <input value={item.value} onChange={(e) => updateItem(i, 'value', e.target.value)} placeholder="Value or URL" style={{ ...inputStyle, padding: '8px' }} required />
            <button type="button" onClick={() => removeItem(i)} style={{ background: 'transparent', color: '#ff4b4b', border: 'none', cursor: 'pointer', padding: '0 8px' }}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
    </div>
  );
}

const inputStyle = {
  padding: '12px 16px',
  borderRadius: '8px',
  background: 'rgba(255,255,255,0.05)',
  color: 'var(--foreground)',
  border: '1px solid var(--card-border)',
  fontFamily: 'inherit',
  fontSize: '1rem',
  width: '100%',
};
