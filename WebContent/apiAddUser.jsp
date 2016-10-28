<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
     <%@ page import="com.rc.customer.*, java.util.*, com.fasterxml.jackson.databind.ObjectMapper" %> 
<%


	
	String json = "{}";
	try {
	String firstName = request.getParameter("firstName");
	String lastName = request.getParameter("lastName");
	boolean registered = request.getParameter("registered").equals("1");
	String dateOfBirth = request.getParameter("dateOfBirth");	
	
	User user = new User(-1, firstName, lastName, registered, dateOfBirth);
	UserDB userDB = new UserDB();
	
	userDB.create(user);
	userDB.close();
	
	json = "{\"status\" :\"ok\", \"id\":" + user.getId() + "}";
	
	
	} catch (UserDBException ex) {
		response.sendError(500, ex.getMessage());
	}
	
	

%>
<%=json%>

