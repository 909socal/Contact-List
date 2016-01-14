'use strict'

$(document).ready(init);
  // var $fnay = $("#fname");
var storage = [];

function init(){
  $('#newContactForm').on('submit' , addNewTransaction);
  $('table').on('click', '.deleteButton', deleteMe);
  $('table').on('dblclick', 'th' , sortMe);
  $('table').on('click', '.editButton', editMe);

  loadFromStorage();
 }

function sortMe(e){
   var $target = $(e.target);
   var $targetClass = $target.attr('class');
   storage = _.sortBy(storage, $targetClass);
   console.log(storage)
   localStorage.setItem( 'addressBook', JSON.stringify(storage));


   //Sorry I know its a bad way, but it will only assort when the screen was refreshed !!!!!!!
   location.reload();   
}

function editMe(event){
  alert("Edit Values Inside Input Box and Click Add");
  //console.log($(this).closest('tr').find('.first').text())
  $("#fname").val($(this).closest('tr').find('.first').text());
  $("#lname").val($(this).closest('tr').find('.last').text());
  $("#furnumba").val($(this).closest('tr').find('.phone').text());
  for (var i = 0; i <storage.length; i++){
    if( storage[i].fnay === $(this).closest('tr').find('.first').text()){
      storage.splice( i , 1 );
    }
  }
  var itemDeleted = $(this).closest('tr').remove();

  localStorage.setItem( 'addressBook', JSON.stringify(storage));
}

function addNewTransaction(event){
  event.preventDefault();

 	var fnay = $("#fname").val();
  var lnay = $("#lname").val();
  var pnay = $("#furnumba").val();

  var data = {
    fnay: fnay,
    lnay: lnay,
    pnay: pnay
  }

  storeData(data);
  var $tr = buildTr(data)
  $('#bigBoy').append($tr);
  $("#fname").val('');
  $('#lname').val('');
  $("#furnumba").val('');
}

function deleteMe(){
  // make it delete from storage 
  //console.log($(this).closest('tr').find('.first').text());
  for (var i = 0; i <storage.length; i++){
    if( storage[i].fnay === $(this).closest('tr').find('.first').text()){
      storage.splice( i , 1 );
    }
  }
  var itemDeleted = $(this).closest('tr').remove();
  localStorage.setItem( 'addressBook', JSON.stringify(storage));
}

function buildTr(data){
  //console.log('data from buildTr', data)
  var $tr = $('#template').clone();
  $tr.removeAttr('id');
  $tr.children('.first').text(data.fnay);
  $tr.children('.last').text(data.lnay);
  $tr.children('.phone').text(data.pnay);
  return $tr;
}

function storeData(data){
  // var fnay = $("#fname").val();
  // var lnay = $("#lname").val();
  // var pnay = $("#furnumba").val();
  storage.push(data);
  //console.log('storage fom storeData', storage)
  localStorage.setItem( 'addressBook', JSON.stringify(storage));
}

function loadFromStorage() {
  var toAppend= [];
  if(!localStorage.addressBook) {
    localStorage.addressBook = '[]';
  }
  storage = JSON.parse(localStorage.addressBook);
  for( var i = 0; i<storage.length; i++){
    // console.log('storage from loading', storage[i]);
    var $tr = buildTr(storage[i]);
    toAppend.push($tr);
   //  call the stor data since it returns an object 
   //  and push that object maye into buildTR
  }
  // var $tr = buildTr(storage);
  $('#bigBoy').append(toAppend);
}

   


