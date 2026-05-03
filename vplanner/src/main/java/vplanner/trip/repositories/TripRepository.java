package vplanner.trip.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vplanner.trip.entities.TripEntity;

@Repository
public interface TripRepository extends JpaRepository<TripEntity, Long> {

//    @Transactional
//    void createTrip(TripEntity tripEntity);

}
