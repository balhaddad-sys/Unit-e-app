// ═══════════════════════════════════════════════════════════════════════════
// UNIT E WARD ROUNDS - REACT APPLICATION
// ═══════════════════════════════════════════════════════════════════════════

const { useState, useEffect, useRef, useCallback, useMemo } = React;

// Toast
const Toast = ({ message }) => message ? <div className="toast">{message}</div> : null;

// Notice Banner
const NoticeBanner = ({ notice, onSave }) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(notice?.text || '');
    useEffect(() => setText(notice?.text || ''), [notice?.text]);
    if (!editing && !notice?.text) return null;
    return (
        <div className="notice-banner">
            <div className="notice-header">
                <span className="notice-title">📋 Team Notice</span>
                <div className="notice-actions">
                    {editing ? (<>
                        <button className="notice-btn" onClick={() => { setEditing(false); setText(notice?.text || ''); }}>Cancel</button>
                        <button className="notice-btn save" onClick={() => { onSave(text); setEditing(false); }}>Save</button>
                    </>) : (<button className="notice-btn" onClick={() => setEditing(true)}>Edit</button>)}
                </div>
            </div>
            {editing ? <textarea className="notice-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="Enter notice..." autoFocus /> : <div className="notice-content">{notice?.text}</div>}
        </div>
    );
};

// Add Patient Modal
const AddPatientModal = ({ onClose, onSave }) => {
    const [data, setData] = useState({ ward: CONFIG.wards[0], bed: '', name: '', mrn: '', diagnosis: '', doctor: '', plan: '', status: 'New' });
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header"><span>➕ Add New Patient</span><button className="modal-close" onClick={onClose}>×</button></div>
                <div className="modal-body">
                    <div className="input-group"><label className="input-label">Ward</label><select className="inp" value={data.ward} onChange={e => setData({...data, ward: e.target.value})}>{CONFIG.wards.map(w => <option key={w}>{w}</option>)}</select></div>
                    <div style={{display: 'flex', gap: 12, marginTop: 14}}>
                        <div className="input-group" style={{flex: 1}}><label className="input-label">Bed</label><input className="inp" value={data.bed} onChange={e => setData({...data, bed: e.target.value})} placeholder="e.g. 5" /></div>
                        <div className="input-group" style={{flex: 1}}><label className="input-label">MRN</label><input className="inp" value={data.mrn} onChange={e => setData({...data, mrn: e.target.value})} /></div>
                    </div>
                    <div className="input-group" style={{marginTop: 14}}><label className="input-label">Name *</label><input className="inp" value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="Patient full name" autoFocus /></div>
                    <div style={{display: 'flex', gap: 12, marginTop: 14}}>
                        <div className="input-group" style={{flex: 1}}><label className="input-label">Doctor</label><input className="inp" value={data.doctor} onChange={e => setData({...data, doctor: e.target.value})} /></div>
                        <div className="input-group" style={{flex: 1}}><label className="input-label">Status</label><select className="inp" value={data.status} onChange={e => setData({...data, status: e.target.value})}>{CONFIG.statusOptions.map(s => <option key={s}>{s}</option>)}</select></div>
                    </div>
                    <div className="input-group" style={{marginTop: 14}}><label className="input-label">Diagnosis</label><input className="inp" value={data.diagnosis} onChange={e => setData({...data, diagnosis: e.target.value})} /></div>
                    <div className="input-group" style={{marginTop: 14}}><label className="input-label">Plan</label><textarea className="inp inp-area" value={data.plan} onChange={e => setData({...data, plan: e.target.value})} /></div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={() => { if (!data.name.trim()) { alert('Enter patient name'); return; } onSave(data); }}>Add Patient</button>
                </div>
            </div>
        </div>
    );
};

// Vitals Modal
const VitalsModal = ({ patient, onClose, onSave }) => {
    const [vitals, setVitals] = useState(patient.vitals || {});
    const getClass = (key, val) => Utils.isVitalCritical(key, val) ? 'critical' : Utils.isVitalAbnormal(key, val) ? 'abnormal' : '';
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
                <div className="modal-header orange"><span>📊 Vitals - {patient.name}</span><button className="modal-close" onClick={onClose}>×</button></div>
                <div className="modal-body">
                    <div className="vitals-grid">
                        {Object.entries(CONFIG.vitals).map(([key, cfg]) => (
                            <div key={key} className={`vital-card ${getClass(key, vitals[key])}`}>
                                <div className="vital-icon">{cfg.icon}</div>
                                <div className="vital-label">{cfg.label}</div>
                                <input className="vital-input" type="number" step="any" value={vitals[key] || ''} onChange={e => setVitals({...vitals, [key]: e.target.value})} placeholder="--" />
                                <div className="vital-unit">{cfg.unit}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" style={{background: 'var(--orange)'}} onClick={() => { onSave(patient.id, vitals); onClose(); }}>Save Vitals</button>
                </div>
            </div>
        </div>
    );
};

// Tasks Modal
const TasksModal = ({ patient, onClose, onSave }) => {
    const [tasks, setTasks] = useState(patient.tasks || []);
    const [newTask, setNewTask] = useState('');
    const [newPriority, setNewPriority] = useState('medium');
    const addTask = () => { if (!newTask.trim()) return; setTasks([...tasks, { id: Utils.generateId(), text: newTask.trim(), priority: newPriority, completed: false, createdAt: Date.now() }]); setNewTask(''); };
    const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
    const pending = tasks.filter(t => !t.completed);
    const completed = tasks.filter(t => t.completed);
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
                <div className="modal-header"><span>✅ Tasks - {patient.name}</span><button className="modal-close" onClick={onClose}>×</button></div>
                <div className="modal-body">
                    <div className="task-add-row">
                        <input className="task-add-input" placeholder="Add new task..." value={newTask} onChange={e => setNewTask(e.target.value)} onKeyPress={e => e.key === 'Enter' && addTask()} />
                        <select className="inp" style={{width: 110}} value={newPriority} onChange={e => setNewPriority(e.target.value)}>{CONFIG.priorityOptions.map(p => <option key={p}>{p}</option>)}</select>
                        <button className="btn btn-primary" onClick={addTask}>Add</button>
                    </div>
                    <div className="task-list">
                        {pending.length === 0 && completed.length === 0 && <div className="empty-state" style={{padding: 40}}><div className="empty-state-icon">📝</div><div className="empty-state-text">No tasks yet</div></div>}
                        {pending.map(task => (
                            <div key={task.id} className={`task-item ${task.priority === 'urgent' || task.priority === 'high' ? 'urgent' : ''}`}>
                                <div className="task-checkbox" onClick={() => toggleTask(task.id)}></div>
                                <span className="task-text">{task.text}</span>
                                <span className={`task-priority ${task.priority}`}>{task.priority}</span>
                                <button className="btn btn-sm btn-outline" onClick={() => deleteTask(task.id)}>×</button>
                            </div>
                        ))}
                        {completed.length > 0 && <>
                            <div style={{fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginTop: 20, marginBottom: 10, textTransform: 'uppercase'}}>Completed ({completed.length})</div>
                            {completed.map(task => (
                                <div key={task.id} className="task-item completed">
                                    <div className="task-checkbox checked" onClick={() => toggleTask(task.id)}>✓</div>
                                    <span className="task-text">{task.text}</span>
                                    <button className="btn btn-sm btn-outline" onClick={() => deleteTask(task.id)}>×</button>
                                </div>
                            ))}
                        </>}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={() => { onSave(patient.id, tasks); onClose(); }}>Save Tasks</button>
                </div>
            </div>
        </div>
    );
};

// Lab Modal
const LabModal = ({ patient, onClose, onSave }) => {
    const [labImages, setLabImages] = useState([]);
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);
    const processImage = async (file) => {
        const imgObj = { id: Utils.generateId(), timestamp: Date.now(), filename: file.name, processing: true };
        setLabImages(prev => [imgObj, ...prev]);
        try {
            const base64 = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result.split(',')[1]); reader.onerror = reject; reader.readAsDataURL(file); });
            const ocrResult = await API.processOCR(base64);
            setLabImages(prev => prev.map(img => img.id === imgObj.id ? { ...img, processing: false, labType: 'Lab Report', ocr: { text: ocrResult.text || '' } } : img));
        } catch (error) { setLabImages(prev => prev.map(img => img.id === imgObj.id ? { ...img, processing: false, error: error.message } : img)); }
    };
    const handleFiles = (files) => Array.from(files).forEach(file => { if (file.type.startsWith('image/')) processImage(file); });
    const handleDrop = (e) => { e.preventDefault(); e.currentTarget.classList.remove('dragover'); handleFiles(e.dataTransfer.files); };
    const deleteLab = (id) => setLabImages(prev => prev.filter(img => img.id !== id));
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal modal-xl" onClick={e => e.stopPropagation()}>
                <div className="modal-header cyan"><span>🧪 Labs - {patient.name}</span><button className="modal-close" onClick={onClose}>×</button></div>
                <div className="modal-body">
                    <div className="lab-upload-zone" onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('dragover'); }} onDragLeave={e => e.currentTarget.classList.remove('dragover')} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
                        <div className="lab-upload-icon">📄</div>
                        <div className="lab-upload-text">Drop lab images here or click to upload</div>
                        <div className="lab-upload-hint">Supports CBC, RFT, LFT, Echo, Endoscopy reports</div>
                    </div>
                    <div className="lab-source-btns">
                        <button className="lab-source-btn" onClick={() => cameraInputRef.current?.click()}>📷 Take Photo</button>
                        <button className="lab-source-btn" onClick={() => fileInputRef.current?.click()}>📁 Choose File</button>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={e => handleFiles(e.target.files)} />
                    <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" hidden onChange={e => handleFiles(e.target.files)} />
                    {labImages.map(lab => (
                        <div key={lab.id} className="lab-result-card">
                            <div className="lab-result-header">
                                <div className="lab-result-type">{lab.processing ? <><div className="loading-spinner" style={{width: 18, height: 18, borderWidth: 2}}></div> Processing...</> : lab.labType || 'Report'}</div>
                                <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                                    <span className="lab-result-date">{Utils.formatDate(lab.timestamp)}</span>
                                    <button className="btn btn-sm btn-outline" onClick={() => deleteLab(lab.id)}>🗑️</button>
                                </div>
                            </div>
                            {!lab.processing && lab.ocr && <div className="lab-result-body"><div style={{whiteSpace: 'pre-wrap', fontSize: 13, color: 'var(--text-muted)', maxHeight: 200, overflow: 'auto'}}>{lab.ocr.text || 'No text extracted'}</div></div>}
                            {lab.error && <div className="lab-result-body"><div style={{padding: 14, background: 'var(--red-bg)', borderRadius: 8, color: 'var(--red)'}}>❌ Error: {lab.error}</div></div>}
                        </div>
                    ))}
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline" onClick={onClose}>Cancel</button>
                    <button className="btn btn-secondary" onClick={() => { onSave(patient.id, labImages); onClose(); }}>Save ({labImages.length})</button>
                </div>
            </div>
        </div>
    );
};

// Handoff Modal
const HandoffModal = ({ patients, onClose, showToast }) => {
    const critical = patients.filter(p => p.status === 'Critical');
    const newPts = patients.filter(p => p.status === 'New');
    const withTasks = patients.filter(p => (p.tasks || []).some(t => !t.completed));
    const generateText = () => {
        let text = `HANDOFF REPORT - ${new Date().toLocaleDateString('en-GB')}\nTotal: ${patients.length}\n\n`;
        if (critical.length) { text += `⚠️ CRITICAL (${critical.length})\n`; critical.forEach(p => { text += `• ${p.name} - ${p.ward} Bed ${p.bed || 'N/A'}: ${p.diagnosis || 'No dx'}\n`; }); text += '\n'; }
        if (newPts.length) { text += `🆕 NEW (${newPts.length})\n`; newPts.forEach(p => { text += `• ${p.name} - ${p.ward} Bed ${p.bed || 'N/A'}\n`; }); text += '\n'; }
        if (withTasks.length) { text += `📋 TASKS\n`; withTasks.forEach(p => { text += `• ${p.name}: ${(p.tasks || []).filter(t => !t.completed).map(t => t.text).join(', ')}\n`; }); }
        return text;
    };
    const copyHandoff = () => { navigator.clipboard.writeText(generateText()); showToast('✓ Copied'); };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
                <div className="modal-header purple"><span>📋 Handoff Summary</span><button className="modal-close" onClick={onClose}>×</button></div>
                <div className="modal-body">
                    {critical.length === 0 && newPts.length === 0 && withTasks.length === 0 ? <div className="empty-state"><div className="empty-state-icon">✅</div><div className="empty-state-text">All clear!</div></div> : <>
                        {critical.length > 0 && <div className="handoff-section"><div className="handoff-title">⚠️ Critical ({critical.length})</div>{critical.map(p => <div key={p.id} className="handoff-patient critical"><div className="handoff-patient-header"><span className="handoff-patient-name">{p.name}</span><span className="handoff-patient-location">{p.ward} • Bed {p.bed || 'N/A'}</span></div><div className="handoff-patient-dx">{p.diagnosis || 'No diagnosis'}</div></div>)}</div>}
                        {newPts.length > 0 && <div className="handoff-section"><div className="handoff-title">🆕 New ({newPts.length})</div>{newPts.map(p => <div key={p.id} className="handoff-patient"><div className="handoff-patient-header"><span className="handoff-patient-name">{p.name}</span><span className="handoff-patient-location">{p.ward} • Bed {p.bed || 'N/A'}</span></div></div>)}</div>}
                        {withTasks.length > 0 && <div className="handoff-section"><div className="handoff-title">📋 Tasks</div>{withTasks.map(p => <div key={p.id} className="handoff-patient"><div className="handoff-patient-name">{p.name}</div><div className="handoff-patient-tasks">{(p.tasks || []).filter(t => !t.completed).map(t => <div key={t.id}>• {t.text}</div>)}</div></div>)}</div>}
                    </>}
                    <button className="handoff-copy-btn" onClick={copyHandoff}>📋 Copy to Clipboard</button>
                </div>
            </div>
        </div>
    );
};

// Patient Card
const PatientCard = ({ patient, onUpdate, onDelete, onOpenLabs, onOpenVitals, onOpenTasks }) => {
    const taskCount = (patient.tasks || []).filter(t => !t.completed).length;
    const labCount = patient.labInfo?.count || 0;
    const hasVitals = patient.vitals && Object.values(patient.vitals).some(v => v && v !== '');
    const isNew = Utils.isNewAdmission(patient);
    const getStatusClass = (s) => { const st = (s || '').toLowerCase().replace('-', ''); return st === 'new' ? 'status-new' : st === 'chronic' ? 'status-chronic' : st === 'nonchronic' ? 'status-non-chronic' : st === 'critical' ? 'status-critical' : st === 'stable' ? 'status-stable' : st === 'discharged' ? 'status-discharged' : ''; };
    const cardClass = ['patient-card', isNew && 'new-admission', patient.status === 'Critical' && 'critical', patient.status === 'Discharged' && 'discharged'].filter(Boolean).join(' ');
    return (
        <div className={cardClass}>
            <div className="patient-row">
                <div className="patient-col patient-col-1">
                    <div className="input-group"><label className="input-label">Bed</label><input className="inp inp-bed" value={patient.bed || ''} onChange={e => onUpdate(patient.id, 'bed', e.target.value)} placeholder="#" /></div>
                    <div className="input-group"><label className="input-label">Doctor</label><input className="inp" value={patient.doctor || ''} onChange={e => onUpdate(patient.id, 'doctor', e.target.value)} placeholder="Dr." style={{fontSize: 12}} /></div>
                </div>
                <div className="patient-col patient-col-2">
                    <div style={{display: 'flex', gap: 10}}>
                        <div className="input-group" style={{flex: 1}}><label className="input-label">Name</label><input className="inp inp-name" value={patient.name || ''} onChange={e => onUpdate(patient.id, 'name', e.target.value)} /></div>
                        <div className="input-group"><label className="input-label">MRN</label><input className="inp inp-mrn" value={patient.mrn || ''} onChange={e => onUpdate(patient.id, 'mrn', e.target.value)} /></div>
                    </div>
                    <div className="input-group"><label className="input-label">Diagnosis</label><input className="inp" value={patient.diagnosis || ''} onChange={e => onUpdate(patient.id, 'diagnosis', e.target.value)} placeholder="Primary diagnosis" /></div>
                </div>
                <div className="patient-col patient-col-3">
                    <div className="input-group"><label className="input-label">Plan</label><textarea className="inp inp-area" value={patient.plan || ''} onChange={e => onUpdate(patient.id, 'plan', e.target.value)} placeholder="Management plan..." /></div>
                </div>
            </div>
            <div className="patient-footer">
                <button className={`btn-lab ${labCount > 0 ? 'has-labs' : ''}`} onClick={() => onOpenLabs(patient)}>🧪 Labs {labCount > 0 && <span className="badge-count">{labCount}</span>}</button>
                <button className={`btn-vitals ${hasVitals ? 'has-vitals' : ''}`} onClick={() => onOpenVitals(patient)}>📊 Vitals</button>
                <button className={`btn-tasks ${taskCount > 0 ? 'has-tasks' : ''}`} onClick={() => onOpenTasks(patient)}>✅ Tasks {taskCount > 0 && <span className="badge-count">{taskCount}</span>}</button>
                <select className={`status-select ${getStatusClass(patient.status)}`} value={patient.status || ''} onChange={e => onUpdate(patient.id, 'status', e.target.value)}><option value="">Status</option>{CONFIG.statusOptions.map(s => <option key={s}>{s}</option>)}</select>
                {isNew && <button className="btn-seen" onClick={() => onUpdate(patient.id, 'newDismissed', true)}>✓ Seen</button>}
                <button className="btn-del" onClick={() => onDelete(patient.id)}>×</button>
            </div>
        </div>
    );
};

// Ward Section
const WardSection = ({ ward, patients, collapsed, onToggle, onUpdate, onDelete, onOpenLabs, onOpenVitals, onOpenTasks }) => {
    const sorted = Utils.sortByBed(patients);
    return (
        <div className="ward-section">
            <div className="ward-header" onClick={onToggle}><div className="ward-title"><span className={`ward-arrow ${collapsed ? 'collapsed' : ''}`}>▼</span>{ward}</div><span className="ward-count">{patients.length}</span></div>
            <div className={`ward-body ${collapsed ? 'collapsed' : ''}`}>{sorted.map(p => <PatientCard key={p.id} patient={p} onUpdate={onUpdate} onDelete={onDelete} onOpenLabs={onOpenLabs} onOpenVitals={onOpenVitals} onOpenTasks={onOpenTasks} />)}</div>
        </div>
    );
};

// Main App
const App = () => {
    const [patients, setPatients] = useState([]);
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [toast, setToast] = useState(null);
    const [search, setSearch] = useState('');
    const [viewFilter, setViewFilter] = useState('All');
    const [collapsedWards, setCollapsedWards] = useState({});
    const [addModal, setAddModal] = useState(false);
    const [labModal, setLabModal] = useState(null);
    const [vitalsModal, setVitalsModal] = useState(null);
    const [tasksModal, setTasksModal] = useState(null);
    const [handoffModal, setHandoffModal] = useState(false);
    const syncTimer = useRef(null);

    const showToast = useCallback((msg) => { setToast(msg); setTimeout(() => setToast(null), CONFIG.toastDuration); }, []);
    const scheduleSync = useCallback(() => { setSyncing(true); if (syncTimer.current) clearTimeout(syncTimer.current); syncTimer.current = setTimeout(async () => { await API.syncSheets(); setTimeout(() => setSyncing(false), 800); }, 500); }, []);

    useEffect(() => {
        db.ref('notice').on('value', snap => setNotice(snap.val() || { text: '' }));
        db.ref('patients').on('value', snap => { const val = snap.val(); setPatients(val ? Object.keys(val).map(k => ({ id: k, ...val[k], bed: Utils.cleanBed(val[k].bed) })) : []); setLoading(false); });
        setTimeout(() => API.syncSheets(), 2000);
        return () => { db.ref('notice').off(); db.ref('patients').off(); if (syncTimer.current) clearTimeout(syncTimer.current); };
    }, []);

    const isDuplicate = useCallback((ward, name, excludeId = null) => patients.some(p => p.id !== excludeId && Utils.makeKey(p.ward, p.name) === Utils.makeKey(ward, name)), [patients]);
    const updatePatient = useCallback((id, field, value) => { const p = patients.find(pt => pt.id === id); if (field === 'name' && isDuplicate(p?.ward, value, id)) { showToast('⚠️ Duplicate'); return; } db.ref(`patients/${id}`).update({ [field]: field === 'bed' ? Utils.cleanBed(value) : value, updatedAt: Date.now() }).then(scheduleSync); }, [patients, isDuplicate, scheduleSync, showToast]);
    const deletePatient = useCallback((id) => { if (confirm('Delete?')) db.ref(`patients/${id}`).remove().then(() => { showToast('✓ Deleted'); API.syncSheets(); }); }, [showToast]);
    const addPatient = useCallback((data) => { if (isDuplicate(data.ward, data.name)) { alert('Duplicate'); return; } db.ref('patients').push({ ...data, bed: Utils.cleanBed(data.bed), name: data.name.trim(), timestamp: Date.now(), tasks: [], vitals: {}, labInfo: { count: 0 } }).then(() => { setAddModal(false); showToast('✓ Added'); API.syncSheets(); }); }, [isDuplicate, showToast]);
    const saveNotice = useCallback((text) => { db.ref('notice').set({ text: text.trim(), updatedAt: Date.now() }).then(() => showToast('✓ Saved')); }, [showToast]);
    const saveVitals = useCallback((id, vitals) => { db.ref(`patients/${id}/vitals`).set({ ...vitals, timestamp: Date.now() }).then(() => { showToast('✓ Saved'); scheduleSync(); }); }, [showToast, scheduleSync]);
    const saveTasks = useCallback((id, tasks) => { db.ref(`patients/${id}/tasks`).set(tasks).then(() => { showToast('✓ Saved'); scheduleSync(); }); }, [showToast, scheduleSync]);
    const saveLabs = useCallback((id, labImages) => { db.ref(`patients/${id}/labInfo`).set({ count: labImages.length, lastSaved: Date.now() }).then(() => { showToast('✓ Saved'); scheduleSync(); }); }, [showToast, scheduleSync]);

    const stats = useMemo(() => ({ total: patients.length, critical: patients.filter(p => p.status === 'Critical').length, newAdmissions: patients.filter(p => p.status === 'New').length, pendingTasks: patients.reduce((sum, p) => sum + (p.tasks || []).filter(t => !t.completed).length, 0) }), [patients]);

    const filteredGroups = useMemo(() => {
        let filtered = patients;
        if (viewFilter !== 'All') filtered = filtered.filter(p => p.status === viewFilter);
        if (search) { const s = search.toLowerCase(); filtered = filtered.filter(p => (p.name || '').toLowerCase().includes(s) || (p.bed || '').includes(s) || (p.ward || '').toLowerCase().includes(s) || (p.diagnosis || '').toLowerCase().includes(s)); }
        const groups = {}; filtered.forEach(p => { const w = p.ward || 'Unassigned'; if (!groups[w]) groups[w] = []; groups[w].push(p); });
        return { groups, keys: Object.keys(groups).sort((a, b) => Utils.getWardOrder(a) - Utils.getWardOrder(b)) };
    }, [patients, search, viewFilter]);

    if (loading) return <div className="loading-screen"><div className="loading-spinner"></div><div className="loading-text">Loading Unit E...</div></div>;

    return (
        <div className="app-container">
            <header className="header">
                <div className="header-top">
                    <div className="header-title"><h1>🏥 Unit E Ward Rounds</h1><span className={`header-badge ${syncing ? 'syncing' : ''}`}>{syncing ? '⏳' : '✓'} {patients.length} patients</span></div>
                    <div className="header-actions">
                        <button className="btn btn-glass" onClick={() => setAddModal(true)}>➕ Add</button>
                        <button className="btn btn-glass" onClick={() => setHandoffModal(true)}>📋 Handoff</button>
                        <button className="btn btn-glass" onClick={() => window.open(CONFIG.sheetUrl, '_blank')}>📊 Sheet</button>
                        <button className="btn btn-glass" onClick={async () => { setSyncing(true); showToast('🔄 Syncing...'); await API.syncSheets(); showToast('✓ Synced!'); setTimeout(() => setSyncing(false), 800); }}>🔄</button>
                    </div>
                </div>
                <div className="header-stats">
                    <div className="stat-item"><span className="stat-value">{stats.total}</span><span className="stat-label">Total</span></div>
                    <div className="stat-item"><span className="stat-value" style={{color: '#fcd34d'}}>{stats.newAdmissions}</span><span className="stat-label">New</span></div>
                    <div className="stat-item"><span className="stat-value" style={{color: '#fca5a5'}}>{stats.critical}</span><span className="stat-label">Critical</span></div>
                    <div className="stat-item"><span className="stat-value" style={{color: '#a5f3fc'}}>{stats.pendingTasks}</span><span className="stat-label">Tasks</span></div>
                </div>
            </header>
            <NoticeBanner notice={notice} onSave={saveNotice} />
            <div className="quick-actions">
                <div className="quick-action" onClick={() => setAddModal(true)}><div className="quick-action-icon">➕</div><div className="quick-action-label">Add Patient</div></div>
                <div className="quick-action" onClick={() => setHandoffModal(true)}><div className="quick-action-icon">📋</div><div className="quick-action-label">Handoff</div></div>
                <div className="quick-action" onClick={() => window.open(CONFIG.sheetUrl, '_blank')}><div className="quick-action-icon">📊</div><div className="quick-action-label">Open Sheet</div></div>
                <div className="quick-action" onClick={() => window.print()}><div className="quick-action-icon">🖨️</div><div className="quick-action-label">Print</div></div>
            </div>
            <div className="controls-bar">
                <div className="filter-tabs">{['All', 'New', 'Chronic', 'Critical', 'Stable'].map(f => <button key={f} className={`filter-tab ${viewFilter === f ? 'active' : ''}`} onClick={() => setViewFilter(f)}>{f}</button>)}</div>
                <div className="search-box"><input placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            </div>
            {filteredGroups.keys.length === 0 ? <div className="empty-state"><div className="empty-state-icon">🏥</div><div className="empty-state-text">No patients found</div><div className="empty-state-hint">{search ? 'Try adjusting search' : 'Add your first patient'}</div></div> : filteredGroups.keys.map(ward => <WardSection key={ward} ward={ward} patients={filteredGroups.groups[ward]} collapsed={collapsedWards[ward]} onToggle={() => setCollapsedWards(prev => ({...prev, [ward]: !prev[ward]}))} onUpdate={updatePatient} onDelete={deletePatient} onOpenLabs={setLabModal} onOpenVitals={setVitalsModal} onOpenTasks={setTasksModal} />)}
            {addModal && <AddPatientModal onClose={() => setAddModal(false)} onSave={addPatient} />}
            {labModal && <LabModal patient={labModal} onClose={() => setLabModal(null)} onSave={saveLabs} />}
            {vitalsModal && <VitalsModal patient={vitalsModal} onClose={() => setVitalsModal(null)} onSave={saveVitals} />}
            {tasksModal && <TasksModal patient={tasksModal} onClose={() => setTasksModal(null)} onSave={saveTasks} />}
            {handoffModal && <HandoffModal patients={patients} onClose={() => setHandoffModal(false)} showToast={showToast} />}
            <Toast message={toast} />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
