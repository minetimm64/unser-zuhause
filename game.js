'use strict';
const GW=896,GH=504;

// ISO ENGINE — Room: 9 wide x 7 deep x 3 tall (world units)
let OX=417,OY=147;
const IX=34,IY=17,IZ=36;
const I=(x,y,z=0)=>({x:OX+(x-y)*IX,y:OY+(x+y)*IY-z*IZ});
const fp=(g,col,pts,a=1)=>{g.fillStyle(col,a);g.fillPoints(pts,true);};

function box(g,wx,wy,wz,sw,sd,sh,lC,fC,tC){
  const[x1,y1,z1]=[wx+sw,wy+sd,wz+sh];
  fp(g,lC,[I(wx,wy,wz),I(wx,y1,wz),I(wx,y1,z1),I(wx,wy,z1)]);
  fp(g,fC,[I(wx,y1,wz),I(x1,y1,wz),I(x1,y1,z1),I(wx,y1,z1)]);
  fp(g,tC,[I(wx,wy,z1),I(x1,wy,z1),I(x1,y1,z1),I(wx,y1,z1)]);
}
const wL=(g,col,wx,y0,y1,z0,z1,a=1)=>fp(g,col,[I(wx,y0,z0),I(wx,y1,z0),I(wx,y1,z1),I(wx,y0,z1)],a);
const wB=(g,col,wy,x0,x1,z0,z1,a=1)=>fp(g,col,[I(x0,wy,z0),I(x1,wy,z0),I(x1,wy,z1),I(x0,wy,z1)],a);
const hP=(g,col,x0,y0,x1,y1,wz=0,a=1)=>fp(g,col,[I(x0,y0,wz),I(x1,y0,wz),I(x1,y1,wz),I(x0,y1,wz)],a);
function roomBox(g,wLc,wRc,fl){
  fp(g,wRc,[I(0,0,0),I(9,0,0),I(9,0,3),I(0,0,3)]);
  fp(g,wLc,[I(0,0,0),I(0,7,0),I(0,7,3),I(0,0,3)]);
  fp(g,fl, [I(0,0,0),I(9,0,0),I(9,7,0),I(0,7,0)]);
}
function planks(g,col){
  g.lineStyle(1,col,0.28);
  for(let y=0.5;y<7;y+=0.5){const a=I(0,y,0),b=I(9,y,0);g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.strokePath();}
}
function plantAt(g,sx,sy,col,sc=8){
  const s=sc/8;
  g.fillStyle(0xA04020);g.fillRect(sx-9*s,sy,18*s,12*s);
  g.fillStyle(0xC05030);g.fillRect(sx-11*s,sy-3*s,22*s,5*s);
  g.fillStyle(0x3A2010);g.fillRect(sx-8*s,sy,16*s,4*s);
  g.fillStyle(col);
  g.fillRect(sx-12*s,sy-18*s,8*s,20*s);
  g.fillRect(sx-5*s,sy-25*s,10*s,27*s);
  g.fillRect(sx+3*s,sy-16*s,8*s,18*s);
  g.fillStyle(0x1A6820,0.35);
  g.fillRect(sx-12*s,sy-10*s,8*s,3*s);
  g.fillRect(sx+3*s,sy-8*s,8*s,3*s);
}

// Generic frosted-glass door — fixed X plane (like a left/right wall)
function drawDoorX(g,wx,y0,y1,z1){
  z1=z1||1.88;
  wL(g,0xF4F2EE,wx,y0,y1,0,z1);
  wL(g,0xC8C4B8,wx,y0,y1,0,0.04);
  wL(g,0xB8CED8,wx,y0+0.1,y1-0.1,0.1,z1-0.1,0.78);
  for(let ry=y0+0.11;ry<y1-0.12;ry+=0.135){wL(g,0xFFFFFF,wx,ry,ry+0.062,0.11,z1-0.11,0.32);}
  wL(g,0xFFFFFF,wx,y0+0.11,y0+0.30,0.12,z1*0.55,0.18);
  wL(g,0xD8D4CC,wx,y0,y0+0.1,0,z1);wL(g,0xD8D4CC,wx,y1-0.1,y1,0,z1);wL(g,0xD8D4CC,wx,y0,y1,z1-0.1,z1);
  wL(g,0xC8A030,wx,y0+0.12,y0+0.22,0.86,1.04);wL(g,0xE0B840,wx,y0+0.14,y0+0.19,0.87,1.03);
}
// Geheime Falltür im Boden (Kellereingang) — Holzluke mit Ringgriff
function drawTrapdoor(g,wx,wy){
  const sw=1.3,sd=1.0;
  hP(g,0x3A2818,wx,wy,wx+sw,wy+sd,0.01);
  hP(g,0x5A3E22,wx+0.07,wy+0.07,wx+sw-0.07,wy+sd-0.07,0.02);
  for(let px=wx+0.15;px<wx+sw-0.1;px+=0.24){hP(g,0x4A3018,px,wy+0.1,px+0.2,wy+sd-0.1,0.025,0.5);}
  const rS=I(wx+sw/2,wy+sd/2,0.03);
  g.lineStyle(2.5,0xC8A030,0.9);g.strokeCircle(rS.x,rS.y-3,7);
  g.fillStyle(0x2A1C0E,0.4);g.fillEllipse(rS.x,rS.y+2,26,10);
}
// Generic frosted-glass door — fixed Y plane (like a back/front wall)
function drawDoorY(g,wy,x0,x1,z1){
  z1=z1||1.88;
  wB(g,0xF4F2EE,wy,x0,x1,0,z1);
  wB(g,0xC8C4B8,wy,x0,x1,0,0.04);
  wB(g,0xB8CED8,wy,x0+0.1,x1-0.1,0.1,z1-0.1,0.78);
  for(let rx=x0+0.11;rx<x1-0.12;rx+=0.135){wB(g,0xFFFFFF,wy,rx,rx+0.062,0.11,z1-0.11,0.32);}
  wB(g,0xFFFFFF,wy,x0+0.11,x0+0.30,0.12,z1*0.55,0.18);
  wB(g,0xD8D4CC,wy,x0,x0+0.1,0,z1);wB(g,0xD8D4CC,wy,x1-0.1,x1,0,z1);wB(g,0xD8D4CC,wy,x0,x1,z1-0.1,z1);
  wB(g,0xC8A030,wy,x0+0.12,x0+0.22,0.86,1.04);wB(g,0xE0B840,wy,x0+0.14,x0+0.19,0.87,1.03);
}

// COLOURS
const C={
  BD_WL:0x636370,BD_WR:0x80808E,BD_FL:0x301f11,BD_FLP:0xAA7820,
  BD_HDR:0x28263A,BD_BL:0x28242E,BD_BLF:0x201C28,BD_BLT:0x302C3C,
  BD_PIL:0xF0EBE0,BD_PILF:0xE4DDD4,BD_PILT:0xF8F4EC,
  BD_MAT:0xC8B8A0,BD_MATF:0xB8A890,BD_MATT:0xD8C8B0,
  BD_LED:0xFF9040,
  BD_DESK:0xD49030,BD_DESKF:0xBC7A20,BD_DESKT:0xE8A840,
  BD_WARD:0x7A6040,BD_WARDF:0x8A7048,BD_WARDT:0x9A8050,
  BD_SIDE:0xF0F0EC,BD_SIDEF:0xE0E0D8,BD_SIDET:0xF8F8F4,
  BD_CHR:0x181820,BD_CHRF:0x101018,BD_CHRT:0x202030,
  BD_PC:0x181820,BD_PCF:0x101018,BD_PCT:0x20203A,
  BD_MON:0x1A2040,BD_MGLOW:0x3050A0,BD_RGB:0xA030C8,BD_NEON:0xFF7018,
  BD_SHF:0xC8A060,BD_SHFF:0xB08840,BD_SHFT:0xD8B070,
  LR_WL:0xD9D9D9,LR_WR:0xD9D9D9,LR_FL:0xD8D0C5,LR_FLP:0xAA7820,
  LR_CSH:0x3A2414,LR_CSHF:0x4A2E1A,LR_CSHT:0x5E3A20,
  LR_CU:0x301E10,LR_CUF:0x402816,LR_CUT:0x50321C,
  LR_P1:0xCC3838,LR_P2:0x3860B8,LR_P3:0x389838,
  LR_TBL:0xA87840,LR_TBLF:0x906828,LR_TBLT:0xC09050,
  LR_TVS:0x202838,LR_CTP:0x9A7838,LR_CTF:0xDDD090,LR_CTT:0xEEE0A0,
  LR_BK:[0xC83030,0x3060C8,0x28A028,0xC8A020,0xA028A0,0x28A8A0],
  KT_WL:0x98C8A0,KT_WR:0xB8E0C0,KT_FL:0xD8D8D0,KT_FLP:0xC0C0B8,
  KT_CB:0xF0E8D0,KT_CBF:0xD8D0B8,KT_CBT:0xF8F0D8,
  KT_CT:0xE8E0CC,KT_CTF:0xD0C8B4,KT_CTT:0xF4ECD8,
  KT_FG:0xECECE8,KT_FGF:0xE0E0DC,KT_FGT:0xF4F4F0,
  KT_ST:0x888880,KT_STF:0x787870,KT_STT:0x989890,
  BT_WL:0x88B8C8,BT_WR:0xA8D0E0,BT_FL:0xE0E0D8,BT_FLP:0xC8C8C0,
  BT_TB:0xF0F0EC,BT_TBF:0xE0E0DC,BT_TBT:0xF8F8F4,
  BT_TL:0xEEEEEA,BT_TLF:0xE2E2DE,BT_TLT:0xF4F4F0,
  HL_WL:0xD8C090,HL_WR:0xF0D8A0,HL_FL:0xC8B880,HL_FLP:0xB0A068,
  BL_SK1:0x7AB8DC,BL_SK2:0xA8CCEC,BL_SK3:0xC8E0F4,
  BL_FL:0xC8C0A8,BL_RL:0xD8C890,BL_WL:0xD0C8B0,
  PL_D:0x1A7A20,PL_M:0x289A28,
  P1_SK:0xD4A880,P1_H:0x7A5A30,P1_H2:0xA08050,P1_SH:0x607080,P1_PA:0x384050,
  P2_SK:0xF0D4B4,P2_H:0x8A2810,P2_H2:0xB84020,P2_SH:0xC88878,P2_PA:0x506090,
  K1_M:0xB8C4CC,K1_D:0x7890A0,K1_B:0xF0F0F4,K1_E:0x48B0E8,
  K2_M:0xF0E4D0,K2_D:0xE0C0A0,K2_B:0xF8F4EC,K2_E:0xC89030,CAT_N:0xF09090,
  UI_BG:0x1A1228,UI_LN:0x3A2860,DL_BG:0xFAF8FF,DL_BD:0x604888,DL_TX:0x281840,
};

// GAME STATE
const GS={
  room:'schlafzimmer',placements:null,override:null,
  hunger:{katze1:20,katze2:20},                 // 0-100, steigt mit der Zeit
  dirtiness:15,                                  // 0-100, steigt mit der Zeit — für die Staubsaugen-Quest
  quests:{active:null,completed:[],lastOffered:{}},
  kellerUnlocked:false,                         // 🔓 geheimer Keller — per Pflanzen-Klick freischaltbar
  shoppingList:[],                              // Item-IDs, die gerade besorgt werden müssen
  cart:[],                                      // Item-IDs, die schon eingesammelt wurden
  period(){if(this.override)return this.override;const h=new Date().getHours();if(h>=6&&h<11)return'morning';if(h>=11&&h<17)return'afternoon';if(h>=17&&h<22)return'evening';return'night';},
  recalc(){const p=this.period(),res={};Object.entries(SCHED).forEach(([k,s])=>{const e=s[p];let room=e.room,slot=e.slot;if(e.alts&&Math.random()<e.alts[0].w){room=e.alts[0].room;slot=e.alts[0].slot;}if(!res[room])res[room]=[];res[room].push({npc:k,slot});});this.placements=res;},
  tickHunger(amount){
    ['katze1','katze2'].forEach(k=>{this.hunger[k]=Math.min(100,(this.hunger[k]||0)+amount);});
  },
  tickDirtiness(amount){
    this.dirtiness=Math.min(100,(this.dirtiness||0)+amount);
  }
};

// ═══════════════════════════════════════════════════════════════
//  SPRITE-SYSTEM — sobald du echte Bilder hast, hier die Pfade
//  eintragen. Fehlende/nicht eingetragene Dateien werden beim
//  Laden übersprungen — das Spiel läuft dann einfach mit der
//  eingebauten Pixel-Art weiter (kein Crash, kein Unterbruch).
//
//  📁 Empfohlene Ordnerstruktur (relativ zu dieser HTML-Datei):
//     assets/characters/ich.png
//     assets/characters/freundin.png
//     assets/characters/katze1.png
//     assets/characters/katze2.png
//     assets/rooms/schlafzimmer.png   (optionaler Komplett-Hintergrund)
//     assets/rooms/wohnzimmer.png
//     assets/rooms/kueche.png
//     assets/rooms/bad.png
//     assets/rooms/flur.png
//     assets/rooms/balkon.png
//
//  📐 Charakter-Sprites: PNG mit transparentem Hintergrund,
//     Ankerpunkt unten-mittig (Füße), empfohlen ~350-500px hoch
//     (wird automatisch skaliert, Seitenverhältnis egal solange konsistent).
//  📐 Raum-Hintergründe: Seitenverhältnis 896:504 (16:9-ish), werden
//     automatisch auf die volle Canvas-Größe gestreckt/skaliert.
// ═══════════════════════════════════════════════════════════════
const SPRITE_ASSETS={
  // Charaktere (Key → Bildpfad, null = noch nicht vorhanden)
  ich:              'assets/sprites/ich.png',
  freundin:         'assets/sprites/freundin.png',
  katze1:           'assets/sprites/katze1.png',
  katze2:           'assets/sprites/katze2.png',
  ich_sit:          'assets/sprites/ich_sit.png',
  freundin_sit:     'assets/sprites/freundin_sit.png',
  ich_lie:          'assets/sprites/ich_lie.png',
  freundin_lie:     'assets/sprites/freundin_lie.png',
  staubsauger:      'assets/sprites/staubsauger.png',
  smoke_idle1:      'assets/sprites/smoke_idle1.png',
  smoke_raise:      'assets/sprites/smoke_raise.png',
  smoke_puff:       'assets/sprites/smoke_puff.png',
  smoke_inhale:     'assets/sprites/smoke_inhale.png',
  smoke_exhale:     'assets/sprites/smoke_exhale.png',
  smoke_idle2:      'assets/sprites/smoke_idle2.png',
  // Raum-Hintergründe (optional — ersetzen die prozedurale Zeichnung komplett)
  bg_schlafzimmer: null,
  bg_wohnzimmer:   null,
  bg_kueche:       null,
  bg_bad:          null,
  bg_flur:         null,
  bg_balkon:       null,
};
const loadedSprites=new Set(); // wird beim Laden automatisch gefüllt

// 💡 Individuelle Sprite-Zielgröße (Höhe in px) pro Charakter — überschreibt
// den Standard (Mensch 123px, Katze 90px). Praktisch für unterschiedlich
// große Katzen (Babykatze vs. ausgewachsener Maine Coon).
const SPRITE_TARGET_H={
  katze1: 55,   // Felina — kleine "Babykatze"
  katze2: 82,   // Felino — Maine Coon, minimal kleiner als Standard
  ich_sit: 100,
  freundin_sit: 100,
  ich_lie: 38,
  freundin_lie: 38,
  staubsauger: 95,
  smoke_idle1:123, smoke_raise:123, smoke_puff:123, smoke_inhale:123,
  smoke_exhale:123, smoke_idle2:123,
};

// NPCs  — change 'name' to rename!
const NPCS={
  ich:{name:'Ich',type:'human',cfg:{sk:C.P1_SK,h:C.P1_H,h2:C.P1_H2,sh:C.P1_SH,pa:C.P1_PA,beard:false}},
  freundin:{name:'Schatz',type:'human',cfg:{sk:C.P2_SK,h:C.P2_H,h2:C.P2_H2,sh:C.P2_SH,pa:C.P2_PA,longHair:true}},
  katze1:{name:'Felina',type:'cat',cfg:{m:C.K1_M,d:C.K1_D,b:C.K1_B,e:C.K1_E,big:false}},
  katze2:{name:'Felino',type:'cat',cfg:{m:C.K2_M,d:C.K2_D,b:C.K2_B,e:C.K2_E,big:true}},
};

const SCHED={
  // ☀️ Morgen: ich Küche, Freundin Bad, Katze1 Küche, Katze2 Bad
  // 🌤 Nachm: ich Wohnzimmer, Freundin Schlafzimmer, Katze1 Wohnzimmer, Katze2 Flur
  // 🌆 Abend: ich+Freundin Wohnzimmer (Couch!), Katze1 Wohnzimmer/Balkon, Katze2 Küche/Wohnzimmer
  // 🌙 Nacht: ich+Freundin Schlafzimmer, Katzen verteilt
  ich:{
    morning:   {room:'kueche',       slot:'stove',    alts:[{room:'balkon',slot: 'railing',w:.35}]},
    afternoon: {room:'wohnzimmer',   slot:'couch_l',  alts:[{room:'balkon',slot:'chair_l',w:.4}]},
    evening:   {room:'wohnzimmer',   slot:'couch_l',  alts:[{room:'kueche',slot:'stove',w:.15}]},
    night:     {room:'schlafzimmer', slot:'bed_ich'},
  },
  freundin:{
    morning:   {room:'bad',          slot:'sink',     alts:[{room:'balkon',slot:'chair_r',w:.35}]},
    afternoon: {room:'schlafzimmer', slot:'wardrobe', alts:[{room:'wohnzimmer',slot:'couch_r',w:.45}]},
    evening:   {room:'wohnzimmer',   slot:'couch_r',  alts:[{room:'schlafzimmer',slot:'wardrobe',w:.15}]},
    night:     {room:'schlafzimmer', slot:'bed_sie'},
  },
  katze1:{
    morning:   {room:'kueche',       slot:'fridge',   alts:[{room:'wohnzimmer',slot:'window',w:.45}]},
    afternoon: {room:'wohnzimmer',   slot:'cat_tree', alts:[{room:'schlafzimmer',slot:'bed_sie',w:.35}]},
    evening:   {room:'balkon',       slot:'railing',  alts:[{room:'wohnzimmer',slot:'carpet',w:.5}]},
    night:     {room:'wohnzimmer',   slot:'cat_tree', alts:[{room:'schlafzimmer',slot:'bed_feet',w:.5}]},
  },
  katze2:{
    morning:   {room:'bad',          slot:'toilet',   alts:[{room:'flur',slot:'center',w:.4}]},
    afternoon: {room:'flur',         slot:'center',   alts:[{room:'wohnzimmer',slot:'couch_r',w:.4}]},
    evening:   {room:'kueche',       slot:'table_l',  alts:[{room:'wohnzimmer',slot:'tv_area',w:.45}]}, 
    night:     {room:'schlafzimmer', slot:'floor_r',  alts:[{room:'wohnzimmer',slot:'tv_area',w:.4}]},
  },
};

const ROOMS={
  schlafzimmer:{label:'Schlafzimmer',exits:[{to:'wohnzimmer',label:'Wohnzimmer \u25b6'},{to:'bad',label:'Bad \u25bc'}],slots:{bed_ich:{wx:1.3,wy:0.4},bed_sie:{wx:1.3,wy:1.5},bed_feet:{wx:1.6,wy:5.4},wardrobe:{wx:5.5,wy:2.0},floor_r:{wx:7.0,wy:4.5}}},
  wohnzimmer:{label:'Wohnzimmer',exits:[{to:'schlafzimmer',label:'\u25c4 Schlafzimmer'},{to:'flur',label:'Flur \u25bc'},{to:'balkon',label:'Balkon \u25b2'}],slots:{couch_l:{wx:3.0,wy:1.5},couch_r:{wx:4.3,wy:1.5},carpet:{wx:4.3,wy:5.3},tv_area:{wx:3.0,wy:5.8},cat_tree:{wx:0.8,wy:1.5},window:{wx:1.0,wy:3.7}}},
  kueche:{label:'Kueche',exits:[{to:'flur',label:'\u25c4 Flur'}],slots:{stove:{wx:1.5,wy:3.5},fridge:{wx:1.0,wy:2.0},table_l:{wx:6.0,wy:4.5},table_r:{wx:7.2,wy:4.5},sink:{wx:3.0,wy:3.0}}},
  bad:{label:'Bad',exits:[{to:'schlafzimmer',label:'Schlafzimmer \u25b2'}],slots:{toilet:{wx:1.5,wy:3.5},sink:{wx:4.5,wy:3.0},bath:{wx:7.5,wy:3.5}}},
  flur:{label:'Flur',exits:[{to:'wohnzimmer',label:'Wohnzimmer \u25b2'},{to:'kueche',label:'Kueche \u25b6'}],slots:{center:{wx:2.0,wy:4.5},coat:{wx:1.2,wy:3.0},shoe:{wx:2.3,wy:3.3}}},
  balkon:{label:'Balkon',exits:[{to:'wohnzimmer',label:'\u25bc Wohnzimmer'}],slots:{railing:{wx:2.3,wy:6.1},chair_l:{wx:3.7,wy:4.5},chair_r:{wx:5.0,wy:4.0},plant_a:{wx:7.5,wy:3.5}}},
  keller:{label:'Keller',exits:[{to:'flur',label:'\u25b2 Flur'}],slots:{center:{wx:4.5,wy:3.5}}},
  markt1:{label:'Obst & Gem\u00fcse',exits:[{to:'flur',label:'\u25c4 Nach Hause'},{to:'markt2',label:'K\u00fchlregal \u25b6'}],slots:{}},
  markt2:{label:'K\u00fchl & Vorrat',exits:[{to:'markt1',label:'\u25c4 Obst & Gem\u00fcse'},{to:'markt3',label:'Getr\u00e4nke \u25b6'}],slots:{}},
  markt3:{label:'Getr\u00e4nke & S\u00fc\u00dfes',exits:[{to:'markt2',label:'\u25c4 K\u00fchl & Vorrat'},{to:'flur',label:'Kasse \u2192 Nach Hause'}],slots:{}},
};
const SMAP={schlafzimmer:'Schlafzimmer',wohnzimmer:'Wohnzimmer',kueche:'Kueche',bad:'Bad',flur:'Flur',balkon:'Balkon',keller:'Keller',markt1:'Markt1',markt2:'Markt2',markt3:'Markt3'};

// Tür-basierte Navigation (ersetzt die Buttons) — Layout laut Skizze:
// Wohnzimmer ↔ Flur + Balkon | Schlafzimmer ↔ Flur + Balkon | Bad/Küche ↔ nur Flur | Flur ↔ alles außer Balkon
const DOORS={
  schlafzimmer:[
    {wall:'x0', r0:4.6, r1:5.95, to:'flur', label:'Flur'},
    {wall:'x9', r0:4.6, r1:5.95, to:'balkon', label:'Balkon'}
  ],
  wohnzimmer:[
    {wall:'x0', r0:0.3, r1:1.65, to:'balkon', label:'Balkon'},
    {wall:'x9', r0:4.6, r1:5.95, to:'flur', label:'Flur'}
  ],
  flur:[
    {wall:'x0', r0:0.8, r1:2.15, to:'wohnzimmer', label:'Wohnzimmer'},
    {wall:'x0', r0:4.85, r1:6.2, to:'schlafzimmer', label:'Schlafzimmer'},
    {wall:'y7', r0:1.0, r1:2.35, to:'bad', label:'Bad'},
    {wall:'y0', r0:1.0, r1:2.35, to:'kueche', label:'Küche'},
    {trapdoor:true, requires:'kellerUnlocked', wx:3.2, wy:5.2, to:'keller', label:'??? Keller'},
    {wall:'x9', r0:0.5, r1:1.85, to:'markt1', label:'Haustür 🚪'}
  ],
  bad:[
    {wall:'x9', r0:0.2, r1:1.55, to:'flur', label:'Flur'}
  ],
  kueche:[
    {wall:'y7', r0:0.5, r1:1.85, to:'flur', label:'Flur'}
  ],
  balkon:[
    {wall:'custom', cx:3.0, cy:0, to:'wohnzimmer', label:'Wohnzimmer'},
    {wall:'y0', r0:5.7, r1:7.05, to:'schlafzimmer', label:'Schlafzimmer'}
  ],
  keller:[
    {wall:'y7', r0:3.5, r1:4.85, to:'flur', label:'Flur'}
  ],
  markt1:[
    {wall:'y7', r0:0.5, r1:1.85, to:'flur', label:'Nach Hause'},
    {wall:'x9', r0:2.6, r1:3.95, to:'markt2', label:'Kühlregal'}
  ],
  markt2:[
    {wall:'x0', r0:2.6, r1:3.95, to:'markt1', label:'Obst & Gemüse'},
    {wall:'x9', r0:2.6, r1:3.95, to:'markt3', label:'Getränke'}
  ],
  markt3:[
    {wall:'x0', r0:2.6, r1:3.95, to:'markt2', label:'Kühl & Vorrat'},
    {wall:'y7', r0:5.0, r1:6.35, to:'flur', label:'Kasse → Nach Hause'}
  ]
};

const DIAL={
  ich:{morning:['Gumo... Kaffee first \u2615','Ugh, so fr\u00fch... \ud83d\ude29','Heute wird super!','Wer hat Wecker gestellt?!',['Boah krasse Aussicht..','balkon']],afternoon:['Hey! Alles gut? \ud83d\ude04','Kurz chilllen~','Hunger? Ich auch!','Die Katzen d\u00f6sen wieder \ud83d\ude02'],evening:[['Komm, kuscheln! \ud83e\udd70','wohnzimmer'],'Sooo m\u00fcde...',['Was schauen wir?','wohnzimmer'],'War ein guter Tag \ud83c\udf19'],night:['zzzz...','💤','*schl\u00e4ft tief*','schnarch...']},
  freundin:{morning:['Guuuten Morgen! \ud83c\udf38','Ich mach Fr\u00fchst\u00fcck~','Gut geschlafen?','Kaffeeeee!!!',['Eine rauchi?','balkon']],afternoon:['Lese gerade \ud83d\udcda',['Ich will zocken! 😼🎮','schlafzimmer'],'Die Sonne ist so sch\u00f6n!','Wollen wir raus?','Felina ist so s\u00fc\u00df \ud83e\udd7a'],evening:[['Kuscheln? \ud83e\udd70\ud83d\udc95','wohnzimmer'],['Ich will zocken! 😼🎮','schlafzimmer'],'Hab dich vermisst!',['Lass was kochen~','kueche'],'Ich lieb dich \ud83d\udc95'],night:['zzz~ \ud83d\udca4','*schl\u00e4ft selig*','AAAGHH FELINA!!! \ud83d\ude21','...zzz']},
  katze1:{morning:['MIAU!! FUTTER!!!','*reibt sich ans Bein*','HUNGEEEER!!','Mrrrow~'],afternoon:['*starrt ins Leere*','...','*rollt sich zusammen*','*Pfoten waschen*'],evening:['*schnurr schnurr* \ud83d\udc95','*knetet dich*','Miuuuuuuuuuuuuuu~','*slow blink* \ud83d\udc95'],night:['*schl\u00e4ft AUF dir*','Schnurrr...','*w\u00e4rmt dich*','purr purr \ud83d\ude34']},
  katze2:{morning:['*sitzt auf dem Klo*','Ich sitze hier. Mein Platz.','*beobachtet*','Ich gehe NICHT.'],afternoon:['*streckt sich*','*g\u00e4hnt LAUT*','*legt sich aufs Gesicht*','...'],evening:['*dreht Runden*','Mrrp? \ud83d\udc40','*kopfst\u00f6\u00dft sanft*','Schnurr~ \ud83d\udc95'],night:['*RENNEND 3 UHR NACHTS*','...zzzz','*schl\u00e4ft auf Kopfkissen*','Purrrr...']},
};
// Ein Dialog-Eintrag ist entweder ein reiner String (überall gültig)
// oder ein Paar [text, raum] — dann erscheint der Satz NUR in diesem Raum.
// Der Raum-Teil darf auch ein Array sein: [text, ['wohnzimmer','schlafzimmer']]
// — dann erscheint der Satz in JEDEM dieser Räume (kein zweites Array/Objekt nötig).
const rndDial=(n,p,room)=>{
  const all=DIAL[n]?.[p]||['...'];
  const matchesRoom=r=>Array.isArray(r)?r.includes(room):r===room;
  const valid=all.filter(e=>Array.isArray(e)?matchesRoom(e[1]):true);
  const pool=valid.length?valid:all.filter(e=>!Array.isArray(e)); // Fallback: raumfreie Sätze
  const pick=pool.length?pool[Math.floor(Math.random()*pool.length)]:'...';
  return Array.isArray(pick)?pick[0]:pick;
};

// ═══════════════════════════════════════════════════════════════
//  QUEST SYSTEM
//  Jede Quest wird von einem NPC angeboten. Chance steigt optional
//  durch einen chanceBoost (z.B. Hunger-Level). Erledigung erfolgt
//  meist durch Klick auf ein ITEM (z.B. Futternapf).
// ═══════════════════════════════════════════════════════════════
class Quest{
  constructor(cfg){
    this.id=cfg.id;
    this.npc=cfg.npc;                          // welcher NPC bietet sie an
    this.name=cfg.name;                        // Anzeigename
    this.offerText=cfg.offerText;               // Text beim Anbieten (string oder fn(GS)=>string)
    this.rewardText=cfg.rewardText;              // Text bei Abschluss
    this.periods=cfg.periods||['morning','afternoon','evening','night'];
    this.baseChance=cfg.baseChance??0.08;        // Grund-Chance pro Klick (0-1)
    this.chanceBoost=cfg.chanceBoost||(()=>0);   // fn(GS)=>zusätzliche Chance (0-1)
    this.repeatable=cfg.repeatable??true;
    this.cooldownMs=cfg.cooldownMs??30000;       // Mindestzeit zwischen Angeboten
    this.onOffer=cfg.onOffer||(()=>{});          // fn(GS) beim Anbieten
    this.onComplete=cfg.onComplete||(()=>{});    // fn(GS) beim Abschluss (z.B. Hunger auf 0)
  }
  getOfferText(GS){return typeof this.offerText==='function'?this.offerText(GS):this.offerText;}
  isEligible(GS){
    if(!this.periods.includes(GS.period()))return false;
    if(!this.repeatable&&GS.quests.completed.includes(this.id))return false;
    if(GS.quests.active===this.id)return false;
    const last=GS.quests.lastOffered[this.id]||0;
    if(Date.now()-last<this.cooldownMs)return false;
    return true;
  }
  chanceNow(GS){
    if(!this.isEligible(GS))return 0;
    return Math.min(1,Math.max(0,this.baseChance+this.chanceBoost(GS)));
  }
  tryOffer(GS){
    if(Math.random()>=this.chanceNow(GS))return false;
    GS.quests.active=this.id;
    GS.quests.lastOffered[this.id]=Date.now();
    this.onOffer(GS);
    return true;
  }
  complete(GS){
    GS.quests.active=null;
    if(!this.repeatable)GS.quests.completed.push(this.id);
    this.onComplete(GS);
    if(typeof saveGame==='function')saveGame();
  }
}

// 💡 Neue Quests hier registrieren — einfach ein neues Quest-Objekt hinzufügen!
// 🛒 Lebensmittel-Pool für die Einkaufsliste — 50 Stück, Emoji statt eigenem Sprite
// Abteilungen — für die spätere Deko/eigene Sprites einfach hier ansetzen
const DEPARTMENTS={
  obst:     {label:'Obst & Gemüse',   icon:'🍎', color:0x6AAA50},
  kuehl:    {label:'Kühlregal',        icon:'🥛', color:0x60A0C8},
  vorrat:   {label:'Vorrat & Backwaren',icon:'🥫', color:0xC89050},
  getraenke:{label:'Getränke',         icon:'🥤', color:0x8060C0},
  suess:    {label:'Süßes & Snacks',   icon:'🍫', color:0xC85A70},
};
const GROCERY_ITEMS=[
  {id:'milch',icon:'🥛',name:'Milch',cat:'kuehl'},{id:'eier',icon:'🥚',name:'Eier',cat:'kuehl'},
  {id:'brot',icon:'🍞',name:'Brot',cat:'vorrat'},{id:'butter',icon:'🧈',name:'Butter',cat:'kuehl'},
  {id:'kaese',icon:'🧀',name:'Käse',cat:'kuehl'},{id:'joghurt',icon:'🥣',name:'Joghurt',cat:'kuehl'},
  {id:'aepfel',icon:'🍎',name:'Äpfel',cat:'obst'},{id:'bananen',icon:'🍌',name:'Bananen',cat:'obst'},
  {id:'tomaten',icon:'🍅',name:'Tomaten',cat:'obst'},{id:'gurke',icon:'🥒',name:'Gurke',cat:'obst'},
  {id:'kartoffeln',icon:'🥔',name:'Kartoffeln',cat:'obst'},{id:'zwiebeln',icon:'🧅',name:'Zwiebeln',cat:'obst'},
  {id:'karotten',icon:'🥕',name:'Karotten',cat:'obst'},{id:'paprika',icon:'🫑',name:'Paprika',cat:'obst'},
  {id:'salat',icon:'🥬',name:'Salat',cat:'obst'},{id:'zitronen',icon:'🍋',name:'Zitronen',cat:'obst'},
  {id:'orangen',icon:'🍊',name:'Orangen',cat:'obst'},{id:'trauben',icon:'🍇',name:'Trauben',cat:'obst'},
  {id:'erdbeeren',icon:'🍓',name:'Erdbeeren',cat:'obst'},{id:'avocado',icon:'🥑',name:'Avocado',cat:'obst'},
  {id:'huehnchen',icon:'🍗',name:'Hähnchen',cat:'kuehl'},{id:'hack',icon:'🥩',name:'Hackfleisch',cat:'kuehl'},
  {id:'lachs',icon:'🐟',name:'Lachs',cat:'kuehl'},{id:'nudeln',icon:'🍝',name:'Nudeln',cat:'vorrat'},
  {id:'reis',icon:'🍚',name:'Reis',cat:'vorrat'},{id:'mehl',icon:'🌾',name:'Mehl',cat:'vorrat'},
  {id:'zucker',icon:'🧂',name:'Zucker',cat:'vorrat'},{id:'salz',icon:'🧂',name:'Salz',cat:'vorrat'},
  {id:'oel',icon:'🫒',name:'Öl',cat:'vorrat'},{id:'ketchup',icon:'🍅',name:'Ketchup',cat:'vorrat'},
  {id:'senf',icon:'🌭',name:'Senf',cat:'vorrat'},{id:'honig',icon:'🍯',name:'Honig',cat:'vorrat'},
  {id:'marmelade',icon:'🍓',name:'Marmelade',cat:'vorrat'},{id:'muesli',icon:'🥣',name:'Müsli',cat:'vorrat'},
  {id:'kaffee',icon:'☕',name:'Kaffee',cat:'getraenke'},{id:'tee',icon:'🍵',name:'Tee',cat:'getraenke'},
  {id:'saft',icon:'🧃',name:'Orangensaft',cat:'getraenke'},{id:'cola',icon:'🥤',name:'Cola',cat:'getraenke'},
  {id:'bier',icon:'🍺',name:'Bier',cat:'getraenke'},{id:'wein',icon:'🍷',name:'Wein',cat:'getraenke'},
  {id:'wasser',icon:'💧',name:'Wasser',cat:'getraenke'},{id:'schokolade',icon:'🍫',name:'Schokolade',cat:'suess'},
  {id:'kekse',icon:'🍪',name:'Kekse',cat:'suess'},{id:'chips',icon:'🥔',name:'Chips',cat:'suess'},
  {id:'eis',icon:'🍦',name:'Eis',cat:'suess'},{id:'pizza',icon:'🍕',name:'Tiefkühlpizza',cat:'kuehl'},
  {id:'wuerstchen',icon:'🌭',name:'Würstchen',cat:'kuehl'},{id:'spinat',icon:'🥬',name:'Spinat',cat:'obst'},
  {id:'pilze',icon:'🍄',name:'Pilze',cat:'obst'},{id:'knoblauch',icon:'🧄',name:'Knoblauch',cat:'obst'},

];

// 🛒 Zufällige Einkaufsliste erzeugen (4-8 Items aus dem Pool)
function rollShoppingList(){
  const count=4+Math.floor(Math.random()*5); // 4-8
  const pool=[...GROCERY_ITEMS];
  const picked=[];
  for(let i=0;i<count&&pool.length;i++){
    const idx=Math.floor(Math.random()*pool.length);
    picked.push(pool.splice(idx,1)[0].id);
  }
  return picked;
}
function groceryById(id){return GROCERY_ITEMS.find(g=>g.id===id);}

const QUESTS={
  feed_katze1: new Quest({
    id:'feed_katze1', npc:'katze1', name:'Felina füttern',
    offerText:'MIAU!! Ich hab sooo Hunger! 🍖 F\u00fcll doch bitte meinen Napf in der K\u00fcche!',
    rewardText:'Miau! Dankesch\u00f6n! 😻💕',
    baseChance:0.06,
    chanceBoost:(GS)=>(GS.hunger.katze1||0)/100*0.85,
    cooldownMs:20000,
    onComplete:(GS)=>{GS.hunger.katze1=0;}
  }),
  feed_katze2: new Quest({
    id:'feed_katze2', npc:'katze2', name:'Felino füttern',
    offerText:'*stupst den leeren Napf* Mrrp! 🍖 Mein Napf ist leer, mach mal in der K\u00fcche!',
    rewardText:'*schnurrt zufrieden* Purrrr 😻',
    baseChance:0.06,
    chanceBoost:(GS)=>(GS.hunger.katze2||0)/100*0.85,
    cooldownMs:20000,
    onComplete:(GS)=>{GS.hunger.katze2=0;}
  }),
  staubsaugen: new Quest({
    id:'staubsaugen', npc:'freundin', name:'Wohnung saugen',
    offerText:'Ich muss echt mal wieder Staubsaugen! 😥',
    rewardText:'Jaa! Endlich wieder blitzeblank..😍',
    baseChance:0.06,
    chanceBoost:(GS)=>(GS.dirtiness||0)/100*0.85,
    cooldownMs:20000,
    onComplete:(GS)=>{GS.dirtiness=0;}
  }),
  einkaufen: new Quest({
    id:'einkaufen', npc:'ich', name:'Einkaufen gehen',
    offerText:(GS)=>{
      const items=GS.shoppingList.map(id=>{const g=groceryById(id);return g?`${g.icon} ${g.name}`:'';}).join(', ');
      return `Können wir einkaufen gehen? Uns fehlt: ${items} 🛒`;
    },
    rewardText:'Danke fürs Einkaufen! 🛒❤️ Jetzt haben wir wieder alles da.',
    baseChance:0.05,
    cooldownMs:45000,
    onOffer:(GS)=>{GS.shoppingList=rollShoppingList();GS.cart=[];},
    onComplete:(GS)=>{GS.shoppingList=[];GS.cart=[];}
  }),
};

// Items, die eine Quest abschließen können (z.B. Futternäpfe)
const ITEMS={
  kueche:[
    {wx:7.7,wy:5.3,questId:'feed_katze1',label:'Napf (Felina)',doneText:'Der Napf ist schon gef\u00fcllt.'},
    {wx:8.3,wy:5.3,questId:'feed_katze2',label:'Napf (Felino)',doneText:'Der Napf ist schon gef\u00fcllt.'},
  ],
  schlafzimmer:[
    {wx:0.8,wy:6.8,questId:'staubsaugen',spriteKey:'staubsauger',label:'Staubsauger',doneText:'Gerade blitzeblank, nichts zu saugen.'},
  ],
};

// CHARACTERS  (PS=3)
const PS=4.2;
function drawHuman(g,sx,sy,cfg){
  const{sk,h,h2,sh,pa,beard,longHair}=cfg,s=PS;
  g.fillStyle(0,0.14);g.fillEllipse(sx,sy+2,26,7);
  g.fillStyle(0x181010);g.fillRect(sx-5*s,sy-2*s,4*s,2*s);g.fillRect(sx+s,sy-2*s,4*s,2*s);
  g.fillStyle(pa);g.fillRect(sx-4*s,sy-10*s,3*s,8*s);g.fillRect(sx+s,sy-10*s,3*s,8*s);g.fillRect(sx-4*s,sy-12*s,8*s,2*s);
  g.fillStyle(sh);g.fillRect(sx-4*s,sy-19*s,8*s,7*s);g.fillRect(sx-6*s,sy-19*s,2*s,6*s);g.fillRect(sx+4*s,sy-19*s,2*s,6*s);
  g.fillStyle(0,0.07);g.fillRect(sx-4*s,sy-12*s,8*s,2*s);
  g.fillStyle(sk);g.fillRect(sx-6*s,sy-14*s,2*s,2*s);g.fillRect(sx+4*s,sy-14*s,2*s,2*s);g.fillRect(sx-s,sy-21*s,2*s,2*s);
  g.fillRect(sx-4*s,sy-29*s,8*s,8*s);g.fillRect(sx-5*s,sy-27*s,s,3*s);g.fillRect(sx+4*s,sy-27*s,s,3*s);
  g.fillStyle(h);g.fillRect(sx-4*s,sy-29*s,8*s,3*s);g.fillRect(sx-4*s,sy-26*s,2*s,2*s);g.fillRect(sx+2*s,sy-26*s,2*s,2*s);
  if(longHair&&h2){g.fillStyle(h);g.fillRect(sx-5*s,sy-26*s,2*s,18*s);g.fillRect(sx+3*s,sy-26*s,2*s,16*s);g.fillStyle(h2);g.fillRect(sx-4*s,sy-25*s,s,14*s);g.fillRect(sx+3*s,sy-25*s,s,12*s);}
  g.fillStyle(h);g.fillRect(sx-3*s,sy-26*s,2*s,s);g.fillRect(sx+s,sy-26*s,2*s,s);
  g.fillStyle(0x181010);g.fillRect(sx-3*s,sy-25*s,s,s);g.fillRect(sx+2*s,sy-25*s,s,s);
  g.fillStyle(0xFFFFFF,0.7);g.fillRect(sx-2*s,sy-25*s,1,1);g.fillRect(sx+3*s,sy-25*s,1,1);
  g.fillStyle(0xC09070);g.fillRect(sx-s,sy-23*s,2*s,s);
  if(beard&&h2){g.fillStyle(h2,0.42);g.fillRect(sx-3*s,sy-24*s,6*s,2*s);}
}

function drawCat(g,sx,sy,cfg){
  const{m,d,b,e,big}=cfg,s=PS,bx=big?1:0;
  g.fillStyle(0,0.14);g.fillEllipse(sx,sy+2,30+bx*4,7);
  g.fillStyle(b,0.45);g.fillRect(sx-(7+bx)*s,sy-10*s,(14+bx*2)*s,10*s);
  g.fillStyle(m);g.fillRect(sx-(6+bx)*s,sy-9*s,(12+bx*2)*s,9*s);g.fillRect(sx-(5+bx)*s,sy-10*s,(10+bx*2)*s,s);
  g.fillStyle(b);g.fillRect(sx-4*s,sy-8*s,8*s,6*s);
  g.fillStyle(d,0.4);g.fillRect(sx-(6+bx)*s,sy-8*s,3*s,4*s);g.fillRect(sx+(3+bx)*s,sy-8*s,3*s,4*s);
  g.fillStyle(m);g.fillRect(sx-5*s,sy-s,4*s,s);g.fillRect(sx+s,sy-s,4*s,s);
  g.fillStyle(b,0.8);g.fillRect(sx-5*s,sy-12*s,10*s,3*s);
  g.fillStyle(m,0.5);g.fillRect(sx-5*s,sy-13*s,10*s,2*s);
  g.fillStyle(m);g.fillRect(sx-5*s,sy-17*s,10*s,7*s);g.fillRect(sx-4*s,sy-18*s,8*s,s);
  g.fillRect(sx-5*s,sy-21*s,3*s,4*s);g.fillRect(sx+2*s,sy-21*s,3*s,4*s);
  if(big){g.fillStyle(d,0.55);g.fillRect(sx-5*s,sy-22*s,2*s,2*s);g.fillRect(sx+3*s,sy-22*s,2*s,2*s);}
  g.fillStyle(0xF0A0B0,0.8);g.fillRect(sx-4*s,sy-20*s,2*s,3*s);g.fillRect(sx+2*s,sy-20*s,2*s,3*s);
  g.fillStyle(d,0.4);g.fillRect(sx-4*s,sy-17*s,2*s,4*s);g.fillRect(sx+2*s,sy-17*s,2*s,4*s);
  g.fillRect(sx-s,sy-18*s,s,2*s);g.fillRect(sx-3*s,sy-18*s,s,s);g.fillRect(sx+2*s,sy-18*s,s,s);
  g.fillStyle(e);g.fillRect(sx-3*s,sy-15*s,2*s,2*s);g.fillRect(sx+s,sy-15*s,2*s,2*s);
  g.fillStyle(0x080808);g.fillRect(sx-2*s,sy-15*s,s,2*s);g.fillRect(sx+2*s,sy-15*s,s,2*s);
  g.fillStyle(0xFFFFFF,0.9);g.fillRect(sx-3*s,sy-15*s,s,s);g.fillRect(sx+s,sy-15*s,s,s);
  g.fillStyle(C.CAT_N);g.fillRect(sx-s,sy-13*s,2*s,s);
  g.fillStyle(d,0.45);g.fillRect(sx-2*s,sy-12*s,s,s);g.fillRect(sx+s,sy-12*s,s,s);
  g.fillStyle(0x888888,0.65);g.fillRect(sx-8*s,sy-13*s,s,s);g.fillRect(sx-7*s,sy-14*s,s,s);g.fillRect(sx+6*s,sy-13*s,s,s);g.fillRect(sx+7*s,sy-14*s,s,s);
  g.fillStyle(m);g.fillRect(sx+5*s,sy-7*s,6*s,2*s);g.fillRect(sx+9*s,sy-12*s,3*s,6*s);g.fillRect(sx+8*s,sy-13*s,2*s,s);
  g.fillStyle(d,0.35);g.fillRect(sx+5*s,sy-7*s,2*s,s);g.fillRect(sx+10*s,sy-12*s,s,3*s);
}

// BASE ROOM SCENE
class BaseRoom extends Phaser.Scene{
  constructor(key,roomKey){super(key);this.roomKey=roomKey;}
  create(){
    GS.room=this.roomKey;if(!GS.placements)GS.recalc();
    this.game.events.emit('roomChange',this.roomKey);
    const bg=this.add.graphics();
    this._roomGfx=bg;
    const bgKey='bg_'+this.roomKey;
    if(loadedSprites.has(bgKey)){
      // 🖼️ Echter Raum-Hintergrund vorhanden — nutzen statt Pixel-Art-Zeichnung.
      // Türen/Items werden trotzdem weiterhin oben drüber gezeichnet (transparentes Overlay).
      this.add.image(GW/2,GH/2,bgKey).setDisplaySize(GW,GH).setDepth(-10);
    }else{
      this.drawRoom(bg);
    }
    this.activeDialog=null;this._npcClick=false;
    this.placeDoors();
    this.placeItems();
    this.placeNPCs();
    this.input.on('pointerdown',()=>{if(this.activeDialog&&!this._npcClick)this.closeDialog();this._npcClick=false;});
    this.buildNav();
    this.cameras.main.fadeIn(300,10,8,18);
  }
  buildNav(){
    const PRDS=['morning','afternoon','evening','night'];
    let pi=Math.max(0,PRDS.indexOf(GS.period()));
    const icon=(GS.period()==='morning'||GS.period()==='afternoon')?'\u2600\ufe0f':'\ud83c\udf19';
    const btnBg=this.add.graphics().setDepth(500);
    btnBg.fillStyle(0x1A1228,0.75);btnBg.fillCircle(38,38,26);
    btnBg.lineStyle(1.5,0x3A2860,0.9);btnBg.strokeCircle(38,38,26);
    const tog=this.add.text(38,38,icon,{fontSize:'24px',fontFamily:'Arial'}).setOrigin(0.5).setDepth(501).setInteractive({cursor:'pointer'});
    tog.on('pointerover',()=>btnBg.setAlpha(1));
    tog.on('pointerout',()=>btnBg.setAlpha(1));
    tog.on('pointerdown',()=>{pi=(pi+1)%4;GS.override=PRDS[pi];GS.recalc();this.cameras.main.fadeOut(200,10,8,18);this.cameras.main.once('camerafadeoutcomplete',()=>this.scene.start(SMAP[GS.room]));});
    // ⛶ Vollbild-Button — v.a. auf dem Handy wichtig, damit die Browser-Leiste
    // verschwindet und der Raum den ganzen Screen ausfüllt
    if(this.scale.fullscreen.available){
      const fsBg=this.add.graphics().setDepth(500);
      fsBg.fillStyle(0x1A1228,0.75);fsBg.fillCircle(84,38,22);
      fsBg.lineStyle(1.5,0x3A2860,0.9);fsBg.strokeCircle(84,38,22);
      const fsIcon=()=>this.scale.isFullscreen?'\u2716':'\u26f6';
      const fsTog=this.add.text(84,38,fsIcon(),{fontSize:'19px',fontFamily:'Arial',color:'#F0E8FF'}).setOrigin(0.5).setDepth(501).setInteractive({cursor:'pointer'});
      fsTog.on('pointerdown',()=>{this.scale.toggleFullscreen();});
      this.scale.on('enterfullscreen',()=>fsTog.setText(fsIcon()));
      this.scale.on('leavefullscreen',()=>fsTog.setText(fsIcon()));
    }
  }
  placeDoors(){
    const list=DOORS[this.roomKey]||[];
    const g=this._roomGfx;
    list.forEach(d=>{
      if(d.requires&&!GS[d.requires])return; // noch nicht freigeschaltet — unsichtbar & nicht klickbar
      let cx,cy;
      if(d.trapdoor){
        drawTrapdoor(g,d.wx,d.wy);
        const c=I(d.wx+0.65,d.wy+0.5,0.02);cx=c.x;cy=c.y;
      }
      else if(d.wall==='x0'){drawDoorX(g,0,d.r0,d.r1);const c=I(0,(d.r0+d.r1)/2,0.94);cx=c.x;cy=c.y;}
      else if(d.wall==='x9'){drawDoorX(g,9,d.r0,d.r1);const c=I(9,(d.r0+d.r1)/2,0.94);cx=c.x;cy=c.y;}
      else if(d.wall==='y0'){drawDoorY(g,0,d.r0,d.r1);const c=I((d.r0+d.r1)/2,0,0.94);cx=c.x;cy=c.y;}
      else if(d.wall==='y7'){drawDoorY(g,7,d.r0,d.r1);const c=I((d.r0+d.r1)/2,7,0.94);cx=c.x;cy=c.y;}
      else if(d.wall==='custom'){const c=I(d.cx,d.cy,0.94);cx=c.x;cy=c.y;}
      const zw=d.trapdoor?70:62,zh=d.trapdoor?50:92;
      const zone=this.add.zone(cx,cy,zw,zh).setOrigin(0.5).setInteractive({cursor:'pointer'}).setDepth(450);
      let tag=null;
      zone.on('pointerover',()=>{
        if(!tag)tag=this.add.text(cx,cy-42,d.label,{fontSize:'10px',fontFamily:'Arial',color:'#F0E8FF',backgroundColor:'#22164499',padding:{x:5,y:2}}).setOrigin(0.5).setDepth(600);
      });
      zone.on('pointerout',()=>{if(tag){tag.destroy();tag=null;}});
      zone.on('pointerdown',()=>{this._npcClick=true;this.goTo(d.to);});
    });
  }
  placeItems(){
    const list=ITEMS[this.roomKey]||[];
    list.forEach(it=>{
      const sc=I(it.wx,it.wy,0),sx=sc.x,sy=sc.y;
      const quest=Object.values(QUESTS).find(q=>q.id===it.questId);
      const isActive=GS.quests.active===it.questId;
      const bp=I(it.wx,it.wy,0);
      if(it.spriteKey&&loadedSprites.has(it.spriteKey)){
        // 🖼️ Echtes Sprite statt Napf-Grafik (z.B. Staubsauger)
        const img=this.add.image(sx,sy,it.spriteKey).setOrigin(0.5,1).setDepth(it.wx+it.wy+50);
        const targetH=SPRITE_TARGET_H[it.spriteKey]||95;
        img.setScale(targetH/img.height);
        if(!isActive)img.setAlpha(0.55); // "erledigt" wirkt etwas ausgegraut
      }else{
        const gfx=this.add.graphics().setDepth(it.wx+it.wy+90);
        // Napf zeichnen — leer (dunkel) oder voll (mit Futter), je nach Quest-Status
        gfx.fillStyle(0x000000,0.15);gfx.fillEllipse(bp.x,bp.y+1,20,8);
        gfx.fillStyle(0xD8D0C0);gfx.fillEllipse(bp.x,bp.y-2,18,9);
        gfx.fillStyle(isActive?0x484038:0xC89050);gfx.fillEllipse(bp.x,bp.y-3,13,6);
        if(!isActive){gfx.fillStyle(0xE8A840);gfx.fillEllipse(bp.x,bp.y-4,9,4);}
      }
      let tag=null;
      const zone=this.add.zone(sx,sy-20,48,48).setOrigin(0.5).setInteractive({cursor:'pointer'}).setDepth(it.wx+it.wy+95);
      zone.on('pointerover',()=>{if(!tag)tag=this.add.text(sx,sy-34,it.label,{fontSize:'10px',fontFamily:'Arial',color:'#F0E8FF',backgroundColor:'#22164499',padding:{x:5,y:2}}).setOrigin(0.5).setDepth(600);});
      zone.on('pointerout',()=>{if(tag){tag.destroy();tag=null;}});
      zone.on('pointerdown',()=>{
        this._npcClick=true;
        if(this.activeDialog)this.closeDialog();
        if(isActive&&quest){
          quest.complete(GS);
          this.openItemMsg(sx,sy-34,quest.rewardText);
          // Raum nach kurzer Lesezeit neu zeichnen, damit sich der Status aktualisiert
          this.time.delayedCall(1800,()=>{
            this.cameras.main.fadeOut(150,10,8,18);
            this.cameras.main.once('camerafadeoutcomplete',()=>this.scene.start(SMAP[GS.room]));
          });
        }else{
          this.openItemMsg(sx,sy-34,it.doneText||'Gerade nichts zu tun.');
        }
      });
    });
  }
  openItemMsg(sx,sy,text){
    const bW=Math.max(120,Math.min(250,text.length*8+28));
    const txt=this.add.text(0,0,text,{fontSize:'13px',fontFamily:'Arial',color:'#281840',wordWrap:{width:bW-26},resolution:2}).setDepth(701);
    const bH=Math.max(40,txt.height+22);
    const bX=Phaser.Math.Clamp(sx-bW/2,8,GW-bW-8),bY=Math.max(8,sy-bH-14);
    txt.setPosition(bX+13,bY+11);
    const bg=this.add.graphics().setDepth(700);
    bg.fillStyle(C.DL_BG);bg.fillRoundedRect(bX,bY,bW,bH,7);
    bg.lineStyle(2,C.DL_BD);bg.strokeRoundedRect(bX,bY,bW,bH,7);
    if(this.activeDialog)this.closeDialog();
    this.activeDialog={bg,txt};
  }
  drawRoom(bg){}
  goTo(rk){this.cameras.main.fadeOut(250,10,8,18);this.cameras.main.once('camerafadeoutcomplete',()=>this.scene.start(SMAP[rk]));}
  placeNPCs(){
    const here=(GS.placements||{})[this.roomKey]||[];
    here.forEach(({npc,slot})=>{const pos=ROOMS[this.roomKey].slots[slot];if(pos)this.spawnNPC(npc,pos.wx,pos.wy,slot);});
    // 💕 Herz-Chance: wenn irgendwelche zwei Charaktere nebeneinander sitzen
    const pairSlots=[['couch_l','couch_r']];
    pairSlots.forEach(([sA,sB])=>{
      const a=here.find(h=>h.slot===sA), b=here.find(h=>h.slot===sB);
      if(a&&b&&Math.random()<0.35){
        const posA=ROOMS[this.roomKey].slots[sA], posB=ROOMS[this.roomKey].slots[sB];
        const midWx=(posA.wx+posB.wx)/2, midWy=(posA.wy+posB.wy)/2;
        const sc=I(midWx,midWy,0);
        this.add.text(sc.x,sc.y-125,'💕',{fontSize:'20px',fontFamily:'Arial'}).setOrigin(0.5).setDepth(midWx+midWy+130);
      }
    });
  }
  spawnNPC(key,wx,wy,slot){
    const data=NPCS[key],human=data.type==='human';
    const sc=I(wx,wy,0),sx=sc.x,sy=sc.y;
    const hitW=human?39:50,hitH=human?98:81;
    // Sitzende Pose: wenn ein _sit-Sprite existiert und der Slot ein Sitzplatz ist
    const sittingSlots={couch_l:1,couch_r:1,chair_l:1};
    const sitKey=key+'_sit';
    const useSit=human&&slot&&sittingSlots[slot]&&loadedSprites.has(sitKey);
    // Liegende Pose: im Bett nachts, rotiert entlang der Bett-Längsachse (wx-Richtung)
    const lyingSlots={bed_ich:1,bed_sie:1};
    const lieKey=key+'_lie';
    const useLie=human&&slot&&lyingSlots[slot]&&loadedSprites.has(lieKey);
    // 🚬 Rauch-Animation: nur "ich" am Balkon-Geländer, falls alle Frames geladen sind
    const SMOKE_SEQ=['smoke_idle1','smoke_raise','smoke_puff','smoke_inhale','smoke_exhale','smoke_idle2'];
    const SMOKE_MS=[900,500,500,700,700,900];
    const useSmoke=key==='ich'&&slot==='railing'&&SMOKE_SEQ.every(k=>loadedSprites.has(k));
    if(useSmoke){
      let idx=0;
      // Harte statt weiche Skalierung — verhindert, dass duenne Details wie die
      // Zigarette beim Runterskalieren "verwaschen" und fast unsichtbar werden
      SMOKE_SEQ.forEach(k=>{const t=this.textures.get(k);if(t)t.setFilter(Phaser.Textures.FilterMode.NEAREST);});
      const img=this.add.image(sx,sy,SMOKE_SEQ[0]).setOrigin(0.5,1).setDepth(wx+wy+100);
      const applyFrame=()=>{
        const k=SMOKE_SEQ[idx];
        img.setTexture(k);
        img.setScale((SPRITE_TARGET_H[k]||123)/img.height);
      };
      applyFrame();
      const advance=()=>{
        if(!img.active)return; // Szene/Sprite wurde beim Raumwechsel schon zerstört
        idx=(idx+1)%SMOKE_SEQ.length;
        applyFrame();
        // Nach einem vollen Zyklus (zurück bei idx=0) längere Pause, statt sofort
        // wieder zu ziehen — wirkt natürlicher, kein Dauer-Rauchen
        const delay=idx===0?5000:SMOKE_MS[idx];
        this.time.delayedCall(delay,advance);
      };
      this.time.delayedCall(SMOKE_MS[idx],advance);
    }else{
      const texKey=useLie?lieKey:(useSit?sitKey:key);
      if(loadedSprites.has(texKey)){
        // 🖼️ Echtes Sprite-Bild vorhanden — automatisch auf einheitliche
        // Zielgröße skaliert (Seitenverhältnis bleibt erhalten), egal
        // welche native Auflösung das generierte Bild hat.
        if(useLie){
          const img=this.add.image(sx,sy,texKey).setOrigin(0.5,0.5).setDepth(wx+wy+100);
          const targetH=SPRITE_TARGET_H[texKey]??60;
          img.setScale(targetH/img.height);
          img.setRotation(Math.atan2(IY,IX)); // Kopf zum Kopfteil (kleines wx), Füße Richtung Raum
        }else{
          const img=this.add.image(sx,sy,texKey).setOrigin(0.5,1).setDepth(wx+wy+100);
          const targetH=SPRITE_TARGET_H[texKey]??(human?123:90);
          img.setScale(targetH/img.height);
          if(useSit&&slot==='couch_r')img.setFlipX(true); // zur Mitte hin ausgerichtet
        }
      }else{
        // Fallback: eingebaute prozedurale Pixel-Art
        const gfx=this.add.graphics().setDepth(wx+wy+100);
        if(human)drawHuman(gfx,sx,sy,data.cfg);else drawCat(gfx,sx,sy,data.cfg);
      }
    }
    const hlg=this.add.graphics().setDepth(wx+wy+99);
    let nTag=null;
    // Quest-Marker: zeigt permanent ein Icon, wenn dieser NPC eine aktive Quest hat
    const activeQ=Object.values(QUESTS).find(q=>q.npc===key&&GS.quests.active===q.id);
    if(activeQ){
      this.add.text(sx,sy-hitH-14,'❗',{fontSize:'16px',fontFamily:'Arial'}).setOrigin(0.5).setDepth(wx+wy+120);
    }
    const zone=this.add.zone(sx,sy-hitH/2,hitW,hitH).setOrigin(0.5).setInteractive({cursor:'pointer'}).setDepth(wx+wy+110);
    zone.on('pointerover',()=>{hlg.fillStyle(0xFFFFFF,0.1);hlg.fillEllipse(sx,sy-hitH/2,hitW+12,hitH+12);if(!nTag)nTag=this.add.text(sx,sy-hitH-4,data.name,{fontSize:'13px',fontFamily:'Arial',color:'#F0E8FF',backgroundColor:'#22164499',padding:{x:6,y:3}}).setOrigin(0.5).setDepth(600);});
    zone.on('pointerout',()=>{hlg.clear();if(nTag){nTag.destroy();nTag=null;}});
    zone.on('pointerdown',()=>{this._npcClick=true;if(this.activeDialog)this.closeDialog();this.openDialog(sx,sy-hitH,key);});
  }
  openDialog(sx,sy,npcKey){
    let text;
    // 1) Hat dieser NPC schon eine aktive Quest? → Erinnerungstext zeigen
    const active=Object.values(QUESTS).find(q=>q.npc===npcKey&&GS.quests.active===q.id);
    if(active){
      text=active.getOfferText(GS);
    }else{
      // 2) Chance auf eine NEUE Quest von diesem NPC
      const candidates=Object.values(QUESTS).filter(q=>q.npc===npcKey);
      const triggered=candidates.find(q=>q.tryOffer(GS));
      if(triggered){
        text=triggered.getOfferText(GS);
      }else{
        // 3) Kein Quest-Trigger → normaler Zufallsdialog
        text=rndDial(npcKey,GS.period(),this.roomKey);
      }
    }
    const bW=Math.max(120,Math.min(250,text.length*8+28));
    const txt=this.add.text(0,0,text,{fontSize:'13px',fontFamily:'Arial',color:'#281840',wordWrap:{width:bW-26},resolution:2}).setDepth(701);
    const bH=Math.max(40,txt.height+22);
    const bX=Phaser.Math.Clamp(sx-bW/2,8,GW-bW-8),bY=Math.max(8,sy-bH-14);
    const tX=Phaser.Math.Clamp(sx,bX+10,bX+bW-10);
    txt.setPosition(bX+13,bY+11);
    const bg=this.add.graphics().setDepth(700);
    bg.fillStyle(C.DL_BG);bg.fillRoundedRect(bX,bY,bW,bH,7);
    bg.lineStyle(2,C.DL_BD);bg.strokeRoundedRect(bX,bY,bW,bH,7);
    bg.fillStyle(C.DL_BG);bg.fillTriangle(tX-7,bY+bH,tX+7,bY+bH,tX,bY+bH+10);
    bg.lineStyle(2,C.DL_BD);bg.beginPath();bg.moveTo(tX-7,bY+bH);bg.lineTo(tX,bY+bH+10);bg.lineTo(tX+7,bY+bH);bg.strokePath();
    this.activeDialog={bg,txt};
  }
  closeDialog(){if(this.activeDialog){this.activeDialog.bg.destroy();this.activeDialog.txt.destroy();this.activeDialog=null;}}
}

// SCHLAFZIMMER — Gaming Bedroom (from photo!)
class Schlafzimmer extends BaseRoom{
  constructor(){super('Schlafzimmer','schlafzimmer');}
  drawRoom(g){
    OX=417;OY=147;
    roomBox(g,C.BD_WL,C.BD_WR,C.BD_FL);planks(g,C.BD_FLP);
    for(let z=0.5;z<2.8;z+=0.55){wB(g,0xFFFFFF,0,0.5,8.5,z,z+0.08,0.04);wL(g,0xFFFFFF,0,0.5,6.5,z,z+0.08,0.04);}
    // LED strip (warm orange behind headboard, sized to match headboard width)
    wL(g,C.BD_LED,  0,0.5,2.9,0.74,0.82);
    wL(g,C.BD_LED,  0,0.4,3.0,0.70,0.86,0.18);
    wL(g,0xFFEE90,  0,0.6,2.8,0.76,0.80,0.12);
    // (Wardrobe moved — see below)
    // Gaming desk (shortened on the left so it no longer overlaps the bed, which ends at wx=5.0)
    box(g,5.0,0.3,0,4.0,1.8,0.85,0x3A3A44,0x2E2E38,0x46464F);
    wL(g,0x2E2E38,9.0,0.3,2.1,0,0.85); // right-side panel (closes the open edge)
    box(g,5.1,2.0,0,0.18,0.1,0.85,0x2E2E38,0x2E2E38,0x2E2E38);
    box(g,8.7,2.0,0,0.18,0.1,0.85,0x2E2E38,0x2E2E38,0x2E2E38);
    // PC tower with RGB (positioned entirely in front of the desk, not inside its footprint)
    box(g,8.1,2.1,0,0.8,0.8,1.1,C.BD_PC,C.BD_PCF,C.BD_PCT);
    // subtle vents + status light for detail
    for(let vy=2.15;vy<2.9;vy+=0.2){wL(g,0x0C0C12,8.1,vy,vy+0.1,0.25,0.9,0.6);}
    const pcLedS=I(8.9,2.9,0.95);
    g.fillStyle(0x40D0FF,0.9);g.fillCircle(pcLedS.x,pcLedS.y,3);
    g.fillStyle(0x40D0FF,0.25);g.fillCircle(pcLedS.x,pcLedS.y,7);
    // Shelf
    wB(g,C.BD_SHF,0,5.0,9.0,1.85,2.0);wB(g,C.BD_SHFT,0,5.0,9.0,1.98,2.06);
    // Monitors
    box(g,5.0,0.30,0.85,1.8,0.08,0.82,C.BD_MON,C.BD_MGLOW,C.BD_MGLOW);
    box(g,6.9,0.30,0.85,1.7,0.08,0.82,C.BD_MON,C.BD_MGLOW,C.BD_MGLOW);
    const monS=I(6.5,0.32,1.3);
    g.fillStyle(0x3050A8,0.2);g.fillEllipse(monS.x,monS.y,80,36);
    g.fillStyle(0x5040A0,0.1);g.fillEllipse(monS.x,monS.y+8,130,55);
    box(g,5.7,0.30,0.85,0.3,0.07,0.1,0x404050,0x303040,0x404050);
    box(g,7.5,0.30,0.85,0.3,0.07,0.1,0x404050,0x303040,0x404050);
    // GAME ON neon
    const nP=I(6.35,0,2.32);
    g.fillStyle(C.BD_NEON,0.2);g.fillEllipse(nP.x,nP.y,70,22);
    g.fillStyle(C.BD_NEON,0.08);g.fillEllipse(nP.x,nP.y,110,35);
    this.add.text(nP.x,nP.y-1,'GAME ON',{fontSize:'11px',fontFamily:'"Arial Black",Arial',fontStyle:'bold',color:'#FF8030',stroke:'#FF4010',strokeThickness:2,resolution:2}).setOrigin(0.5).setDepth(80).setRotation(Math.atan2(IY,IX));
    // Plants on shelf
    const ps1=I(5.5,0,2.02);plantAt(g,ps1.x,ps1.y-8,C.PL_M,6);
    const ps2=I(7.2,0,2.02);plantAt(g,ps2.x,ps2.y-8,0x289A60,6);
    // Books on shelf (right side, empty space) — rotated to align with wall slant
    const bkS=I(7.9,0.3,2.05);
    const bkCols=[0xC04848,0x4868B8,0xD8A838,0x489868,0xA858B0];
    g.save();
    g.translateCanvas(bkS.x,bkS.y-8);
    g.rotateCanvas(0.4);
    let bkOX=0;
    for(let bi=0;bi<bkCols.length;bi++){
      const bw=7+((bi%2)*2), bh=24+((bi%3)*6);
      g.fillStyle(bkCols[bi]);g.fillRect(bkOX,-bh,bw,bh);
      g.fillStyle(0xFFFFFF,0.22);g.fillRect(bkOX,-bh,bw,3);
      bkOX+=bw+1;
    }
    g.restore();
    // Wall art
    wL(g,0xC0A060,0,0.8,2.2,1.4,2.5);wL(g,0xF0ECE0,0,0.85,2.15,1.45,2.45);
    const aP=I(0,1.5,1.98);g.fillStyle(0xF0A020,0.85);g.fillCircle(aP.x-4,aP.y+5,7);g.fillStyle(0xF0D040,0.5);g.fillCircle(aP.x-4,aP.y+5,11);
    wL(g,0xA07040,0,2.4,3.5,1.5,2.4);wL(g,0xD8B8A0,0,2.45,3.45,1.55,2.35);
    // BED
    // 1. Kopfteil (schmal, an der Wand, erstreckt sich in Y)
    box(g,0.2,0.5,0,0.3,2.4,1.1,C.BD_HDR,C.BD_HDR,C.BD_HDR);
    // 2. Bettrahmen (an der Wand entlang, schmal in den Raum rein)
    box(g,0.5,0.5,0,4.5,2.4,0.18,0x3A3250,0x2A2240,0x3A3250);
    // 3. Matratze
    box(g,0.6,0.6,0.18,4.3,2.2,0.55,C.BD_MAT,C.BD_MATF,C.BD_MATT);
    // 4. Decke
    box(g,2.4,0.75,0.73,2.7,2.3,0.22,C.BD_BL,C.BD_BLF,C.BD_BLT);
    wL(g,0x3A3248,2.4,0.75,2.85,0.87,0.97);
    // 5. Kissen (am Kopfteil, nebeneinander in Y)
    box(g,0.7,0.65,0.73,0.8,0.9,0.24,C.BD_PIL,C.BD_PILF,C.BD_PILT);
    box(g,0.7,1.75,0.73,0.8,0.9,0.24,C.BD_PIL,C.BD_PILF,C.BD_PILT);
    const pl1=I(1.1,1.1,0.97),pl2=I(1.1,2.2,0.97);
    g.fillStyle(0xD08080,0.5);for(let pi=0;pi<3;pi++){g.fillRect(pl1.x-4+pi*2,pl1.y-4+pi*3,3,3);g.fillRect(pl2.x-4+pi*2,pl2.y-4+pi*3,3,3);}
    // Wardrobe (moved here from back wall)
    box(g,4.2,6.0,0,3.5,0.88,2.5,C.BD_WARD,C.BD_WARDF,C.BD_WARDT);
    // Door panels on front face (y=6.88)
    wB(g,0x9A7848,6.88,4.45,5.85,0.05,2.45);
    wB(g,0x9A7848,6.88,5.95,7.65,0.05,2.45);
    // Handles
    wB(g,0xD4B870,6.88,4.95,5.15,1.1,1.26);
    wB(g,0xD4B870,6.88,6.60,6.80,1.1,1.26);
    // Gaming chair
    box(g,6.3,2.2,0,1.2,1.2,0.52,C.BD_CHR,C.BD_CHRF,C.BD_CHRT);
    box(g,6.3,2.2,0.52,1.2,0.18,1.32,C.BD_CHR,C.BD_CHRF,C.BD_CHRT);
    box(g,6.25,2.25,0.52,0.14,1.0,0.12,0x282830,0x282830,0x282830);
    box(g,7.46,2.25,0.52,0.14,1.0,0.12,0x282830,0x282830,0x282830);
    box(g,6.4,2.2,1.84,1.0,0.15,0.42,C.BD_CHR,C.BD_CHRF,C.BD_CHRT);
    const chS=I(6.9,3.5,0);g.fillStyle(0x282830,0.75);g.fillEllipse(chS.x,chS.y,62,26);
  }
}

// WOHNZIMMER
class Wohnzimmer extends BaseRoom{
  constructor(){super('Wohnzimmer','wohnzimmer');}
  drawRoom(g){
    OX=417;OY=147;
    roomBox(g,C.LR_WL,C.LR_WR,C.LR_FL);planks(g,C.LR_FLP);

    // === KRATZBAUM (links neben dem Sofa, Rückwand-Ecke) ===
    box(g,0.4,0.3,0, 0.4,0.4,2.82, C.LR_CTP,C.LR_CTP,C.LR_CTP);
    box(g,0.0,0.0,2.2, 1.6,0.85,0.12, C.LR_CTF,C.LR_CTT,C.LR_CTT);
    box(g,0.1,0.0,1.4, 1.4,0.85,0.12, C.LR_CTF,C.LR_CTT,C.LR_CTT);
    box(g,0.0,0.0,0.7, 1.6,0.85,0.12, C.LR_CTF,C.LR_CTT,C.LR_CTT);
    for(let sz=0.2;sz<2.1;sz+=0.4)box(g,0.42,0.32,sz,0.32,0.32,0.05,0xC4A050,0xB49040,0xD4B060);
    const toyS=I(0.5,0.3,2.72);g.fillStyle(0xE04040);g.fillRect(toyS.x-4,toyS.y,8,12);g.fillEllipse(toyS.x,toyS.y+14,10,8);

    // === SOFA (Warmes Lederbraun, L-Form mit grauen Kissen) ===
    // --- HAUPTTEIL AN DER RÜCKWAND ---
    box(g,1.8,0.5,0, 6.9,0.3,1.15, 0x6A4020,0x805028,0x5E3818);
    box(g,1.8,0.8,0, 6.9,1.8,0.55, 0x6A4020,0x805028,0x9A6840);
    box(g,1.9,0.85,0.55, 2.3,1.65,0.35, 0x7A4C28,0x8E5C34,0xA8764C);
    box(g,4.4,0.85,0.55, 2.3,1.65,0.35, 0x7A4C28,0x8E5C34,0xA8764C);
    box(g,1.6,0.5,0, 0.22,2.1,0.65, 0x6A4020,0x805028,0x6A4020);
    // --- KISSEN HAUPTTEIL (Schiefergrau) ---
    box(g,1.95,0.58,0.55, 0.95,0.85,0.52, 0x707880,0x848C96,0x9CA4AC);
    box(g,3.10,0.58,0.55, 0.95,0.85,0.52, 0x7A828C,0x8E96A0,0xA8B0BA);
    box(g,4.40,0.58,0.55, 0.95,0.85,0.52, 0x707880,0x848C96,0x9CA4AC);
    hP(g,0x5E3818,2.0,1.0,4.0,2.7,0.55,0.12);
    // --- ECKTEIL (an der rechten Wand entlang) ---
    box(g,8.4,0.5,0, 0.6,3.5,1.15, 0x6A4020,0x805028,0x5E3818);
    box(g,7.0,0.5,0, 1.4,3.5,0.55, 0x6A4020,0x805028,0x9A6840);
    box(g,7.1,0.6,0.55, 1.25,1.6,0.35, 0x7A4C28,0x8E5C34,0xA8764C);
    box(g,7.1,2.4,0.55, 1.25,1.5,0.35, 0x7A4C28,0x8E5C34,0xA8764C);
    // --- KISSEN ECKTEIL (Schiefergrau) ---
    box(g,7.6,0.65,0.55, 0.85,0.85,0.52, 0x7A828C,0x8E96A0,0xA8B0BA);
    box(g,7.6,2.50,0.55, 0.85,0.85,0.52, 0x707880,0x848C96,0x9CA4AC);

    // === TISCH (linke Wand x=0, "oberste Wand") ===
    box(g,0,3.0,0, 0.9,1.8,0.44, C.LR_TBL,C.LR_TBLF,C.LR_TBLT);
    const mugS=I(0.45,3.5,0.44);g.fillStyle(0xF0E8C8);g.fillRect(mugS.x-6,mugS.y-10,12,10);g.fillStyle(0x7A4020);g.fillRect(mugS.x-5,mugS.y-9,10,4);
    const bkS=I(0.45,4.3,0.44);g.fillStyle(C.LR_P1);g.fillRect(bkS.x-10,bkS.y-5,20,8);
    // Stühle vor dem Tisch
    box(g,1.0,3.1,0, 0.9,0.85,0.46, 0xA07838,0x906830,0xB08840);
    box(g,1.0,3.1,0.46, 0.9,0.1,1.0, 0xA07838,0x906830,0xB08840);
    box(g,1.0,4.35,0, 0.9,0.85,0.46, 0xA07838,0x906830,0xB08840);
    box(g,1.0,4.35,0.46, 0.9,0.1,1.0, 0xA07838,0x906830,0xB08840);

    // === FERNSEHER (freistehend auf weißem Sideboard, vorne) ===
    box(g,1.8,6.5,0, 5.4,0.5,0.42, 0xFFFFFF,0xFFFFFF,0xFFFFFF);
    // Standfuß (Bodenplatte & Hals)
    box(g,4.0,6.65,0.42, 0.8,0.2,0.04, 0x282828,0x181818,0x303030);
    box(g,4.3,6.70,0.46, 0.2,0.1,0.12, 0x202020,0x151515,0x282828);
    // Flachbildfernseher (sehr flach, sd=0.08)
    box(g,3.0,6.72,0.58, 3.0,0.08,1.84, 0x282830,0x181820,0x383840);

    // Pflanze an linker Wand
    const lpl1=I(0,5.5,0);plantAt(g,lpl1.x,lpl1.y,C.PL_M,8);

    // 🔓 Geheimer Auslöser: Klick auf diese Pflanze schaltet den Keller frei
    const secretZone=this.add.zone(lpl1.x,lpl1.y-16,44,50).setOrigin(0.5).setInteractive({cursor:'pointer'}).setDepth(96);
    secretZone.on('pointerdown',()=>{
      this._npcClick=true;
      if(!GS.kellerUnlocked){
        GS.kellerUnlocked=true;saveGame();
        this.openItemMsg(lpl1.x,lpl1.y-40,'Die Pflanze wackelt... etwas hat sich bewegt! \ud83c\udf3f\ud83d\udd11');
      }else{
        this.openItemMsg(lpl1.x,lpl1.y-40,'Nur eine ganz normale Pflanze. \ud83c\udf31');
      }
    });
  }
}

// KÜCHE
class Kueche extends BaseRoom{
  constructor(){super('Kueche','kueche');}
  drawRoom(g){
    OX=417;OY=147;
    roomBox(g,C.KT_WL,C.KT_WR,C.KT_FL);
    g.lineStyle(1,C.KT_FLP,0.38);
    for(let x=0;x<9;x++){const a=I(x,0,0),b=I(x,7,0);g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.strokePath();}
    for(let y=0;y<7;y++){const a=I(0,y,0),b=I(9,y,0);g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.strokePath();}
    box(g,0.5,0,1.82,3.2,0.58,1.0,C.KT_CB,C.KT_CBF,C.KT_CBT);
    box(g,4.2,0,1.82,4.2,0.58,1.0,C.KT_CB,C.KT_CBF,C.KT_CBT);
    wB(g,0xD0C090,0.58,0.9,1.4,2.22,2.36);wB(g,0xD0C090,0.58,2.0,2.5,2.22,2.36);wB(g,0xD0C090,0.58,4.7,5.2,2.22,2.36);wB(g,0xD0C090,0.58,6.5,7.0,2.22,2.36);
    box(g,0.3,0,0,8.4,0.8,0.88,C.KT_CT,C.KT_CTF,C.KT_CTT);
    for(let btx=0.5;btx<8.5;btx+=0.8)wB(g,0xFFFFFF,0,btx,btx+0.74,0.9,1.75,0.18);
    box(g,0.3,0,0,0.9,0.8,2.2,C.KT_FG,C.KT_FGF,C.KT_FGT);
    wB(g,0xC0C0BC,0.8,0.38,0.44,0.38,0.72);wB(g,0xC0C0BC,0.8,0.38,0.44,0.98,1.32);
    wB(g,0xE06060,0.8,0.34,0.56,1.5,1.76);wB(g,0x60A060,0.8,0.56,0.76,1.5,1.76);wB(g,0x6060E0,0.8,0.34,0.56,1.8,2.02);
    box(g,1.5,0,0.88,1.5,0.8,0.08,C.KT_ST,C.KT_STF,C.KT_STT);
    [[1.68,0.24],[2.52,0.24],[1.68,0.64],[2.52,0.64]].forEach(([bx,by])=>{const bp=I(bx,by,0.97);g.fillStyle(0x484840);g.fillEllipse(bp.x,bp.y,22,10);g.fillStyle(0x282828);g.fillEllipse(bp.x,bp.y,14,6);});
    box(g,1.8,0.2,0.96,0.9,0.6,0.56,0x606060,0x505050,0x707070);
    box(g,3.5,0,0.88,1.5,0.8,0.06,0xD8D0C0,0xC8C0B0,C.KT_CT);
    const snkP=I(4.0,0.36,0.95);g.fillStyle(0xA0B0B8,0.88);g.fillEllipse(snkP.x,snkP.y,40,18);
    box(g,4.1,0,0.95,0.08,0.3,0.72,0xC0C8CC,0xB0B8BC,0xD0D8DC);
    box(g,5.0,3.5,0,3.5,2.0,0.84,0xB89050,0xA07838,0xD0A860);
    const plt=I(6.5,4.5,0.84);g.fillStyle(0xF0ECE0);g.fillEllipse(plt.x,plt.y,35,17);g.fillStyle(0x80A060,0.78);g.fillEllipse(plt.x,plt.y-3,24,11);
    box(g,4.4,3.8,0,0.9,0.9,0.46,0xA07838,0x906830,0xB08840);box(g,4.4,3.8,0.46,0.9,0.1,1.0,0xA07838,0x906830,0xB08840);
    box(g,8.2,3.8,0,0.9,0.9,0.46,0xA07838,0x906830,0xB08840);box(g,8.2,3.8,0.46,0.9,0.1,1.0,0xA07838,0x906830,0xB08840);
    wB(g,0x90C8DC,0,5.3,8.1,1.38,2.72);wB(g,0xD8C890,0,5.2,5.32,1.28,2.82);wB(g,0xD8C890,0,8.08,8.2,1.28,2.82);wB(g,0xD8C890,0,5.2,8.2,2.72,2.84);wB(g,0xD8C890,0,5.2,8.2,1.26,1.4);wB(g,0xD8C890,0,6.65,6.77,1.28,2.82);wB(g,0xD8C890,0,5.2,8.2,2.0,2.1);
    const kpl=I(7.5,0,0.9);plantAt(g,kpl.x,kpl.y-8,C.PL_M,6);
  }
}

// BAD
class Bad extends BaseRoom{
  constructor(){super('Bad','bad');}
  drawRoom(g){
    OX=417;OY=147;
    roomBox(g,C.BT_WL,C.BT_WR,C.BT_FL);
    g.lineStyle(1,C.BT_FLP,0.38);
    for(let x=0;x<9;x++){const a=I(x,0,0),b=I(x,7,0);g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.strokePath();}
    for(let y=0;y<7;y++){const a=I(0,y,0),b=I(9,y,0);g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.strokePath();}
    for(let z=0;z<3;z+=0.6){wL(g,0xFFFFFF,0,0,7,z,z+0.57,0.14);wB(g,0xFFFFFF,0,0,9,z,z+0.57,0.14);}
    box(g,0.8,2.5,0,1.4,0.8,0.92,C.BT_TL,C.BT_TLF,C.BT_TLT);
    box(g,0.9,2.5,0.92,1.2,0.65,0.62,C.BT_TL,C.BT_TLF,C.BT_TLT);
    box(g,0.3,3.0,0.58,0.4,0.4,0.42,0xF8F0E0,0xF0E8D8,0xFAF4EA);
    box(g,3.5,2.2,0,2.0,0.8,0.92,0xE8E8E4,0xD8D8D0,0xF0F0EC);
    const snk=I(4.4,2.65,0.92);g.fillStyle(0xA8C0C8,0.88);g.fillEllipse(snk.x,snk.y,50,22);
    box(g,4.3,2.2,0.92,0.1,0.3,0.56,0xC0C8CC,0xB0B8BC,0xD0D8DC);
    wB(g,0xA0C8D8,0,3.5,5.5,0.98,2.62,0.78);wB(g,0xC8E0EC,0,3.55,5.45,1.03,2.57,0.48);wB(g,0xD8C890,0,3.5,5.5,0.95,1.03);wB(g,0xD8C890,0,3.5,5.5,2.57,2.65);
    box(g,5.8,1.8,0,2.8,2.2,0.72,C.BT_TB,C.BT_TBF,C.BT_TBT);
    hP(g,0xB8D8E8,5.9,1.9,8.5,3.9,0.68,0.7);
    const dkS=I(6.8,2.5,0.72);g.fillStyle(0xF0D820);g.fillEllipse(dkS.x,dkS.y,22,11);g.fillStyle(0xF0D820);g.fillEllipse(dkS.x-5,dkS.y-8,13,10);g.fillStyle(0xE08020);g.fillRect(dkS.x-2,dkS.y-11,6,3);g.fillStyle(0x181010);g.fillCircle(dkS.x-8,dkS.y-11,2);
    box(g,5.9,1.8,0.72,0.3,0.3,0.68,0xE090C0,0xD080B0,0xF0A0D0);
    box(g,6.3,1.8,0.72,0.3,0.3,0.68,0x80D890,0x70C880,0x90E8A0);
    box(g,8.5,1.8,0.72,0.08,0.5,0.72,0xC0C8CC,0xB0B8BC,0xD0D8DC);
    wL(g,0xE09090,0,5.0,6.5,0.9,1.62);wL(g,0x9090E0,0,6.6,7.8,0.9,1.62);
    const bpl=I(0,6.5,0);plantAt(g,bpl.x,bpl.y,0x30B850,7);
  }
}

// FLUR
class Flur extends BaseRoom{
  constructor(){super('Flur','flur');}
  drawRoom(g){
    OX=417;OY=147;
    // Umgedrehtes L: breiter Balken hinten (volle Breite, Bad links / Küche rechts),
    // schmaler Steg vorne links (zu Schlafzimmer / Wohnzimmer)
    const AX=4.0, AY=2.2; // Ecke des Winkels: Steg reicht von x:0-AX, ab y:AY nach vorne

    // Boden — als zwei einfache Rechtecke statt einem konkaven Polygon (verhindert Füllfehler)
    fp(g,C.HL_FL,[I(0,0,0),I(9,0,0),I(9,AY,0),I(0,AY,0)]);
    fp(g,C.HL_FL,[I(0,AY,0),I(AX,AY,0),I(AX,7,0),I(0,7,0)]);

    // Rückwand (volle Breite — Bad-Ende links, Küche-Ende rechts)
    fp(g,C.HL_WL,[I(0,0,0),I(9,0,0),I(9,0,3),I(0,0,3)]);
    // Linke Wand (volle Tiefe, trägt den Steg)
    fp(g,C.HL_WL,[I(0,0,0),I(0,7,0),I(0,7,3),I(0,0,3)]);
    // Innenecke Wand 1: schließt den Balken unten ab (y=AY, x:AX-9)
    fp(g,C.HL_WL,[I(AX,AY,0),I(9,AY,0),I(9,AY,3),I(AX,AY,3)]);
    // Innenecke Wand 2: rechte Seite des Stegs (x=AX, y:AY-7)
    fp(g,C.HL_WL,[I(AX,AY,0),I(AX,7,0),I(AX,7,3),I(AX,AY,3)]);
    // Rechter Abschluss des Balkens (x=9, y:0-AY) — schließt die offene Kante
    fp(g,C.HL_WL,[I(9,0,0),I(9,AY,0),I(9,AY,3),I(9,0,3)]);

    // Bodendielen (nur innerhalb der L-Form)
    g.lineStyle(1,C.HL_FLP,0.28);
    for(let y=0.5;y<7;y+=0.5){
      const xEnd = y<AY ? 9 : AX;
      const a=I(0,y,0),b=I(xEnd,y,0);
      g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.strokePath();
    }

    wL(g,0xE8D090,0,0,7,0,0.92);
    wB(g,0xE8D090,0,0,9,0,0.92);
    wL(g,0xD8C080,0,0,7,0.9,0.98);
    wB(g,0xD8C080,0,0,9,0.9,0.98);
    // gleiche Sockel-Deko für die Innenecken-Wände
    wB(g,0xE8D090,AY,AX,9,0,0.92);
    wL(g,0xE8D090,AX,AY,7,0,0.92);
    wB(g,0xD8C080,AY,AX,9,0.9,0.98);
    wL(g,0xD8C080,AX,AY,7,0.9,0.98);

    // Deko: Garderobe im Balken (mittig, wie markiert)
    box(g,5.6,1.5,0,0.15,0.15,2.0,0x7A5838,0x6A4828,0x8A6848);
    box(g,5.3,1.3,1.82,1.4,0.4,0.1,0xC09050,0xA87838,0xD0A860);
    box(g,5.5,1.35,1.0,0.5,0.3,0.82,C.P1_SH,0x506070,0x708090);
    box(g,6.1,1.35,0.92,0.5,0.3,0.92,C.P2_SH,0xB87868,0xD89888);
    const hatS=I(5.9,1.3,1.92);g.fillStyle(0x404048);g.fillEllipse(hatS.x,hatS.y,22,10);g.fillStyle(0x505058);g.fillRect(hatS.x-7,hatS.y-8,14,8);
    box(g,5.3,1.8,0,2.5,0.35,0.08,0x9A7840,0x8A6830,0xAA8848);
    box(g,5.3,1.8,0.3,2.5,0.35,0.08,0x9A7840,0x8A6830,0xAA8848);
    box(g,5.4,1.82,0.08,0.6,0.35,0.22,0x202020,0x181818,0x282828);
    box(g,6.2,1.82,0.08,0.6,0.35,0.22,0xC06040,0xB05030,0xD07050);
    box(g,7.0,1.82,0.08,0.6,0.35,0.22,0x5068A0,0x405888,0x6078B8);
    // Spiegel auf die freie X-Wand (Rückwand, y=0) verlegt
    wB(g,0xD8C890,0,5.5,6.8,0.92,2.62);wB(g,0x90B8C8,0,5.55,6.75,0.97,2.57,0.74);
    const hpl=I(8.5,0.3,0);plantAt(g,hpl.x,hpl.y,C.PL_M,8);
  }
}

// BALKON
class Balkon extends BaseRoom{
  constructor(){super('Balkon','balkon');}
  drawRoom(g){
    OX=417;OY=147;
    const period=GS.period();
    const isNight=period==='night';
    const isEvening=period==='evening';
    // Himmelsfarben je nach Tageszeit
    let sk1,sk2,sk3,windowLit,windowOff,cloudCol,cloudA;
    if(isNight){
      sk1=0x0C1428;sk2=0x18223C;sk3=0x28304C;
      windowLit=0xF0D060;windowOff=0x141824;cloudA=0;
    }else if(isEvening){
      sk1=0xE86840;sk2=0xF0986C;sk3=0xF8C89C;
      windowLit=0xFFE090;windowOff=0x8878A0;cloudA=0.55;cloudCol=0xFFC8A0;
    }else{
      sk1=C.BL_SK1;sk2=C.BL_SK2;sk3=C.BL_SK3;
      windowLit=0xF0E8C0;windowOff=0xF0E8C0;cloudA=0.84;cloudCol=0xF4F8FC;
    }
    g.fillStyle(sk1);g.fillRect(0,0,GW,140);g.fillStyle(sk2);g.fillRect(0,140,GW,140);g.fillStyle(sk3);g.fillRect(0,280,GW,143);
    if(isNight){
      // Sterne + Mond statt Wolken
      for(let i=0;i<40;i++){
        const sx2=(i*67+13)%GW,sy2=(i*41+7)%260;
        g.fillStyle(0xF8F8FF,0.35+0.4*((i*7)%3)/3);g.fillRect(sx2,sy2,2,2);
      }
      g.fillStyle(0xF0EAD8,0.9);g.fillCircle(560,60,26);
      g.fillStyle(0x0C1428,0.5);g.fillCircle(572,52,24); // Mondsichel-Schatten
    }else{
      const cloud=(x,y,w)=>{g.fillStyle(cloudCol,cloudA);g.fillRect(x,y,w,20);g.fillRect(x-8,y+6,w+17,15);g.fillRect(x+11,y-7,w-22,17);};
      cloud(59,31,101);cloud(371,49,134);cloud(577,21,106);
    }
    g.fillStyle(0x8898A8,isNight?0.55:0.3);g.fillRect(0,123,78,297);g.fillRect(56,98,120,322);g.fillRect(490,101,109,319);g.fillRect(588,77,87,343);
    // Gebäudefenster — nachts unterschiedlich hell erleuchtet, sonst einheitlich
    const winSeed=(bx,by)=>((bx*13+by*7)%5);
    g.fillStyle(windowLit,isNight?0.95:0.33);for(let by=109;by<280;by+=25)for(let bx=62;bx<171;bx+=28){if(!isNight||winSeed(bx,by)>1)g.fillRect(bx,by,13,17);else{g.fillStyle(windowOff,0.5);g.fillRect(bx,by,13,17);g.fillStyle(windowLit,0.95);}}
    for(let by=92;by<280;by+=25)for(let bx=497;bx<602;bx+=28){if(!isNight||winSeed(bx,by)>1)g.fillRect(bx,by,13,17);else{g.fillStyle(windowOff,0.5);g.fillRect(bx,by,13,17);g.fillStyle(windowLit,0.95);}}
    g.fillStyle(0x408050,isNight?0.6:0.42);g.fillRect(0,224,59,196);g.fillRect(613,217,56,203);
    const wlC=isNight?0x585458:(isEvening?0xD8A888:C.BL_WL);
    const flC=isNight?0x807868:(isEvening?0xC0A080:C.BL_FL);
    const rlC=isNight?0x8A7860:(isEvening?0xC8A868:C.BL_RL);
    fp(g,wlC,[I(0,0,0),I(9,0,0),I(9,0,3),I(0,0,3)]);fp(g,wlC,[I(0,0,0),I(0,7,0),I(0,7,3),I(0,0,3)]);fp(g,flC,[I(0,0,0),I(9,0,0),I(9,7,0),I(0,7,0)]);planks(g,isNight?0x706858:0xB0A898);
    box(g,0,6.8,0.82,9,0.2,0.08,rlC,rlC,0xECE8C8);box(g,0,6.8,0.32,9,0.2,0.08,rlC,rlC,0xECE8C8);box(g,0,6.8,0,9,0.2,0.34,rlC,rlC,0xECE8C8);
    for(let bx=0.3;bx<9;bx+=0.6)box(g,bx,6.8,0.08,0.1,0.2,0.74,0xCCC888,0xBCB878,0xDDD898);
    wB(g,0x90C0D8,0,1.5,4.5,0,2.82,0.44);wB(g,0xB0B088,0,1.5,1.62,0,2.82);wB(g,0xB0B088,0,4.38,4.5,0,2.82);wB(g,0xB0B088,0,1.5,4.5,2.76,2.84);
    box(g,3.5,3.5,0,1.5,1.5,0.08,0xD8D090,0xC8C080,0xE8E0A0);box(g,4.1,4.4,0,0.15,0.15,0.9,0xC0B870,0xB0A860,0xD0C880);
    box(g,2.8,3.8,0,1.0,0.9,0.48,0xCCC880,0xBCB870,0xDDD890);box(g,2.8,3.8,0.48,1.0,0.1,0.95,0xCCC880,0xBCB870,0xDDD890);
    box(g,4.8,3.8,0,1.0,0.9,0.48,0xCCC880,0xBCB870,0xDDD890);box(g,4.8,3.8,0.48,1.0,0.1,0.95,0xCCC880,0xBCB870,0xDDD890);
    const cup1=I(3.8,4.0,0.08),cup2=I(4.5,4.0,0.08);g.fillStyle(0xF0E8C8);g.fillRect(cup1.x-6,cup1.y-11,12,11);g.fillRect(cup2.x-6,cup2.y-11,12,11);g.fillStyle(0x7A4020);g.fillRect(cup1.x-5,cup1.y-10,10,4);g.fillRect(cup2.x-5,cup2.y-10,10,4);
    const fCols=[0xE84060,0xE8C020,0xB040D0];
    [[1.0,6.8],[3.5,6.8],[7.0,6.8]].forEach(([px,py],fi)=>{
      box(g,px,py,0.9,0.6,0.2,0.58,0xA04020,0xC05030,0xD06040);
      const ppS=I(px+0.3,py,1.5);g.fillStyle(C.PL_M);g.fillRect(ppS.x-8,ppS.y-20,6,22);g.fillRect(ppS.x-3,ppS.y-28,8,30);g.fillRect(ppS.x+3,ppS.y-18,6,20);g.fillStyle(fCols[fi]);g.fillRect(ppS.x-7,ppS.y-24,7,7);g.fillRect(ppS.x-1,ppS.y-31,7,7);g.fillRect(ppS.x+4,ppS.y-22,7,7);
    });
  }
}

// ═══════════════════════════════════════════════════════════════
//  🔓 GEHEIMER KELLER — nur über die Pflanze im Wohnzimmer erreichbar
// ═══════════════════════════════════════════════════════════════
class Keller extends BaseRoom{
  constructor(){super('Keller','keller');}
  drawRoom(g){
    OX=417;OY=147;
    roomBox(g,0x3A3040,0x483A54,0x241C28);
    // Steinboden-Textur statt Dielen
    for(let sy=0.4;sy<7;sy+=0.75){for(let sx=0.3;sx<9;sx+=0.9){
      const p=I(sx,sy,0);g.fillStyle(0x2C2432,0.35);g.fillRect(p.x-14,p.y-6,26,11);
    }}
    // Gedämpftes Deckenlicht — eine einzelne Glühbirne
    const bulbS=I(4.5,3.2,2.6);
    g.fillStyle(0xFFE8A0,0.15);g.fillCircle(bulbS.x,bulbS.y+40,130);
    g.fillStyle(0xFFE8A0,0.28);g.fillCircle(bulbS.x,bulbS.y+40,70);
    g.lineStyle(2,0x1A1418);g.lineBetween(bulbS.x,bulbS.y-38,bulbS.x,bulbS.y);
    g.fillStyle(0x282020);g.fillCircle(bulbS.x,bulbS.y,5);
    g.fillStyle(0xFFEEB0);g.fillCircle(bulbS.x,bulbS.y+10,8);

    // Weinregal an der Rückwand
    box(g,1.0,0.3,0,3.2,0.5,1.6,0x5A4028,0x4A3420,0x6A5030);
    for(let wx2=1.15;wx2<4.0;wx2+=0.42){for(let wz=0.25;wz<1.5;wz+=0.42){
      const bS=I(wx2,0.45,wz);g.fillStyle(0x1A2818);g.fillCircle(bS.x,bS.y,7);
      g.fillStyle([0x6A2020,0x2A3818,0x3A2818][Math.floor(Math.random()*3)]);g.fillRect(bS.x-3,bS.y-9,6,9);
    }}

    // Kisten gestapelt
    box(g,6.2,0.5,0,1.0,1.0,0.7,0x7A5A34,0x6A4A28,0x8A6A40);
    box(g,6.4,1.6,0,0.9,0.9,0.65,0x7A5A34,0x6A4A28,0x8A6A40);
    box(g,7.4,0.6,0,0.85,0.85,1.05,0x7A5A34,0x6A4A28,0x8A6A40);

    // Alte Truhe mit leichtem Glanz (kleines Geheimnis-Detail)
    box(g,1.2,4.5,0,1.3,0.9,0.65,0x4A3420,0x3A2818,0x5A4428);
    box(g,1.2,4.5,0.65,1.3,0.9,0.12,0x5A4020,0x4A3418,0x6A5030);
    const chestS=I(1.85,4.95,0.7);
    g.fillStyle(0xE8C860,0.5);g.fillCircle(chestS.x,chestS.y,10);
    g.fillStyle(0xFFE890,0.85);g.fillCircle(chestS.x,chestS.y,4);

    // Spinnweben in den Ecken
    const web=(wx2,wy2,flip)=>{
      const s=I(wx2,wy2,2.7);const d=flip?-1:1;
      g.lineStyle(1,0xC8C0D0,0.35);
      for(let a=0;a<4;a++)g.lineBetween(s.x,s.y,s.x+d*(10+a*7),s.y+8+a*5);
      g.strokeCircle(s.x+d*10,s.y+9,6);g.strokeCircle(s.x+d*18,s.y+15,11);
    };
    web(0.3,0.3,false);web(8.7,0.3,true);

    planks(g,0x2C2432);

    // 🗝️ kleiner Flavor-Text, damit sich der Fund lohnt
    const signS=I(4.5,5.6,0);
    this.add.text(signS.x,signS.y,'✨ Unser kleines Geheimnis ✨',{fontSize:'11px',fontFamily:'Arial',color:'#E8D8B8',fontStyle:'italic'}).setOrigin(0.5).setDepth(200);
  }
}

// ═══════════════════════════════════════════════════════════════
//  🛒 SUPERMARKT — 3 begehbare Räume wie der Rest der Wohnung.
//  Artikel stehen an festen Positionen auf Regalen (wie Möbelstücke).
//  Noch kein eigenes Sprite generiert? Kein Problem — automatischer
//  Emoji-Platzhalter, bis ein Sprite mit Key 'grocery_<id>' geladen ist.
// ═══════════════════════════════════════════════════════════════

// Einfaches Holzregal (2 Ebenen) über die volle Zeilenbreite
function drawShelfRow(g,wx0,wy,wLen,tiers=2){
  box(g,wx0,wy,0,wLen,0.5,0.9,0x8A6840,0x7A5830,0x9A7850);
  for(let t=1;t<tiers;t++)box(g,wx0,wy,0.35*t+0.35,wLen,0.5,0.06,0x6A4A28,0x6A4A28,0x6A4A28);
}

// Artikel auf festen Iso-Positionen platzieren — Klick sammelt sie ein,
// falls sie auf der Einkaufsliste stehen. Automatischer Sprite/Emoji-Fallback.
function placeGroceryItems(scene,items,positions){
  items.forEach((item,i)=>{
    const pos=positions[i];
    if(!pos)return;
    const sc=I(pos.wx,pos.wy,0.55);
    const onList=GS.shoppingList.includes(item.id);
    const inCart=GS.cart.includes(item.id);
    const spriteKey='grocery_'+item.id;
    const depth=pos.wx+pos.wy+50;
    if(loadedSprites.has(spriteKey)){
      const img=scene.add.image(sc.x,sc.y,spriteKey).setOrigin(0.5,1).setDepth(depth);
      img.setScale((SPRITE_TARGET_H[spriteKey]||44)/img.height);
      if(inCart)img.setAlpha(0.4);
    }else{
      const bw=38,bh=38;
      const bg=scene.add.graphics().setDepth(depth);
      if(inCart){bg.fillStyle(0x8AAA80,0.55);bg.lineStyle(1.5,0x4A7A3A,0.8);}
      else if(onList){bg.fillStyle(0xFFF4C8,0.95);bg.lineStyle(1.5,0xE0A830,1);}
      else{bg.fillStyle(0xFFFFFF,0.55);bg.lineStyle(1,0xC8C0B0,0.7);}
      bg.fillRoundedRect(sc.x-bw/2,sc.y-bh,bw,bh,6);
      bg.strokeRoundedRect(sc.x-bw/2,sc.y-bh,bw,bh,6);
      scene.add.text(sc.x,sc.y-bh+15,item.icon,{fontSize:'17px'}).setOrigin(0.5).setDepth(depth+1);
      if(inCart)scene.add.text(sc.x+13,sc.y-bh+3,'✓',{fontSize:'11px',fontFamily:'Arial',fontStyle:'bold',color:'#2A6A1A'}).setOrigin(0.5).setDepth(depth+2);
    }
    scene.add.text(sc.x,sc.y+3,item.name,{fontSize:'8px',fontFamily:'Arial',color:'#2A2018',backgroundColor:'#FFFFFFB0',padding:{x:2,y:1}}).setOrigin(0.5,0).setDepth(depth+2);
    const zone=scene.add.zone(sc.x,sc.y-18,44,54).setOrigin(0.5).setInteractive({cursor:'pointer'}).setDepth(depth+5);
    zone.on('pointerdown',()=>{
      scene._npcClick=true;
      if(scene.activeDialog)scene.closeDialog();
      if(!onList){scene.openItemMsg(sc.x,sc.y-62,'Brauchen wir gerade nicht.');return;}
      if(inCart){scene.openItemMsg(sc.x,sc.y-62,'Schon im Wagen! ✓');return;}
      GS.cart=[...GS.cart,item.id];
      saveGame();
      scene.scene.restart(); // Regal mit neuem Zustand neu zeichnen
    });
  });
}

// Grid-Positionen für eine feste Anzahl Reihen/Spalten erzeugen
function groceryGridPositions(rows,cols){
  const pos=[];
  const wxs=[1.0,2.3,3.6,4.9,6.2,7.5].slice(0,cols);
  const wys=rows===2?[1.6,3.8]:rows===3?[1.2,2.8,4.4]:[1.0,2.3,3.6,4.9];
  wys.forEach(wy=>wxs.forEach(wx=>pos.push({wx,wy})));
  return pos;
}

// Kassentheke — schließt die Einkaufs-Quest ab, sobald der Wagen komplett ist
function placeCheckout(scene,g,wx,wy){
  box(g,wx,wy,0,1.6,0.7,0.85,0x3A2818,0x2A1C10,0x4A3420);
  box(g,wx+0.15,wy-0.35,0.85,1.3,0.15,0.5,0x2A2020,0x2A2020,0x3A3030);
  const sc=I(wx+0.8,wy+0.35,0.85);
  scene.add.text(sc.x,sc.y-14,'💳',{fontSize:'20px'}).setOrigin(0.5).setDepth(wx+wy+60);
  scene.add.text(sc.x,sc.y+8,'KASSE',{fontSize:'10px',fontFamily:'Arial',fontStyle:'bold',color:'#F0E0C0',backgroundColor:'#3A2818C0',padding:{x:4,y:2}}).setOrigin(0.5).setDepth(wx+wy+60);
  const zone=scene.add.zone(sc.x,sc.y-10,80,70).setOrigin(0.5).setInteractive({cursor:'pointer'}).setDepth(wx+wy+65);
  zone.on('pointerdown',()=>{
    scene._npcClick=true;
    if(scene.activeDialog)scene.closeDialog();
    if(!GS.shoppingList.length){scene.openItemMsg(sc.x,sc.y-40,'Gerade nichts zum Abrechnen.');return;}
    const missing=GS.shoppingList.filter(id=>!GS.cart.includes(id));
    if(missing.length){
      const names=missing.map(id=>groceryById(id)?.name).join(', ');
      scene.openItemMsg(sc.x,sc.y-40,`Es fehlt noch: ${names}`);
      return;
    }
    const quest=QUESTS.einkaufen;
    if(GS.quests.active==='einkaufen')quest.complete(GS);
    else{GS.shoppingList=[];GS.cart=[];saveGame();}
    scene.openItemMsg(sc.x,sc.y-40,quest.rewardText);
    scene.time.delayedCall(1800,()=>{
      scene.cameras.main.fadeOut(200,10,8,18);
      scene.cameras.main.once('camerafadeoutcomplete',()=>{GS.room='flur';scene.scene.start(SMAP['flur']);});
    });
  });
}

// Helle Laden-Wände/-Boden (Basis für alle 3 Markt-Räume)
function drawMarketShell(g){
  OX=417;OY=147;
  roomBox(g,0xEDEAE2,0xF5F2EA,0xDDD8CC);
  planks(g,0xE0DACC);
}

class Markt1 extends BaseRoom{
  constructor(){super('Markt1','markt1');}
  drawRoom(g){
    drawMarketShell(g);
    this.add.text(GW/2,26,'🍎 Obst & Gemüse',{fontSize:'15px',fontFamily:'"Arial Black",Arial',fontStyle:'bold',color:'#3A2818'}).setOrigin(0.5).setDepth(300);
    drawShelfRow(g,0.7,1.2,7.1,2);
    drawShelfRow(g,0.7,2.8,7.1,2);
    drawShelfRow(g,0.7,4.4,7.1,2);
    const items=GROCERY_ITEMS.filter(i=>i.cat==='obst');
    placeGroceryItems(this,items,groceryGridPositions(3,6));
  }
}
class Markt2 extends BaseRoom{
  constructor(){super('Markt2','markt2');}
  drawRoom(g){
    drawMarketShell(g);
    this.add.text(GW/2,26,'🥛 Kühlregal & Vorrat',{fontSize:'15px',fontFamily:'"Arial Black",Arial',fontStyle:'bold',color:'#3A2818'}).setOrigin(0.5).setDepth(300);
    drawShelfRow(g,0.7,1.0,7.1,2);
    drawShelfRow(g,0.7,2.3,7.1,2);
    drawShelfRow(g,0.7,3.6,7.1,2);
    drawShelfRow(g,0.7,4.9,7.1,2);
    const items=GROCERY_ITEMS.filter(i=>i.cat==='kuehl'||i.cat==='vorrat');
    placeGroceryItems(this,items,groceryGridPositions(4,6));
  }
}
class Markt3 extends BaseRoom{
  constructor(){super('Markt3','markt3');}
  drawRoom(g){
    drawMarketShell(g);
    this.add.text(GW/2,26,'🥤 Getränke & Süßes',{fontSize:'15px',fontFamily:'"Arial Black",Arial',fontStyle:'bold',color:'#3A2818'}).setOrigin(0.5).setDepth(300);
    drawShelfRow(g,0.7,1.6,7.1,2);
    drawShelfRow(g,0.7,3.8,7.1,2);
    const items=GROCERY_ITEMS.filter(i=>i.cat==='getraenke'||i.cat==='suess');
    placeGroceryItems(this,items,groceryGridPositions(2,6));
    placeCheckout(this,g,3.6,5.6);
  }
}

// ═══════════════════════════════════════════════════════════════
//  SPEICHERSYSTEM — localStorage, pro Browser/Gerät getrennt.
//  Jeder Freund, der die Datei öffnet, startet automatisch frisch.
// ═══════════════════════════════════════════════════════════════
const SAVE_KEY='cozyhome_save_v1';
function saveGame(){
  try{
    const data={hunger:GS.hunger,dirtiness:GS.dirtiness,quests:GS.quests,room:GS.room,kellerUnlocked:GS.kellerUnlocked,shoppingList:GS.shoppingList,cart:GS.cart,savedAt:Date.now()};
    localStorage.setItem(SAVE_KEY,JSON.stringify(data));
  }catch(e){/* localStorage evtl. nicht verfügbar — einfach ignorieren */}
}
function loadGame(){
  try{
    const raw=localStorage.getItem(SAVE_KEY);
    if(!raw)return false;
    const data=JSON.parse(raw);
    if(data.hunger)GS.hunger=data.hunger;
    if(data.dirtiness!==undefined)GS.dirtiness=data.dirtiness;
    if(data.quests)GS.quests=data.quests;
    if(data.room)GS.room=data.room;
    if(data.kellerUnlocked)GS.kellerUnlocked=data.kellerUnlocked;
    if(data.shoppingList)GS.shoppingList=data.shoppingList;
    if(data.cart)GS.cart=data.cart;
    return true;
  }catch(e){return false;}
}
function hasSave(){try{return!!localStorage.getItem(SAVE_KEY);}catch(e){return false;}}
function clearSave(){try{localStorage.removeItem(SAVE_KEY);}catch(e){}}

// ═══════════════════════════════════════════════════════════════
//  STARTBILDSCHIRM
// ═══════════════════════════════════════════════════════════════

// Charakter-Sprites (eingebettet als Base64, wie beim Startbild)

class StartScreen extends Phaser.Scene{
  constructor(){super('StartScreen');}
  preload(){
    // Alle Sprites + Hintergrund ganz normal als Dateien laden.
    this.load.on('filecomplete',(key)=>loadedSprites.add(key));
    this.load.on('loaderror',()=>{/* Datei fehlt — ignorieren, Fallback greift automatisch */});
    this.load.image('startbg','assets/startbg.jpg');
    Object.entries(SPRITE_ASSETS).forEach(([key,path])=>{if(path)this.load.image(key,path);});
  }
  create(){
    this.buildUI();
  }
  buildUI(){
    const img=this.add.image(GW/2,GH/2,'startbg');
    const scale=Math.max(GW/img.width,GH/img.height);
    img.setScale(scale);
    // Bild nach oben verschieben, damit der sichtbare Ausschnitt weiter unten liegt
    // (dort sitzt die kleine Katze mit dem Wollknäuel im Original-Bild)
    img.y=GH*0.285;
    const overlay=this.add.graphics();
    overlay.fillStyle(0x0A080E,0.5);overlay.fillRect(0,0,GW,GH);

    this.add.text(GW/2,GH*0.16,'\ud83c\udfe0 Unser Zuhause',{fontSize:'40px',fontFamily:'Arial',fontStyle:'bold',color:'#FFF8E8',stroke:'#3A2050',strokeThickness:6}).setOrigin(0.5);

    const mkBtn=(y,label,enabled,onClick)=>{
      const w=280,h=58;
      const bg=this.add.graphics();
      const draw=(hover)=>{
        bg.clear();
        bg.fillStyle(enabled?(hover?0x4A3068:0x2A1848):0x1A1420,enabled?(hover?0.95:0.88):0.5);
        bg.fillRoundedRect(GW/2-w/2,y,w,h,14);
        bg.lineStyle(2,enabled?(hover?0xE0D0FF:0xB8A0E0):0x4A4050,0.9);
        bg.strokeRoundedRect(GW/2-w/2,y,w,h,14);
      };
      draw(false);
      this.add.text(GW/2,y+h/2,label,{fontSize:'21px',fontFamily:'Arial',fontStyle:'bold',color:enabled?'#F0E8FF':'#8878A0'}).setOrigin(0.5);
      if(enabled){
        const zone=this.add.zone(GW/2,y+h/2,w,h).setOrigin(0.5).setInteractive({cursor:'pointer'});
        zone.on('pointerover',()=>draw(true));
        zone.on('pointerout',()=>draw(false));
        zone.on('pointerdown',onClick);
      }
    };

    const goToGame=()=>{
      if(this.scale.fullscreen.available&&!this.scale.isFullscreen){
        try{this.scale.startFullscreen();}catch(e){}
      }
      this.cameras.main.fadeOut(300,10,8,18);
      this.cameras.main.once('camerafadeoutcomplete',()=>{
        this.scene.launch('UI');
        this.scene.start(SMAP[GS.room]||'Schlafzimmer');
      });
    };

    const has=hasSave();
    mkBtn(GH*0.56,'\u25b6 Fortsetzen',has,()=>{loadGame();GS.recalc();goToGame();});
    mkBtn(GH*0.70,'\u2728 Neues Spiel',true,()=>{
      clearSave();
      GS.hunger={katze1:20,katze2:20};
      GS.quests={active:null,completed:[],lastOffered:{}};
      GS.room='schlafzimmer';GS.override=null;GS.placements=null;
      GS.recalc();
      goToGame();
    });
    if(!has){
      this.add.text(GW/2,GH*0.56+29,'(noch kein Spielstand vorhanden)',{fontSize:'11px',fontFamily:'Arial',color:'#8878A0'}).setOrigin(0.5).setAlpha(0.7);
    }
  }
}

class UI extends Phaser.Scene{
  constructor(){super({key:'UI',active:false});}
  create(){this.scene.bringToTop('UI');this.clk=this.add.text(GW-12,10,'',{fontSize:'13px',fontFamily:'Arial',color:'#C8B8E0',backgroundColor:'#1A122899',padding:{x:7,y:4}}).setOrigin(1,0).setDepth(1000);this.time.addEvent({delay:1000,callback:this.tick,callbackScope:this,loop:true});this.time.addEvent({delay:15000,callback:()=>{GS.tickHunger(4);GS.tickDirtiness(3);saveGame();},loop:true});this.tick();}
  tick(){const n=new Date();this.clk.setText('\ud83d\udd50 '+String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0'));}
}

// LAUNCH
new Phaser.Game({
  type:Phaser.AUTO,
  backgroundColor:'#0A080E',
  pixelArt:false,
  parent:'g',
  scale:{
    mode:Phaser.Scale.FIT,
    autoCenter:Phaser.Scale.CENTER_BOTH,
    width:GW,
    height:GH,
    expandParent:true,
    fullscreenTarget:'g'
  },
  scene:[StartScreen,Schlafzimmer,Wohnzimmer,Kueche,Bad,Flur,Balkon,Keller,Markt1,Markt2,Markt3,UI]
});
window.addEventListener('beforeunload',()=>{if(typeof saveGame==='function')saveGame();});
