package vplanner.trip.dtos.requests;

import jakarta.validation.constraints.NotNull;
import vplanner.valueobjects.DateSpan;
import vplanner.valueobjects.Location;

public record CreateTripRequest(
        String title,
        String description,
        @NotNull DateSpan dateSpan,
        @NotNull Location location) {}
