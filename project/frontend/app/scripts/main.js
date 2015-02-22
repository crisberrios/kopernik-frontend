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


//App icon action

$(' textarea, input ').focus(function() {
  $(this)
    .closest('.normal-box:not(.little-box), .block-fat')
    .find('.row>.topper>i, .smallBox')
    .addClass('lightgreen')
    .removeClass('white');
})
  .blur(function() {
    $(this).closest('.normal-box:not(.little-box), .block-fat')
      .find('.row>.topper>i, .smallBox')
      .addClass('white')
      .removeClass('lightgreen');
  })
;


$('.gender').on('click',function(){
	$('#jenisKelami div:first').addClass('lightgreen')
		$('.gender').on('blur',function(){
			$('#jenisKelami div:first').removeClass('lightgreen')
		});
});



//TODO: prevent from opening more tabs
chrome.browserAction.onClicked.addListener(function(callback) {
  "use strict";
  var action_url = chrome.extension.getURL("main.html");
  chrome.tabs.create({ url: action_url });
});



