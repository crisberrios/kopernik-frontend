$('#submit').click(function(){
<<<<<<< HEAD
  "use strict";
  var key = "a";
  var value = "10";
  var store = {};
  store[key]=value;
  chrome.storage.local.set(store, function(){});
  */
 

 
 //button selection
 $('#jenisKelami-L , #jenisKelami-P').click(function(){
 	if(this.id == 'jenisKelami-L'){
 		$('#jenisKelami-L').css('background-color','#CCCC66')
 		$('#jenisKelami-P').css('background-color','white')
 		$('.gender').attr("value","male");
 		alert($('button').val());
   	}else{
 		$('#jenisKelami-P').css('background-color','#CCCC66')
 		$('#jenisKelami-L').css('background-color','white')
 		$('.gender').attr("value","female");
 		alert($('button').val());
	}
 })

=======
>>>>>>> f80d8118651d3b04c9aa989c57bb5fc07d7636a8

	"use strict";

	var obj = {
		kwitNumber: $("#kwitNumber-input").val(),
  		name: $("#nama-input").val(),
  		gender: $(".gender").val(),
  	    telNumber: $("#nomor-telepon-input").val(),
  	    addressLine1: $("#alamat-1-input").val(),
  	    addressLine2: $("#alamat-2-input").val(),
  	    products1: $("#produk-1-input").val(),
  	    products2: $("#produk-2-input").val(),
  	    products3: $("#produk-3-input").val(),
	    serialNumber1: $("#nomor-seri-1-input").val(),
	    serialNumber2: $("nomor-seri-2-input").val(),
	    serialNumber3: $("#nomor-seri-3-input").val(),
	    price1: $("#harga-1-1-input").val(),
	    price2: $("#harga-2-1-input").val(),
	    price3: $("#harga-3-1-input").val(),
	    price1Amount: $("#harga-1-2-input").val(),
	    price2Amount: $("#harga-2-2-input").val(),
	    price3Amount: $("#harga-3-2-input").val(),
        totalPrice1: $("#harga-1-3-input").val(),
	    totalPrice2: $("#harga-2-3-input").val(),
	    totalPrice3: $("#harga-3-3-input").val(),
	    saleTotal: $("#total-harga").val(),
	    installmentPrice1: $("#cicil-1").val(),
	    installmentPrice2: $("#cicil-2").val(),
	    installmentPrice3: $("#cicil-3").val(),
	    installmentPrice4: $("#cicil-4").val(),
	    date: $("#tanggal-input").val(),
	    kioskID: $("#stempel-input").val(),
	    kioskNameNumber: $("#nama-telepon-input").val()
 	};
<<<<<<< HEAD
  
  
  chrome.storage.local.set(store);
 
=======
  kpn.store(JSON.stringify(obj));
>>>>>>> f80d8118651d3b04c9aa989c57bb5fc07d7636a8
});

