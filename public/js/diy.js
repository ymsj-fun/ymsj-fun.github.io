$('#diy-color').change(() => {
  let v = $('#diy-color').val();

  for (let i of [0, 2, 4, 6]) {
    console.log(i);
    $(`#d${i}`).attr('src', `/public/image/diy/${i}-${v}.png`)
  }
});

$('#diy-cost').change(() => {
  let v = $('#diy-cost').val();
  if (v.length <= 1) {
    $('#dc').css('font-size', '30px').css('top', '6.4%');
  } else {
    $('#dc').css('font-size', '25px').css('top', '7.2%');
  }
  $('#dc').text(v);
})

$('#diy-title').change(() => {
  let v = $('#diy-title').val();
  $('#dts').empty();
  $('#dt').empty();
  let arr = v.split('*');
  let isNormal = true;

  for (let txt of arr) {
    if (isNormal) {
      $('#dts').append($(`<span class="normal">${txt}</span>`));
      $('#dt').append($(`<span class="normal">${txt}</span>`));
    } else {
      $('#dts').append($(`<span class="legend">${txt}</span>`));
      $('#dt').append($(`<span class="legend">${txt}</span>`));
    }
    isNormal = !isNormal;
  }
})

$('#diy-magic').change(() => {
  let v = $('#diy-magic').val();

  $('#d3').attr('src', `/public/image/diy/3-${v}.png`);

  if (v == "无魔法") {
    $('#d8').hide();
  } else {
    $('#d8').attr('src', `/public/image/diy/8-${v}.png`);
    $('#d8').show();
  }
});

$('#diy-def').change(() => {
  let v = $('#diy-def').val();
  if (v == "") {
    $('#d7').hide();
    $('#dd').hide();
  } else {
    $('#d7').show();
    $('#dd').show().text(v);
  }
})

$('#diy-type').change(() => {
  let v = $('#diy-type').val();
  v = v.replaceAll('·', ' · ');
  v = v.replaceAll('/', ' / ');
  $('#dty').text(v);
})

$('#diy-abl').change(() => {
  let da = $('#da').empty();

  let abls = $('#diy-abl').val().split('').filter(e => 'IiBbPp'.includes(e));
  let n = abls.length;

  let [ph_pre, ph_post] = (() => {
    if (n <= 4) return [[], []];
    if (n <= 6) return [[0], [2]];
    if (n <= 8) return [[], []];
    if (n <= 9) return [[0, 3], [2, 5]];
    return [[], []];
  })();

  for (let i = 0; i < n; ++i) {
    if (ph_pre.includes(i))
      da.append($('<div class="placeholder"> </div>'));

    let chr = { "i": "IW", "I": "I", "b": "BW", "B": "B", "p": "PW", "P": "P" }[abls[i]];
    da.append($(`<img src="/public/image/icons/${chr}.png" />`));

    if (ph_post.includes(i))
      da.append($('<div class="placeholder"> </div>'));
  }

  let dabl = $('#card-abl-block').show();
  if (n == 0) {
    dabl.hide();
  } else if (n <= 4) {
    dabl.css('background-size', '50px auto');
    da.css('left', '13.5%');
  } else if (n <= 8) {
    dabl.css('background-size', '60px auto');
    da.css('left', '11.5%');
  } else {
    dabl.css('background-size', '85px auto');
    da.css('left', '11.5%');
  }

})
