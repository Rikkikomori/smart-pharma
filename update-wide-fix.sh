#!/bin/bash
set -e

PROJECT_DIR=~/Desktop/smart-pharma-v3.3
cd "$PROJECT_DIR"

echo "📐 Обновляю дизайн для широкой версии страницы препарата..."

# Переписываем style.css
cat > style.css <<'CSS'
:root{
  --bg:#f6f8fb; --card:#ffffff; --accent:#1766d1; --muted:#6b7280; --ok:#16a34a; --danger:#dc2626;
  --tag-sym:#e0f2fe; --tag-dz:#dcfce7; --tag-form:#ede9fe; --tag-type:#fee2e2; --tag-ph:#fff7ed; --tag-srv:#f3f4f6;
}
*{box-sizing:border-box}
body{font-family:Inter,system-ui,Arial,sans-serif;background:var(--bg);margin:0;color:#0f172a;-webkit-font-smoothing:antialiased}
.topbar{background:var(--card);border-bottom:1px solid rgba(15,23,42,0.06)}
.wrap{max-width:1400px;margin:0 auto;padding:14px 20px;display:flex;justify-content:space-between;align-items:center}
.logo{font-weight:700;color:var(--accent)}
.container{max-width:1400px;margin:20px auto;display:grid;grid-template-columns:280px 1fr;gap:20px;padding:0 20px}
.card{background:var(--card);padding:16px;border-radius:12px;box-shadow:0 8px 24px rgba(15,23,42,0.04)}
.left{display:flex;flex-direction:column;gap:14px}
.search-card{display:flex;flex-direction:column;gap:10px}
#query{padding:12px;border-radius:8px;border:1px solid #e6eef9;font-size:15px;width:100%}
.controls{display:flex;justify-content:flex-end}
button{background:var(--accent);color:#fff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer}
button.muted{background:#eef2f7;color:#334155}
.results.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-top:12px}
.result-card{background:var(--card);border-radius:12px;padding:12px;box-shadow:0 8px 20px rgba(15,23,42,0.04);transition:transform .12s;overflow:hidden}
.result-card:hover{transform:translateY(-6px)}
.result-card img{width:100%;height:160px;object-fit:cover;border-radius:8px}
.title{font-weight:700;margin:8px 0}
.sub{color:var(--muted);font-size:14px}
.tags{margin-top:8px;display:flex;flex-wrap:wrap;gap:6px}
.tag{padding:6px 10px;border-radius:999px;border:none;cursor:pointer;font-size:13px;background:#f3f4f6}
.tag.sym{background:var(--tag-sym);color:#0369a1}
.tag.dz{background:var(--tag-dz);color:#14532d}
.tag.form{background:var(--tag-form);color:#5b21b6}
.tag.type{background:var(--tag-type);color:#7f1d1d}
.tag.ph{background:var(--tag-ph);color:#92400e}
.tag.srv{background:var(--tag-srv);color:#111827}
.suggestions{position:relative;margin-top:6px}
.suggestion-item{background:#fff;padding:10px;border-radius:8px;margin-bottom:6px;cursor:pointer;border:1px solid transparent}
.suggestion-item:hover{background:#f1f5f9}

/* quick collections grid */
.quick-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px; margin-top:8px; }
.quick-grid button{padding:12px;border-radius:10px;background:#1766d1;color:#fff;border:none;cursor:pointer; text-align:center; font-weight:600;}

/* drug layout wide */
.drug-layout{display:grid;grid-template-columns:2fr 1fr;gap:30px;align-items:start}
.drug-layout h1{font-size:28px;margin-bottom:12px}
.drug-img{width:100%;border-radius:12px;object-fit:cover;margin-bottom:12px}
.badge{display:inline-block;padding:4px 8px;border-radius:999px;font-size:12px;margin-left:6px}
.badge.rx{background:var(--danger);color:#fff}
.badge.otc{background:var(--ok);color:#fff}
.rec-card{margin-top:12px;padding:14px;background:#fff;border-radius:10px;font-size:14px;box-shadow:0 6px 18px rgba(15,23,42,0.04)}
.instruction{margin-top:18px;background:#fff;padding:16px;border-radius:10px}
.pharmacy-info{margin-top:18px;padding:16px;background:#f0fdf4;border-radius:10px;border-left:4px solid var(--ok)}
.collection-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-top:14px}
.footer{max-width:1400px;margin:20px auto;padding:20px;text-align:center;color:var(--muted)}
@media(max-width:1024px){.container{grid-template-columns:1fr;padding:0 12px}.drug-layout{grid-template-columns:1fr}}
CSS

echo "✅ Дизайн обновлён! Перезагрузи drug.html в браузере."
