package vplanner.trip.controllers;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vplanner.trip.dtos.Trip;
import vplanner.trip.dtos.requests.AddTripRequest;
import vplanner.trip.dtos.responses.LocationResponse;
import vplanner.valueobjects.City;
import vplanner.valueobjects.Coordinates;
import vplanner.valueobjects.Country;
import vplanner.valueobjects.Location;

import java.math.BigDecimal;

@RestController
@RequestMapping(path = "api/v1/trips")
public class TripController {

    @GetMapping("{tripId}")
    public Trip findTripById(@PathVariable Long tripId) {
        return new Trip();
    }

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
    public ResponseEntity<AddTripRequest> addTrip(@RequestBody AddTripRequest addTripRequest) {
        return ResponseEntity.ok(addTripRequest);
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
