var users;

//$(document).ready(init ); // when home has loaded and everything rendered on screen this will then be called


$(document).ready(function(){// inline declaration of functions, doing the same as above except not calling init
	var data = {};
	

	$.getJSON("apiGetUsers.jsp", data, function(data, status, xhr){
		

		users = data;
		for(i=0; i<data.length; i++) {
			
		$("#userList").append("<option value=" + data[i].id + ">" + data[i].firstName + " " + data[i].lastName + "</option>");
		
		
		}
		
	});
	
	$('#clearButton').on("click", function(){
		$('#userList').empty();

	});
	
	
	$("#deleteButton").on("click", function(){  // event handler for delete button
		
		if (confirm("Are you sure")) {  // popup dialog box
			// call the api
			var id = $('#userList').val();
			var data = {"id": id}; // pass a parameter to api
			// var data = {"user":{"id":1, "firstName": "fred", "lastName"}}
			$.getJSON("apiDeleteUser.jsp", data, function(data, status, xhr){ // data in function - data that comes back from the xhr call
				
				//alert("Deleted");
				
				// remove the user from the list box
				
				// or
				
				//remove the users form the users array and
				//users.remove(where users[i].id=id);
				for(var i = users.length -1; i>=0; i--){
					if(users[i].id == id){
						users.splice(i, 1); 
					}
				}
				// repopulate the list box
				
				$("#userList").empty();
				for(i=0; i<users.length; i++) {
					
					$("#userList").append("<option value=" + users[i].id + ">" + users[i].firstName + " " + users[i].lastName + "</option>");
					
					
					}
			});
			
		}
		
	});
	
	$("#addButton").on("click", function(){
		
		var firstName = $("#firstName").val();
		var lastName = $("#lastName").val();
		var registered = $("#registered").prop("checked");
		var dateOfBirth = $("#dateOfBirth").val();
		
		// validate my inputs
		
		// set the parameters
		var data = {
				"firstName":firstName,
				"lastName":lastName,
				"registered":registered?1:0,
				"dateOfBirth":dateOfBirth
				
		};
		
		// call the api
		$.getJSON("apiAddUser.jsp", data, function(data, status, xhr){
			alert("added");
			// add user to the array + list)
			var user = {"id":data.id,
						"firstName":firstName,
						"lastName":lastName,
						"registered":registered?1:0,
						"dateOfBirth":dateOfBirth};
			
			users.push(user);
			
			populateList();
		
			// clear the input controls??
		});

	});

	$("#userList").on("change", function(){
		var id = $("#userList").val();
		var user;
		
		// find the user with id in users
		for(var i=0; i<users.length; i++){
			if(users[i].id == id){
				user = users[i];
				break;
			}
		}
		$("#id").val(user.id);
		$("#firstName").val(user.firstName);
		$("#lastName").val(user.lastName);
		$("#registered").prop("checked", user.registered);
		$("#dateOfBirth").val(user.dateOfBirth);
	});
	
	$("#updateButton").on("click", function()
{	
		
		// validate the parameter
		var id =$("#id").val();
		var firstName = $("#firstName").val();
		var lastName = $("#lastName").val();
		var registered = $("#registered").prop("checked");
		var dateOfBirth = $("#dateOfBirth").val();
		
		// validate my inputs
		
		// set the parameters
		var data = { "id":id,
				"firstName":firstName,
				"lastName":lastName,
				"registered":registered?1:0,
				"dateOfBirth":dateOfBirth};
				
			
		
		// call the api
		$.getJSON("apiUpdateUser.jsp", data, function(data, status, xhr){
			alert("updated");
			// change the user entry in the array + list
			var user = { "id":data.id,
					"firstName":firstName,
					"lastName":lastName,
					"registered":registered?1:0,
					"dateOfBirth":dateOfBirth };
	
			// find user with user.id = id
			for(var i=0; i<users.length; i++){
				if(users[i].id == id){
					// replace user[i] with the updated user	
					users.splice(i, 1, user);
					break;
				}
			}
			populateList();
		});
	});
});

function populateList(){
	$("#userList").empty();
	for(i=0; i<users.length; i++){
		
		$("#userList").append("<option value='" + users[i].id + "'>"
							+ users[i].firstName + " "
							+ users[i].lastName
							+ "</option>");
	}
}
function old_init(){ // not calling this function anymore cos we have replaced it with the init function above
	
		
		$("#pageTitle").html("UserWebService"); // using jquery version 1.12.4
		$(".red").html("These are red divs");
	
		$("div").addClass("border2");
		
		// populate the form
		$("#id").val(-1);
		$("#firstName").val("Grainne");
		$("#lastName").val("Barry");
		$("#registered").prop('checked', true);
		$("#dateOfBirth").val("2000-09-10");
		
		
		// add an event handler to a dom element
		$("#id").on("click", function(){
			alert("you clicked the id");
		});
		
		// add an event handler to every div
		$("div").on("click", function(){
			alert("you clicked a div");
		});
		
		$("#pageTitle").on("click", function(){
			alert("you clicked on page title");
			
		});
		
		var data = {};
		
		// empty the list
		$("#userlist").empty("option");
		$.getJSON("apiGetUsers.jsp", data, function(data, status, xhr){
			
			// var userList = document.getElementById("userList");
			users = data;
			for(i=0; i<data.length; i++) {
				
			$("#userList").append("<option value=" + data[i].id + ">" + data[i].firstName + " " + data[i].lastName + "</option>");
			
			/*var option = document.createElement("option");
			option.text = data[i].firstName + " " + data[i].lastName;
			option.value = data[i].id;
			userList.add(option); */
			}
			
		});
		
		$('#clearButton').on("click", function(){
			$('#userList').empty();

		});
		
		
		
		/*var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				
				var users = JSON.parse(this.responseText);
			
				var userList = document.getElementById("userList");
				
				for(i=0; i<users.length; i++) {
				var option = document.createElement("option");
				option.text = users[i].firstName + " " + users[i].lastName;
				option.value = users[i].id;
				userList.add(option);
				}
			}
			
		};
		
		xhr.open("GET", "apiGetUsers.jsp", true); // true or false for whether it is asynchronous or not
		
		xhr.send(); */
		
	} 
	