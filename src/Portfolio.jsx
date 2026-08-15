import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   Malik Khelfah — Portfolio
   Direction: "Polars" — vivid gradient hero panel, portal beam,
   glossy orbs, liquid glass on deep navy.
   Palette  #06090F · #0C111C · #FF3CBE · #A76BFF · #25AAF6 · #FFF
   Type     Gilroy (display, Poppins fallback) + Poppins (body)
   Icons    circular glass badges (orange-template treatment)
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

.mk{
  --bg:#06090F; --bg2:#0C111C;
  --pink:#FF3CBE; --violet:#A76BFF; --blue:#25AAF6; --cyan:#3EE2F5;
  --stroke:rgba(255,255,255,.09);
  --card:rgba(255,255,255,.035);
  --muted:rgba(255,255,255,.56);
  --faint:rgba(255,255,255,.34);
  --display:'Gilroy','Poppins',system-ui,sans-serif;
  --body:'Poppins',system-ui,sans-serif;
  background:var(--bg); color:#fff; font-family:var(--body);
  overflow-x:hidden; position:relative; min-height:100vh;
  -webkit-tap-highlight-color:transparent;
  width:100%; max-width:100vw;
}
.mk *,.mk *::before,.mk *::after{box-sizing:border-box}
.mk h1,.mk h2,.mk h3,.mk h4,.mk p,.mk ul{margin:0}
.mk ul{padding:0;list-style:none}
.mk a{color:inherit;text-decoration:none}
.mk button{font-family:inherit;border:none;background:none;color:inherit;cursor:pointer}
.mk-shell{max-width:1180px;margin:0 auto;padding:0 24px}
.mk-section{padding:130px 0}
@media(max-width:720px){.mk-section{padding:88px 0}}

/* ============ ambient ============ */
.mk-amb{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.mk-amb i{position:absolute;border-radius:50%;filter:blur(120px);opacity:.42;animation:drift 24s ease-in-out infinite alternate}
.mk-amb i:nth-child(1){width:44vw;height:44vw;background:var(--pink);top:32vh;left:-14vw}
.mk-amb i:nth-child(2){width:40vw;height:40vw;background:var(--blue);top:96vh;right:-14vw;animation-delay:-8s}
.mk-amb i:nth-child(3){width:38vw;height:38vw;background:var(--violet);top:170vh;left:16vw;animation-delay:-16s}
@keyframes drift{from{transform:translate3d(0,0,0) scale(1)}to{transform:translate3d(5vw,-6vh,0) scale(1.2)}}
.mk-wrap{position:relative;z-index:1}

/* ============ HERO PANEL — the signature ============ */
.mk-heroshell{padding:14px}
.mk-hero{
  position:relative;border-radius:36px;overflow:hidden;
  min-height:min(94svh,860px);display:flex;flex-direction:column;
  background:linear-gradient(112deg,#1BC6E8 0%,#4E7BFF 20%,#8A4FFF 42%,#D93BD8 64%,#FF3CBE 82%,#FF7A9C 100%);
  background-size:230% 230%;
  animation:mesh 20s ease-in-out infinite;
  box-shadow:0 40px 120px -50px rgba(255,60,190,.65);
}
@keyframes mesh{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.mk-hero::after{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(120% 90% at 50% 108%, rgba(6,9,15,.92) 0%, rgba(6,9,15,.35) 42%, transparent 66%),
    radial-gradient(90% 70% at 88% 0%, rgba(6,9,15,.4), transparent 60%);
}
.mk-hero-noise{
  position:absolute;inset:0;opacity:.22;mix-blend-mode:overlay;pointer-events:none;
  background-image:radial-gradient(rgba(255,255,255,.5) .5px,transparent .5px);background-size:3px 3px;
}

/* nav inside panel */
.mk-nav{
  position:relative;z-index:5;display:flex;align-items:center;justify-content:space-between;
  padding:24px 34px;
}
.mk-mark{font-family:var(--display);font-weight:800;font-size:19px;letter-spacing:.02em}
.mk-mark b{font-weight:300;opacity:.7}
.mk-navlinks{display:flex;gap:8px;padding:6px;border-radius:999px;
  background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(14px)}
.mk-navlinks button{font-size:13px;padding:8px 16px;border-radius:999px;transition:background .25s ease}
.mk-navlinks button:hover{background:rgba(255,255,255,.2)}
.mk-navcta{
  font-size:13px;padding:11px 20px;border-radius:999px;background:rgba(10,12,20,.55);
  border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(14px);transition:transform .25s ease,background .25s ease}
.mk-navcta:hover{transform:translateY(-2px);background:rgba(10,12,20,.75)}
@media(max-width:900px){.mk-navlinks{display:none}}

/* hero body */
.mk-herobody{
  position:relative;z-index:4;flex:1;display:grid;grid-template-columns:1.05fr .95fr;
  gap:32px;align-items:center;padding:20px 40px 56px;
}
@media(max-width:940px){.mk-herobody{grid-template-columns:1fr;padding:10px 26px 44px;gap:8px}}
.mk-kicker{
  display:inline-flex;align-items:center;gap:10px;font-size:11.5px;letter-spacing:.34em;
  text-transform:uppercase;color:rgba(255,255,255,.85);margin-bottom:20px}
.mk-kicker::before{content:'';width:32px;height:1px;background:rgba(255,255,255,.7)}
.mk-hero h1{
  font-family:var(--display);font-weight:800;letter-spacing:-.04em;line-height:.92;
  font-size:clamp(46px,6.6vw,90px);text-shadow:0 14px 50px rgba(0,0,0,.28)}
.mk-hero h1 em{font-style:normal;font-weight:300;opacity:.82}
.mk-herosub{
  margin:24px 0 30px;max-width:42ch;font-size:clamp(14.5px,1.5vw,16.5px);line-height:1.78;
  color:rgba(255,255,255,.86)}
.mk-heroctas{display:flex;flex-wrap:wrap;gap:11px}
.mk-btn{display:inline-flex;align-items:center;gap:9px;padding:14px 26px;border-radius:999px;
  font-size:14px;font-weight:500;transition:transform .22s ease,box-shadow .3s ease,background .3s ease}
.mk-btn svg{width:16px;height:16px}
.mk-btn-solid{background:#0A0D16;color:#fff;box-shadow:0 14px 40px -16px rgba(0,0,0,.9)}
.mk-btn-solid:hover{transform:translateY(-3px)}
.mk-btn-clear{background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);backdrop-filter:blur(12px)}
.mk-btn-clear:hover{background:rgba(255,255,255,.26);transform:translateY(-3px)}
.mk-btn-grad{background:linear-gradient(100deg,var(--pink),var(--violet) 52%,var(--blue));
  box-shadow:0 14px 44px -16px rgba(255,60,190,.9)}
.mk-btn-grad:hover{transform:translateY(-3px)}
.mk-btn-ghost{border:1px solid var(--stroke);background:rgba(255,255,255,.04)}
.mk-btn-ghost:hover{background:rgba(255,255,255,.09);transform:translateY(-3px)}

/* ---- portal / orb stage ---- */
.mk-stage{position:relative;aspect-ratio:1/1;width:100%;max-width:470px;margin:0 auto}
.mk-portal{
  position:absolute;left:50%;top:6%;transform:translateX(-50%);
  width:19%;height:62%;border-radius:999px;
  background:linear-gradient(180deg,rgba(62,226,245,0),rgba(62,226,245,.85) 26%,rgba(255,255,255,.95) 58%,rgba(255,60,190,.9));
  filter:blur(9px);animation:beam 4.6s ease-in-out infinite}
.mk-portal2{
  position:absolute;left:50%;top:8%;transform:translateX(-50%);
  width:7%;height:58%;border-radius:999px;background:rgba(255,255,255,.95);filter:blur(4px);
  animation:beam 4.6s ease-in-out infinite .3s}
@keyframes beam{0%,100%{opacity:.7;transform:translateX(-50%) scaleY(.97)}50%{opacity:1;transform:translateX(-50%) scaleY(1.04)}}
.mk-pool{
  position:absolute;left:50%;top:63%;transform:translateX(-50%);
  width:56%;height:15%;border-radius:50%;
  background:radial-gradient(ellipse at center,rgba(255,255,255,.9),rgba(62,226,245,.5) 38%,rgba(167,107,255,.25) 62%,transparent 74%);
  filter:blur(6px)}
.mk-halo{
  position:absolute;left:50%;top:60%;transform:translate(-50%,-50%);
  width:78%;aspect-ratio:2.6/1;border-radius:50%;
  border:1px solid rgba(255,255,255,.45);animation:halo 7s ease-in-out infinite}
.mk-halo.h2{width:96%;border-color:rgba(255,255,255,.28);animation-delay:-2.3s}
.mk-halo.h3{width:114%;border-color:rgba(255,255,255,.16);animation-delay:-4.6s}
@keyframes halo{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.8}50%{transform:translate(-50%,-50%) scale(1.07);opacity:.4}}
.mk-shadowpool{
  position:absolute;left:50%;top:72%;transform:translateX(-50%);
  width:60%;height:16%;border-radius:50%;background:rgba(4,6,12,.55);filter:blur(18px)}
.mk-orb{position:absolute;border-radius:50%}
.mk-orb.white{width:31%;aspect-ratio:1;left:2%;top:38%;
  background:radial-gradient(circle at 33% 26%,#fff 0%,#f2f4fa 30%,#c8cddb 58%,#8b92a6 82%,#5d6478 100%);
  box-shadow:0 34px 64px -22px rgba(0,0,0,.8),inset -14px -18px 34px rgba(0,0,0,.18);
  animation:float 9.5s ease-in-out infinite}
.mk-orb.dark{width:22%;aspect-ratio:1;right:3%;top:52%;
  background:radial-gradient(circle at 34% 24%,#8b90a2 0%,#4a4f60 26%,#222531 56%,#0b0d14 92%);
  box-shadow:0 28px 54px -20px rgba(0,0,0,.9),inset -10px -14px 26px rgba(0,0,0,.5);
  animation:float 12s ease-in-out infinite reverse}
.mk-orb.mini{width:8%;aspect-ratio:1;right:26%;top:20%;
  background:radial-gradient(circle at 34% 28%,#fff,#c2c8d8 62%,#767d92);
  animation:float 7.2s ease-in-out infinite}
.mk-orb.mini2{width:5.5%;aspect-ratio:1;left:20%;top:16%;
  background:radial-gradient(circle at 34% 28%,#5a6072,#181b25);
  animation:float 8.4s ease-in-out infinite .8s}
@keyframes float{0%,100%{translate:0 0}50%{translate:0 -18px}}
@media(max-width:940px){.mk-stage{max-width:340px}}

/* ============ marquee ============ */
.mk-marquee{
  position:relative;overflow:hidden;padding:22px 0;margin-top:14px;
  border-top:1px solid var(--stroke);border-bottom:1px solid var(--stroke);
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);
  mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.mk-marquee-track{display:flex;gap:52px;width:max-content;animation:slide 32s linear infinite}
.mk-marquee span{font-family:var(--display);font-weight:600;font-size:15px;letter-spacing:.02em;
  color:rgba(255,255,255,.42);white-space:nowrap;display:flex;align-items:center;gap:52px}
.mk-marquee span::after{content:'';width:5px;height:5px;border-radius:50%;
  background:linear-gradient(90deg,var(--pink),var(--blue))}
@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ============ section headings ============ */
.mk-eyebrow{display:inline-flex;align-items:center;gap:11px;font-size:11.5px;letter-spacing:.3em;
  text-transform:uppercase;color:var(--faint);margin-bottom:18px}
.mk-eyebrow::before{content:'';width:26px;height:1px;background:linear-gradient(90deg,var(--pink),var(--blue))}
.mk-h2{font-family:var(--display);font-weight:800;letter-spacing:-.035em;line-height:1.02;
  font-size:clamp(34px,5.4vw,62px);margin-bottom:46px;position:relative;display:inline-block}
.mk-h2 .g{background:linear-gradient(100deg,var(--pink),var(--violet) 46%,var(--blue));
  -webkit-background-clip:text;background-clip:text;color:transparent}
.mk-plus{position:absolute;font-size:.34em;font-weight:400;color:var(--cyan);opacity:.85}
.mk-plus.a{top:-.1em;right:-.6em}
.mk-plus.b{bottom:.2em;left:-.7em;color:var(--pink)}

/* ============ glass ============ */
.mk-glass{background:var(--card);border:1px solid var(--stroke);border-radius:24px;
  backdrop-filter:blur(22px) saturate(150%);-webkit-backdrop-filter:blur(22px) saturate(150%);
  position:relative;overflow:hidden}
.mk-glass::before{content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(158deg,rgba(255,255,255,.10),rgba(255,255,255,0) 44%)}

/* ============ about ============ */
.mk-about{display:grid;grid-template-columns:1.1fr .9fr;gap:44px}
@media(max-width:880px){.mk-about{grid-template-columns:1fr}}
.mk-about p{color:var(--muted);line-height:1.88;font-size:15.5px;margin-bottom:18px}
.mk-stats{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-content:start}
.mk-stat{padding:26px}
.mk-stat-n{font-family:var(--display);font-weight:800;font-size:36px;letter-spacing:-.03em}
.mk-stat-l{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--faint);margin-top:7px}

/* ============ skills — orange-template icon badges ============ */
.mk-sgroup{margin-bottom:56px}
.mk-sgroup h3{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--faint);
  margin-bottom:28px;display:flex;align-items:center;gap:14px}
.mk-sgroup h3::after{content:'';flex:1;height:1px;background:var(--stroke)}
.mk-iconrow{display:grid;grid-template-columns:repeat(6,1fr);gap:30px 14px}
@media(max-width:880px){.mk-iconrow{grid-template-columns:repeat(4,1fr)}}
@media(max-width:520px){.mk-iconrow{grid-template-columns:repeat(3,1fr)}}
.mk-ic{display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}
.mk-ic-badge{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;position:relative;
  border:1px solid var(--stroke);background:rgba(255,255,255,.04);backdrop-filter:blur(14px);
  transition:transform .3s cubic-bezier(.2,.7,.3,1),border-color .3s,box-shadow .3s,background .3s}
.mk-ic-badge svg{width:27px;height:27px;position:relative;z-index:1}
.mk-ic-badge::after{content:'';position:absolute;inset:-1px;border-radius:50%;opacity:0;
  background:linear-gradient(140deg,rgba(255,60,190,.35),rgba(37,170,246,.35));transition:opacity .3s}
.mk-ic:hover .mk-ic-badge{transform:translateY(-7px) scale(1.05);border-color:rgba(255,60,190,.55);
  box-shadow:0 16px 38px -14px rgba(255,60,190,.85)}
.mk-ic:hover .mk-ic-badge::after{opacity:1}
.mk-ic-l{font-size:11.5px;color:var(--muted);line-height:1.35}

/* ============ experience ============ */
.mk-tl{position:relative;padding-left:32px}
.mk-tl::before{content:'';position:absolute;left:5px;top:10px;bottom:10px;width:1px;
  background:linear-gradient(180deg,var(--cyan),var(--violet) 45%,var(--pink),transparent)}
.mk-job{position:relative;padding-bottom:42px}
.mk-job:last-child{padding-bottom:0}
.mk-job::before{content:'';position:absolute;left:-32px;top:8px;width:11px;height:11px;border-radius:50%;
  background:var(--bg);border:2px solid var(--pink);box-shadow:0 0 0 5px rgba(255,60,190,.12)}
.mk-jcard{padding:26px 28px;transition:transform .32s ease,border-color .32s}
.mk-jcard:hover{transform:translateX(6px);border-color:rgba(255,255,255,.2)}
.mk-jhead{display:flex;flex-wrap:wrap;align-items:baseline;gap:12px;margin-bottom:5px}
.mk-jt{font-family:var(--display);font-weight:700;font-size:18.5px;letter-spacing:-.015em}
.mk-jd{font-size:11.5px;letter-spacing:.08em;color:var(--cyan);padding:3px 12px;border-radius:999px;
  border:1px solid rgba(62,226,245,.3)}
.mk-jc{font-size:13.5px;color:var(--faint);margin-bottom:15px}
.mk-jcard li{position:relative;padding-left:18px;color:var(--muted);font-size:14px;line-height:1.72;margin-bottom:6px}
.mk-jcard li::before{content:'';position:absolute;left:0;top:11px;width:8px;height:1px;
  background:linear-gradient(90deg,var(--pink),var(--blue))}

/* ============ work ============ */
.mk-feature{
  position:relative;border-radius:30px;overflow:hidden;padding:1px;margin-bottom:18px;
  background:linear-gradient(120deg,rgba(62,226,245,.7),rgba(167,107,255,.7) 48%,rgba(255,60,190,.7));
  transition:transform .35s cubic-bezier(.2,.7,.3,1)}
.mk-feature:hover{transform:translateY(-6px)}
.mk-feature-in{
  border-radius:29px;background:linear-gradient(150deg,#0E1422,#080B12 62%);
  padding:44px;display:grid;grid-template-columns:1.25fr .75fr;gap:36px;align-items:center;position:relative;overflow:hidden}
@media(max-width:820px){.mk-feature-in{grid-template-columns:1fr;padding:32px}}
.mk-feature-in::before{content:'';position:absolute;width:420px;height:420px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,60,190,.35),transparent 66%);right:-120px;top:-140px;filter:blur(38px)}
.mk-featnum{font-family:var(--display);font-size:11.5px;letter-spacing:.3em;color:var(--cyan);margin-bottom:16px}
.mk-feature h3{font-family:var(--display);font-weight:800;letter-spacing:-.03em;
  font-size:clamp(28px,3.6vw,42px);margin-bottom:14px}
.mk-feature p{color:var(--muted);font-size:15px;line-height:1.8;margin-bottom:22px;max-width:52ch}
.mk-featorb{position:relative;aspect-ratio:1;max-width:220px;margin:0 auto;width:100%}
.mk-featorb .ring{position:absolute;inset:8%;border-radius:50%;border:1px solid rgba(255,255,255,.14);
  animation:spin 26s linear infinite}
.mk-featorb .ring.b{inset:24%;border-color:rgba(255,60,190,.3);animation-duration:17s;animation-direction:reverse}
.mk-featorb .core{position:absolute;inset:36%;border-radius:50%;
  background:radial-gradient(circle at 33% 27%,#fff,#dfe3ee 34%,#a7aec2 66%,#666d81);
  box-shadow:0 24px 48px -18px rgba(0,0,0,.85),0 0 60px -12px rgba(167,107,255,.6);
  animation:float 8s ease-in-out infinite}
@keyframes spin{to{transform:rotate(360deg)}}

.mk-projects{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:780px){.mk-projects{grid-template-columns:1fr}}
.mk-proj{padding:32px;transition:transform .35s cubic-bezier(.2,.7,.3,1),border-color .35s}
.mk-proj:hover{transform:translateY(-6px);border-color:rgba(255,255,255,.22)}
.mk-projnum{font-family:var(--display);font-size:11.5px;letter-spacing:.3em;color:var(--faint);margin-bottom:16px}
.mk-proj h3{font-family:var(--display);font-weight:700;font-size:23px;letter-spacing:-.02em;margin-bottom:11px}
.mk-proj p{color:var(--muted);font-size:14.5px;line-height:1.75;margin-bottom:20px}
.mk-stack{display:flex;flex-wrap:wrap;gap:7px}
.mk-chip{font-size:11px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.05);
  border:1px solid var(--stroke);color:var(--faint)}
.mk-links{display:flex;flex-wrap:wrap;gap:9px;margin-top:20px}
.mk-link{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;padding:9px 16px;border-radius:999px;
  border:1px solid var(--stroke);background:rgba(255,255,255,.045);color:rgba(255,255,255,.8);
  transition:border-color .25s,background .25s,transform .25s,color .25s}
.mk-link svg{width:14px;height:14px}
.mk-link:hover{color:#fff;transform:translateY(-2px);background:rgba(255,255,255,.1);
  border-color:rgba(62,226,245,.55)}
.mk-link.solid{background:linear-gradient(100deg,var(--pink),var(--violet) 52%,var(--blue));
  border-color:transparent;color:#fff;box-shadow:0 12px 32px -14px rgba(255,60,190,.85)}
.mk-link.solid:hover{background:linear-gradient(100deg,var(--pink),var(--violet) 52%,var(--blue))}

/* ============ certificates ============ */
.mk-certtop{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
@media(max-width:720px){.mk-certtop{grid-template-columns:1fr}}
.mk-certhero{padding:28px;display:flex;align-items:center;gap:18px;transition:transform .3s}
.mk-certhero:hover{transform:translateY(-4px)}
.mk-seal{width:48px;height:48px;flex:none;border-radius:15px;display:grid;place-items:center;
  background:linear-gradient(140deg,rgba(255,60,190,.3),rgba(37,170,246,.3));border:1px solid var(--stroke)}
.mk-seal svg{width:22px;height:22px}
.mk-certhero h4{font-family:var(--display);font-weight:700;font-size:16.5px;letter-spacing:-.01em}
.mk-certhero span{font-size:12.5px;color:var(--faint)}
.mk-note{margin-top:20px;font-size:13px;color:var(--faint)}

/* ============ contact ============ */
.mk-contact{display:grid;grid-template-columns:.85fr 1.15fr;gap:44px}
@media(max-width:880px){.mk-contact{grid-template-columns:1fr}}
.mk-pills{display:flex;flex-direction:column;gap:10px;margin-bottom:26px}
.mk-pill{display:inline-flex;align-items:center;gap:12px;padding:14px 19px;border-radius:999px;font-size:14px;
  border:1px solid var(--stroke);background:rgba(255,255,255,.03);color:var(--muted);
  transition:border-color .25s,color .25s,transform .25s}
.mk-pill:hover{border-color:rgba(62,226,245,.5);color:#fff;transform:translateX(5px)}
.mk-pill svg{width:16px;height:16px;flex:none;opacity:.85}
.mk-social{display:flex;gap:24px;font-size:13.5px;color:var(--muted)}
.mk-social a:hover{color:var(--pink)}
.mk-form{padding:32px}
.mk-flabel{font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:var(--faint);margin-bottom:22px}
.mk-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
@media(max-width:520px){.mk-frow{grid-template-columns:1fr}}
.mk-in,.mk-ta{width:100%;padding:15px 17px;border-radius:15px;background:rgba(255,255,255,.04);
  border:1px solid var(--stroke);color:#fff;font-family:var(--body);font-size:14px;outline:none;
  transition:border-color .25s,background .25s}
.mk-in::placeholder,.mk-ta::placeholder{color:rgba(255,255,255,.28)}
.mk-in:focus,.mk-ta:focus{border-color:rgba(255,60,190,.6);background:rgba(255,255,255,.07)}
.mk-ta{min-height:150px;resize:vertical;margin-bottom:16px}
.mk-sent{font-size:13px;color:var(--cyan);margin-top:13px}

.mk-footer{border-top:1px solid var(--stroke);padding:32px 0;display:flex;flex-wrap:wrap;gap:12px;
  justify-content:space-between;font-size:12.5px;color:var(--faint)}

/* ============ MOTION LAYER ============ */
.mk-progress{position:fixed;top:0;left:0;height:3px;z-index:80;width:var(--sp,0%);
  background:linear-gradient(90deg,var(--cyan),var(--violet) 50%,var(--pink));
  box-shadow:0 0 20px rgba(255,60,190,.75);transition:width .1s linear}

/* drifting starfield */
.mk-stars{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.mk-stars i{position:absolute;border-radius:50%;background:#fff;opacity:.5;
  animation:twinkle var(--tw,6s) ease-in-out infinite var(--td,0s),rise var(--rs,26s) linear infinite var(--td,0s)}
@keyframes twinkle{0%,100%{opacity:.12}50%{opacity:.75}}
@keyframes rise{from{translate:0 0}to{translate:0 -140px}}

/* cursor spotlight on every glass surface */
.mk-glass::after,.mk-feature-in::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:0;
  transition:opacity .45s ease;
  background:radial-gradient(320px circle at var(--mx,50%) var(--my,50%),rgba(255,60,190,.18),transparent 62%)}
.mk-glass:hover::after,.mk-feature-in:hover::after{opacity:1}

/* hero cursor parallax */
.mk-stage{transform:translate3d(calc(var(--px,0)*16px),calc(var(--py,0)*16px),0);transition:transform .5s cubic-bezier(.2,.7,.3,1)}
.mk-orb.white{transform:translate3d(calc(var(--px,0)*-26px),calc(var(--py,0)*-20px),0)}
.mk-orb.dark{transform:translate3d(calc(var(--px,0)*34px),calc(var(--py,0)*24px),0)}
.mk-orb.mini{transform:translate3d(calc(var(--px,0)*44px),calc(var(--py,0)*32px),0)}
.mk-orb.mini2{transform:translate3d(calc(var(--px,0)*-40px),calc(var(--py,0)*-28px),0)}
.mk-orb{transition:transform .6s cubic-bezier(.2,.7,.3,1)}

/* hero entrance */
.mk-enter{opacity:0;transform:translateY(28px);animation:enter .95s cubic-bezier(.16,1,.3,1) forwards}
.mk-enter.d1{animation-delay:.08s}.mk-enter.d2{animation-delay:.2s}
.mk-enter.d3{animation-delay:.34s}.mk-enter.d4{animation-delay:.48s}.mk-enter.d5{animation-delay:.62s}
@keyframes enter{to{opacity:1;transform:none}}
.mk-stage-enter{opacity:0;scale:.86;animation:pop 1.3s cubic-bezier(.16,1,.3,1) .3s forwards}
@keyframes pop{to{opacity:1;scale:1}}

/* gradient text shimmer */
.mk-h2 .g,.mk-stat-n{background-size:220% 100%;animation:shimmer 7s ease-in-out infinite}
@keyframes shimmer{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

/* skill badge stagger + idle bob */
.mk-ic{opacity:0;transform:translateY(18px) scale(.9);
  transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)}
.mk-rv.in .mk-ic{opacity:1;transform:none}
.mk-ic-badge{animation:bob var(--bb,5s) ease-in-out infinite var(--bd,0s)}
@keyframes bob{0%,100%{translate:0 0}50%{translate:0 -5px}}
.mk-ic:hover .mk-ic-badge{animation-play-state:paused}

/* timeline draw-in */
.mk-tl::before{transform-origin:top;animation:draw 1.6s cubic-bezier(.16,1,.3,1) forwards}
@keyframes draw{from{transform:scaleY(0)}to{transform:scaleY(1)}}
.mk-job::before{animation:ping 3.4s ease-out infinite var(--pd,0s)}
@keyframes ping{0%{box-shadow:0 0 0 0 rgba(255,60,190,.5)}70%,100%{box-shadow:0 0 0 12px rgba(255,60,190,0)}}

/* project card tilt */
.mk-proj{transform-style:preserve-3d;will-change:transform}
.mk-proj:hover{transform:none}

/* marquee pause on hover */
.mk-marquee:hover .mk-marquee-track{animation-play-state:paused}

/* link buttons: shine sweeps once on hover, not on a loop */
.mk-link.solid{position:relative;overflow:hidden}
.mk-link.solid::after{content:'';position:absolute;top:0;left:-70%;width:45%;height:100%;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.42),transparent);
  transition:left .75s cubic-bezier(.2,.7,.3,1)}
.mk-link.solid:hover::after{left:130%}

/* ============ CERTIFICATE GRID + LIGHTBOX ============ */
.mk-certhero{display:flex;align-items:center;gap:18px;padding:24px 26px;width:100%;text-align:left;
  cursor:pointer;transition:transform .3s cubic-bezier(.2,.7,.3,1),border-color .3s}
.mk-certhero:hover{transform:translateY(-4px);border-color:rgba(255,255,255,.22)}
.mk-certhero>div:nth-child(2){flex:1;min-width:0}
.mk-certgo{opacity:.35;display:flex;transition:opacity .25s}
.mk-certgo svg{width:17px;height:17px}
.mk-certhero:hover .mk-certgo{opacity:1}

/* lightbox */
.mk-lb{position:fixed;inset:0;z-index:90;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:0;padding:28px;
  background:rgba(4,6,11,.9);backdrop-filter:blur(20px);
  opacity:0;pointer-events:none;transition:opacity .3s ease}
.mk-lb.open{opacity:1;pointer-events:auto}
.mk-lb-img{max-width:min(960px,92vw);max-height:72vh;width:auto;border-radius:14px;
  box-shadow:0 40px 90px -30px rgba(0,0,0,.95);background:#fff;
  transform:scale(.94);opacity:0;
  transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .35s ease}
.mk-lb.open .mk-lb-img{transform:scale(1)}
.mk-lb.open .mk-lb-img.ready{opacity:1}
.mk-lb-meta{transition:opacity .3s ease}
.mk-lb-meta.swap{opacity:.25}
.mk-lb-meta{text-align:center;margin-top:22px;max-width:min(960px,92vw)}
.mk-lb-meta h4{font-family:var(--display);font-weight:700;letter-spacing:-.015em;
  font-size:clamp(16px,2.4vw,21px);margin-bottom:6px}
.mk-lb-meta span{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint)}
.mk-lb-acts{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:20px}
.mk-lb-acts .mk-link{padding:12px 22px;font-size:13.5px;border-radius:999px;
  will-change:transform;transition:transform .3s cubic-bezier(.2,.7,.3,1),
    box-shadow .3s ease,background .3s ease,border-color .3s ease,color .3s ease}
.mk-lb-acts .mk-link.solid{box-shadow:0 10px 30px -14px rgba(255,60,190,.9)}
.mk-lb-acts .mk-link.solid:hover{transform:translateY(-3px);
  box-shadow:0 18px 44px -14px rgba(255,60,190,1)}
.mk-lb-acts .mk-link.solid:active{transform:translateY(-1px)}
.mk-lb-acts .mk-link:not(.solid):hover{transform:translateY(-3px)}
.mk-lb-acts .mk-link svg{width:15px;height:15px}
.mk-lb-nav{position:absolute;top:50%;transform:translateY(-50%);width:46px;height:46px;
  border-radius:50%;display:grid;place-items:center;border:1px solid var(--stroke);
  background:rgba(255,255,255,.06);backdrop-filter:blur(12px);transition:background .25s,border-color .25s}
.mk-lb-nav:hover{background:rgba(255,255,255,.14);border-color:rgba(255,60,190,.5)}
.mk-lb-nav svg{width:18px;height:18px}
.mk-lb-nav.prev{left:20px}
.mk-lb-nav.next{right:20px;transform:translateY(-50%) rotate(180deg)}
.mk-lb-x{position:absolute;top:20px;right:20px;width:46px;height:46px;border-radius:50%;
  display:grid;place-items:center;border:1px solid var(--stroke);font-size:24px;line-height:1;
  background:rgba(255,255,255,.06);backdrop-filter:blur(12px);transition:background .25s}
.mk-lb-x:hover{background:rgba(255,255,255,.14)}
.mk-lb-count{position:absolute;top:28px;left:24px;font-size:12px;letter-spacing:.16em;color:var(--faint)}
@media(max-width:720px){
  .mk-lb{padding:16px}
  .mk-lb-img{max-height:56vh;max-width:96vw}
  .mk-lb-nav{width:42px;height:42px;top:auto;bottom:22px;transform:none}
  .mk-lb-nav.prev{left:calc(50% - 56px)}
  .mk-lb-nav.next{right:calc(50% - 56px);transform:rotate(180deg)}
  .mk-lb-meta{margin-top:16px}
  .mk-lb-acts{margin-top:14px;padding-bottom:64px}
  .mk-lb-count{top:24px;left:20px}
}

/* ============ MOBILE MENU ============ */
.mk-burger{display:none;width:44px;height:44px;border-radius:50%;place-items:center;
  background:rgba(10,12,20,.5);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(14px)}
.mk-burger i{display:block;width:17px;height:1.5px;background:#fff;border-radius:2px;
  transition:transform .3s cubic-bezier(.2,.7,.3,1),opacity .2s}
.mk-burger i+i{margin-top:4.5px}
.mk-burger.open i:nth-child(1){transform:translateY(6px) rotate(45deg)}
.mk-burger.open i:nth-child(2){opacity:0}
.mk-burger.open i:nth-child(3){transform:translateY(-6px) rotate(-45deg)}

.mk-sheet{position:fixed;inset:0;z-index:70;display:flex;flex-direction:column;
  justify-content:center;gap:6px;padding:32px;
  background:rgba(6,9,15,.93);backdrop-filter:blur(26px);
  opacity:0;pointer-events:none;transition:opacity .35s ease}
.mk-sheet.open{opacity:1;pointer-events:auto}
.mk-sheet button{font-family:var(--display);font-weight:700;letter-spacing:-.02em;
  font-size:clamp(30px,9vw,46px);text-align:left;padding:10px 0;
  opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
.mk-sheet.open button{opacity:1;transform:none}
.mk-sheet.open button:nth-child(2){transition-delay:.06s}
.mk-sheet.open button:nth-child(3){transition-delay:.12s}
.mk-sheet.open button:nth-child(4){transition-delay:.18s}
.mk-sheet.open button:nth-child(5){transition-delay:.24s}
.mk-sheet.open button:nth-child(6){transition-delay:.3s}
.mk-sheet .mk-sheetclose{transition-delay:0s}
.mk-sheet button:last-child{color:transparent;
  background:linear-gradient(100deg,var(--pink),var(--violet) 50%,var(--blue));
  -webkit-background-clip:text;background-clip:text}
.mk-sheetclose{position:absolute;top:22px;right:22px;width:44px;height:44px;border-radius:50%;
  display:grid;place-items:center;border:1px solid var(--stroke);font-size:22px;line-height:1}

/* ============ PHONE ============ */
@media(max-width:900px){
  .mk-burger{display:grid}
}
@media(max-width:720px){
  .mk-heroshell{padding:8px}
  .mk-hero{border-radius:26px;min-height:auto}
  .mk-nav{padding:16px 18px}
  .mk-mark{font-size:16px}
  .mk-navcta{display:none}
  .mk-herobody{padding:16px 20px 40px;gap:26px}
  .mk-hero h1{font-size:clamp(38px,11.5vw,58px);line-height:.96}
  .mk-herosub{margin:18px 0 26px;font-size:14.5px;line-height:1.7}
  .mk-heroctas{gap:9px}
  .mk-btn{padding:13px 20px;font-size:13.5px}
  .mk-stage{max-width:min(300px,72vw)}
  .mk-shell{padding:0 18px}
  .mk-h2{margin-bottom:34px}
  .mk-plus{display:none}
  .mk-feature-in{padding:26px 22px;border-radius:24px;gap:26px}
  .mk-featorb{max-width:150px}
  .mk-proj{padding:24px 22px}
  .mk-jcard{padding:22px 20px}
  .mk-jcard:hover{transform:none}
  .mk-form{padding:24px 20px}
  .mk-tl{padding-left:26px}
  .mk-job::before{left:-26px}
  .mk-marquee{padding:16px 0}
  .mk-marquee-track{gap:34px}
  .mk-marquee span{font-size:13px;gap:34px}
  .mk-footer{flex-direction:column;gap:6px;text-align:center;justify-content:center}
  .mk-amb i{filter:blur(90px);opacity:.5}
}
@media(max-width:420px){
  .mk-iconrow{grid-template-columns:repeat(3,1fr);gap:24px 10px}
  .mk-ic-badge{width:56px;height:56px}
  .mk-ic-badge svg{width:24px;height:24px}
  .mk-ic-l{font-size:10.5px}
  .mk-stat{padding:20px 18px}
  .mk-stat-n{font-size:30px}
  .mk-links{gap:7px}
  .mk-link{padding:9px 13px;font-size:12px}
}

/* touch devices: no hover effects, lighter blur, bigger tap targets */
@media(hover:none){
  .mk-proj:hover,.mk-jcard:hover,.mk-certhero:hover,.mk-feature:hover{transform:none}
  .mk-glass::after,.mk-feature-in::after{display:none}
  .mk-glass{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
  .mk-btn,.mk-link,.mk-pill{min-height:44px}
  .mk-stars i:nth-child(n+24){display:none}
}

/* safe-area for notched phones */
@supports(padding:env(safe-area-inset-bottom)){
  .mk-footer{padding-bottom:calc(32px + env(safe-area-inset-bottom))}
  .mk-sheet{padding-bottom:calc(32px + env(safe-area-inset-bottom))}
}

/* ============ reveal + a11y ============ */
.mk-rv{opacity:0;transform:translateY(30px);
  transition:opacity .85s cubic-bezier(.2,.7,.3,1),transform .85s cubic-bezier(.2,.7,.3,1)}
.mk-rv.in{opacity:1;transform:none}
.mk :focus-visible{outline:2px solid var(--cyan);outline-offset:3px;border-radius:8px}
@media(prefers-reduced-motion:reduce){
  .mk *,.mk *::before,.mk *::after{animation:none!important;transition-duration:.01ms!important}
  .mk-rv,.mk-ic,.mk-enter,.mk-stage-enter{opacity:1!important;transform:none!important}
  .mk-stage,.mk-orb{transform:none!important;translate:none!important;scale:none!important}
  .mk-progress{display:none}
}
`;

/* ============================================================
   Icon marks
   ============================================================ */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const V = (c) => <svg viewBox="0 0 24 24">{c}</svg>;

const ICONS = {
  python: V(<>
    <path {...S} d="M12 3c-3 0-4 1.2-4 3v2h4" />
    <path {...S} d="M8 8H6.5C4.6 8 4 9.4 4 12s.6 4 2.5 4H8v-3c0-1.5.9-2.5 2.5-2.5H14c1.4 0 2-.8 2-2V6c0-1.8-1.4-3-4-3" />
    <path {...S} d="M16 16h1.5C19.4 16 20 14.6 20 12s-.6-4-2.5-4H16v3c0 1.5-.9 2.5-2.5 2.5H10c-1.4 0-2 .8-2 2V18c0 1.8 1.4 3 4 3s4-1.2 4-3v-2" />
    <circle cx="10" cy="5.6" r=".8" fill="currentColor" /><circle cx="14" cy="18.4" r=".8" fill="currentColor" />
  </>),
  js: V(<>
    <rect {...S} x="3" y="3" width="18" height="18" rx="4" />
    <path {...S} d="M10 9v5.5c0 1-.6 1.5-1.5 1.5S7 15.5 7 14.8" />
    <path {...S} d="M17 10.2c-.3-.8-1-1.2-1.9-1.2-1 0-1.7.5-1.7 1.4 0 2 3.8 1.2 3.8 3.4 0 1.2-1 1.8-2.1 1.8-1.1 0-1.9-.5-2.2-1.4" />
  </>),
  dart: V(<>
    <path {...S} d="M4 13.5 13.5 4l6.5 6.5V20H10.5z" /><path {...S} d="M13.5 4 4 13.5" /><path {...S} d="M10.5 20 4 13.5" />
  </>),
  flutter: V(<>
    <path {...S} d="M14.5 3 6 11.5 9.5 15l11-12z" /><path {...S} d="M14.5 12.5 9.5 17.5 13 21h7.5l-4.8-4.8" />
  </>),
  sql: V(<>
    <ellipse {...S} cx="12" cy="6" rx="7" ry="3" />
    <path {...S} d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /><path {...S} d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
  </>),
  java: V(<>
    <path {...S} d="M9 4c-1.5 1.6 1.5 2.6 1.5 4S9 10.5 9 10.5" />
    <path {...S} d="M13 5.5c-1 1 .8 1.8.8 2.8 0 .8-.8 1.4-.8 1.4" />
    <path {...S} d="M6 13c0 1.5 2.7 2.2 6 2.2s6-.7 6-2.2" /><path {...S} d="M7 17c0 1.3 2.2 2 5 2s5-.7 5-2" />
  </>),
  cpp: V(<>
    <path {...S} d="M14.5 8.8A4 4 0 1 0 14.5 15.2" /><path {...S} d="M18 10v4M16 12h4" />
    <path {...S} d="M3.5 8.4 12 3.6l8.5 4.8v9.2L12 22.4 3.5 17.6z" opacity=".4" />
  </>),
  react: V(<>
    <circle cx="12" cy="12" r="1.9" fill="currentColor" />
    <ellipse {...S} cx="12" cy="12" rx="9.4" ry="3.8" />
    <ellipse {...S} cx="12" cy="12" rx="9.4" ry="3.8" transform="rotate(60 12 12)" />
    <ellipse {...S} cx="12" cy="12" rx="9.4" ry="3.8" transform="rotate(120 12 12)" />
  </>),
  flask: V(<>
    <path {...S} d="M9.5 3h5M10.5 3v6L5.5 18c-.8 1.4.2 3 1.8 3h9.4c1.6 0 2.6-1.6 1.8-3l-5-9V3" />
    <path {...S} d="M7.6 14h8.8" />
  </>),
  fastapi: V(<>
    <circle {...S} cx="12" cy="12" r="9" /><path {...S} d="M12.8 6.5 8.5 13h3.4l-.7 4.5L16 11h-3.6z" />
  </>),
  django: V(<>
    <path {...S} d="M14 3v18c-4 .6-7-1.6-7-5.6S9.5 8.6 14 9.4" /><path {...S} d="M18 8v7M18 4.2v.6" />
  </>),
  node: V(<>
    <path {...S} d="M12 2.6 21 7.6v9l-9 5-9-5v-9z" />
    <path {...S} d="M9 15c0 .9.9 1.4 2.2 1.4 1.6 0 2.4-.7 2.4-1.7 0-2.4-4.4-1-4.4-3.2 0-1 .9-1.6 2.2-1.6 1.2 0 2 .5 2.2 1.3" />
  </>),
  git: V(<>
    <circle {...S} cx="6" cy="18" r="2.4" /><circle {...S} cx="6" cy="6" r="2.4" /><circle {...S} cx="18" cy="10" r="2.4" />
    <path {...S} d="M6 8.4v7.2" /><path {...S} d="M18 12.4c0 3.3-2.7 4.6-5.2 5" /><path {...S} d="M8.3 7.1 15.7 8.9" />
  </>),
  aws: V(<>
    <path {...S} d="M7.5 12.5c0-2.5 2-4.5 4.5-4.5 1.8 0 3.4 1.1 4.1 2.7 1.9.1 3.4 1.7 3.4 3.6 0 2-1.6 3.7-3.6 3.7H8.2C6.2 18 4.6 16.4 4.6 14.4c0-1.6 1-2.9 2.4-3.4" />
    <path {...S} d="M3 20.6c3 1.6 6.1 2.4 9 2.4s6-.8 9-2.4" opacity=".5" />
  </>),
  docker: V(<>
    <path {...S} d="M4 12h13v3.2c0 2.1-1.7 3.8-3.8 3.8H8.5C6 19 4 17 4 14.5z" />
    <path {...S} d="M7 12V9.4h2.6V12M10.4 12V9.4H13V12M10.4 8.6V6h2.6v2.6" />
    <path {...S} d="M17 13.4c1.6-1 3.2-.7 4 .2-.5 1.6-2 2.3-3.6 2" />
  </>),
  linux: V(<>
    <path {...S} d="M9.5 4.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v3.2c1.8 2 3 4.2 3.4 6.6.3 1.9-1 3.7-3 4.2a13 13 0 0 1-5.8 0c-2-.5-3.3-2.3-3-4.2.4-2.4 1.6-4.6 3.4-6.6z" />
    <circle cx="10.6" cy="5.6" r=".8" fill="currentColor" /><circle cx="13.4" cy="5.6" r=".8" fill="currentColor" />
    <path {...S} d="M10.8 8.6c.8.7 1.6.7 2.4 0" />
  </>),
  terminal: V(<>
    <rect {...S} x="2.5" y="4" width="19" height="16" rx="3" /><path {...S} d="M7 9.5 10 12l-3 2.5M12.5 15H17" />
  </>),
  shield: V(<>
    <path {...S} d="M12 2.7 20 6v6.2c0 4.6-3.2 7.9-8 9.1-4.8-1.2-8-4.5-8-9.1V6z" /><path {...S} d="M9 12.2l2.2 2.2L15.4 10" />
  </>),
  radar: V(<>
    <circle {...S} cx="12" cy="12" r="9" /><circle {...S} cx="12" cy="12" r="5" opacity=".6" />
    <path {...S} d="M12 12 18 7.5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" />
  </>),
  wave: V(<path {...S} d="M2.5 12h3l2-6 3 13 2.5-9 2 5 2-3h4.5" />),
  chart: V(<><path {...S} d="M3.5 20h17" /><path {...S} d="M7 20v-6M12 20V6M17 20v-9" /></>),
  network: V(<>
    <rect {...S} x="9" y="2.6" width="6" height="5" rx="1.6" />
    <rect {...S} x="2.5" y="16.4" width="6" height="5" rx="1.6" />
    <rect {...S} x="15.5" y="16.4" width="6" height="5" rx="1.6" />
    <path {...S} d="M12 7.6v4.6M5.5 16.4V12h13v4.4" />
  </>),
  globe: V(<>
    <circle {...S} cx="12" cy="12" r="9" /><path {...S} d="M3.2 9.5h17.6M3.2 14.5h17.6" />
    <path {...S} d="M12 3c-4.6 5-4.6 13 0 18 4.6-5 4.6-13 0-18z" />
  </>),
  bug: V(<>
    <rect {...S} x="8" y="7.5" width="8" height="11" rx="4" />
    <path {...S} d="M9.5 7.5V6a2.5 2.5 0 0 1 5 0v1.5" />
    <path {...S} d="M8 11H4.5M16 11h3.5M8 15H4.5M16 15h3.5M8 18l-2.5 2M16 18l2.5 2" />
  </>),
  cloud: V(<path {...S} d="M7.5 18.5A4.5 4.5 0 0 1 7 9.6a5.5 5.5 0 0 1 10.4 1.6A3.7 3.7 0 0 1 17 18.5z" />),
  api: V(<><path {...S} d="M12 3.2 20 7.6v8.8L12 20.8 4 16.4V7.6z" /><path {...S} d="M8.5 12h7M12 8.5v7" opacity=".7" /></>),
  key: V(<><circle {...S} cx="8" cy="12" r="4" /><path {...S} d="M12 12h9M18 12v3M15.5 12v2.2" /></>),
  server: V(<>
    <rect {...S} x="3" y="3.5" width="18" height="7" rx="2" /><rect {...S} x="3" y="13.5" width="18" height="7" rx="2" />
    <path {...S} d="M6.6 7h.01M6.6 17h.01" />
  </>),
  award: V(<><circle {...S} cx="12" cy="9" r="5.5" /><path {...S} d="m8.4 13.6-1.4 7 5-2.6 5 2.6-1.4-7" /></>),
  mail: V(<><rect {...S} x="2.5" y="4.5" width="19" height="15" rx="3" /><path {...S} d="m3.5 7 8.5 6 8.5-6" /></>),
  phone: V(<path {...S} d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2C11.6 19 5 12.4 4.5 5.7a2 2 0 0 1 2-2.2z" />),
  pin: V(<><path {...S} d="M12 21.5s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle {...S} cx="12" cy="10.3" r="2.6" /></>),
  send: V(<path {...S} d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8z" />),
  download: V(<>
    <path {...S} d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5" /><path {...S} d="M4 17.5v1.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5" />
  </>),
  arrow: V(<path {...S} d="M5 12h14M13 6l6 6-6 6" />),
  chevron: V(<path {...S} d="M15 5l-7 7 7 7" />),
  check: V(<><circle {...S} cx="12" cy="12" r="9" /><path {...S} d="M8.2 12.3l2.6 2.6 5-5.4" /></>),
  expand: V(<><path {...S} d="M15 3h6v6" /><path {...S} d="M9 21H3v-6" /><path {...S} d="M21 3l-7.5 7.5M3 21l7.5-7.5" /></>),
  github: V(<path {...S} d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />),
  external: V(<><path {...S} d="M14 4h6v6" /><path {...S} d="M20 4 10.5 13.5" /><path {...S} d="M19 14.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4.5" /></>),
};

/* ============================================================
   Content
   ============================================================ */
const TICKER = [
  "Python", "FastAPI", "Flutter", "React", "Flask", "Linux",
  "Penetration Testing", "AWS", "SOC Monitoring", "Dart", "Docker", "REST APIs",
];

const SKILLS = [
  { group: "Cybersecurity & networking", items: [
    { k: "radar", l: "SOC Monitoring" }, { k: "bug", l: "Penetration Testing" },
    { k: "shield", l: "Incident Response" }, { k: "chart", l: "Splunk" },
    { k: "wave", l: "Wireshark" }, { k: "terminal", l: "Nmap" },
    { k: "linux", l: "Kali Linux" }, { k: "network", l: "TCP/IP" },
    { k: "globe", l: "DNS" }, { k: "award", l: "GRC" },
  ]},
  { group: "Cloud & infrastructure", items: [
    { k: "aws", l: "AWS" }, { k: "server", l: "Hetzner Cloud" },
    { k: "key", l: "Google OAuth" }, { k: "api", l: "REST APIs" },
    { k: "docker", l: "Docker" }, { k: "git", l: "Git" },
    { k: "cloud", l: "Render" }, { k: "terminal", l: "Nginx" },
  ]},
  { group: "Languages", items: [
    { k: "python", l: "Python" }, { k: "js", l: "JavaScript" }, { k: "dart", l: "Dart" },
    { k: "sql", l: "SQL" }, { k: "java", l: "Java" }, { k: "cpp", l: "C++" },
  ]},
  { group: "Frameworks & tools", items: [
    { k: "fastapi", l: "FastAPI" }, { k: "flask", l: "Flask" }, { k: "flutter", l: "Flutter" },
    { k: "react", l: "React" }, { k: "django", l: "Django" }, { k: "node", l: "Node.js" },
  ]},
];

const JOBS = [
  { title: "Technical Support Specialist", date: "2026 — Present", co: "Estarta — Amman, Jordan",
    points: ["Frontline technical support across infrastructure and application issues for enterprise users."] },
  { title: "IT Infrastructure Trainee", date: "Mar 2026 — May 2026", co: "Kaizen 365 — Amman, Jordan",
    points: [
      "8-week field training across cloud, server administration, and virtualization.",
      "Maintained networking, backup, and recovery systems in a live production environment.",
      "Provided IT helpdesk support, diagnosing end-user hardware and software issues.",
    ] },
  { title: "Cybersecurity Intern", date: "Jun 2025 — Sep 2025", co: "IT Security C&T — Amman, Jordan",
    points: [
      "Conducted SOC monitoring and network defense operations.",
      "Performed ethical hacking and vulnerability assessments.",
      "Hands-on work in digital forensics and GRC.",
    ] },
  { title: "Customer Support Representative", date: "Feb 2022 — Jun 2022", co: "CRYSTEL — Amman, Jordan",
    points: ["Handled high-volume inquiries in a fast-paced call center environment."] },
  { title: "PC Technician", date: "2021 — 2022", co: "Saqer — Amman, Jordan",
    points: ["Diagnosed and repaired hardware faults across desktops and laptops — GPUs, RAM, motherboards."] },
];

const FEATURED = {
  name: "Dar Alfeneq",
  live: "https://alfeneq.com/",
  desc: "A publishing house in Amman needed more than a brochure site — a catalogue people could actually browse, on any device. Built the app in Flutter and the backend in Python, then deployed and maintained it on my own infrastructure.",
  stack: ["Flutter", "Python", "REST API", "Nginx", "Hetzner"],
};

const PROJECTS = [
  { name: "StegLens",
    desc: "Steganography analysis tool — inspects images for hidden payloads and reports what's buried in the bits.",
    stack: ["Python", "Flask", "Security"],
    repo: "https://github.com/steglens/Steg-Lens" },
  { name: "MacroFlow",
    desc: "Automation utility that collapses repetitive desktop work into a single trigger.",
    stack: ["Python", "Automation"],
    live: "https://macroflow.info/",
    repo: "https://github.com/wmalikkh/MacroFlow" },
];

/* Certificate images live in public/certs/full/<slug>.jpg */
const CERTS = [
  {
    slug: "ibm-full-stack-software",
    title: "IBM Full Stack Software Developer",
    by: "IBM · Coursera",
    meta: "Professional Certificate — 15 courses",
    verify: "https://coursera.org/verify/professional-cert/MKA646XTG458",
  },
  {
    slug: "google-it-support",
    title: "Google IT Support",
    by: "Google · Coursera",
    meta: "Professional Certificate — 5 courses",
    verify: "https://coursera.org/verify/professional-cert/1F1QCI0S8BT1",
  },
];

const grad = (a, b) => ({
  background: `linear-gradient(100deg,${a},${b})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
});

/* ============================================================
   Motion hooks
   ============================================================ */
const reduced = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
   window.matchMedia("(hover: none)").matches);

/* thin gradient bar tracking scroll depth */
function useScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return pct;
}

/* -1..1 pointer position, published as --px / --py on the hero */
function usePointer(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty("--px", 0);
      el.style.setProperty("--py", 0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref]);
}

/* cursor spotlight coordinates on every glass surface */
function useSpotlight() {
  useEffect(() => {
    if (reduced()) return;
    const onMove = (e) => {
      const card = e.target.closest?.(".mk-glass, .mk-feature-in");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}

/* 3D tilt toward the cursor */
function useTilt(ref, max = 7) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateY(-6px)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, max]);
}

/* buttons that lean toward the cursor */
function useMagnetic() {
  useEffect(() => {
    if (reduced()) return;
    const nodes = Array.from(document.querySelectorAll(".mk-btn, .mk-navcta"));
    const move = (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.28;
      const y = (e.clientY - r.top - r.height / 2) * 0.4;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    };
    const leave = (e) => { e.currentTarget.style.transform = ""; };
    nodes.forEach((n) => {
      n.addEventListener("pointermove", move);
      n.addEventListener("pointerleave", leave);
    });
    return () => nodes.forEach((n) => {
      n.removeEventListener("pointermove", move);
      n.removeEventListener("pointerleave", leave);
    });
  }, []);
}

/* number that counts up once it scrolls into view */
function CountUp({ to, suffix = "", style }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) { setN(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const dur = 1400, t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <div ref={ref} className="mk-stat-n" style={style}>{n}{suffix}</div>;
}

/* drifting starfield */
const Stars = () => {
  const dots = React.useMemo(
    () => Array.from({ length: typeof window !== "undefined" && window.innerWidth < 720 ? 22 : 46 }, (_, i) => ({
      i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.2 + 0.8,
      tw: (Math.random() * 5 + 4).toFixed(1),
      rs: (Math.random() * 20 + 22).toFixed(1),
      td: (Math.random() * 10).toFixed(1),
    })), []);
  return (
    <div className="mk-stars">
      {dots.map((d) => (
        <i key={d.i} style={{
          left: `${d.left}%`, top: `${d.top}%`,
          width: `${d.size}px`, height: `${d.size}px`,
          "--tw": `${d.tw}s`, "--rs": `${d.rs}s`, "--td": `${d.td}s`,
        }} />
      ))}
    </div>
  );
};

/* ============================================================
   Helpers
   ============================================================ */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`mk-rv ${seen ? "in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const TiltCard = ({ children }) => {
  const ref = useRef(null);
  useTilt(ref);
  return <div ref={ref} className="mk-glass mk-proj">{children}</div>;
};

const ProjectLinks = ({ live, repo, featured }) => {
  if (!live && !repo) return null;
  return (
    <div className="mk-links">
      {live && (
        <a className={`mk-link${featured ? " solid" : ""}`} href={live} target="_blank" rel="noreferrer">
          {ICONS.external} Visit site
        </a>
      )}
      {repo && (
        <a className="mk-link" href={repo} target="_blank" rel="noreferrer">
          {ICONS.github} Source
        </a>
      )}
    </div>
  );
};

const Badge = ({ k, l, i = 0 }) => (
  <div className="mk-ic" style={{ transitionDelay: `${i * 55}ms` }}>
    <div className="mk-ic-badge" style={{ "--bd": `${(i * 0.37) % 3}s`, "--bb": `${4.4 + (i % 4) * 0.6}s` }}>
      {ICONS[k]}
    </div>
    <div className="mk-ic-l">{l}</div>
  </div>
);

/* ============================================================
   Page
   ============================================================ */
export default function Portfolio() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cert, setCert] = useState(null);
  const [imgReady, setImgReady] = useState(false);
  const heroRef = useRef(null);

  const progress = useScrollProgress();

  useEffect(() => {
    document.body.style.overflow = menu || cert ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu, cert]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setMenu(false); setCert(null); }
      if (!cert) return;
      if (e.key === "ArrowRight") stepCert(1);
      if (e.key === "ArrowLeft") stepCert(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cert]);

  useEffect(() => {
    if (!cert) return;
    setImgReady(false);
    const i = CERTS.findIndex((c) => c.slug === cert.slug);
    [1, -1].forEach((d) => {
      const n = CERTS[(i + d + CERTS.length) % CERTS.length];
      const img = new Image();
      img.src = `certs/full/${n.slug}.jpg`;
    });
  }, [cert]);

  const stepCert = (dir) => {
    if (!cert) return;
    const i = CERTS.findIndex((c) => c.slug === cert.slug);
    setCert(CERTS[(i + dir + CERTS.length) % CERTS.length]);
  };

  usePointer(heroRef);
  useSpotlight();
  useMagnetic();

  const go = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const send = () => {
    const subject = encodeURIComponent(`Portfolio message from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.msg}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:Malik.khelfah.it@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const nav = [["about", "About"], ["skills", "Skills"], ["experience", "Experience"], ["work", "Work"]];

  return (
    <div className="mk">
      <style>{CSS}</style>

      <div className="mk-progress" style={{ "--sp": `${progress}%` }} />

      <div className={`mk-sheet${menu ? " open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!menu}>
        <button className="mk-sheetclose" aria-label="Close menu" onClick={() => setMenu(false)}>×</button>
        {nav.map(([id, l]) => <button key={id} onClick={() => go(id)}>{l}</button>)}
        <button onClick={() => go("contact")}>Let's talk</button>
      </div>
      <div
        className={`mk-lb${cert ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!cert}
        onClick={() => setCert(null)}
      >
        {cert && (
          <>
            <div className="mk-lb-count">
              {String(CERTS.findIndex((c) => c.slug === cert.slug) + 1).padStart(2, "0")} / {CERTS.length}
            </div>
            <button className="mk-lb-x" aria-label="Close" onClick={() => setCert(null)}>×</button>
            <button
              className="mk-lb-nav prev" aria-label="Previous certificate"
              onClick={(e) => { e.stopPropagation(); stepCert(-1); }}
            >{ICONS.chevron}</button>
            <button
              className="mk-lb-nav next" aria-label="Next certificate"
              onClick={(e) => { e.stopPropagation(); stepCert(1); }}
            >{ICONS.chevron}</button>

            <img
              key={cert.slug}
              className={`mk-lb-img${imgReady ? " ready" : ""}`}
              src={`certs/full/${cert.slug}.jpg`}
              alt={cert.title}
              onLoad={() => setImgReady(true)}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mk-lb-meta" onClick={(e) => e.stopPropagation()}>
              <h4>{cert.title}</h4>
              <span>{cert.meta || cert.by}</span>
              <div className="mk-lb-acts">
                {cert.verify && (
                  <a className="mk-link solid" href={cert.verify} target="_blank" rel="noreferrer">
                    {ICONS.check} Verify on Coursera
                  </a>
                )}
                <button className="mk-link" onClick={() => setCert(null)}>Close</button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mk-amb"><i /><i /><i /></div>
      <Stars />

      <div className="mk-wrap">
        {/* ============ HERO ============ */}
        <div className="mk-heroshell">
          <header className="mk-hero" ref={heroRef}>
            <div className="mk-hero-noise" />

            <nav className="mk-nav">
              <div className="mk-mark">malik<b>.khelfah</b></div>
              <div className="mk-navlinks">
                {nav.map(([id, l]) => <button key={id} onClick={() => go(id)}>{l}</button>)}
              </div>
              <button className="mk-navcta" onClick={() => go("contact")}>Let's talk</button>
              <button
                className={`mk-burger${menu ? " open" : ""}`}
                aria-label="Open menu"
                aria-expanded={menu}
                onClick={() => setMenu((m) => !m)}
              >
                <i /><i /><i />
              </button>
            </nav>

            <div className="mk-herobody">
              <div>
                <div className="mk-kicker mk-enter">Amman, Jordan</div>
                <h1>
                  <span className="mk-enter d1" style={{ display: "block" }}>Full stack</span>
                  <span className="mk-enter d2" style={{ display: "block" }}>developer</span>
                  <em className="mk-enter d3" style={{ display: "block" }}>&amp; security analyst</em>
                </h1>
                <p className="mk-herosub mk-enter d4">
                  I build the thing, then I try to break it. APIs in Python, apps in Flutter and React,
                  infrastructure I run myself — designed on the assumption that someone is already probing it.
                </p>
                <div className="mk-heroctas mk-enter d5">
                  <button className="mk-btn mk-btn-solid" onClick={() => go("work")}>
                    See the work {ICONS.arrow}
                  </button>
                  <a className="mk-btn mk-btn-clear" href="/Malik-Khelfah-CV.pdf" download>
                    {ICONS.download} Download CV
                  </a>
                </div>
              </div>

              <div className="mk-stage mk-stage-enter">
                <div className="mk-halo h3" /><div className="mk-halo h2" /><div className="mk-halo" />
                <div className="mk-portal" /><div className="mk-portal2" />
                <div className="mk-pool" />
                <div className="mk-shadowpool" />
                <div className="mk-orb white" />
                <div className="mk-orb dark" />
                <div className="mk-orb mini" />
                <div className="mk-orb mini2" />
              </div>
            </div>

          </header>
        </div>

        {/* ============ TICKER ============ */}
        <div className="mk-marquee">
          <div className="mk-marquee-track">
            {[0, 1].map((n) => (
              <span key={n}>{TICKER.map((t) => <React.Fragment key={t}>{t}</React.Fragment>).reduce((a, b) => <>{a}<em style={{ opacity: .3, fontStyle: "normal" }}>◆</em>{b}</>)}</span>
            ))}
          </div>
        </div>

        {/* ============ ABOUT ============ */}
        <section id="about" className="mk-shell mk-section">
          <Reveal>
            <div className="mk-eyebrow">About</div>
            <h2 className="mk-h2">
              I build things<br />that <span className="g">ship</span>
              <span className="mk-plus a">+</span>
            </h2>
          </Reveal>
          <div className="mk-about">
            <Reveal>
              <div>
                <p>
                  I'm a full stack developer. Python and FastAPI on the back end, Flutter for mobile,
                  React on the web — and the whole path from an empty repo to something running on a
                  server with a domain pointed at it.
                </p>
                <p>
                  Most of what I know came from building. Dar Alfeneq is a Flutter client over a Python
                  API, live and in use by a publishing house in Amman. StegLens started as a question
                  about what hides inside an image file and turned into a working analysis tool.
                  MacroFlow exists because I got tired of repeating myself. I taught myself Flutter
                  the same way — by needing it for something real.
                </p>
                <p>
                  The security background is what makes me a careful developer rather than a fast one.
                  Penetration testing teaches you to treat every input as hostile and assume your server
                  will be found, so auth, validation, and error handling stop being afterthoughts. It's a
                  lens on how I write code, not a separate career.
                </p>
                <p>
                  Twenty-three Coursera certificates and a B.Sc. behind me, currently at Estarta —
                  and still shipping side projects at night.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="mk-stats">
                <div className="mk-glass mk-stat"><CountUp to={23} style={grad("#FF3CBE", "#25AAF6")} /><div className="mk-stat-l">Certificates</div></div>
                <div className="mk-glass mk-stat"><CountUp to={3} style={grad("#A76BFF", "#3EE2F5")} /><div className="mk-stat-l">Shipped projects</div></div>
                <div className="mk-glass mk-stat"><CountUp to={6} style={grad("#3EE2F5", "#FF3CBE")} /><div className="mk-stat-l">Languages</div></div>
                <div className="mk-glass mk-stat"><div className="mk-stat-n" style={grad("#FF3CBE", "#A76BFF")}>B.Sc.</div><div className="mk-stat-l">Cyber &amp; Cloud</div></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ SKILLS ============ */}
        <section id="skills" className="mk-shell mk-section">
          <Reveal>
            <div className="mk-eyebrow">Toolkit</div>
            <h2 className="mk-h2">
              <span className="mk-plus b">+</span>
              What I <span className="g">work with</span>
            </h2>
          </Reveal>
          {SKILLS.map((g, i) => (
            <Reveal key={g.group} delay={i * 70}>
              <div className="mk-sgroup">
                <h3>{g.group}</h3>
                <div className="mk-iconrow">
                  {g.items.map((it, n) => <Badge key={g.group + it.l} k={it.k} l={it.l} i={n} />)}
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section id="experience" className="mk-shell mk-section">
          <Reveal>
            <div className="mk-eyebrow">Experience</div>
            <h2 className="mk-h2">Where I've <span className="g">been</span><span className="mk-plus a">+</span></h2>
          </Reveal>
          <div className="mk-tl">
            {JOBS.map((j, i) => (
              <Reveal key={j.title} delay={i * 60}>
                <div className="mk-job" style={{ "--pd": `${i * 0.45}s` }}>
                  <div className="mk-glass mk-jcard">
                    <div className="mk-jhead">
                      <div className="mk-jt">{j.title}</div>
                      <div className="mk-jd">{j.date}</div>
                    </div>
                    <div className="mk-jc">{j.co}</div>
                    <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ WORK ============ */}
        <section id="work" className="mk-shell mk-section">
          <Reveal>
            <div className="mk-eyebrow">Selected work</div>
            <h2 className="mk-h2">Things I <span className="g">built</span></h2>
          </Reveal>

          <Reveal>
            <div className="mk-feature">
              <div className="mk-feature-in">
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div className="mk-featnum">01 — Featured</div>
                  <h3>{FEATURED.name}</h3>
                  <p>{FEATURED.desc}</p>
                  <div className="mk-stack">
                    {FEATURED.stack.map((s) => <span key={s} className="mk-chip">{s}</span>)}
                  </div>
                  <ProjectLinks live={FEATURED.live} repo={FEATURED.repo} featured />
                </div>
                <div className="mk-featorb">
                  <div className="ring" /><div className="ring b" /><div className="core" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mk-projects">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <TiltCard>
                  <div className="mk-projnum">{String(i + 2).padStart(2, "0")}</div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="mk-stack">{p.stack.map((s) => <span key={s} className="mk-chip">{s}</span>)}</div>
                  <ProjectLinks live={p.live} repo={p.repo} />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ CERTIFICATES ============ */}
        <section className="mk-shell mk-section">
          <Reveal>
            <div className="mk-eyebrow">Credentials</div>
            <h2 className="mk-h2">Certified, <span className="g">and then some</span></h2>
          </Reveal>
          <Reveal>
            <div className="mk-certtop">
              {CERTS.map((c) => (
                <button key={c.slug} className="mk-glass mk-certhero" onClick={() => setCert(c)}>
                  <div className="mk-seal">{c.slug.startsWith("ibm") ? ICONS.award : ICONS.shield}</div>
                  <div>
                    <h4>{c.title}</h4>
                    <span>{c.meta}</span>
                  </div>
                  <div className="mk-certgo">{ICONS.expand}</div>
                </button>
              ))}
            </div>
            <p className="mk-note">Tap either certificate to view it full size.</p>
          </Reveal>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="mk-shell mk-section">
          <Reveal>
            <div className="mk-eyebrow">Get in touch</div>
            <h2 className="mk-h2">If you want to<br /><span className="g">build something</span><span className="mk-plus a">+</span></h2>
          </Reveal>
          <div className="mk-contact">
            <Reveal>
              <div>
                <div className="mk-pills">
                  <a className="mk-pill" href="mailto:Malik.khelfah.it@gmail.com">{ICONS.mail} Malik.khelfah.it@gmail.com</a>
                  <a className="mk-pill" href="tel:+962792554445">{ICONS.phone} +962 79 255 4445</a>
                  <div className="mk-pill">{ICONS.pin} Amman, Jordan</div>
                </div>
                <div className="mk-social">
                  <a href="https://github.com/wmalikkh" target="_blank" rel="noreferrer">GitHub</a>
                  <a href="https://www.linkedin.com/in/malik-khelfah" target="_blank" rel="noreferrer">LinkedIn</a>
                  <a href="https://malikk.xyz">malikk.xyz</a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={110}>
              <div className="mk-glass mk-form">
                <div className="mk-flabel">Send a message</div>
                <div className="mk-frow">
                  <input className="mk-in" placeholder="Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input className="mk-in" type="email" placeholder="Email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <textarea className="mk-ta" placeholder="What are you building?" value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })} />
                <button className="mk-btn mk-btn-grad" onClick={send}>{ICONS.send} Send message</button>
                {sent && <p className="mk-sent">Opening your mail app — hit send there and it's on its way.</p>}
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="mk-shell mk-footer">
          <span>© {new Date().getFullYear()} Malik Khelfah</span>
          <span>Built with React — Amman, Jordan</span>
        </footer>
      </div>
    </div>
  );
}
