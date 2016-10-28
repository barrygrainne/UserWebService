<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
     <%@ page import="com.rc.customer.*, java.util.*, com.fasterxml.jackson.databind.ObjectMapper" %> 
<%
String json = "{}";
try{
	

	int id= Integer.parseInt(request.getParameter("id"));
	UserDB userDB = new UserDB();
	
	User user = userDB.getUser(id);
	
	
	ObjectMapper objectMapper = new ObjectMapper();
	json = objectMapper.writeValueAsString(user);
} catch(UserDBException ex) {
	// no user id exists
	response.sendError(404, "User not found.");
} catch(NullPointerException ex){
	// id was missing
	response.sendError(400,"Bad Request - Missing parameter id");
} catch(NumberFormatException ex){
	// id was not a number
	response.sendError(500, "Internal server error -id is not a number");
}
%>
<%=json%>

