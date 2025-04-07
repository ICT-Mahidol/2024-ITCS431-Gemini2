package ict.mahidol.gemini.model;

import jakarta.persistence.Entity;

@Entity
public class ScienceObserver extends User {

    public ScienceObserver()
    {
        super();
    }

    public ScienceObserver(String firstName, String lastName, String username, String password, String role)
    {
        super(firstName, lastName, username, password, role);
    }
}
