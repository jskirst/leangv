var getMessagesUrl = "https://www.google.com/voice/inbox/recent/";
var getTrashMessagesUrl = "https://www.google.com/voice/inbox/recent/trash";
var deleteMessagesUrl = "https://www.google.com/voice/inbox/deleteMessages/"
var deleteMessagesForeverUrl = "https://www.google.com/voice/inbox/deleteForeverMessages/"
var rnr_se = ""
var mode = ""

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
  var data = messages + "_rnr_se="+rnr_se
  var url = ""
  if(mode == "forever"){
    url = deleteMessagesForeverUrl;
  } else {
    data = data + "&trash=1"
    url = deleteMessagesUrl;
  }
  $.ajax(url,
    {
      type: "POST",
      data: data,
      complete: function(x, s){ if(s != "error"){ getMessages(); } },
      error: function(response){ console.log(response) }
    }
  )
}

var getMessages = function(){
  messages = "";
  var url = "";
  if(mode == "forever"){
    url = getTrashMessagesUrl;
  } else {
    url = getMessagesUrl;
  }
  $.ajax(url, 
    {
      success: addToMessages,
      error: function(response){ console.log(response) }
    }
  )
}

var start = function(r, m){
  rnr_se = r;
  mode = m
  getMessages();
}