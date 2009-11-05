$(function(){
  $('#mitez').infest(1);
  setInterval(function(){$('#mitez').trigger('Mite.Tick')}, 500)
  setInterval(function(){$('#mitez').trigger('Mite.Reset')}, 5000)
});
