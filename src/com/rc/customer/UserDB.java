package com.rc.customer;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import java.sql.PreparedStatement;

public class UserDB {

	// properties
	private static final String DB_URL = "jdbc:mysql://localhost/rccourse";
	private static final String USER = "root";
	private static final String PASS = "root";

	protected Connection conn = null;

	// get & catch

	// constructor (s)
	public UserDB() {

		// open the connection to the database

		// load the database driver into memory
		try {
			Class.forName("com.mysql.jdbc.Driver");
			System.out.println("Connecting to database...");
			conn = DriverManager.getConnection(DB_URL, USER, PASS);

		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	// other methods
	// get the user with the specified id

	public User getUser(int id) throws UserDBException {

		User user = null;
		try {
			Statement stmt = conn.createStatement();
			String sql;
			sql = "SELECT * FROM users WHERE id = " + id;

			// execute the SQL
			ResultSet rs = stmt.executeQuery(sql); // execute for the non select
													// statements

			if (rs.next()) {
				
				String firstName = rs.getString("firstName");
				String lastName = rs.getString("lastName");
				Date dateOfBirth = rs.getDate("dateOfBirth");
				boolean registered = rs.getInt("registered") == 1; // right had
																	// side is
																	// the if
																	// part of
																	// the
																	// condition.

				user = new User(id, firstName, lastName, registered, dateOfBirth.toString());
				// System.out.println("" + id + ":" + firstName + " " +
				// lastName);

			} else {
				// record not found
			} // tidy up when finished
			rs.close();
		} catch (SQLException ex) {
			throw (new UserDBException("user not found"));
		}
		return user;
	}

	public ArrayList<User> getAll() {
		// User[] users = new User[99];

		ArrayList<User> users = new ArrayList<>();

		// int i =0;
		try {
			Statement stmt = conn.createStatement();
			String sql;
			sql = "SELECT * FROM users";

			// execute the SQL
			ResultSet rs = stmt.executeQuery(sql); // execute for the non select
													// statements

			while (rs.next()) {
				try{
				int id = rs.getInt("id");
				String firstName = rs.getString("firstName");
				String lastName = rs.getString("lastName");
				Date dateOfBirth = rs.getDate("dateOfBirth");
				boolean registered = rs.getInt("registered") == 1; // right had
																	// side is
																	// the if
																	// part of
																	// the
																	// condition.

				User user = new User(id, firstName, lastName, registered, dateOfBirth.toString());
				users.add(user);
			} catch (Exception ex) {
				// do nothing  - ignore the dud data
			}
		}
			// System.out.println("" + id + ":" + firstName + " " + lastName);

			// tidy up when finished
			rs.close();
		} catch (SQLException ex) {
			ex.printStackTrace();
		}

		return users;

	}
	
	public void create(User user) throws UserDBException {
		
		try {
			
			
			/*String sql ="INSERT INTO users " +
											"(firstName, lastName, registered, dateOfBirth)" +
											"VALUES('" + user.getFirstName() + "', "+
											"'" + user.getLastName() + "', "+
											user.isRegistered() + ", " +
											"'" + user.getDateOfBirth() + "')";
			*/
			// Parameterised query below, use this and not the SQL string above
			String sql = "INSERT INTO users" +
						"(firstName, lastName, registered, dateOfBirth)" +
						"VALUES(?, ?, ?, ?)";
			PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS); // have to pass this parameter i.e. give me the generated keys
																								
			stmt.setString(1, user.getFirstName());
			stmt.setString(2,user.getLastName());
			stmt.setBoolean(3, user.isRegistered());
			stmt.setString(4,user.getDateOfBirth());
			
			//System.out.println(sql);
			stmt.executeUpdate();
			
			ResultSet rs = stmt.getGeneratedKeys();
			
			if(rs.next()) {
				user.setId(rs.getInt("GENERATED_KEY"));
				System.out.println(user);
			}
			rs.close();
			stmt.close();
				
		} catch (SQLException e) {
			// force a throw e
			throw (new UserDBException(e.getMessage()));
			//e.printStackTrace();
		}
		
	}

	public void delete(int id){
		String sql = "DELETE FROM users WHERE id = ?";
		
		try {
			PreparedStatement stmt = conn.prepareStatement(sql);
			
			stmt.setInt(1, id);
			stmt.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public void update(User user){
		String sql ="UPDATE users " +
					"SET firstName =?, " +
					"lastName =?, " +
					"registered =?, " +
					"dateOfBirth = ? " +
					"WHERE id = ?";
		
		try {
			PreparedStatement stmt = conn.prepareStatement(sql);
			
			stmt.setString(1, user.getFirstName());
			stmt.setString(2, user.getLastName());
			stmt.setBoolean(3, user.isRegistered());
			stmt.setString(4, user.getDateOfBirth());
			
			stmt.setInt(5, user.getId());
			stmt.executeUpdate();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	
	public void close() {
		try {
			System.out.println("Closing Database");
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		
		UserDB userDB = new UserDB();
		
		// userDB.delete(5);
		
		User user;
		try {
			user = userDB.getUser(1);
		} catch (UserDBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//user.setFirstName("UPDATED");
		//user.setLastName("NAME");
		//user.setRegistered(true);
		//user.setDateOfBirth("1970-01-16");
		
		//userDB.update(user);
		
		
		/*User user = new User (-1,"new", "user", false, "2000-01-01"); // passing in -1 cos dont know what id will 
																		// be from database
		
		userDB.create(user); 
		*/
		
		//System.out.println("got here");
		
		//System.out.println(user);
	
		
		//ArrayList<User> userList = userDB.getAll();
		//for (User user : userList) {
			//System.out.println(user);
		//}
		userDB.close();
	}
}