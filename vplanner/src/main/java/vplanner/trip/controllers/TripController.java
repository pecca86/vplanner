package vplanner.trip.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vplanner.trip.dtos.requests.CreateTripRequest;
import vplanner.trip.dtos.responses.CreateTripResponse;
import vplanner.trip.dtos.responses.LocationResponse;
import vplanner.trip.services.TripService;
import vplanner.valueobjects.City;
import vplanner.valueobjects.Coordinates;
import vplanner.valueobjects.Country;

import java.math.BigDecimal;

@RestController
@RequestMapping(path = "api/v1/trips")
public class TripController {

    private TripService tripService;

    @Autowired
    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

//    @GetMapping("{tripId}")
//    public Trip findTripById(@PathVariable Long tripId) {
//        return new Trip();
//    }

    @GetMapping("filter")
    public void findTripsByFilters() {
        // city
        // coordinates
        // country
        // travelPartners
        // past
        // current
    }

    @PostMapping
    public ResponseEntity<CreateTripResponse> createTrip(@RequestBody CreateTripRequest createTripRequest) {
        return ResponseEntity.ok(tripService.createTrip(createTripRequest));
    }

    @DeleteMapping
    public void deleteTrip() {
    }

    @PutMapping
    public void updateTrip() {
    }

    @GetMapping("location")
    public ResponseEntity<LocationResponse> getLocation() {
        City city = new City("Helsinki");
        Country country = new Country("Finland");
        Coordinates coordinates = new Coordinates(new BigDecimal("60.1695"), new BigDecimal("24.9354"));
//        Location location = new Location(country, city, coordinates);

//        return ResponseEntity.ok(LocationResponse.from(location));
        return null;
    }
}
