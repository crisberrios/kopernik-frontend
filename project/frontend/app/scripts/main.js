// Called when the user clicks on the browser action.
/*List of fields:
KwitNumber:
  #kwitNumber-input: number
Nama Lengcap:
  #nama-input : textarea
Jenis Kelami:
  #jenisKelami-P button
  #jenisKelami-L button
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

//function for gender input
$('.gender').click(function() {
  "use strict";
  $('.gender').removeClass('lightgreen');
  $(this).addClass('lightgreen');
  $('.gender').val('');
  $(this).val($(this).attr('placeholder'));
});

$('.line-harga').keyup(function() {
  "use strict";
  //harga-1-1-input
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
      $('#harga-'+i+'-3-input').val("Rp.");
    }
  }
  if(subTotal.length > 0) {
    $('#total-harga').val(subTotal.reduce(function(a,b) {
      return a+b;
    }));
  }

});

//TODO: prevent from opening more tabs
chrome.browserAction.onClicked.addListener(function(callback) {
  "use strict";
  var action_url = chrome.extension.getURL("main.html");
  chrome.tabs.create({ url: action_url });
});

