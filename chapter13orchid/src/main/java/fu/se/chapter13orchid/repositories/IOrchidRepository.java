package fu.se.chapter13orchid.repositories;

import fu.se.chapter13orchid.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrchidRepository extends JpaRepository<Orchid, Long> {
    List<Orchid> findByOrchidNameContainingIgnoreCase(String name);
}
