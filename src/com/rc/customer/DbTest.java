package com.rc.customer;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DbTest {
	
	private static final String DB_URL = "jdbc:mysql://localhost/rccourse";
	private static final String USER = "root";
	private static final String PASS = "root";

	public static void main(String[] args) {
		
		Connection conn = null;
		Statement stmt = null;
		
		// load the database driver into memory
		try {
			Class.forName("com.mysql.jdbc.Driver"); // typed this line, and let eclipse put catch and try around it
			
			// STEP 3: Open a connection
			System.out.println("Connecting to database...");
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			
			stmt = conn.createStatement();
			String sql;
			sql = "SELECT * FROM users";
			
			// execute the SQL
			ResultSet rs = stmt.executeQuery(sql); // execute for the non select statements
			
			while (rs.next()){
				int id = rs.getInt("id");
				String firstName = rs.getString("firstName");
				String lastName = rs.getString("lastName");
				System.out.println("" + id + ":" + firstName + " " + lastName);
				
			}
			// Make sure to close database connection when finished
			conn.close();
			
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

	}

}
