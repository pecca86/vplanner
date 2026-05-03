package vplanner.trip.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Data
@Entity
@Table(name = "trip_day")
public class TripDayEntity {

    @Id
    @SequenceGenerator(
            name = "trip_day_sequence",
            sequenceName = "trip_day_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "trip_day_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name = "tags",
            columnDefinition = "TEXT[]"
    )
    private List<String> tags;
    @Column(
             name = "description",
             columnDefinition = "TEXT"
    )
    private String description;
    @Column(
            name = "imageUrls",
            columnDefinition = "TEXT[]"
    )
    private List<String> imageUrls;
    @OneToMany(
            mappedBy = "tripDay",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<BookingEntity> bookings;
    @Column(
            name = "date",
            columnDefinition = "DATE",
            nullable = false
    )
    private LocalDate date;
    @ManyToOne
    @JoinColumn(
            name = "trip_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "trip_fk"
            )
    )
    private TripEntity trip;

    public void addBooking(BookingEntity booking) {
        if (bookings == null) {
            bookings = new ArrayList<>();
        }

        this.bookings.add(booking);
        booking.setTripDay(this);
    }

    public void addBookings(List<BookingEntity> bookingsList) {
        if (bookings == null) {
            bookings = new ArrayList<>();
        }

        bookings.addAll(bookingsList);
    }

    public void removeBooking(BookingEntity booking) {
        if (bookings == null) {
            bookings = new ArrayList<>();
        }

        if (bookings.contains(booking)) {
            this.bookings.remove(booking);
            booking.setTripDay(null);
        }
    }

}
