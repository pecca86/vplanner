package vplanner.trip.dtos.responses;

import vplanner.trip.dtos.Trip;
import vplanner.trip.entities.TripEntity;

import java.time.LocalDate;

public record TripResponse(Trip trip, int tripDays) {
    
    public static TripResponse from(TripEntity tripEntity) {
        return new TripResponse(
                Trip.from(tripEntity),
                calcTripDays(tripEntity.getTripStartDate(), tripEntity.getTripEndDate())
        );
    }

    private static int calcTripDays(LocalDate tripStartDate, LocalDate tripEndDate) {
        return (int) (tripEndDate.toEpochDay() - tripStartDate.toEpochDay()) + 1;
    }
}
