import { useState, useEffect } from "react"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useAuth } from "../context/AuthContext"
import styles from "./Login.module.css"
import Button from "./Button"
import GlobeLoader from "./GlobeLoader"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const search = useSearch({ from: "/login" })

    useEffect(() => {
        if (isAuthenticated) {
            navigate({ to: (search as { redirect?: string }).redirect ?? "/" })
        }
    }, [isAuthenticated, navigate, search])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const ok = login(email, password)
        if (!ok) setError("Invalid email or password")
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <GlobeLoader size={120} ink="#4a4a4a" bg="#ffffff" />
                    <h1 className={styles.title}>vPlanner</h1>
                </div>
                <p className={styles.subtitle}>Sign in to continue</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>Email</label>
                        <input
                            className={styles.input}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Password</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <Button type="submit" label="Sign in" />
                </form>
            </div>
        </div>
    )
}

export default Login
