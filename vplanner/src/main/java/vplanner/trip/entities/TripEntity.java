package vplanner.trip.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import vplanner.trip.enums.TripStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Data
@Entity
@Table(name = "trip")
public class TripEntity {

    @Id
    @SequenceGenerator(
            name = "trip_sequence",
            sequenceName = "trip_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "trip_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name = "title",
            columnDefinition = "TEXT"
    )
    private String title;
    @Column(
            name = "trip_start_date",
            nullable = false,
            columnDefinition = "DATE"
    )
    private LocalDate tripStartDate;
    @Column(
            name = "trip_end_date",
            nullable = false,
            columnDefinition = "DATE"
    )
    private LocalDate tripEndDate;

    @Column(
            name = "latitude",
            precision = 10,
            scale = 6,
            nullable = false,
            columnDefinition = "DECIMAL"
    )
    private BigDecimal latitude;
    @Column(
            name = "longitude",
            precision = 10,
            scale = 6,
            nullable = false,
            columnDefinition = "DECIMAL"
    )
    private BigDecimal longitude;

    @Column(
            name = "country",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String country;

    @Column(
            name = "city",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String city;

    @OneToMany(
            mappedBy = "trip",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<TripDayEntity> tripDays;

    @Column(
            name = "trip_status",
            nullable = false,
            columnDefinition = "TEXT"
    )
    @Enumerated(EnumType.STRING)
    private TripStatus tripStatus;

    public void addTripDay(TripDayEntity tripDay) {
        if (tripDays == null) {
            tripDays = new ArrayList<>();
        }

        this.tripDays.add(tripDay);
        tripDay.setTrip(this);
    }

    public void addtripDays(List<TripDayEntity> createdtripDays) {
        if (tripDays == null) {
            tripDays = new ArrayList<>();
        }

        tripDays.addAll(createdtripDays);
    }

    public void removeTripDay(TripDayEntity tripDay) {
        if (tripDays == null) {
            tripDays = new ArrayList<>();
        }

        if (tripDays.contains(tripDay)) {
            this.tripDays.remove(tripDay);
            tripDay.setTrip(null);
        }
    }

}
