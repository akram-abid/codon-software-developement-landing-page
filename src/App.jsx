import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { flushSync } from 'react-dom'
import navLogo from './assets/828471661da69c7ed8bd4b6f5ad80b76.png'
import footerLogo from './assets/137ccb54a18da6035523307f9b2a8737.png'

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */

const SEC = 'relative w-[1200px] overflow-hidden'
const TAG = 'font-mono text-xs font-medium tracking-[0.08em]'
const MONO = 'font-mono'
const HEAD = 'font-sans font-extrabold tracking-[-0.035em]'
const HEAD_T = `${HEAD} leading-[0.93]`
const BTN =
  'btn inline-flex h-[52px] cursor-pointer items-center gap-3 px-6 font-sans text-[17px] font-bold no-underline'
const BTN_DARK = `${BTN} btn-fill bg-ink text-cream`
const BTN_OUTLINE = `${BTN} btn-line border-2 border-ink`
// Sits on the orange CTA band, so it stays dark in both themes.
const BTN_CTA = `${BTN} btn-cta bg-[#14110f] text-[#f6f1e9]`
const CUT_40 =
  '[clip-path:polygon(0_0,calc(100%_-_40px)_0,100%_40px,100%_100%,0_100%)]'
const CUT_56 =
  '[clip-path:polygon(0_0,calc(100%_-_56px)_0,100%_56px,100%_100%,0_100%)]'
const CUT_64 =
  '[clip-path:polygon(0_0,calc(100%_-_64px)_0,100%_64px,100%_100%,0_100%)]'
const CUT_84 =
  '[clip-path:polygon(0_0,calc(100%_-_84px)_0,100%_84px,100%_100%,0_100%)]'

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const navLinks = ['Work', 'Services', 'Process', 'Team', 'Contact']

const services = [
  {
    n: '01',
    pos: 'left-16',
    t: 'Websites',
    d: 'Fast, clear sites that bring in customers and look like you.',
  },
  {
    n: '02',
    pos: 'left-[338px]',
    t: 'Mobile apps',
    d: 'Apps for phones that people open every day.',
  },
  {
    n: '03',
    pos: 'left-[612px]',
    t: 'Business systems',
    d: 'Orders, stock and invoices in one place, built around how you work.',
  },
  {
    n: '04',
    pos: 'left-[886px]',
    t: 'Hosting and care',
    d: 'We keep it online, safe and updated. We pick up when it breaks.',
  },
]

const stats = [
  { pos: 'left-16', value: '3', label: 'FRIENDS, ONE STUDIO' },
  { pos: 'left-[340px]', value: '7', label: 'DAYS BETWEEN DEMOS' },
  { pos: 'left-[616px]', value: '4', label: 'WAYS WE HELP' },
  { pos: 'left-[892px]', value: '1', label: 'PRICE AND DATE, IN WRITING' },
]

const processSteps = [
  {
    pos: 'left-16',
    n: '01',
    t: 'Lead',
    d: 'We listen, agree the goal, the price and the date, and put it in writing.',
  },
  {
    pos: 'left-[432px]',
    n: '02',
    t: 'Try',
    d: 'We build in small steps and show you the result every week. We keep trying until it works.',
  },
  {
    pos: 'left-[800px]',
    n: '03',
    t: 'Ship',
    d: 'We put it online with a plan, and we stay close for the first days.',
  },
]

const promises = [
  {
    pos: 'top-[100px]',
    t: 'Plain words',
    d: 'No jargon. If we use a hard word, we explain it.',
  },
  {
    pos: 'top-[184px]',
    t: 'Price and date in writing',
    d: 'You know the cost and the day before we start.',
  },
  {
    pos: 'top-[268px]',
    t: 'A result every week',
    d: 'You see the work grow, not just the end.',
  },
  {
    pos: 'top-[352px]',
    t: 'Three people, one team',
    d: 'You talk to the people who build it.',
  },
  {
    pos: 'top-[436px]',
    t: 'We pick up when it breaks',
    d: 'We stay close after launch and keep it running.',
  },
]

const team = [
  { pos: 'left-16', name: 'Founder name', role: 'THE LEADER' },
  { pos: 'left-[430px]', name: 'Rahim', role: 'THE SAVER' },
  { pos: 'left-[796px]', name: 'Mustafa', role: 'THE TRYER' },
]

const faqs = [
  {
    pos: 'left-16 top-[236px]',
    n: 'Q1',
    t: 'How do we start?',
    d: 'Say hello. We listen, agree the goal, the price and the date, and put it in writing.',
  },
  {
    pos: 'left-[616px] top-[236px]',
    n: 'Q2',
    t: 'Will I see the work before the end?',
    d: 'Yes. We show you a result every week and keep trying until it works.',
  },
  {
    pos: 'left-16 top-[416px]',
    n: 'Q3',
    t: 'What do you build?',
    d: 'Websites, mobile apps and business systems for companies that want to grow.',
  },
  {
    pos: 'left-[616px] top-[416px]',
    n: 'Q4',
    t: 'What happens after launch?',
    d: 'We stay close for the first days, then keep it online, safe and updated.',
  },
]

const terminalLines = [
  { label: 'idea .........', status: 'ok', accent: true },
  { label: 'design .......', status: 'ok', accent: true },
  { label: 'build ........', status: 'trying' },
  { label: 'test .........', status: 'trying' },
  { label: 'deploy .......', status: 'ready', cursor: true },
]

const footerColumns = [
  {
    pos: 'left-[520px]',
    title: 'STUDIO',
    items: ['Work', 'Services', 'Process', 'Team'],
  },
  {
    pos: 'left-[720px]',
    title: 'CONTACT',
    items: ['hello@codon.studio', '+000 000 000 000', 'City, Country'],
  },
  {
    pos: 'left-[960px]',
    title: 'FOLLOW',
    items: ['LinkedIn', 'Instagram', 'TikTok'],
  },
]

// Four unique items; the marquee repeats them so the loop is seamless.
const marqueeItems = [
  'WEBSITES',
  'MOBILE APPS',
  'BUSINESS SYSTEMS',
  'HOSTING AND CARE',
]

const bars = [
  { pos: 'left-0', h: 'h-[50px]' },
  { pos: 'left-6', h: 'h-[84px]' },
  { pos: 'left-12', h: 'h-[66px]' },
  { pos: 'left-[72px]', h: 'h-[118px]' },
  { pos: 'left-24', h: 'h-[160px]', accent: true },
]

/* Hero terminal: each row types itself out one after another. */
const CHAR_MS = 22
const termTimeline = (() => {
  let at = 1000
  const rows = [{ label: '$ codon new project', cmd: true }, ...terminalLines].map(
    (row) => {
      const len = row.cmd
        ? row.label.length
        : row.label.length + 1 + row.status.length
      const out = { ...row, len, at, done: at + len * CHAR_MS }
      at += len * CHAR_MS + 140
      return out
    },
  )
  return { rows, end: at }
})()

/* ------------------------------------------------------------------ */
/*  Motion + theme CSS                                                 */
/*                                                                     */
/*  Everything lives here so only App.jsx needs to change.             */
/*  Rules of the motion language:                                      */
/*    - hard, mechanical easing (snap), stepped timing for terminal    */
/*      things, wipes and draws instead of soft fades                  */
/*    - entrance animations use `transform`; hover/idle effects use    */
/*      the individual `translate` / `scale` / `rotate` properties so  */
/*      the two never fight each other                                 */
/* ------------------------------------------------------------------ */

const CSS = `
/* ---------- theme ---------- */
:root{
  --on-accent:#14110f;
  --panel:#14110f;
  --panel-fg:#f6f1e9;
  --ease:cubic-bezier(.2,.8,.2,1);
  --snap:cubic-bezier(.7,0,.2,1);
  color-scheme:light;
}
/* The Tailwind tokens are roles, not literal colors:
   cream = page, ink = text, sand = raised surface.
   Dark mode swaps the values; accent stays the brand orange. */
html[data-theme='dark']{
  --color-cream:#181411;
  --color-ink:#f4efe6;
  --color-sand:#251f1a;
  --color-muted:#9b9086;
  --panel:#0d0b09;
  --panel-fg:#f4efe6;
  color-scheme:dark;
}
html{scroll-behavior:smooth;background:var(--color-cream)}
::selection{background:var(--color-accent);color:#14110f}
.panel{background:var(--panel);color:var(--panel-fg)}
.on-accent{color:var(--on-accent)}
html[data-theme='dark'] .term{box-shadow:inset 0 0 0 1px rgba(244,239,230,.1)}
.logo-dark{display:none}
html[data-theme='dark'] .logo-light{display:none}
html[data-theme='dark'] .logo-dark{display:block}

/* theme switch: a diamond wipe that grows out of the toggle */
::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}
::view-transition-old(root){z-index:1}
::view-transition-new(root){z-index:2}

/* ---------- reveal system ---------- */
.rv{opacity:0}
.rv-rise{transform:translateY(110%)}
.dot{display:inline-block;transform:scale(0);transform-origin:50% 85%}
[data-in='true'] .rv-up{animation:up .8s var(--ease) var(--d,0ms) both}
[data-in='true'] .rv-left{animation:left .9s var(--ease) var(--d,0ms) both}
[data-in='true'] .rv-right{animation:right .9s var(--ease) var(--d,0ms) both}
[data-in='true'] .rv-pop{animation:pop .7s cubic-bezier(.3,1.5,.5,1) var(--d,0ms) both}
[data-in='true'] .rv-wipe{animation:wipe .9s var(--snap) var(--d,0ms) both}
[data-in='true'] .rv-rise{animation:rise .9s var(--ease) var(--d,0ms) both}
[data-in='true'] .dot{animation:dotpop .6s cubic-bezier(.3,1.6,.5,1) var(--d,0ms) both}

@keyframes up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes left{from{opacity:0;transform:translateX(-64px)}to{opacity:1;transform:none}}
@keyframes right{from{opacity:0;transform:translateX(64px)}to{opacity:1;transform:none}}
@keyframes pop{from{opacity:0;transform:scale(.86)}to{opacity:1;transform:none}}
@keyframes wipe{
  from{opacity:1;clip-path:inset(-20% 100% -20% -2%)}
  to{opacity:1;clip-path:inset(-20% -4% -20% -2%)}
}
@keyframes rise{from{transform:translateY(110%)}to{transform:none}}
@keyframes dotpop{0%{transform:scale(0)}60%{transform:scale(1.5)}100%{transform:scale(1)}}
@keyframes growx{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes growy{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes tick{0%{opacity:1}30%{opacity:.25}60%{opacity:1}}
@keyframes floaty{50%{translate:0 -10px}}
@keyframes breathe{50%{scale:1 .78}}
@keyframes barloop{from{scale:.25 1}to{scale:1 1}}
@keyframes shimmer{from{translate:-120% 0}to{translate:320% 0}}
@keyframes shine{0%,55%{left:-45%}100%{left:145%}}
@keyframes spin4{to{rotate:360deg}}
@keyframes marq{to{transform:translateX(-50%)}}
@keyframes scan{from{top:-4%}to{top:104%}}
@keyframes navdrop{from{transform:translateY(-100%)}to{transform:none}}
@keyframes odo{to{transform:translateY(calc(var(--v) * -.93em))}}
@keyframes fillx{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes stripes{to{transform:translate(11.314px,11.314px)}}
@keyframes sq{from{opacity:0;transform:rotate(-90deg) scale(0)}to{opacity:1;transform:none}}
@keyframes ld{0%{opacity:1}33%,100%{opacity:.15}}
@keyframes type{to{width:calc(var(--n) * 1ch)}}

/* ---------- nav ---------- */
.nav-in{animation:navdrop .8s var(--ease) both}
.ulink::after{
  content:'';position:absolute;left:0;right:0;bottom:0;height:3px;
  background:var(--color-accent);
  transform:scaleX(0);transform-origin:right;
  transition:transform .35s var(--snap);
}
.ulink:hover::after{transform:scaleX(1);transform-origin:left}

/* ---------- buttons: accent fill slides in from the left ---------- */
.btn{overflow:hidden;isolation:isolate;transition:color .3s,scale .2s}
.btn:not(.absolute){position:relative}
.btn::before{
  content:'';position:absolute;inset:0;z-index:-1;
  background:var(--color-accent);
  transform:translateX(-101%);
  transition:transform .4s var(--snap);
}
.btn:hover::before{transform:none}
.btn:active{scale:.97}
.btn:focus-visible,.ulink:focus-visible{outline:2px solid var(--color-accent);outline-offset:3px}
.btn-fill:hover{color:var(--on-accent)}
.btn-line::before{background:var(--color-ink)}
.btn-line:hover{color:var(--color-cream)}
.btn-cta::before{background:#f6f1e9}
.btn-cta:hover{color:#14110f}
.btn .arr{display:inline-block;transition:translate .3s var(--ease)}
.btn:hover .arr{translate:6px 0}

/* theme toggle icons */
.tt svg{position:absolute;transition:transform .6s var(--snap),opacity .35s,rotate .4s var(--ease)}
.tt:hover svg{rotate:18deg}
.tt .moon{transform:rotate(-90deg) scale(.3);opacity:0}
html[data-theme='dark'] .tt .moon{transform:none;opacity:1}
html[data-theme='dark'] .tt .sun{transform:rotate(90deg) scale(.3);opacity:0}

/* ---------- hero terminal ---------- */
.type{display:block;width:0;overflow:hidden;white-space:nowrap}
[data-in='true'] .type{animation:type var(--t) steps(var(--n),end) var(--d,0ms) both}
.cursor{opacity:0}
[data-in='true'] .cursor{animation:blink 1.1s steps(1) var(--d,0ms) infinite}
.ld{display:inline-flex}
.ld span{opacity:.15}
[data-in='true'] .ld span{animation:ld 1.2s steps(1) infinite}
[data-in='true'] .ld span:nth-child(1){animation-delay:var(--d,0ms)}
[data-in='true'] .ld span:nth-child(2){animation-delay:calc(var(--d,0ms) + 400ms)}
[data-in='true'] .ld span:nth-child(3){animation-delay:calc(var(--d,0ms) + 800ms)}
.scan{
  position:absolute;left:0;right:0;top:-4%;height:2px;opacity:0;pointer-events:none;
  background:var(--color-accent);box-shadow:0 0 28px 10px rgba(232,89,12,.28);
}
[data-in='true'] .scan{opacity:.5;animation:scan 4.8s linear 1s infinite}

/* ---------- marquee ---------- */
.marq-track{animation:marq 26s linear infinite}
.marq-track:hover{animation-play-state:paused}
.marq-sep{display:inline-block;animation:spin4 3s steps(4) infinite}

/* ---------- numbers ---------- */
.stat::before{
  content:'';position:absolute;left:0;top:0;bottom:0;width:2px;
  background:var(--color-accent);transform:scaleY(0);transform-origin:top;
}
[data-in='true'] .stat::before{animation:growy .7s var(--snap) var(--d,0ms) both}
.odo{display:inline-block;height:.93em;overflow:hidden;vertical-align:top}
.odo-col{display:flex;flex-direction:column}
.odo-col>span{display:block;height:.93em;line-height:.93em}
[data-in='true'] .odo-col{animation:odo 1.1s cubic-bezier(.2,.9,.15,1) var(--d,0ms) both}

/* ---------- services ---------- */
.svc{transition:background-color .35s,color .35s,translate .4s var(--ease)}
.svc:hover{translate:0 -10px;background-color:var(--color-accent);color:var(--on-accent)}
.svc::after{
  content:'';position:absolute;left:0;right:0;bottom:0;height:6px;
  background:var(--on-accent);transform:scaleX(0);transform-origin:left;
  transition:transform .45s var(--snap);
}
.svc:hover::after{transform:scaleX(1)}

/* ---------- work ---------- */
.wk{transition:translate .4s var(--ease)}
.wk:hover{translate:0 -8px}
.tick{animation:tick 2.4s steps(1) infinite;animation-delay:var(--d,0ms)}
.shine{overflow:hidden}
.shine::after{
  content:'';position:absolute;top:0;bottom:0;left:-45%;width:32%;
  background:rgba(255,255,255,.5);transform:skewX(-20deg);
  animation:shine 3.4s ease-in-out 1.6s infinite;
}
.float{animation:floaty 5s ease-in-out infinite}
.phone{opacity:0}
[data-in='true'] .phone{animation:up .9s var(--ease) .5s both,floaty 5s ease-in-out 1.6s infinite}
.shimmer{
  position:absolute;top:0;bottom:0;left:0;width:30%;
  background:linear-gradient(90deg,transparent,rgba(232,89,12,.4),transparent);
  animation:shimmer 2.2s ease-in-out infinite;
}
.bar-loop{transform-origin:left;animation:barloop 2.4s steps(6) infinite alternate;animation-delay:var(--d,0ms)}
.bchart{transform:scaleY(0);transform-origin:bottom}
[data-in='true'] .bchart{
  animation:growy .8s var(--ease) var(--d,0ms) both,
            breathe 3.2s ease-in-out calc(var(--d,0ms) + 1400ms) infinite;
}
.see-all{transition:color .3s}
.see-all:hover{color:var(--color-accent)}
.see-all::after{
  content:'';position:absolute;left:0;right:0;bottom:-4px;height:2px;
  background:var(--color-accent);transform:scaleX(0);transform-origin:left;
  transition:transform .35s var(--snap);
}
.see-all:hover::after{transform:scaleX(1)}

/* ---------- process: a tiny pipeline that runs Lead > Try > Ship ---------- */
.prog{
  position:absolute;left:0;top:-2px;height:2px;width:100%;
  background:var(--color-accent);transform:scaleX(0);transform-origin:left;
}
.prog[data-state='done']{transform:none}
.prog[data-state='run']{animation:fillx 2.6s linear forwards}
.blink-soft{animation:blink 1s steps(1) infinite}

/* ---------- promises ---------- */
.promise{transition:translate .4s var(--ease)}
.promise:hover{translate:12px 0}
.promise::before{transition:rotate .4s var(--ease),scale .4s var(--ease)}
.promise:hover::before{rotate:45deg;scale:1.35}
[data-in='true'] .promise::before{animation:sq .6s cubic-bezier(.3,1.5,.5,1) calc(var(--d,0ms) + 250ms) both}
.promise .ptitle{transition:color .3s}
.promise:hover .ptitle{color:var(--color-accent)}

/* ---------- team ---------- */
.member-photo{transition:translate .4s var(--ease),background-color .35s,color .35s}
.member:hover .member-photo{translate:0 -8px;background-color:var(--color-accent);color:var(--on-accent)}
.stripes{
  position:absolute;inset:-40px;
  background:repeating-linear-gradient(135deg,transparent 0 14px,color-mix(in srgb,var(--color-muted) 24%,transparent) 14px 16px);
  animation:stripes 1.2s linear infinite;
}
.member .mname{transition:color .3s}
.member:hover .mname{color:var(--color-accent)}

/* ---------- faq ---------- */
.faq::before{
  content:'';position:absolute;left:0;top:-2px;height:2px;width:100%;
  background:var(--color-accent);transform:scaleX(0);transform-origin:left;
  transition:transform .5s var(--snap);
}
.faq:hover::before{transform:scaleX(1)}
.faq .faq-q{transition:translate .35s var(--ease)}
.faq:hover .faq-q{translate:10px 0}

/* ---------- footer ---------- */
.flink{transition:translate .3s var(--ease),color .3s}
.flink:hover{translate:8px 0;color:var(--color-accent)}
.foot-line::before{
  content:'';position:absolute;left:0;right:0;top:0;height:1px;
  background:var(--color-muted);transform:scaleX(0);transform-origin:left;
}
[data-in='true'] .foot-line::before{animation:growx 1.2s var(--snap) .4s both}

/* ---------- reduced motion: land on the final state, no looping ---------- */
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{
    animation-duration:.01ms !important;
    animation-iteration-count:1 !important;
    animation-delay:0ms !important;
    transition-duration:.01ms !important;
    scroll-behavior:auto !important;
  }
}
`

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */

const d = (ms) => ({ '--d': `${ms}ms` })

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SectionCtx = createContext(false)

function useInView(threshold = 0.18) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* A section that flips data-in="true" the first time it scrolls into view.
   Every .rv-* descendant is keyed off that attribute. */
function Sec({ as: El = 'section', className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <El
      ref={ref}
      data-in={inView}
      className={`${SEC} ${className}`}
      {...rest}
    >
      <SectionCtx.Provider value={inView}>{children}</SectionCtx.Provider>
    </El>
  )
}

function Label({ children, className = '', at = 0 }) {
  return (
    <div className={`${TAG} rv rv-wipe ${className}`} style={d(at)}>
      {children}
    </div>
  )
}

function H2({ children, className = '', at = 150 }) {
  return (
    <h2 className={`${HEAD_T} rv rv-wipe ${className}`} style={d(at)}>
      {children}
    </h2>
  )
}

function Dot({ at = 0, className = 'text-accent' }) {
  return (
    <span className={`dot ${className}`} style={d(at)}>
      .
    </span>
  )
}

/* Masked line: text rises out of a clipped slot. */
function Line({ children, at = 0 }) {
  return (
    <span className="-mb-[0.1em] -mt-[0.06em] block overflow-hidden pb-[0.1em] pt-[0.06em]">
      <span className="rv-rise block" style={d(at)}>
        {children}
      </span>
    </span>
  )
}

/* Digit column that rolls up to its value, like an odometer. */
function Odometer({ value, at = 0 }) {
  return (
    <span className="odo">
      <span className="odo-col" style={{ '--v': value, ...d(at) }}>
        {Array.from({ length: value + 1 }, (_, i) => (
          <span key={i}>{i}</span>
        ))}
      </span>
    </span>
  )
}

/* Start / stop codons that "decode" with a scramble, then lock in. */
const GLYPHS = 'AUGC'
const CODONS = ['AUG', 'GCU', 'UUC', 'UAA']

function Codons() {
  const inView = useContext(SectionCtx)
  const [txt, setTxt] = useState(CODONS)

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return undefined
    let timer
    let interval
    const run = () => {
      const start = performance.now()
      interval = setInterval(() => {
        const t = performance.now() - start
        let finished = true
        const next = CODONS.map((word, wi) =>
          [...word]
            .map((ch, ci) => {
              if (t > 500 + (wi * 3 + ci) * 110) return ch
              finished = false
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join(''),
        )
        setTxt(next)
        if (finished) {
          clearInterval(interval)
          timer = setTimeout(run, 4500)
        }
      }, 70)
    }
    timer = setTimeout(run, 150)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [inView])

  return (
    <div
      className={`${MONO} absolute left-7 top-[84px] text-[28px] font-bold leading-[1.5]`}
    >
      <span className="text-accent">{txt[0]}</span> {txt[1]}
      <br />
      {txt[2]} <span className="text-accent">{txt[3]}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page-level pieces                                                  */
/* ------------------------------------------------------------------ */

function ScrollBar() {
  const ref = useRef(null)
  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const p = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-accent"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      title={dark ? 'Light mode' : 'Dark mode'}
      className="tt btn btn-fill rv rv-pop absolute right-[272px] top-[14px] flex h-[52px] w-[52px] cursor-pointer items-center justify-center border-2 border-ink"
      style={d(650)}
    >
      <svg
        className="sun"
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
      </svg>
      <svg
        className="moon"
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="miter"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function Nav({ dark, onToggle }) {
  return (
    <Sec as="header" className="nav-in h-20 border-b border-ink bg-cream">
      <img
        className="logo-light rv rv-up absolute left-16 top-[14px] w-[150px]"
        style={d(300)}
        src={navLogo}
        alt="Codon logo"
      />
      {/* The footer logo is the light-on-dark artwork, so it doubles as the dark-mode nav logo. */}
      <img
        className="logo-dark rv rv-up absolute left-16 top-[14px] w-[150px]"
        style={d(300)}
        src={footerLogo}
        alt="Codon logo"
      />
      <nav className="absolute left-[420px] top-0 flex h-20 items-center gap-9 text-base font-semibold">
        {navLinks.map((link, i) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="ulink rv rv-up relative py-1"
            style={d(380 + i * 70)}
          >
            {link}
          </a>
        ))}
      </nav>
      <ThemeToggle dark={dark} onToggle={onToggle} />
      <a
        className={`${BTN_DARK} rv rv-pop absolute right-16 top-[14px]`}
        style={d(720)}
        href="#contact"
      >
        Start a project
      </a>
    </Sec>
  )
}

function Hero() {
  const { rows, end } = termTimeline
  return (
    <Sec className="h-[640px] bg-cream">
      <Label className="absolute left-16 top-16" at={100}>
        SOFTWARE STUDIO / THREE FRIENDS
      </Label>
      <h1 className={`${HEAD_T} absolute left-16 top-[104px] text-[100px]`}>
        <Line at={250}>We build</Line>
        <Line at={380}>software</Line>
        <Line at={510}>
          that works
          <Dot at={1000} />
        </Line>
      </h1>
      <p
        className="rv rv-up absolute left-16 top-[420px] w-[540px] text-xl font-medium leading-[1.4]"
        style={d(750)}
      >
        Websites, apps and business systems for companies that want to grow.
        Built by three friends who code on.
      </p>
      <div className="absolute left-16 top-[536px] flex gap-[14px]">
        <a
          className={`${BTN_DARK} rv rv-up`}
          style={d(900)}
          href="#contact"
        >
          Start a project <span className="arr font-medium">&rarr;</span>
        </a>
        <a
          className={`${BTN_OUTLINE} rv rv-up`}
          style={d(1000)}
          href="#work"
        >
          See our work
        </a>
      </div>
      <div
        className={`${CUT_84} term panel rv rv-up absolute left-[740px] top-16 h-[512px] w-[396px]`}
        style={d(350)}
      >
        <div className="scan" />
        <div
          className={`${MONO} absolute left-9 top-11 text-[15px] font-medium leading-[2]`}
        >
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline">
              <div
                className="type"
                style={{
                  '--n': row.len,
                  '--t': `${row.len * CHAR_MS}ms`,
                  ...d(row.at),
                }}
              >
                {row.cmd ? (
                  <span className="text-muted">{row.label}</span>
                ) : (
                  <>
                    {row.label}{' '}
                    <span className={row.accent ? 'text-accent' : undefined}>
                      {row.status}
                    </span>
                  </>
                )}
              </div>
              {row.status === 'trying' && (
                <span className="ld ml-1" style={d(row.done)}>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              )}
              {row.cursor && (
                <span
                  className="cursor ml-1 inline-block h-[3px] w-3 bg-accent"
                  style={d(row.done)}
                />
              )}
            </div>
          ))}
        </div>
        <div
          className={`${HEAD_T} absolute bottom-10 left-9 text-[44px]`}
        >
          <span className="rv rv-wipe inline-block" style={d(end)}>
            Code on
          </span>
          <span className="cursor text-accent" style={d(end + 500)}>
            .
          </span>
        </div>
      </div>
    </Sec>
  )
}

function Marquee() {
  const loop = [...marqueeItems, ...marqueeItems]
  return (
    <div className={`${SEC} on-accent h-16 bg-accent`}>
      <div className="marq-track absolute inset-y-0 left-0 flex w-max items-center whitespace-nowrap font-mono text-sm font-bold tracking-[0.08em]">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-7 pr-7"
          >
            {loop.map((item, i) => (
              <Fragment key={i}>
                <span>{item}</span>
                <span className="marq-sep">/</span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Numbers() {
  return (
    <Sec className="panel h-[200px]">
      {stats.map((stat, i) => (
        <div
          className={`stat absolute top-12 w-[252px] pl-[22px] ${stat.pos}`}
          key={stat.label}
          style={d(i * 140)}
        >
          <div className={`${HEAD_T} text-[76px]`}>
            <Odometer value={Number(stat.value)} at={250 + i * 140} />
            <Dot at={1000 + i * 140} />
          </div>
          <div
            className={`${TAG} rv rv-up mt-[14px] text-muted`}
            style={d(550 + i * 140)}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </Sec>
  )
}

function Services() {
  return (
    <Sec className="h-[580px] bg-cream" id="services">
      <Label className="absolute left-16 top-16">01 / SERVICES</Label>
      <H2 className="absolute left-16 top-[100px] text-[68px]">
        What we build
        <Dot at={900} />
      </H2>
      {services.map((service, i) => (
        <div
          className={`${CUT_40} svc rv rv-pop absolute top-[224px] h-[290px] w-[250px] cursor-default bg-sand ${service.pos}`}
          key={service.n}
          style={d(350 + i * 110)}
        >
          <div className={`${MONO} absolute left-6 top-6 text-xs font-medium`}>
            {service.n}
          </div>
          <div className="absolute left-6 right-6 top-[104px] text-[27px] font-extrabold leading-none tracking-[-0.025em]">
            {service.t}
          </div>
          <div className="absolute left-6 right-6 top-[180px] text-[15px] font-medium leading-[1.4]">
            {service.d}
          </div>
        </div>
      ))}
    </Sec>
  )
}

function WorkCardWebsite() {
  return (
    <article
      className={`${CUT_56} wk panel rv rv-left absolute left-16 top-[224px] h-[474px] w-[600px] overflow-hidden`}
      style={d(300)}
    >
      <div className="absolute left-8 right-8 top-8 h-[254px] bg-cream text-ink">
        <div className="panel absolute left-0 right-0 top-0 h-8 border-b border-muted" />
        <div className="tick absolute left-3 top-3 h-2 w-2 bg-accent" />
        <div
          className="tick absolute left-7 top-3 h-2 w-2 bg-muted"
          style={d(800)}
        />
        <div
          className="tick absolute left-11 top-3 h-2 w-2 bg-muted"
          style={d(1600)}
        />
        <div
          className="rv rv-wipe absolute left-6 top-[62px] font-sans text-[46px] font-extrabold leading-none tracking-[-0.035em]"
          style={d(900)}
        >
          Your next
          <br />
          headline
          <Dot at={1700} />
        </div>
        <div
          className="shine rv rv-pop absolute left-6 top-[176px] h-[34px] w-[110px] bg-accent"
          style={d(1300)}
        />
        <div
          className="rv rv-pop absolute left-[150px] top-[176px] h-[34px] w-[110px] border-2 border-ink"
          style={d(1400)}
        />
        <div
          className="rv rv-pop absolute right-6 top-14 h-[154px] w-[170px]"
          style={d(1100)}
        >
          <div className={`${CUT_40} float h-full w-full bg-sand`} />
        </div>
      </div>
      <Label className="absolute left-8 top-[316px] text-accent" at={700}>
        WEBSITE
      </Label>
      <div
        className={`${HEAD} rv rv-wipe absolute left-8 top-[346px] text-[38px] leading-none`}
        style={d(800)}
      >
        [CLIENT NAME]
      </div>
      <div
        className="rv rv-up absolute left-8 top-[402px] w-[460px] text-[17px] font-medium leading-[1.4]"
        style={d(950)}
      >
        One line on what we built and what changed.
      </div>
    </article>
  )
}

function WorkCardApp() {
  return (
    <article
      className={`${CUT_56} wk on-accent rv rv-right absolute left-[688px] top-[224px] h-[225px] w-[448px] overflow-hidden bg-accent`}
      style={d(450)}
    >
      <Label className="absolute left-7 top-7" at={700}>
        MOBILE APP
      </Label>
      <div
        className={`${HEAD} rv rv-wipe absolute left-7 top-[62px] text-[32px] leading-none`}
        style={d(800)}
      >
        [CLIENT NAME]
      </div>
      <div
        className="rv rv-up absolute left-7 top-[108px] w-[240px] text-[15px] font-medium leading-[1.4]"
        style={d(950)}
      >
        One line on what we built and what changed.
      </div>
      <div className="phone panel absolute left-[312px] top-9 h-[240px] w-[104px]">
        <div className="absolute left-3 top-[30px] h-[58px] w-20 overflow-hidden bg-[#f6f1e9]">
          <span className="shimmer" />
        </div>
        <div className="bar-loop absolute left-3 top-[100px] h-[10px] w-20 bg-accent" />
        <div
          className="bar-loop absolute left-3 top-[120px] h-[10px] w-14 bg-muted"
          style={d(600)}
        />
      </div>
    </article>
  )
}

function WorkCardSystem() {
  return (
    <article
      className={`${CUT_56} wk rv rv-right absolute left-[688px] top-[473px] h-[225px] w-[448px] overflow-hidden bg-cream text-ink`}
      style={d(600)}
    >
      <Label className="absolute left-7 top-7" at={900}>
        BUSINESS SYSTEM
      </Label>
      <div
        className={`${HEAD} rv rv-wipe absolute left-7 top-[62px] text-[32px] leading-none`}
        style={d(1000)}
      >
        [CLIENT NAME]
      </div>
      <div
        className="rv rv-up absolute left-7 top-[108px] w-[240px] text-[15px] font-medium leading-[1.4]"
        style={d(1100)}
      >
        One line on what we built and what changed.
      </div>
      <div className="absolute left-[296px] top-10 h-[185px] w-[120px]">
        {bars.map((bar, i) => (
          <div
            key={bar.pos}
            className={`bchart absolute bottom-0 w-5 ${bar.pos} ${bar.h} ${
              bar.accent ? 'bg-accent' : 'bg-ink'
            }`}
            style={d(900 + i * 110)}
          />
        ))}
      </div>
    </article>
  )
}

function Work() {
  return (
    <Sec className="h-[760px] bg-sand" id="work">
      <Label className="absolute left-16 top-16">02 / SELECTED WORK</Label>
      <H2 className="absolute left-16 top-[100px] text-[68px]">
        Things we shipped
        <Dot at={1000} />
      </H2>
      <div
        className={`${TAG} see-all rv rv-left absolute right-16 top-32 cursor-pointer`}
        style={d(400)}
      >
        SEE ALL WORK <span className="inline-block">&rarr;</span>
      </div>
      <WorkCardWebsite />
      <WorkCardApp />
      <WorkCardSystem />
    </Sec>
  )
}

/* Lead > Try > Ship runs like a tiny pipeline: each step "runs",
   fills its line, then flips to done. Then it starts over. */
function ProcessSteps() {
  const inView = useContext(SectionCtx)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (!inView) return undefined
    const id = setTimeout(
      () => setActive((a) => (a >= 3 ? 0 : a + 1)),
      active < 0 ? 1600 : 2600,
    )
    return () => clearTimeout(id)
  }, [inView, active])

  return processSteps.map((step, i) => {
    const state = active > i ? 'done' : active === i ? 'run' : 'idle'
    return (
      <div
        className={`rv rv-up absolute top-[276px] w-[336px] border-t-2 border-muted/40 pt-[18px] ${step.pos}`}
        key={step.n}
        style={d(600 + i * 160)}
      >
        <div className="prog" data-state={state} />
        <div className="flex items-center justify-between">
          <span className={`${MONO} text-[13px] font-bold text-accent`}>
            {step.n}
          </span>
          <span
            className={`${MONO} text-[11px] font-medium tracking-[0.08em] ${
              state === 'run' ? 'blink-soft text-accent' : 'text-muted'
            }`}
          >
            {state === 'done' ? 'DONE' : state === 'run' ? 'RUNNING' : 'QUEUED'}
          </span>
        </div>
        <div
          className={`mb-3 mt-[14px] text-[34px] font-extrabold leading-none tracking-[-0.03em] transition-colors duration-300 ${
            state === 'run' ? 'text-accent' : ''
          }`}
        >
          {step.t}
        </div>
        <div className="text-[17px] font-medium leading-[1.45]">{step.d}</div>
      </div>
    )
  })
}

function Process() {
  return (
    <Sec className="panel h-[520px]" id="process">
      <Label className="absolute left-16 top-16 text-muted">
        03 / HOW WE WORK
      </Label>
      <h2 className={`${HEAD_T} absolute left-16 top-[100px] text-[96px]`}>
        {['Lead', 'Try', 'Ship'].map((word, i) => (
          <Fragment key={word}>
            <span
              className="rv rv-wipe inline-block"
              style={d(200 + i * 350)}
            >
              {word}
              <Dot at={700 + i * 350} />
            </span>
            {i < 2 && ' '}
          </Fragment>
        ))}
      </h2>
      <ProcessSteps />
    </Sec>
  )
}

function Promises() {
  return (
    <Sec className="h-[600px] bg-cream">
      <Label className="absolute left-16 top-16">04 / OUR PROMISES</Label>
      <h2 className={`${HEAD_T} absolute left-16 top-[100px] text-[84px]`}>
        <span className="rv rv-wipe block w-fit" style={d(150)}>
          Plain words.
        </span>
        <span className="rv rv-wipe block w-fit" style={d(300)}>
          Real people.
        </span>
        <span className="rv rv-wipe block w-fit" style={d(450)}>
          Fixed dates
          <Dot at={1000} />
        </span>
      </h2>
      <p
        className="rv rv-up absolute left-16 top-[392px] w-[460px] text-xl font-medium leading-[1.4]"
        style={d(700)}
      >
        We keep the work simple, so you always know what is happening and what
        comes next.
      </p>
      <a
        className={`${BTN_DARK} rv rv-up absolute left-16 top-[490px]`}
        style={d(850)}
        href="#contact"
      >
        Start a project <span className="arr font-medium">&rarr;</span>
      </a>
      {promises.map((promise, i) => (
        <div
          className={`promise rv rv-right absolute left-[640px] h-[84px] w-[496px] cursor-default border-t border-ink pl-7 pt-4 before:absolute before:left-0 before:top-[22px] before:h-3 before:w-3 before:bg-accent before:content-[''] ${promise.pos}`}
          key={promise.t}
          style={d(300 + i * 120)}
        >
          <div className="ptitle text-[22px] font-extrabold leading-[1.1] tracking-[-0.02em]">
            {promise.t}
          </div>
          <div className="mt-1 text-[15px] font-medium leading-[1.4]">
            {promise.d}
          </div>
        </div>
      ))}
    </Sec>
  )
}

function Team() {
  return (
    <Sec className="h-[640px] bg-sand" id="team">
      <Label className="absolute left-16 top-16">05 / THE TEAM</Label>
      <H2 className="absolute left-16 top-[100px] text-[68px]">
        Three friends. One studio
        <Dot at={1000} />
      </H2>
      {team.map((member, i) => (
        <div key={member.name} className="member">
          <div
            className={`${CUT_64} member-photo rv rv-pop absolute top-[224px] h-[300px] w-[340px] overflow-hidden bg-cream ${member.pos}`}
            style={d(350 + i * 150)}
          >
            <div className="stripes" />
            <div
              className={`${MONO} absolute left-0 right-0 top-1/2 text-center text-xs font-medium tracking-[0.08em]`}
            >
              PHOTO
            </div>
          </div>
          <div
            className={`rv rv-up absolute top-[540px] ${member.pos}`}
            style={d(650 + i * 150)}
          >
            <div className="mname text-[26px] font-extrabold tracking-[-0.02em]">
              {member.name}
            </div>
            <div className={`${TAG} mt-[6px]`}>{member.role}</div>
          </div>
        </div>
      ))}
    </Sec>
  )
}

function Faq() {
  return (
    <Sec className="h-[620px] bg-cream">
      <Label className="absolute left-16 top-16">06 / QUESTIONS</Label>
      <H2 className="absolute left-16 top-[100px] text-[68px]">
        Good questions
        <Dot at={900} />
      </H2>
      {faqs.map((faq, i) => (
        <div
          className={`faq rv rv-up absolute w-[520px] cursor-default border-t-2 border-ink pt-[18px] ${faq.pos}`}
          key={faq.n}
          style={d(350 + i * 130)}
        >
          <div className={TAG}>{faq.n}</div>
          <div className="faq-q my-[10px] text-[26px] font-extrabold leading-[1.05] tracking-[-0.025em]">
            {faq.t}
          </div>
          <div className="text-[17px] font-medium leading-[1.45]">{faq.d}</div>
        </div>
      ))}
    </Sec>
  )
}

function Cta() {
  return (
    <Sec className="on-accent h-[440px] bg-accent" id="contact">
      <h2 className={`${HEAD_T} absolute left-16 top-[72px] text-[108px]`}>
        <span className="rv rv-wipe block w-fit" style={d(100)}>
          Got an idea?
        </span>
        <span className="rv rv-wipe block w-fit" style={d(300)}>
          Let&apos;s build it
          <Dot at={900} className="on-accent" />
        </span>
      </h2>
      <div
        className={`${CUT_56} panel rv rv-pop absolute left-[896px] top-[72px] h-[296px] w-[240px]`}
        style={d(400)}
      >
        <div className="scan" />
        <div className={`${TAG} absolute left-7 top-8 text-muted`}>
          START / STOP
        </div>
        <Codons />
        <div className={`${HEAD_T} absolute bottom-7 left-7 text-[40px]`}>
          Code on<span className="text-accent">.</span>
        </div>
      </div>
      <div className="absolute left-16 top-[338px] flex items-center gap-6">
        <a
          className={`${BTN_CTA} rv rv-up`}
          style={d(700)}
          href="mailto:hello@codon.studio"
        >
          Say hello <span className="arr font-medium">&rarr;</span>
        </a>
        <div
          className={`${MONO} rv rv-up text-[15px] font-medium`}
          style={d(850)}
        >
          hello@codon.studio
          <span
            className="cursor ml-1 inline-block h-[3px] w-3 bg-[#14110f]"
            style={d(1300)}
          />
        </div>
      </div>
    </Sec>
  )
}

function Footer() {
  return (
    <Sec as="footer" className="panel h-[300px]">
      <img
        className="rv rv-up absolute left-16 top-16 w-[200px]"
        style={d(100)}
        src={footerLogo}
        alt="Codon logo"
      />
      {footerColumns.map((column, ci) => (
        <div
          className={`absolute top-16 ${column.pos}`}
          key={column.title}
        >
          <Label className="mb-4 text-muted" at={200 + ci * 120}>
            {column.title}
          </Label>
          {column.items.map((item, ii) => (
            <div
              className="flink rv rv-up mb-[10px] w-fit cursor-pointer text-base font-medium"
              key={item}
              style={d(350 + ci * 120 + ii * 70)}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
      <div className="foot-line absolute bottom-8 left-16 right-16 flex justify-between pt-4">
        <div
          className={`${MONO} rv rv-up text-xs font-medium tracking-[0.06em] text-muted`}
          style={d(800)}
        >
          &copy; 2026 CODON. CODE ON.
        </div>
        <div
          className={`${MONO} rv rv-up text-xs font-medium tracking-[0.06em] text-muted`}
          style={d(900)}
        >
          THREE LETTERS. ONE INSTRUCTION.
        </div>
      </div>
    </Sec>
  )
}

/* ------------------------------------------------------------------ */
/*  App + theme                                                        */
/* ------------------------------------------------------------------ */

const THEME_KEY = 'codon-theme'

function getInitialDark() {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark' || saved === 'light') return saved === 'dark'
  } catch {
    /* storage unavailable: fall through to the system setting */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function App() {
  const [dark, setDark] = useState(getInitialDark)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }, [dark])

  const toggleTheme = (event) => {
    const next = !dark
    if (!document.startViewTransition || prefersReducedMotion()) {
      setDark(next)
      return
    }
    // Diamond wipe growing out of the toggle button.
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const r =
      Math.max(x, window.innerWidth - x) + Math.max(y, window.innerHeight - y)
    const transition = document.startViewTransition(() => {
      flushSync(() => setDark(next))
    })
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
              `polygon(${x}px ${y - r}px, ${x + r}px ${y}px, ${x}px ${y + r}px, ${x - r}px ${y}px)`,
            ],
          },
          {
            duration: 800,
            easing: 'cubic-bezier(.7,0,.2,1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {})
  }

  return (
    <div className="min-h-screen w-full bg-cream font-sans text-ink">
      <style>{CSS}</style>
      <ScrollBar />
      <div className="mx-auto w-[1200px]">
        <Nav dark={dark} onToggle={toggleTheme} />
        <Hero />
        <Marquee />
        <Numbers />
        <Services />
        <Work />
        <Process />
        <Promises />
        <Team />
        <Faq />
        <Cta />
        <Footer />
      </div>
    </div>
  )
}