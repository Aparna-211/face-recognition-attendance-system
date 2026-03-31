const members = [
  'S. APARNA',
  'S. ELAKKIYA',
  'J. HARINI',
  'R. VIDHYASRI',
  'D. MATHALI BALA',
];

export default function Team() {
  return (
    <section>
      <h2 className="page-title">Team Members</h2>
      <p className="page-subtitle">II-Year AI & Data Science</p>

      <div className="team-grid">
        {members.map((name) => (
          <div className="card team-card" key={name}>
            <div className="avatar">{name[0]}</div>
            <h3>{name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
