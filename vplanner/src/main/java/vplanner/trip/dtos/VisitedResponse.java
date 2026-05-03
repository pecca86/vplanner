package vplanner.trip.dtos;

import org.jetbrains.annotations.NotNull;

import java.math.BigDecimal;

public record VisitedResponse(String city, String country, @NotNull BigDecimal lat, @NotNull BigDecimal lng, int visitedCount) {
}
