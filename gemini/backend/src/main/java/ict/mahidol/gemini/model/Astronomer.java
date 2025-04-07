package ict.mahidol.gemini.model;

import jakarta.persistence.Entity;

@Entity
public class Astronomer extends User {

    public Astronomer()
    {
        super();
    }
    
    public Astronomer(String firstName, String lastName, String username, String password, String role)
    {
        super(firstName, lastName, username, password, role);
    }
}
