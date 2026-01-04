// ═══════════════════════════════════════════════════════════════════════════
// UNIT E WARD ROUNDS - CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    firebase: {
        apiKey: "AIzaSyA5tYolf_gVPsj72AHg0pyJmLMOVaYTfOA",
        authDomain: "internal-medicine-ward.firebaseapp.com",
        databaseURL: "https://internal-medicine-ward-default-rtdb.firebaseio.com",
        projectId: "internal-medicine-ward",
        storageBucket: "internal-medicine-ward.appspot.com",
        appId: "1:811476183925:web:c3fe741cf3613fb4940ab6"
    },
    
    visionApiUrl: 'https://script.google.com/macros/s/AKfycbwT0sjHKwhPmFk5lgtLkHVUrJBXlmFbhLqfEn5My_rEMwNf4QaJhFqrqxVw9_cFo30/exec',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1X1Dy5P3S_WPAi-SGKO8ZUwPLl1k4lZwJE6Gk_M62u9o/edit',
    
    wards: ["Ward 19", "Ward 20", "Ward 21", "Ward 22", "Ward 27", "Ward 5", "Ward 10", "ICU", "ER", "Unassigned"],
    statusOptions: ["New", "Chronic", "Non-Chronic", "Critical", "Stable", "Discharged"],
    priorityOptions: ["urgent", "high", "medium", "low"],
    
    vitals: {
        bp_sys:  { label: 'BP Systolic',  icon: '🩸', unit: 'mmHg', range: [90, 140], critical: [70, 180] },
        bp_dia:  { label: 'BP Diastolic', icon: '🩸', unit: 'mmHg', range: [60, 90], critical: [40, 110] },
        hr:      { label: 'Heart Rate',   icon: '❤️', unit: 'bpm', range: [60, 100], critical: [40, 150] },
        rr:      { label: 'Resp Rate',    icon: '🫁', unit: '/min', range: [12, 20], critical: [8, 30] },
        temp:    { label: 'Temperature',  icon: '🌡️', unit: '°C', range: [36.1, 37.5], critical: [35, 39] },
        spo2:    { label: 'SpO2',         icon: '💨', unit: '%', range: [94, 100], critical: [88, 100] },
        gcs:     { label: 'GCS',          icon: '🧠', unit: '/15', range: [15, 15], critical: [8, 15] },
        pain:    { label: 'Pain Score',   icon: '😣', unit: '/10', range: [0, 3], critical: [0, 10] },
        glucose: { label: 'Glucose',      icon: '🍬', unit: 'mg/dL', range: [70, 140], critical: [50, 400] },
    },
    
    newAdmissionHours: 24,
    toastDuration: 3000,
};

// Initialize Firebase
firebase.initializeApp(CONFIG.firebase);
const db = firebase.database();

// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

const Utils = {
    cleanBed: (b) => (b || '').toString().replace(/\D/g, '') || '',
    
    makeKey: (ward, name) => `${(ward || '').toLowerCase().trim()}::${(name || '').toLowerCase().trim()}`,
    
    formatDate: (ts) => ts ? new Date(ts).toLocaleDateString('en-GB', { 
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
    }) : '',
    
    isNewAdmission: (p) => {
        return p.status === 'New' && 
               !p.newDismissed && 
               (Date.now() - (p.timestamp || 0)) < (CONFIG.newAdmissionHours * 60 * 60 * 1000);
    },
    
    generateId: () => Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
    
    isVitalAbnormal: (key, value) => {
        const c = CONFIG.vitals[key];
        if (!c || !value) return false;
        const n = parseFloat(value);
        return n < c.range[0] || n > c.range[1];
    },
    
    isVitalCritical: (key, value) => {
        const c = CONFIG.vitals[key];
        if (!c || !value || !c.critical) return false;
        const n = parseFloat(value);
        return n < c.critical[0] || n > c.critical[1];
    },
    
    sortByBed: (patients) => [...patients].sort((a, b) => (parseInt(a.bed) || 999) - (parseInt(b.bed) || 999)),
    
    getWardOrder: (ward) => {
        const idx = CONFIG.wards.indexOf(ward);
        return idx === -1 ? 999 : idx;
    },
};

// ═══════════════════════════════════════════════════════════════════════════
// API
// ═══════════════════════════════════════════════════════════════════════════

const API = {
    syncSheets: async () => {
        try {
            await fetch(CONFIG.visionApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action: 'syncSheet' })
            });
            console.log('[Sync] Sheet synced');
            return true;
        } catch (e) {
            console.error('[Sync] Failed:', e);
            return false;
        }
    },
    
    processOCR: async (base64) => {
        const response = await fetch(CONFIG.visionApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'ocr', image: base64 })
        });
        return await response.json();
    }
};

console.log('[Config] Loaded successfully');
