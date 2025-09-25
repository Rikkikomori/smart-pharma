/* TAGS, DATA, COLLECTIONS — демо-данные для v3.3 */
const TAGS = {
  "Симптомы": ["#жар","#температура","#боль","#больЖКТ","#больГорла","#насморк","#кашель","#зуд","#спазмы","#одышка","#головнаяБоль"],
  "Заболевания": ["#ОРВИ","#простуда","#грипп","#ангина","#фарингит","#гастрит","#язва"],
  "Формы": ["#таблетки","#капсулы","#порошок","#сироп","#свечи","#капли","#спрей","#ампулы","#мазь","#крем"],
  "Тип лечения": ["#СИМПТОМ","#патоген","#этиотроп","#витамины","#БАД"],
  "Фармакогруппы": ["#анальгетики","#НПВС","#антибиотики","#антигистаминные","#муколитики","#спазмолитики"],
  "Служебные": ["#OTC","#Rx","#дети","#взрослые"]
};

const DATA = [
  {
    "id":20,
    "name":"Терафлю (GlaxoSmithKline)",
    "substance":"Парацетамол + Фенирамин + Фенилэфрин",
    "company":"GlaxoSmithKline",
    "form":"порошок для приготовления раствора",
    "short":"Снимает симптомы простуды и гриппа: жар, заложенность носа, головную боль.",
    "symptoms":["жар","головнаяБоль","насморк"],
    "disease":["ОРВИ","простуда","грипп"],
    "analogs":{"same_substance":[],"group_analogs":[21,22],"other_forms":[]},
    "prescription":false,
    "tags":["#ОРВИ","#температура","#порошок","#СИМПТОМ","#OTC"],
    "img":"https://via.placeholder.com/800x420.png?text=Theraflu",
    "recommend_pharmacy":["Максиколд Рино"],
    "recommend_site":["Антигриппин"],
    "pharmacyInfo":{
      "store":"Аптека №12, Москва, ул. Ленина, 10",
      "stock":42,
      "price":"380 ₽",
      "lastDelivery":"2025-09-15",
      "location":"Отдел 3, полка B"
    }
  },
  {
    "id":21,
    "name":"Coldrex",
    "substance":"Парацетамол + фенилэфрин",
    "company":"Reckitt",
    "form":"порошок",
    "short":"Симптоматическое средство при простуде; похож по действию на Терафлю.",
    "symptoms":["жар","насморк"],
    "disease":["ОРВИ"],
    "analogs":{"same_substance":[],"group_analogs":[20],"other_forms":[]},
    "prescription":false,
    "tags":["#порошок","#ОРВИ","#OTC"],
    "img":"https://via.placeholder.com/800x420.png?text=Coldrex",
    "recommend_pharmacy":["Coldrex Рекоменд."],
    "recommend_site":["Терафлю"],
    "pharmacyInfo":{
      "store":"Аптека №5, Москва, проспект Мира, 3",
      "stock":18,
      "price":"320 ₽",
      "lastDelivery":"2025-09-18",
      "location":"Отдел 2, полка A"
    }
  },
  {
    "id":22,
    "name":"Ринзасип",
    "substance":"Парацетамол + фенилэфрин",
    "company":"LocalPharm",
    "form":"порошок",
    "short":"Лёгкое средство при простуде — снижает температуру и облегчает носовое дыхание.",
    "symptoms":["температура","насморк"],
    "disease":["простуда","ОРВИ"],
    "analogs":{"same_substance":[],"group_analogs":[20,21],"other_forms":[]},
    "prescription":false,
    "tags":["#порошок","#температура","#ОРВИ","#OTC"],
    "img":"https://via.placeholder.com/800x420.png?text=Rinzasip",
    "recommend_pharmacy":["Ринзасип Рекоменд."],
    "recommend_site":["Максиколд Рино"],
    "pharmacyInfo":{
      "store":"Аптека №8, СПб, Невский пр., 20",
      "stock":5,
      "price":"290 ₽",
      "lastDelivery":"2025-09-20",
      "location":"Отдел 1, полка C"
    }
  },
  {
    "id":2,
    "name":"Парацетамол (AcmeFarm)",
    "substance":"Парацетамол",
    "company":"AcmeFarm",
    "form":"таблетки",
    "short":"Анальгетик и жаропонижающее, часто применяется при ОРВИ.",
    "symptoms":["жар","головнаяБоль"],
    "disease":["ОРВИ"],
    "analogs":{"same_substance":[11,12],"group_analogs":[3],"other_forms":[12]},
    "prescription":false,
    "tags":["#таблетки","#жар","#СИМПТОМ","#OTC"],
    "img":"https://via.placeholder.com/800x420.png?text=Paracetamol",
    "recommend_pharmacy":["Панадол"],
    "recommend_site":["Ибупрофен"],
    "pharmacyInfo":{
      "store":"Аптека №3, СПб, Невский пр., 50",
      "stock":120,
      "price":"50 ₽",
      "lastDelivery":"2025-09-10",
      "location":"Отдел 4, полка D"
    }
  },
  {
    "id":3,
    "name":"Ибупрофен (HealthCorp)",
    "substance":"Ибупрофен",
    "company":"HealthCorp",
    "form":"таблетки",
    "short":"НПВС — уменьшает боль и воспаление; альтернатива парацетамолу в некоторых случаях.",
    "symptoms":["боль","воспаление"],
    "disease":["артрит","ОРВИ"],
    "analogs":{"same_substance":[13],"group_analogs":[2],"other_forms":[]},
    "prescription":false,
    "tags":["#таблетки","#НПВС","#боль","#OTC"],
    "img":"https://via.placeholder.com/800x420.png?text=Ibuprofen",
    "recommend_pharmacy":["Нурофен"],
    "recommend_site":["Парацетамол"],
    "pharmacyInfo":{
      "store":"Аптека №7, Казань, ул. Баумана, 12",
      "stock":30,
      "price":"120 ₽",
      "lastDelivery":"2025-09-12",
      "location":"Отдел 2, полка B"
    }
  },
  {
    "id":4,
    "name":"Но-шпа (Dr.Reddys)",
    "substance":"Дротаверин",
    "company":"Dr.Reddys",
    "form":"таблетки",
    "short":"Спазмолитик, помогает при спазмах ЖКТ и болевом синдроме.",
    "symptoms":["спазмы","больЖКТ"],
    "disease":["колики","дисменорея"],
    "analogs":{"same_substance":[17],"group_analogs":[],"other_forms":[17]},
    "prescription":false,
    "tags":["#таблетки","#спазмолитики","#спазмы","#OTC"],
    "img":"https://via.placeholder.com/800x420.png?text=No-shpa",
    "recommend_pharmacy":["Дротаверин"],
    "recommend_site":["Папаверин"],
    "pharmacyInfo":{
      "store":"Аптека №2, Москва, ул. Тверская, 2",
      "stock":9,
      "price":"200 ₽",
      "lastDelivery":"2025-09-19",
      "location":"Отдел 3, полка A"
    }
  },
  {
    "id":11,
    "name":"Панадол (GlaxoSmithKline)",
    "substance":"Парацетамол",
    "company":"GlaxoSmithKline",
    "form":"таблетки",
    "short":"Торговая марка парацетамола; анальгетик и жаропонижающее.",
    "symptoms":["жар","боль"],
    "disease":["ОРВИ"],
    "analogs":{"same_substance":[2],"group_analogs":[3],"other_forms":[]},
    "prescription":false,
    "tags":["#таблетки","#жар","#OTC"],
    "img":"https://via.placeholder.com/800x420.png?text=Panadol",
    "recommend_pharmacy":["Панадол"],
    "recommend_site":["Ибупрофен"],
    "pharmacyInfo":{
      "store":"Аптека №1, Москва, ул. Покровка, 18",
      "stock":64,
      "price":"140 ₽",
      "lastDelivery":"2025-09-05",
      "location":"Отдел 4, полка C"
    }
  },
  {
    "id":12,
    "name":"Парацетамол (суспензия детская)",
    "substance":"Парацетамол",
    "company":"KidPharm",
    "form":"суспензия",
    "short":"Детская форма парацетамола — для снижения температуры у детей.",
    "symptoms":["жар"],
    "disease":["ОРВИ"],
    "analogs":{"same_substance":[2,11],"group_analogs":[],"other_forms":[2]},
    "prescription":false,
    "tags":["#дети","#сироп","#жар","#OTC"],
    "img":"https://via.placeholder.com/800x420.png?text=Paracetamol+Syrup",
    "recommend_pharmacy":["Детский Парацетамол"],
    "recommend_site":["Педиатрическая рекомендация"],
    "pharmacyInfo":{
      "store":"Аптека №9, СПб, ул. Рубинштейна, 10",
      "stock":15,
      "price":"160 ₽",
      "lastDelivery":"2025-09-14",
      "location":"Отдел Детский, полка B"
    }
  },
  {
    "id":13,
    "name":"Нурофен (Reckitt)",
    "substance":"Ибупрофен",
    "company":"Reckitt",
    "form":"таблетки",
    "short":"Ибупрофен в торговой упаковке; анальгетик, противовоспалительный.",
    "symptoms":["боль","жар"],
    "disease":["ОРВИ"],
    "analogs":{"same_substance":[3],"group_analogs":[2],"other_forms":[]},
    "prescription":false,
    "tags":["#НПВС","#таблетки","#боль","#OTC"],
    "img":"https://via.placeholder.com/800x420.png?text=Nurofen",
    "recommend_pharmacy":["Нурофен"],
    "recommend_site":["Парацетамол"],
    "pharmacyInfo":{
      "store":"Аптека №4, Екатеринбург, ул. Ленина, 7",
      "stock":0,
      "price":"180 ₽",
      "lastDelivery":"2025-08-30",
      "location":"Склад (нет на витрине)"
    }
  },
  {
    "id":17,
    "name":"Дротаверин (ампулы)",
    "substance":"Дротаверин",
    "company":"LocalPharm",
    "form":"ампулы",
    "short":"Инъекционная форма дротаверина для сильных спазмов.",
    "symptoms":["спазмы"],
    "disease":["колики"],
    "analogs":{"same_substance":[4],"group_analogs":[],"other_forms":[4]},
    "prescription":false,
    "tags":["#ампулы","#спазмы","#OTC"],
    "img":"https://via.placeholder.com/800x420.png?text=Drotaverine+Amp",
    "recommend_pharmacy":["Дротаверин Ампулы"],
    "recommend_site":["No-shpa"],
    "pharmacyInfo":{
      "store":"Аптека №6, Новосиб, ул. Ленина, 55",
      "stock":7,
      "price":"320 ₽",
      "lastDelivery":"2025-09-16",
      "location":"Отдел медикаменты, полка E"
    }
  }
];

const COLLECTIONS = [
  {
    "id":"c1",
    "title":"Набор при простуде",
    "description":"Парацетамол + средство от насморка + средство от кашля. Приоритет — рекламные товары.",
    "items":[20,21,24],
    "promo":true
  },
  {
    "id":"c2",
    "title":"Аптечка в дорогу",
    "description":"Облегчение боли, жаропонижающие, антиспазмики.",
    "items":[2,3,4],
    "promo":false
  }
];
