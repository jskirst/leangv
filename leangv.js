var getMessagesUrl = "https://www.google.com/voice/inbox/recent/";
var deleteMessagesUrl = "https://www.google.com/voice/inbox/deleteMessages/"
var rnr_se = ""

var messages = ""

var addToMessages = function(response){
  var json_data = $("json", response).text();
  var data = JSON.parse(json_data);
  message_objects = data.messages;
  for(m in message_objects){
    messages = messages + "messages=" + m + "&"
  }
  if(messages != ""){
    console.log("Retrieved new messages.")
    deleteMessages();
  } else {
    console.log("Out of messages. Stopping.");
  }
}

var deleteMessages = function(){
  var data = messages + "_rnr_se="+rnr_se+"&trash=1"
  $.ajax(deleteMessagesUrl,
    {
      type: "POST",
      data: data,
      complete: getMessages,
      error: function(response){ console.log(response) }
    }
  )
}

var getMessages = function(rnrse){
  rnr_se = rnrse;
  messages = "";
  $.ajax(getMessagesUrl, 
    {
      success: addToMessages,
      error: function(response){ console.log(response) }
    }
  )
}