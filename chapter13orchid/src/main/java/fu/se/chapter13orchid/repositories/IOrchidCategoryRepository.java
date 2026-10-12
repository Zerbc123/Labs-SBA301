package fu.se.chapter13orchid.repositories;

import fu.se.chapter13orchid.pojos.OrchidCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrchidCategoryRepository extends JpaRepository<OrchidCategory, Long> {}
