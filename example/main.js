$(function(){
  $('#mitez').infest(2);
  setInterval(function(){$('#mitez').trigger('Mite.Tick')}, 1000)
});
