import { useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { TRIPS } from "../data/trips";
import type { Trip, TripDay, Booking, TripDocument, LocationData } from "../data/trips";
import Modal from "./Modal";
import styles from "./TripDetail.module.css";
import Button from "./Button";

// ── Utilities ─────────────────────────────────────────────

function getDaysInRange(start: string, end: string): string[] {
    const result: string[] = [];
    const current = new Date(start + "T00:00:00");
    const endDate = new Date(end + "T00:00:00");
    while (current <= endDate) {
        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, "0");
        const d = String(current.getDate()).padStart(2, "0");
        result.push(`${y}-${m}-${d}`);
        current.setDate(current.getDate() + 1);
    }
    return result;
}

function formatDate(iso: string): string {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

const BOOKING_TYPES: Booking["type"][] = ["FLIGHT", "HOTEL", "ACTIVITY", "TRAIN", "RENTAL_CAR"];
const DOC_TYPES: TripDocument["type"][] = ["TICKET", "RESERVATION", "OTHER"];
const PAYMENT_STATUSES: NonNullable<Booking["paymentStatus"]>[] = ["PAID", "PENDING", "CANCELLED"];

// ── AddDocumentForm ───────────────────────────────────────

interface AddDocumentFormProps {
    onAdd: (doc: TripDocument) => void;
    onCancel: () => void;
}

function AddDocumentForm({ onAdd, onCancel }: AddDocumentFormProps) {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [type, setType] = useState<TripDocument["type"]>("TICKET");
    const [reference, setReference] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !url.trim()) return;
        onAdd({ name: name.trim(), url: url.trim(), type, reference: reference.trim() || undefined });
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input className={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Boarding Pass" required />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>URL</label>
                <input className={styles.input} value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." required />
            </div>
            <div className={styles.twoCol}>
                <div className={styles.field}>
                    <label className={styles.label}>Type</label>
                    <select className={styles.select} value={type} onChange={e => setType(e.target.value as TripDocument["type"])}>
                        {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Reference</label>
                    <input className={styles.input} value={reference} onChange={e => setReference(e.target.value)} placeholder="Optional reference" />
                </div>
            </div>
            <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Add document</button>
            </div>
        </form>
    );
}

// ── AddBookingForm ────────────────────────────────────────

interface AddBookingFormProps {
    onAdd: (booking: Booking) => void;
    onCancel: () => void;
}

function AddBookingForm({ onAdd, onCancel }: AddBookingFormProps) {
    const [type, setType] = useState<Booking["type"]>("FLIGHT");
    const [details, setDetails] = useState("");
    const [bookingReference, setBookingReference] = useState("");
    const [price, setPrice] = useState("");
    const [paymentStatus, setPaymentStatus] = useState<Booking["paymentStatus"]>("PENDING");
    const [payedBy, setPayedBy] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onAdd({
            type,
            details: details.trim(),
            bookingReference: bookingReference.trim() || undefined,
            price: price ? Number(price) : undefined,
            paymentStatus,
            payedBy: payedBy.trim() || undefined,
            documents: [],
        });
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label className={styles.label}>Type</label>
                <select className={styles.select} value={type} onChange={e => setType(e.target.value as Booking["type"])}>
                    {BOOKING_TYPES.map(t => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
                </select>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Details</label>
                <textarea className={styles.textarea} value={details} onChange={e => setDetails(e.target.value)} rows={3} placeholder="Booking details..." required />
            </div>
            <div className={styles.twoCol}>
                <div className={styles.field}>
                    <label className={styles.label}>Booking reference</label>
                    <input className={styles.input} value={bookingReference} onChange={e => setBookingReference(e.target.value)} placeholder="e.g. ABC123" />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Price</label>
                    <input className={styles.input} type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" min="0" />
                </div>
            </div>
            <div className={styles.twoCol}>
                <div className={styles.field}>
                    <label className={styles.label}>Payment status</label>
                    <select className={styles.select} value={paymentStatus} onChange={e => setPaymentStatus(e.target.value as Booking["paymentStatus"])}>
                        {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Paid by</label>
                    <input className={styles.input} value={payedBy} onChange={e => setPayedBy(e.target.value)} placeholder="Name" />
                </div>
            </div>
            <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Add booking</button>
            </div>
        </form>
    );
}

// ── BookingCard ───────────────────────────────────────────

interface BookingCardProps {
    booking: Booking;
    onUpdate: (updater: (b: Booking) => Booking) => void;
    onDelete: () => void;
    onAddDocument: () => void;
    onDeleteDocument: (index: number) => void;
}

function BookingCard({ booking, onUpdate, onDelete, onAddDocument, onDeleteDocument }: BookingCardProps) {
    return (
        <div className={styles.bookingCard}>
            <div className={styles.bookingHeader}>
                <select
                    className={styles.bookingTypeSelect}
                    value={booking.type}
                    onChange={e => onUpdate(b => ({ ...b, type: e.target.value as Booking["type"] }))}
                >
                    {BOOKING_TYPES.map(t => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
                </select>
                <button className={styles.deleteBtn} onClick={onDelete}>Delete</button>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Details</label>
                <textarea
                    className={styles.textarea}
                    value={booking.details}
                    onChange={e => onUpdate(b => ({ ...b, details: e.target.value }))}
                    rows={2}
                />
            </div>

            <div className={styles.twoCol}>
                <div className={styles.field}>
                    <label className={styles.label}>Reference</label>
                    <input
                        className={styles.input}
                        value={booking.bookingReference ?? ""}
                        onChange={e => onUpdate(b => ({ ...b, bookingReference: e.target.value }))}
                        placeholder="Booking ref"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Price</label>
                    <input
                        className={styles.input}
                        type="number"
                        value={booking.price ?? ""}
                        onChange={e => onUpdate(b => ({ ...b, price: e.target.value ? Number(e.target.value) : undefined }))}
                        placeholder="0.00"
                        min="0"
                    />
                </div>
            </div>

            <div className={styles.twoCol}>
                <div className={styles.field}>
                    <label className={styles.label}>Payment status</label>
                    <select
                        className={styles.select}
                        value={booking.paymentStatus ?? ""}
                        onChange={e => onUpdate(b => ({ ...b, paymentStatus: e.target.value as Booking["paymentStatus"] }))}
                    >
                        <option value="">— Select —</option>
                        {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Paid by</label>
                    <input
                        className={styles.input}
                        value={booking.payedBy ?? ""}
                        onChange={e => onUpdate(b => ({ ...b, payedBy: e.target.value }))}
                        placeholder="Name"
                    />
                </div>
            </div>

            <div className={styles.docsSection}>
                <span className={styles.docsLabel}>Documents</span>
                {(booking.documents ?? []).map((doc, di) => (
                    <div key={di} className={styles.docRow}>
                        <span className={styles.docName}>{doc.name}</span>
                        <span className={styles.docType}>{doc.type}</span>
                        {doc.reference && <span className={styles.docRef}>#{doc.reference}</span>}
                        <a className={styles.docLink} href={doc.url} target="_blank" rel="noreferrer">View</a>
                        <button className={styles.docDeleteBtn} onClick={() => onDeleteDocument(di)}>✕</button>
                    </div>
                ))}
                <button type="button" className={styles.addSmallBtn} onClick={onAddDocument}>+ Add document</button>
            </div>
        </div>
    );
}

// ── DayMapPicker ──────────────────────────────────────────

function DayClickCapture({ onPick }: { onPick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onPick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

interface DayMapPickerProps {
    locations: LocationData[] | undefined;
    onLocationAdd: (loc: LocationData) => void;
    onLocationRemove: (index: number) => void;
    defaultCenter?: [number, number];
}

function DayMapPicker({ locations, onLocationAdd, onLocationRemove, defaultCenter }: DayMapPickerProps) {
    const center: [number, number] = defaultCenter ?? [40, 0];

    return (
        <div className={styles.dayMapWrapper}>
            <MapContainer center={center} zoom={4} scrollWheelZoom className={styles.dayMap}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {(locations ?? []).map((loc, i) => (
                    <Marker key={i} position={[loc.lat, loc.lng]}>
                        <Popup>
                            <Button onClick={() => onLocationRemove(i)} label="Remove pin" />
                        </Popup>
                    </Marker>
                ))}
                <DayClickCapture
                    onPick={(lat, lng) =>
                        onLocationAdd({ lat, lng, name: "", city: "", country: "" })
                    }
                />
            </MapContainer>
            {(locations ?? []).length > 0 && (
                <p className={styles.dayMapHint}>
                    {(locations ?? []).length} pin{(locations ?? []).length !== 1 ? "s" : ""} — click a marker to remove it
                </p>
            )}
            {(locations ?? []).length === 0 && (
                <p className={styles.dayMapHint}>Click on the map to pin a location for this day</p>
            )}
        </div>
    );
}

// ── DaySection ────────────────────────────────────────────

interface DaySectionProps {
    dayNumber: number;
    date: string;
    tripDay: TripDay | undefined;
    isOpen: boolean;
    onToggle: () => void;
    onUpdate: (updater: (d: TripDay) => TripDay) => void;
    onImageClick: (url: string) => void;
    onAddDocument: (bookingIdx: number) => void;
    onAddBooking: () => void;
    mapCenter?: [number, number];
}

function DaySection({ dayNumber, date, tripDay, isOpen, onToggle, onUpdate, onImageClick, onAddDocument, onAddBooking, mapCenter }: DaySectionProps) {
    const [addImageUrl, setAddImageUrl] = useState("");
    const [addTag, setAddTag] = useState("");

    const hasData = !!(tripDay && (
        tripDay.description ||
        tripDay.tags.length > 0 ||
        tripDay.images.length > 0 ||
        tripDay.bookings.length > 0
    ));

    return (
        <div className={`${styles.daySection} ${isOpen ? styles.daySectionOpen : ""}`}>
            <button className={styles.dayHeader} onClick={onToggle}>
                <div className={styles.dayHeaderLeft}>
                    <span className={styles.dayNumber}>Day {dayNumber}</span>
                    <span className={styles.dayDate}>{formatDate(date)}</span>
                </div>
                <div className={styles.dayHeaderRight}>
                    {hasData && <span className={styles.plannedDot} title="Planned" />}
                    <span className={styles.chevron}>{isOpen ? "▲" : "▼"}</span>
                </div>
            </button>

            {isOpen && (
                <div className={styles.dayContent}>
                    {!hasData && (
                        <p className={styles.notPlanned}>Day not planned yet. Fill in the fields below to get started.</p>
                    )}

                    <div className={styles.field}>
                        <label className={styles.label}>Tags</label>
                        <div className={styles.tagRow}>
                            {(tripDay?.tags ?? []).map((tag, i) => (
                                <span key={i} className={styles.tag}>
                                    {tag}
                                    <button
                                        type="button"
                                        className={styles.tagRemove}
                                        onClick={() => onUpdate(d => ({ ...d, tags: d.tags.filter((_, ti) => ti !== i) }))}
                                    >✕</button>
                                </span>
                            ))}
                            <input
                                className={styles.tagInput}
                                value={addTag}
                                onChange={e => setAddTag(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter" && addTag.trim()) {
                                        e.preventDefault();
                                        onUpdate(d => ({ ...d, tags: [...d.tags, addTag.trim()] }));
                                        setAddTag("");
                                    }
                                }}
                                placeholder="Add tag, press Enter"
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Description</label>
                        <textarea
                            className={styles.textarea}
                            value={tripDay?.description ?? ""}
                            onChange={e => onUpdate(d => ({ ...d, description: e.target.value }))}
                            rows={4}
                            placeholder="Describe your day..."
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Location pins</label>
                        <DayMapPicker
                            locations={tripDay?.locationData}
                            onLocationAdd={(loc) => onUpdate(d => ({ ...d, locationData: [...(d.locationData ?? []), loc] }))}
                            onLocationRemove={(i) => onUpdate(d => ({ ...d, locationData: (d.locationData ?? []).filter((_, li) => li !== i) }))}
                            defaultCenter={mapCenter}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Images</label>
                        {(tripDay?.images ?? []).length > 0 && (
                            <div className={styles.gallery}>
                                {(tripDay?.images ?? []).map((img, i) => (
                                    <div key={i} className={styles.thumb}>
                                        <img
                                            src={img}
                                            alt=""
                                            className={styles.thumbImg}
                                            onClick={() => onImageClick(img)}
                                        />
                                        <button
                                            type="button"
                                            className={styles.thumbDelete}
                                            onClick={() => onUpdate(d => ({ ...d, images: d.images.filter((_, ii) => ii !== i) }))}
                                        >✕</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={styles.addImgRow}>
                            <input
                                className={styles.input}
                                value={addImageUrl}
                                onChange={e => setAddImageUrl(e.target.value)}
                                placeholder="Paste image URL..."
                            />
                            <button
                                type="button"
                                className={styles.addSmallBtn}
                                onClick={() => {
                                    if (addImageUrl.trim()) {
                                        onUpdate(d => ({ ...d, images: [...d.images, addImageUrl.trim()] }));
                                        setAddImageUrl("");
                                    }
                                }}
                            >Add image</button>
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Bookings</label>
                        {(tripDay?.bookings ?? []).map((booking, bi) => (
                            <BookingCard
                                key={bi}
                                booking={booking}
                                onUpdate={(updater) => onUpdate(d => ({
                                    ...d,
                                    bookings: d.bookings.map((b, i) => i === bi ? updater(b) : b),
                                }))}
                                onDelete={() => onUpdate(d => ({
                                    ...d,
                                    bookings: d.bookings.filter((_, i) => i !== bi),
                                }))}
                                onAddDocument={() => onAddDocument(bi)}
                                onDeleteDocument={(di) => onUpdate(d => ({
                                    ...d,
                                    bookings: d.bookings.map((b, i) =>
                                        i === bi
                                            ? { ...b, documents: b.documents?.filter((_, dii) => dii !== di) }
                                            : b
                                    ),
                                }))}
                            />
                        ))}
                        <button type="button" className={styles.addBtn} onClick={onAddBooking}>+ Add booking</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── TripDetailInner ───────────────────────────────────────

function TripDetailInner({ initialTrip }: { initialTrip: Trip }) {
    const navigate = useNavigate();
    const [trip, setTrip] = useState<Trip>(initialTrip);
    const [openDays, setOpenDays] = useState<Set<string>>(new Set());
    const [lightboxImg, setLightboxImg] = useState<string | null>(null);
    const [docModal, setDocModal] = useState<{ dayDate: string; bookingIdx: number } | null>(null);
    const [bookingModal, setBookingModal] = useState<string | null>(null);

    function updateTrip(updater: (t: Trip) => Trip) {
        setTrip(updater);
    }

    function updateDay(date: string, updater: (d: TripDay) => TripDay) {
        setTrip(prev => {
            const existingDays = prev.tripDays ?? [];
            const exists = existingDays.some(d => d.date === date);
            const emptyDay: TripDay = { date, tags: [], description: "", images: [], bookings: [] };
            const newDays = exists
                ? existingDays.map(d => d.date === date ? updater(d) : d)
                : [...existingDays, updater(emptyDay)];
            return { ...prev, tripDays: newDays };
        });
    }

    function toggleDay(date: string) {
        setOpenDays(prev => {
            const next = new Set(prev);
            if (next.has(date)) {
                next.delete(date);
            } else {
                next.add(date);
            }
            return next;
        });
    }

    const allDays = trip.dateSpan
        ? getDaysInRange(trip.dateSpan.start, trip.dateSpan.end)
        : [];

    const plannedCount = trip.tripDays?.length ?? 0;
    const bookingCount = trip.tripDays?.reduce((acc, d) => acc + d.bookings.length, 0) ?? 0;

    return (
        <div className={styles.container}>
            {/* Trip header */}
            <div className={styles.header}>
                <button
                    className={styles.backBtn}
                    onClick={() => navigate({
                        to: "/",
                        search: {
                            lat: trip.locationData?.lat,
                            lng: trip.locationData?.lng,
                        },
                    })}
                >
                    ← Show on map
                </button>

                <input
                    className={styles.titleInput}
                    value={trip.locationData?.name ?? ""}
                    onChange={e => updateTrip(t => ({
                        ...t,
                        locationData: t.locationData
                            ? { ...t.locationData, name: e.target.value }
                            : { name: e.target.value, city: "", country: "", lat: 0, lng: 0 },
                    }))}
                    placeholder="Trip name"
                />

                <div className={styles.locationRow}>
                    <div className={styles.field}>
                        <label className={styles.label}>City</label>
                        <input
                            className={styles.input}
                            value={trip.locationData?.city ?? ""}
                            onChange={e => updateTrip(t => ({
                                ...t,
                                locationData: t.locationData
                                    ? { ...t.locationData, city: e.target.value }
                                    : { name: "", city: e.target.value, country: "", lat: 0, lng: 0 },
                            }))}
                            placeholder="City"
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Country</label>
                        <input
                            className={styles.input}
                            value={trip.locationData?.country ?? ""}
                            onChange={e => updateTrip(t => ({
                                ...t,
                                locationData: t.locationData
                                    ? { ...t.locationData, country: e.target.value }
                                    : { name: "", city: "", country: e.target.value, lat: 0, lng: 0 },
                            }))}
                            placeholder="Country"
                        />
                    </div>
                </div>

                <div className={styles.dateRow}>
                    <div className={styles.dateField}>
                        <label className={styles.label}>From</label>
                        <DatePicker
                            selected={trip.dateSpan?.start ? new Date(trip.dateSpan.start + "T00:00:00") : null}
                            onChange={(date: Date | null) => date && updateTrip(t => ({
                                ...t,
                                dateSpan: { start: date.toISOString().split("T")[0], end: t.dateSpan?.end ?? "" },
                            }))}
                            className={styles.dateInput}
                            placeholderText="Start date"
                        />
                    </div>
                    <div className={styles.dateField}>
                        <label className={styles.label}>To</label>
                        <DatePicker
                            selected={trip.dateSpan?.end ? new Date(trip.dateSpan.end + "T00:00:00") : null}
                            onChange={(date: Date | null) => date && updateTrip(t => ({
                                ...t,
                                dateSpan: { start: t.dateSpan?.start ?? "", end: date.toISOString().split("T")[0] },
                            }))}
                            minDate={trip.dateSpan?.start ? new Date(trip.dateSpan.start + "T00:00:00") : undefined}
                            className={styles.dateInput}
                            placeholderText="End date"
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Description</label>
                    <textarea
                        className={styles.textarea}
                        value={trip.description ?? ""}
                        onChange={e => updateTrip(t => ({ ...t, description: e.target.value }))}
                        rows={3}
                        placeholder="Trip description..."
                    />
                </div>
            </div>

            {/* Stats bar */}
            {allDays.length > 0 && (
                <div className={styles.statsBar}>
                    <span><strong>{allDays.length}</strong> days total</span>
                    <span><strong>{plannedCount}</strong> days planned</span>
                    <span><strong>{bookingCount}</strong> bookings</span>
                </div>
            )}

            {/* Day accordion list */}
            <div className={styles.dayList}>
                {allDays.map((date, idx) => (
                    <DaySection
                        key={date}
                        dayNumber={idx + 1}
                        date={date}
                        tripDay={trip.tripDays?.find(d => d.date === date)}
                        isOpen={openDays.has(date)}
                        onToggle={() => toggleDay(date)}
                        onUpdate={(updater) => updateDay(date, updater)}
                        onImageClick={setLightboxImg}
                        onAddDocument={(bookingIdx) => setDocModal({ dayDate: date, bookingIdx })}
                        onAddBooking={() => setBookingModal(date)}
                        mapCenter={trip.locationData ? [trip.locationData.lat, trip.locationData.lng] : undefined}
                    />
                ))}
            </div>

            {/* Lightbox */}
            {lightboxImg && (
                <Modal onClose={() => setLightboxImg(null)} size="lg">
                    <img src={lightboxImg} alt="Full size" className={styles.fullImage} />
                </Modal>
            )}

            {/* Add document modal */}
            {docModal && (
                <Modal title="Add document" onClose={() => setDocModal(null)} size="sm">
                    <AddDocumentForm
                        onAdd={(doc) => {
                            updateDay(docModal.dayDate, day => ({
                                ...day,
                                bookings: day.bookings.map((b, i) =>
                                    i === docModal.bookingIdx
                                        ? { ...b, documents: [...(b.documents ?? []), doc] }
                                        : b
                                ),
                            }));
                            setDocModal(null);
                        }}
                        onCancel={() => setDocModal(null)}
                    />
                </Modal>
            )}

            {/* Add booking modal */}
            {bookingModal && (
                <Modal title="Add booking" onClose={() => setBookingModal(null)}>
                    <AddBookingForm
                        onAdd={(booking) => {
                            updateDay(bookingModal, day => ({
                                ...day,
                                bookings: [...day.bookings, booking],
                            }));
                            setBookingModal(null);
                        }}
                        onCancel={() => setBookingModal(null)}
                    />
                </Modal>
            )}
        </div>
    );
}

// ── TripDetail (route entry point) ────────────────────────

function TripDetail() {
    const { tripId } = useParams({ strict: false });
    const initialTrip = TRIPS.find(t => t.id === tripId);

    if (!initialTrip) return <p style={{ padding: "2rem", color: "var(--color-red)" }}>Trip not found.</p>;

    return <TripDetailInner initialTrip={initialTrip} />;
}

export default TripDetail;
