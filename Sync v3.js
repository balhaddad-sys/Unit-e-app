/************ CONFIG ************/
var SPREADSHEET_ID = "1I2Cmm2YPUuJw4o4cOgl-iFmqTmfy6S9btFZ-5AIMxh4";
var SHEET_NAME     = "Unit e";

var FIREBASE_DB   = "https://unit-e-1d07b-default-rtdb.europe-west1.firebasedatabase.app";
var FIREBASE_NODE = "patients";

var SYNC_INTERVAL_MINUTES = 1;

// Column layout: A=Bed, B=Name, C=Diagnosis, D=Doctor, E=Status, F=Plan, G=Timestamp, H=FirebaseID
var COL_BED = 1;
var COL_NAME = 2;
var COL_DIAG = 3;
var COL_DOC = 4;
var COL_STATUS = 5;
var COL_PLAN = 6;
var COL_TS = 7;
var COL_FBID = 8;
var COLS_VISIBLE = 6;
/********************************/

/************ HELPERS ************/
function getSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) throw new Error("Sheet not found: " + SHEET_NAME);
  return sh;
}

function firebaseUrl_() {
  return FIREBASE_DB + "/" + FIREBASE_NODE + ".json";
}

function safeJson_(text) {
  try { return JSON.parse(text); } catch (e) { return null; }
}

function normalizeStatus_(s) {
  s = String(s || "").trim();
  if (!s) return "";
  var low = s.toLowerCase();
  if (low.includes("chronic") && !low.includes("non")) return "Chronic";
  if (low.includes("non")) return "Non-Chronic";
  if (low.includes("new")) return "New";
  return s;
}

function wardOrderIndex_(w) {
  var order = ["Ward 19","Ward 20","Ward 21","Ward 22","Ward 27","Ward 5","Ward 10","ICU","ER","Unassigned"];
  var idx = order.indexOf(w);
  return idx === -1 ? 999 : idx;
}

function isWardHeader_(a, b) {
  a = String(a || "").trim();
  b = String(b || "").trim();
  if (!a) return false;
  var isWard = (a.toLowerCase().startsWith("ward") || ["ICU","ER","Unassigned"].includes(a));
  return isWard && b === "";
}

// Clean bed value - remove any timestamps or invalid data
function cleanBed_(val) {
  var s = String(val || "").trim();
  // If it looks like a date/timestamp, return empty
  if (s.match(/^\d{4}-\d{2}-\d{2}/) || 
      s.match(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s/i) ||
      s.match(/^\d{13,}$/) ||
      s.match(/T\d{2}:\d{2}/) ||
      s.match(/\d{4}\s\d{2}:\d{2}:\d{2}/)) {
    return "";
  }
  return s;
}

// Create unique key for deduplication (ward + name)
function makeDedupeKey_(ward, name) {
  return String(ward || "").toLowerCase().trim() + "|" + String(name || "").toLowerCase().trim();
}
/********************************/

/************ FORMATTING ************/
function applyHeaderStyle_(r) {
  r.setFontWeight("bold").setBackground("#15803d").setFontColor("#ffffff");
}

function applyTitleStyle_(c, bg) {
  c.setFontWeight("bold").setFontSize(13).setBackground(bg).setFontColor("#0f172a");
}

function formatWardHeaderRow_(r, w) {
  var colors = {
    "Ward 19": "#1e40af", "Ward 20": "#1e40af", "Ward 21": "#1e40af",
    "Ward 22": "#1e40af", "Ward 27": "#1e40af", "Ward 5": "#1e40af",
    "Ward 10": "#1e40af", "ICU": "#111827", "ER": "#6b7280", "Unassigned": "#6b7280"
  };
  r.setFontWeight("bold").setFontColor("#ffffff").setBackground(colors[w] || "#1e40af");
}

function setSheetLayout_(sh, lastRow) {
  sh.setColumnWidths(1, COLS_VISIBLE, 160);
  if (lastRow >= 1) sh.getRange(1, 1, lastRow, COLS_VISIBLE).setBorder(true, true, true, true, true, true);
  if (sh.getMaxColumns() >= COL_TS) sh.hideColumn(sh.getRange(1, COL_TS));
  if (sh.getMaxColumns() >= COL_FBID) sh.hideColumn(sh.getRange(1, COL_FBID));
}
/********************************/

/************ WRITE BLOCK ************/
function writeBlock_(sh, startRow, title, bg, patients) {
  var headers = ["Room / Ward", "Patient name", "Diagnosis", "Assigned Doctor", "Status", "Notes", "ts", "fbid"];
  sh.getRange(startRow, 1).setValue(title);
  applyTitleStyle_(sh.getRange(startRow, 1), bg);
  sh.getRange(startRow + 1, 1, 1, headers.length).setValues([headers]);
  applyHeaderStyle_(sh.getRange(startRow + 1, 1, 1, headers.length));

  patients.sort(function(a, b) {
    var aw = wardOrderIndex_(a.ward), bw = wardOrderIndex_(b.ward);
    if (aw !== bw) return aw - bw;
    return String(a.bed || "").localeCompare(String(b.bed || ""));
  });

  var out = [], cw = null;
  patients.forEach(function(p) {
    var w = p.ward || "Unassigned";
    if (w !== cw) { 
      cw = w; 
      out.push([w, "", "", "", "", "", "", ""]); 
    }
    out.push([
      cleanBed_(p.bed),  // Clean the bed value
      p.name || "", 
      p.diagnosis || "", 
      p.doctor || "", 
      normalizeStatus_(p.status), 
      p.plan || "", 
      Number(p.timestamp || 0),
      p.id || ""
    ]);
  });

  if (out.length) {
    sh.getRange(startRow + 2, 1, out.length, headers.length).setValues(out);
    out.forEach(function(r, i) {
      if (isWardHeader_(r[0], r[1])) {
        formatWardHeaderRow_(sh.getRange(startRow + 2 + i, 1, 1, headers.length), r[0]);
      }
    });
  }
  return { endRow: startRow + out.length + 2 };
}
/********************************/

/************ READ SHEET AS MAP ************/
function readSheetAsMap_() {
  var sh = getSheet_(), lr = sh.getLastRow();
  if (lr < 2) return {};
  var vals = sh.getRange(1, 1, lr, COL_FBID).getValues();
  var map = {}, cw = "Unassigned";
  
  vals.forEach(function(r) {
    var bed = r[0], name = r[1], diag = r[2], doc = r[3], status = r[4], plan = r[5], ts = r[6], fbid = r[7];
    
    if (!bed && !name && !diag && !doc && !status && !plan) return;
    if (String(bed).toLowerCase().includes("male list")) return;
    if (bed === "Room / Ward" && name === "Patient name") return;
    if (isWardHeader_(bed, name)) { cw = bed; return; }
    if (!name) return;
    
    var id = String(fbid || "").trim();
    if (!id) {
      id = "sheet_" + Utilities.getUuid().slice(0, 8);
    }
    
    map[id] = {
      id: id,
      ward: cw,
      bed: cleanBed_(bed),  // Clean bed value
      name: String(name || ""),
      diagnosis: String(diag || ""),
      doctor: String(doc || ""),
      status: normalizeStatus_(status),
      plan: String(plan || ""),
      timestamp: Number(ts || 0)
    };
  });
  return map;
}
/********************************/

/************ DEDUPLICATE ************/
function deduplicatePatients_(data) {
  var byKey = {};
  
  Object.keys(data).forEach(function(id) {
    var p = data[id];
    var key = makeDedupeKey_(p.ward, p.name);
    
    if (!byKey[key]) {
      byKey[key] = { id: id, patient: p };
    } else {
      // Keep the one with the latest timestamp
      var existing = byKey[key];
      var existingTs = Number(existing.patient.timestamp || 0);
      var newTs = Number(p.timestamp || 0);
      
      if (newTs > existingTs) {
        // New one is newer - keep it, mark old for deletion
        byKey[key] = { id: id, patient: p, deleteId: existing.id };
      } else {
        // Existing is newer - mark new one for deletion
        byKey[key].deleteId = byKey[key].deleteId || [];
        if (Array.isArray(byKey[key].deleteId)) {
          byKey[key].deleteId.push(id);
        } else {
          byKey[key].deleteId = [byKey[key].deleteId, id];
        }
      }
    }
  });
  
  var result = {};
  var toDelete = [];
  
  Object.keys(byKey).forEach(function(key) {
    var entry = byKey[key];
    result[entry.id] = entry.patient;
    
    if (entry.deleteId) {
      if (Array.isArray(entry.deleteId)) {
        toDelete = toDelete.concat(entry.deleteId);
      } else {
        toDelete.push(entry.deleteId);
      }
    }
  });
  
  return { cleaned: result, toDelete: toDelete };
}
/********************************/

/************ CLEAN FIREBASE DATA ************/
function cleanFirebaseData_(fbData) {
  var cleaned = {};
  
  Object.keys(fbData).forEach(function(id) {
    var p = fbData[id];
    cleaned[id] = {
      ward: String(p.ward || "Unassigned"),
      bed: cleanBed_(p.bed),  // Clean bed
      name: String(p.name || ""),
      diagnosis: String(p.diagnosis || ""),
      doctor: String(p.doctor || ""),
      status: normalizeStatus_(p.status),
      plan: String(p.plan || ""),
      mrn: String(p.mrn || ""),
      timestamp: Number(p.timestamp || Date.now())
    };
  });
  
  return cleaned;
}
/********************************/

/************ SMART SYNC ************/
function smartSync() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return;
  
  try {
    // Read from Firebase
    var res = UrlFetchApp.fetch(firebaseUrl_(), { muteHttpExceptions: true });
    if (res.getResponseCode() >= 400) throw new Error("Firebase error: " + res.getResponseCode());
    var fbRaw = safeJson_(res.getContentText()) || {};
    
    // Clean Firebase data
    var fbCleaned = cleanFirebaseData_(fbRaw);
    
    // Deduplicate
    var deduped = deduplicatePatients_(fbCleaned);
    var data = deduped.cleaned;
    var toDelete = deduped.toDelete;
    
    // Delete duplicates from Firebase
    if (toDelete.length > 0) {
      toDelete.forEach(function(id) {
        try {
          UrlFetchApp.fetch(FIREBASE_DB + "/" + FIREBASE_NODE + "/" + id + ".json", {
            method: "delete",
            muteHttpExceptions: true
          });
        } catch (e) {
          console.log("Failed to delete " + id);
        }
      });
      console.log("Deleted " + toDelete.length + " duplicates from Firebase");
    }
    
    // Update Firebase with cleaned data
    UrlFetchApp.fetch(firebaseUrl_(), {
      method: "put",
      contentType: "application/json",
      payload: JSON.stringify(data)
    });
    
    // Rebuild sheet
    rebuildSheet_(data);
    
    console.log("Sync complete. " + Object.keys(data).length + " patients.");
    
  } catch (e) {
    console.error("Sync Error: " + e.message);
  } finally {
    lock.releaseLock();
  }
}

function rebuildSheet_(data) {
  var all = [];
  Object.keys(data).forEach(function(id) {
    var p = data[id];
    p.id = id;
    all.push(p);
  });
  
  var act = all.filter(function(p) { return normalizeStatus_(p.status) !== "Chronic"; });
  var chr = all.filter(function(p) { return normalizeStatus_(p.status) === "Chronic"; });
  
  var sh = getSheet_();
  sh.clearContents();
  sh.clearFormats();
  
  if (sh.getMaxColumns() < COL_FBID) {
    sh.insertColumnsAfter(sh.getMaxColumns(), COL_FBID - sh.getMaxColumns());
  }
  
  var b1 = writeBlock_(sh, 1, "Male list (active)", "#bbf7d0", act);
  writeBlock_(sh, b1.endRow + 2, "Male list (chronic)", "#fed7aa", chr);
  setSheetLayout_(sh, sh.getLastRow());
}
/********************************/

/************ MANUAL CLEANUP ************/
function cleanupNow() {
  smartSync();
  SpreadsheetApp.getActiveSpreadsheet().toast("Cleanup complete!", "✓ Done", 3);
}
/********************************/

/************ WEB APP ENDPOINT ************/
function doGet(e) {
  smartSync();
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  smartSync();
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}
/********************************/

/************ AUTOMATION ************/
function handleEdit(e) {
  if (!e || !e.range) return;
  var sh = e.range.getSheet();
  if (sh.getName() !== SHEET_NAME) return;
  var row = e.range.getRow();
  if (row < 3) return;
  
  sh.getRange(row, COL_TS).setValue(Date.now());
  smartSync();
}

function setupTriggers() {
  ScriptApp.getProjectTriggers().forEach(function(t) { ScriptApp.deleteTrigger(t); });
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  ScriptApp.newTrigger("handleEdit")
    .forSpreadsheet(ss)
    .onChange()
    .create();
    
  ScriptApp.newTrigger("smartSync")
    .timeBased()
    .everyMinutes(SYNC_INTERVAL_MINUTES)
    .create();
    
  SpreadsheetApp.getActiveSpreadsheet().toast("Auto-sync enabled!", "✓ Done", 3);
}
/********************************/

/************ UI ************/
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🔄 Sync")
    .addItem("Sync Now", "smartSync")
    .addItem("Cleanup Duplicates", "cleanupNow")
    .addItem("Setup Auto-Sync", "setupTriggers")
    .addToUi();
}
