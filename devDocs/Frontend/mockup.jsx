import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Undo2, Redo2, Menu, User, Search, MessageSquare, Home, Info, Settings, X, Send, Maximize2, Minimize2, Bell, Eye, Network, Cloud, FileText, Image, Video, BarChart3, Code, Table, ChevronLeft, Plus, Lock, Mail, HelpCircle, Ticket, RotateCcw } from 'lucide-react';

// Tree Node Component for Flow
const TreeNode = ({ node, level = 0, selectedTopic, onSelect }) => {
  const [expanded, setExpanded] = useState(node.expanded ?? true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedTopic === node.id;
  
  return (
    <div style={{ marginLeft: level * 12 }}>
      <div 
        className={`flex items-center gap-1 py-1 px-2 rounded cursor-pointer text-sm transition-all ${
          isSelected ? 'bg-amber-100 text-amber-900' : 'hover:bg-slate-100 text-slate-700'
        } ${node.isSection ? 'font-semibold text-slate-500 uppercase text-xs tracking-wide mt-2' : ''}`}
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
          if (!node.isSection) onSelect(node.id);
        }}
      >
        {hasChildren && !node.isSection && (
          expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
        )}
        {!hasChildren && !node.isSection && <span className="w-3.5" />}
        <span className={node.current ? 'text-amber-700 font-medium' : ''}>{node.label}</span>
        {node.count && <span className="text-slate-400 text-xs ml-1">({node.count})</span>}
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} level={level + 1} selectedTopic={selectedTopic} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

// Knowledge Graph Component
const KnowledgeGraph = () => {
  const nodes = [
    { id: 1, label: 'Dead Sea Scrolls', x: 50, y: 30 },
    { id: 2, label: 'Josephus', x: 180, y: 60 },
    { id: 3, label: 'Essenes vs Tzadokites', x: 320, y: 40 },
    { id: 4, label: 'Early Christianity', x: 460, y: 70 },
    { id: 5, label: 'Hebrew U Talmud', x: 120, y: 140 },
    { id: 6, label: 'Rachel Elior', x: 260, y: 120 },
    { id: 7, label: 'Maren Niehoff', x: 400, y: 150 },
    { id: 8, label: 'DSS Website', x: 80, y: 220 },
    { id: 9, label: 'Golan', x: 220, y: 200 },
    { id: 10, label: 'Bashan', x: 340, y: 230 },
    { id: 11, label: 'Syria 2026', x: 470, y: 210 },
    { id: 12, label: 'Yazidis', x: 540, y: 260 },
  ];
  
  const edges = [
    [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [6, 7],
    [5, 8], [8, 9], [9, 10], [10, 11], [11, 12], [6, 9]
  ];

  return (
    <svg viewBox="0 0 600 300" className="w-full h-64">
      <defs>
        <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
      {edges.map(([from, to], i) => {
        const n1 = nodes.find(n => n.id === from);
        const n2 = nodes.find(n => n.id === to);
        return (
          <line key={i} x1={n1.x + 40} y1={n1.y + 12} x2={n2.x + 40} y2={n2.y + 12} 
            stroke="url(#edgeGrad)" strokeWidth="2" opacity="0.6" />
        );
      })}
      {nodes.map(node => (
        <g key={node.id} className="cursor-pointer hover:opacity-80 transition-opacity">
          <rect x={node.x} y={node.y} width={80} height={24} rx="12" 
            fill="#1e293b" className="drop-shadow-md" />
          <text x={node.x + 40} y={node.y + 16} textAnchor="middle" 
            fill="white" fontSize="9" fontWeight="500">{node.label}</text>
        </g>
      ))}
    </svg>
  );
};

// Main App
export default function ChAiTApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [aboutTab, setAboutTab] = useState('about');
  const [adminTab, setAdminTab] = useState('users');
  const [moreTab, setMoreTab] = useState('canvas');
  const [knowledgeView, setKnowledgeView] = useState('kg');
  const [selectedTopic, setSelectedTopic] = useState('jslm-war');
  const [discussionExpanded, setDiscussionExpanded] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [unreadDiscussion, setUnreadDiscussion] = useState(3);
  const [unreadMore, setUnreadMore] = useState(1);
  const [canvasArtifact, setCanvasArtifact] = useState('exploration');

  const handleShowHistory = () => {
    setMoreTab('canvas');
    setCanvasArtifact('history');
  };

  const flowTree = [
    { isSection: true, label: 'Earlier', children: [
      { id: 'talmudic', label: 'Talmudic srcs Hellenic prd', children: [] },
      { id: 'brothers-wars', label: 'Hasmonean Brothers wars', expanded: true, children: [
        { id: 'brothers-intro', label: 'Hasmonean brothers', count: '1/4' },
        { id: 'roman-bg', label: 'Roman intervention bg', count: '2/4' },
      ]},
      { id: 'sidetrack', label: 'Sidetrack', expanded: true, children: [
        { id: 'set-reminder', label: 'Set reminder' },
      ]},
    ]},
    { isSection: true, label: 'Current', children: [
      { id: 'brothers-wars-2', label: 'Hasmonean Brothers wars', expanded: true, children: [
        { id: 'jslm-war', label: '1st Jslm war', count: '3/4', current: true },
      ]},
    ]},
    { isSection: true, label: 'Planned', children: [
      { id: 'brothers-wars-3', label: 'Hasmonean Brothers wars', expanded: true, children: [
        { id: 'aftermath', label: '1st Jslm war aftermath', count: '4/4' },
      ]},
    ]},
  ];

  const chatMessages = [
    { role: 'user', text: 'Tell me about the first Jerusalem battle in the Hasmonean brothers war' },
    { role: 'ai', text: 'The First Jerusalem Battle (66 BCE) was a pivotal moment in the conflict between Hyrcanus II and Aristobulus II. After their father Alexander Jannaeus died, the brothers disputed succession to the Hasmonean throne.' },
    { role: 'user', text: 'What were the Roman connections?' },
    { role: 'ai', text: 'The Roman involvement began when both brothers appealed to Pompey for support. Aristobulus fortified Jerusalem while Pompey\'s forces approached. This would eventually lead to Roman intervention and the end of Hasmonean independence.' },
    { role: 'user', text: 'Show me recent research articles about this period' },
    { role: 'ai', text: 'I\'ve gathered several recent findings. The suggested exploration form in your Canvas shows available research paths including Greek sources, modern research from Prof. Vered Noam and Hebrew University, and archaeological findings. Would you like me to focus on any particular area?' },
  ];

  // Render different pages
  const renderPage = () => {
    switch (currentPage) {
      case 'chats':
        return <ChatsPage />;
      case 'about':
        return <AboutPage aboutTab={aboutTab} setAboutTab={setAboutTab} />;
      case 'admin':
        return <AdminPage adminTab={adminTab} setAdminTab={setAdminTab} />;
      default:
        return (
          <HomePage 
            flowTree={flowTree}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            chatMessages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            moreTab={moreTab}
            setMoreTab={setMoreTab}
            knowledgeView={knowledgeView}
            setKnowledgeView={setKnowledgeView}
            discussionExpanded={discussionExpanded}
            setDiscussionExpanded={setDiscussionExpanded}
            moreExpanded={moreExpanded}
            setMoreExpanded={setMoreExpanded}
            unreadDiscussion={unreadDiscussion}
            setUnreadDiscussion={setUnreadDiscussion}
            unreadMore={unreadMore}
            setUnreadMore={setUnreadMore}
            onShowHistory={handleShowHistory}
            canvasArtifact={canvasArtifact}
            setCanvasArtifact={setCanvasArtifact}
          />
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50" style={{ fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif" }}>
      {/* Top Bar */}
      <header className="h-14 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center justify-between px-4 shadow-lg relative z-50">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-white">Ch</span>
            <span className="text-amber-400">Ai</span>
            <span className="text-white">T</span>
            <span className="text-amber-400 text-lg ml-1">8'צ</span>
          </div>
        </div>

        {/* Middle - Main Menu */}
        <nav className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'chats', icon: MessageSquare, label: 'Chats' },
            { id: 'about', icon: Info, label: 'About' },
            { id: 'admin', icon: Lock, label: 'Admin' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === item.id 
                  ? 'bg-amber-500 text-slate-900 shadow-md' 
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
            <Undo2 size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
            <Redo2 size={18} />
          </button>
          <div className="w-px h-6 bg-slate-600 mx-2" />
          <button className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-900 font-bold shadow-md">
            N
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Settings Dropdown */}
        {showSettings && (
          <div className="absolute top-full right-4 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200">
              <div className="font-semibold text-slate-900">Nick</div>
              <div className="text-sm text-slate-500">nick@example.com</div>
            </div>
            <div className="p-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-700 hover:bg-slate-100 rounded-lg">
                <Settings size={18} /> Settings
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-700 hover:bg-slate-100 rounded-lg">
                <User size={18} /> Account
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {renderPage()}
      </main>
    </div>
  );
}

// Home Page Component
function HomePage({ flowTree, selectedTopic, setSelectedTopic, chatMessages, chatInput, setChatInput, moreTab, setMoreTab, knowledgeView, setKnowledgeView, discussionExpanded, setDiscussionExpanded, moreExpanded, setMoreExpanded, unreadDiscussion, setUnreadDiscussion, unreadMore, setUnreadMore, onShowHistory, canvasArtifact, setCanvasArtifact }) {
  if (discussionExpanded) {
    return (
      <div className="h-full flex flex-col">
        <PanelHeader 
          title="Discussion" 
          badge={unreadDiscussion} 
          onBadgeClick={() => setUnreadDiscussion(0)}
          expanded={true}
          onToggleExpand={() => setDiscussionExpanded(false)}
        />
        <div className="flex-1 flex">
          <FlowPanel flowTree={flowTree} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
          <ChatPanel chatMessages={chatMessages} chatInput={chatInput} setChatInput={setChatInput} onShowHistory={onShowHistory} />
        </div>
      </div>
    );
  }

  if (moreExpanded) {
    return (
      <div className="h-full flex flex-col">
        <PanelHeader 
          title="More" 
          badge={unreadMore}
          onBadgeClick={() => setUnreadMore(0)}
          expanded={true}
          onToggleExpand={() => setMoreExpanded(false)}
        />
        <MorePanel moreTab={moreTab} setMoreTab={setMoreTab} knowledgeView={knowledgeView} setKnowledgeView={setKnowledgeView} canvasArtifact={canvasArtifact} setCanvasArtifact={setCanvasArtifact} />
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* Discussion Panel */}
      <div className="flex-1 flex flex-col border-r border-slate-200">
        <PanelHeader 
          title="Discussion" 
          badge={unreadDiscussion}
          onBadgeClick={() => setUnreadDiscussion(0)}
          onToggleExpand={() => setDiscussionExpanded(true)}
        />
        <div className="flex-1 flex min-h-0">
          <FlowPanel flowTree={flowTree} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
          <ChatPanel chatMessages={chatMessages} chatInput={chatInput} setChatInput={setChatInput} onShowHistory={onShowHistory} />
        </div>
      </div>

      {/* More Panel */}
      <div className="w-[45%] flex flex-col">
        <PanelHeader 
          title="More" 
          badge={unreadMore}
          onBadgeClick={() => setUnreadMore(0)}
          onToggleExpand={() => setMoreExpanded(true)}
        />
        <MorePanel moreTab={moreTab} setMoreTab={setMoreTab} knowledgeView={knowledgeView} setKnowledgeView={setKnowledgeView} canvasArtifact={canvasArtifact} setCanvasArtifact={setCanvasArtifact} />
      </div>
    </div>
  );
}

// Panel Header
function PanelHeader({ title, badge, onBadgeClick, expanded, onToggleExpand }) {
  return (
    <div className="h-11 bg-white border-b border-slate-200 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <h2 className="font-semibold text-slate-800">{title}</h2>
        {badge > 0 && (
          <button 
            onClick={onBadgeClick}
            className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium hover:bg-amber-200 transition-colors"
          >
            <Bell size={12} />
            {badge}
          </button>
        )}
      </div>
      <button 
        onClick={onToggleExpand}
        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-all"
      >
        {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
    </div>
  );
}

// Flow Panel
function FlowPanel({ flowTree, selectedTopic, setSelectedTopic }) {
  return (
    <div className="w-[35%] border-r border-slate-200 bg-white overflow-auto p-3">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Topic Flow</div>
      {flowTree.map((section, i) => (
        <TreeNode key={i} node={section} selectedTopic={selectedTopic} onSelect={setSelectedTopic} />
      ))}
    </div>
  );
}

// Chat Panel  
function ChatPanel({ chatMessages, chatInput, setChatInput, onShowHistory }) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Cascading Breadcrumb */}
      <div className="px-4 py-3 bg-white border-b border-slate-200">
        <div className="text-sm space-y-0.5">
          <div className="text-slate-500">Hasmonean Kingdom</div>
          <div className="text-slate-500 pl-4 flex items-center gap-1">
            <ChevronRight size={12} className="text-slate-300" />
            Brothers war
          </div>
          <div className="text-amber-600 font-medium pl-8 flex items-center gap-1">
            <ChevronRight size={12} className="text-amber-400" />
            1st Jerusalem battle
          </div>
        </div>
      </div>

      {/* Current Response Only */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-start">
          <div className="max-w-[85%] p-4 bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-md shadow-sm">
            <p className="text-sm leading-relaxed mb-3">
              Ok that battle is a broad topic. Please choose from the <span className="text-amber-600 font-medium cursor-pointer hover:underline">[[Suggestions]]</span> or tell me how to proceed.
            </p>
            <p className="text-sm leading-relaxed text-slate-600">
              You also requested a reminder for 25 minutes which I set. Want to tell me what the reminder is for?
            </p>
          </div>
        </div>
        
        {/* See full discussion link */}
        <div className="mt-4 text-center">
          <button 
            onClick={onShowHistory}
            className="text-sm text-slate-400 hover:text-amber-600 transition-colors"
          >
            See full topic discussion →
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex items-end gap-2">
          <textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-slate-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            rows={2}
          />
          <button className="p-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors shadow-md">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// More Panel
function MorePanel({ moreTab, setMoreTab, knowledgeView, setKnowledgeView, canvasArtifact, setCanvasArtifact }) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {['canvas', 'knowledge'].map(tab => (
          <button
            key={tab}
            onClick={() => setMoreTab(tab)}
            className={`flex-1 py-3 text-sm font-medium transition-all ${
              moreTab === tab 
                ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50/50' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {moreTab === 'canvas' ? <CanvasContent selectedArtifact={canvasArtifact} setSelectedArtifact={setCanvasArtifact} /> : <KnowledgeContent knowledgeView={knowledgeView} setKnowledgeView={setKnowledgeView} />}
      </div>
    </div>
  );
}

// Canvas Content
function CanvasContent({ selectedArtifact, setSelectedArtifact }) {
  return (
    <div className="space-y-4">
      {/* Artifact Chooser */}
      <div className="flex items-center gap-2 flex-wrap">
        <select 
          value={selectedArtifact}
          onChange={(e) => setSelectedArtifact(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="exploration">Suggested Exploration</option>
          <option value="history">Chat History (.md)</option>
          <option value="analysis">Chat Analysis (.md)</option>
          <option value="timeline">Timeline of Events (.md)</option>
        </select>
        <div className="flex gap-1 ml-auto">
          {[Image, Video, BarChart3, FileText, Code, Table].map((Icon, i) => (
            <button key={i} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      {selectedArtifact === 'history' && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-3">Topic Discussion History</h3>
          <p className="text-xs text-slate-400 mb-4">Hasmonean Kingdom › Brothers war › 1st Jerusalem battle</p>
          
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="max-w-[85%] p-3 bg-slate-800 text-white rounded-2xl rounded-br-md text-sm">
                Tell me about the first Jerusalem battle in the Hasmonean brothers war
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] p-3 bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-md text-sm">
                The First Jerusalem Battle (66 BCE) was a pivotal moment in the conflict between Hyrcanus II and Aristobulus II. After their father Alexander Jannaeus died, the brothers disputed succession to the Hasmonean throne.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[85%] p-3 bg-slate-800 text-white rounded-2xl rounded-br-md text-sm">
                What were the Roman connections?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] p-3 bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-md text-sm">
                The Roman involvement began when both brothers appealed to Pompey for support. Aristobulus fortified Jerusalem while Pompey's forces approached. This would eventually lead to Roman intervention and the end of Hasmonean independence.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[85%] p-3 bg-slate-800 text-white rounded-2xl rounded-br-md text-sm">
                Show me recent research articles about this period
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] p-3 bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-md text-sm">
                I've gathered several recent findings. The suggested exploration form in your Canvas shows available research paths including Greek sources, modern research from Prof. Vered Noam and Hebrew University, and archaeological findings. Would you like me to focus on any particular area?
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedArtifact === 'exploration' && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-1">Suggested Exploration Form</h3>
          <p className="text-sm text-slate-500 mb-4">Hasmonean period › Brothers war › 1st Jslm battle</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Greek sources</h4>
              <label className="flex items-center gap-2 text-slate-600 mb-1">
                <input type="checkbox" className="rounded text-amber-500" /> eskopulos phonpiktos
              </label>
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded text-amber-500" /> judean wars
              </label>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Aftermath</h4>
              <label className="flex items-center gap-2 text-slate-600 mb-1">
                <input type="checkbox" className="rounded text-amber-500" /> Agripa controversy
              </label>
              <label className="flex items-center gap-2 text-slate-600 mb-1">
                <input type="checkbox" className="rounded text-amber-500" /> Herod's legacy
              </label>
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded text-amber-500" /> Miriam the Hasmonean
              </label>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Modern research</h4>
              <label className="flex items-center gap-2 text-slate-600 mb-1">
                <input type="checkbox" className="rounded text-amber-500" /> Prof Vered Noam
              </label>
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded text-amber-500" /> Hebrew U
              </label>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Hasmonean literature</h4>
              <label className="flex items-center gap-2 text-slate-600 mb-1">
                <input type="checkbox" className="rounded text-amber-500" /> Early accounts
              </label>
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded text-amber-500" /> Josephus
              </label>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Archaeological findings</h4>
              <label className="flex items-center gap-2 text-slate-600 mb-1">
                <input type="checkbox" className="rounded text-amber-500" /> The forged artifacts
              </label>
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded text-amber-500" /> The herodian gardens
              </label>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Cultural topics</h4>
              <label className="flex items-center gap-2 text-slate-600 mb-1">
                <input type="checkbox" className="rounded text-amber-500" /> Hannuka
              </label>
              <label className="flex items-center gap-2 text-slate-600 mb-1">
                <input type="checkbox" className="rounded text-amber-500" /> Zionist narratives
              </label>
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded text-amber-500" /> Modern politics
              </label>
            </div>
          </div>
        </div>
      )}

      {selectedArtifact === 'analysis' && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
          <h3 className="font-semibold text-slate-800">Chat Analysis</h3>
          <div className="text-sm space-y-2 text-slate-600">
            <p><span className="text-slate-400">June 10, 2025 11:35</span> <span className="font-medium">Request:</span></p>
            <p className="pl-4">Topic entry: planned part.<br/>Hasmonean Brothers wars › 1st Jslm war (3/4)</p>
            <p className="text-green-600 font-medium">Confirmed.</p>
            <p><span className="font-medium">Intent:</span> links to research articles.</p>
            <p><span className="font-medium">Refinement:</span> wants certain article about recent findings (Now early Jan 2026)</p>
            <p><span className="font-medium">Result-data:</span> presented in 4 parts. This is the third.</p>
            <p><span className="font-medium">Content length:</span> 1 short paragraph.</p>
            <p className="text-amber-600">Knowledge buildup summary in Canvas document</p>
          </div>
        </div>
      )}

      {selectedArtifact === 'timeline' && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-3">Timeline of Events</h3>
          <p className="text-sm text-slate-500 mb-4">Key dates in the Brothers War</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="text-left py-2 text-slate-600 font-semibold">Year</th>
                <th className="text-left py-2 text-slate-600 font-semibold">Event</th>
                <th className="text-left py-2 text-slate-600 font-semibold">Significance</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-200">
                <td className="py-2 font-medium">67 BCE</td>
                <td className="py-2">Conflict begins</td>
                <td className="py-2">Hyrcanus II and Aristobulus II dispute succession</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 font-medium">66 BCE</td>
                <td className="py-2">First siege</td>
                <td className="py-2">Aristobulus fortifies Jerusalem</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">65 BCE</td>
                <td className="py-2">Roman intervention</td>
                <td className="py-2">Pompey arrives in the region</td>
              </tr>
            </tbody>
          </table>
          <button className="mt-3 text-amber-600 text-sm font-medium hover:text-amber-700">see more...</button>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <h4 className="font-medium text-slate-700 mb-2">Available Information:</h4>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• Roman and Eastern siege strategies</li>
          <li>• Roman enemy elite child kidnapping strategy</li>
          <li>• Food in the Roman era</li>
        </ul>
      </div>
    </div>
  );
}

// Knowledge Content
function KnowledgeContent({ knowledgeView, setKnowledgeView }) {
  return (
    <div className="space-y-4">
      {/* View Chooser */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">View:</span>
        {[
          { id: 'nodes', icon: Network, label: 'Nodes' },
          { id: 'kg', icon: Eye, label: 'KG' },
          { id: 'cloud', icon: Cloud, label: 'Word Cloud' },
        ].map(view => (
          <button
            key={view.id}
            onClick={() => setKnowledgeView(view.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
              knowledgeView === view.id 
                ? 'bg-amber-100 text-amber-700' 
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <view.icon size={16} />
            {view.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">Graph:</span>
        <select className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white">
          <option>Topic Knowledge</option>
          <option>Linguistics</option>
          <option>Logic</option>
        </select>
      </div>

      {/* Graph Display */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        {knowledgeView === 'kg' && <KnowledgeGraph />}
        {knowledgeView === 'nodes' && (
          <div className="h-64 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <Network size={48} className="mx-auto mb-2 opacity-50" />
              <p>Neural network view</p>
              <p className="text-xs">Drag to explore connections</p>
            </div>
          </div>
        )}
        {knowledgeView === 'cloud' && (
          <div className="h-64 flex items-center justify-center">
            <div className="flex flex-wrap gap-2 justify-center items-center p-4">
              {['Hasmonean', 'Jerusalem', 'Pompey', 'Josephus', 'Hyrcanus', 'Aristobulus', 'Rome', 'Siege', 'Temple', 'Dynasty'].map((word, i) => (
                <span 
                  key={word}
                  className="text-slate-700 hover:text-amber-600 cursor-pointer transition-colors"
                  style={{ fontSize: `${Math.max(12, 28 - i * 2)}px`, opacity: 1 - i * 0.06 }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-slate-400">
        <p>Associations › Dead sea scrolls › Josephus › Essenes vs Tzadokites › Early Christianity</p>
      </div>
    </div>
  );
}

// Chats Page
function ChatsPage() {
  const categories = {
    'History': ['Hasmonean Brothers War', 'Roman Republic', 'Second Temple Period'],
    'Research': ['Prof Vered Noam Papers', 'Archaeological Methods'],
    'Personal': ['Study Notes', 'Book Recommendations'],
  };

  return (
    <div className="h-full bg-white p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Your Chats</h1>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        {/* Categories */}
        {Object.entries(categories).map(([category, chats]) => (
          <div key={category} className="mb-6">
            <h2 className="text-lg font-semibold text-slate-700 mb-3">{category}</h2>
            <div className="space-y-2">
              {chats.map(chat => (
                <button 
                  key={chat}
                  className="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-all group"
                >
                  <MessageSquare size={20} className="text-slate-400 group-hover:text-amber-500" />
                  <span className="text-slate-700">{chat}</span>
                  <ChevronRight size={18} className="text-slate-300 ml-auto group-hover:text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Historical */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">Historical Chats</h2>
          <p className="text-slate-500 text-sm">View your archived conversations</p>
        </div>
      </div>
    </div>
  );
}

// About Page
function AboutPage({ aboutTab, setAboutTab }) {
  const tabs = ['about', 'issues', 'contact', 'faq'];
  
  return (
    <div className="h-full bg-white flex">
      {/* Sidebar */}
      <div className="w-56 border-r border-slate-200 p-4">
        <h2 className="font-semibold text-slate-800 mb-4">About</h2>
        {[
          { id: 'about', label: 'About Us', icon: Info },
          { id: 'issues', label: 'My Issues', icon: Ticket },
          { id: 'contact', label: 'Contact Us', icon: Mail },
          { id: 'faq', label: 'FAQ', icon: HelpCircle },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setAboutTab(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-1 transition-all ${
              aboutTab === tab.id ? 'bg-amber-100 text-amber-700' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {aboutTab === 'about' && (
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">About ChAiT.ai</h1>
            <p className="text-slate-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        )}

        {aboutTab === 'issues' && (
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">My Issues</h1>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-800">Problem with subtopics</h3>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Closed</span>
              </div>
              <p className="text-sm text-slate-500 mb-3">Ticket #1234 • Closed on Jan 15, 2026</p>
              <button className="flex items-center gap-2 text-amber-600 text-sm font-medium hover:text-amber-700">
                <RotateCcw size={14} /> Reopen
              </button>
            </div>
          </div>
        )}

        {aboutTab === 'contact' && (
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Contact Us</h1>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-all">
                <Ticket size={20} className="text-amber-500" />
                <div>
                  <p className="font-medium text-slate-800">Support Tickets</p>
                  <p className="text-sm text-slate-500">Create or view support tickets</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-all">
                <MessageSquare size={20} className="text-amber-500" />
                <div>
                  <p className="font-medium text-slate-800">Support Chat</p>
                  <p className="text-sm text-slate-500">Chat with our support team</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-all">
                <Mail size={20} className="text-amber-500" />
                <div>
                  <p className="font-medium text-slate-800">Email Us</p>
                  <p className="text-sm text-slate-500">service@overstand.com</p>
                </div>
              </button>
            </div>

            {/* Service Chat Preview */}
            <div className="mt-6 bg-slate-800 rounded-xl p-4 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold">J</div>
                <div>
                  <p className="font-medium">Jane</p>
                  <p className="text-xs text-slate-400">Support Agent</p>
                </div>
              </div>
              <p className="text-sm mb-4">Hi I'm Jane. Please choose your issue:</p>
              <div className="space-y-2">
                {['1. Unsubscribe', '2. Password', '3. Technical question', '4. Client service', '5. Other'].map((option) => (
                  <button key={option} className="w-full text-left px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {aboutTab === 'faq' && (
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">FAQ</h1>
            <p className="text-slate-500">Frequently asked questions coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Admin Page
function AdminPage({ adminTab, setAdminTab }) {
  const [showQuarantine, setShowQuarantine] = useState(false);

  return (
    <div className="h-full bg-white flex">
      {/* Sidebar */}
      <div className="w-56 border-r border-slate-200 p-4">
        <h2 className="font-semibold text-slate-800 mb-4">Admin</h2>
        {['users', 'roles', 'chats'].map(tab => (
          <button
            key={tab}
            onClick={() => setAdminTab(tab)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 capitalize transition-all ${
              adminTab === tab ? 'bg-amber-100 text-amber-700' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800 capitalize">{adminTab}</h1>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowQuarantine(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !showQuarantine ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Active
              </button>
              <button 
                onClick={() => setShowQuarantine(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  showQuarantine ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Quarantine
              </button>
            </div>
          </div>

          {/* Profile Card (for users) */}
          {adminTab === 'users' && !showQuarantine && (
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl font-bold text-white">
                  N
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Nick</h3>
                  <p className="text-slate-500">Administrator</p>
                  <p className="text-sm text-slate-400">nick@example.com</p>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Name</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">
                    {adminTab === 'users' ? 'Email' : adminTab === 'roles' ? 'Permissions' : 'Created'}
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map(i => (
                  <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">
                      {adminTab === 'users' ? `User ${i}` : adminTab === 'roles' ? `Role ${i}` : `Chat ${i}`}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-sm">
                      {adminTab === 'users' ? `user${i}@example.com` : adminTab === 'roles' ? 'Read, Write' : 'Jan 10, 2026'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        showQuarantine ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {showQuarantine ? 'Quarantined' : 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}