package vplanner.trip.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import vplanner.trip.dtos.requests.CreateTripRequest;
import vplanner.trip.dtos.responses.TripResponse;
import vplanner.trip.entities.TripEntity;
import vplanner.trip.repositories.TripRepository;

@Service
public class TripService {

    private final TripRepository tripRepository;

    @Autowired
    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public TripResponse createTrip(CreateTripRequest tripRequest) {
        TripEntity tripEntity = TripEntity.create(tripRequest);
        TripEntity saved = tripRepository.save(tripEntity);
        return TripResponse.from(saved);
    }

    public TripResponse findTripById(Long tripId) {
        TripEntity tripEntity = tripRepository.findById(tripId).orElse(null);
        if (tripEntity == null) {
            throw new ResourceNotFoundException("trip not found");
        }
        return TripResponse.from(tripEntity);
    }
}
