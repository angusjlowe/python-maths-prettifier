var renderButton;
var resultElement;

var init = function() {
   console.log( "ready!" );
   renderButton = $('#render')[0];
   resultElement = $('#result');
   var placeholder = $('#equation').attr('placeholder');
   console.log(placeholder);

};

$( document ).ready(function() {
   init();
   renderButton.addEventListener('click', () => {
      var input = $('#equation').val();
      console.log("input was: " + input);
      $.ajax({
           url: '/',
           data: JSON.stringify({'input': input}),
           contentType: 'application/json;charset=UTF-8',
           type: 'POST',
           success: function(response) {
               var jsonData = JSON.parse(response);
               var latex = jsonData.equation;
               if(latex == ' ') {
                  var math = MathJax.Hub.getAllJax('result')[0];
                  MathJax.Hub.Queue(["Text", math, 'something  wrong  with   your  python  expression']);
                  console.log(response);
               } else {
                  var math = MathJax.Hub.getAllJax('result')[0];
                  MathJax.Hub.Queue(["Text", math, latex]);
                  console.log(response);
               }
           },
           error: function(error) {
               console.log(error);
               var math = MathJax.Hub.getAllJax('result')[0];
               MathJax.Hub.Queue(["Text", math, 'something wrong with your python expression']);
           }
      });
   });
});
