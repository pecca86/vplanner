package vplanner.trip.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import vplanner.trip.enums.DocumentType;

@NoArgsConstructor
@Data
@Entity
@Table(name = "trip_document")
public class TripDocumentEntity {
    @Id
    @SequenceGenerator(
            name = "trip_document_sequence",
            sequenceName = "trip_document_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "trip_document_sequence"
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
            name = "url",
            columnDefinition = "TEXT"
    )
    private String url;
    @Column(
            name = "description",
            columnDefinition = "TEXT"
    )
    private String description;
    @Column(
            name = "reference",
            columnDefinition = "TEXT"
    )
    private String reference;
    @Column(
            name = "document_type",
            nullable = false,
            columnDefinition = "TEXT"
    )
    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    @ManyToOne
    @JoinColumn(
            name = "booking_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(
                    name = "booking_fk"
            )
    )
    private BookingEntity booking;

}
