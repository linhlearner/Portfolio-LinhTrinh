'use strict';

const stages = [
  {
    title: 'Foundations', status: '2023–2024',
    narrative: 'Intro micro and macro, calculus, programming, and research writing.',
    courses: [['Economics', 'Introductory microeconomics and macroeconomics'], ['MATH 141', 'Calculus 2'], ['COMP 202', 'Foundations of Programming'], ['WCOM 255', 'Research Essay & Rhetoric'], ['Critical inquiry', 'Philosophy and international development']],
    note: ''
  },
  {
    title: 'Honours core', status: 'Completed · 2024–2026',
    narrative: 'Honours macroeconomics and monetary economics, financial institutions, statistics, and communication theory.',
    courses: [['ECON 353 / 354', 'Macroeconomics: Honours 1 & 2'], ['ECON 459', 'Topics in Monetary Economics: Honours'], ['ECON 304', 'Financial Instruments & Institutions'], ['ECON 257D1/D2', 'Economic Statistics: Honours'], ['ECON 473 / 347', 'Income Distribution / Economics of Climate Change'], ['COMS 230 / 301', 'Communication and Democracy / Critical Theory']],
    note: 'Also completed: ECON 460; COMS 210 and 491; ENGL 378.'
  },
  {
    title: 'Final year', status: 'In progress · 2026–2027',
    narrative: 'Econometrics and advanced theory, plus the core finance sequence: accounting, corporate finance, investments, capital markets and derivatives.',
    courses: [['ECON 450 / 468', 'Advanced Economic Theory 1 / Econometrics 1: Honours'], ['MGCR 211', 'Introduction to Financial Accounting'], ['MGCR 341', 'Introduction to Finance'], ['FINE 342 / 441', 'Corporate Finance / Investment Management'], ['FINE 442 / 448', 'Capital Markets & Institutions / Financial Derivatives']],
    note: ''
  }
];


const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.navlinks');
function closeMenu() {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.textContent = 'Menu +';
  navLinks.classList.remove('open');
}
navToggle?.addEventListener('click', () => {
  const opening = navToggle.getAttribute('aria-expanded') !== 'true';
  navToggle.setAttribute('aria-expanded', String(opening));
  navToggle.textContent = opening ? 'Close −' : 'Menu +';
  navLinks.classList.toggle('open', opening);
});
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); navToggle.focus(); } });


const stageTabs = Array.from(document.querySelectorAll('[data-stage]'));
function showStage(index) {
  const s = stages[index];
  stageTabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  const panel = document.querySelector('#stage-panel');
  panel.setAttribute('aria-labelledby', `stage-${index}`);
  panel.innerHTML = `<div><span class="status">${s.status}</span><h3>${s.title}</h3><p>${s.narrative}</p>${s.note ? `<p style="font-size:14px;margin-top:17px">${s.note}</p>` : ''}</div><ul class="course-list">${s.courses.map(c => `<li><span class="course-code">${c[0]}</span><span>${c[1]}</span></li>`).join('')}</ul>`;
}
stageTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showStage(index));
  tab.addEventListener('keydown', e => {
    let next;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % stageTabs.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index + stageTabs.length - 1) % stageTabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = stageTabs.length - 1;
    if (next !== undefined) { e.preventDefault(); showStage(next); stageTabs[next].focus(); }
  });
});
if (stageTabs.length) showStage(1);


const betaSpecs = [
  {value:21.3, label:'Baseline BAB', context:'Baseline: all eligible stocks. Historical backtest; costs excluded.'},
  {value:17.6, label:'Liquidity-screened BAB', context:'Excludes stocks with more than 20% no-trade days. Historical backtest; costs excluded.'},
  {value:11.9, label:'Sector-neutral BAB', context:'Low versus high beta within each GICS sector. Historical backtest; costs excluded.'}
];
document.querySelectorAll('[data-beta]').forEach(button => button.addEventListener('click', () => {
  const s = betaSpecs[Number(button.dataset.beta)];
  document.querySelectorAll('[data-beta]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelector('#beta-bar').setAttribute('width', String(s.value * 22));
  document.querySelector('#beta-value').textContent = `${s.value}%`;
  document.querySelector('#beta-chart-title').textContent = `${s.label} annual CAPM alpha: ${s.value} percent`;
  document.querySelector('#beta-context').textContent = s.context;
}));
