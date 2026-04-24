package vplanner.trip.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/trips")
public class TripController {

    @GetMapping
    public ResponseEntity<String> getTrips() {
        return ResponseEntity.ok("Get all trips");
    }

    @GetMapping("filter")
    public void findTripsByFilters() {}

    @PostMapping
    public void addTrip() {}

    @DeleteMapping
    public void deleteTrip() {}

    @PutMapping
    public void updateTrip() {}
}
