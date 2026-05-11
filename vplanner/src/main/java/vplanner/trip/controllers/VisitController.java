package vplanner.trip.controllers;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vplanner.trip.dtos.VisitedRequest;
import vplanner.trip.dtos.VisitedResponse;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/visited")
@Validated
public class VisitController {

    public void getVisitedPlaces() {}

    @PostMapping
    public ResponseEntity<VisitedResponse> markAsVisited(@RequestBody @Valid VisitedRequest request) {
        return ResponseEntity.ok(new VisitedResponse(request.city(), request.country(), request.lat(), request.lng(), 1));
    }

    public void unmarkAsVisited(long visitId) {}

    public void getVisitStatistics(int year, int month) {}

    @PostMapping
    public ResponseEntity<List<VisitedResponse>> getAllVisits(int year, int month) {
        return ResponseEntity.ok(
                List.of(new VisitedResponse("Helsinki", "Finland", BigDecimal.ONE, BigDecimal.TEN, 1))
        );
    }
}
