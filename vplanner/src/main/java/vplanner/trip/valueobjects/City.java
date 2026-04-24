package vplanner.trip.valueobjects;

public record City(String city) {

    public City {
        if (city == null) {
            throw new NullPointerException("city");
        }
        if (city.isBlank()) {
            throw new IllegalStateException("city is empty");
        }
        if (city.length() > 255) {
            throw new IllegalStateException("city is too long");
        }
    }
}
