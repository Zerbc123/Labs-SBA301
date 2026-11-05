// DuyDLH-CE200667
package vn.edu.fpt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DuyBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(DuyBackendApplication.class, args);
        System.out.println("==================================================================");
        System.out.println("FUNewsManagementSystem Backend is running on: http://localhost:8080");
        System.out.println("==================================================================");
    }
}

