<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
     <%@ page import="com.rc.customer.*, java.util.*, com.fasterxml.jackson.databind.ObjectMapper" %> 
<%


	UserDB userDB = new UserDB();
	
	ArrayList<User> users = userDB.getAll();
	
	
	ObjectMapper objectMapper = new ObjectMapper();
	String json = objectMapper.writeValueAsString(users);
%>
<%=json%>

