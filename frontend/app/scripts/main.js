//checking of green boxes
$(' textarea, input:not(.line-harga, #kwit-number-input)').focus(function() {
  'use strict';
  $(this).
    closest('.normal-box:not(.little-box), .block-fat').
    find('.row>.topper>i, .small-box').
    addClass('lightgreen').
    removeClass('white');
})
  .blur(function() {
    'use strict';
    $(this).
      closest('.normal-box:not(.little-box), .block-fat').
      find('.row>.topper>i, .small-box').
      addClass('white').
      removeClass('lightgreen');
  });

//Price fields math behaviour
$('.line-harga').
  change(function() {
  'use strict';
  var jumlah,
      hargaPerUnit,
      lineTotal= 0,
      subTotal = [],
      hargaPerUnitInput;

  for (var i=1; i<=3 ;i++) {
    hargaPerUnitInput = $('#harga-'+i+'-1-input').val();
    hargaPerUnit = parseInt(hargaPerUnitInput.replace(/[\D]/g,''),10);
    jumlah = parseInt($('#harga-'+i+'-2-input').val(),10) || 1;

    if (Number.isInteger(hargaPerUnit)) {

      lineTotal = hargaPerUnit*jumlah;
      subTotal.push(lineTotal);

      if ($(this).hasClass('harga-1')) {
        $('#harga-' + i + '-2-input').val(+$('#harga-' + i + '-2-input').val() || 1);
      }

      $('#harga-'+i+'-3-input').val(lineTotal.toLocaleString('in')).
        removeClass('left').
        addClass('center');

      $('#harga-'+i+'-1-input').val(hargaPerUnit.toLocaleString('in'));
    }
    else {
      $('#harga-'+i+'-3-input').val(null)
        .addClass('left')
        .removeClass('center');
    }
  }

  if (subTotal.length > 0) {
    $('#total-harga-input').
      val(subTotal.reduce(function(a,b) {
        return a+b;
      }).toLocaleString('in')).
      change();
  }
}).
  blur(function() {
  'use strict';
  //price multiplier
  var val = 0;
  if ($(this).hasClass('price')) {
    val = Number.parseInt($(this).val().replace(/[\D]/g,''));
    if (val < 1000) {
      $(this).val((val*1000).toLocaleString('in'));
    }
    $('.line-harga').change();
}
}).
  keyup(function() {
  'use strict';
  $(this).change();
});

//submit hover animation
$('.enabled').hover(function(){
  'use strict';
  $(this).animate({
    opacity: 1
  }, 400);
},function(){
  'use strict';
  $(this).animate({
    opacity: 0.9
  }, 400);
});

//Enable submit only on critical data filled in
$('.required').
  change(function(){
  'use strict';
  if (!$(this).val()) {
    $(this).addClass('red');
  } else {
    $(this).removeClass('red');
  }
  if ($(this).attr('id') === 'stempel-input' && !kpn.agentMatch($(this).val())) {
    $(this).addClass('red');
  }

  if ($('#nomor-seri-1-input').val() && kpn.agentMatch($('#stempel-input').val()) && $('#total-harga-input').val()) {
    $('.submit').
      addClass('enabled').
      removeClass('disabled');
  } else {
    $('.submit').
      removeClass('enabled').
      addClass('disabled');
  }
}).
  keyup(function() {
  'use strict';
  $(this).change();
});


//formatting of total-harga field.
$('#total-harga-input, #cicil input').
  change(function() {
  'use strict';
  var amount = Number.parseInt($(this).val().replace(/[\D]/g,''));
  if (!$(this).val()) {
    $(this).
      addClass('left').
      removeClass('center');
  }
  else {
    $(this).
      addClass('center').removeClass('left');

    if (Number.isInteger(amount)) {
      $(this).val(amount.toLocaleString('in'));
    }
  }
}).
  blur(function() {
  'use strict';
   var val = Number.parseInt($(this).val().replace(/[\D]/g, ''));
    if (val < 1000) {
      $(this).val((val * 1000).toLocaleString('in'));
      $(this).change();
  }
});

//missing fields alert on submit hover
$('.submit').mouseenter(function( ) {
  'use strict';
  if ($(this).hasClass('disabled')) {
    $(this).hide();
    $('.missing').show();
  }
});

$('.missing').mouseleave(function() {
  'use strict';
  $(this).hide(0,function() {
    $('.submit').show();
  });
});

//gender button behaviour
$('button.gender').click(function(){
  'use strict';
  var jkl = $('#jenis-kelami-l'),
      jkp = $('#jenis-kelami-p');

  if (this.id === 'jenis-kelami-l'){
    jkl.addClass('genderback');
    jkp.removeClass('genderback');
  }
  else {
    jkp.addClass('genderback');
    jkl.removeClass('genderback');
  }
});
//Gender input greenbox behaviour
$('.gender').on('click',function(){
  'use strict';
  $('div #jenis-kelami .small-box').addClass('lightgreen');
  $('.gender').on('blur',function(){
    $('div #jenis-kelami .small-box').removeClass('lightgreen');
  });
});

//populate dropdown menu
$('.produk-input').one('focus',function(){
	'use strict';
  var el = $(this),
      options =
        [['',' '],
        ['NAZK','NAZK'],
        ['NAZ1','NAZ1'],
        ['NAZXL','NAZXL'],
        ['UBS','UBS'],
        ['UBJ','UBJ'],
        ['BBOX','BBOX'],
        ['S20','S20'],
        ['S300','S300'],
        ['BBULB','BBULB'],
        ['PERM','PERM'],
        ['KERAN','KERAN'],
        ['FILTER','FILTER'],
        ['UNSPECIFIED','TAK TERTULIS']
        ];

  options.map(function(option) {
    el.append($('<option value="'+option[0]+'">'+option[1]+'</option>'));
  });
});

//sub-agent validation
$('#nama-penjual-2').keyup(function(){
  'use strict';
  var val = $(this).val();

  if ( val && !kpn.agentMatch(val)) {
    $(this).addClass('red');
  }
  else {
    $(this).removeClass('red');
  }
});

//date validation
$('#tanggal-input').keyup(function() {
  'use strict';
 var reg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
     val = $(this).val();

  if ( val && !reg.test(val)) {
    $(this).addClass('red');
  }
  else {
    $(this).removeClass('red');
  }
});

//submit button
$('form').
  submit(function(event){
  'use strict';
  event.preventDefault();
  var obj = {
    kwitNumber: $('#kwit-number-input').val(),
    name: $('#nama-input').val(),
    gender: $('.gender .genderback').val(),
    telNumber: $('#nomor-telepon-input').val(),
    addressLine1: $('#alamat-1-input').val(),
    addressLine2: $('#alamat-2-input').val(),
    addressLine3: $('#alamat-3-input').val(),
    addressLine4: $('#alamat-4-input').val(),
    addressLine5: $('#alamat-5-input').val(),
    addressLine6: $('#alamat-6-input').val(),
    products1: $('#produk-1-input').val(),
    products2: $('#produk-2-input').val(),
    products3: $('#produk-3-input').val(),
    serialNumber1: $('#nomor-seri-1-input').val(),
    serialNumber2: $('#nomor-seri-2-input').val(),
    serialNumber3: $('#nomor-seri-3-input').val(),
    price1: $('#harga-1-1-input').val(),
    price2: $('#harga-2-1-input').val(),
    price3: $('#harga-3-1-input').val(),
    price1Amount: $('#harga-1-2-input').val(),
    price2Amount: $('#harga-2-2-input').val(),
    price3Amount: $('#harga-3-2-input').val(),
    totalPrice1: $('#harga-1-3-input').val(),
    totalPrice2: $('#harga-2-3-input').val(),
    totalPrice3: $('#harga-3-3-input').val(),
    saleTotal: $('#total-harga-input').val(),
    installmentPrice1: $('#cicil-1').val(),
    installmentPrice2: $('#cicil-2').val(),
    installmentPrice3: $('#cicil-3').val(),
    installmentPrice4: $('#cicil-4').val(),
    date: $('#tanggal-input').val(),
    kioskID: $('#stempel-input').val(),
    kioskAgentName: $('#nama-penjual-1').val(),
    kioskSubID: $('#nama-penjual-2').val()
  };
  kpn.store(obj);
}).
  on('reset',function() { //reset submit button
  'use strict';
  $('.required').val('').change();
  $('.terimakasih').show().fadeOut(3000);
});

//init
kpn.updateTotal();
