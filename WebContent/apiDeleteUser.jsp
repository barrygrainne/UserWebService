<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
     <%@ page import="com.rc.customer.*, java.util.*, com.fasterxml.jackson.databind.ObjectMapper" %> 
<%
	//ObjectMapper mapper = new ObjectMapper(); 
	//String obj = request.getParameter("object"); //can pass an object using JSON as well as an id

	//User user = mapper.readValue(obj, User.class); // fn for reading an object from a string and had to put in default constructor in the user java page i.e. public user
	//out.println(user);
	
	int id = Integer.parseInt(request.getParameter("id"));
	UserDB userDB = new UserDB();
	
	userDB.delete(id);
	
	String json = "{\"status\" : \"ok\"}";
	
	
	
	
%>
<%=json%>

