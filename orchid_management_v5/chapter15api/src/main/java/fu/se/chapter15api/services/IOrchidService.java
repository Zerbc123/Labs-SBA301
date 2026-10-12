package fu.se.chapter15api.services;

import fu.se.chapter15api.pojos.Orchid;

import java.util.List;
import java.util.Optional;

public interface IOrchidService {
    List<Orchid> getAllOrchids();

    Optional<Orchid> getOrchidByID(int orchidID);

    Orchid insertOrchid(Orchid orchid);

    Orchid updateOrchid(int orchidID, Orchid orchid);

    void deleteOrchid(int orchidID);

    // Convenience alias methods
    List<Orchid> findAll();

    Optional<Orchid> findById(int orchidId);

    Orchid create(Orchid orchid);

    Optional<Orchid> update(int orchidId, Orchid input);

    boolean delete(int orchidId);
}
