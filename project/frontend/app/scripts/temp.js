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

