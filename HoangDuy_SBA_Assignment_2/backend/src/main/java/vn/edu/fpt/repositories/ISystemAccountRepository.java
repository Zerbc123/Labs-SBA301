// DuyDLH-CE200667
package vn.edu.fpt.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.entity.SystemAccount;

import java.util.List;
import java.util.Optional;

@Repository
public interface ISystemAccountRepository extends JpaRepository<SystemAccount, Short> {

    Optional<SystemAccount> findByAccountEmail(String email);

    Optional<SystemAccount> findByAccountEmailAndAccountPassword(String email, String password);

    List<SystemAccount> findByAccountNameContainingIgnoreCaseOrAccountEmailContainingIgnoreCase(String name, String email);

    boolean existsByAccountEmail(String email);

    @Query("SELECT COALESCE(MAX(a.accountID), 0) FROM SystemAccount a")
    Short findMaxAccountID();
}

