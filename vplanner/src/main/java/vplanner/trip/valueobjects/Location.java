package vplanner.trip.valueobjects;

public record Location(Country country, City city, Coordinate coordinate) {

    public Location {
        if (country == null) {
            throw new NullPointerException("country is null");
        }
        if (city == null) {
            throw new NullPointerException("city is null");
        }
        if (coordinate == null) {
            throw new NullPointerException("coordinate is null");
        }
    }
}
