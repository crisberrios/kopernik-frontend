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
$(' textarea, input:not(.line-harga)').focus(function() {
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
  for(var i=1; i<=3 ;i++) {
    hargaPerUnit = parseInt($('#harga-'+i+'-1-input').val(),10);
    jumlah = parseInt($('#harga-'+i+'-2-input').val(),10);
    if (Number.isInteger(hargaPerUnit) && Number.isInteger(jumlah)) {
      lineTotal = hargaPerUnit*jumlah;
      subTotal.push(lineTotal);
      $('#harga-'+i+'-3-input').val(lineTotal);
      }
    else {
      $('#harga-'+i+'-3-input').val('Rp.');
    }
  }
  if(subTotal.length > 0) {
    $('#total-harga').val(subTotal.reduce(function(a,b) {
      return a+b;
    })).change();
  }
});
//submit hover animation
$('.submit').hover(function(){
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
    $('.submit').addClass('enabled').removeClass('disabled');
  } else {
    $('.submit').removeClass('enabled').addClass('disabled');
  }
}).keyup(function(){
  'use strict';
  $(this).change();
});


//TODO: prevent from opening more tabs
//main icon action
chrome.browserAction.onClicked.addListener(function() {
  'use strict';
  var actionUrl = chrome.extension.getURL('main.html');
  chrome.tabs.create({ url: actionUrl });
});
