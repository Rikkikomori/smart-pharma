/* script.js — поиск, подсказки, фильтры, quick collections (v3.3) */
(function(){
  const $ = id => document.getElementById(id);
  function esc(s){ return (s||'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function buildFilters(){
    const root = $('filters'); if(!root) return;
    root.innerHTML = '';
    for(const cat in TAGS){
      const box = document.createElement('div');
      const h = document.createElement('h4'); h.textContent = cat; box.appendChild(h);
      const wrap = document.createElement('div'); wrap.className='tags';
      TAGS[cat].forEach(t=>{
        const btn = document.createElement('button'); btn.className='tag'; btn.textContent = t; btn.dataset.cat = cat;
        btn.onclick = ()=> toggleTag(btn);
        wrap.appendChild(btn);
      });
      box.appendChild(wrap); root.appendChild(box);
    }
  }

  let selectedTags = new Set();
  function toggleTag(btn){
    const tag = btn.textContent;
    if(selectedTags.has(tag)){ selectedTags.delete(tag); btn.style.opacity='1'; btn.classList.remove('active'); }
    else { selectedTags.add(tag); btn.style.opacity='0.7'; btn.classList.add('active'); }
    doSearch();
  }

  function resetFilters(){
    selectedTags.clear();
    document.querySelectorAll('#filters .tag').forEach(b=>{ b.style.opacity='1'; b.classList.remove('active'); });
    if($('query')) $('query').value = '';
    doSearch();
  }

  function renderQuickCollections(){
    const root = $('quickCollections'); if(!root) return;
    root.innerHTML='';
    COLLECTIONS.forEach(c=>{
      const btn = document.createElement('button'); btn.textContent = c.title; btn.onclick = ()=> location.href='collection.html?id='+encodeURIComponent(c.id);
      root.appendChild(btn);
    });
  }

  function showSuggestions(){
    const q = ($('query')?.value||'').trim().toLowerCase();
    const box = $('suggestions'); if(!box) return; box.innerHTML='';
    if(!q) return;
    const matches = DATA.filter(d=> d.name.toLowerCase().includes(q) || d.substance.toLowerCase().includes(q) || (d.tags||[]).join(' ').toLowerCase().includes(q)).slice(0,6);
    matches.forEach(d=>{
      const item = document.createElement('div'); item.className='suggestion-item';
      item.innerHTML = `<strong>${esc(d.name)}</strong><div class="sub">${esc(d.form)} • ${esc(d.substance)}</div>`;
      item.onclick = ()=> { $('query').value = d.name; box.innerHTML=''; doSearch(); };
      box.appendChild(item);
    });
  }

  function doSearch(qRaw){
    const q0 = qRaw !== undefined ? qRaw : ($('query')?.value || '');
    const q = q0.trim().toLowerCase();
    const sel = Array.from(selectedTags);
    let list = DATA.filter(d=>{
      const inName = d.name.toLowerCase().includes(q);
      const inSub = d.substance.toLowerCase().includes(q);
      const inSym = (d.symptoms||[]).join(' ').toLowerCase().includes(q);
      const inDis = (d.disease||[]).join(' ').toLowerCase().includes(q);
      const inTags = (d.tags||[]).join(' ').toLowerCase().includes(q.replace('#',''));
      const match = q === '' ? true : (inName || inSub || inSym || inDis || inTags);
      const tagsOk = sel.length === 0 ? true : sel.every(t => (d.tags||[]).includes(t));
      return match && tagsOk;
    });

    list.sort((a,b)=>{
      const score = it => (it.name.toLowerCase().includes(q)?100:0) + ((it.tags||[]).join(' ').toLowerCase().includes(q)?40:0) + (it.substance.toLowerCase().includes(q)?30:0);
      return score(b)-score(a);
    });

    renderResults(list.slice(0,100));
  }

  function renderResults(list){
    const root = $('results'); if(!root) return;
    root.innerHTML = '';
    if(list.length === 0){ root.innerHTML = '<p style="padding:12px">Ничего не найдено.</p>'; return; }
    list.forEach(d=>{
      const card = document.createElement('div'); card.className='result-card';
      card.innerHTML = `
        <img src="${d.img}" alt="${esc(d.name)}">
        <div class="title"><a href="drug.html?id=${d.id}">${esc(d.name)}</a></div>
        <div class="sub">${esc(d.substance)} • ${esc(d.form)}</div>
        <div class="tags">${(d.tags||[]).map(t=>`<button class="tag" data-tag="${t}">${t}</button>`).join('')}</div>
      `;
      // tag click inside card
      card.querySelectorAll('.tag').forEach(btn=>{
        btn.addEventListener('click', (e)=>{
          e.stopPropagation();
          const tag = btn.getAttribute('data-tag');
          // try find corresponding filter button and toggle it
          const filterBtn = Array.from(document.querySelectorAll('#filters .tag')).find(b => b.textContent === tag);
          if(filterBtn){ filterBtn.click(); } else { location.href = 'index.html?tags=' + encodeURIComponent(tag); }
        });
      });
      root.appendChild(card);
    });
  }

  function applyUrlParams(){
    const params = new URLSearchParams(window.location.search);
    const t = params.get('tags') || params.get('tag');
    if(t){
      // try activate matching filter button
      const btn = Array.from(document.querySelectorAll('#filters .tag')).find(b => b.textContent.toLowerCase() === t.toLowerCase());
      if(btn){ btn.click(); }
      else { if($('query')){ $('query').value = t; doSearch(t); } }
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    buildFilters();
    renderQuickCollections();

    // color filter tags by category
    document.querySelectorAll('#filters .tag').forEach(b=>{
      const cat = b.dataset.cat || '';
      if(cat.includes('Симптомы')) b.classList.add('sym');
      else if(cat.includes('Заболевания')) b.classList.add('dz');
      else if(cat.includes('Формы')) b.classList.add('form');
      else if(cat.includes('Тип')) b.classList.add('type');
      else if(cat.includes('Фармакогруппы')) b.classList.add('ph');
      else b.classList.add('srv');
    });

    if($('searchBtn')) $('searchBtn').addEventListener('click', ()=> doSearch());
    if($('query')) $('query').addEventListener('input', showSuggestions);
    if($('query')) $('query').addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ doSearch(); }});
    if($('resetFilters')) $('resetFilters').addEventListener('click', resetFilters);

    applyUrlParams();

    // initial: show popular (first 8)
    renderResults(DATA.slice(0,8));
  });

})();
