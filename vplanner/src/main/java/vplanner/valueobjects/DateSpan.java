package vplanner.valueobjects;

import vplanner.expections.DateException;

import java.time.LocalDate;

public record DateSpan(LocalDate startDate, LocalDate endDate) {

    public DateSpan {
        if (startDate == null) {
            throw new DateException("startDate is null");
        }
        if (endDate == null) {
            throw new DateException("endDate is null");
        }
        if (startDate.isAfter(endDate)) {
            throw new DateException("startDate must be before endDate");
        }
    }
}
