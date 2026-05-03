package vplanner.valueobjects;

import jakarta.validation.constraints.NotNull;
import vplanner.expections.CityException;
import vplanner.expections.CoordinateException;
import vplanner.expections.CountryException;

public record Location(String country, @NotNull String city, @NotNull Coordinates coordinates) {

    public Location {
        if (country == null) {
            throw new CountryException("country is null");
        }
        if (city == null) {
            throw new CityException("city is null");
        }
        if (coordinates == null) {
            throw new CoordinateException("coordinate is null");
        }
    }
}
