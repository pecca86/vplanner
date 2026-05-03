package vplanner.valueobjects;

import jakarta.validation.ConstraintViolationException;
import vplanner.expections.CityException;

public record City(String city) {

    public City {
        if (city == null) {
            throw new CityException("city cannot be null");
        }
        if (city.isBlank()) {
            throw new CityException("city is empty");
        }
        if (city.length() > 255) {
            throw new CityException("city is too long");
        }
    }
}
