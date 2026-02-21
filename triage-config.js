/* MKH Admission Triage - Decision Tree Configuration
   Source: MKH Internal Medicine Protocols, Nov 2024, Ver2
   All page references refer to the above document */

var DEPARTMENTS = {
  CARDIOLOGY:       { color: "#ef4444", bg: "rgba(239,68,68,0.15)",  label: "Cardiology" },
  MEDICINE:         { color: "#3b82f6", bg: "rgba(59,130,246,0.15)", label: "Internal Medicine" },
  NEPHROLOGY:       { color: "#06b6d4", bg: "rgba(6,182,212,0.15)",  label: "Nephrology" },
  NEUROLOGY:        { color: "#8b5cf6", bg: "rgba(139,92,246,0.15)", label: "Neurology" },
  RESPIRATORY:      { color: "#10b981", bg: "rgba(16,185,129,0.15)", label: "Respiratory" },
  GASTROENTEROLOGY: { color: "#f97316", bg: "rgba(249,115,22,0.15)", label: "Gastroenterology" },
  RHEUMATOLOGY:     { color: "#ec4899", bg: "rgba(236,72,153,0.15)", label: "Rheumatology" },
  ENDOCRINOLOGY:    { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", label: "Endocrinology" },
  HEMATOLOGY:       { color: "#dc2626", bg: "rgba(220,38,38,0.15)",  label: "Hematology" },
  SURGERY:          { color: "#64748b", bg: "rgba(100,116,139,0.15)",label: "Surgery" },
  ORTHOPEDICS:      { color: "#78716c", bg: "rgba(120,113,108,0.15)",label: "Orthopedics" },
  UROLOGY:          { color: "#0ea5e9", bg: "rgba(14,165,233,0.15)", label: "Urology" },
  ON_CALL_UNIT:     { color: "#a855f7", bg: "rgba(168,85,247,0.15)", label: "On-Call Unit" },
  ICU:              { color: "#f43f5e", bg: "rgba(244,63,94,0.15)",  label: "ICU" }
};

var ICONS = {
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  heartPulse: '<path d="M19.5 12.572l-7.5 7.428l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"/><path d="M3 12h4l2-4 4 8 2-4h6"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  trendDown: '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  brain: '<path d="M9.5 2A5.5 5.5 0 0 0 5 6a5.5 5.5 0 0 0 0 4A5.5 5.5 0 0 0 7 18.46 5.5 5.5 0 0 0 12 22v0a5.5 5.5 0 0 0 5-3.54A5.5 5.5 0 0 0 19 14a5.5 5.5 0 0 0 0-4A5.5 5.5 0 0 0 14.5 2H12"/><path d="M12 2v20"/>',
  wind: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  bone: '<path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/>',
  thermometer: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>',
  droplets: '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
  gitBranch: '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  alertTri: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  arrowLeft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  chevRight: '<polyline points="9 18 15 12 9 6"/>',
  chevDown: '<polyline points="6 9 12 15 18 9"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  stethoscope: '<path d="M4.8 2.655A.5.5 0 1 0 4 3.118v4.187a2.5 2.5 0 0 0 5 0V3.118a.5.5 0 1 0-.8-.463M2 10h2a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-1a2 2 0 0 1 2-2h2"/><circle cx="12" cy="18" r="2"/>'
};

function icon(name, size) {
  size = size || 24;
  return '<svg xmlns="http://www.w3.org/2000/svg" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || '') + '</svg>';
}

var CATEGORIES = [
  { id:"chest_pain", name:"Chest Pain", icon:"heartPulse", color:"#ef4444", desc:"Ischemic, atypical, pericarditis, PE", pages:"27-28", entry:"cp_start" },
  { id:"heart_failure", name:"Heart Failure", icon:"heart", color:"#f87171", desc:"ACS, hypertensive, infectious, toxic", pages:"28-29", entry:"hf_start" },
  { id:"cardiac_arrest", name:"Cardiac Arrest", icon:"zap", color:"#fbbf24", desc:"Post-arrest: STEMI, arrhythmia, metabolic", pages:"29-30", entry:"ca_start" },
  { id:"arrhythmias", name:"Arrhythmias", icon:"activity", color:"#fb923c", desc:"Narrow/wide complex tachycardia", pages:"29-31", entry:"arr_start" },
  { id:"bradycardia", name:"Bradycardia", icon:"trendDown", color:"#a78bfa", desc:"Symptomatic, severe, secondary causes", pages:"30-31", entry:"brad_start" },
  { id:"tamponade", name:"Cardiac Tamponade", icon:"shield", color:"#f472b6", desc:"Tamponade management & follow-up", pages:"31", entry:"tamp_start" },
  { id:"endocarditis", name:"Endocarditis", icon:"shield", color:"#c084fc", desc:"Stable vs complicated endocarditis", pages:"31", entry:"endo_start" },
  { id:"nephrology", name:"Nephrology", icon:"droplet", color:"#06b6d4", desc:"Dialysis, transplant, GN, ESRD", pages:"33", entry:"neph_start" },
  { id:"neurology", name:"Neurology", icon:"brain", color:"#8b5cf6", desc:"Stroke, seizures, GBS, MS, myasthenia", pages:"34", entry:"neuro_start" },
  { id:"respiratory", name:"Respiratory", icon:"wind", color:"#10b981", desc:"BA, COPD, TB, ILD, lung cancer", pages:"35-37", entry:"resp_start" },
  { id:"gastro", name:"Gastroenterology", icon:"flame", color:"#f97316", desc:"IBD, CLD, pancreatitis, hepatitis", pages:"39-40", entry:"gi_start" },
  { id:"rheumatology", name:"Rheumatology", icon:"bone", color:"#ec4899", desc:"CTD, rheumatic disease, vasculitis", pages:"40", entry:"rheum_start" },
  { id:"endocrine", name:"Endocrine Emergencies", icon:"thermometer", color:"#f59e0b", desc:"DKA, thyroid storm, adrenal crisis", pages:"40", entry:"endocr_start" },
  { id:"hematology", name:"Hematology", icon:"droplets", color:"#dc2626", desc:"Malignancy, AIHA, SCD, hemophilia", pages:"41", entry:"heme_start" },
  { id:"med_vs_surg", name:"Medical vs Surgical", icon:"gitBranch", color:"#64748b", desc:"DVT, GI bleed, pancreatitis, cellulitis", pages:"44-45", entry:"mvs_start" }
];

/* ============================================================
   DECISION TREE NODES
   Each node is either type:"question" or type:"verdict"
   ============================================================ */
var NODES = {};

/* Helper to add a verdict node */
function V(id, dept, title, summary, criteria, page, section, citationText, opts) {
  opts = opts || {};
  NODES[id] = {
    type: "verdict",
    department: dept,
    secondaryDepartment: opts.secondaryDept || null,
    title: title,
    summary: summary,
    criteria: criteria,
    citation: { page: page, section: section, text: citationText },
    consultNotes: opts.consult || null,
    conditionalNote: opts.conditional || null
  };
}

/* Helper to add a question node */
function Q(id, text, subtitle, options) {
  NODES[id] = { type: "question", text: text, subtitle: subtitle, options: options };
}

/* ============================================================
   1. CHEST PAIN (Pages 27-28)
   ============================================================ */
Q("cp_start", "What type of chest pain does the patient present with?",
  "Assess ECG, troponin, and clinical presentation",
  [
    { id:"cp1", label:"Ischemic chest pain with cardiac findings", desc:"ST-T changes (>1mm in 2+ leads), Troponin >0.15, documented CAD/PCI/CABG, complicated by LVF/arrhythmias/cardiac arrest", next:"cp_ischemic_v" },
    { id:"cp2", label:"Atypical chest pain", desc:"No ECG changes or minimal nonspecific ECG findings", next:"cp_atypical_v" },
    { id:"cp3", label:"Typical but non-prolonged chest pain", desc:"TIMI score typical, <20 min at rest, no significant ECG changes, no troponin rise", next:"cp_timi_v" },
    { id:"cp4", label:"Pericarditis", desc:"Pericardial inflammation - sharp, pleuritic, positional", next:"cp_peri_q" },
    { id:"cp5", label:"Secondary to comorbid conditions", desc:"Chest pain from severe anemia, CVA, sepsis, or other medical conditions", next:"cp_comorbid_v" },
    { id:"cp6", label:"Pulmonary embolism", desc:"Suspected or confirmed PE, irrespective of need for thrombolysis", next:"cp_pe_v" }
  ]
);

V("cp_ischemic_v", "CARDIOLOGY",
  "Admit to Cardiology",
  "Ischemic chest pain with significant cardiac findings requires cardiology evaluation and admission.",
  ["Significant ST-T segment deviation (>1mm in 2+ consecutive leads)","Significant troponin rise (>0.15)","Documented history of CAD, PCI or CABG","Complicated by acute LVF, arrhythmias, or hemodynamic instability","Cardiac arrest due to ACS"],
  27, "1.1 Cardiology Admission - Chest Pain",
  "Ischemic Type chest pain with any of the following should be evaluated by cardiology division: Significant ST-T segment deviation either elevation or depression (>1mm in at least 2 consecutive leads), Significant rise of troponin (>0.15), Documented history of CAD, PCI or CABG, Complicated by acute LVF, arrhythmias, or hemodynamic instability, Cardiac arrest (due to ACS)."
);

V("cp_atypical_v", "MEDICINE",
  "Admit to Medicine",
  "Atypical chest pain without ECG changes or significant troponin rise is managed by internal medicine.",
  ["Atypical chest pain","No ECG changes or minimal nonspecific ECG","No significant troponin elevation"],
  27, "1.1.2 Cardiology Admission - Chest Pain",
  "The following chest pain patients should be evaluated by medical unit: Atypical chest pain with no ECG changes or minimal nonspecific ECG."
);

V("cp_timi_v", "MEDICINE",
  "Admit to Medicine",
  "Typical but non-prolonged chest pain without ECG or troponin changes is managed by medicine.",
  ["TIMI score typical non-prolonged chest pain (<20 min)","At rest without significant ECG changes","No rise of cardiac troponin"],
  27, "1.1.2 Cardiology Admission - Chest Pain",
  "Chest pain suggestive of ischemia based on TIMI score typical non-prolonged, chest pain (less than 20 min), at rest without significant ECG changes or rise of cardiac troponin — evaluated by medical unit."
);

Q("cp_peri_q", "Is the pericarditis complicated?",
  "Complicated = coexisting myocarditis, tamponade, or hemodynamic instability",
  [
    { id:"cp_peri1", label:"No — Uncomplicated pericarditis", desc:"Isolated pericarditis without myocarditis or tamponade", next:"cp_peri_med_v" },
    { id:"cp_peri2", label:"Yes — Complicated", desc:"Suspected myocarditis, tamponade, or pericardiocentesis needed", next:"cp_peri_cardio_v" }
  ]
);

V("cp_peri_med_v", "MEDICINE",
  "Admit to Medicine",
  "Uncomplicated pericarditis is managed by medicine.",
  ["Pericarditis diagnosed clinically","No signs of myocarditis or tamponade"],
  27, "1.1.2 Cardiology Admission - Chest Pain",
  "Chest pain diagnosed as pericarditis — evaluated by medical unit. Cardiology consultation should be requested in complicated cases of pericarditis or in suspicion of coexisting myocarditis or tamponade and for pericardiocentesis.",
  { consult: "Consult Cardiology if complicated, myocarditis suspected, tamponade, or pericardiocentesis needed." }
);

V("cp_peri_cardio_v", "CARDIOLOGY",
  "Consult Cardiology",
  "Complicated pericarditis with myocarditis or tamponade requires cardiology involvement.",
  ["Pericarditis with suspected myocarditis","Pericarditis with tamponade","Pericardiocentesis required"],
  27, "1.1.2 Cardiology Admission - Chest Pain",
  "Cardiology consultation should be requested in complicated cases of pericarditis or in suspicion of coexisting myocarditis or tamponade and for pericardiocentesis."
);

V("cp_comorbid_v", "MEDICINE",
  "Admit to Medicine",
  "Chest pain secondary to comorbid medical conditions is managed by medicine with cardiology discussion if needed.",
  ["Chest pain secondary to severe anemia","Chest pain secondary to CVA","Chest pain secondary to sepsis","Other comorbid medical conditions"],
  27, "1.1.2 Cardiology Admission - Chest Pain",
  "Chest pain secondary to comorbid medical conditions e.g., severe anemia, CVA, sepsis. In these cases, medicine should evaluate the patient, then discuss with cardiology for advice.",
  { consult: "Discuss with Cardiology for advice on cardiac management." }
);

V("cp_pe_v", "MEDICINE",
  "Admit to Medicine",
  "Pulmonary embolism, regardless of thrombolysis need, is admitted under medicine.",
  ["Suspected or confirmed pulmonary embolism","Irrespective of need for thrombolysis"],
  28, "1.1.2 Cardiology Admission - Chest Pain",
  "Chest pain diagnosed as pulmonary embolism irrespective of need for thrombolysis should be seen, evaluated and admitted under medicine."
);

/* ============================================================
   2. HEART FAILURE (Pages 28-29)
   ============================================================ */
Q("hf_start", "What is the precipitant or context of the heart failure?",
  "Identify the underlying cause or trigger of the acute heart failure presentation",
  [
    { id:"hf1", label:"HF with acute coronary syndrome", desc:"ACS is the trigger or concurrent diagnosis", next:"hf_acs_v" },
    { id:"hf2", label:"HF induced by new arrhythmia", desc:"New tachycardia or bradycardia precipitating HF", next:"hf_arr_v" },
    { id:"hf3", label:"HF patient following cardiology clinic only", desc:"Regular cardiology follow-up with no other major comorbidities under medical units", next:"hf_clinic_v" },
    { id:"hf4", label:"Acute hypertensive heart failure", desc:"Hypertensive emergency causing acute HF", next:"hf_htn_v" },
    { id:"hf5", label:"HF precipitated by infection", desc:"Pneumonia, sepsis, COPD exacerbation, etc.", next:"hf_infect_v" },
    { id:"hf6", label:"HF precipitated by endocrine causes", desc:"Thyroid, DKA, acromegaly, etc.", next:"hf_endo_v" },
    { id:"hf7", label:"HF precipitated by fluid overload", desc:"Iatrogenic, CKD, AKI, etc.", next:"hf_fluid_v" },
    { id:"hf8", label:"HF precipitated by severe anemia", desc:"Anemia as the primary trigger", next:"hf_anemia_v" },
    { id:"hf9", label:"Peripartum / Non-ischemic / Toxic cardiomyopathy", desc:"Peripartum CM, non-ischemic DCM, restrictive CM, toxic CM, muscular dystrophy", next:"hf_other_v" },
    { id:"hf10", label:"Ischemic CM not amenable to revascularization", desc:"Known ischemic CM on medical treatment only", next:"hf_ischcm_v" },
    { id:"hf11", label:"Chronic right-sided heart failure", desc:"Chronic RV failure", next:"hf_right_v" }
  ]
);

V("hf_acs_v", "CARDIOLOGY", "Admit to Cardiology",
  "Heart failure with acute coronary syndrome requires cardiology admission.",
  ["Acute heart failure","Concurrent ACS diagnosis"],
  28, "1.2 Heart Failure",
  "Acute heart failure with ACS — should be evaluated by cardiology division."
);

V("hf_arr_v", "CARDIOLOGY", "Admit to Cardiology",
  "Heart failure induced by new arrhythmia requires cardiology admission.",
  ["Acute heart failure","New onset tachycardia or bradycardia as precipitant"],
  28, "1.2 Heart Failure",
  "Acute heart failure induced by new arrhythmia (tachycardia or bradycardia) — should be evaluated by cardiology division."
);

V("hf_clinic_v", "CARDIOLOGY", "Admit to Cardiology",
  "HF patients regularly followed at cardiology clinic with no major medical comorbidities.",
  ["Regular cardiology OPD follow-up","No follow up with medical units for other major comorbidities"],
  28, "1.2 Heart Failure",
  "Acute heart failure patients who are regularly following at cardiology clinic and with no follow up with medical units for other major comorbidities — evaluated by cardiology division."
);

V("hf_htn_v", "MEDICINE", "Admit to Medicine",
  "Acute hypertensive heart failure is managed by medicine.",
  ["Acute heart failure","Hypertensive emergency as precipitant"],
  28, "1.2.2 Heart Failure - Medicine",
  "Acute hypertensive heart failure — evaluated by/admitted to medical unit. Cardiology can be consulted if the medical unit needs help with management.",
  { consult: "Cardiology can be consulted for management advice." }
);

V("hf_infect_v", "MEDICINE", "Admit to Medicine",
  "HF precipitated by infection is managed by medicine.",
  ["Heart failure precipitated by pneumonia","Heart failure precipitated by sepsis","Heart failure precipitated by COPD exacerbation"],
  28, "1.2.2 Heart Failure - Medicine",
  "Acute heart failure precipitated by infection (pneumonia, sepsis, COPD exacerbation, etc.) — evaluated by/admitted to medical unit.",
  { consult: "Cardiology can be consulted for management advice." }
);

V("hf_endo_v", "MEDICINE", "Admit to Medicine",
  "HF precipitated by endocrine causes is managed by medicine.",
  ["Heart failure precipitated by thyroid disease","Heart failure precipitated by DKA","Heart failure precipitated by acromegaly"],
  28, "1.2.2 Heart Failure - Medicine",
  "Acute heart failure precipitated by endocrine causes (thyroid, DKA, acromegaly, etc.) — evaluated by/admitted to medical unit.",
  { consult: "Cardiology can be consulted for management advice." }
);

V("hf_fluid_v", "MEDICINE", "Admit to Medicine",
  "HF precipitated by fluid overload is managed by medicine.",
  ["Heart failure precipitated by iatrogenic fluid overload","Heart failure precipitated by CKD/AKI"],
  28, "1.2.2 Heart Failure - Medicine",
  "Acute heart failure precipitated by fluid overload (iatrogenic, CKD, AKI, etc.) — evaluated by/admitted to medical unit.",
  { consult: "Cardiology can be consulted for management advice." }
);

V("hf_anemia_v", "MEDICINE", "Admit to Medicine",
  "HF precipitated by severe anemia is managed by medicine.",
  ["Heart failure precipitated by severe anemia"],
  28, "1.2.2 Heart Failure - Medicine",
  "Heart failure precipitated by severe anemia — evaluated by/admitted to medical unit.",
  { consult: "Cardiology can be consulted for management advice." }
);

V("hf_other_v", "MEDICINE", "Admit to Medicine",
  "Non-ischemic, peripartum, restrictive, toxic cardiomyopathies and HF due to muscular dystrophy are managed by medicine.",
  ["Peripartum cardiomyopathy","Non-ischemic dilated cardiomyopathy","Non-ischemic restrictive cardiomyopathy","HF secondary to toxins (drugs, alcohol, anabolic steroids)","HF secondary to muscular dystrophies"],
  28, "1.2.2 Heart Failure - Medicine",
  "Peripartum cardiomyopathy, non-ischemic dilated cardiomyopathy, non-ischemic restrictive cardiomyopathy, heart failure secondary to toxins (drugs, alcohol, anabolic steroids), heart failure secondary to muscular dystrophies — evaluated by/admitted to medical unit.",
  { consult: "Cardiology can be consulted for management advice. Patients refractory to optimal medical therapy indicated for intervention or device therapy will be taken over by cardiology." }
);

V("hf_ischcm_v", "MEDICINE", "Admit to Medicine",
  "Ischemic cardiomyopathy not amenable for revascularization is managed by medicine.",
  ["Ischemic cardiomyopathy","Not amenable for revascularization","Medical treatment only"],
  28, "1.2.2 Heart Failure - Medicine",
  "Ischemic cardiomyopathy that is not amenable for revascularization and only needs continued medical treatment — evaluated by/admitted to medical unit.",
  { consult: "Cardiology can be consulted for management advice." }
);

V("hf_right_v", "MEDICINE", "Admit to Medicine",
  "Chronic right-sided heart failure is managed by medicine.",
  ["Chronic right-sided heart failure"],
  28, "1.2.2 Heart Failure - Medicine",
  "Chronic right sided heart failure — evaluated by/admitted to medical unit.",
  { consult: "Cardiology can be consulted for management advice." }
);

/* ============================================================
   3. CARDIAC ARREST (Pages 29-30)
   ============================================================ */
Q("ca_start", "What is the suspected cause of the cardiac arrest?",
  "Assess post-arrest ECG, history, and clinical context",
  [
    { id:"ca1", label:"Post arrest with STEMI/NSTEMI findings", desc:"Persistent ST changes, ongoing chest pain, history suggestive of CAD — without non-cardiac causes", next:"ca_stemi_v" },
    { id:"ca2", label:"Persistent tachyarrhythmia or advanced heart block", desc:"Post-arrest ECG suggestive of Brugada, WPW, Long QT, persistent heart block, pacemaker malfunction, with cardiac history", next:"ca_arr_v" },
    { id:"ca3", label:"Cardiogenic shock", desc:"Post-arrest persistent hypotension, pulmonary congestion, echo suggestive of cardiac cause (STEMI, tight valve stenosis)", next:"ca_shock_v" },
    { id:"ca4", label:"Non-cardiac cause (metabolic, toxic, septic, hypoxic)", desc:"Arrest likely due to metabolic derangement, drug toxicity, sepsis, or hypoxia", next:"ca_noncardiac_v" }
  ]
);

V("ca_stemi_v", "CARDIOLOGY", "Admit to Cardiology",
  "Post cardiac arrest due to STEMI/NSTEMI requires cardiology admission.",
  ["Post cardiac arrest","Persistent ST elevation or depression","Ongoing chest pain","History suggestive of CAD (previous PCI, CABG, risk factors)","Absence of non-cardiac causes (metabolic, toxic, septic, hypoxic)"],
  29, "1.3 Cardiac Arrest",
  "Post cardiac arrest due to STEMI or NSTEMI: patient presenting in pulseless VT, VF or asystole and after successful resuscitation is found to have persistent ST elevation or ST depression, ongoing chest pain, history suggestive of CAD — and in absence of other non-cardiac causes of arrest."
);

V("ca_arr_v", "CARDIOLOGY", "Admit to Cardiology",
  "Post arrest with persistent arrhythmia/heart block with cardiac history requires cardiology.",
  ["Post-arrest persistent tachyarrhythmia or advanced heart block","ECG suggestive of Brugada, WPW, Long QT, persistent heart block","History suggestive of CAD, cardiomyopathy, structural heart disease","Absence of non-cardiac causes"],
  29, "1.3 Cardiac Arrest",
  "Serious persistent tachyarrhythmia or advanced heart block post-successful resuscitation: with post arrest ECG suggestive of Brugada syndrome, WPW, Long QT syndrome, persistent advanced heart block, malfunction pacemaker with past history suggestive of CAD, cardiomyopathy, and other structural heart disease — and in absence of non-cardiac causes."
);

V("ca_shock_v", "CARDIOLOGY", "Admit to Cardiology",
  "Cardiogenic shock post arrest requires cardiology admission.",
  ["Post-arrest persistent hypotension","Pulmonary congestion","Echo suggestive of cardiac cause (STEMI, tight valve stenosis, obstructed prosthesis)"],
  30, "1.3 Cardiac Arrest",
  "Cardiogenic Shock: patients presented in pulseless VT, VF, pulseless electrical activity or asystole and post-successful resuscitation found to have persistent hypotension, pulmonary congestion and history and examination including echocardiography suggestive of cardiac cause."
);

V("ca_noncardiac_v", "MEDICINE", "Admit to Medicine",
  "Post arrest from non-cardiac causes is managed by medicine.",
  ["Cardiac arrest with non-cardiac etiology","Metabolic derangement","Drug toxicity","Sepsis","Hypoxia"],
  29, "1.3 Cardiac Arrest",
  "Post cardiac arrest cases where other non-cardiac causes of arrest are identified (metabolic, toxic, septic, hypoxic, etc.) — admitted to medicine."
);

/* ============================================================
   4. ARRHYTHMIAS (Pages 29-31)
   ============================================================ */
Q("arr_start", "What type of arrhythmia does the patient present with?",
  "Classify based on QRS width and rate",
  [
    { id:"arr1", label:"Narrow complex tachycardia", desc:"SVT, atrial fibrillation, atrial flutter, etc.", next:"arr_narrow_q" },
    { id:"arr2", label:"Wide complex tachycardia", desc:"VT, SVT with aberrancy, etc.", next:"arr_wide_q" }
  ]
);

Q("arr_narrow_q", "Does the narrow complex tachycardia have any of the following features?",
  "Select the most applicable feature",
  [
    { id:"an1", label:"Hemodynamic instability", desc:"Hypotension, shock, severe chest pain, acute HF — may need urgent DC cardioversion", next:"arr_narrow_cardio_v" },
    { id:"an2", label:"Resistant to acute management", desc:"Failed initial treatment attempts", next:"arr_narrow_cardio_v" },
    { id:"an3", label:"Recurrent episodes despite treatment", desc:"Recurrence after initial successful management", next:"arr_narrow_cardio_v" },
    { id:"an4", label:"Syncope correlated to cardiac disorder", desc:"Syncope clearly related to the arrhythmia", next:"arr_narrow_cardio_v" },
    { id:"an5", label:"Known structural/coronary/electrical cardiac disease", desc:"Pre-existing cardiac condition", next:"arr_narrow_cardio_v" },
    { id:"an6", label:"Following cardiology clinic at MKH", desc:"Patient with established cardiology follow-up", next:"arr_narrow_cardio_v" },
    { id:"an7", label:"None of the above (uncomplicated SVT/AF)", desc:"Stable, responds to treatment, no cardiac history", next:"arr_narrow_med_v" }
  ]
);

V("arr_narrow_cardio_v", "CARDIOLOGY", "Admit to Cardiology",
  "Narrow complex tachycardia with complicating features requires cardiology.",
  ["Hemodynamic instability requiring urgent DC cardioversion","Resistant to acute management","Recurrent episodes despite treatment","Syncope correlated to cardiac disorder","Known structural, coronary or electrical cardiac disease","Following cardiology clinic at MKH"],
  29, "1.4 Arrhythmias - Narrow Complex",
  "Narrow complex tachycardia cases should be evaluated by/admitted to cardiology division: Hemodynamic instability, resistant to acute management, recurrent episodes, syncope correlated to cardiac disorder, known structural/coronary/electrical cardiac disorders, following cardiology clinic."
);

V("arr_narrow_med_v", "MEDICINE", "Admit to Medicine",
  "Uncomplicated SVT or atrial fibrillation without complicating features is managed by medicine.",
  ["SVT or atrial fibrillation","No hemodynamic instability","Responsive to acute management","No known structural cardiac disease","Not following cardiology clinic"],
  30, "1.4 Arrhythmias - Narrow Complex",
  "Common narrow complex tachycardia cases should be evaluated by medical unit: SVT, Atrial Fibrillation (AF) — does not fall in criteria for cardiology admission."
);

Q("arr_wide_q", "Is the wide complex tachycardia primarily from a non-cardiac disorder?",
  "Wide QRS tachycardia is generally evaluated by cardiology, with specific exceptions",
  [
    { id:"aw1", label:"No — Primary cardiac arrhythmia", desc:"No clear non-cardiac precipitant", next:"arr_wide_cardio_v" },
    { id:"aw2", label:"Precipitated by non-cardiac disorder", desc:"Severe sepsis, shock, severe acid-base disturbance, respiratory distress, thyrotoxicosis storm", next:"arr_wide_med_v" },
    { id:"aw3", label:"Multiple medical comorbidities", desc:"Advanced cancer, severe neurological/respiratory disorders with arrhythmia from comorbidities or treatment", next:"arr_wide_med_v" },
    { id:"aw4", label:"Known SVT with aberration", desc:"Previously documented SVT with aberrant conduction, no structural cardiac disease", next:"arr_wide_med_v" }
  ]
);

V("arr_wide_cardio_v", "CARDIOLOGY", "Admit to Cardiology",
  "Wide complex tachycardia without clear non-cardiac cause requires cardiology.",
  ["Wide QRS complex tachycardia","No clear non-cardiac precipitant","Primary cardiac arrhythmia"],
  30, "1.4.3 Arrhythmias - Wide Complex",
  "In general, patients with wide QRS tachycardia should be evaluated/admitted by cardiology Division."
);

V("arr_wide_med_v", "MEDICINE", "Admit to Medicine",
  "Wide complex tachycardia from non-cardiac causes or in multi-morbid patients is managed by medicine.",
  ["Wide QRS tachycardia precipitated by non-cardiac disorder (sepsis, metabolic, thyrotoxicosis)","Gross multiple medical problems (advanced cancer, severe respiratory/neurological disorders)","Previously documented SVT with aberration without structural cardiac disease"],
  30, "1.4.3 Arrhythmias - Wide Complex",
  "Exceptions to cardiology admission for wide complex tachycardia: Patients whose main presentation is non-cardiac disorder that can precipitate tachyarrhythmia; patients with gross multiple medical problems who develop tachyarrhythmia; patients with previous documented diagnosis of SVT with aberration without significant structural or electrical cardiac disorders.",
  { consult: "In case patients need an EPS assessment, this is to be arranged by cardiology team." }
);

/* ============================================================
   5. BRADYCARDIA (Pages 30-31)
   ============================================================ */
Q("brad_start", "What is the nature of the bradycardia?",
  "Assess symptoms, rate, and underlying cause",
  [
    { id:"br1", label:"Symptomatic bradycardia", desc:"Dizziness, syncope, chest pain, acute HF, hypotension (SBP <90)", next:"brad_cardio_v" },
    { id:"br2", label:"Severe bradycardia ≤40 bpm", desc:"Heart rate 40 beats per minute or less", next:"brad_cardio_v" },
    { id:"br3", label:"Advanced SA or AV block", desc:"High-grade or complete heart block", next:"brad_cardio_v" },
    { id:"br4", label:"Secondary bradycardia", desc:"Caused by severe hyperkalemia, hypothyroidism, drug toxicity, etc.", next:"brad_secondary_v" }
  ]
);

V("brad_cardio_v", "CARDIOLOGY", "Admit to Cardiology",
  "Symptomatic, severe, or advanced-block bradycardia requires cardiology.",
  ["Symptomatic bradycardia (dizziness, syncope, chest pain, acute HF, hypotension SBP <90)","Severe bradycardia ≤40 bpm","Advanced SA or AV block"],
  30, "1.5 Bradycardia",
  "The following bradycardia cases should be evaluated by/admitted to cardiology division: Symptomatic bradycardia (associated with dizziness, syncope, chest pain, acute heart failure, hypotension SBP < 90 mmHg), Severe bradycardia 40 bpm or less, Bradycardia with advanced SA or AV block."
);

V("brad_secondary_v", "MEDICINE", "Admit to Medicine",
  "Secondary bradycardia from reversible causes is managed by medicine with cardiology follow-up.",
  ["Bradycardia secondary to severe hyperkalemia","Bradycardia secondary to severe hypothyroidism","Bradycardia secondary to drug toxicity","Other reversible secondary causes"],
  31, "1.5.2 Bradycardia",
  "Patients with secondary bradycardia (e.g. secondary to severe hyperkalemia, severe hypothyroidism, drug toxicity etc.) diagnosed at time of admission — evaluated by/then admitted to medical or specialty unit with follow up by cardiology division, until clearance by cardiology division is obtained.",
  { consult: "Cardiology follow-up required until clearance is obtained. If EPS needed, arranged by cardiology." }
);

/* ============================================================
   6. CARDIAC TAMPONADE (Page 31)
   ============================================================ */
Q("tamp_start", "What is the status of the cardiac tamponade?",
  "Determine if active tamponade or post-resolution state",
  [
    { id:"t1", label:"Active cardiac tamponade", desc:"Hemodynamically significant pericardial effusion requiring intervention", next:"tamp_active_v" },
    { id:"t2", label:"Tamponade resolved — secondary to medical disease", desc:"After successful pericardiocentesis/drainage, underlying cause is a medical condition (e.g. malignancy)", next:"tamp_resolved_v" }
  ]
);

V("tamp_active_v", "CARDIOLOGY", "Admit to Cardiology",
  "Active cardiac tamponade should be managed initially by cardiology.",
  ["Active cardiac tamponade","Hemodynamically significant pericardial effusion","Pericardiocentesis likely required"],
  31, "1.6 Cardiac Tamponade",
  "Cardiac tamponade should be evaluated and managed initially by cardiology division with follow up by medical/specialty unit after an official consultation to treat the underlying cause if it exists.",
  { consult: "Medical/specialty unit follow-up for underlying cause after tamponade is managed." }
);

V("tamp_resolved_v", "MEDICINE", "Admit to Medicine",
  "After tamponade is resolved, if the underlying cause is medical, patient transfers to medicine.",
  ["Tamponade successfully resolved","Underlying cause is a medical condition (e.g. malignancy, infection)","Cleared by cardiology"],
  31, "1.6 Cardiac Tamponade",
  "After the tamponade is successfully dealt with, in cases the pericardial effusion is secondary to a medical disease, the patient will be cleared by cardiology and should be then managed by medical or specialty unit."
);

/* ============================================================
   7. ENDOCARDITIS (Page 31)
   ============================================================ */
Q("endo_start", "What is the status of the suspected endocarditis?",
  "Assess stability and response to treatment",
  [
    { id:"e1", label:"Stable suspected endocarditis", desc:"Patient is stable, no acute complications", next:"endo_stable_v" },
    { id:"e2", label:"Not improving or complications", desc:"Failure of medical treatment, hemodynamic instability, or other complications", next:"endo_compl_v" }
  ]
);

V("endo_stable_v", "MEDICINE", "Admit to Medicine",
  "Stable suspected endocarditis is managed by medicine with cardiology echo and consult.",
  ["Stable patient","Suspected endocarditis","No acute complications"],
  31, "1.7 Endocarditis",
  "Stable patients with suspected Endocarditis should be evaluated and admitted by medical unit. Cardiology will perform requested echo studies and can be consulted for opinion on management.",
  { consult: "Cardiology will perform echo studies and can be consulted for management opinion." }
);

V("endo_compl_v", "CARDIOLOGY", "Cardiology Takeover",
  "If endocarditis does not improve or complications occur, cardiology evaluates for takeover.",
  ["Failure of medical treatment","Complications from endocarditis","Hemodynamic instability"],
  31, "1.7 Endocarditis",
  "If the patient does not improve or complications occur on medical treatment, cardiology will be consulted, and they will evaluate the case and decide about taking over the care of the patient."
);

/* ============================================================
   8. NEPHROLOGY (Page 33)
   ============================================================ */
Q("neph_start", "What is the patient's renal condition?",
  "Determine if criteria for nephrology admission are met",
  [
    { id:"n1", label:"Hemodialysis patient", desc:"Renal or non-renal complaints in a HD patient", next:"neph_hd_v" },
    { id:"n2", label:"Peritoneal dialysis patient", desc:"Renal or non-renal complaints in a PD patient", next:"neph_pd_v" },
    { id:"n3", label:"Renal transplant patient", desc:"Transplant-related or other complaint", next:"neph_tx_v" },
    { id:"n4", label:"Primary glomerulonephritis with renal complaint", desc:"Diagnosed primary GN presenting with renal issue", next:"neph_gn_v" },
    { id:"n5", label:"Systemic disease — renal disease is the main issue", desc:"E.g. systemic vasculitis where nephritis is the main presenting complaint", next:"neph_systemic_v" },
    { id:"n6", label:"ESRD (eGFR <15) with renal complaint", desc:"End-stage renal disease prior to this visit, presenting with renal complaint only", next:"neph_esrd_v" },
    { id:"n7", label:"Nephrotic syndrome planned for renal biopsy", desc:"Scheduled or needed renal biopsy for nephrotic syndrome", next:"neph_biopsy_v" },
    { id:"n8", label:"None of the above", desc:"Does not meet nephrology admission criteria", next:"neph_other_v" }
  ]
);

V("neph_hd_v", "NEPHROLOGY", "Admit to Nephrology", "Hemodialysis patients with any complaint are admitted to nephrology.",
  ["Hemodialysis patient","Renal or non-renal complaints"], 33, "2.1 Nephrology Admission Criteria",
  "Cases to be seen and admitted under Nephrology Division: Hemodialysis patients with Renal & Non-Renal complaints."
);

V("neph_pd_v", "NEPHROLOGY", "Admit to Nephrology", "Peritoneal dialysis patients are admitted to nephrology.",
  ["Peritoneal dialysis patient","Renal or non-renal complaints"], 33, "2.1 Nephrology Admission Criteria",
  "Cases to be seen and admitted under Nephrology Division: Peritoneal dialysis with renal & non-renal complaints."
);

V("neph_tx_v", "NEPHROLOGY", "Admit to Nephrology", "Renal transplant patients are admitted to nephrology.",
  ["Renal transplant recipient"], 33, "2.1 Nephrology Admission Criteria",
  "Cases to be seen and admitted under Nephrology Division: Renal Transplant patients."
);

V("neph_gn_v", "NEPHROLOGY", "Admit to Nephrology", "Primary glomerulonephritis with renal complaint goes to nephrology.",
  ["Primary glomerulonephritis","Presenting with renal complaint"], 33, "2.1 Nephrology Admission Criteria",
  "Cases to be seen and admitted under Nephrology Division: Patients with diagnosis of primary glomerulonephritis with renal complaint."
);

V("neph_systemic_v", "NEPHROLOGY", "Admit to Nephrology", "Systemic disease where renal disease is the main issue goes to nephrology.",
  ["Systemic disease (e.g. vasculitis)","Nephritis is the main presenting complaint"], 33, "2.1 Nephrology Admission Criteria",
  "Cases to be seen and admitted under Nephrology Division: Patients with systemic disease where renal disease is the main issue (e.g. systemic vasculitis where nephritis is the main presenting complaint)."
);

V("neph_esrd_v", "NEPHROLOGY", "Admit to Nephrology", "ESRD with eGFR <15 and renal complaint only goes to nephrology.",
  ["End-stage renal disease","eGFR <15 (prior to this visit)","Renal complaint only"], 33, "2.1 Nephrology Admission Criteria",
  "Cases to be seen and admitted under Nephrology Division: End-stage renal disease eGFR <15 (prior to this visit) with renal complaint only."
);

V("neph_biopsy_v", "NEPHROLOGY", "Admit to Nephrology", "Nephrotic syndrome planned for renal biopsy goes to nephrology.",
  ["Nephrotic syndrome","Planned for renal biopsy"], 33, "2.1 Nephrology Admission Criteria",
  "Cases to be seen and admitted under Nephrology Division: Nephrotic syndrome planned for renal biopsy."
);

V("neph_other_v", "MEDICINE", "Admit to Medicine", "Renal conditions not meeting nephrology criteria are managed by medicine with nephrology consult.",
  ["Does not meet nephrology admission criteria","Nephrology consultation can be requested"], 33, "2.1 Nephrology Admission Criteria",
  "In cases that do not fulfill the criteria and you feel it's safer for the patient to be under nephrology, nephrology on-call shall be contacted to discuss the case. For patients admitted under medicine and initiated dialysis, the patient will be taken-over once they reach ESRD defined by being on dialysis for 3 months.",
  { consult: "Contact nephrology on-call to discuss if needed." }
);

/* ============================================================
   9. NEUROLOGY (Page 34)
   ============================================================ */
Q("neuro_start", "What is the neurological presentation?",
  "Select the most appropriate neurological condition",
  [
    { id:"ne1", label:"Stroke within 4 hours of onset", desc:"All strokes regardless of etiology or age, within 4 hrs", next:"neuro_stroke4_v" },
    { id:"ne2", label:"Stroke after 4 hours or unknown onset", desc:"All strokes after 4 hrs of onset or unknown time", next:"neuro_stroke_late_v" },
    { id:"ne3", label:"Status epilepticus (unprovoked)", desc:"Unprovoked continuous seizure activity", next:"neuro_se_v" },
    { id:"ne4", label:"Provoked status epilepticus", desc:"E.g. secondary to Na 110 or other metabolic cause", next:"neuro_se_prov_v" },
    { id:"ne5", label:"Epilepsy following neuro OPD", desc:"Known epilepsy with neurology follow-up (any hospital)", next:"neuro_epi_neuro_v" },
    { id:"ne6", label:"Epilepsy following medical OPD", desc:"Known epilepsy with medical unit follow-up", next:"neuro_epi_med_v" },
    { id:"ne7", label:"New onset seizures", desc:"First-time seizure presentation", next:"neuro_new_sz_v" },
    { id:"ne8", label:"Acute myasthenia gravis", desc:"Myasthenic crisis or acute exacerbation", next:"neuro_mg_v" },
    { id:"ne9", label:"Guillain-Barré syndrome", desc:"Acute inflammatory demyelinating polyneuropathy", next:"neuro_gbs_v" },
    { id:"ne10", label:"Suspected spinal cord compression", desc:"Acute myelopathy with cord compression", next:"neuro_scc_v" },
    { id:"ne11", label:"Acute transverse myelitis", desc:"Acute inflammatory spinal cord disorder", next:"neuro_tm_v" },
    { id:"ne12", label:"Acute MS relapse", desc:"Multiple sclerosis acute exacerbation", next:"neuro_ms_v" },
    { id:"ne13", label:"Intracranial hemorrhage", desc:"Non-traumatic ICH", next:"neuro_ich_v" },
    { id:"ne14", label:"Coma / Meningitis / Encephalitis", desc:"Decreased consciousness, CNS infection", next:"neuro_coma_v" },
    { id:"ne15", label:"Headache / Dizziness / Syncope / Delirium", desc:"Undiagnosed headache, dizziness, acute confusion", next:"neuro_other_med_v" },
    { id:"ne16", label:"Acute movement disorder", desc:"Psychotropic-induced dystonia, acute tremor", next:"neuro_movement_v" }
  ]
);

V("neuro_stroke4_v", "MEDICINE", "Initial: Neurology → Admit: Medicine",
  "Acute stroke within 4 hours: neurology performs initial assessment, patient admitted under medicine.",
  ["Stroke within 4 hours of symptom onset","All etiologies and ages"],
  34, "3. Neurology Admission Criteria",
  "All strokes regardless of etiology or age within 4 hrs of onset of symptoms — Initial assessment: Neurology, Admitting team: Medicine.",
  { secondaryDept:"NEUROLOGY", consult:"Neurology performs initial assessment. Acute stroke team available within 5 minutes at bedside via phone #66234007." }
);

V("neuro_stroke_late_v", "MEDICINE", "Admit to Medicine",
  "Stroke after 4 hours or with unknown onset is admitted directly under medicine.",
  ["Stroke after 4 hours of onset","Unknown time of symptom onset"],
  34, "3. Neurology Admission Criteria",
  "All strokes regardless of etiology or age after 4 hrs of onset of symptoms or unknown time of onset — assessed and admitted by Medicine."
);

V("neuro_se_v", "NEUROLOGY", "Admit to Neurology",
  "Unprovoked status epilepticus is admitted under neurology.",
  ["Status epilepticus","Unprovoked (no clear metabolic or toxic cause)"],
  34, "3. Neurology Admission Criteria",
  "Status Epilepticus (unprovoked) — Initial assessment: Neurology, Admitting team: Neurology."
);

V("neuro_se_prov_v", "MEDICINE", "Initial: Neurology → Admit: Medicine",
  "Provoked status epilepticus: neurology initial assessment, admitted under medicine.",
  ["Status epilepticus","Provoked by metabolic or other cause (e.g. Na 110)"],
  34, "3. Neurology Admission Criteria",
  "Provoked Status Epilepticus (e.g. Na 110) — Initial assessment: Neurology, Admitting team: Medicine.",
  { secondaryDept:"NEUROLOGY" }
);

V("neuro_epi_neuro_v", "NEUROLOGY", "Admit to Neurology",
  "Epilepsy patients following neurology OPD are admitted under neurology.",
  ["Known epilepsy","Following neurology OPD (regardless of which hospital)"],
  34, "3. Neurology Admission Criteria",
  "Epilepsy following with neuro OPD (regardless of which hospital) — Neurology admission."
);

V("neuro_epi_med_v", "MEDICINE", "Admit to Medicine",
  "Epilepsy patients following medical OPD are admitted under medicine.",
  ["Known epilepsy","Following medical OPD"],
  34, "3. Neurology Admission Criteria",
  "Epilepsy following with medical OPD — Medicine admission."
);

V("neuro_new_sz_v", "MEDICINE", "Initial: Neurology → Admit: Medicine",
  "New onset seizures: neurology initial assessment, admitted under medicine.",
  ["First-time seizure presentation"],
  34, "3. Neurology Admission Criteria",
  "New onset seizures — Initial assessment: Neurology, Admitting team: Medicine.",
  { secondaryDept:"NEUROLOGY" }
);

V("neuro_mg_v", "NEUROLOGY", "Admit to Neurology",
  "Acute myasthenia gravis is admitted under neurology.",
  ["Acute myasthenia gravis","Myasthenic crisis"],
  34, "3. Neurology Admission Criteria",
  "Acute myasthenia gravis — Neurology admission."
);

V("neuro_gbs_v", "NEUROLOGY", "Admit to Neurology",
  "Guillain-Barré syndrome is admitted under neurology.",
  ["Guillain-Barré syndrome"],
  34, "3. Neurology Admission Criteria",
  "Guillain Barré syndrome — Neurology admission."
);

V("neuro_scc_v", "MEDICINE", "Initial: Neurology → Admit: Medicine",
  "Suspected spinal cord compression: neurology initial assessment, admitted under medicine.",
  ["Suspected spinal cord compression"],
  34, "3. Neurology Admission Criteria",
  "Suspected spinal cord compression — Initial assessment: Neurology, Admitting team: Medicine.",
  { secondaryDept:"NEUROLOGY" }
);

V("neuro_tm_v", "NEUROLOGY", "Admit to Neurology",
  "Acute transverse myelitis is admitted under neurology.",
  ["Acute transverse myelitis"],
  34, "3. Neurology Admission Criteria",
  "Acute transverse myelitis — Neurology admission."
);

V("neuro_ms_v", "NEUROLOGY", "Admit to Neurology",
  "Acute MS relapse is admitted under neurology.",
  ["Acute multiple sclerosis relapse"],
  34, "3. Neurology Admission Criteria",
  "Acute multiple sclerosis relapse — Neurology admission."
);

V("neuro_ich_v", "MEDICINE", "Initial: Neurology → Admit: Medicine",
  "Intracranial hemorrhage: neurology initial assessment, admitted under medicine.",
  ["Intracranial hemorrhage (non-traumatic)"],
  34, "3. Neurology Admission Criteria",
  "Intercranial Haemorrhage — Initial assessment: Neurology, Admitting team: Medicine.",
  { secondaryDept:"NEUROLOGY" }
);

V("neuro_coma_v", "MEDICINE", "Admit to Medicine",
  "Coma, meningitis, and encephalitis are admitted under medicine.",
  ["Coma","Meningitis","Encephalitis"],
  34, "3. Neurology Admission Criteria",
  "Coma — Medicine. Meningitis/Encephalitis — Medicine."
);

V("neuro_other_med_v", "MEDICINE", "Admit to Medicine",
  "Undiagnosed headache, dizziness, syncope, delirium, and hydrocephalus/tumors are admitted under medicine.",
  ["Undiagnosed headache","Dizziness/syncope","Acute confusion and delirium","Hydrocephalus/intracranial tumors"],
  34, "3. Neurology Admission Criteria",
  "Undiagnosed Headache — Medicine. Dizziness/syncope — Medicine. Acute confusion state and delirium — Medicine. Hydrocephalus/Intracranial Tumours — Medicine."
);

V("neuro_movement_v", "MEDICINE", "Initial: Neurology → Admit: Medicine",
  "Acute movement disorders: neurology initial assessment, admitted under medicine.",
  ["Acute movement disorder","Psychotropic-induced dystonia","Acute tremor"],
  34, "3. Neurology Admission Criteria",
  "Acute movement disorders (e.g. psychotropic induced dystonia, tremor) — Initial assessment: Neurology, Admitting team: Medicine.",
  { secondaryDept:"NEUROLOGY" }
);

/* ============================================================
   10. RESPIRATORY (Pages 35-37)
   ============================================================ */
Q("resp_start", "What is the respiratory presentation?",
  "Select the primary respiratory condition",
  [
    { id:"r1", label:"Bronchial asthma (BA)", desc:"Known or suspected asthma presentation", next:"resp_ba_q" },
    { id:"r2", label:"COPD exacerbation", desc:"Known or suspected COPD", next:"resp_copd_q" },
    { id:"r3", label:"Chest infection / Uncomplicated pneumonia", desc:"Community-acquired pneumonia, COVID-19 without complications", next:"resp_pna_v" },
    { id:"r4", label:"Complicated pneumonia", desc:"Parapneumonic effusion, bronchiectasis, necrotizing, lung abscess, non-resolving", next:"resp_comp_pna_v" },
    { id:"r5", label:"Post-COVID lung disease", desc:"Post-COVID pulmonary complications", next:"resp_postcovid_v" },
    { id:"r6", label:"Pulmonary embolism / VTE", desc:"Venous thromboembolism", next:"resp_pe_v" },
    { id:"r7", label:"Suspected pulmonary TB", desc:"Apical fibrosis on CXR +/- B symptoms", next:"resp_tb_v" },
    { id:"r8", label:"Hemoptysis", desc:"Coughing blood", next:"resp_hemo_q" },
    { id:"r9", label:"Pleural effusion", desc:"Unilateral or bilateral", next:"resp_effusion_q" },
    { id:"r10", label:"Post lung transplant", desc:"Lung transplant recipient", next:"resp_transplant_v" },
    { id:"r11", label:"Known ILD", desc:"Interstitial lung disease", next:"resp_ild_q" },
    { id:"r12", label:"Lung cancer", desc:"Primary lung cancer or metastatic", next:"resp_cancer_q" },
    { id:"r13", label:"Bronchiectasis", desc:"Known bronchiectasis", next:"resp_bronch_q" }
  ]
);

Q("resp_ba_q", "Does the patient have an established BA diagnosis with PFT and no active comorbidities?",
  "Established = documented diagnostic testing and/or specialist diagnosis",
  [
    { id:"ba1", label:"Yes — Established diagnosis, no active comorbidities", desc:"Appropriate established diagnosis clinically and baseline PFT", next:"resp_ba_resp_v" },
    { id:"ba2", label:"No — Unconfirmed diagnosis or active comorbidities", desc:"No proper diagnosis provided and/or presence of active comorbidities", next:"resp_ba_med_v" }
  ]
);

V("resp_ba_resp_v", "RESPIRATORY", "Admit to Respiratory",
  "BA with established diagnosis and no comorbidities admitted under respiratory.",
  ["Bronchial asthma","Established diagnosis clinically and baseline PFT","No active comorbidities"],
  35, "4. Respiratory Admission Criteria - BA",
  "BA: 1ry assessment & admission under resp (provided appropriate established diagnosis clinically and baseline PFT with no active comorbidities)."
);

V("resp_ba_med_v", "MEDICINE", "Admit to Medicine",
  "BA without proper diagnosis or with active comorbidities admitted under medicine.",
  ["Bronchial asthma presentation","No proper diagnosis provided","Presence of active comorbidities"],
  35, "4. Respiratory Admission Criteria - BA",
  "BA: 1ry assessment by resp & admission under medical (no proper diagnosis provided and/or presence of active comorbidities).",
  { consult: "Respiratory team performs initial assessment." }
);

Q("resp_copd_q", "Does the patient have an established COPD diagnosis (age >40, smoking history, ratio <70%) with no active comorbidities?",
  "Established = age >40, smoking history, and baseline ratio <70%",
  [
    { id:"copd1", label:"Yes — Established diagnosis, no active comorbidities", desc:"Age >40, smoking history, baseline ratio <70%", next:"resp_copd_resp_v" },
    { id:"copd2", label:"No — Unconfirmed or active comorbidities", desc:"Doesn't meet diagnostic criteria or has active medical issues", next:"resp_copd_med_v" }
  ]
);

V("resp_copd_resp_v", "RESPIRATORY", "Admit to Respiratory",
  "COPD with established diagnosis and no comorbidities admitted under respiratory.",
  ["COPD exacerbation","Age >40","Smoking history","Baseline ratio <70%","No active comorbidities"],
  35, "4. Respiratory Admission Criteria - COPD",
  "COPD: 1ry assessment & admission under resp (provided appropriate established diagnosis by age>40, smoking history, and baseline ratio <70% with no active comorbidities)."
);

V("resp_copd_med_v", "MEDICINE", "Admit to Medicine",
  "COPD without proper diagnosis or with active comorbidities admitted under medicine.",
  ["COPD presentation","No proper diagnosis provided","Active comorbidities present"],
  35, "4. Respiratory Admission Criteria - COPD",
  "COPD: 1ry assessment by resp team & admission under medical (no proper diagnosis provided and/or presence of active comorbidities).",
  { consult: "Respiratory team performs initial assessment and provides management plan." }
);

V("resp_pna_v", "MEDICINE", "Admit to Medicine",
  "Uncomplicated pneumonia and chest infections are admitted under medicine.",
  ["Chest infection","Uncomplicated pneumonia","COVID-19 without pulmonary complications"],
  35, "4. Respiratory Admission Criteria - Chest Infections",
  "Chest infections including uncomplicated pneumonia, covid-19 — 1ry assessment by medical team (can ask for resp. opinion and plan in ER or ward).",
  { consult: "Can request respiratory opinion and plan in ER or ward." }
);

V("resp_comp_pna_v", "RESPIRATORY", "Admit to Respiratory",
  "Complicated pneumonia with pulmonary complications admitted under respiratory.",
  ["Complicated pneumonia (including COVID-19 pneumonia)","Non-resolving pneumonia","Parapneumonic effusion","Bronchiectasis","Necrotizing pneumonia","Lung abscess"],
  35, "4. Respiratory Admission Criteria - Complicated Pneumonia",
  "Complicated pneumonia (including COVID-19 pneumonia), non-resolving pneumonia and/or with active resp complications (parapneumonic effusion, bronchiectasis, necrotizing, lung abscess) — 1ry assessment & admission under resp."
);

V("resp_postcovid_v", "RESPIRATORY", "Admit to Respiratory",
  "Post-COVID lung disease is admitted under respiratory.",
  ["Post-COVID lung disease"],
  35, "4. Respiratory Admission Criteria",
  "Post-covid lung disease — 1ry assessment & admission under resp."
);

V("resp_pe_v", "MEDICINE", "Admit to Medicine",
  "Pulmonary embolism and VTE are admitted under medicine.",
  ["Pulmonary embolism","Venous thromboembolism"],
  35, "4. Respiratory Admission Criteria",
  "Pulmonary embolism and VTE — for medical team."
);

V("resp_tb_v", "RESPIRATORY", "Admit to Respiratory",
  "Suspected pulmonary TB is admitted under respiratory including transfer if positive.",
  ["Suspected pulmonary TB","Apical fibrosis on CXR","B symptoms"],
  36, "4. Respiratory Admission Criteria - TB",
  "Suspected pulmonary TB: (apical fibrosis on CXR +/- B symptoms) — 1ry assessment & admission under resp including transfer if proven +ve."
);

Q("resp_hemo_q", "Is the hemoptysis from an active pulmonary issue or undiagnosed/non-respiratory cause?",
  "Determine the underlying cause",
  [
    { id:"hemo1", label:"Active pulmonary issue", desc:"Known lung disease, respiratory pathology", next:"resp_hemo_resp_v" },
    { id:"hemo2", label:"Undiagnosed cause or non-respiratory", desc:"Unknown etiology or non-pulmonary cause, or active comorbidities", next:"resp_hemo_med_v" }
  ]
);

V("resp_hemo_resp_v", "RESPIRATORY", "Admit to Respiratory",
  "Hemoptysis with active pulmonary issue admitted under respiratory.",
  ["Hemoptysis","Active pulmonary issue identified"],
  36, "4. Respiratory Admission Criteria - Hemoptysis",
  "Hemoptysis: 1ry assessment & admission under resp (if with active pulmonary issue)."
);

V("resp_hemo_med_v", "MEDICINE", "Admit to Medicine",
  "Hemoptysis from undiagnosed or non-respiratory causes admitted under medicine.",
  ["Hemoptysis","Undiagnosed cause","Non-respiratory etiology","Active comorbidities"],
  36, "4. Respiratory Admission Criteria - Hemoptysis",
  "Hemoptysis: 1ry assessment by resp & admission under medical (if undiagnosed cause or non-resp causes) or having active comorbidities.",
  { consult: "Respiratory team performs initial assessment." }
);

Q("resp_effusion_q", "Is the pleural effusion unilateral and undiagnosed, without active comorbidities?",
  "Classify the effusion",
  [
    { id:"eff1", label:"Unilateral, undiagnosed, no active comorbidities", desc:"New unilateral effusion requiring workup", next:"resp_eff_resp_v" },
    { id:"eff2", label:"Bilateral, diagnosed, or obvious cause", desc:"E.g. bilateral effusion from LVF, known cause", next:"resp_eff_med_v" }
  ]
);

V("resp_eff_resp_v", "RESPIRATORY", "Admit to Respiratory",
  "Undiagnosed unilateral pleural effusion without comorbidities admitted under respiratory.",
  ["Unilateral pleural effusion","Undiagnosed","No active medical comorbidities"],
  36, "4. Respiratory Admission Criteria - Pleural Effusion",
  "Undiagnosed unilateral pleural effusion: 1ry assessment & admission under resp (if no active medical comorbidities)."
);

V("resp_eff_med_v", "MEDICINE", "Admit to Medicine",
  "Bilateral, diagnosed, or effusion with obvious cause admitted under medicine.",
  ["Bilateral pleural effusion","Diagnosed effusion","Obvious cause (e.g. LVF)","Active comorbidities"],
  36, "4. Respiratory Admission Criteria - Pleural Effusion",
  "Pleural effusion: 1ry assessment & admission under medical (if bilateral, diagnosed, and/or with obvious cause e.g. LVF)."
);

V("resp_transplant_v", "RESPIRATORY", "Admit to Respiratory",
  "Post lung transplant patients are admitted under respiratory.",
  ["Post lung transplant"],
  36, "4. Respiratory Admission Criteria",
  "Post lung transplant — 1ry assessment & admission under resp."
);

Q("resp_ild_q", "Is the ILD patient presenting with a respiratory or non-respiratory issue?",
  "Determine the presenting complaint",
  [
    { id:"ild1", label:"Respiratory issue", desc:"Coming to ER with a respiratory complaint", next:"resp_ild_resp_v" },
    { id:"ild2", label:"Non-respiratory issue", desc:"Coming with a medical, non-respiratory complaint", next:"resp_ild_med_v" }
  ]
);

V("resp_ild_resp_v", "RESPIRATORY", "Admit to Respiratory",
  "Known ILD with respiratory issue admitted under respiratory.",
  ["Known interstitial lung disease","Presenting with respiratory issue"],
  36, "4. Respiratory Admission Criteria - ILD",
  "Known ILD: 1ry assessment & admission under resp (if coming to ER with resp. issue)."
);

V("resp_ild_med_v", "MEDICINE", "Admit to Medicine",
  "Known ILD with non-respiratory issue admitted under medicine.",
  ["Known interstitial lung disease","Presenting with non-respiratory issue"],
  36, "4. Respiratory Admission Criteria - ILD",
  "Known ILD: 1ry assessment & admission under medical (if coming with a non resp. issue)."
);

Q("resp_cancer_q", "What is the lung cancer status?",
  "Determine stage and treatment status",
  [
    { id:"lc1", label:"Early primary lung cancer with respiratory symptoms", desc:"Diagnosed or early undiagnosed with respiratory symptoms and/or complications", next:"resp_cancer_resp_v" },
    { id:"lc2", label:"Lung cancer — non-respiratory presentation", desc:"Presentation not due to acute respiratory symptoms", next:"resp_cancer_med_v" },
    { id:"lc3", label:"Lung cancer with metastasis — on active treatment", desc:"Not yet deemed palliative", next:"resp_cancer_active_v" },
    { id:"lc4", label:"Lung cancer deemed palliative", desc:"Palliative treatment stage", next:"resp_cancer_pall_v" }
  ]
);

V("resp_cancer_resp_v", "RESPIRATORY", "Admit to Respiratory",
  "Early lung cancer with respiratory symptoms/complications admitted under respiratory.",
  ["Early primary lung cancer","Diagnosed or early undiagnosed","Presenting with respiratory symptoms and/or complications"],
  36, "4. Respiratory Admission Criteria - Lung Cancer",
  "Lung cancer (early primary lung cancer): 1ry assessment & admission under resp (diagnosed or early undiagnosed presenting with resp. symptoms and/or complications)."
);

V("resp_cancer_med_v", "MEDICINE", "Admit to Medicine",
  "Lung cancer presenting with non-respiratory issues admitted under medicine.",
  ["Lung cancer","Presentation not due to acute respiratory symptoms"],
  36, "4. Respiratory Admission Criteria - Lung Cancer",
  "Lung cancer: 1ry assessment & admission under medical (presentation not due to acute resp. symptoms and/or pulmonary complications)."
);

V("resp_cancer_active_v", "RESPIRATORY", "Admit to Respiratory",
  "Metastatic lung cancer on active treatment admitted under respiratory.",
  ["Lung cancer with metastasis","On active cancer treatment","Not yet deemed palliative"],
  36, "4. Respiratory Admission Criteria - Lung Cancer",
  "Lung cancer with metastasis: 1ry assessment & admission under resp (if pt is on active cancer treatment and not yet deemed palliative)."
);

V("resp_cancer_pall_v", "MEDICINE", "Admit to Medicine",
  "Lung cancer deemed palliative admitted under medicine.",
  ["Lung cancer with metastasis","Deemed for palliative treatment"],
  36, "4. Respiratory Admission Criteria - Lung Cancer",
  "Lung cancer with metastasis: 1ry assessment & admission by medical team (if pt is deemed for palliative treatment)."
);

Q("resp_bronch_q", "Does the bronchiectasis patient have active unrelated medical issues?",
  "Determine if medical comorbidities are the main concern",
  [
    { id:"bx1", label:"No — Primary bronchiectasis presentation", desc:"Presenting with bronchiectasis-related complaints", next:"resp_bronch_resp_v" },
    { id:"bx2", label:"Yes — Active medical issues unrelated to bronchiectasis", desc:"Active medical comorbidities are the primary concern", next:"resp_bronch_med_v" }
  ]
);

V("resp_bronch_resp_v", "RESPIRATORY", "Admit to Respiratory",
  "Bronchiectasis without unrelated medical issues admitted under respiratory.",
  ["Known bronchiectasis","Presenting with bronchiectasis-related complaints"],
  36, "4. Respiratory Admission Criteria - Bronchiectasis",
  "Bronchiectasis: 1ry assessment & admission under resp."
);

V("resp_bronch_med_v", "MEDICINE", "Admit to Medicine",
  "Bronchiectasis with active unrelated medical issues admitted under medicine.",
  ["Known bronchiectasis","Active medical issues unrelated to bronchiectasis"],
  36, "4. Respiratory Admission Criteria - Bronchiectasis",
  "Bronchiectasis: 1ry assessment by resp & admission under medical if having active medical issues (unrelated to bronchiectasis).",
  { consult: "Respiratory team performs initial assessment." }
);

/* ============================================================
   11. GASTROENTEROLOGY (Pages 39-40)
   ============================================================ */
Q("gi_start", "What is the gastrointestinal presentation?",
  "Select the primary GI condition",
  [
    { id:"gi1", label:"IBD exacerbation (actively followed by GI)", desc:"Crohn's or UC flare — patient follows GI clinic at MKH or has proof of diagnosis", next:"gi_ibd_v" },
    { id:"gi2", label:"CLD with GI complications (followed by MKH GI)", desc:"Upper GI bleeding, ascites, hepatic encephalopathy, hepatorenal syndrome — in patients following MKH GI dept", next:"gi_cld_v" },
    { id:"gi3", label:"Post liver transplant with disease complication", desc:"Liver transplant related complications", next:"gi_transplant_v" },
    { id:"gi4", label:"Non-biliary pancreatitis", desc:"Acute or chronic non-biliary pancreatitis", next:"gi_panc_v" },
    { id:"gi5", label:"Acute hepatitis", desc:"Acute liver inflammation (not fulminant)", next:"gi_hep_v" },
    { id:"gi6", label:"Celiac disease / Acute or chronic diarrhea", desc:"GI conditions requiring medical management", next:"gi_celiac_v" },
    { id:"gi7", label:"IBD with non-disease exacerbation", desc:"IBD patient presenting with DVT, UTI, or other non-IBD issue", next:"gi_ibd_non_v" },
    { id:"gi8", label:"CLD with non-disease exacerbation", desc:"CLD patient presenting with UTI or other non-liver issue", next:"gi_cld_non_v" },
    { id:"gi9", label:"PEG tube complications", desc:"PEG tube infection, accidental removal, exchange needed", next:"gi_peg_v" }
  ]
);

V("gi_ibd_v", "GASTROENTEROLOGY", "Admit to Gastroenterology",
  "IBD exacerbation in patients actively followed by GI admitted under gastroenterology.",
  ["IBD (Crohn's Disease or Ulcerative Colitis)","Presenting with disease exacerbation","Actively followed by GI clinic or proof of diagnosis available"],
  39, "5.2 Gastroenterology",
  "IBD (Crohn's Disease & Ulcerative Colitis) presenting with exacerbation. A proof of diagnosis should be available for patients who do not follow with MKH GI department whether in public or private."
);

V("gi_cld_v", "GASTROENTEROLOGY", "Admit to Gastroenterology",
  "CLD with GI complications in patients following MKH GI dept admitted under gastroenterology.",
  ["Chronic liver disease following MKH GI department","Upper GI bleeding","Ascites and complications","Hepatic encephalopathy","Hepatorenal syndrome"],
  39, "5.2 Gastroenterology",
  "Chronic Liver Disease (CLD) presenting with: Upper gastrointestinal bleeding, Ascites & its complications, Hepatic encephalopathy, Hepatorenal syndrome — only refers to patients following up with GI Dept. in MKH; otherwise they are to be admitted in IM Dept. initially, and taken over by GI team after diagnosis."
);

V("gi_transplant_v", "GASTROENTEROLOGY", "Admit to Gastroenterology",
  "Post liver transplant with disease-related complications admitted under gastroenterology.",
  ["Post liver transplant","Disease-related complications"],
  39, "5.2 Gastroenterology",
  "Post liver transplant with disease related complications — admitted under GI service."
);

V("gi_panc_v", "MEDICINE", "Admit to Medicine",
  "Non-biliary pancreatitis is admitted under medicine with GI consult follow-up.",
  ["Non-biliary pancreatitis","Acute or chronic"],
  39, "5.2.2 Gastroenterology - Medicine",
  "Non biliary pancreatitis (acute & chronic) — admitted under medicine but to be followed up by GI consult team.",
  { consult: "GI consult team follow-up required." }
);

V("gi_hep_v", "MEDICINE", "Admit to Medicine",
  "Acute hepatitis is admitted under medicine with GI consult.",
  ["Acute hepatitis"],
  39, "5.2.2 Gastroenterology - Medicine",
  "Acute hepatitis — admitted under medicine, followed up by GI consult team. For patient with Acute fulminant hepatitis, Gastroenterologist on-call should be contacted at admission by medical team.",
  { consult: "GI consult team follow-up. For FULMINANT hepatitis: contact Gastroenterologist on-call IMMEDIATELY at admission." }
);

V("gi_celiac_v", "MEDICINE", "Admit to Medicine",
  "Celiac disease and acute/chronic diarrhea admitted under medicine with GI consult.",
  ["Celiac disease","Acute diarrhea","Chronic diarrhea"],
  39, "5.2.2 Gastroenterology - Medicine",
  "Celiac disease, acute & chronic diarrhea — admitted under medicine, followed up by GI consult team.",
  { consult: "GI consult team follow-up." }
);

V("gi_ibd_non_v", "MEDICINE", "Admit to Medicine",
  "IBD patients with non-disease exacerbation admitted under medicine.",
  ["IBD patient","Non-disease exacerbation (e.g. DVT)"],
  39, "5.2.2 Gastroenterology - Medicine",
  "IBD patients presenting with non-disease exacerbation (eg DVT) — admitted under medicine.",
  { consult: "GI consult if GI input needed." }
);

V("gi_cld_non_v", "MEDICINE", "Admit to Medicine",
  "CLD patients with non-disease exacerbation admitted under medicine.",
  ["CLD patient","Non-disease exacerbation (e.g. UTI)"],
  39, "5.2.2 Gastroenterology - Medicine",
  "Chronic liver disease with non-disease exacerbation (eg. UTI) — admitted under medicine.",
  { consult: "GI consult if GI input needed." }
);

V("gi_peg_v", "MEDICINE", "Admit to Medicine",
  "PEG tube complications managed by medicine; GI arranges exchange when available.",
  ["PEG tube complications","PEG tube infection","Accidental removal"],
  39, "5.2.2 Gastroenterology - Medicine",
  "PEG tube & its complications: Medical team for PEG tube infection for evaluation and assessment for the need of hospital admission. PEG tube exchange is not available during the on call hours/days and patient should be admitted by medical team if necessary.",
  { consult: "GI arranges elective PEG exchange in endoscopy unit. During long holidays (>4 days), discuss PEG re-insertion with gastro unit." }
);

/* ============================================================
   12. RHEUMATOLOGY (Page 40)
   ============================================================ */
Q("rheum_start", "What is the rheumatological presentation?",
  "Determine the presenting complaint and organ involvement",
  [
    { id:"rh1", label:"Rheumatic disease (general)", desc:"Any rheumatic disease without major organ complications below", next:"rheum_general_v" },
    { id:"rh2", label:"CTD with acute CNS manifestation", desc:"Connective tissue disease presenting with stroke or CNS involvement", next:"rheum_cns_q" },
    { id:"rh3", label:"CTD with acute renal insult", desc:"Elevated creatinine, marked proteinuria, active sediment", next:"rheum_renal_v" }
  ]
);

V("rheum_general_v", "RHEUMATOLOGY", "Admit to Rheumatology",
  "Patients with rheumatic disease are admitted under rheumatology.",
  ["Any rheumatic disease","Active disease requiring admission"],
  40, "5.3 Rheumatology",
  "All patients with rheumatic disease — admitted to Rheumatology. Rheumatology team need to be informed about any patient with rheumatic disease who gets admitted under another unit.",
  { consult: "Rheumatology must be informed even if patient is admitted under another unit for non-rheumatic issues." }
);

Q("rheum_cns_q", "Is the patient under 45 with a stroke?",
  "Age determines admitting service for CTD-related CNS events",
  [
    { id:"rh_cns1", label:"Yes — Stroke, age <45", desc:"Young stroke in CTD patient", next:"rheum_cns_neuro_v" },
    { id:"rh_cns2", label:"No — Other CNS manifestation or age ≥45", desc:"Other CNS involvement or older patient", next:"rheum_general_v" }
  ]
);

V("rheum_cns_neuro_v", "NEUROLOGY", "Admit to Neurology",
  "CTD with stroke under age 45 is admitted under neurology with rheumatology follow-up.",
  ["Connective tissue disease","Stroke under age 45"],
  40, "5.3 Rheumatology",
  "Patients with connective tissue disease and present with acute CNS manifestation: Stroke under the age of 45 should be admitted under the neurology team and followed by Rheumatology team after an official consultation.",
  { consult: "Rheumatology follow-up via official consultation." }
);

V("rheum_renal_v", "NEPHROLOGY", "Admit to Nephrology",
  "CTD with acute renal insult is admitted under nephrology with rheumatology follow-up.",
  ["Connective tissue disease","Acute renal insult","Elevated creatinine","Marked proteinuria","Active sediment"],
  40, "5.3 Rheumatology",
  "Patients with connective tissue disease and present with acute renal insult (elevated creatinine, marked proteinuria, active sedimentation, etc.) should be admitted under the Nephrology division.",
  { consult: "Rheumatology follow-up required." }
);

/* ============================================================
   13. ENDOCRINE EMERGENCIES (Page 40)
   ============================================================ */
Q("endocr_start", "What is the endocrine presentation?",
  "Select the endocrine condition",
  [
    { id:"ec1", label:"Known endocrine case with endocrine issue", desc:"Patient following endocrine service, presenting with endocrine problem", next:"endocr_known_v" },
    { id:"ec2", label:"DKA — Type 1 / LADA", desc:"Diabetic ketoacidosis in Type 1 DM or LADA", next:"endocr_dka_q" },
    { id:"ec3", label:"Endocrine emergency (weekday)", desc:"Pituitary apoplexy, pheo crisis, thyroid storm, myxedema coma, adrenal crisis, hypo/hypercalcemia (parathyroid) — presenting Sun-Thu", next:"endocr_emerg_wd_v" },
    { id:"ec4", label:"Endocrine emergency (weekend/holiday)", desc:"Same emergencies presenting on Fri-Sat or holidays", next:"endocr_emerg_we_v" }
  ]
);

V("endocr_known_v", "ENDOCRINOLOGY", "Admit to Endocrinology",
  "Known endocrine patients with endocrine issues admitted under endocrinology.",
  ["Known follow-up with endocrine service","Presenting with endocrine issue"],
  40, "5.4 Endocrinology & Diabetes",
  "Endocrine cases with known follow up to the service presenting with endocrine issue should be admitted to the Endocrine Division."
);

Q("endocr_dka_q", "Does the DKA patient have active medical issues?",
  "Active medical issues = concurrent infection, acute organ dysfunction, etc.",
  [
    { id:"dka1", label:"No — DKA without active medical issues", desc:"Isolated DKA in Type 1/LADA", next:"endocr_dka_endo_v" },
    { id:"dka2", label:"Yes — DKA with active medical issues", desc:"DKA plus other active medical conditions", next:"endocr_dka_med_v" }
  ]
);

V("endocr_dka_endo_v", "ENDOCRINOLOGY", "Admit to Endocrinology",
  "DKA in Type 1/LADA without active medical issues admitted under endocrinology.",
  ["Type 1 DM or LADA","DKA without active medical issues"],
  40, "5.4 Endocrinology & Diabetes",
  "Type 1 Diabetes mellitus or LADA presenting with Diabetic Ketoacidosis (DKA) without active medical issues should be admitted under endocrinology division."
);

V("endocr_dka_med_v", "MEDICINE", "Admit to Medicine",
  "DKA with active medical issues admitted under medicine with endocrine co-management.",
  ["Type 1 DM or LADA","DKA with active medical issues"],
  40, "5.4 Endocrinology & Diabetes",
  "Type 1 DM/LADA with DKA — otherwise patient would be admitted under medicine with co-management.",
  { consult: "Endocrinology co-management required." }
);

V("endocr_emerg_wd_v", "ENDOCRINOLOGY", "Admit to Endocrinology",
  "Endocrine emergencies on weekdays admitted under endocrinology.",
  ["Pituitary apoplexy","Pheochromocytoma crisis","Thyroid storm","Myxedema coma","Adrenal crisis","Hypocalcemia (parathyroid)","Hypercalcemia (parathyroid)"],
  40, "5.4.4 Endocrinology - Emergencies",
  "The following patients will be admitted under Endocrinology during weekdays: Pituitary apoplexy, Pheochromocytoma crisis, Thyroid storm, Myxedema coma, Adrenal crisis, Hypocalcemia/Hypercalcemia (secondary to parathyroid disease)."
);

V("endocr_emerg_we_v", "MEDICINE", "Admit to Medicine (until Endocrine review)",
  "Endocrine emergencies on weekends/holidays admitted under medicine until endocrine team reviews.",
  ["Endocrine emergency on weekend/holiday","Pituitary apoplexy, pheo crisis, thyroid storm, myxedema coma, adrenal crisis, hypo/hypercalcemia (parathyroid)"],
  40, "5.4.4 Endocrinology - Emergencies",
  "For weekends i.e patients admitted on Thursday, they are to be admitted under IM Dept. until next working day. For long holidays (e.g Eid), they are to be admitted under IM Dept., until the patient is seen by endocrinology during their holiday rounds, and is then transferred to the endocrinology team.",
  { conditional: "Admitted under Medicine until endocrine team reviews during holiday rounds. Transfer to endocrinology once seen.", consult: "Endocrinology will assume care once they review the patient." }
);

/* ============================================================
   14. HEMATOLOGY (Page 41)
   ============================================================ */
Q("heme_start", "What is the hematological presentation?",
  "Select the hematological condition",
  [
    { id:"he1", label:"Newly diagnosed hematological malignancy", desc:"New diagnosis of leukemia, lymphoma, or other hematological cancer", next:"heme_malig_v" },
    { id:"he2", label:"Known primary AIHA (following hematology OPD)", desc:"Autoimmune hemolytic anemia with hematology follow-up", next:"heme_aiha_v" },
    { id:"he3", label:"Hemophilia with bleeding", desc:"Hemophilia patient with bleeding symptoms related to disease", next:"heme_hemo_v" },
    { id:"he4", label:"Sickle cell disease", desc:"SCD patient with acute presentation (vaso-occlusive crisis, etc.)", next:"heme_scd_v" },
    { id:"he5", label:"Iron deficiency anemia (IDA)", desc:"IDA requiring evaluation", next:"heme_ida_v" },
    { id:"he6", label:"Other hematological condition", desc:"Thrombocytosis, thrombocytopenia, other cytopenias, etc.", next:"heme_other_v" }
  ]
);

V("heme_malig_v", "HEMATOLOGY", "Admit to Hematology",
  "Newly diagnosed hematological malignancy admitted under hematology.",
  ["Newly diagnosed hematological malignancy"],
  41, "5.5 Hematology",
  "Patients to be admitted under Hematology service: Newly diagnosed hematological malignancy."
);

V("heme_aiha_v", "HEMATOLOGY", "Admit to Hematology",
  "Known primary AIHA following hematology OPD admitted under hematology.",
  ["Known primary AIHA","Following hematology OPD"],
  41, "5.5 Hematology",
  "Patients to be admitted under Hematology service: Known primary AIHA, who are following up in hematology OPD."
);

V("heme_hemo_v", "HEMATOLOGY", "Admit to Hematology",
  "Hemophilia with disease-related bleeding admitted under hematology.",
  ["Hemophilia","Bleeding symptoms related to disease"],
  41, "5.5 Hematology",
  "Patients to be admitted under Hematology service: Hemophilia patients presenting with bleeding symptoms related to their disease."
);

V("heme_scd_v", "ON_CALL_UNIT", "Admit to On-Call Unit",
  "Sickle cell disease patients admitted to the on-call unit based on time of arrival to ER.",
  ["Sickle cell anemia","Admitted based on time of arrival to ER","Regardless of treating unit"],
  41, "5.5 Hematology - Sickle Cell",
  "Sickle cell anemia patients will be admitted to the on-call unit it presents with based on time of arrival to the ER regardless of treating unit. See ward sickle cell acute pain management protocol."
);

V("heme_ida_v", "MEDICINE", "Admit to Medicine",
  "Iron deficiency anemia should be seen by general internal medicine.",
  ["Iron deficiency anemia"],
  41, "5.5 Hematology - IDA",
  "Consults & OPD referrals regarding iron deficiency anemia (IDA) should be seen by general internal medicine. Hematology referral should be sent after following microcytic anemia protocol.",
  { consult: "Refer to hematology only after following microcytic anemia protocol (see appendix B)." }
);

V("heme_other_v", "MEDICINE", "Admit to Medicine",
  "Other hematological conditions: follow referral protocols before consulting hematology.",
  ["Thrombocytosis","Thrombocytopenia","Macrocytic/microcytic anemia","Neutropenia","Other cytopenias"],
  41, "5.5 Hematology",
  "Inpatient and OPD referral to hematology consults should be done after following the protocols in appendix B. These protocols identify urgent vs non-urgent referrals, however clinical judgement is necessary.",
  { consult: "Follow hematology referral protocols (appendix B) before consulting. Clinical judgement is necessary for urgent vs non-urgent referrals." }
);

/* ============================================================
   15. MEDICAL vs SURGICAL (Pages 44-45)
   ============================================================ */
Q("mvs_start", "What is the overlapping medical/surgical condition?",
  "Select the condition — based on MOH policy for conditions that overlap in specialty",
  [
    { id:"ms1", label:"DVT / Pulmonary embolism", desc:"Venous thromboembolism", next:"mvs_dvt_q" },
    { id:"ms2", label:"Upper GI bleeding", desc:"Hematemesis, melena from upper GI source", next:"mvs_ugib_v" },
    { id:"ms3", label:"Lower GI bleeding", desc:"Hematochezia from lower GI source", next:"mvs_lgib_v" },
    { id:"ms4", label:"Pancreatitis", desc:"Acute pancreatitis", next:"mvs_panc_q" },
    { id:"ms5", label:"Cellulitis", desc:"Skin/soft tissue infection", next:"mvs_cell_q" },
    { id:"ms6", label:"UTI / Pyelonephritis", desc:"Urinary tract infection", next:"mvs_uti_q" },
    { id:"ms7", label:"Diabetic foot / Bed sore", desc:"Diabetic foot ulcer or pressure injury", next:"mvs_dfoot_q" },
    { id:"ms8", label:"Osteomyelitis / Septic arthritis", desc:"Bone or joint infection", next:"mvs_osteo_q" },
    { id:"ms9", label:"Spontaneous pneumothorax", desc:"Non-traumatic pneumothorax", next:"mvs_ptx_v" },
    { id:"ms10", label:"Gross hematuria", desc:"Visible blood in urine", next:"mvs_hematuria_v" },
    { id:"ms11", label:"Pleural effusion", desc:"Classify based on cause", next:"mvs_pleural_v" },
    { id:"ms12", label:"Palliative cancer", desc:"End-stage cancer by type", next:"mvs_cancer_q" }
  ]
);

Q("mvs_dvt_q", "What is the context of the DVT/PE?",
  "Determine the etiology",
  [
    { id:"dvt1", label:"Spontaneous", desc:"No recent surgery or fracture", next:"mvs_dvt_spont_v" },
    { id:"dvt2", label:"Post-surgical (within 30 days)", desc:"Within 30 days of surgery", next:"mvs_dvt_surg_v" },
    { id:"dvt3", label:"Fracture/orthopedic associated (within 30 days)", desc:"Within 30 days of fracture or orthopedic procedure", next:"mvs_dvt_ortho_v" },
    { id:"dvt4", label:"Pregnant or 6 weeks postpartum", desc:"Pregnancy-related VTE", next:"mvs_dvt_preg_v" },
    { id:"dvt5", label:"Massive PE / Unstable", desc:"Hemodynamically unstable PE", next:"mvs_dvt_massive_v" }
  ]
);

V("mvs_dvt_spont_v", "MEDICINE", "Admit to Medicine",
  "Spontaneous DVT/PE admitted under medicine.",
  ["Spontaneous DVT or PE","No recent surgery or fracture"],
  44, "Medical vs Surgical - DVT/PE",
  "Deep Vein Thrombosis (DVT) / Pulmonary Embolism (PE): Spontaneous — Medicine."
);

V("mvs_dvt_surg_v", "SURGERY", "Admit to Surgery",
  "Post-surgical DVT/PE within 30 days admitted under surgery.",
  ["DVT/PE post-surgical","Within 30 days of surgery"],
  44, "Medical vs Surgical - DVT/PE",
  "DVT/PE: Post-Surgical within 30 days — Surgery."
);

V("mvs_dvt_ortho_v", "ORTHOPEDICS", "Admit to Orthopedics",
  "Fracture/orthopedic-associated DVT/PE within 30 days admitted under orthopedics.",
  ["DVT/PE fracture/orthopedic associated","Within 30 days"],
  44, "Medical vs Surgical - DVT/PE",
  "DVT/PE: Fracture/orthopedic Associated within 30 days — Orthopedics."
);

V("mvs_dvt_preg_v", "MEDICINE", "Refer to OBGYN",
  "Pregnancy-related DVT/PE managed by OBGYN.",
  ["DVT/PE in pregnancy","Within 6 weeks postpartum"],
  44, "Medical vs Surgical - DVT/PE",
  "DVT/PE: Pregnant or 6 weeks post-delivery — OBGYN."
);

V("mvs_dvt_massive_v", "CARDIOLOGY", "Admit to CCU/ICU",
  "Massive PE with hemodynamic instability managed in CCU/ICU.",
  ["Massive PE","Hemodynamically unstable"],
  44, "Medical vs Surgical - DVT/PE",
  "DVT/PE: Massive PE/unstable patient — cardio/medicine in CCU/ICU.",
  { consult: "Cardiology/Medicine co-management in CCU/ICU." }
);

V("mvs_ugib_v", "MEDICINE", "Admit to Medicine",
  "Upper GI bleeding admitted under medicine.",
  ["Upper GI bleeding","Hematemesis or melena"],
  44, "Medical vs Surgical - GI Bleeding",
  "Gastrointestinal Bleeding: Upper GI Bleed — Medicine. Unstable — in ICU."
);

V("mvs_lgib_v", "SURGERY", "Admit to Surgery",
  "Lower GI bleeding admitted under surgery.",
  ["Lower GI bleeding","Hematochezia"],
  44, "Medical vs Surgical - GI Bleeding",
  "Gastrointestinal Bleeding: Lower GI Bleed — Surgery. Unstable — in ICU."
);

Q("mvs_panc_q", "What type of pancreatitis?",
  "Determine severity and etiology",
  [
    { id:"panc1", label:"Non-obstructive (by imaging)", desc:"No biliary obstruction seen on imaging", next:"mvs_panc_med_v" },
    { id:"panc2", label:"Severe / Necrotizing / Obstructive / Post-biliary", desc:"APACHE II >8, necrotizing, obstructive, or post-biliary procedure", next:"mvs_panc_surg_v" }
  ]
);

V("mvs_panc_med_v", "MEDICINE", "Admit to Medicine",
  "Non-obstructive pancreatitis admitted under medicine.",
  ["Pancreatitis","Non-obstructive by imaging"],
  44, "Medical vs Surgical - Pancreatitis",
  "Pancreatitis: Medical — if non-obstructive by imaging."
);

V("mvs_panc_surg_v", "SURGERY", "Admit to Surgery",
  "Severe, necrotizing, or obstructive pancreatitis admitted under surgery.",
  ["Acute severe pancreatitis (APACHE II >8)","Necrotizing pancreatitis","Obstructive pancreatitis","Post-biliary procedure"],
  44, "Medical vs Surgical - Pancreatitis",
  "Pancreatitis: Surgery — if acute severe APACHE II >8, necrotizing, obstructive or post-biliary procedure."
);

Q("mvs_cell_q", "Is there an abscess proven by ultrasound?",
  "Determine if surgical intervention needed",
  [
    { id:"cell1", label:"No — Cellulitis without abscess", desc:"Uncomplicated cellulitis", next:"mvs_cell_med_v" },
    { id:"cell2", label:"Yes — Abscess proven by ultrasound", desc:"Complicated by abscess requiring drainage", next:"mvs_cell_surg_v" }
  ]
);

V("mvs_cell_med_v", "MEDICINE", "Admit to Medicine",
  "Uncomplicated cellulitis admitted under medicine.",
  ["Cellulitis","No abscess on ultrasound"],
  45, "Medical vs Surgical - Cellulitis",
  "Cellulitis: Medical unless complicated by abscess proven by Ultrasound — Surgery."
);

V("mvs_cell_surg_v", "SURGERY", "Admit to Surgery",
  "Cellulitis with abscess proven by ultrasound admitted under surgery.",
  ["Cellulitis complicated by abscess","Abscess proven by ultrasound"],
  45, "Medical vs Surgical - Cellulitis",
  "Cellulitis: Medical unless complicated by abscess proven by Ultrasound — Surgery."
);

Q("mvs_uti_q", "Does the UTI have any of the following features?",
  "Check for urological criteria",
  [
    { id:"uti1", label:"Obstructive cause requiring intervention", desc:"Obstruction needing urological intervention", next:"mvs_uti_uro_v" },
    { id:"uti2", label:"Male below 45 years", desc:"Young male UTI", next:"mvs_uti_uro_v" },
    { id:"uti3", label:"SPC needed or associated", desc:"Suprapubic catheter required", next:"mvs_uti_uro_v" },
    { id:"uti4", label:"Collection/emphysema on imaging", desc:"Abscess or emphysematous changes proven by imaging", next:"mvs_uti_uro_v" },
    { id:"uti5", label:"None of the above", desc:"Uncomplicated UTI/pyelonephritis", next:"mvs_uti_med_v" }
  ]
);

V("mvs_uti_uro_v", "UROLOGY", "Admit to Urology",
  "UTI with urological features admitted under urology.",
  ["Obstructive cause for intervention","Male below 45 years","SPC needed or associated","Collection/emphysema proven by imaging"],
  45, "Medical vs Surgical - UTI",
  "UTI/Pyelonephritis: Urology if proven to be: 1. Obstructive cause for intervention, 2. Male below 45yrs, 3. SPC needed or associated, 4. Collection/emphysema proven by imaging."
);

V("mvs_uti_med_v", "MEDICINE", "Admit to Medicine",
  "Uncomplicated UTI/pyelonephritis admitted under medicine.",
  ["UTI/Pyelonephritis","No urological features"],
  45, "Medical vs Surgical - UTI",
  "UTI/Pyelonephritis: Otherwise — Medicine."
);

Q("mvs_dfoot_q", "Does the patient have unstable comorbidities?",
  "Unstable = uncontrolled HTN, unstable IHD, etc.",
  [
    { id:"df1", label:"No — Stable comorbidities", desc:"Diabetic foot/bed sore without unstable medical issues", next:"mvs_dfoot_surg_v" },
    { id:"df2", label:"Yes — Unstable comorbidities", desc:"Unstable HTN, IHD, or other medical issues", next:"mvs_dfoot_med_v" }
  ]
);

V("mvs_dfoot_surg_v", "SURGERY", "Admit to Surgery",
  "Diabetic foot/bed sore without unstable comorbidities admitted under surgery.",
  ["Diabetic foot or bed sore","Stable comorbidities"],
  45, "Medical vs Surgical - Diabetic Foot",
  "Diabetic foot / Bed Sore — Surgery; unless case of unstable comorbidities (Ex: HTN, IHD, etc) — Medicine."
);

V("mvs_dfoot_med_v", "MEDICINE", "Admit to Medicine",
  "Diabetic foot/bed sore with unstable comorbidities admitted under medicine.",
  ["Diabetic foot or bed sore","Unstable comorbidities (HTN, IHD, etc.)"],
  45, "Medical vs Surgical - Diabetic Foot",
  "Diabetic foot / Bed Sore — Surgery; unless case of unstable comorbidities (Ex: HTN, IHD, etc) — Medicine."
);

Q("mvs_osteo_q", "Does the patient need surgical intervention?",
  "IV antibiotics only vs surgical debridement/drainage",
  [
    { id:"ost1", label:"IV antibiotics only", desc:"Medical management without surgery", next:"mvs_osteo_med_v" },
    { id:"ost2", label:"Surgical intervention needed", desc:"Debridement, drainage, or other surgical procedure", next:"mvs_osteo_surg_v" }
  ]
);

V("mvs_osteo_med_v", "MEDICINE", "Admit to Medicine",
  "Osteomyelitis/septic arthritis requiring IV antibiotics only admitted under medicine.",
  ["Osteomyelitis or septic arthritis","IV antibiotics only","No surgical intervention needed"],
  45, "Medical vs Surgical - Osteomyelitis",
  "Osteomyelitis/Septic arthritis: IV Abx only — Medicine; Need Surgical Intervention — Orthopedics."
);

V("mvs_osteo_surg_v", "ORTHOPEDICS", "Admit to Orthopedics",
  "Osteomyelitis/septic arthritis needing surgical intervention admitted under orthopedics.",
  ["Osteomyelitis or septic arthritis","Surgical intervention required"],
  45, "Medical vs Surgical - Osteomyelitis",
  "Osteomyelitis/Septic arthritis: IV Abx only — Medicine; Need Surgical Intervention — Orthopedics."
);

V("mvs_ptx_v", "SURGERY", "Admit to Surgery",
  "Spontaneous pneumothorax admitted under surgery.",
  ["Spontaneous pneumothorax"],
  45, "Medical vs Surgical - Pneumothorax",
  "Spontaneous Pneumothorax — Surgery."
);

V("mvs_hematuria_v", "UROLOGY", "Admit to Urology",
  "Gross hematuria without active medical issues admitted under urology.",
  ["Gross hematuria","No active medical issues"],
  45, "Medical vs Surgical - Hematuria",
  "Gross hematuria — Urology, if no active medical issues."
);

V("mvs_pleural_v", "MEDICINE", "Admit to Medicine",
  "Pleural effusion is generally admitted under medicine.",
  ["Pleural effusion"],
  44, "Medical vs Surgical - Pleural Effusion",
  "Pleural Effusion — Medicine. If secondary to palliative cancers: Medicine with consultation to interventional radiology/surgical for drainage. If post thoracic surgery (From CDH by thoracic surgeons): Surgical with thoracic surgery consultation.",
  { consult: "For palliative cancer effusions: consult interventional radiology/surgical for drainage. Post thoracic surgery: Surgical with thoracic surgery consultation." }
);

Q("mvs_cancer_q", "What type of palliative cancer?",
  "Determine primary site",
  [
    { id:"pc1", label:"Lymphoma / Leukemia / Liver", desc:"Hematological malignancy or liver cancer", next:"mvs_cancer_med_v" },
    { id:"pc2", label:"GI / Biliary / Breast", desc:"Gastrointestinal, biliary, or breast cancer", next:"mvs_cancer_surg_v" },
    { id:"pc3", label:"Urogenital", desc:"Urological or genital cancer", next:"mvs_cancer_uro_v" }
  ]
);

V("mvs_cancer_med_v", "MEDICINE", "Admit to Medicine",
  "Palliative lymphoma, leukemia, or liver cancer admitted under medicine.",
  ["Palliative cancer","Lymphoma, leukemia, or liver"],
  44, "Medical vs Surgical - Palliative Cancer",
  "Palliative Cancer: Lymphoma/Leukemia/Liver — Medicine."
);

V("mvs_cancer_surg_v", "SURGERY", "Admit to Surgery",
  "Palliative GI, biliary, or breast cancer admitted under surgery.",
  ["Palliative cancer","GI, biliary, or breast"],
  44, "Medical vs Surgical - Palliative Cancer",
  "Palliative Cancer: GI/biliary/Breast — Surgery."
);

V("mvs_cancer_uro_v", "UROLOGY", "Admit to Urology",
  "Palliative urogenital cancer admitted under urology.",
  ["Palliative cancer","Urogenital"],
  44, "Medical vs Surgical - Palliative Cancer",
  "Palliative Cancer: Urogenital — Urology."
);

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */

function getNode(id) { return NODES[id] || null; }

function getCategory(id) {
  return CATEGORIES.find(function(c) { return c.id === id; }) || null;
}

function getCategoryForNode(nodeId) {
  for (var i = 0; i < CATEGORIES.length; i++) {
    var cat = CATEGORIES[i];
    if (nodeId.indexOf(cat.entry.split('_')[0]) === 0) return cat;
  }
  return null;
}

function getDepartment(deptKey) {
  return DEPARTMENTS[deptKey] || { color: "#94a3b8", bg: "rgba(148,163,184,0.15)", label: deptKey };
}

var SESSION_KEY = 'mkh_triage_sessions';

function saveTriage(session) {
  try {
    var existing = JSON.parse(localStorage.getItem(SESSION_KEY) || '[]');
    existing.unshift(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(existing.slice(0, 30)));
  } catch(e) {}
}

function getTriageHistory() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || '[]');
  } catch(e) { return []; }
}

function formatTriageTime(ts) {
  var d = new Date(ts);
  var h = d.getHours(), m = d.getMinutes();
  var ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
}

function formatTriageDate(ts) {
  var d = new Date(ts);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}
