import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useFetchLocation } from "../hooks/useLocationName";
import styles from "./PlanForm.module.css";

function PlanForm() {
    const { lat, lng } = useSearch({ strict: false });
    const navigate = useNavigate();
    const { locationName } = useFetchLocation(lat as number, lng as number);

    const [travelDate, setTravelDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [notes, setNotes] = useState("");
    const [inviteInput, setInviteInput] = useState("");
    const [invitedUsers, setInvitedUsers] = useState<string[]>([]);

    function handleInvite() {
        const trimmed = inviteInput.trim();
        if (trimmed && !invitedUsers.includes(trimmed)) {
            setInvitedUsers(prev => [...prev, trimmed]);
            setInviteInput("");
        }
    }

    function handleRemoveUser(user: string) {
        setInvitedUsers(prev => prev.filter(u => u !== user));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log({ lat, lng, travelDate, returnDate, notes, invitedUsers });
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.backBtn}
                onClick={() => navigate({ to: "/", search: { lat: lat as number, lng: lng as number } })}
            >
                ← Back to map
            </button>

            <h1 className={styles.title}>{locationName ?? "New Travel Plan"}</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.dateRow}>
                    <div className={styles.field}>
                        <label className={styles.label}>Travel date</label>
                        <DatePicker
                            selected={travelDate}
                            onChange={date => setTravelDate(date)}
                            selectsStart
                            startDate={travelDate}
                            endDate={returnDate}
                            placeholderText="Select departure date"
                            className={styles.dateInput}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Return date</label>
                        <DatePicker
                            selected={returnDate}
                            onChange={date => setReturnDate(date)}
                            selectsEnd
                            startDate={travelDate}
                            endDate={returnDate}
                            minDate={travelDate ?? undefined}
                            placeholderText="Select return date"
                            className={styles.dateInput}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Notes</label>
                    <textarea
                        className={styles.textarea}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Add notes about your trip..."
                        rows={4}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Invite travelers</label>
                    <div className={styles.inviteRow}>
                        <input
                            type="text"
                            className={styles.input}
                            value={inviteInput}
                            onChange={e => setInviteInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleInvite();
                                }
                            }}
                            placeholder="Enter name or email"
                        />
                        <button type="button" className={styles.inviteBtn} onClick={handleInvite}>
                            Add
                        </button>
                    </div>
                    {invitedUsers.length > 0 && (
                        <ul className={styles.userList}>
                            {invitedUsers.map(user => (
                                <li key={user} className={styles.userChip}>
                                    <span>{user}</span>
                                    <button
                                        type="button"
                                        className={styles.removeBtn}
                                        onClick={() => handleRemoveUser(user)}
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button type="submit" className={styles.submitBtn}>Save plan</button>
            </form>
        </div>
    );
}

export default PlanForm;
