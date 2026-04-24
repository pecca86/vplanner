
function Grid({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {children}
        </div>
    )
}

function GridItem({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}

Grid.Item = GridItem

export default Grid