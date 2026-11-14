'use strict';

const stages = [
  {
    title: 'Building the foundations', status: 'Foundational study · 2023–2024',
    narrative: 'Building a foundation in economic reasoning, quantitative methods, programming, and critical inquiry.',
    courses: [['Economics', 'Introductory microeconomics and macroeconomics'], ['MATH 141', 'Calculus 2'], ['COMP 202', 'Foundations of Programming'], ['WCOM 255', 'Research Essay & Rhetoric'], ['Critical inquiry', 'Philosophy and international development']],
    note: 'Foundational subjects follow the supplied academic brief; exact terms are not specified for every course.'
  },
  {
    title: 'Exploring specializations', status: 'Selected completed coursework · 2024–2026',
    narrative: 'Developing a deeper understanding of economic systems, financial institutions, and the role of communication in shaping how information is interpreted.',
    courses: [['ECON 353 / 354', 'Macroeconomics: Honours 1 & 2'], ['ECON 459', 'Topics in Monetary Economics: Honours'], ['ECON 304', 'Financial Instruments & Institutions'], ['ECON 257D1/D2', 'Economic Statistics: Honours'], ['ECON 473 / 347', 'Income Distribution / Economics of Climate Change'], ['COMS 230 / 301', 'Communication and Democracy / Critical Theory']],
    note: 'Also completed: ECON 460; COMS 210 and 491; ENGL 378. Stages describe intellectual development rather than exact course-by-course terms.'
  },
  {
    title: 'Integrating economics, finance & communication', status: 'Listed for 2026–2027 · No final grades supplied',
    narrative: 'Bringing together economic research, quantitative methods, and financial decision-making. These courses describe my academic direction, with completion status kept separate.',
    courses: [['ECON 450 / 468', 'Advanced Economic Theory 1 / Econometrics 1: Honours'], ['MGCR 211', 'Introduction to Financial Accounting'], ['MGCR 341', 'Introduction to Finance'], ['FINE 342 / 441', 'Corporate Finance / Investment Management'], ['FINE 442 / 448', 'Capital Markets & Institutions / Financial Derivatives']],
    note: 'These courses are listed in the supplied academic record for 2026–2027. They are not presented as completed expertise.'
  }
];

const disciplines = {
  economics: {
    title: 'Economics, with the context left in.',
    foundation: 'Macroeconomic theory, monetary economics, institutions, and the history of economic thought help frame the questions I ask.',
    connection: 'With finance: how macroeconomic conditions interact with markets and investment decisions. With communication: how institutions, media, and public narratives shape the interpretation of economic issues.',
    coursework: 'Completed: ECON 353, 354, 459, 460, 473, and 347.',
    relevance: 'Intersection: placing a financial result within the economic system that produced it.'
  },
  finance: {
    title: 'Finance, beyond the price on the screen.',
    foundation: 'Financial instruments and institutions provide a foundation for studying how capital moves and how financial decisions are made.',
    connection: 'With economics: connecting market outcomes to broader conditions. With quantitative analysis: testing a portfolio claim. With communication: explaining assumptions, risks, and findings clearly.',
    coursework: 'Completed: ECON 304. Listed for 2026–2027, without final grades: MGCR 211 and 341; FINE 342, 441, 442, and 448.',
    relevance: 'Intersection: evaluating an investment thesis through its assumptions, evidence, and limitations.'
  },
  quantitative: {
    title: 'Numbers, with a question attached.',
    foundation: 'Economic statistics, calculus, and programming fundamentals support empirical research and structured analytical reasoning.',
    connection: 'With economics: applying mathematical and statistical reasoning to economic questions. With finance: examining risk and return. With communication: making uncertainty and methods understandable.',
    coursework: 'Completed foundations: ECON 257D1/D2, MATH 141, COMP 202. Listed for Fall 2026 without final grades: ECON 468 and ECON 450.',
    relevance: 'Intersection: choosing measurements that address the question, then interpreting what they can actually establish.'
  },
  communication: {
    title: 'Communication is part of the analysis.',
    foundation: 'Critical theory, media studies, democracy, rhetoric, and research writing inform how I read arguments and construct my own.',
    connection: 'With economics: examining institutions and public discourse. With finance: making complex findings accessible to different audiences. With quantitative work: communicating uncertainty without losing the substance.',
    coursework: 'Completed: COMS 210, 230, 301, 491; ENGL 378; WCOM 255.',
    relevance: 'Intersection: asking how information and narratives shape decision-making. Coursework is an academic foundation, rather than a claim of professional investor-relations experience.'
  }
};

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
  panel.innerHTML = `<div><span class="status">${s.status}</span><h3>${s.title}</h3><p>${s.narrative}</p><p style="font-size:10px;margin-top:17px">${s.note}</p></div><ul class="course-list">${s.courses.map(c => `<li><span class="course-code">${c[0]}</span><span>${c[1]}</span></li>`).join('')}</ul>`;
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

function showDiscipline(key) {
  document.querySelectorAll('[data-node]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.node === key)));
  const detail = document.querySelector('#network-detail');
  detail.innerHTML = `<span class="tag">A shared perspective</span><h3>A team spirit.</h3><p>Connecting ideas.<br>Working with people.<br>Delivering results.</p>`;
}

document.querySelectorAll('[data-node]').forEach(b => b.addEventListener('click', () => showDiscipline(b.dataset.node)));
if (document.querySelector('#network-detail')) showDiscipline('economics');

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
