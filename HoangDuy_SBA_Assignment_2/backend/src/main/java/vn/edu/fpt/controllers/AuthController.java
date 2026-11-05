// DuyDLH-CE200667
package vn.edu.fpt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.dtos.LoginRequest;
import vn.edu.fpt.entity.SystemAccount;
import vn.edu.fpt.services.ISystemAccountService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private ISystemAccountService accountService;

    @PostMapping("/login")
    public SystemAccount login(@RequestBody LoginRequest request) {
        return accountService.login(request.getEmail(), request.getPassword());
    }

    @GetMapping("/me/{id}")
    public SystemAccount getProfile(@PathVariable("id") Short id) {
        return accountService.getAccountById(id);
    }
}
