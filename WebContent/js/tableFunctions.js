var users;

$(document).ready(function(){

	var data = {};
	$.getJSON("apiGetUsers.jsp", data, function(data, status, xhr){


		users = data;
		populateTable();
	});

// now that the buttons exist - attach an event handler
// handler delete buttons # means id . means class
// now that the buttons exist - attach an event handler
	$(document).on("click", ".deleteButton", function(event){


		var id = event.target.id.split("_")[1]; 

		$("#dialogDiv").dialog({
			modal:true, 
			buttons: {
				Ok: function(){
					$(this).dialog("close");
					var data = {"id": id}; // pass a parameter to api
					$.getJSON("apiDeleteUser.jsp", data, function(data, status, xhr){ // data in function - data that comes back from the xhr call
						// remove id from the list

						// remove the line from the table
						$("#tr_" + id).remove();
					});
	
				}, // ok fn
				Cancel: function(){
					$(this).dialog("close");
				} // ok function
			}, //end buttons
			open: function(event, ui){
				// this method will get called when the dialog is opened
				
				
				//var buttons = $(this).dialog("option", "buttons");
				//$(buttons[0].on("mouseover", function(){
					//alert("hello");
			//	});
				
			}
		});
		//if (confirm("Are you sure")) {  // popup dialog box
			// call the api																	
				
		//}

	});



$(document).on("click", ".editButton", function(event){
	var id = event.target.id.split("_")[1];
	startEdit(id);
	

});

$(document).on("click", ".saveButton", function(event){
	var id = event.target.id.split("_")[1];
	saveEdit(id);
});
$(document).on("click", ".undoButton", function(event){
	var id = event.target.id.split("_")[1];
	undoEdit(id);

});
$("#dateOfBirth").datepicker({ dateFormat:'yy-mm-dd',
							changeYear: true,
							changeMonth: true,
							yearRange: "-120:+0"});


$(document).on("click", "#addButton", function(event){
	$("#dialogAdd").dialog({
		modal:true,
		buttons: {
			Ok: function(){
				
				// read the values 
				var firstName = $("#firstName").val();
				var lastName = $("#lastName").val();
				var registered = $("#registered").prop("checked");
				var dateOfBirth = $("#dateOfBirth").val();
				
				data = {
						"firstName":firstName,
						"lastName":lastName,
						"registered":registered?1:0,
						"dateOfBirth":dateOfBirth
				}
				// validate them
				
				// call the api to add
				$.getJSON("apiAddUser.jsp", data, function(data, status, xhr){
					//alert("added" + data.id);
					
					var user = {"id":data.id, "firstName":firstName, "lastName":lastName, "registered":registered, "dateOfBirth":dateOfBirth}
					
					users.push(user); // add to the end of the array
					populateTable();
					$("#dialogAdd").dialog("close");
					$('#addErrorMessage').text("");
					
				}).fail(function(xhr, status, error ) {
					
					// alert("something went wrong" + xhr.status + ":" + xhr.statusText);
					$("#addErrorMessage").text("Invalid date");
					$("#dateOfBirth").focus();
				});
				//$(this).dialog("close");
				
			}, // ok fn
			Cancel: function(){
				$(this).dialog("close");
			} // ok function
		} 
		
	});
});


function startEdit(id){
	
	var tdFirstName = $("#tr_" + id + " :nth-child(2)");
	var value = tdFirstName.html();
	tdFirstName.html("<input type='text' value='" + value + "' id='firstName_" + id + "'>");
	
	var tdLastName = $("#tr_" + id + " :nth-child(3)");
	var value = tdLastName.html();
	tdLastName.html("<input type='text' value='" + value + "' id='lastName_" + id + "'>");
	
	var tdRegistered = $("#tr_" + id + " :nth-child(4)");
	var value = tdRegistered.html()=="true";
	tdRegistered.html("<input type='checkbox' " + "id='registered_" + id + "'" + (value ? "checked" : "") + ">");
	
	var tdDateOfBirth = $("#tr_" + id + " :nth-child(5)");
	var value = tdDateOfBirth.html();
	tdDateOfBirth.html("<input type='text' value='" + value + "' id='dateOfBirth_" + id + "'>");
}

function undoEdit(id){
	// find the user where user[i].id = id 
	for(var i=0; i<users.length; i++){
		if(users[i].id == id){
			break;
		}
	}
	//  put back in the values
	var tdFirstName = $("#tr_" + id + " :nth-child(2)");
	tdFirstName.html(user.firstName);
	
	$("#tr_" + id + " :nth-child(3)").html(user.lastName);
	$("#tr_" + id + " :nth-child(4)").html(user.registered? "true" : "false");
	$("#tr_" + id + " :nth-child(5)").html(user.dateOfBirth);
	
}
function saveEdit(id){
		// read the new values
		var firstName = $("#firstName_" + id).val();
		var lastName = $("#lastName_" + id).val();
		var registered = $("#registered_" + id).prop("checked");
		var dateOfBirth = $("#dateOfBirth_" + id).val();
		
		// validate the new values!!!!!!!!!!!!
		//TBD
		//call the api to write hte new values
		var data = {"id":id,
					"firstName":firstName,
					"lastName":lastName,
					"registered":registered ? 1:0,
					"dateOfBirth":dateOfBirth};
		$.getJSON("apiUpdateUser.jsp", data, function(data, status, xhr){
			alert("saved");
			
			// remove controls and put in the new values in the tds
			$("#tr_" + id + " :nth-child(2)").html(firstName);
			$("#tr_" + id + " :nth-child(3)").html(lastName);
			$("#tr_" + id + " :nth-child(4)").html(registered? "true" : "false");
			$("#tr_" + id + " :nth-child(5)").html(dateOfBirth);
		});
		
		
}

function populateTable() {
	$("#userTable tbody tr").remove();
	for(i=0; i<users.length; i++) {

		$("#userTable").append("<tr id='tr_" + users[i].id + "'></tr>");
		var tr = $("#tr_" + users[i].id);
		tr.append("<td class='td_small'>" + users[i].id + "</td>");
		tr.append("<td class='td_medium'>" + users[i].firstName + "</td>");
		tr.append("<td class='td_medium'>" + users[i].lastName + "</td>");
		tr.append("<td class='td_small'>" + users[i].registered + "</td>");
		tr.append("<td class='td_medium'>" + users[i].dateOfBirth + "</td>");

		// need to add the buttons
		// tr.append("<td><input type='button' id='deleteButton_" + data[i].id +
		// "' value='delete' class='deleteButton'></td>");
		// tr.append("<td><input type='button' id='editButton_" + data[i].id +
		// "' value='edit' class='editButton'></td>");
		// tr.append("<td><input type='button' id='saveButton_" + data[i].id +
		// "' value='save' class='saveButton'></td>");
		// tr.append("<td><input type='button' id='cancelButton_" + data[i].id +
		// "' value='cancel' class='cancelButton'></td>");

		tr.append("<td class='td_small centered deleteButton tdButton fa fa-trash'" + "id='deleteButton_" + users[i].id + "' ></td>");
		tr.append("<td class='td_small centered editButton tdButton fa fa-edit'" + "id='editButton_" + users[i].id + "' ></td>");
		tr.append("<td class='td_small centered saveButton tdButton fa fa-save disabled'" + "id='saveButton_" + users[i].id + "' ></td>");
		tr.append("<td class='td_small centered undoButton tdButton fa fa-undo'" + "id='undoButton_" + users[i].id + "' ></td>");


	}
};

});

	// handler delete buttons # means id . means class
	// now that the buttons exist - attach an event handler
	/*
	 * $(".deleteButton").on("click", function(event){
	 * 
	 *  // alert(event.target.id + " was pressed"); var id =
	 * event.target.id.split("_")[1];
	 * 
	 * if (confirm("Are you sure")) { // popup dialog box // call the api
	 * 
	 * var data = {"id": id}; // pass a parameter to api // var data =
	 * {"user":{"id":1, "firstName": "fred", "lastName"}}
	 * $.getJSON("apiDeleteUser.jsp", data, function(data, status, xhr){ // data
	 * in function - data that comes back from the xhr call
	 *  // remove id from the list
	 *  // remove the line from the table $("#tr_" + id).remove(); });
	 *  }
	 * 
	 * });
	 * 
	 * 
	 * $(document).on("click", ".editButton", function(event){ alert("editButton
	 * pressed");
	 * 
	 * }); });
	 */