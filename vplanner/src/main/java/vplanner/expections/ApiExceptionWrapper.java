package vplanner.expections;

public class ApiExceptionWrapper extends RuntimeException {
    public ApiExceptionWrapper(String message) {
        super(message);
    }

    public ApiExceptionWrapper(String message, Throwable cause) {
        super(message, cause);
    }
}
