const badges = [
    {
        badge: "low",
        label: <span className='badge badge-primary'>&#128516; low</span>
    },
    {
        badge: "medium",
        label: <span className='badge badge-warning'>&#128517; medium</span>
    },
    {
        badge: "high",
        label: <span className='badge badge-dark'>&#128549; high</span>
    },
    {
        badge: "urgent",
        label: <span className='badge badge-danger'>&#128557; urgent</span>
    },
]

export function badgePriority(val) {
    const filteredBadges = badges.filter(item => item.badge === val);
    const badgeNames = filteredBadges.map(item => item.label);
    return (
        badgeNames[0]
    )
}