// DuyDLH-CE200667
package vn.edu.fpt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import vn.edu.fpt.entity.SystemAccount;
import vn.edu.fpt.repositories.INewsArticleRepository;
import vn.edu.fpt.repositories.ISystemAccountRepository;

import java.util.List;

@Service
public class SystemAccountService implements ISystemAccountService {

    @Autowired
    private ISystemAccountRepository accountRepository;

    @Autowired
    private INewsArticleRepository newsArticleRepository;

    @Override
    public List<SystemAccount> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public SystemAccount getAccountById(Short id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found with ID: " + id));
    }

    @Override
    public SystemAccount login(String email, String password) {
        if (email == null || email.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and Password are required!");
        }
        return accountRepository.findByAccountEmailAndAccountPassword(email.trim(), password.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password!"));
    }

    @Override
    public SystemAccount createAccount(SystemAccount account) {
        if (account.getAccountEmail() == null || account.getAccountEmail().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Account Email is required!");
        }
        if (accountRepository.existsByAccountEmail(account.getAccountEmail().trim())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists: " + account.getAccountEmail());
        }
        if (account.getAccountID() == null || account.getAccountID() <= 0) {
            Short maxId = accountRepository.findMaxAccountID();
            account.setAccountID((short) (maxId + 1));
        }
        if (account.getAccountRole() == null) {
            account.setAccountRole(2); // Default to Staff (2)
        }
        return accountRepository.save(account);
    }

    @Override
    public SystemAccount updateAccount(Short id, SystemAccount account) {
        SystemAccount existing = getAccountById(id);
        if (account.getAccountName() != null) {
            existing.setAccountName(account.getAccountName());
        }
        if (account.getAccountEmail() != null) {
            existing.setAccountEmail(account.getAccountEmail().trim());
        }
        if (account.getAccountPassword() != null && !account.getAccountPassword().isEmpty()) {
            existing.setAccountPassword(account.getAccountPassword());
        }
        if (account.getAccountRole() != null) {
            existing.setAccountRole(account.getAccountRole());
        }
        return accountRepository.save(existing);
    }

    @Override
    public void deleteAccount(Short id) {
        if (!accountRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found with ID: " + id);
        }
        // Business Rule: Cannot delete account if it has already created news articles
        if (newsArticleRepository.existsByCreatedBy_AccountID(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot delete account because it has created news articles!");
        }
        accountRepository.deleteById(id);
    }

    @Override
    public List<SystemAccount> searchAccounts(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return accountRepository.findAll();
        }
        String kw = keyword.trim();
        return accountRepository.findByAccountNameContainingIgnoreCaseOrAccountEmailContainingIgnoreCase(kw, kw);
    }
}
