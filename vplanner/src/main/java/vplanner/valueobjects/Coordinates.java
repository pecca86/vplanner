package vplanner.valueobjects;

import jakarta.validation.ConstraintViolationException;
import jakarta.validation.constraints.NotNull;
import vplanner.expections.CoordinateException;

import java.math.BigDecimal;

public record Coordinates(@NotNull BigDecimal lat, @NotNull BigDecimal lng) {

    public Coordinates {
        if (lat == null) {
            throw new CoordinateException("lat is null");
        }
        if (lng == null) {
            throw new CoordinateException("lng is null");
        }
        if (lat.compareTo(BigDecimal.valueOf(-90)) < 0 || lat.compareTo(BigDecimal.valueOf(90)) > 0) {
            throw new CoordinateException("lat is out of range");
        }
        if (lng.compareTo(BigDecimal.valueOf(-180)) < 0 || lng.compareTo(BigDecimal.valueOf(180)) > 0) {
            throw new CoordinateException("lng is out of range");
        }
    }
}
