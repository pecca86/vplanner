package vplanner.trip.controllers;

import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vplanner.trip.dtos.VisitedRequest;
import vplanner.trip.dtos.VisitedResponse;

@RestController
@RequestMapping(path = "api/v1/visited")
@Validated
public class VisitController {

    public void getVisitedPlaces() {}

    @PostMapping
    public VisitedResponse markAsVisited(@RequestBody @Valid VisitedRequest request) {
        return new VisitedResponse(request.city(), request.country(), request.lat(), request.lng(), 1);
    }
    public void unmarkAsVisited() {}
    public void getVisitStatistics() {}
}
