import { useState, useEffect, useMemo } from 'react';
import { CheckCircle, Circle, ExternalLink, Terminal, Search, Award } from 'lucide-react';
import questionsData from './questions.json';
import './index.css';

function App() {
  const [solvedIds, setSolvedIds] = useState([]);
  const [activeTopic, setActiveTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch initial solved state from backend
  useEffect(() => {
    fetch('/api/progress')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSolvedIds(data);
        } else {
          console.error("Backend returned an error or invalid data:", data);
        }
      })
      .catch(err => console.error("Failed to load progress:", err));
  }, []);

  const toggleSolved = (id) => {
    const newSolvedIds = solvedIds.includes(id) 
      ? solvedIds.filter(qId => qId !== id) 
      : [...solvedIds, id];
      
    // Optimistic update
    setSolvedIds(newSolvedIds);
    
    // Sync with backend
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ solvedIds: newSolvedIds })
    }).catch(err => console.error("Failed to sync progress:", err));
  };

  const topics = useMemo(() => {
    const allTopics = questionsData.map(q => q.topic);
    return ['All', ...new Set(allTopics)];
  }, []);

  const filteredQuestions = useMemo(() => {
    return questionsData.filter(q => {
      const matchesTopic = activeTopic === 'All' || q.topic === activeTopic;
      const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            q.id.toString().includes(searchQuery);
      return matchesTopic && matchesSearch;
    });
  }, [activeTopic, searchQuery]);

  const progressPercentage = Math.round((solvedIds.length / questionsData.length) * 100) || 0;

  return (
    <div className="app-container">
      {/* Sidebar - Topics */}
      <aside className="sidebar glass-panel">
        <div className="sidebar-header">
          <Terminal size={24} className="text-primary" />
          <h1>LeetCode Tracker</h1>
        </div>
        
        <div className="p-4 border-b border-[rgba(255,255,255,0.1)]">
          <div className="flex justify-between text-sm mb-2 text-muted">
            <span>Overall Progress</span>
            <span>{solvedIds.length} / {questionsData.length}</span>
          </div>
          <div className="h-2 w-full bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="question-list" style={{ marginTop: '1rem' }}>
          {topics.map(topic => {
            const topicQuestions = topic === 'All' ? questionsData : questionsData.filter(q => q.topic === topic);
            const topicSolved = topicQuestions.filter(q => solvedIds.includes(q.id)).length;
            
            return (
              <div 
                key={topic} 
                className={`question-card ${activeTopic === topic ? 'active' : ''}`}
                onClick={() => setActiveTopic(topic)}
              >
                <div className="question-info">
                  <span className="question-title">{topic}</span>
                  <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                    {topicSolved} / {topicQuestions.length} solved
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content glass-panel" style={{ backgroundColor: 'transparent' }}>
        <div className="main-header flex-col" style={{ alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <h2>{activeTopic} Questions</h2>
            {progressPercentage === 100 && activeTopic === 'All' && (
              <div className="flex items-center gap-2 text-success">
                <Award size={24} />
                <span>All Completed!</span>
              </div>
            )}
          </div>
          
          <div className="search-bar" style={{ width: '100%', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by ID or Title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border)',
                color: 'var(--text-main)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        <div className="editor-section" style={{ padding: '0', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.5rem' }}>
            {filteredQuestions.map(q => {
              const isSolved = solvedIds.includes(q.id);
              return (
                <div 
                  key={q.id} 
                  className="question-card" 
                  style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    padding: '1.25rem',
                    background: isSolved ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.03)',
                    borderColor: isSolved ? 'rgba(16, 185, 129, 0.2)' : 'transparent'
                  }}
                >
                  <button 
                    onClick={() => toggleSolved(q.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem', color: isSolved ? 'var(--success)' : 'var(--text-muted)' }}
                  >
                    {isSolved ? <CheckCircle size={24} /> : <Circle size={24} />}
                  </button>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                      <span className="code-font" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>#{q.id}</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 500, color: isSolved ? 'var(--text-muted)' : 'var(--text-main)', textDecoration: isSolved ? 'line-through' : 'none' }}>
                        {q.title}
                      </span>
                    </div>
                    <span className={`difficulty-badge diff-${q.difficulty.toLowerCase()}`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <a 
                    href={q.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}
                  >
                    Solve on LeetCode <ExternalLink size={16} />
                  </a>
                </div>
              );
            })}
            
            {filteredQuestions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                No questions found.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
