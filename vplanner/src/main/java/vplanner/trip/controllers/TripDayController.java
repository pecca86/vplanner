package vplanner.trip.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vplanner.trip.TripDay;

import java.util.UUID;

@RestController
@RequestMapping(path = "api/v1/trips/{tripId}")
public class TripDayController {

    public void addTripDay(@PathVariable UUID tripId, TripDay tripDay) {}
    public void getTripDay() {}
    public void getTripDays() {}
    public void updateTripDay(TripDay tripDay) {}
    public void deleteTripDay(TripDay tripDay) {}
}
