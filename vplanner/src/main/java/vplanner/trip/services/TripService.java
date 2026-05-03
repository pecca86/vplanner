package vplanner.trip.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vplanner.trip.dtos.requests.CreateTripRequest;
import vplanner.trip.dtos.responses.CreateTripResponse;
import vplanner.trip.entities.TripEntity;
import vplanner.trip.repositories.TripRepository;

@Service
public class TripService {

    private final TripRepository tripRepository;

    @Autowired
    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public CreateTripResponse createTrip(CreateTripRequest tripRequest) {
        TripEntity tripEntity = new TripEntity(tripRequest);
        TripEntity saved = tripRepository.save(tripEntity);
        return CreateTripResponse.from(saved);
    }
}
