// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});

// Toggle mobile menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});

// Toggle mobile menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});


function toggleForms() {
  const login = document.getElementById("loginForm");
  const signup = document.getElementById("signupForm");
  if (login.style.display === "block") {
    login.style.display = "none";
    signup.style.display = "block";
  } else {
    login.style.display = "block";
    signup.style.display = "none";
  }
}


// cyphersbank dashboard
const STORAGE_KEY = 'cyphers_demo_v1';
const defaultState = {
  user: {name:'Phuti Gift', account:'1234 5678', balance:2500.00, pin:'1234'},
  transactions: []
};

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return JSON.parse(JSON.stringify(defaultState));
    const parsed = JSON.parse(raw) || JSON.parse(JSON.stringify(defaultState));
    parsed.user = parsed.user || JSON.parse(JSON.stringify(defaultState.user));
    parsed.transactions = Array.isArray(parsed.transactions) ? parsed.transactions : [];
    return parsed;
  }catch(e){
    console.error('Failed to load state, using default', e);
    return JSON.parse(JSON.stringify(defaultState));
  }
}

function saveState(s){localStorage.setItem(STORAGE_KEY, JSON.stringify(s));}
let state = loadState();

// ===== UI helpers =====
const views = Array.from(document.querySelectorAll('[data-view-name]'));
function showView(name){
  views.forEach(v=> v.classList.toggle('hidden', v.getAttribute('data-view-name')!==name));
  document.querySelectorAll('.menu button').forEach(b=> b.classList.toggle('active', b.dataset.view===name));
}

function render(){
  document.getElementById('userName').textContent = state.user.name;
  document.getElementById('userAcc').textContent = 'Acct • ' + state.user.account;
  document.getElementById('balance').textContent = formatMoney(state.user.balance);
  renderTxList();
  renderHistory();
}

function formatMoney(n){
  return 'R ' + Number(n).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
}

function renderTxList(){
  const el = document.getElementById('txList');
  el.innerHTML = '';
  const recent = state.transactions.slice().reverse().slice(0,5);
  if(recent.length===0){el.innerHTML='<div class="muted">No recent transactions</div>';return}
  recent.forEach(tx=>{
    const d = document.createElement('div');d.className='tx';
    d.innerHTML = `<div><strong>${escapeHtml(tx.to)}</strong><div class="muted">${escapeHtml(tx.type)} • ${new Date(tx.date).toLocaleString()}</div></div><div><strong>${tx.amount < 0 ? '-' : ''}${formatMoney(Math.abs(tx.amount))}</strong></div>`;
    el.appendChild(d);
  })
}

function renderHistory(){
  const el = document.getElementById('historyList');
  el.innerHTML = '';
  if(state.transactions.length===0){el.innerHTML='<div class="muted">No transactions</div>';return}
  state.transactions.slice().reverse().forEach(tx=>{
    const d = document.createElement('div');d.className='tx';
    d.innerHTML = `<div><strong>${escapeHtml(tx.to)}</strong><div class="muted">${escapeHtml(tx.type)} • ${new Date(tx.date).toLocaleString()}</div></div><div><strong>${tx.amount < 0 ? '-' : ''}${formatMoney(Math.abs(tx.amount))}</strong></div>`;
    el.appendChild(d);
  })
}

function escapeHtml(str){
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ===== Send flow & PIN modal =====
let pendingTx = null;
const pinModal = document.getElementById('pinModal');
const pinCells = Array.from(document.querySelectorAll('.pinCell'));
const pinError = document.getElementById('pinError');
const confirmBtn = document.getElementById('confirmPin');
const cancelBtn = document.getElementById('cancelPin');

confirmBtn.disabled = true;

function openPinModal(tx){
  if(!tx || typeof tx.amount !== 'number'){
    console.error('openPinModal called with invalid transaction', tx);
    pinError.textContent = 'Invalid transaction. Please try again.';
    pinError.style.display = 'block';
    return;
  }

  pendingTx = tx;
  pinCells.forEach(i=>{i.value='';i.disabled=false});
  pinError.style.display='none';
  confirmBtn.disabled = true;
  pinModal.style.display='flex';
  setTimeout(()=> pinCells[0].focus(), 80);
}

function closePinModal(){
  pinModal.style.display='none';
  pinCells.forEach(i=>{i.value='';i.disabled=true});
  confirmBtn.disabled = true;
  pendingTx = null;
  pinError.style.display = 'none';
}

function getPinFromModal(){
  return pinCells.map(i=>i.value||'').join('');
}

function updateConfirmState(){
  const entered = getPinFromModal();
  confirmBtn.disabled = entered.length < 4;
  if(entered.length === 4) pinError.style.display = 'none';
}

const sendForm = document.getElementById('sendForm');
sendForm.addEventListener('submit', e=>{
  e.preventDefault();
  const to = document.getElementById('recipient').value.trim();
  const acc = document.getElementById('accNumber').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  if(!to || !acc || !amount || amount<=0){alert('Please fill valid details');return}
  if(amount > state.user.balance){alert('Insufficient balance');return}

  const tx = {to: to + ' • ' + acc, amount: -Math.abs(amount), type};
  openPinModal(tx);
});

document.getElementById('quickSend').addEventListener('click', ()=>{
  const btn = document.querySelector('.menu button[data-view="send"]');
  if(btn) btn.click();
});

pinCells.forEach((cell,i)=>{
  cell.addEventListener('input', (ev)=>{
    cell.value = cell.value.replace(/[^0-9]/g, '').slice(0,1);
    if(cell.value.length===1 && i<pinCells.length-1) pinCells[i+1].focus();
    updateConfirmState();
  });
  cell.addEventListener('keydown', (ev)=>{
    if(ev.key==='Backspace' && !cell.value && i>0){
      pinCells[i-1].focus();
    }
    if(ev.key==='Enter'){ if(i===pinCells.length-1 && !confirmBtn.disabled) confirmBtn.click(); }
  });
  cell.addEventListener('paste', (ev)=>{
    ev.preventDefault();
    const paste = (ev.clipboardData || window.clipboardData).getData('text') || '';
    const digits = paste.replace(/\D/g, '').slice(0,4);
    if(digits.length>0){
      for(let k=0;k<4;k++){ pinCells[k].value = digits[k] || ''; }
      updateConfirmState();
    }
  });
});

confirmBtn.addEventListener('click', ()=>{
  const entered = getPinFromModal();
  if(entered.length<4){ pinError.textContent='Enter 4 digits'; pinError.style.display='block'; return }
  if(!pendingTx){ pinError.textContent='No pending transaction. Please try again.'; pinError.style.display='block'; return }
  if(entered !== state.user.pin){ pinError.textContent='Incorrect PIN'; pinError.style.display='block'; return }

  const tx = Object.assign({}, pendingTx);
  try{
    state.user.balance = Number((state.user.balance + tx.amount).toFixed(2));
    state.transactions.push({to:tx.to, amount:tx.amount, type:tx.type, date: Date.now()});
    saveState(state);
    render();
    closePinModal();
    alert('Payment successful');
  }catch(err){
    console.error('Failed to commit transaction', err);
    pinError.textContent = 'Failed to complete transaction. See console.';
    pinError.style.display = 'block';
  }
});

cancelBtn.addEventListener('click', ()=> closePinModal());
pinModal.addEventListener('click', (ev)=>{ if(ev.target === pinModal)});



