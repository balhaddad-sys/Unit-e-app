/* MKH Admission Triage - React Application */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ============================================================
   SVG Icon Component
   ============================================================ */
function Icon({ name, size, className }) {
  return React.createElement('span', {
    className: className || '',
    dangerouslySetInnerHTML: { __html: icon(name, size || 24) },
    style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }
  });
}

/* ============================================================
   Toast Component
   ============================================================ */
function Toast({ message, visible, iconName }) {
  if (!visible) return null;
  return React.createElement('div', { className: 'toast' },
    iconName && React.createElement(Icon, { name: iconName, size: 18 }),
    message
  );
}

/* ============================================================
   App Header
   ============================================================ */
function AppHeader({ onBack, showBack, categoryName }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const timeStr = useMemo(() => {
    const h = time.getHours(), m = time.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    return (h % 12 || 12) + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
  }, [time]);

  return React.createElement('header', { className: 'app-header' },
    showBack && React.createElement('button', {
      className: 'header-back-btn',
      onClick: onBack,
      'aria-label': 'Go back'
    }, React.createElement(Icon, { name: 'arrowLeft', size: 20 })),

    React.createElement('div', { className: 'header-logo' },
      React.createElement('div', { className: 'header-logo-icon' },
        React.createElement(Icon, { name: 'stethoscope', size: 20 })
      ),
      React.createElement('div', null,
        React.createElement('div', { className: 'header-title' },
          categoryName || 'MKH Admission Triage'
        ),
        React.createElement('div', { className: 'header-subtitle' },
          'Mubarak Al-Kabeer Hospital'
        )
      )
    ),

    React.createElement('div', { className: 'header-clock' }, timeStr)
  );
}

/* ============================================================
   Category Card
   ============================================================ */
function CategoryCard({ category, onClick }) {
  const catColor = category.color;
  return React.createElement('div', {
    className: 'category-card',
    onClick: () => onClick(category),
    role: 'button',
    tabIndex: 0,
    onKeyDown: (e) => { if (e.key === 'Enter') onClick(category); }
  },
    React.createElement('div', {
      className: 'category-icon-wrap',
      style: { background: catColor + '20', color: catColor }
    }, React.createElement(Icon, { name: category.icon, size: 24 })),

    React.createElement('div', { className: 'category-info' },
      React.createElement('div', { className: 'category-name' }, category.name),
      React.createElement('div', { className: 'category-desc' }, category.desc)
    ),

    React.createElement('div', { className: 'category-page-badge' }, 'pp. ' + category.pages),

    React.createElement('div', { className: 'category-arrow' },
      React.createElement(Icon, { name: 'chevRight', size: 18 })
    )
  );
}

/* ============================================================
   Recent Triages
   ============================================================ */
function RecentTriages({ onSelect }) {
  const sessions = useMemo(() => getTriageHistory(), []);
  if (sessions.length === 0) return null;

  return React.createElement('div', { className: 'recent-section' },
    React.createElement('div', { className: 'section-label' }, 'Recent Triages'),
    React.createElement('div', { className: 'recent-list' },
      sessions.slice(0, 5).map((s, i) =>
        React.createElement('div', {
          key: s.id || i,
          className: 'recent-item',
          onClick: () => {
            const cat = getCategory(s.categoryId);
            if (cat) onSelect(cat);
          }
        },
          React.createElement('div', {
            className: 'recent-dept-dot',
            style: { background: getDepartment(s.department).color }
          }),
          React.createElement('div', { className: 'recent-info' },
            React.createElement('div', { className: 'recent-category' }, s.categoryName),
            React.createElement('div', { className: 'recent-dept' }, s.verdict)
          ),
          React.createElement('div', { className: 'recent-time' },
            formatTriageTime(s.timestamp)
          )
        )
      )
    )
  );
}

/* ============================================================
   Category Grid (Landing Screen)
   ============================================================ */
function CategoryGrid({ onSelectCategory }) {
  return React.createElement('div', { className: 'landing-container' },
    React.createElement('div', { className: 'landing-hero' },
      React.createElement('h1', null, 'Admission Triage'),
      React.createElement('p', null,
        'Clinical decision support for on-call physicians. Select a presentation category to begin assessment.'
      )
    ),

    React.createElement('div', { className: 'section-label' }, 'Clinical Categories'),

    React.createElement('div', { className: 'category-grid' },
      CATEGORIES.map(cat =>
        React.createElement(CategoryCard, {
          key: cat.id,
          category: cat,
          onClick: onSelectCategory
        })
      )
    ),

    React.createElement(RecentTriages, { onSelect: onSelectCategory })
  );
}

/* ============================================================
   Progress Bar
   ============================================================ */
function ProgressBar({ history, currentStep, onStepClick }) {
  const total = history.length + 1;
  return React.createElement('div', { className: 'progress-bar' },
    Array.from({ length: total }, (_, i) =>
      React.createElement(React.Fragment, { key: i },
        i > 0 && React.createElement('div', {
          className: 'progress-connector' + (i <= history.length ? ' completed' : '')
        }),
        React.createElement('div', {
          className: 'progress-dot' +
            (i === total - 1 ? ' active' : '') +
            (i < total - 1 ? ' completed' : ''),
          onClick: () => { if (i < history.length) onStepClick(i); },
          title: 'Step ' + (i + 1)
        })
      )
    ),
    React.createElement('span', { className: 'progress-label' },
      'Step ' + total
    )
  );
}

/* ============================================================
   Option Button
   ============================================================ */
function OptionButton({ option, onClick }) {
  return React.createElement('button', {
    className: 'option-btn',
    onClick: () => onClick(option),
    type: 'button'
  },
    React.createElement('div', { className: 'option-content' },
      React.createElement('div', { className: 'option-label' }, option.label),
      option.desc && React.createElement('div', { className: 'option-desc' }, option.desc)
    ),
    React.createElement('div', { className: 'option-arrow' },
      React.createElement(Icon, { name: 'chevRight', size: 16 })
    )
  );
}

/* ============================================================
   Question Card
   ============================================================ */
function QuestionCard({ node, category, onSelectOption }) {
  return React.createElement('div', { className: 'question-card', key: node.text },
    React.createElement('div', { className: 'question-header' },
      React.createElement('div', {
        className: 'question-category-badge',
        style: { background: category.color + '20', color: category.color }
      },
        React.createElement(Icon, { name: category.icon, size: 14 }),
        category.name
      ),
      React.createElement('h2', { className: 'question-text' }, node.text),
      node.subtitle && React.createElement('p', { className: 'question-subtitle' }, node.subtitle)
    ),
    React.createElement('div', { className: 'options-list' },
      node.options.map(opt =>
        React.createElement(OptionButton, {
          key: opt.id,
          option: opt,
          onClick: onSelectOption
        })
      )
    )
  );
}

/* ============================================================
   Citation Panel
   ============================================================ */
function CitationPanel({ citation }) {
  if (!citation) return null;
  return React.createElement('div', { className: 'verdict-section' },
    React.createElement('div', { className: 'verdict-section-title' },
      React.createElement(Icon, { name: 'book', size: 14 }),
      'Protocol Reference'
    ),
    React.createElement('div', { className: 'citation-panel' },
      React.createElement('div', { className: 'citation-header' },
        React.createElement('span', { className: 'citation-label' },
          'MKH Internal Medicine Protocols, Nov 2024'
        )
      ),
      React.createElement('blockquote', { className: 'citation-text' },
        '\u201C' + citation.text + '\u201D'
      ),
      React.createElement('div', { className: 'citation-meta' },
        React.createElement('span', { className: 'citation-page' }, 'Page ' + citation.page),
        React.createElement('span', { className: 'citation-section' }, citation.section)
      )
    )
  );
}

/* ============================================================
   Verdict Card
   ============================================================ */
function VerdictCard({ node, category, onRestart, onNewCategory, history }) {
  const [copied, setCopied] = useState(false);
  const dept = getDepartment(node.department);
  const secDept = node.secondaryDepartment ? getDepartment(node.secondaryDepartment) : null;
  const isDual = !!secDept;

  const copyVerdict = useCallback(() => {
    const lines = [
      'TRIAGE VERDICT',
      'Category: ' + category.name,
      'Admit to: ' + dept.label,
      secDept ? 'Initial Assessment: ' + secDept.label : '',
      '',
      'Criteria met:',
      ...node.criteria.map(c => '  - ' + c),
      '',
      'Protocol Reference: MKH Internal Medicine Protocols, Page ' + node.citation.page + ', ' + node.citation.section,
      '"' + node.citation.text + '"',
      '',
      node.consultNotes ? 'Note: ' + node.consultNotes : '',
      node.conditionalNote ? 'Conditional: ' + node.conditionalNote : '',
      '',
      'Generated: ' + formatTriageDate(Date.now()) + ', ' + formatTriageTime(Date.now())
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(lines).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }, [node, category, dept, secDept]);

  // Save session on mount
  useEffect(() => {
    saveTriage({
      id: Date.now().toString(36),
      timestamp: Date.now(),
      categoryId: category.id,
      categoryName: category.name,
      department: node.department,
      verdict: node.title,
      steps: history.length + 1
    });
  }, []);

  return React.createElement('div', { className: 'verdict-card' },
    // Department Header
    React.createElement('div', {
      className: 'verdict-department-section',
      style: { '--dept-color': dept.color }
    },
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px', background: dept.color
        }
      }),

      !isDual ? React.createElement(React.Fragment, null,
        React.createElement('div', {
          className: 'verdict-icon-large',
          style: { background: dept.bg, color: dept.color }
        }, React.createElement(Icon, { name: category.icon, size: 32 })),
        React.createElement('div', { className: 'verdict-label-prefix' }, 'Admit To'),
        React.createElement('div', {
          className: 'verdict-department-name',
          style: { color: dept.color }
        }, dept.label)
      ) : React.createElement(React.Fragment, null,
        React.createElement('div', { className: 'verdict-dual' },
          React.createElement('div', { className: 'verdict-dual-dept' },
            React.createElement('div', { className: 'verdict-dual-label' }, 'Initial Assessment'),
            React.createElement('div', {
              className: 'verdict-dual-name',
              style: { color: secDept.color }
            }, secDept.label)
          ),
          React.createElement('div', { className: 'verdict-dual-arrow' },
            React.createElement(Icon, { name: 'arrowRight', size: 24 })
          ),
          React.createElement('div', { className: 'verdict-dual-dept' },
            React.createElement('div', { className: 'verdict-dual-label' }, 'Admit Under'),
            React.createElement('div', {
              className: 'verdict-dual-name',
              style: { color: dept.color }
            }, dept.label)
          )
        )
      ),

      React.createElement('div', { className: 'verdict-title' }, node.summary)
    ),

    // Criteria
    node.criteria && node.criteria.length > 0 && React.createElement('div', { className: 'verdict-section' },
      React.createElement('div', { className: 'verdict-section-title' },
        React.createElement(Icon, { name: 'list', size: 14 }),
        'Criteria'
      ),
      React.createElement('ul', { className: 'criteria-list' },
        node.criteria.map((c, i) =>
          React.createElement('li', { key: i, className: 'criteria-item' },
            React.createElement('div', { className: 'criteria-bullet' }),
            React.createElement('span', null, c)
          )
        )
      ),

      // Consult Note
      node.consultNotes && React.createElement('div', { className: 'consult-note' },
        React.createElement('div', { className: 'consult-note-icon' },
          React.createElement(Icon, { name: 'info', size: 16 })
        ),
        React.createElement('div', { className: 'consult-note-text' }, node.consultNotes)
      ),

      // Conditional Note
      node.conditionalNote && React.createElement('div', { className: 'conditional-note' },
        React.createElement('div', { className: 'conditional-note-icon' },
          React.createElement(Icon, { name: 'clock', size: 16 })
        ),
        React.createElement('div', { className: 'conditional-note-text' }, node.conditionalNote)
      )
    ),

    // Citation
    React.createElement(CitationPanel, { citation: node.citation }),

    // Action Buttons
    React.createElement('div', { className: 'action-buttons' },
      React.createElement('button', {
        className: 'action-btn action-btn-copy' + (copied ? ' copied' : ''),
        onClick: copyVerdict
      },
        React.createElement(Icon, { name: copied ? 'check' : 'copy', size: 18 }),
        copied ? 'Copied' : 'Copy'
      ),
      React.createElement('button', {
        className: 'action-btn action-btn-secondary',
        onClick: onRestart
      },
        React.createElement(Icon, { name: 'refresh', size: 18 }),
        'Restart'
      ),
      React.createElement('button', {
        className: 'action-btn action-btn-primary',
        onClick: onNewCategory
      },
        'New Category'
      )
    )
  );
}

/* ============================================================
   History Trail
   ============================================================ */
function HistoryTrail({ history, onStepClick }) {
  const [expanded, setExpanded] = useState(true);
  if (history.length === 0) return null;

  return React.createElement('div', { className: 'history-trail' },
    React.createElement('div', {
      className: 'history-trail-title' + (expanded ? ' expanded' : ''),
      onClick: () => setExpanded(!expanded)
    },
      React.createElement(Icon, { name: 'chevDown', size: 14 }),
      'Decision Path (' + history.length + ' step' + (history.length > 1 ? 's' : '') + ')'
    ),

    expanded && React.createElement('div', { className: 'history-items' },
      history.map((h, i) => {
        const node = getNode(h.nodeId);
        const option = node && node.options ?
          node.options.find(o => o.id === h.selectedOptionId) : null;

        return React.createElement('div', {
          key: i,
          className: 'history-item',
          onClick: () => onStepClick(i)
        },
          React.createElement('div', { className: 'history-step-num' }, i + 1),
          React.createElement('div', { className: 'history-content' },
            React.createElement('div', { className: 'history-question' },
              node ? node.text : 'Question'
            ),
            React.createElement('div', { className: 'history-answer' },
              option ? option.label : 'Answer'
            )
          )
        );
      })
    )
  );
}

/* ============================================================
   Decision Engine
   ============================================================ */
function DecisionEngine({ category, onBack }) {
  const [currentNodeId, setCurrentNodeId] = useState(category.entry);
  const [history, setHistory] = useState([]);
  const containerRef = useRef(null);

  const currentNode = useMemo(() => getNode(currentNodeId), [currentNodeId]);

  const selectOption = useCallback((option) => {
    setHistory(prev => [...prev, {
      nodeId: currentNodeId,
      selectedOptionId: option.id,
      timestamp: Date.now()
    }]);
    setCurrentNodeId(option.next);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentNodeId]);

  const goBack = useCallback(() => {
    if (history.length === 0) {
      onBack();
      return;
    }
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setCurrentNodeId(prev.nodeId);
  }, [history, onBack]);

  const goToStep = useCallback((stepIndex) => {
    const target = history[stepIndex];
    setHistory(h => h.slice(0, stepIndex));
    setCurrentNodeId(target.nodeId);
  }, [history]);

  const restart = useCallback(() => {
    setCurrentNodeId(category.entry);
    setHistory([]);
  }, [category]);

  // Swipe back gesture
  useEffect(() => {
    let startX = 0;
    const onTouchStart = (e) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 80) goBack();
    };
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [goBack]);

  if (!currentNode) {
    return React.createElement('div', { className: 'triage-container' },
      React.createElement('p', null, 'Error: Node not found. '),
      React.createElement('button', {
        className: 'action-btn action-btn-primary',
        onClick: restart
      }, 'Restart')
    );
  }

  const isVerdict = currentNode.type === 'verdict';

  return React.createElement('div', { className: 'triage-container', ref: containerRef },
    React.createElement(ProgressBar, {
      history: history,
      currentStep: history.length,
      onStepClick: goToStep
    }),

    isVerdict
      ? React.createElement(VerdictCard, {
          node: currentNode,
          category: category,
          onRestart: restart,
          onNewCategory: onBack,
          history: history
        })
      : React.createElement(QuestionCard, {
          node: currentNode,
          category: category,
          onSelectOption: selectOption
        }),

    !isVerdict && React.createElement(HistoryTrail, {
      history: history,
      onStepClick: goToStep
    })
  );
}

/* ============================================================
   Main App
   ============================================================ */
function TriageApp() {
  const [screen, setScreen] = useState('categories');
  const [activeCategory, setActiveCategory] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '', icon: '' });

  const startCategory = useCallback((category) => {
    setActiveCategory(category);
    setScreen('triage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToCategories = useCallback(() => {
    setScreen('categories');
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    if (screen === 'triage') {
      goToCategories();
    }
  }, [screen, goToCategories]);

  return React.createElement(React.Fragment, null,
    React.createElement(AppHeader, {
      onBack: handleBack,
      showBack: screen === 'triage',
      categoryName: activeCategory ? activeCategory.name : null
    }),

    screen === 'categories'
      ? React.createElement(CategoryGrid, { onSelectCategory: startCategory })
      : React.createElement(DecisionEngine, {
          key: activeCategory ? activeCategory.id : 'none',
          category: activeCategory,
          onBack: goToCategories
        }),

    React.createElement(Toast, toast)
  );
}

/* ============================================================
   Mount
   ============================================================ */
const root = ReactDOM.createRoot(document.getElementById('triage-root'));
root.render(React.createElement(TriageApp));
