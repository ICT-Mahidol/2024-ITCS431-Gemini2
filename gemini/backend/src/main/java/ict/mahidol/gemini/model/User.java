package ict.mahidol.gemini.model;

import jakarta.persistence.Entity;

@Entity
public class User {
    protected int userId;
    protected String firstName;
    protected String lastName;
    protected String username;
    private String password;
    protected String role;

    public User(int userId, String firstName, String lastName, String username, String role)
    {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.role = role;
    }

    @Override
    public String toString()
    {
        return "Name: " + firstName + " " + lastName + ", Username: " + username + "Role: " + role;
    }
}
