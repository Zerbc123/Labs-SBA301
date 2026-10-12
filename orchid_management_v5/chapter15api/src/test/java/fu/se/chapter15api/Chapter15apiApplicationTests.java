package fu.se.chapter15api;

import fu.se.chapter15api.pojos.Orchid;
import fu.se.chapter15api.repositories.IOrchidRepository;
import fu.se.chapter15api.services.IOrchidService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class Chapter15apiApplicationTests {

    @Autowired
    private IOrchidService orchidService;

    @Autowired
    private IOrchidRepository orchidRepository;

    @BeforeEach
    void setUp() {
        orchidRepository.deleteAll();
    }

    @Test
    void contextLoads() {
        assertNotNull(orchidService);
        assertNotNull(orchidRepository);
    }

    @Test
    void testCreateAndFindAll() {
        Orchid o = new Orchid();
        o.setOrchidName("Phalaenopsis Bellina");
        o.setNatural(true);
        o.setOrchidCategory("Phalaenopsis");
        o.setOrchidDescription("Highly fragrant species orchid.");
        o.setAttractive(true);
        o.setOrchidURL("https://example.com/bellina.jpg");

        Orchid saved = orchidService.insertOrchid(o);
        assertNotNull(saved.getOrchidId());
        assertEquals("Phalaenopsis Bellina", saved.getOrchidName());

        List<Orchid> list = orchidService.getAllOrchids();
        assertEquals(1, list.size());
    }

    @Test
    void testFindById() {
        Orchid o = new Orchid();
        o.setOrchidName("Cattleya Walkeriana");
        o.setNatural(true);
        o.setOrchidCategory("Cattleya");
        o.setOrchidDescription("Miniature Cattleya.");
        o.setAttractive(true);
        o.setOrchidURL("https://example.com/walkeriana.jpg");

        Orchid saved = orchidService.insertOrchid(o);
        Optional<Orchid> found = orchidService.getOrchidByID(saved.getOrchidId());
        assertTrue(found.isPresent());
        assertEquals("Cattleya Walkeriana", found.get().getOrchidName());
    }

    @Test
    void testUpdateOrchid() {
        Orchid o = new Orchid();
        o.setOrchidName("Vanda Coerulea");
        o.setNatural(true);
        o.setOrchidCategory("Vanda");
        o.setAttractive(false);

        Orchid saved = orchidService.insertOrchid(o);

        Orchid updateData = new Orchid();
        updateData.setOrchidName("Vanda Coerulea Blue");
        updateData.setNatural(false);
        updateData.setOrchidCategory("Vanda Hybrid");
        updateData.setAttractive(true);
        updateData.setOrchidDescription("Blue orchid hybrid.");
        updateData.setOrchidURL("https://example.com/vanda.jpg");

        Orchid updated = orchidService.updateOrchid(saved.getOrchidId(), updateData);
        assertEquals("Vanda Coerulea Blue", updated.getOrchidName());
        assertEquals("Vanda Hybrid", updated.getOrchidCategory());
        assertTrue(updated.isAttractive());
        assertFalse(updated.isNatural());
    }

    @Test
    void testDeleteOrchid() {
        Orchid o = new Orchid();
        o.setOrchidName("Paphiopedilum Rothschildianum");
        o.setNatural(true);
        o.setOrchidCategory("Paphiopedilum");

        Orchid saved = orchidService.insertOrchid(o);
        int id = saved.getOrchidId();

        orchidService.deleteOrchid(id);
        assertTrue(orchidService.getOrchidByID(id).isEmpty());
    }
}
