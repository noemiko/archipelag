$(document).ready(function() {
    loadDatePickers();
    listenOnSaveMarket();

});

function listenOnSaveMarket(){
        const button = document.getElementById("create_event");
        button.addEventListener("click", createEvent);
};

function loadDatePickers(){
   $('#dpd1').datetimepicker({
       format: 'YYYY-MM-DD HH:mm',
       })
    $('#dpd2').datetimepicker({
        useCurrent: false,
        format: 'YYYY-MM-DD HH:mm',
    });
    $("#dpd1").on("dp.change", function (e) {
        $('#dpd2').data("DateTimePicker").minDate(e.date);
    });
    $("#dpd2").on("dp.change", function (e) {
        $('#dpd1').data("DateTimePicker").maxDate(e.date);
    });
};

function getInputValues(){
    const title = $("#title").val();
    const url = $("#url").val();
    const hashtag = $("#hashtag").val();
    const dateFrom = $("#dpd1").find("input").val();;
    const dateTo = $("#dpd2").find("input").val();
    return{
        "title":title,
        "url":url,
        "hashtag":hashtag,
        "date_starting":dateFrom,
        "date_ending":dateTo}
};

function isInputHasRequiredFields(requiredFields, testedDict){

    var missingField = "";
    $.each(requiredFields, function( index, value ) {
      if (testedDict[value] == ""){
          missingField = value;
      }
          return false;
    });
    if (missingField == ""){
        return true;
    }else{
        return false;
    }

};

function createEvent(data){
    inputValues = getInputValues()

    requiredFields = ['url', 'hashtag', 'title', 'date_starting',"date_ending"]
    if (isInputHasRequiredFields(requiredFields, inputValues) == true){
        sendInputs();
    }else{
        alert("Proszę o wypełnienie wszystkich pól.")
    }

};

function sendInputs(){
        const token = getCookieData("csrftoken");
        const forms = JSON.stringify(getInputValues());
	  $.ajax({
	      type:"post",
          url:"/market/create/",
          headers: {'X-CSRFToken': token},
          data:forms,
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
                success:function(data)
					{
					    //It is not the best solution,
                        //but ajax recognize redirect method from django as
                        //response data, so instead
                        //rediredct to expected page we get html here
                        window.location.href = data['url'];
                	},
				error:function( xhr,textStatus,err)
					{
                        console.log(err);
                        console.log(xhr);
                        console.log(textStatus);
					}
});
};

function getCookieData( name ) {
    var pairs = document.cookie.split("; "),
        count = pairs.length, parts;
    while ( count-- ) {
        parts = pairs[count].split("=");
        if ( parts[0] === name )
            return parts[1];
    }
    return false;
};