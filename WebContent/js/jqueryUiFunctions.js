
$(document).ready(function(){
	
	$("#dateOfBirth").datepicker({ dateFormat:'yy-mm-dd'});
	
	$("#main").on("click", function(event){
		
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
					$.getJSON("apiAddUser.jsp", data, function(){
						alert("added" + data.id);
					});
					$(this).dialog("close");
				}, // ok fn
				Cancel: function(){
					$(this).dialog("close");
				} // ok function
			} 
			
		});
	});
});
		
		
		// show a jqueryui dialog
		
	/*	$("#dialogDiv").dialog({
		
		//width:200,
		//height:125,
		
		modal:true, 
		buttons: {
			Ok: function(){
				$(this).dialog("close");
			}, // ok fn
			Cancel: function(){
				$(this).dialog("close");
			} // ok function
		} 
		
	}); // end of dialog
	}); // end of on click
	
	
}); // end of ready fn 
*/
