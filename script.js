(function(){
  const $ = id => document.getElementById(id);
  function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function buildFilters(){
    const root = document.getElementById('filters'); root.innerHTML='';
    for(const cat in TAGS){
      const box = document.createElement('div');
      box.className='filter-cat';
      const h = document.createElement('h4'); h.textContent = cat; box.appendChild(h);
      const wrap = document.createElement('div'); wrap.className='tags';
      TAGS[cat].forEach(t=>{
        const btn = document.createElement('button');
        btn.className = 'tag';
        btn.textContent = t;
        btn.dataset.cat = cat;
        btn.onclick = ()=> toggleFilterTag(t, btn);
        wrap.appendChild(btn);
      });
      box.appendChild(wrap); root.appendChild(box);
    }
  }

  let activeTagSet = new Set();
  function toggleFilterTag(tag, btn){
    if(activeTagSet.has(tag)){ activeTagSet.delete(tag); btn.classList.remove('active'); btn.style.opacity='1'; }
    else{ activeTagSet.add(tag); btn.classList.add('active'); btn.style.opacity='0.7'; }
  }
  function resetFilters(){
    activeTagSet.clear();
    document.querySelectorAll('#filters .tag').forEach(b=>{ b.classList.remove('active'); b.style.opacity='1'; });
    $('rxOnly').checked = false; $('query').value = ''; renderResults([]);
  }
  function getSelectedTags(){ return Array.from(activeTagSet); }
  function matchesAllSelectedTags(item, selectedTags){
    if(selectedTags.length===0) return true;
    return selectedTags.every(t => item.tags.includes(t));
  }

  function doSearch(qRaw){
    const q0 = qRaw!==undefined ? qRaw : ($('query').value || '');
    const q = q0.trim().toLowerCase();
    const rxOnly = $('rxOnly').checked;
    const selectedTags = getSelectedTags();
    if(q.startsWith('#')){
      const tag = q.split(/[ ,;]/)[0];
      const el = Array.from(document.querySelectorAll('#filters .tag')).find(b=>b.textContent.toLowerCase()===tag);
      if(el){ el.click(); }
    }
    let list = DATA.filter(d=>{
      const inName = d.name.toLowerCase().includes(q);
      const inSub = d.substance.toLowerCase().includes(q);
      const inSym = d.symptoms.join(' ').toLowerCase().includes(q);
      const inDis = d.disease.join(' ').toLowerCase().includes(q);
      const inForm = d.form.toLowerCase().includes(q);
      const inTags = d.tags.join(' ').toLowerCase().includes(q.replace('#',''));
      const match = q === '' ? true : (inName||inSub||inSym||inDis||inForm||inTags);
      return match && (!rxOnly || d.prescription===true) && matchesAllSelectedTags(d, selectedTags);
    });
    list.sort((a,b)=>{
      const score = (it)=> ((it.name.toLowerCase().includes(q)?100:0) + (it.tags.join(' ').toLowerCase().includes(q)?50:0) + (it.substance.toLowerCase().includes(q)?30:0) + (it.symptoms.join(' ').toLowerCase().includes(q)?10:0));
      return score(b)-score(a);
    });
    renderResults(list, q);
  }

  function renderResults(list, q){
    const root = $('results'); root.innerHTML='';
    if(!list || list.length===0){ root.innerHTML = '<p>Нет результатов.</p>'; return; }
    list.forEach(d=>{
      const div = document.createElement('div'); div.className = 'result-card';
      div.innerHTML = `
        <img src="${d.img}" alt="${escapeHtml(d.name)}">
        <div class="title"><a href="drug.html?id=${d.id}">${escapeHtml(d.name)}</a> ${d.prescription?'<span class="badge rx">Rx</span>':'<span class="badge otc">OTC</span>'}</div>
        <div class="sub">${escapeHtml(d.substance)} • ${escapeHtml(d.form)}</div>
        <div class="tags">${d.tags.map(t=>`<button class="tag" data-tag="${t}">${t}</button>`).join('')}</div>
      `;
      div.querySelectorAll('.tag').forEach(btn=> btn.addEventListener('click', (e)=>{
        const tag = e.currentTarget.getAttribute('data-tag');
        location.href = 'index.html?tags=' + encodeURIComponent(tag);
      }));
      root.appendChild(div);
    });
  }

  function showSuggestions(){
    const q = ($('query').value||'').trim().toLowerCase();
    const box = $('suggestions'); box.innerHTML='';
    if(!q) { box.style.display='none'; return; }
    const matches = DATA.filter(d=> d.name.toLowerCase().includes(q) || d.substance.toLowerCase().includes(q) || d.tags.join(' ').toLowerCase().includes(q));
    matches.slice(0,6).forEach(d=>{
      const item = document.createElement('div'); item.className='item';
      item.innerHTML = `<strong>${d.name}</strong><div class="sub">${d.form} • ${d.substance}</div>`;
      item.onclick = ()=> { $('query').value = d.name; box.style.display='none'; doSearch(d.name); };
      box.appendChild(item);
    });
    box.style.display = matches.length ? 'block':'none';
  }

  function applyUrlParams(){
    const params = new URLSearchParams(window.location.search);
    const tagsParam = params.get('tags') || params.get('tag') || params.get('tags[]');
    if(tagsParam){
      const tags = tagsParam.split(',').map(s=>decodeURIComponent(s).trim()).filter(Boolean);
      document.querySelectorAll('#filters .tag').forEach(b=>{
        if(tags.includes(b.textContent)) { b.click(); b.style.opacity='0.7'; }
      });
      doSearch();
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    buildFilters();
    document.querySelectorAll('#filters .tag').forEach(b=>{
      const cat = b.dataset.cat || '';
      if(cat.includes('Симптомы')) b.classList.add('sym');
      else if(cat.includes('Заболевания')) b.classList.add('dz');
      else if(cat.includes('Формы')) b.classList.add('form');
      else if(cat.includes('Тип')) b.classList.add('type');
      else if(cat.includes('Фармакогруппы')) b.classList.add('ph');
      else b.classList.add('srv');
    });
    $('searchBtn').addEventListener('click', ()=> doSearch());
    $('applyFilters').addEventListener('click', ()=> doSearch());
    $('resetFilters').addEventListener('click', resetFilters);
    $('query').addEventListener('input', showSuggestions);
    $('rxOnly').addEventListener('change', ()=> doSearch());
    document.addEventListener('click', (e)=>{ if(!e.target.closest('.suggestions') && !e.target.closest('#query')) $('suggestions').style.display='none'; });
    applyUrlParams();
  });
})();
