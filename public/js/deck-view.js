var all_cards = {};
var sort_indices;

var test_base = "CnNvY2lldHk6ICJNU0xDMDQiCmNhcmRzOgogIExDMTM6IDMKICBYUTM0OiAzCiAgSkMwNzA6IDMKICBKQzA3OTogMgogIFhRMzI6IDIKICBKQzA3MTogMQogIFdNMDQ4OiAzCiAgWFEyODogMwogIFhRMjk6IDMKICBYUTMwOiAzCiAgTEMwODogMwogIEpDMDc2OiAzCiAgTEMwNjogMwogIFhRMzM6IDMKICBMQzExOiAzCiAgWFEzMTogMwogIEpDMDgwOiAzCiAgSkMwODE6IDM=";

// Hide the card information block
$(document).mouseup(function (e) {
  if (e.button != 0) return;
  var cpib = $('#cp-info');
  if (!cpib.is(e.target) && cpib.has(e.target).length === 0) {
    $('#card-preview').fadeOut(300);
  }

  var ed = $('#export-dialog');
  if (ed.css('display') != "none" && !ed.is(e.target) && ed.has(e.target).length === 0) {
    $('#dialog-bg').fadeOut(300);
  }
});

// Show the card information block
function showCardInfo(id) {
  var card = all_cards[id];

  // set card image
  $('#cp-card').css('background-image', `url("/cards/${id}.jpg")`)

  // set card info
  let info = $('#cp-info');
  info.empty();

  // info: name; set|id 
  info.append($(`<div class="name">${card.name}</div>`))
    .append($(`<div class="setname"> ${card.set} | ${card.id} </div>`));

  var item;

  // info: [color] type
  item = $('<div class="type"></div>')
  if (card.color) item.text(` ${card.color}${card.type} `);
  else item.text(` ${card.type} `);
  info.append(item);

  // info: [cost][lyl~]
  item = $('<div class="attr"></div>');
  if (card.cost) item.html(`费用：${card.cost} `);
  if (card.lyl) card.lyl.forEach(lyl => item.append(`${lyl} `));
  info.append(item);

  // info: [dfc] [abl] [magic]
  item = $('<div class="attr"></div>');
  if (card.dfc)
    item.html(`防御：${card.dfc}&nbsp;&nbsp;`);
  if (card.abl && card.abl != "")
    item.append(`能力：${card.abl}&nbsp;&nbsp;`);
  if (card.magic && card.magic != "")
    item.append(`魔法：${card.magic}`);
  info.append(item);

  // info: [req] [sc]
  item = $('<div class="attr"></div>');
  if (card.req) item.html(`势力值：${card.req}&nbsp;&nbsp;`);
  if (card.sc) item.append(`分数：${card.sc}`);
  info.append(item);

  // info: [hands]
  item = $('<div class="attr"></div>');
  if (card.hands) item.html(`起始手牌数量：${card.hands}`);
  info.append(item);

  // info: text
  var text = card.text;
  if ($('#opt-kws').prop('checked') && card.kws.length > 0) {
    text += "\n\n";
    for (let kw of card.kws) {
      text += '> ' + keywords[kw] + "\n";
    }
  }

  info.append($(`<textarea class="text" readonly>${text}</textarea>`));

  $('#card-preview').fadeIn(300); //.css('display', 'block');
}

function findCardByShortId(id) {
  for (var k in all_cards) {
    if (k.split(" ")[0] == id)
      return k;
  }
  return id;
}

class DeckBuilder {
  constructor() {
    this.society = "";
    this.cards = {};
    this.author = "佚名";
    this.title = "强大的卡组"
  }

  showSociety() {
    if (this.society == "") return;

    var card = all_cards[this.society];

    let color = $('<span class="bdc-color"> </span>').css
      ('background-image', `url('/public/image/colors/r${card.color}.png')`)
    let card_html = $(`<li class="bd-card" onclick="showCardInfo('${this.society}')"></li>`)
      .css('background-image', `url('/cards/${this.society}.jpg')`)
      .css('background-position', 'right 10%')
      .append(color)
      .append($(`<span class="number-attr bdc-hand"> ${card.hands} </span>`))
      .append($(`<span class="bdc-name"> ${card.name} </span>`));
    $('#bd-card-list-l').append(card_html);
  }

  addCard(id) {
    var card = all_cards[id];
    if (id in this.cards) {
      let n = this.cards[id];

      if (card.name.includes("无知路人"))
        this.cards[id] = n + 1;
      else if (card.text.includes("唯一") || n == 3)
        delete this.cards[id];
      else
        this.cards[id] = n + 1;
    } else
      this.cards[id] = 1;

    this.sortCards(sort_indices.toArray());
    this.showCards(id);
  }

  removeCard(id) {
    this.cards[id] -= 1;
    if (this.cards[id] == 0)
      delete this.cards[id];

    this.showCards(id);
  }

  sortCards(arr) {
    let ks = Object.keys(this.cards);
    ks.sort((k1, k2) => {
      let c1 = all_cards[k1];
      let c2 = all_cards[k2];

      let b2i = (b) => b ? -1 : 1;

      for (let i = 0; i < arr.length; ++i)
        if (c1[arr[i]] != c2[arr[i]])
          return b2i(c1[arr[i]] < c2[arr[i]]);

      return 0;
    })
    this.cards = ks.reduce((res, key) => (res[key] = this.cards[key], res), {})
  }

  getCount(cond = (_) => true) {
    let count = 0;
    for (let id in this.cards) {
      let card = all_cards[id];
      if (cond(card)) { count += this.cards[id]; }
    }
    return count;
  }

  showCards() {
    let l = $('#bd-card-list-l').empty();
    let r = $('#bd-card-list-r').empty();

    this.showSociety();

    let count = Object.keys(this.cards).length;
    let i = 0;
    for (var id in this.cards) {
      let card = all_cards[id];

      let color = $('<span class="bdc-color"> </span>').css
        ('background-image', `url('/public/image/colors/r${card.color}.png')`)
      let card_html = $(`<li class="bd-card" onclick="showCardInfo('${id}')"></li>`)
        .css('background-image', `url('/cards/${id}.jpg')`)
        .append(color)
        .append($(`<span class="number-attr bdc-cost"> ${card.cost} </span>`))
        .append($(`<span class="bdc-name"> ${card.name} </span>`))
        .append($(`<span class="bdc-card-count"> x${this.cards[id]} </span>`));

      if (i * 2 < count) l.append(card_html);
      else r.append(card_html);
      ++i;
    }

    $('#bdc-count').text(`卡组共 ${Object.values(this.cards).reduce((a, b) => {
      return parseInt(a) + parseInt(b);
    }, 0)
      } 张牌。`);
  }

  getDOUFormat() {
    var output = `# 复制这段代码到 https://dou.vbcpascal.cn/builder/ 查看卡组
title: ${this.title}
author: ${this.author}`;

    output += `
society: "${this.society}"
cards:`;

    for (var id in this.cards) {
      output += `
  ${id}: ${this.cards[id]}`;
    }

    return output;
  }

  getCODFormat() {
    var output = `<cockatrice_deck version="1">
  <deckname></deckname>
  <comments></comments>
  <zone name="side">
    <card number="1" price="0" name="DQJC107 沉没的废墟"/>
    <card number="1" price="0" name="DQJC108 佛罗伦萨"/>
    <card number="1" price="0" name="DQJC109 京都"/>
    <card number="1" price="0" name="DQJC110 伦敦"/>
    <card number="1" price="0" name="DQJC111 莫斯科"/>
    <card number="1" price="0" name="DQJC112 纽约"/>
    <card number="1" price="0" name="DQJC113 切尔诺贝利"/>
    <card number="1" price="0" name="DQJC114 上海"/>
    <card number="1" price="0" name="DQJC115 死者之城"/>
    <card number="1" price="0" name="DQJC116 香港"/>
    <card number="1" price="0" name="DQWM001 武陵源"/>
    <card number="1" price="0" name="DQWM002 埃里伯斯山"/>
    <card number="1" price="0" name="DQWM003 古城瓦莱塔"/>
    <card number="1" price="0" name="DQWM004 亚伯拉罕湖"/>
    <card number="1" price="0" name="DQWM005 洛杉矶"/>
    <card number="1" price="0" name="DQXQ01 拉斯维加斯"/>
    <card number="1" price="0" name="DQXQYZ02 裂口女"/>
    <card number="1" price="0" name="DQXQZY01 瘦长鬼影"/>
    <card number="3" price="0" name="ZHWM048 凛冬之风英迪拉"/>
    <card number="1" price="0" name="${this.society}"/>
    <card number="1" price="0" name="TK 先手标志"/>
  </zone>
  <zone name="main">`;

    for (var id in this.cards) {
      output += `
    <card number="${this.cards[id]}" price="0" name="${id}"/>`;
    }
    output += `
  </zone>
</cockatrice_deck>`;

    return output;
  }

  getBase64Format() {
    let f = (v) => (v.split(" ")[0]);
    var output = `
society: "${f(this.society)}"
cards:`;

    for (var id in this.cards) {
      output += `
  ${f(id)}: ${this.cards[id]}`;
    }
    return btoa(output);
  }

  read(str) {
    let vj = YAML.parse(atob(str));
    this.society = findCardByShortId(vj.society);
    this.cards = {}
    for (var k in vj.cards) {
      this.cards[findCardByShortId(k)] = vj.cards[k];
    }
    return this;
  }

  showCostChart() {
    var data = [];
    for (let i = 0; i <= 6; ++i)
      data.push(this.getCount((card) => card.cost == i));
    data.push(this.getCount((card) => card.cost >= 7));

    Highcharts.chart('cost-chart', {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        // marginBottom: 0,
        spacingBottom: 0,
      },
      title: { text: null },
      xAxis: {
        categories: ['0', '1', '2', '3', '4', '5', '6', '7+'],
        title: { text: null },
        lineColor: '#999',
      },
      yAxis: {
        min: 0,
        title: { text: null },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        headerFormat: null,
        pointFormat: '{point.y}'
      },
      series: [{
        data: data
      }],
      plotOptions: {
        column: {
          pointPadding: 0,
          shadow: false,
          color: 'rgb(195, 195, 201)',
        }
      },
      credits: { enabled: false },
    });
  }
}

deck = new DeckBuilder()

$(document).ready(() => {
  $.getJSON("/cards/cards.json", (json) => {
    all_cards = Object.assign({},
      json.cards,
      json.locations,
      json.societies,
      json.tokens);
    deck.read($('#base64-store').text());
    deck.showCards();
    deck.showCostChart();
  });
  $.getJSON("/public/docs/keywords.json", (json) => {
    keywords = json;
  });

  sort_indices = new Sortable(document.getElementById('card-sort-indecies'), {
    animation: 150,
    ghostClass: 'item-active',
    direction: 'horizontal',
    onUpdate: (_) => {
      deck.sortCards(sort_indices.toArray());
      deck.showCards();
      deck.showCostChart();
    }
  });
});

function exportDeck() {
  $('#export-dialog').show();
  $('#dialog-bg').fadeIn(300);

  let code = deck.getDOUFormat();
  $('#dou-codeblock').text(code);

  code = deck.getCODFormat();
  $('#cod-codeblock').text(code);

  code = deck.getBase64Format();
  $('#base64-codeblock').text(code);

  hljs.highlightAll();
}

function showTab(evt, method) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(method).style.display = "block";
  evt.currentTarget.className += " active";
}

function copyDeckCode(_, format) {
  var code;
  if (format == 'dou') {
    code = deck.getDOUFormat();
  } else if (format == "cod") {
    code = deck.getCODFormat();
  } else if (format == "base64") {
    code = deck.getBase64Format();
  }
  navigator.clipboard.writeText(code);
}
