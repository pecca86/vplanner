package vplanner.trip.dtos;

import vplanner.trip.entities.TripEntity;
import vplanner.trip.enums.TripStatus;
import vplanner.valueobjects.Coordinates;
import vplanner.valueobjects.DateSpan;
import vplanner.valueobjects.Location;

public record Trip(
        long id,
        String title,
        DateSpan dateSpan,
        Location location,
        TripStatus tripStatus
) {
    public static Trip from(TripEntity tripEntity) {
        return new Trip(
                tripEntity.getId(),
                tripEntity.getTitle(),
                new DateSpan(tripEntity.getTripStartDate(), tripEntity.getTripEndDate()),
                new Location(
                        tripEntity.getCountry(),
                        tripEntity.getCity(),
                        new Coordinates(tripEntity.getLatitude(), tripEntity.getLongitude())
                ),
                tripEntity.getTripStatus()
        );
    }
}