package vplanner.trip.dtos;

import vplanner.trip.valueobjects.Location;

import java.math.BigDecimal;

public record LocationResponse(String city, String country, BigDecimal lat, BigDecimal lng) {

    public static LocationResponse from(Location location) {
        return new LocationResponse(location.city().city(), location.country().country(), location.coordinate().lat(), location.coordinate().lng());
    }
}
