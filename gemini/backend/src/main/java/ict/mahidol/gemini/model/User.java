package ict.mahidol.gemini.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "`user`")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int userId;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String role;

    public User()
    {
        super();
    }

    public User(String firstName, String lastName, String username, String password, String role)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public String getUsername()
    {
        return this.username;
    }

    public String getPassword()
    {
        return this.password;
    }

    public String getRole()
    {
        return this.role;
    }

    @Override
    public String toString()
    {
        return "Name: " + firstName + " " + lastName + ", Username: " + username + "Role: " + role;
    }
}
