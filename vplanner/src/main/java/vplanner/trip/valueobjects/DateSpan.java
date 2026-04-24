package vplanner.trip.valueobjects;

import java.time.LocalDateTime;

public record DateSpan(LocalDateTime start, LocalDateTime end) {

    public DateSpan {
        if (start == null) {
            throw new NullPointerException("start is null");
        }
        if (end == null) {
            throw new NullPointerException("end is null");
        }
        if (start.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("start date is in the past");
        }
        if (start.isBefore(end)) {
            throw new IllegalStateException("start date is before end date");
        }
    }
}
