(function($) {
    "use strict";
    $(window).load(function(){
      $('#submit-button').click(function (e) {
        e.preventDefault()
        var name = $("#name").val();
        var email = $("#email").val();
        var mobile = $("#mobile").val();
        var msg = $("#comment").val();
  
        if(!name){
          $.toaster('Please enter your name', 'Missing Data', 'warning');
          return false
        }
        if(!email){
          $.toaster('Please enter your email', 'Missing Data', 'warning');
          return false
        }
        if(!mobile){
            $.toaster('Please enter your Mobile Number', 'Missing Data', 'warning');
            return false
          }
        if(!msg){
          $.toaster('Please enter your message', 'Missing Data', 'warning');
          return false
        }
  
  
        var target = ["contact@higglerslab.com"]
        $("#submit").prop('disabled', true)
        var request = $.ajax({
          url: "https://cewti8xhnb.execute-api.us-east-1.amazonaws.com/Production/sendMail",
          method: "POST",
          data: JSON.stringify({ body:{name: name, email: email,mobile:mobile, message: msg}, "template": "Templates/rsgctemplate.html", subject: `Mail from ${name}`, target: target, fromAddress: "contact@higglerslab.com" }),
          contentType: "application/json",
          dataType: "json"
        });
  
        request.done(function( msg ) {
          $("#name").val("")
          $("#email").val("")
          $("#mobile").val("")
          $("#message").val("")
          $.toaster('Request has been submitted successfully', 'Request', 'success');
          $("#submit").prop('disabled', false)
        });
  
        request.fail(function( jqXHR, textStatus ) {
          $.toaster('Something gone wrong!!!', 'Error', 'danger');
          $("#submit").prop('disabled', false)
        });
  
  
      })
  
  
  
  
    });
  })(jQuery);
  