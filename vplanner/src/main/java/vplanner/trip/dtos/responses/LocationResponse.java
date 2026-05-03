package vplanner.trip.dtos.responses;

import vplanner.valueobjects.Location;

import java.math.BigDecimal;

public record LocationResponse(String city, String country, BigDecimal lat, BigDecimal lng) {

    public static LocationResponse from(Location location) {
        return new LocationResponse(location.city(), location.country(), location.coordinates().lat(), location.coordinates().lng());
//        return new LocationResponse(location.city().city(), location.country().country(), location.coordinates().lat(), location.coordinates().lng());
    }
}
