package ict.mahidol.gemini;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import edu.gemini.app.ocs.OCS;

@SpringBootApplication
public class mainApplication {
	private static OCS ocs = new OCS(false);

	public static void main(String[] args) {
		SpringApplication.run(mainApplication.class, args);
	}

}
