package vplanner.trip.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vplanner.trip.dtos.LocationResponse;
import vplanner.trip.valueobjects.City;
import vplanner.trip.valueobjects.Coordinate;
import vplanner.trip.valueobjects.Country;
import vplanner.trip.valueobjects.Location;

import java.math.BigDecimal;

@RestController
@RequestMapping(path = "api/v1/trips")
public class TripController {

    @GetMapping
    public ResponseEntity<String> getTrips() {
        return ResponseEntity.ok("Get all trips");
    }

    @GetMapping("filter")
    public void findTripsByFilters() {
    }

    @PostMapping
    public void addTrip() {
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
        Coordinate coordinate = new Coordinate(new BigDecimal("60.1695"), new BigDecimal("24.9354"));
        Location location = new Location(country, city, coordinate);

        return ResponseEntity.ok(LocationResponse.from(location));
    }
}
