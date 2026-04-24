package vplanner.trip.valueobjects;

public record Country(String country) {

    public Country {
        if (country == null) {
            throw new IllegalStateException("country is null");
        }
        if (country.isBlank()) {
            throw new IllegalStateException("country is empty");
        }
        if (country.length() > 255) {
            throw new IllegalStateException("country is too long");
        }
    }
}
