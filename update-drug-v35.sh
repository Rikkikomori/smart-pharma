#!/bin/bash
set -e
PROJECT_DIR=~/Desktop/smart-pharma-v3.3
cd "$PROJECT_DIR"

echo "🎨 Обновляю дизайн страницы препаратов (v3.5)..."

# --- drug.html ---
cat > drug.html <<'HTML'
<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Препарат — Smart-Pharma</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="topbar">
    <div class="wrap">
      <div class="logo">Smart-Pharma</div>
      <nav><a href="index.html">← Назад к поиску</a> · <a href="collections.html">Подборки</a></nav>
    </div>
  </header>

  <main class="drug-container">
    <section class="drug-card" id="drugHeader"></section>
    <section class="drug-card" id="drugAnalogs"></section>
    <section class="drug-card pharmacy-info" id="drugPharmacy"></section>
    <section class="drug-card rec-grid" id="drugRecs"></section>
    <section class="drug-card instruction" id="drugRecipe"></section>
    <section class="drug-card" id="relatedBlock">
      <h2>Похожие препараты</h2>
      <div id="related" class="collection-grid"></div>
    </section>
  </main>

<script src="data.js"></script>
<script>
(function(){
  function p(n){ return new URLSearchParams(location.search).get(n); }
  const id = Number(p('id'));
  const d = DATA.find(x=>x.id===id);
  if(!d){ document.getElementById('drugHeader').innerHTML='<p>Препарат не найден</p>'; return; }

  // --- Header ---
  const header = document.getElementById('drugHeader');
  const tagsHtml = (d.tags||[]).map(t=>`<button class="tag" data-tag="${t}">${t}</button>`).join(' ');
  header.innerHTML = `
    <img src="${d.img}" alt="${d.name}" class="drug-img-wide">
    <h1>${d.name} <span class="badge ${d.prescription?'rx':'otc'}">${d.prescription?'Rx':'OTC'}</span></h1>
    <div class="tags">${tagsHtml}</div>
    <p><strong>Производитель:</strong> ${d.company||'—'}</p>
    <p><strong>Действующее вещество:</strong> ${d.substance}</p>
    <p><strong>Форма:</strong> ${d.form}</p>
    <p><strong>Кратко:</strong> ${d.short||'—'}</p>
    <p><strong>Показания (симптомы):</strong> ${(d.symptoms||[]).join(', ')}</p>
    <p><strong>Заболевания:</strong> ${(d.disease||[]).join(', ')}</p>
  `;

  // --- Analogs ---
  function resolve(arr){ return arr.map(id=>DATA.find(x=>x.id===id)).filter(Boolean); }
  const analogs = document.getElementById('drugAnalogs');
  analogs.innerHTML = `
    <h2>Аналоги</h2>
    <p><strong>То же вещество:</strong> ${resolve(d.analogs.same_substance).map(x=>`<a href="drug.html?id=${x.id}">${x.name}</a>`).join(', ')||'—'}</p>
    <p><strong>По группе:</strong> ${resolve(d.analogs.group_analogs).map(x=>`<a href="drug.html?id=${x.id}">${x.name}</a>`).join(', ')||'—'}</p>
    <p><strong>Другие формы:</strong> ${resolve(d.analogs.other_forms).map(x=>`<a href="drug.html?id=${x.id}">${x.name}</a>`).join(', ')||'—'}</p>
  `;

  // --- Pharmacy Info ---
  const ph = d.pharmacyInfo||{};
  const pharm = document.getElementById('drugPharmacy');
  pharm.innerHTML = `
    <h2>Информация от аптеки</h2>
    <p><strong>Аптека:</strong> ${ph.store||'—'}</p>
    <p><strong>Наличие:</strong> ${ph.stock??'—'} шт.</p>
    <p><strong>Цена:</strong> ${ph.price||'—'}</p>
    <p><strong>Дата последнего прихода:</strong> ${ph.lastDelivery||'—'}</p>
    <p><strong>Расположение в аптеке:</strong> ${ph.location||'—'}</p>
  `;

  // --- Recommendations ---
  const recs = document.getElementById('drugRecs');
  recs.innerHTML = `
    <div><h3>От аптеки</h3><p>${(d.recommend_pharmacy||[]).join(', ')||'—'}</p></div>
    <div><h3>От Smart-Pharma</h3><p>${(d.recommend_site||[]).join(', ')||'—'}</p></div>
  `;

  // --- Recipe Reminder ---
  const rec = document.getElementById('drugRecipe');
  rec.innerHTML = `
    <h2>Памятка по рецепту</h2>
    <ol>
      <li>Проверьте печать и подпись врача.</li>
      <li>Сверьте ФИО и номер лицензии.</li>
      <li>Проверьте дозировки и дату.</li>
      <li>Название должно быть полным (МНН или торговое).</li>
      <li>Проверьте серию и штамп бланка.</li>
    </ol>
    <img src="https://via.placeholder.com/900x300.png?text=Референс+рецепта" alt="Пример рецепта" class="recipe-img">
  `;

  // --- Related ---
  const rel = DATA.filter(x=>x.id!==d.id && (x.tags||[]).some(t=>d.tags.includes(t))).slice(0,8);
  const relDiv = document.getElementById('related');
  rel.forEach(r=>{
    const div=document.createElement('div'); div.className='result-card';
    div.innerHTML=`<img src="${r.img}"><div class="title"><a href="drug.html?id=${r.id}">${r.name}</a></div><div class="sub">${r.substance}</div>`;
    relDiv.appendChild(div);
  });
})();
</script>
</body>
</html>
HTML

# --- style.css (добавляем новые стили) ---
cat > style.css <<'CSS'
:root{--bg:#f6f8fb;--card:#fff;--accent:#1766d1;--muted:#6b7280;--ok:#16a34a;--danger:#dc2626}
body{font-family:Inter,Arial,sans-serif;background:var(--bg);margin:0;color:#0f172a}
.topbar{background:#fff;border-bottom:1px solid #e5e7eb}
.wrap{max-width:1400px;margin:0 auto;padding:14px 20px;display:flex;justify-content:space-between;align-items:center}
.logo{font-weight:700;color:var(--accent)}
.drug-container{max-width:1100px;margin:20px auto;padding:0 20px;display:flex;flex-direction:column;gap:20px}
.drug-card{background:#fff;padding:20px;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
.drug-img-wide{width:100%;max-height:320px;object-fit:cover;border-radius:12px;margin-bottom:16px}
.tags{margin-top:8px;display:flex;flex-wrap:wrap;gap:6px}
.tag{padding:6px 10px;border-radius:999px;background:#f3f4f6;border:none;font-size:13px}
.badge{padding:4px 8px;border-radius:999px;font-size:12px;margin-left:6px}
.badge.rx{background:var(--danger);color:#fff}
.badge.otc{background:var(--ok);color:#fff}
.pharmacy-info{background:#f0fdf4;border-left:4px solid var(--ok)}
.rec-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.recipe-img{width:100%;margin-top:12px;border-radius:10px}
.collection-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
.result-card{background:#fff;border-radius:12px;padding:12px;box-shadow:0 4px 12px rgba(0,0,0,0.05)}
.result-card img{width:100%;height:140px;object-fit:cover;border-radius:8px}
.title{font-weight:600;margin:8px 0}
.sub{color:var(--muted);font-size:13px}
@media(max-width:768px){.rec-grid{grid-template-columns:1fr}}
CSS

echo "✅ Страница препарата переработана (v3.5). Перезагрузи drug.html!"
