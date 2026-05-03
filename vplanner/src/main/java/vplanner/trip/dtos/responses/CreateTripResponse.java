package vplanner.trip.dtos.responses;

import vplanner.trip.entities.TripEntity;
import vplanner.trip.enums.TripStatus;
import vplanner.valueobjects.Coordinates;
import vplanner.valueobjects.DateSpan;
import vplanner.valueobjects.Location;

import java.time.LocalDate;

public record CreateTripResponse(
        Long tripId,
        String title,
        DateSpan dateSpan,
        Location location,
        int tripDays,
        TripStatus tripStatus
) {
    public static CreateTripResponse from(TripEntity tripEntity) {
        return new CreateTripResponse(
                tripEntity.getId(),
                tripEntity.getTitle(),
                new DateSpan(
                        tripEntity.getTripStartDate(),
                        tripEntity.getTripEndDate()
                ),
                new Location(
                        tripEntity.getCountry(),
                        tripEntity.getCity(),
                        new Coordinates(tripEntity.getLatitude(), tripEntity.getLongitude())
                ),
                calcTripDays(tripEntity.getTripStartDate(), tripEntity.getTripEndDate()),
                TripStatus.PENDING
        );
    }

    private static int calcTripDays(LocalDate tripStartDate, LocalDate tripEndDate) {
        return (int) (tripEndDate.toEpochDay() - tripStartDate.toEpochDay()) + 1;
    }
}
