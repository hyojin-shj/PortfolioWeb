'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export default function Chatbot({ data }: { data: { projects: any[], aboutMe: any } }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: 'bot', text: '안녕하세요! 심효진 AI 챗봇입니다. 제 프로젝트나 경력, 포트폴리오에 대해 궁금하신 점을 물어보세요!' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const titleContains = (title: string, text: string) => {
    // Basic fuzzy match for standard project names
    if (text.includes('sos') && title.toLowerCase().includes('sos')) return true;
    if (text.includes('jasoser') && title.toLowerCase().includes('jasoser')) return true;
    if (text.includes('stock') && title.toLowerCase().includes('stock')) return true;
    if (text.includes('gpt') && title.toLowerCase().includes('gpt')) return true;
    if (text.includes('알고리집') && title.toLowerCase().includes('알고리')) return true;
    return false;
  };

  const generateReply = (userInput: string) => {
    const text = userInput.toLowerCase();
    
    // 1. Projects Search
    if (text.includes('프로젝트') || text.includes('project') || text.includes('어떤 거') || text.includes('만든 거')) {
      const titles = data.projects.map(p => `- ${p.title}`).join('\n');
      return `저는 다음과 같은 프로젝트들을 진행했습니다:\n${titles}\n\n특정 프로젝트(예: soscctv)에 대해 물어보시면 더 자세히 설명해 드릴게요!`;
    }

    const matchedProject = data.projects.find(p => text.includes(p.title.toLowerCase()) || titleContains(p.title, text));
    if (matchedProject) {
      return `[${matchedProject.title}] 프로젝트에 대해 알려드릴게요!\n\n💡 목표: ${matchedProject.objective}\n🛠 사용 기술: ${matchedProject.techStack}\n\n자세한 내용은 포트폴리오의 본문과 트러블슈팅란을 참고해 주세요!`;
    }

    // 2. Careers & Education
    if (text.includes('경력') || text.includes('경험') || text.includes('career') || text.includes('이력') || text.includes('회사')) {
      let careers = [];
      try { careers = JSON.parse(data.aboutMe?.careers || '[]'); } catch(e){}
      if (careers.length > 0) {
        return `제 주요 경력/경험은 다음과 같습니다:\n${careers.map((c: any) => `- ${c.value}`).join('\n')}`;
      } else {
        return '현재 등록된 경력 정보가 없습니다. (Admin 페이지에서 추가해주세요!)';
      }
    }

    if (text.includes('기술') || text.includes('스택') || text.includes('stack') || text.includes('할 줄 아는')) {
      return 'AI/딥러닝(PyTorch, RAG, 비전), MLOps(MLflow, Airflow), 백엔드(Python, FastAPI), 그리고 기본적인 프론트엔드 역량을 갖추고 있습니다. 구체적인 사항은 Core Capabilities 섹션을 확인해주시면 감사하겠습니다!';
    }
    
    if (text.includes('연락처') || text.includes('이메일') || text.includes('번호') || text.includes('email') || text.includes('contact')) {
      return '최하단의 About Me 섹션을 확인하시면 저의 이메일 및 상세 연락처를 확인하실 수 있습니다!';
    }

    if (text.includes('안녕') || text.includes('반갑') || text.includes('hello') || text.includes('hi')) {
      return '안녕하세요! 포트폴리오를 방문해 주셔서 감사합니다. 무엇이든 물어보세요!';
    }

    // Default Fallback
    return '현재 화면에 제공된 포트폴리오 정보 안에서 답변을 드리고 있습니다. 특정 프로젝트 이름(예: GPTNotebook)이나 "경력", "기술스택" 등의 키워드를 포함해서 질문해 주시면 더욱 정확하게 답변할 수 있습니다!';
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    
    // Simulate thinking delay
    setTimeout(() => {
      const reply = generateReply(userMessage);
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 10px 25px rgba(155, 81, 224, 0.4)',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'scale(0)' : 'scale(1)'
        }}
        title="AI 챗봇에게 질문하기"
      >
        <MessageSquare size={28} color="white" />
      </button>

      {/* Chat Window */}
      <div 
        className="glass-panel"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: 'min(350px, calc(100vw - 48px))',
          height: '500px',
          maxHeight: 'calc(100vh - 48px)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transformOrigin: 'bottom right',
          transform: isOpen ? 'scale(1)' : 'scale(0)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px', background: 'rgba(155, 81, 224, 0.15)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <Bot size={20} color="var(--primary)" /> 포트폴리오 AI 챗봇
          </div>
          <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ 
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: 'white',
              padding: '10px 14px',
              borderRadius: '16px',
              borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
              borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
              maxWidth: '85%',
              wordBreak: 'break-word',
              fontSize: '0.95rem',
              lineHeight: '1.4',
              whiteSpace: 'pre-line'
            }}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '8px' }}>
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="궁금한 점을 질문해 보세요..."
            style={{
              flex: 1,
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '10px 16px',
              color: 'white',
              outline: 'none',
              fontSize: '0.9rem'
            }}
          />
          <button onClick={handleSend} style={{ background: 'var(--primary)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <Send size={18} color="white" />
          </button>
        </div>
      </div>
    </>
  );
}
