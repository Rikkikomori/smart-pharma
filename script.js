// DEMO: Простые синонимы для поиска (расширяем по мере надобности)
const searchSynonyms = {
    "температура": ["жар", "лихорадка", "жаропонижающее"],
    "простуда": ["орви", "грипп", "заложенность", "насморк"],
    "головная боль": ["мигрень", "болит голова", "анальгетик"],
    "боль": ["анальгетик", "обезболивающее"],
    // ...добавляй синонимы!
};

// --- Рендер тегов для фильтрации
function renderTagFilters() {
    const tagFilters = document.getElementById('tagFilters');
    tagFilters.innerHTML = '';
    Object.values(tags).forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        btn.textContent = tag.name;
        btn.dataset.tag = tag.code;
        btn.onclick = () => {
            btn.classList.toggle('active');
            updateDrugList();
        };
        tagFilters.appendChild(btn);
    });
}

// --- Основная логика поиска и фильтрации
function updateDrugList() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const activeTags = Array.from(document.querySelectorAll('.tag-btn.active')).map(btn => btn.dataset.tag);

    // Получаем дополнительные поисковые слова по синонимам
    let searchWords = [searchValue];
    Object.entries(searchSynonyms).forEach(([key, synonyms]) => {
        if (searchValue.includes(key)) searchWords = searchWords.concat(synonyms);
    });

    let foundDrugs = drugs.filter(drug => {
        // Фильтр по тегам (если выбран хотя бы 1 тег, препарат должен содержать все выбранные)
        if (activeTags.length > 0 && !activeTags.every(tag => drug.tags.includes(tag))) return false;

        // Если пустой поиск — показываем все (с учётом тегов)
        if (!searchValue) return true;

        // Поиск по названию, действующему веществу, симптомам, описанию и тегам (с учётом синонимов)
        const haystack = [
            drug.name, drug.substance, drug.form, drug.usage, drug.description, 
            ...drug.tags.map(tag => (tags[tag] ? tags[tag].name : tag))
        ].join(' ').toLowerCase();

        return searchWords.some(word => word && haystack.includes(word));
    });

    renderDrugs(foundDrugs, searchValue);

    document.getElementById('nothingFound').style.display = foundDrugs.length === 0 ? 'block' : 'none';
}

// --- Подсветка совпадений в названии и тегах
function highlight(text, search) {
    if (!search) return text;
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\\]\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// --- Рендер препаратов
function renderDrugs(list, search) {
    const drugsList = document.getElementById('drugsList');
    drugsList.innerHTML = '';
    list.forEach(drug => {
        const card = document.createElement('div');
        card.className = 'drug-card';

        // Картинка
        let img = '';
        if (drug.img) {
            img = `<img src="${drug.img}" class="drug-img" alt="">`;
        }

        // Название с подсветкой
        let title = highlight(drug.name, search);

        // Теги
        const tagHtml = drug.tags.map(tag => {
            const tagName = tags[tag] ? tags[tag].name : tag;
            return `<span class="drug-tag" tabindex="0">${highlight(tagName, search)}</span>`;
        }).join('');

        card.innerHTML = `
            <div style="display:flex;align-items:center;">
                ${img}
                <div>
                    <div class="drug-title">${title}</div>
                    <div class="drug-tags">${tagHtml}</div>
                </div>
            </div>
            <a class="drug-link" href="drug.html?id=${drug.id}">Подробнее</a>
        `;
        drugsList.appendChild(card);
    });
}

// --- События
document.getElementById('searchInput').addEventListener('input', updateDrugList);

// --- Первичный запуск
document.addEventListener('DOMContentLoaded', () => {
    renderTagFilters();
    updateDrugList();
});
