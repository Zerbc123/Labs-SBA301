// DuyDLH-CE200667
package vn.edu.fpt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.entity.SystemAccount;
import vn.edu.fpt.services.ISystemAccountService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/accounts")
public class SystemAccountController {

    @Autowired
    private ISystemAccountService accountService;

    @GetMapping
    public List<SystemAccount> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public SystemAccount getAccountById(@PathVariable("id") Short id) {
        return accountService.getAccountById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SystemAccount createAccount(@RequestBody SystemAccount account) {
        return accountService.createAccount(account);
    }

    @PutMapping("/{id}")
    public SystemAccount updateAccount(@PathVariable("id") Short id, @RequestBody SystemAccount account) {
        return accountService.updateAccount(id, account);
    }

    @DeleteMapping("/{id}")
    public String deleteAccount(@PathVariable("id") Short id) {
        accountService.deleteAccount(id);
        return "Account deleted successfully!";
    }

    @GetMapping("/search")
    public List<SystemAccount> searchAccounts(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return accountService.searchAccounts(keyword);
    }
}
