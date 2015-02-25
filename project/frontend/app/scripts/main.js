/*List of fields:
KwitNumber:
  #kwitNumber-input: number
Nama Lengcap:
  #nama-input : textarea
Jenis Kelami:
  #jenisKelami-P text input
  #jenisKelami-L text input
Nomor Telepon
  #nomor-telepon-input textarea
Alamat
  #alamat-1-input text
  #alamat-2-input text
Informasi Produk
  #produk-1-input text
  #produk-2-input text
  #produk-3-input text
Nomor Seri
  #nomor-seri-1-input text
  #nomor-seri-1-input text
  #nomor-seri-1-input text
Tanggal
  #tanggal-input date
Stempel
  #stempel-input textarea
Informasi Harga

 harga-1-1-input number
 harga-1-2-input number
 harga-1-3-input number
 harga-2-1-input number
 harga-2-2-input number
 harga-2-3-input number
 harga-3-1-input number
 harga-3-2-input number
 harga-3-3-input number

Nama Penjual & Telepon
 #nama-telepon-input textarea
Total Harga Pesann
 #total-harga number
Cicil
 #cicil-1 number
 #cicil-2 number
 #cicil-3 number
 #cicil-4 number
Submit
 #submit
 */


//checking of green boxes
$(' textarea, input:not(.line-harga, #kwitNumber-input)').focus(function() {
  'use strict';
  $(this)
    .closest('.normal-box:not(.little-box), .block-fat')
    .find('.row>.topper>i, .smallBox')
    .addClass('lightgreen')
    .removeClass('white');
})
  .blur(function() {
    'use strict';
    $(this).closest('.normal-box:not(.little-box), .block-fat')
      .find('.row>.topper>i, .smallBox')
      .addClass('white')
      .removeClass('lightgreen');
  });


//Gender input behaviour
$('.gender').on('click',function(){
  'use strict';
	$('#jenisKelami div:first').addClass('lightgreen');
		$('.gender').on('blur',function(){
			$('#jenisKelami div:first').removeClass('lightgreen');
		});
});

//Price inputs math behaviour
$('.line-harga').keyup(function() {
  'use strict';
  var jumlah, hargaPerUnit, lineTotal=0;
  var subTotal = [];
  var hargaPerUnitInput;
  for(var i=1; i<=3 ;i++) {
    hargaPerUnitInput = $('#harga-'+i+'-1-input').val();
    hargaPerUnit = parseInt(hargaPerUnitInput.replace(/[\D]/g,''),10);
    jumlah = parseInt($('#harga-'+i+'-2-input').val(),10) || 1;
    if (Number.isInteger(hargaPerUnit) && Number.isInteger(jumlah)) {
      lineTotal = hargaPerUnit*jumlah;
      subTotal.push(lineTotal);
      $('#harga-'+i+'-2-input').val(+$('#harga-'+i+'-2-input').val() || 1);
      $('#harga-'+i+'-3-input').val(lineTotal.toLocaleString('in'))
        .removeClass('left')
        .addClass('center');
      }
    else {
      $('#harga-'+i+'-3-input').val(null)
        .addClass('left')
        .removeClass('center');
    }
  }
  if(subTotal.length > 0) {
    $('#total-harga')
      .val(subTotal.reduce(function(a,b) {
      return a+b;
    }).toLocaleString('in'))
      .change();
  }
});
//submit hover animation
$('.enabled').hover(function(){
  'use strict';
  $(this).animate({
    opacity: 1
  },400);
},function(){
  'use strict';
  $(this).animate({
    opacity: 0.9
  },400);
});
//Enable submit only on critical data filled in
$('#nomor-seri-1-input, #stempel-input, #total-harga').change(function(){
  'use strict';
  if(!$(this).val()) {
    $(this).addClass('red');
  } else {
    $(this).removeClass('red');
  }
  if($('#nomor-seri-1-input').val() && $('#stempel-input').val() && $('#total-harga').val()) {
    $('.submit').addClass('enabled')
      .removeClass('disabled');
  } else {
    $('.submit').removeClass('enabled')
      .addClass('disabled');
  }
}).keyup(function(){
  'use strict';
  $(this).change();
});

$('#total-harga').change(function() {
  'use strict';
  if (!$(this).val()) {
    $(this).addClass('left').removeClass('center').change();
  }
  else {
    $(this).addClass('center').removeClass('left').change();
  }
});

$('.submit').mouseenter(function( ) {
  'use strict';
  if($(this).hasClass('disabled')) {
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

//button selection
$('#jenisKelami-L , #jenisKelami-P').click(function(){
  'use strict';
  if(this.id === 'jenisKelami-L'){
    $('#jenisKelami-L').addClass('genderback');
    $('#jenisKelami-P').removeClass('genderback');
    $('.gender').attr('value','male');
    //alert($('button').val());
  }else{
    $('#jenisKelami-P').addClass('genderback');
    $('#jenisKelami-L').removeClass('genderback');
    $('.gender').attr('value','female');
    //alert($('button').val());
  }
});

$('#submit').click(function(){
  'use strict';

  var obj = {
    kwitNumber: $('#kwitNumber-input').val(),
    name: $('#nama-input').val(),
    gender: $('.gender').val(),
    telNumber: $('#nomor-telepon-input').val(),
    addressLine1: $('#alamat-1-input').val(),
    addressLine2: $('#alamat-2-input').val(),
    products1: $('#produk-1-input').val(),
    products2: $('#produk-2-input').val(),
    products3: $('#produk-3-input').val(),
    serialNumber1: $('#nomor-seri-1-input').val(),
    serialNumber2: $('nomor-seri-2-input').val(),
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
    saleTotal: $('#total-harga').val(),
    installmentPrice1: $('#cicil-1').val(),
    installmentPrice2: $('#cicil-2').val(),
    installmentPrice3: $('#cicil-3').val(),
    installmentPrice4: $('#cicil-4').val(),
    date: $('#tanggal-input').val(),
    kioskID: $('#stempel-input').val(),
    kioskNameNumber: $('#nama-telepon-input').val()
  };

  kpn.store(obj);
});

kpn.updateTotal();
