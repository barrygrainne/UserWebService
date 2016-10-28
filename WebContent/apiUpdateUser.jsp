<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
     <%@ page import="com.rc.customer.*, java.util.*, com.fasterxml.jackson.databind.ObjectMapper" %> 
<%

	int id = Integer.parseInt(request.getParameter("id"));
	String firstName = request.getParameter("firstName");
	String lastName = request.getParameter("lastName");
	boolean registered = request.getParameter("registered").equals("1");
	String dateOfBirth = request.getParameter("dateOfBirth");
	
	User user = new User(id, firstName, lastName, registered, dateOfBirth);
	UserDB userDB = new UserDB();
	
	userDB.update(user);
	
	String json = "{\"status\" :\"ok\", \"id\":" + user.getId() + "}";
	
	userDB.close();

%>
<%=json%>

