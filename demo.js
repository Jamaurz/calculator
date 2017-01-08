$(document).ready(function() {
  var input = [];  
  var licz = false;
  var arrOp = ["/", "*", "+", "-"];
  setPosition();

  $('.col-xs-12 a').on('click', function() {
    var inp = $(this).text();
    if(this.id == "deleteAll") {
      input = [];
      setDisplay(input);
      $("#inpRes").text([]);
    }else if(this.id == "deleteLast") {  
      input.pop();   
      setDisplay(input.join(''));
      $("#inpRes").text([]);
    } else if(inp == "=") {
      if(input.length > 2) {
        var tempres = getResult(input);
        setDisplay(input.join('') + '=' + tempres);
        $("#inpRes").text(tempres);
        input = [tempres];
        licz = true;
      }      
    } else {
      if(($.inArray(inp, arrOp) != -1) && ($.inArray(input[input.length - 1], arrOp) != -1)) {
        input.pop();
      }      
     if(input[input.length - 1] == undefined && $.inArray(inp, arrOp) != -1) {
       return;
     }      
      if((inp == 0 && input[input.length - 1] == 0) || (inp == 0 && input[input.length - 1] == undefined ) || (inp == 0 && $.inArray(input[input.length - 1], arrOp) != -1 ) ) {    
        inp = '';
        return;
      } 
      if(($.inArray(inp, arrOp) == -1) && licz && ($.inArray(input[input.length - 1], arrOp) == -1)) {
        input = [];
        input.push(inp);      
      } else {
        if(($.inArray(input[input.length - 1], arrOp) == -1) && (input[input.length - 1] != undefined) && ($.inArray(inp, arrOp) == -1)) {
          inp = input.pop() + inp;
          input.push(inp);          
        } else {
         input.push(inp);
        }
      }     
      licz = false;   
      setDisplay(input.join(''));     
      $('#inpRes').text(inp);
    }
    dispNull(input);
  });
  dispNull(input);
});

function getResult(input) {
  input = input.join("");
  input = eval(input);
  if(input % 1 === 0) {
    return input;
  }
  return (input).toFixed(2);
}
function setDisplay(input) {
  $('#res').text(input);
}
function dispNull(input) {

  if(!input[0]) {    
    $('#res').text("0");
    $('#inpRes').text("0");
  }
}
function setPosition() {
  $("#calcult").css({"marginLeft": (($(window).width() -  $("#calcult").width() - 20)/ 2)});
}

$(window).on('resize', function() {
  setPosition();
})