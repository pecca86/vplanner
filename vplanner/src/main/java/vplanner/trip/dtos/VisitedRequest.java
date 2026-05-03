package vplanner.trip.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import net.andreinc.jbvext.annotations.str.Alpha;

import java.math.BigDecimal;

public record VisitedRequest(@NotBlank @Alpha String city, @NotBlank @Alpha String country, @NotNull BigDecimal lat, @NotNull BigDecimal lng) {
}
