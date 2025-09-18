const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { init } = require('../../electron_shared/db');
const db = init();
const creator = require('../../electron_shared/creator/creator_comm');
const cfg = require('../../config/default.json');
function trialExpired(){ const row = db.prepare("SELECT value FROM meta WHERE key='install_ts'").get(); if(!row) return false; const installTs = new Date(row.value); const diff = Math.floor((Date.now()-installTs)/(1000*60*60*24)); return diff > (cfg.trial_days||70); }
function createWindow(){ const win = new BrowserWindow({ width:1100, height:800, webPreferences:{ preload: path.join(__dirname,'preload.js'), contextIsolation:true } }); const accepted = db.prepare('SELECT * FROM acceptance LIMIT 1').get(); if(!accepted){ win.loadFile(path.join(__dirname,'..','app','legal.html')); } else { if(trialExpired()){ dialog.showErrorBox('Trial expired','La prueba de 70 días ha finalizado. Contacte al creador.'); app.quit(); return; } win.loadFile(path.join(__dirname,'..','app','index.html')); } }
app.whenReady().then(createWindow);
ipcMain.handle('activation:submit', async (_, payload) => { const registration = { installation_id: 'INST-'+Date.now(), email: payload.email, institution: payload.institution, accepted: payload.acceptTerms?1:0, ts: new Date().toISOString() }; db.prepare('INSERT INTO acceptance (installation_id,email,institution,accepted,ts) VALUES (@installation_id,@email,@institution,@accepted,@ts)').run(registration); if(payload.acceptTerms){ try{ await creator.notifyInstall(registration); }catch(e){ console.error('notify failed', e.message); } } return { ok:true }; });
ipcMain.handle('books:list', () => db.prepare('SELECT * FROM books ORDER BY title').all());
ipcMain.handle('users:list', () => db.prepare('SELECT * FROM users ORDER BY last_name').all());
ipcMain.handle('loan:create', (_, {user_id, book_id, days}) => { const due = new Date(Date.now() + (days||14)*24*60*60*1000).toISOString(); const res = db.prepare('INSERT INTO loans (user_id,book_id,loan_date,due_date,status) VALUES (?,?,?,?,"vigente")').run(user_id, book_id, new Date().toISOString(), due); return { ok:true, id: res.lastInsertRowid }; });
ipcMain.handle('loan:return', (_, id) => { db.prepare('UPDATE loans SET return_date = datetime("now"), status = "devuelto" WHERE id = ?').run(id); return { ok:true }; });
