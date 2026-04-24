package vplanner.trip.valueobjects;

import java.math.BigDecimal;

public record Coordinate(BigDecimal lat, BigDecimal lng) {

    public Coordinate {
        if (lat == null) {
            throw new NullPointerException("lat is null");
        }
        if (lng == null) {
            throw new NullPointerException("lng is null");
        }
        if (lat.compareTo(BigDecimal.valueOf(-90)) < 0 || lat.compareTo(BigDecimal.valueOf(90)) > 0) {
            throw new IllegalStateException("lat is out of range");
        }
        if (lng.compareTo(BigDecimal.valueOf(-180)) < 0 || lng.compareTo(BigDecimal.valueOf(180)) > 0) {
            throw new IllegalStateException("lng is out of range");
        }
    }
}
