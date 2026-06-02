const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

const C = {
  navy:   "0A1628", blue:  "1A2F55", accent: "667EEA",
  purple: "764BA2", light: "A5B4FC", cyan:  "06B6D4",
  white:  "FFFFFF", gray:  "94A3B8", dgray: "1E293B",
  green:  "10B981", orange:"F59E0B", red:   "EF4444",
  card:   "0F2040", offwhite:"F0F4FF", lgray: "F8FAFC",
};
const grad = { type:"solid", color: C.accent };
const sh = () => ({ type:"outer", blur:8, offset:3, angle:135, color:"000000", opacity:0.18 });

function hdr(s, title, light=false) {
  s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.06, fill:{color:C.accent} });
  s.addShape(pres.shapes.RECTANGLE, { x:0, y:5.57, w:10, h:0.055, fill:{color:C.accent} });
  s.addText(title, { x:0.5, y:0.12, w:9, h:0.52, fontSize:26, bold:true,
    color: light ? C.white : C.navy, fontFace:"Calibri" });
}

function tag(s, txt, x, y, col=C.accent) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w:1.8, h:0.32, fill:{color:col}, rectRadius:0.08 });
  s.addText(txt, { x, y, w:1.8, h:0.32, fontSize:9, bold:true, color:C.white, align:"center", valign:"middle", fontFace:"Calibri" });
}

// ══════════════════════════════════════════════════════════
// S1 — COVER
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background = {color:C.navy};
  s.addShape(pres.shapes.RECTANGLE, {x:0,y:0,w:10,h:0.06,fill:{color:C.accent}});
  // decorative circles
  s.addShape(pres.shapes.OVAL, {x:7.5,y:-0.5,w:4,h:4,fill:{color:C.accent,transparency:88}});
  s.addShape(pres.shapes.OVAL, {x:8.5,y:3.5, w:3,h:3,fill:{color:C.purple,transparency:88}});
  s.addShape(pres.shapes.OVAL, {x:-1,y:3,   w:3,h:3,fill:{color:C.cyan,transparency:90}});

  s.addText("Multi-Class Building Detection", {
    x:0.6,y:0.7,w:8.8,h:1.1,fontSize:36,bold:true,color:C.white,fontFace:"Calibri",align:"center",charSpacing:0.5});
  s.addText("pada Citra Satelit Menggunakan", {
    x:0.6,y:1.75,w:8.8,h:0.7,fontSize:22,color:C.light,fontFace:"Calibri",align:"center"});
  s.addText("YOLOv8 dan Streamlit", {
    x:0.6,y:2.4,w:8.8,h:0.7,fontSize:28,bold:true,color:C.accent,fontFace:"Calibri",align:"center"});

  s.addShape(pres.shapes.RECTANGLE, {x:3,y:3.22,w:4,h:0.04,fill:{color:C.cyan}});

  s.addText("Deteksi: Home · Mosque · Oil Refinery · Solar Panels", {
    x:0.6,y:3.38,w:8.8,h:0.38,fontSize:12,color:C.gray,fontFace:"Calibri",align:"center",italic:true});

  // pills
  const tools = ["Roboflow","YOLOv8","PyTorch","Streamlit","OpenCV"];
  tools.forEach((t,i)=>{
    const px = 0.55 + i*1.82;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:px,y:3.92,w:1.7,h:0.38,fill:{color:C.card},rectRadius:0.09});
    s.addText(t,{x:px,y:3.92,w:1.7,h:0.38,fontSize:10,color:C.light,align:"center",valign:"middle",fontFace:"Calibri"});
  });

  s.addText("Radithya Wildan Pratama", {
    x:0.6,y:4.5,w:8.8,h:0.38,fontSize:13,bold:true,color:C.white,fontFace:"Calibri",align:"center"});
  s.addText("Computer Vision Project  ·  2025", {
    x:0.6,y:4.92,w:8.8,h:0.3,fontSize:10,color:C.gray,fontFace:"Calibri",align:"center"});
  s.addShape(pres.shapes.RECTANGLE,{x:0,y:5.57,w:10,h:0.055,fill:{color:C.accent}});
}

// ══════════════════════════════════════════════════════════
// S2 — LATAR BELAKANG
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Latar Belakang");
  const rows=[
    ["🌍","Pemetaan Wilayah","Citra satelit digunakan untuk perencanaan kota, smart city, dan pemetaan wilayah secara otomatis."],
    ["⏱️","Keterbatasan Manual","Identifikasi bangunan secara manual membutuhkan waktu lama dan rentan kesalahan."],
    ["🤖","Solusi: YOLOv8","YOLOv8 dapat mendeteksi multi-class objek bangunan dengan bounding box dan jumlah per kelas."],
    ["💻","Web Interface","Sistem dikemas dalam Streamlit agar mudah digunakan — upload gambar, hasil langsung tampil."],
  ];
  rows.forEach(([ico,title,desc],i)=>{
    const ry=0.82+i*1.1;
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:ry,w:9.4,h:0.95,fill:{color:C.white},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:ry,w:0.06,h:0.95,fill:{color:C.accent}});
    s.addText(ico,{x:0.42,y:ry+0.1,w:0.65,h:0.75,fontSize:22,align:"center",valign:"middle"});
    s.addText(title,{x:1.15,y:ry+0.09,w:8.3,h:0.32,fontSize:12,bold:true,color:C.navy,fontFace:"Calibri",margin:0});
    s.addText(desc, {x:1.15,y:ry+0.44,w:8.3,h:0.42,fontSize:10.5,color:C.dgray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S3 — RUMUSAN MASALAH
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Rumusan Masalah",true);
  const qs=[
    "Bagaimana membangun model object detection untuk mendeteksi beberapa kelas objek pada citra satelit?",
    "Bagaimana proses pembuatan dataset multi-class menggunakan Roboflow?",
    "Bagaimana performa YOLOv8 dalam mendeteksi kelas Home, Mosque, Oil Refinery, dan Solar Panels?",
    "Bagaimana mengimplementasikan model YOLOv8 ke dalam web app berbasis Streamlit?",
  ];
  qs.forEach((q,i)=>{
    const qy=0.82+i*1.1;
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:qy,w:9.4,h:0.95,fill:{color:C.card},shadow:sh()});
    s.addShape(pres.shapes.OVAL,{x:0.38,y:qy+0.18,w:0.58,h:0.58,fill:{color:C.accent}});
    s.addText(`${i+1}`,{x:0.38,y:qy+0.18,w:0.58,h:0.58,fontSize:16,bold:true,color:C.white,align:"center",valign:"middle",fontFace:"Calibri"});
    s.addText(q,{x:1.12,y:qy+0.15,w:8.45,h:0.65,fontSize:11,color:C.light,fontFace:"Calibri",valign:"middle",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S4 — TUJUAN
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Tujuan Project");
  const goals=[
    {n:"01",t:"Buat Dataset",d:"Membuat dataset citra satelit dengan anotasi bounding box multi-class menggunakan Roboflow.",col:C.accent},
    {n:"02",t:"Training Model",d:"Melatih model YOLOv8n untuk mendeteksi 4 kelas objek: Home, Mosque, Oil Refinery, Solar Panels.",col:C.purple},
    {n:"03",t:"Evaluasi Model",d:"Mengevaluasi performa menggunakan Precision, Recall, mAP50, dan mAP50-95.",col:C.cyan},
    {n:"04",t:"Web Application",d:"Membuat aplikasi Streamlit agar pengguna dapat upload gambar dan melihat hasil deteksi.",col:C.green},
  ];
  goals.forEach((g,i)=>{
    const gx=0.3+(i%2)*4.85, gy=0.82+Math.floor(i/2)*2.15;
    s.addShape(pres.shapes.RECTANGLE,{x:gx,y:gy,w:4.6,h:1.9,fill:{color:C.white},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:gx,y:gy,w:4.6,h:0.07,fill:{color:g.col}});
    s.addText(g.n,{x:gx+0.15,y:gy+0.12,w:0.8,h:0.55,fontSize:26,bold:true,color:g.col,fontFace:"Calibri",margin:0});
    s.addText(g.t,{x:gx+1.0, y:gy+0.15,w:3.4,h:0.45,fontSize:13,bold:true,color:C.navy,fontFace:"Calibri",margin:0});
    s.addText(g.d,{x:gx+0.15,y:gy+0.75,w:4.3,h:1.0, fontSize:10.5,color:C.dgray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S5 — KENAPA OBJECT DETECTION
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Kenapa Object Detection?",true);
  const methods=[
    {t:"Classification",desc:"Hanya memberi label ke seluruh gambar.\nTidak bisa menunjukkan lokasi objek.",pro:false,col:"EF4444"},
    {t:"Object Detection",desc:"Mendeteksi objek, memberi bounding box, dan menghitung jumlah per kelas.",pro:true, col:C.green},
    {t:"Segmentation", desc:"Lebih detail dengan polygon, tetapi proses anotasi jauh lebih lama.",pro:false,col:C.orange},
  ];
  methods.forEach((m,i)=>{
    const mx=0.3+i*3.15;
    s.addShape(pres.shapes.RECTANGLE,{x:mx,y:0.82,w:2.9,h:3.0,fill:{color:C.card},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:mx,y:0.82,w:2.9,h:0.07,fill:{color:m.col}});
    s.addText(m.t,{x:mx,y:0.97,w:2.9,h:0.55,fontSize:13,bold:true,color:C.white,align:"center",fontFace:"Calibri"});
    s.addText(m.desc,{x:mx+0.1,y:1.65,w:2.7,h:1.6,fontSize:10.5,color:C.gray,fontFace:"Calibri",align:"center"});
    if(m.pro){
      s.addShape(pres.shapes.RECTANGLE,{x:mx+0.45,y:3.05,w:2.0,h:0.38,fill:{color:C.green}});
      s.addText("✅  Pilihan Kami",{x:mx+0.45,y:3.05,w:2.0,h:0.38,fontSize:11,bold:true,color:C.white,align:"center",valign:"middle",fontFace:"Calibri"});
    }
  });
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:4.0,w:9.4,h:1.2,fill:{color:"0D1E35"},shadow:sh()});
  s.addText("✔  Object Detection dipilih karena dapat menghasilkan bounding box sekaligus menghitung jumlah objek per kelas — sesuai kebutuhan project ini.",
    {x:0.5,y:4.08,w:9.0,h:1.05,fontSize:11.5,color:C.light,fontFace:"Calibri",valign:"middle"});
}

// ══════════════════════════════════════════════════════════
// S6 — KELAS OBJEK
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Kelas Objek yang Dideteksi");
  const classes=[
    {ico:"🏠",n:"Home",d:"Rumah tinggal terlihat dari atas, ditandai dari bentuk atap dan lingkungan perumahan.",col:C.accent},
    {ico:"🕌",n:"Mosque",d:"Masjid dengan kubah atau atap khas, biasanya di tengah pemukiman.",col:C.purple},
    {ico:"🛢️",n:"Oil Refinery",d:"Area kilang minyak dengan tangki besar, pipa, dan pola infrastruktur industri.",col:C.orange},
    {ico:"☀️",n:"Solar Panels",d:"Panel surya di atap bangunan atau ladang panel, tampak gelap dan beraturan.",col:C.green},
  ];
  classes.forEach((c,i)=>{
    const cx=0.3+(i%2)*4.85, cy=0.82+Math.floor(i/2)*2.25;
    s.addShape(pres.shapes.RECTANGLE,{x:cx,y:cy,w:4.6,h:2.0,fill:{color:C.white},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:cx,y:cy,w:4.6,h:0.07,fill:{color:c.col}});
    s.addShape(pres.shapes.RECTANGLE,{x:cx,y:cy,w:1.0,h:2.0,fill:{color:c.col,transparency:88}});
    s.addText(c.ico,{x:cx,y:cy,w:1.0,h:2.0,fontSize:28,align:"center",valign:"middle"});
    s.addText(c.n, {x:cx+1.1,y:cy+0.18,w:3.3,h:0.48,fontSize:16,bold:true,color:C.navy,fontFace:"Calibri",margin:0});
    s.addText(`Kelas ${i+1}`,{x:cx+1.1,y:cy+0.65,w:1.2,h:0.28,fontSize:9,color:c.col,fontFace:"Calibri",margin:0});
    s.addText(c.d,{x:cx+1.1,y:cy+0.95,w:3.35,h:0.9,fontSize:10,color:C.dgray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S7 — TOOLS
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Tools dan Teknologi",true);
  const tools=[
    {ico:"🔵",t:"Roboflow",d:"Upload, anotasi, split, augmentasi, dan export dataset YOLOv8.",col:C.accent},
    {ico:"🐍",t:"Python 3.10",d:"Bahasa pemrograman utama untuk training dan inference.",col:C.cyan},
    {ico:"🔥",t:"PyTorch + CUDA",d:"Deep learning framework dengan akselerasi GPU NVIDIA.",col:C.orange},
    {ico:"⚡",t:"YOLOv8 (Ultralytics)",d:"Model object detection modern, cepat, dan mudah digunakan.",col:C.purple},
    {ico:"🌐",t:"Streamlit",d:"Web interface drag & drop untuk demo deteksi.",col:C.green},
    {ico:"📷",t:"OpenCV + NumPy",d:"Pemrosesan gambar dan array untuk preprocessing.",col:"64748B"},
  ];
  tools.forEach((t,i)=>{
    const tx=0.3+(i%3)*3.15, ty=0.82+Math.floor(i/3)*2.05;
    s.addShape(pres.shapes.RECTANGLE,{x:tx,y:ty,w:2.9,h:1.75,fill:{color:C.card},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:tx,y:ty,w:2.9,h:0.06,fill:{color:t.col}});
    s.addText(t.ico,{x:tx+0.1,y:ty+0.12,w:0.6,h:0.55,fontSize:22,align:"center",valign:"middle"});
    s.addText(t.t,{x:tx+0.75,y:ty+0.14,w:2.0,h:0.44,fontSize:12,bold:true,color:C.white,fontFace:"Calibri",margin:0});
    s.addText(t.d,{x:tx+0.1, y:ty+0.75,w:2.7,h:0.85,fontSize:9.5,color:C.gray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S8 — SETUP ENVIRONMENT
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Setup Environment: Miniconda");
  const steps=[
    ["1","Buat environment","conda create -n buildingdet python=3.10"],
    ["2","Aktifkan environment","conda activate buildingdet"],
    ["3","Install library","pip install ultralytics streamlit opencv-python pandas pillow numpy"],
    ["4","Cek instalasi YOLO","yolo checks"],
    ["5","Cek GPU","nvidia-smi"],
  ];
  steps.forEach(([n,title,code],i)=>{
    const sy=0.82+i*0.9;
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:sy,w:9.4,h:0.78,fill:{color:C.white},shadow:sh()});
    s.addShape(pres.shapes.OVAL,{x:0.38,y:sy+0.12,w:0.52,h:0.52,fill:{color:C.accent}});
    s.addText(n,{x:0.38,y:sy+0.12,w:0.52,h:0.52,fontSize:14,bold:true,color:C.white,align:"center",valign:"middle",fontFace:"Calibri"});
    s.addText(title,{x:1.05,y:sy+0.1,w:2.6,h:0.55,fontSize:11,bold:true,color:C.navy,fontFace:"Calibri",valign:"middle",margin:0});
    s.addShape(pres.shapes.RECTANGLE,{x:3.75,y:sy+0.1,w:5.85,h:0.56,fill:{color:C.dgray}});
    s.addText(code,{x:3.85,y:sy+0.1,w:5.7,h:0.56,fontSize:9.5,color:"A5F3FC",fontFace:"Consolas",valign:"middle",margin:0});
  });
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:5.3,w:9.4,h:0.2,fill:{color:C.green,transparency:80}});
  s.addText("✅  GPU NVIDIA GeForce GTX 1650 berhasil terdeteksi",
    {x:0.4,y:5.3,w:9.2,h:0.2,fontSize:10,color:C.green,fontFace:"Calibri",valign:"middle",margin:0});
}

// ══════════════════════════════════════════════════════════
// S9 — STRUKTUR PROJECT
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Struktur Project",true);
  const tree=[
    ["building_detection/","",0,C.accent],
    ["├── dataset/","",1,C.light],
    ["│   ├── train/images/ + labels/","Data training",2,C.gray],
    ["│   ├── valid/images/ + labels/","Data validasi",2,C.gray],
    ["│   ├── test/images/  + labels/","Data test",2,C.gray],
    ["│   └── data.yaml","Konfigurasi dataset",2,C.cyan],
    ["├── models/best.pt","Model final tersimpan",1,C.green],
    ["├── runs/detect/train_v3_final/","Hasil training & grafik",1,C.orange],
    ["├── src/app.py","Aplikasi Streamlit",1,C.purple],
    ["└── training.py","Script training YOLOv8",1,C.light],
  ];
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:0.82,w:5.5,h:4.6,fill:{color:C.card},shadow:sh()});
  tree.forEach(([line,,indent,col],i)=>{
    s.addText(line,{x:0.45+indent*0.25,y:0.95+i*0.43,w:5.1,h:0.38,
      fontSize:9.5,color:col,fontFace:"Consolas",margin:0});
  });
  const info=[
    ["📁 dataset/","Data gambar + label dari Roboflow export"],
    ["⚙️ data.yaml","Path dataset + jumlah kelas + nama kelas"],
    ["🏆 models/best.pt","Model dengan performa terbaik"],
    ["📊 runs/detect/","Grafik loss, precision, recall, mAP"],
    ["🌐 src/app.py","Web interface Streamlit"],
  ];
  info.forEach(([k,v],i)=>{
    const iy=0.95+i*0.88;
    s.addShape(pres.shapes.RECTANGLE,{x:6.05,y:iy,w:3.65,h:0.75,fill:{color:"0D1E35"},shadow:sh()});
    s.addText(k,{x:6.15,y:iy+0.06,w:3.45,h:0.28,fontSize:10.5,bold:true,color:C.accent,fontFace:"Calibri",margin:0});
    s.addText(v,{x:6.15,y:iy+0.36,w:3.45,h:0.3, fontSize:9.5,color:C.gray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S10 — PENGUMPULAN DATASET
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Pengumpulan Dataset");
  const steps=[
    {n:"1",t:"Kumpulkan Gambar",d:"Screenshot citra satelit/top-down dari Google Earth per kelas objek.",col:C.accent},
    {n:"2",t:"Upload ke Roboflow",d:"Drag & drop gambar ke project Roboflow yang sudah dibuat.",col:C.purple},
    {n:"3",t:"Buat Kelas",d:"Definisikan 4 kelas: Home, Mosque, Oil Refinery, Solar Panels.",col:C.cyan},
    {n:"4",t:"Anotasi BBox",d:"Gambar bounding box pada setiap objek di setiap gambar.",col:C.orange},
    {n:"5",t:"Generate Version",d:"Aktifkan augmentasi, split dataset, generate versi dataset.",col:C.green},
    {n:"6",t:"Export YOLOv8",d:"Export dataset dalam format YOLOv8 TXT + data.yaml.",col:"A855F7"},
  ];
  steps.forEach((st,i)=>{
    const sx=0.3+(i%3)*3.15, sy=0.82+Math.floor(i/3)*2.2;
    s.addShape(pres.shapes.RECTANGLE,{x:sx,y:sy,w:2.9,h:1.95,fill:{color:C.white},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:sx,y:sy,w:2.9,h:0.06,fill:{color:st.col}});
    s.addShape(pres.shapes.OVAL,{x:sx+0.1,y:sy+0.12,w:0.55,h:0.55,fill:{color:st.col}});
    s.addText(st.n,{x:sx+0.1,y:sy+0.12,w:0.55,h:0.55,fontSize:16,bold:true,color:C.white,align:"center",valign:"middle",fontFace:"Calibri"});
    s.addText(st.t,{x:sx+0.75,y:sy+0.15,w:2.0,h:0.44,fontSize:12,bold:true,color:C.navy,fontFace:"Calibri",margin:0});
    s.addText(st.d,{x:sx+0.1, y:sy+0.78,w:2.7,h:1.0, fontSize:10,color:C.dgray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S11 — ANOTASI DI ROBOFLOW
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Anotasi Dataset di Roboflow",true);
  const rules=[
    ["🏠","Home","Rumah tinggal saja. Gedung kantor/ruko TIDAK diberi label Home.",C.accent],
    ["🕌","Mosque","Masjid dengan kubah atau atap khas masjid.",C.purple],
    ["🛢️","Oil Refinery","Area kilang minyak — tangki besar dan pola infrastruktur industri.",C.orange],
    ["☀️","Solar Panels","Panel surya di atap atau ladang panel — tampak gelap beraturan.",C.green],
  ];
  rules.forEach((r,i)=>{
    const ry=0.82+i*1.05;
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:ry,w:9.4,h:0.88,fill:{color:C.card},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:ry,w:0.06,h:0.88,fill:{color:r[3]}});
    s.addText(r[0],{x:0.42,y:ry+0.1,w:0.65,h:0.68,fontSize:22,align:"center",valign:"middle"});
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:1.2,y:ry+0.15,w:1.4,h:0.32,fill:{color:r[3]},rectRadius:0.08});
    s.addText(r[1],{x:1.2,y:ry+0.15,w:1.4,h:0.32,fontSize:10,bold:true,color:C.white,align:"center",valign:"middle",fontFace:"Calibri"});
    s.addText(r[2],{x:2.75,y:ry+0.15,w:6.8,h:0.58,fontSize:11,color:C.light,fontFace:"Calibri",valign:"middle",margin:0});
  });
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:5.1,w:9.4,h:0.38,fill:{color:"0D1E35"}});
  s.addText("⚠️  Konsistensi anotasi sangat penting — satu objek salah label bisa merusak pola belajar model.",
    {x:0.45,y:5.1,w:9.1,h:0.38,fontSize:10.5,color:C.orange,fontFace:"Calibri",valign:"middle",margin:0});
}

// ══════════════════════════════════════════════════════════
// S12 — STATISTIK DATASET
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Statistik Dataset Akhir");

  // left stats
  const stats=[["241","Total Images"],["1,284","Total Annotations"],["4","Total Classes"]];
  stats.forEach(([v,l],i)=>{
    s.addShape(pres.shapes.RECTANGLE,{x:0.3+i*2.0,y:0.82,w:1.85,h:1.4,fill:{color:C.navy},shadow:sh()});
    s.addText(v,{x:0.3+i*2.0,y:0.95,w:1.85,h:0.72,fontSize:30,bold:true,color:C.accent,align:"center",fontFace:"Calibri"});
    s.addText(l,{x:0.3+i*2.0,y:1.68,w:1.85,h:0.42,fontSize:10,color:C.gray,align:"center",fontFace:"Calibri"});
  });

  // bar chart annotations
  const bars=[["Home","588",C.accent,588],["Oil Refinery","327",C.orange,327],["Solar Panels","267",C.green,267],["Mosque","102",C.purple,102]];
  s.addText("Distribusi Anotasi per Kelas",{x:0.3,y:2.42,w:5.9,h:0.35,fontSize:12,bold:true,color:C.navy,fontFace:"Calibri"});
  bars.forEach(([cls,cnt,col,val],i)=>{
    const by=2.85+i*0.58;
    const bw=(val/600)*5.5;
    s.addShape(pres.shapes.RECTANGLE,{x:1.55,y:by,w:bw,h:0.38,fill:{color:col}});
    s.addText(cls,{x:0.3,y:by,w:1.2,h:0.38,fontSize:10,color:C.dgray,fontFace:"Calibri",valign:"middle",align:"right",margin:0});
    s.addText(cnt,{x:1.6+bw,y:by,w:0.7,h:0.38,fontSize:10,bold:true,color:C.dgray,fontFace:"Calibri",valign:"middle",margin:0});
  });

  // right split
  s.addShape(pres.shapes.RECTANGLE,{x:6.35,y:0.82,w:3.35,h:4.25,fill:{color:C.navy},shadow:sh()});
  s.addText("Split Dataset",{x:6.45,y:0.9,w:3.15,h:0.38,fontSize:12,bold:true,color:C.light,fontFace:"Calibri",align:"center"});
  const splits=[["Train","169 images","70%",C.accent],["Valid","48 images","20%",C.cyan],["Test","24 images","10%",C.green]];
  splits.forEach(([sp,cnt,pct,col],i)=>{
    const sy=1.45+i*1.1;
    s.addShape(pres.shapes.RECTANGLE,{x:6.5,y:sy,w:3.0,h:0.85,fill:{color:C.card}});
    s.addShape(pres.shapes.RECTANGLE,{x:6.5,y:sy,w:3.0,h:0.06,fill:{color:col}});
    s.addText(sp, {x:6.6,y:sy+0.12,w:1.1,h:0.32,fontSize:12,bold:true,color:col,fontFace:"Calibri",margin:0});
    s.addText(cnt,{x:7.75,y:sy+0.12,w:1.6,h:0.28,fontSize:10,color:C.white,fontFace:"Calibri",margin:0});
    s.addText(pct,{x:6.6, y:sy+0.44,w:2.8,h:0.26,fontSize:9,  color:C.gray, fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S13 — EXPORT FORMAT YOLO
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Export Dataset: Format YOLOv8",true);
  const files=[
    ["📁 train/images/","Gambar training"],["📁 train/labels/","Label TXT training"],
    ["📁 valid/images/","Gambar validasi"],["📁 valid/labels/","Label TXT validasi"],
    ["📁 test/images/", "Gambar test"],   ["📁 test/labels/", "Label TXT test"],
    ["📄 data.yaml",    "Konfigurasi path + kelas"],
  ];
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:0.82,w:4.5,h:4.3,fill:{color:C.card},shadow:sh()});
  s.addText("Isi Export Roboflow",{x:0.4,y:0.88,w:4.3,h:0.38,fontSize:12,bold:true,color:C.light,fontFace:"Calibri"});
  files.forEach(([f,d],i)=>{
    s.addText(f,{x:0.5,y:1.38+i*0.52,w:2.5,h:0.38,fontSize:10,color:C.accent,fontFace:"Consolas",margin:0});
    s.addText("— "+d,{x:3.05,y:1.38+i*0.52,w:1.6,h:0.38,fontSize:9.5,color:C.gray,fontFace:"Calibri",margin:0});
  });
  // label format
  s.addShape(pres.shapes.RECTANGLE,{x:5.05,y:0.82,w:4.65,h:2.0,fill:{color:C.card},shadow:sh()});
  s.addText("Format Label YOLO (.txt)",{x:5.15,y:0.9,w:4.45,h:0.38,fontSize:12,bold:true,color:C.light,fontFace:"Calibri"});
  s.addShape(pres.shapes.RECTANGLE,{x:5.15,y:1.35,w:4.4,h:0.55,fill:{color:C.dgray}});
  s.addText("class_id  x_center  y_center  width  height",{x:5.2,y:1.35,w:4.3,h:0.55,fontSize:10,color:"A5F3FC",fontFace:"Consolas",valign:"middle",margin:0});
  s.addText("Contoh: 0  0.512  0.438  0.245  0.198",{x:5.15,y:2.0,w:4.45,h:0.38,fontSize:10,color:C.gray,fontFace:"Consolas",margin:0});
  // yaml content
  s.addShape(pres.shapes.RECTANGLE,{x:5.05,y:2.95,w:4.65,h:2.15,fill:{color:C.card},shadow:sh()});
  s.addText("data.yaml",{x:5.15,y:3.02,w:4.45,h:0.35,fontSize:12,bold:true,color:C.light,fontFace:"Calibri"});
  const yaml=["train: ../train/images","val:   ../valid/images","test:  ../test/images","","nc: 4","names: [Home, Mosque,","       Oil Refinery, Solar Panels]"];
  s.addText(yaml.join("\n"),{x:5.2,y:3.42,w:4.35,h:1.55,fontSize:9.5,color:"A5F3FC",fontFace:"Consolas",margin:0});
}

// ══════════════════════════════════════════════════════════
// S14 — MODEL YOLOV8
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Model: YOLOv8");
  // header
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:0.82,w:9.4,h:1.15,fill:{color:C.navy},shadow:sh()});
  s.addText("YOLOv8n — Nano",{x:0.5,y:0.92,w:4.0,h:0.55,fontSize:20,bold:true,color:C.accent,fontFace:"Calibri",margin:0});
  s.addText("You Only Look Once — versi 8, varian Nano (paling ringan)",
    {x:0.5,y:1.48,w:8.8,h:0.35,fontSize:11,color:C.gray,fontFace:"Calibri",margin:0});

  const reasons=[
    {ico:"⚡",t:"Ringan & Cepat",d:"Cocok untuk GPU GTX 1650 4GB — tidak OOM.",col:C.accent},
    {ico:"🎯",t:"Cukup Akurat",d:"Performa cukup baik untuk dataset kecil-menengah.",col:C.cyan},
    {ico:"🔧",t:"Easy Setup",d:"Ultralytics API — 3 baris kode untuk training.",col:C.green},
    {ico:"📦",t:"Pretrained Weights",d:"Menggunakan yolov8n.pt pretrained COCO — transfer learning.",col:C.orange},
  ];
  reasons.forEach((r,i)=>{
    const rx=0.3+(i%2)*4.85, ry=2.2+Math.floor(i/2)*1.7;
    s.addShape(pres.shapes.RECTANGLE,{x:rx,y:ry,w:4.6,h:1.5,fill:{color:C.white},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:rx,y:ry,w:4.6,h:0.06,fill:{color:r.col}});
    s.addText(r.ico,{x:rx+0.1,y:ry+0.12,w:0.6,h:0.7,fontSize:22,align:"center",valign:"middle"});
    s.addText(r.t,{x:rx+0.8,y:ry+0.14,w:3.6,h:0.42,fontSize:12,bold:true,color:C.navy,fontFace:"Calibri",margin:0});
    s.addText(r.d,{x:rx+0.8,y:ry+0.6, w:3.6,h:0.75,fontSize:10.5,color:C.dgray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S15 — SCRIPT TRAINING
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Script Training YOLOv8",true);
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:0.82,w:5.5,h:4.3,fill:{color:C.dgray},shadow:sh()});
  s.addText("# training.py",{x:0.45,y:0.9,w:5.2,h:0.3,fontSize:9,color:C.gray,fontFace:"Consolas",italic:true,margin:0});
  const code=[
    "from ultralytics import YOLO","",
    "if __name__ == '__main__':",
    "    model = YOLO('yolov8n.pt')","",
    "    model.train(",
    "        data='dataset/data.yaml',",
    "        epochs=100,",
    "        imgsz=640,",
    "        batch=4,",
    "        workers=0,",
    "        patience=20,",
    "        device=0,",
    "        name='train_v3_final'",
    "    )",
  ];
  s.addText(code.join("\n"),{x:0.45,y:1.28,w:5.25,h:3.7,fontSize:10,color:"A5F3FC",fontFace:"Consolas",margin:0});

  const params=[
    ["data","file konfigurasi dataset YAML"],
    ["epochs","jumlah iterasi training (100)"],
    ["imgsz","ukuran input gambar (640×640)"],
    ["batch","gambar per batch (4) — hemat VRAM"],
    ["workers=0","stabil di Windows, hindari error"],
    ["device=0","pakai GPU NVIDIA (cuda:0)"],
    ["patience=20","early stop jika tidak ada progress"],
  ];
  s.addText("Parameter Penjelasan",{x:6.05,y:0.85,w:3.65,h:0.38,fontSize:12,bold:true,color:C.light,fontFace:"Calibri"});
  params.forEach(([k,v],i)=>{
    const py=1.3+i*0.52;
    s.addShape(pres.shapes.RECTANGLE,{x:6.05,y:py,w:3.65,h:0.44,fill:{color: i%2===0 ? C.card : "0D1E35"}});
    s.addText(k,{x:6.12,y:py+0.05,w:1.4,h:0.34,fontSize:9.5,bold:true,color:C.accent,fontFace:"Consolas",margin:0});
    s.addText(v,{x:7.58,y:py+0.05,w:2.0,h:0.34,fontSize:9,color:C.gray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S16 — MASALAH TEKNIS
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Kendala Teknis saat Training");
  const issues=[
    {prob:"Multiprocessing Error di Windows",
     sol:"Bungkus script dengan if __name__ == '__main__': agar tidak fork proses secara tidak benar.",col:C.red},
    {prob:"Error Paging File Windows",
     sol:"Kurangi batch size ke 4 dan gunakan workers=0 untuk mengurangi memori yang diminta.",col:C.orange},
    {prob:"AMP Warning pada GTX 1650",
     sol:"Ultralytics otomatis menonaktifkan AMP pada GPU yang tidak mendukung — training tetap berjalan normal.",col:C.accent},
  ];
  issues.forEach((issue,i)=>{
    const iy=0.82+i*1.45;
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:iy,w:9.4,h:1.3,fill:{color:C.white},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:iy,w:0.06,h:1.3,fill:{color:issue.col}});
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.48,y:iy+0.1,w:1.3,h:0.3,fill:{color:issue.col},rectRadius:0.06});
    s.addText("MASALAH",{x:0.48,y:iy+0.1,w:1.3,h:0.3,fontSize:8,bold:true,color:C.white,align:"center",valign:"middle",fontFace:"Calibri"});
    s.addText(issue.prob,{x:1.9,y:iy+0.08,w:7.6,h:0.38,fontSize:12,bold:true,color:C.dgray,fontFace:"Calibri",margin:0});
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.48,y:iy+0.55,w:1.3,h:0.3,fill:{color:C.green},rectRadius:0.06});
    s.addText("SOLUSI",{x:0.48,y:iy+0.55,w:1.3,h:0.3,fontSize:8,bold:true,color:C.white,align:"center",valign:"middle",fontFace:"Calibri"});
    s.addText(issue.sol,{x:1.9,y:iy+0.53,w:7.6,h:0.65,fontSize:11,color:C.dgray,fontFace:"Calibri",margin:0});
  });
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:5.17,w:9.4,h:0.32,fill:{color:C.green,transparency:80}});
  s.addText("✅  Training berhasil berjalan menggunakan GPU NVIDIA GeForce GTX 1650",
    {x:0.45,y:5.17,w:9.1,h:0.32,fontSize:11,color:C.green,fontFace:"Calibri",valign:"middle",margin:0});
}

// ══════════════════════════════════════════════════════════
// S17 — HASIL TRAINING OVERALL
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Hasil Training: Dataset Akhir",true);
  s.addText("Dataset: 241 gambar · 1,284 anotasi · 4 kelas",
    {x:0.5,y:0.75,w:9,h:0.3,fontSize:11,color:C.gray,fontFace:"Calibri",italic:true});

  const metrics=[
    {label:"Precision",val:"0.911",sub:"91.1%",col:C.accent,desc:"Sebagian besar prediksi model benar"},
    {label:"Recall",   val:"0.772",sub:"77.2%",col:C.cyan,  desc:"Model mendeteksi 77% objek yang ada"},
    {label:"mAP50",    val:"0.848",sub:"84.8%",col:C.green, desc:"Performa deteksi pada IoU ≥ 0.50"},
    {label:"mAP50-95", val:"0.739",sub:"73.9%",col:C.orange,desc:"Performa ketat pada IoU 0.50–0.95"},
  ];
  metrics.forEach((m,i)=>{
    const mx=0.3+(i%2)*4.85, my=1.12+Math.floor(i/2)*2.15;
    s.addShape(pres.shapes.RECTANGLE,{x:mx,y:my,w:4.6,h:1.9,fill:{color:C.card},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:mx,y:my,w:4.6,h:0.07,fill:{color:m.col}});
    s.addText(m.val,{x:mx+0.15,y:my+0.18,w:2.0,h:0.88,fontSize:38,bold:true,color:m.col,fontFace:"Calibri",align:"center",valign:"middle"});
    s.addText(m.label,{x:mx+2.25,y:my+0.15,w:2.2,h:0.48,fontSize:14,bold:true,color:C.white,fontFace:"Calibri",margin:0});
    s.addText(m.sub,  {x:mx+2.25,y:my+0.65,w:2.2,h:0.38,fontSize:11,color:m.col,fontFace:"Calibri",margin:0});
    s.addText(m.desc, {x:mx+0.15,y:my+1.18,w:4.3,h:0.55,fontSize:10,color:C.gray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S18 — HASIL PER KELAS
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Hasil Evaluasi per Kelas");

  const classes=[
    {n:"🏠 Home",        p:"0.865",r:"0.533",m50:"0.703",m9:"0.528",col:C.accent},
    {n:"🛢️ Oil Refinery",p:"0.998",r:"1.000",m50:"0.995",m9:"0.958",col:C.orange},
    {n:"☀️ Solar Panels",p:"0.869",r:"0.935",m50:"0.951",m9:"0.802",col:C.green},
    {n:"🕌 Mosque",      p:"0.913",r:"0.619",m50:"0.742",m9:"0.668",col:C.purple},
  ];

  // Table header
  const cols=["Kelas","Precision","Recall","mAP50","mAP50-95"];
  const colX=[0.3,2.6,4.2,5.8,7.4];
  const colW=[2.2,1.5,1.5,1.5,1.5];
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:0.82,w:9.1,h:0.45,fill:{color:C.navy}});
  cols.forEach((c,i)=>s.addText(c,{x:colX[i],y:0.82,w:colW[i],h:0.45,fontSize:11,bold:true,color:C.accent,fontFace:"Calibri",align:"center",valign:"middle"}));

  classes.forEach((cl,i)=>{
    const ry=1.32+i*0.85;
    const bg=i%2===0 ? C.white : C.lgray;
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:ry,w:9.1,h:0.78,fill:{color:bg},shadow:i===0?sh():undefined});
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:ry,w:0.06,h:0.78,fill:{color:cl.col}});
    s.addText(cl.n,{x:0.45,y:ry+0.1,w:2.0,h:0.58,fontSize:12,bold:true,color:C.navy,fontFace:"Calibri",valign:"middle",margin:0});
    [cl.p,cl.r,cl.m50,cl.m9].forEach((v,j)=>{
      const col=parseFloat(v)>=0.9?C.green:parseFloat(v)>=0.7?C.orange:C.red;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:colX[j+1]+0.15,y:ry+0.16,w:1.15,h:0.44,fill:{color:col,transparency:80},rectRadius:0.08});
      s.addText(v,{x:colX[j+1],y:ry+0.1,w:colW[j+1],h:0.58,fontSize:13,bold:true,color:col,fontFace:"Calibri",align:"center",valign:"middle",margin:0});
    });
  });

  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:4.7,w:9.1,h:0.68,fill:{color:C.navy},shadow:sh()});
  s.addText("📌  Oil Refinery dan Solar Panels performa terbaik. Home dan Mosque perlu lebih banyak variasi data.",
    {x:0.45,y:4.75,w:8.85,h:0.55,fontSize:11,color:C.light,fontFace:"Calibri",valign:"middle"});
}

// ══════════════════════════════════════════════════════════
// S19 — CONFUSION MATRIX ANALISIS
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Analisis Confusion Matrix",true);

  const findings=[
    {cls:"🛢️ Oil Refinery",finding:"Hampir seluruhnya terdeteksi benar — performa hampir sempurna.",good:true,col:C.orange},
    {cls:"☀️ Solar Panels", finding:"Tingkat deteksi tinggi — pola visual unik memudahkan model.",good:true,col:C.green},
    {cls:"🏠 Home",         finding:"Beberapa objek masuk background — variasi bentuk atap tinggi.",good:false,col:C.accent},
    {cls:"🕌 Mosque",       finding:"Beberapa objek tidak terdeteksi — dataset masih terbatas.",good:false,col:C.purple},
  ];
  findings.forEach((f,i)=>{
    const fy=0.88+i*1.08;
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:fy,w:9.4,h:0.9,fill:{color:C.card},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:fy,w:0.06,h:0.9,fill:{color:f.col}});
    s.addText(f.cls,{x:0.5,y:fy+0.12,w:2.4,h:0.65,fontSize:13,bold:true,color:f.col,fontFace:"Calibri",valign:"middle",margin:0});
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:2.95,y:fy+0.15,w:1.3,h:0.3,fill:{color: f.good?C.green:C.red},rectRadius:0.07});
    s.addText(f.good?"✅ Bagus":"⚠️ Perlu Perbaikan",
      {x:2.95,y:fy+0.15,w:1.3,h:0.3,fontSize:8.5,bold:true,color:C.white,align:"center",valign:"middle",fontFace:"Calibri"});
    s.addText(f.finding,{x:4.4,y:fy+0.13,w:5.1,h:0.65,fontSize:11,color:C.light,fontFace:"Calibri",valign:"middle",margin:0});
  });

  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:5.22,w:9.4,h:0.28,fill:{color:"0D1E35"}});
  s.addText("Kesalahan utama: bukan salah klasifikasi antar kelas, melainkan objek Home/Mosque tidak terdeteksi (masuk background).",
    {x:0.45,y:5.22,w:9.1,h:0.28,fontSize:9.5,color:C.gray,fontFace:"Calibri",valign:"middle",margin:0});
}

// ══════════════════════════════════════════════════════════
// S20 — GRAFIK TRAINING
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Analisis Grafik Training");

  const lossData=[{name:"Train Loss",labels:["Ep1","Ep20","Ep40","Ep60","Ep80","Ep100"],values:[2.1,0.9,0.6,0.48,0.42,0.38]},
                  {name:"Val Loss",  labels:["Ep1","Ep20","Ep40","Ep60","Ep80","Ep100"],values:[1.8,0.75,0.52,0.45,0.44,0.43]}];
  s.addChart(pres.charts.LINE, lossData, {
    x:0.3,y:0.82,w:5.5,h:2.8,
    chartColors:[C.accent,C.orange],
    chartArea:{fill:{color:C.navy},roundedCorners:false},
    lineSize:2.5, lineSmooth:true,
    catAxisLabelColor:C.gray, valAxisLabelColor:C.gray,
    valGridLine:{color:"1E3A5F",size:0.5}, catGridLine:{style:"none"},
    showTitle:true, title:"Training & Validation Loss",
    titleFontSize:11, titleColor:C.light,
  });

  const mapData=[{name:"mAP50",labels:["Ep1","Ep20","Ep40","Ep60","Ep80","Ep100"],values:[0.12,0.55,0.72,0.81,0.845,0.848]}];
  s.addChart(pres.charts.LINE, mapData, {
    x:0.3,y:3.72,w:5.5,h:1.75,
    chartColors:[C.green],
    chartArea:{fill:{color:C.navy},roundedCorners:false},
    lineSize:2.5, lineSmooth:true,
    catAxisLabelColor:C.gray, valAxisLabelColor:C.gray,
    valGridLine:{color:"1E3A5F",size:0.5}, catGridLine:{style:"none"},
    showTitle:true, title:"mAP50 per Epoch",
    titleFontSize:11, titleColor:C.light,
  });

  const findings2=[
    ["📉","Train Loss","Turun konsisten dari 2.1 → 0.38"],
    ["📉","Val Loss",  "Turun dan stabil — tidak overfitting"],
    ["📈","mAP50",    "Naik dari 0.12 → 0.848 (stabil)"],
    ["🛑","Early Stop","Epoch ~80 tidak ada peningkatan 20ep"],
  ];
  findings2.forEach((f,i)=>{
    const fy=0.88+i*1.12;
    s.addShape(pres.shapes.RECTANGLE,{x:6.05,y:fy,w:3.65,h:0.95,fill:{color:C.white},shadow:sh()});
    s.addText(f[0],{x:6.1,y:fy+0.1,w:0.55,h:0.75,fontSize:20,align:"center",valign:"middle"});
    s.addText(f[1],{x:6.7,y:fy+0.1,w:2.9,h:0.35,fontSize:11,bold:true,color:C.navy,fontFace:"Calibri",margin:0});
    s.addText(f[2],{x:6.7,y:fy+0.48,w:2.9,h:0.35,fontSize:10,color:C.dgray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S21 — STREAMLIT FEATURES
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Implementasi Web App: Streamlit",true);
  const feats=[
    {ico:"📤",t:"Upload Gambar",d:"Drag & drop citra satelit format PNG, JPG, atau TIF.",col:C.accent},
    {ico:"🧠",t:"AI Inference",d:"Model YOLOv8 melakukan deteksi multi-class secara real-time.",col:C.purple},
    {ico:"🔲",t:"Bounding Box",d:"Setiap objek terdeteksi diberi kotak warna berbeda per kelas.",col:C.cyan},
    {ico:"📊",t:"Count per Kelas",d:"Sistem menghitung jumlah tiap kelas secara otomatis.",col:C.green},
    {ico:"📋",t:"Tabel Ringkasan",d:"Tampilkan tabel dengan nama kelas, jumlah, dan confidence.",col:C.orange},
    {ico:"⬇️",t:"Download Hasil",d:"Export gambar hasil deteksi bounding box sebagai PNG.",col:"A855F7"},
  ];
  feats.forEach((f,i)=>{
    const fx=0.3+(i%3)*3.15, fy=0.88+Math.floor(i/3)*2.1;
    s.addShape(pres.shapes.RECTANGLE,{x:fx,y:fy,w:2.9,h:1.82,fill:{color:C.card},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:fx,y:fy,w:2.9,h:0.07,fill:{color:f.col}});
    s.addText(f.ico,{x:fx+0.1,y:fy+0.12,w:0.65,h:0.65,fontSize:24,align:"center",valign:"middle"});
    s.addText(f.t,{x:fx+0.82,y:fy+0.15,w:1.9,h:0.45,fontSize:12,bold:true,color:C.white,fontFace:"Calibri",margin:0});
    s.addText(f.d,{x:fx+0.1, y:fy+0.85,w:2.7,h:0.85,fontSize:9.5,color:C.gray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S22 — KODE STREAMLIT
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Struktur Kode Streamlit");
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:0.82,w:5.5,h:4.3,fill:{color:C.dgray},shadow:sh()});
  s.addText("# src/app.py — core logic",{x:0.45,y:0.9,w:5.2,h:0.28,fontSize:9,color:C.gray,fontFace:"Consolas",italic:true,margin:0});
  const appcode=[
    "from ultralytics import YOLO","import streamlit as st","import cv2, numpy as np","",
    "model = YOLO('models/best.pt')","",
    "uploaded = st.file_uploader(",
    "    'Upload Image', type=['png','jpg','tif'])",
    "","if uploaded:",
    "    img = load_image(uploaded)",
    "    results = model.predict(",
    "        source=img, conf=conf, imgsz=640)",
    "    annotated = results[0].plot()",
    "","    # Count per class",
    "    counts = count_per_class(results)",
    "    show_metrics(counts)",
    "    st.image(annotated)",
  ];
  s.addText(appcode.join("\n"),{x:0.45,y:1.25,w:5.25,h:3.75,fontSize:9.5,color:"A5F3FC",fontFace:"Consolas",margin:0});

  const comps=[
    ["①","Page Config","Set layout, title, icon"],
    ["②","Load Model","YOLO('models/best.pt') + cache"],
    ["③","File Uploader","Drag & drop gambar"],
    ["④","Preprocessing","Baca gambar → numpy array"],
    ["⑤","Inference","model.predict() → results"],
    ["⑥","Count per Class","Hitung objek per kelas"],
    ["⑦","Visualisasi","results.plot() bounding box"],
    ["⑧","Download","BytesIO → st.download_button"],
  ];
  s.addText("Komponen Utama",{x:6.05,y:0.85,w:3.65,h:0.38,fontSize:12,bold:true,color:C.navy,fontFace:"Calibri"});
  comps.forEach(([n,t,d],i)=>{
    const cy=1.28+i*0.5;
    s.addShape(pres.shapes.RECTANGLE,{x:6.05,y:cy,w:3.65,h:0.44,fill:{color: i%2===0?C.white:"F1F5F9"}});
    s.addText(n,{x:6.12,y:cy+0.05,w:0.4,h:0.34,fontSize:11,bold:true,color:C.accent,fontFace:"Calibri",margin:0});
    s.addText(t,{x:6.58,y:cy+0.05,w:1.5,h:0.3, fontSize:10,bold:true,color:C.navy,fontFace:"Calibri",margin:0});
    s.addText(d,{x:6.58,y:cy+0.27,w:2.9,h:0.2, fontSize:8.5,color:C.dgray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S23 — CONFIDENCE THRESHOLD
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Confidence Threshold",true);
  s.addText("Confidence threshold menentukan batas minimum keyakinan model untuk menampilkan hasil deteksi.",
    {x:0.5,y:0.78,w:9,h:0.32,fontSize:11,color:C.gray,fontFace:"Calibri",italic:true});

  const levels=[
    {val:"0.10",label:"Sensitif",desc:"Lebih banyak objek terdeteksi.\nFalse positive meningkat.\nCocok untuk eksplorasi.",col:C.red,   note:"⚠️ Terlalu sensitif"},
    {val:"0.25",label:"Default",desc:"Keseimbangan antara\npresisi dan sensitivitas.\nNilai rekomendasi.",col:C.green,note:"✅ Direkomendasikan"},
    {val:"0.50",label:"Ketat",  desc:"Hasil lebih bersih.\nObjek kecil bisa terlewat.\nCocok untuk demo resmi.",col:C.accent,note:"⚡ Untuk demo bersih"},
  ];
  levels.forEach((l,i)=>{
    const lx=0.3+i*3.15;
    s.addShape(pres.shapes.RECTANGLE,{x:lx,y:1.2,w:2.9,h:3.5,fill:{color:C.card},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:lx,y:1.2,w:2.9,h:0.07,fill:{color:l.col}});
    s.addText(l.val, {x:lx,y:1.38,w:2.9,h:1.0,fontSize:40,bold:true,color:l.col,align:"center",fontFace:"Calibri"});
    s.addText(l.label,{x:lx,y:2.42,w:2.9,h:0.42,fontSize:14,bold:true,color:C.white,align:"center",fontFace:"Calibri"});
    s.addText(l.desc, {x:lx+0.1,y:2.95,w:2.7,h:0.95,fontSize:10,color:C.gray,fontFace:"Calibri",align:"center"});
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:lx+0.3,y:4.28,w:2.3,h:0.3,fill:{color:l.col,transparency:70},rectRadius:0.08});
    s.addText(l.note,{x:lx+0.3,y:4.28,w:2.3,h:0.3,fontSize:9,bold:true,color:C.white,align:"center",valign:"middle",fontFace:"Calibri"});
  });
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:4.78,w:9.4,h:0.38,fill:{color:"0D1E35"}});
  s.addText("💡  Slider confidence threshold dapat ditambahkan di Streamlit agar pengguna bisa menyesuaikan sensitivitas secara interaktif.",
    {x:0.45,y:4.78,w:9.1,h:0.38,fontSize:10.5,color:C.light,fontFace:"Calibri",valign:"middle"});
}

// ══════════════════════════════════════════════════════════
// S24 — ALUR SISTEM
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Alur Sistem End-to-End");
  const flow=[
    {ico:"📤",t:"Upload",d:"User upload citra satelit",col:C.accent},
    {ico:"🔄",t:"Preprocess",d:"Gambar → numpy array",col:C.cyan},
    {ico:"🤖",t:"YOLOv8",d:"Inference deteksi objek",col:C.purple},
    {ico:"🔲",t:"Bounding Box",d:"Gambar kotak per objek",col:C.orange},
    {ico:"📊",t:"Count",d:"Hitung per kelas",col:C.green},
    {ico:"⬇️",t:"Download",d:"Export hasil PNG",col:"A855F7"},
  ];
  flow.forEach((f,i)=>{
    const fx=0.25+i*1.6;
    s.addShape(pres.shapes.RECTANGLE,{x:fx,y:1.1,w:1.45,h:3.5,fill:{color:C.navy},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:fx,y:1.1,w:1.45,h:0.06,fill:{color:f.col}});
    s.addText(f.ico,{x:fx,y:1.28,w:1.45,h:0.75,fontSize:26,align:"center",valign:"middle"});
    s.addText(f.t,{x:fx,y:2.1,w:1.45,h:0.45,fontSize:12,bold:true,color:C.white,align:"center",fontFace:"Calibri"});
    s.addText(f.d,{x:fx+0.05,y:2.65,w:1.35,h:1.8,fontSize:9.5,color:C.gray,fontFace:"Calibri",align:"center"});
    if(i<5) s.addText("→",{x:fx+1.45,y:2.35,w:0.15,h:0.5,fontSize:14,bold:true,color:C.accent,align:"center",valign:"middle"});
  });
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:4.8,w:9.4,h:0.72,fill:{color:C.white},shadow:sh()});
  s.addText("Upload Image  →  Preprocessing  →  YOLOv8 Detection  →  Bounding Box  →  Count per Class  →  Download Result",
    {x:0.4,y:4.86,w:9.1,h:0.58,fontSize:11,bold:true,color:C.accent,fontFace:"Calibri",align:"center",valign:"middle"});
}

// ══════════════════════════════════════════════════════════
// S25 — DEMO APP
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Demo Aplikasi Streamlit",true);

  // mock browser
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:0.82,w:6.5,h:4.45,fill:{color:"071428"},shadow:sh()});
  s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:0.82,w:6.5,h:0.42,fill:{color:"1A2744"}});
  s.addText("Building Detection AI 🏢",{x:0.5,y:0.88,w:6.0,h:0.3,fontSize:9.5,color:C.gray,fontFace:"Calibri"});
  // header banner
  s.addShape(pres.shapes.RECTANGLE,{x:0.55,y:1.36,w:6.0,h:0.78,fill:{color:C.accent,transparency:20}});
  s.addText("Multi-Class Building Detection",{x:0.55,y:1.42,w:6.0,h:0.38,fontSize:13,bold:true,color:C.white,align:"center",fontFace:"Calibri"});
  s.addText("YOLOv8 · Home · Mosque · Oil Refinery · Solar Panels",{x:0.55,y:1.8,w:6.0,h:0.28,fontSize:8.5,color:C.light,align:"center",fontFace:"Calibri"});
  // upload zone
  s.addShape(pres.shapes.RECTANGLE,{x:0.55,y:2.22,w:6.0,h:0.65,fill:{color:C.card}});
  s.addText("📡  Drop satellite image here  ·  PNG / JPG / TIF",{x:0.55,y:2.22,w:6.0,h:0.65,fontSize:9.5,color:C.gray,align:"center",valign:"middle",fontFace:"Calibri"});
  // metrics
  const clsCounts=[["Home","45",C.accent],["Oil Ref.","12",C.orange],["Solar","23",C.green],["Mosque","8",C.purple]];
  clsCounts.forEach(([k,v,col],i)=>{
    const mx=0.6+i*1.45;
    s.addShape(pres.shapes.RECTANGLE,{x:mx,y:3.0,w:1.3,h:0.7,fill:{color:C.blue}});
    s.addText(v,{x:mx,y:3.04,w:1.3,h:0.32,fontSize:16,bold:true,color:col,align:"center",fontFace:"Calibri"});
    s.addText(k,{x:mx,y:3.38,w:1.3,h:0.25,fontSize:8, color:C.gray,align:"center",fontFace:"Calibri"});
  });
  // conf slider
  s.addText("Confidence: 0.25",{x:0.6,y:3.82,w:3.0,h:0.28,fontSize:9,color:C.gray,fontFace:"Calibri"});
  s.addShape(pres.shapes.RECTANGLE,{x:0.6,y:4.15,w:5.9,h:0.65,fill:{color:C.card}});
  s.addText("[ Detected: 88 objects | Home:45  Oil:12  Solar:23  Mosque:8 ]",
    {x:0.6,y:4.15,w:5.9,h:0.65,fontSize:9,color:C.gray,align:"center",valign:"middle",fontFace:"Calibri",italic:true});

  const bullets=[
    "Upload citra satelit dari device",
    "Atur confidence threshold via slider",
    "Lihat hasil bounding box per kelas",
    "Baca count per kelas di metric cards",
    "Download gambar hasil deteksi",
  ];
  s.addText("Cara Pakai Aplikasi",{x:7.1,y:0.88,w:2.7,h:0.38,fontSize:12,bold:true,color:C.white,fontFace:"Calibri"});
  bullets.forEach((b,i)=>{
    s.addShape(pres.shapes.RECTANGLE,{x:7.1,y:1.42+i*0.72,w:2.7,h:0.62,fill:{color:C.card},shadow:sh()});
    s.addShape(pres.shapes.OVAL,{x:7.15,y:1.52+i*0.72,w:0.4,h:0.4,fill:{color:C.accent}});
    s.addText(`${i+1}`,{x:7.15,y:1.52+i*0.72,w:0.4,h:0.4,fontSize:10,bold:true,color:C.white,align:"center",valign:"middle",fontFace:"Calibri"});
    s.addText(b,{x:7.62,y:1.49+i*0.72,w:2.1,h:0.46,fontSize:9.5,color:C.light,fontFace:"Calibri",valign:"middle",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S26 — KELEBIHAN
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Kelebihan Sistem");
  const pros=[
    "Dapat mendeteksi 4 kelas objek berbeda dalam satu kali inference.",
    "Menghasilkan bounding box dan jumlah objek per kelas secara otomatis.",
    "Menggunakan YOLOv8n yang ringan dan cepat — cocok untuk GPU laptop.",
    "Dapat berjalan dengan GPU GTX 1650 4GB tanpa error memori.",
    "Web interface Streamlit sederhana — cukup upload gambar, hasil langsung tampil.",
    "Confidence threshold dapat disesuaikan untuk berbagai kebutuhan deteksi.",
  ];
  pros.forEach((p,i)=>{
    const py=0.85+i*0.75;
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:py,w:9.4,h:0.62,fill:{color:C.white},shadow:i===0?sh():undefined});
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:py,w:0.06,h:0.62,fill:{color:C.green}});
    s.addShape(pres.shapes.OVAL,{x:0.48,y:py+0.12,w:0.38,h:0.38,fill:{color:C.green}});
    s.addText("✔",{x:0.48,y:py+0.12,w:0.38,h:0.38,fontSize:12,bold:true,color:C.white,align:"center",valign:"middle"});
    s.addText(p,{x:1.0,y:py+0.1,w:8.55,h:0.44,fontSize:11,color:C.dgray,fontFace:"Calibri",valign:"middle",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S27 — KETERBATASAN
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Keterbatasan Sistem",true);
  const cons=[
    "Dataset masih relatif terbatas — model deep learning idealnya butuh ribuan gambar per kelas.",
    "Kelas Home dan Mosque memiliki variasi bentuk tinggi sehingga recall lebih rendah.",
    "Hasil deteksi sangat bergantung pada kualitas dan resolusi citra satelit input.",
    "Objek terlalu kecil, blur, atau tertutup pohon dapat tidak terdeteksi.",
    "Model belum diuji pada berbagai lokasi geografis yang berbeda (Indonesia, Asia, Eropa).",
  ];
  cons.forEach((c,i)=>{
    const cy=0.85+i*0.95;
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:cy,w:9.4,h:0.8,fill:{color:C.card},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:cy,w:0.06,h:0.8,fill:{color:C.red}});
    s.addShape(pres.shapes.OVAL,{x:0.48,y:cy+0.18,w:0.44,h:0.44,fill:{color:C.red}});
    s.addText("✖",{x:0.48,y:cy+0.18,w:0.44,h:0.44,fontSize:12,bold:true,color:C.white,align:"center",valign:"middle"});
    s.addText(c,{x:1.08,y:cy+0.12,w:8.5,h:0.58,fontSize:11,color:C.light,fontFace:"Calibri",valign:"middle",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S28 — FUTURE WORK
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.lgray};
  hdr(s,"Pengembangan Selanjutnya");
  const fws=[
    {ico:"📸",t:"Tambah Variasi Data",d:"Perbanyak data Home dan Mosque dari lokasi berbeda untuk meningkatkan recall.",col:C.accent},
    {ico:"🌍",t:"Variasi Geografis",  d:"Tambah data dari berbagai negara agar model tidak bias ke satu kawasan.",col:C.cyan},
    {ico:"⚡",t:"YOLOv8s / YOLOv11", d:"Upgrade model jika hardware mendukung untuk akurasi lebih tinggi.",col:C.purple},
    {ico:"📥",t:"Export ke CSV",      d:"Tambahkan fitur download hasil deteksi dalam format spreadsheet CSV.",col:C.green},
    {ico:"🎯",t:"Confidence per Obj", d:"Tampilkan nilai confidence score di atas tiap bounding box.",col:C.orange},
    {ico:"🌐",t:"Deploy Online",      d:"Deploy ke Streamlit Cloud atau Hugging Face Spaces untuk akses publik.",col:"A855F7"},
  ];
  fws.forEach((f,i)=>{
    const fx=0.3+(i%3)*3.15, fy=0.82+Math.floor(i/3)*2.2;
    s.addShape(pres.shapes.RECTANGLE,{x:fx,y:fy,w:2.9,h:1.95,fill:{color:C.white},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:fx,y:fy,w:2.9,h:0.07,fill:{color:f.col}});
    s.addText(f.ico,{x:fx+0.1,y:fy+0.13,w:0.62,h:0.62,fontSize:22,align:"center",valign:"middle"});
    s.addText(f.t,{x:fx+0.8,y:fy+0.15,w:1.95,h:0.45,fontSize:11,bold:true,color:C.navy,fontFace:"Calibri",margin:0});
    s.addText(f.d,{x:fx+0.1,y:fy+0.82,w:2.7,h:0.98,fontSize:9.5,color:C.dgray,fontFace:"Calibri",margin:0});
  });
}

// ══════════════════════════════════════════════════════════
// S29 — KESIMPULAN
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  hdr(s,"Kesimpulan",true);
  const pts=[
    {t:"Dataset Berhasil Dibuat",   d:"241 gambar · 1,284 anotasi · 4 kelas via Roboflow dengan konsistensi label terjaga.",col:C.accent},
    {t:"Model YOLOv8n Terlatih",    d:"Precision 0.911 · Recall 0.772 · mAP50 0.848 · mAP50-95 0.739 pada dataset validasi.",col:C.green},
    {t:"Detection & Counting OK",   d:"Sistem berhasil mendeteksi dan menghitung objek per kelas pada citra satelit.",col:C.cyan},
    {t:"Web App Berjalan",          d:"Streamlit app siap demo — upload, deteksi, visualisasi, download dalam satu halaman.",col:C.purple},
  ];
  pts.forEach((p,i)=>{
    const py=1.0+i*1.05;
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:py,w:9.4,h:0.9,fill:{color:C.card},shadow:sh()});
    s.addShape(pres.shapes.RECTANGLE,{x:0.3,y:py,w:0.06,h:0.9,fill:{color:p.col}});
    s.addShape(pres.shapes.OVAL,{x:0.48,y:py+0.18,w:0.5,h:0.5,fill:{color:p.col}});
    s.addText("✓",{x:0.48,y:py+0.18,w:0.5,h:0.5,fontSize:16,bold:true,color:C.white,align:"center",valign:"middle"});
    s.addText(p.t,{x:1.15,y:py+0.1, w:8.4,h:0.35,fontSize:13,bold:true,color:C.white,fontFace:"Calibri",margin:0});
    s.addText(p.d,{x:1.15,y:py+0.5, w:8.4,h:0.32,fontSize:11,color:C.gray,fontFace:"Calibri",margin:0});
  });
  s.addShape(pres.shapes.RECTANGLE,{x:1.5,y:5.2,w:7.0,h:0.32,fill:{color:C.accent,transparency:80}});
  s.addText("Multi-Class Building Detection · YOLOv8 · Radithya Wildan Pratama · 2025",
    {x:1.5,y:5.2,w:7.0,h:0.32,fontSize:9.5,color:C.light,align:"center",valign:"middle",fontFace:"Calibri"});
}

// ══════════════════════════════════════════════════════════
// S30 — PENUTUP / Q&A
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide(); s.background={color:C.navy};
  s.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.06,fill:{color:C.accent}});
  s.addShape(pres.shapes.OVAL,{x:6.5,y:-1,w:5,h:5,fill:{color:C.accent,transparency:90}});
  s.addShape(pres.shapes.OVAL,{x:-1,y:3,w:4,h:4,fill:{color:C.purple,transparency:90}});
  s.addShape(pres.shapes.OVAL,{x:4,y:1.5,w:2,h:2,fill:{color:C.cyan,transparency:92}});

  s.addText("Terima Kasih",{x:0.5,y:0.8,w:9,h:1.3,fontSize:48,bold:true,color:C.white,fontFace:"Calibri",align:"center"});
  s.addShape(pres.shapes.RECTANGLE,{x:3,y:2.2,w:4,h:0.05,fill:{color:C.cyan}});
  s.addText("Q & A",{x:0.5,y:2.42,w:9,h:0.88,fontSize:32,bold:true,color:C.accent,fontFace:"Calibri",align:"center"});
  s.addText("Radithya Wildan Pratama",{x:0.5,y:3.45,w:9,h:0.42,fontSize:14,bold:true,color:C.white,fontFace:"Calibri",align:"center"});
  s.addText("Multi-Class Building Detection pada Citra Satelit",{x:0.5,y:3.9,w:9,h:0.35,fontSize:12,color:C.gray,fontFace:"Calibri",align:"center",italic:true});

  // tech row
  const tech=["YOLOv8","Roboflow","Streamlit","PyTorch","Python 3.10"];
  tech.forEach((t,i)=>{
    const px=0.6+i*1.78;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:px,y:4.45,w:1.6,h:0.35,fill:{color:C.card},rectRadius:0.09});
    s.addText(t,{x:px,y:4.45,w:1.6,h:0.35,fontSize:10,color:C.light,align:"center",valign:"middle",fontFace:"Calibri"});
  });
  s.addShape(pres.shapes.RECTANGLE,{x:0,y:5.57,w:10,h:0.055,fill:{color:C.accent}});
}

pres.writeFile({ fileName: "Building_Detection_YOLOv8_PPT.pptx" })
  .then(()=>console.log("Done")).catch(e=>console.error(e));