package vplanner.valueobjects;

import vplanner.expections.CountryException;

public record Country(String country) {

    public Country {
        if (country == null) {
            throw new CountryException("country is null");
        }
        if (country.isBlank()) {
            throw new CountryException("country is empty");
        }
        if (country.length() > 255) {
            throw new CountryException("country is too long");
        }
    }
}
