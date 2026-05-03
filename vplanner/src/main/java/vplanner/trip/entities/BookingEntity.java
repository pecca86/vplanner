package vplanner.trip.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import vplanner.trip.enums.BookingType;
import vplanner.trip.enums.PaymentStatus;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Data
@Entity
@Table(name = "booking")
public class BookingEntity {
    @Id
    @SequenceGenerator(
            name = "booking_sequence",
            sequenceName = "booking_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "booking_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name = "type",
            columnDefinition = "TEXT"
    )
    private String description;
    @Column(
            name = "booking_reference",
            columnDefinition = "TEXT"
    )
    private String bookingReference;
    @Column(
            name = "price",
            precision = 10,
            scale = 2,
            columnDefinition = "DECIMAL"
    )
    private BigDecimal price;
    @OneToMany(
            mappedBy = "booking",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<TripDocumentEntity> tripDocuments;
    @Column(
            name = "booking_type",
            nullable = false,
            columnDefinition = "TEXT"
    )
    @Enumerated(EnumType.STRING)
    private BookingType bookingType;
    @Column(
            name = "payment_status",
            nullable = false,
            columnDefinition = "TEXT"
    )
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    @Column(
            name = "payed_by",
            columnDefinition = "TEXT"
    )
    private String payedBy;

    @ManyToOne
    @JoinColumn(
            name = "trip_day_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "trip_day_fk"
            )
    )
    private TripDayEntity tripDay;

    public void addTripDocument(TripDocumentEntity tripDocument) {
        if (tripDocuments == null) {
            tripDocuments = new ArrayList<>();
        }
        tripDocument.setBooking(this);
        this.tripDocuments.add(tripDocument);
    }

    public void removeTripDocument(TripDocumentEntity tripDocument) {
        if (tripDocuments == null) {
            return;
        }
        this.tripDocuments.remove(tripDocument);
        tripDocument.setBooking(null);
    }

}
