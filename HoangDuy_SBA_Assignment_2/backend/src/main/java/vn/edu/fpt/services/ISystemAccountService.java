// DuyDLH-CE200667
package vn.edu.fpt.services;

import vn.edu.fpt.entity.SystemAccount;

import java.util.List;

public interface ISystemAccountService {

    List<SystemAccount> getAllAccounts();

    SystemAccount getAccountById(Short id);

    SystemAccount login(String email, String password);

    SystemAccount createAccount(SystemAccount account);

    SystemAccount updateAccount(Short id, SystemAccount account);

    void deleteAccount(Short id);

    List<SystemAccount> searchAccounts(String keyword);
}
