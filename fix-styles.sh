#!/bin/bash
set -e

PROJECT_DIR=~/Desktop/smart-pharma-v3.3
cd "$PROJECT_DIR" || { echo "Папка $PROJECT_DIR не найдена"; exit 1; }

echo "🔧 Применяю фикс стилей: main <- v3.3, drug <- v3.5 (раздельно по классам)..."

# ---------------- style.css ----------------
cat > style.css <<'CSS'
/* =========================
   Smart-Pharma unified styles
   - page-index  (главная)
   - page-drug   (страница препарата, блочная v3.5)
   ========================= */

:root{
  --bg:#f6f8fb;
  --card:#ffffff;
  --accent:#1766d1;
  --muted:#6b7280;
  --ok:#16a34a;
  --danger:#dc2626;
  --radius:12px;
  --shadow: 0 6px 18px rgba(15,23,42,0.04);
}

/* common basics */
*{box-sizing:border-box}
body{font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
     background:var(--bg); color:#0f172a; margin:0; -webkit-font-smoothing:antialiased}
.topbar{background:var(--card);border-bottom:1px solid rgba(15,23,42,0.06)}
.wrap{max-width:1400px;margin:0 auto;padding:14px 20px;display:flex;justify-content:space-between;align-items:center}
.logo{font-weight:700;color:var(--accent)}
a{color:var(--accent);text-decoration:underline}

/* =========================
   СТИЛИ ДЛЯ ГЛАВНОЙ: scope .page-index
   (восстановлены поведение и внешний вид, как было)
   ========================= */
.page-index .container{
  max-width:1200px;margin:18px auto;display:grid;grid-template-columns:260px 1fr;gap:18px;padding:0 20px;
}
.page-index .card{background:var(--card);padding:14px;border-radius:var(--radius);box-shadow:var(--shadow)}
.page-index .left{display:flex;flex-direction:column;gap:12px}
.page-index .search-card{display:flex;flex-direction:column;gap:8px}
.page-index #query{padding:12px;border-radius:8px;border:1px solid #e6eef9;font-size:15px;width:100%}
.page-index .controls{display:flex;justify-content:flex-end}
.page-index button{background:var(--accent);color:#fff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer}
.page-index button.muted{background:#eef2f7;color:#334155}

/* filters */
.page-index .filters h3{margin:6px 0 8px 0;font-size:16px}
.page-index .tags{display:flex;flex-wrap:wrap;gap:8px}
.page-index .tag{padding:6px 10px;border-radius:999px;background:#f3f4f6;border:1px solid rgba(15,23,42,0.06);cursor:pointer;font-size:13px}
.page-index .quick-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:12px; margin-top:8px; }
.page-index .quick-grid button{padding:12px;border-radius:10px;background:#1766d1;color:#fff;border:none;cursor:pointer; text-align:center; font-weight:600;}

/* results grid */
.page-index .results.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-top:12px}
.page-index .result-card{background:var(--card);border-radius:12px;padding:10px;box-shadow:var(--shadow);transition:transform .12s;overflow:hidden}
.page-index .result-card:hover{transform:translateY(-6px)}
.page-index .result-card img{width:100%;height:160px;object-fit:cover;border-radius:8px}
.page-index .title{font-weight:700;margin:8px 0}
.page-index .sub{color:var(--muted);font-size:13px}

/* suggestions */
.page-index .suggestions{position:relative;margin-top:6px}
.page-index .suggestion-item{background:#fff;padding:10px;border-radius:8px;margin-bottom:6px;cursor:pointer;border:1px solid transparent}
.page-index .suggestion-item:hover{background:#f1f5f9}

/* banner + small helpers */
.page-index .rec-card{margin-top:10px;padding:10px;background:#f9fafb;border-radius:8px;font-size:14px}
.page-index .footer{max-width:1200px;margin:20px auto;padding:20px;text-align:center;color:var(--muted)}

/* =========================
   СТИЛИ ДЛЯ СТРАНИЦЫ ПРЕПАРАТА: scope .page-drug
   (блочная вёрстка v3.5)
   ========================= */
.page-drug .drug-container{
  max-width:1100px;margin:20px auto;padding:0 20px;display:flex;flex-direction:column;gap:20px;
}
.page-drug .drug-card{background:#fff;padding:20px;border-radius:12px;box-shadow:var(--shadow)}
.page-drug .drug-img-wide{width:100%;max-height:380px;object-fit:cover;border-radius:12px;margin-bottom:16px}
.page-drug h1{font-size:26px;margin:6px 0}
.page-drug .tags{margin-top:8px;display:flex;flex-wrap:wrap;gap:6px}
.page-drug .tag{padding:6px 10px;border-radius:999px;background:#f3f4f6;border:none;font-size:13px}
.page-drug .badge{padding:4px 8px;border-radius:999px;font-size:12px;margin-left:6px}
.page-drug .badge.rx{background:var(--danger);color:#fff}
.page-drug .badge.otc{background:var(--ok);color:#fff}
.page-drug .pharmacy-info{background:#f0fdf4;border-left:4px solid var(--ok);padding:16px;border-radius:10px}
.page-drug .rec-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.page-drug .rec-card{background:#fff;padding:14px;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
.page-drug .instruction{margin-top:14px;background:#fff;padding:12px;border-radius:8px}
.page-drug .collection-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;margin-top:12px}
.page-drug .result-card{background:#fff;border-radius:12px;padding:12px;box-shadow:0 4px 12px rgba(0,0,0,0.05)}
.page-drug .recipe-img{width:100%;margin-top:12px;border-radius:10px}

/* responsive adjustments */
@media(max-width:980px){
  .page-index .container{grid-template-columns:1fr;padding:0 12px}
  .page-drug .rec-grid{grid-template-columns:1fr}
  .wrap{padding:10px}
}
CSS

echo "✅ style.css обновлён."

# ---------------- add body classes to index.html and drug.html (robust) ----------------

# Add page-index to index.html body tag (if already has class -> append, else add)
perl -0777 -i -pe 'if(/<body[^>]*class="/){ s/(<body[^>]*class=")([^"]*)"/$1.$2." page-index\""/e } else { s/<body(.*?)>/<body class="page-index"$1>/s }' index.html

# Add page-drug to drug.html body tag
perl -0777 -i -pe 'if(/<body[^>]*class="/){ s/(<body[^>]*class=")([^"]*)"/$1.$2." page-drug\""/e } else { s/<body(.*?)>/<body class="page-drug"$1>/s }' drug.html

echo "✅ body классы проставлены: index.html -> page-index, drug.html -> page-drug"

# show files for quick check
echo
echo "Содержимое папки:"
ls -la

# try to open index
if command -v open >/dev/null 2>&1; then
  echo "Открываю index.html..."
  open index.html || true
fi

echo
echo "Готово — проверь главную и страницу препарата. Если где-то ещё есть визуальные проблемы, напиши конкретно (скриншот или опиши), я поправлю."
