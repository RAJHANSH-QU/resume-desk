import React from "react";

const sampleData = {
  personal: {
    firstName: "Zoe",
    lastName: "Takahashi",
    email: "zoe@zoetakahashi.co",
    phone: "+1 (415) 555-0199",
    location: "Los Angeles, CA",
    linkedin: "linkedin.com/in/zoetakahashi",
    portfolio: "zoetakahashi.co",
    photo: "",
    summary:
      "Brand strategist & creative director obsessed with storytelling that sticks. I've led campaigns for global fashion, lifestyle, and tech brands that generated cultural moments — not just impressions.",
  },
  experience: [
    {
      include: true,
      jobTitle: "Creative Director",
      company: "Ogilvy",
      startDate: "Mar 2021",
      endDate: "Present",
      description:
        "Led 360° campaigns for Nike, Spotify, and Levi's. Won 3 Cannes Lions and a Clio for integrated campaign work. Managed team of 12 creatives across copy, art, and motion.",
    },
    {
      include: true,
      jobTitle: "Art Director",
      company: "Wieden+Kennedy",
      startDate: "Jul 2018",
      endDate: "Feb 2021",
      description:
        "Concepted and art directed campaigns for Coca-Cola and Old Spice. Built brand identity for 4 product launches.",
    },
  ],
  education: [
    {
      degree: "B.F.A. Graphic Design",
      institution: "Art Center College of Design",
      startYear: "2014",
      endYear: "2018",
      grade: "Top of Class",
    },
  ],
  skills: {
    list: "Brand Strategy\nArt Direction\nCopy\nAdobe CC\nMotion Design\nCampaign Management\nPresentation\nSocial Strategy",
  },
  projects: [
    {
      name: "Palette Zine",
      technologies: "Print, digital",
      description:
        "Independent design zine with 8,000+ subscribers exploring color theory through editorial photography.",
      link: "palettezine.co",
    },
  ],
  certifications: [
    {
      include: true,
      name: "Cannes Lions — Gold, Film Craft",
      organization: "Cannes Lions International",
      date: "2023",
      url: "",
    },
  ],
  interests: { list: "Analog photography\nKintsugi pottery\nGraphic novels" },
};

const COLORS = [
  { bg: "#ff6b6b", text: "#fff" },
  { bg: "#ffd93d", text: "#1a1a1a" },
  { bg: "#6bcb77", text: "#fff" },
  { bg: "#4d96ff", text: "#fff" },
  { bg: "#c77dff", text: "#fff" },
  { bg: "#ff9f1c", text: "#fff" },
];

// ✅ accept onPhotoClick prop
export default function CreativeTemplate({ data = sampleData, onPhotoClick }) {
  const { personal, experience, education, skills, projects, certifications, interests } = data;

  const skillList = skills?.list ? skills.list.split("\n").filter(Boolean) : [];
  const interestList = interests?.list ? interests.list.split("\n").filter(Boolean) : [];

  const coral = "#ff6b6b";
  const yellow = "#ffd93d";
  const green = "#6bcb77";
  const blue = "#4d96ff";
  const purple = "#c77dff";
  const textDark = "#1a1a1a";
  const textMid = "#333";
  const textMuted = "#666";


  return (
    <div
      style={{
        fontFamily: "'Futura', 'Century Gothic', 'Trebuchet MS', Arial, sans-serif",
        maxWidth: 860,
        margin: "0 auto",
        background: "#fff",
        fontSize: 13.5,
        lineHeight: 1.6,
        color: textDark,
      }}
    >
      {/* Header */}
      <div style={{ position: "relative", background: "#1a1a1a", padding: "44px 50px 36px", overflow: "hidden" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: coral, opacity: 0.18 }} />
        <div style={{ position: "absolute", bottom: -30, right: 120, width: 130, height: 130, borderRadius: "50%", background: yellow, opacity: 0.16 }} />
        <div style={{ position: "absolute", top: 20, right: 200, width: 80, height: 80, borderRadius: "50%", background: blue, opacity: 0.18 }} />

        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 24 }}>

          {/* ✅ Photo / Initials Avatar — clicking opens file picker */}
          <div
            onClick={onPhotoClick}
            title={onPhotoClick ? "Click to upload photo" : undefined}
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              flexShrink: 0,
              overflow: "hidden",
              border: `3px solid ${coral}`,
              background: "#2a2a2a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: onPhotoClick ? "pointer" : "default",
              position: "relative",
            }}
          >
            {personal.photo ? (
              // ✅ Photo uploaded — show it
              <img
                src={personal.photo}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              // ✅ No photo — show camera icon + ADD PHOTO text
              <div style={{ textAlign: "center", padding: 8 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: 24, height: 24, color: coral, margin: "0 auto", display: "block" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={coral}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div style={{ fontSize: 8, color: coral, marginTop: 3, fontWeight: 900, letterSpacing: "0.5px" }}>
                  ADD PHOTO
                </div>
              </div>
            )}
          </div>

          {/* Name + contact + summary */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: 42, fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1 }}>
                {personal.firstName}
              </span>
              <span style={{ fontSize: 42, fontWeight: 300, color: coral, letterSpacing: "-2px", lineHeight: 1 }}>
                {personal.lastName}
              </span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {[personal.email, personal.phone, personal.location, personal.portfolio, personal.linkedin]
                .filter(Boolean)
                .map((item, i) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                      borderRadius: 20,
                      padding: "3px 12px",
                      fontSize: 11.5,
                    }}
                  >
                    {item}
                  </span>
                ))}
            </div>

            {personal.summary && (
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, maxWidth: 500, lineHeight: 1.7 }}>
                {personal.summary}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px" }}>

        {/* Main Left */}
        <div style={{ padding: "36px 40px" }}>

          {/* Experience */}
          {experience?.filter((e) => e.include !== false).length > 0 && (
            <CreativeSection title="Experience" color={coral}>
              {experience
                .filter((e) => e.include !== false)
                .map((job, i) => (
                  <div key={i} style={{ marginBottom: 22, display: "flex", gap: 16 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: COLORS[i % COLORS.length].bg,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 900,
                        color: COLORS[i % COLORS.length].text,
                        marginTop: 2,
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <div style={{ fontWeight: 800, fontSize: 14.5, color: textDark }}>{job.jobTitle}</div>
                        <div style={{ fontSize: 11.5, color: textMuted }}>{job.startDate} – {job.endDate || "Present"}</div>
                      </div>
                      <div style={{ fontSize: 12.5, color: coral, fontWeight: 700, marginBottom: 4 }}>{job.company}</div>
                      {job.description && (
                        <div style={{ fontSize: 13, color: textMid, lineHeight: 1.65 }}>{job.description}</div>
                      )}
                    </div>
                  </div>
                ))}
            </CreativeSection>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <CreativeSection title="Education" color={blue}>
              {education.map((edu, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: textDark }}>{edu.degree}</div>
                    <div style={{ fontSize: 13, color: textMid, fontStyle: "italic" }}>{edu.institution}</div>
                    {edu.grade && <div style={{ fontSize: 12, color: textMuted }}>{edu.grade}</div>}
                  </div>
                  <div style={{ fontSize: 12, color: textMuted }}>{edu.startYear} – {edu.endYear}</div>
                </div>
              ))}
            </CreativeSection>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <CreativeSection title="Projects" color={purple}>
              {projects.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: "#f8f4ff",
                    border: `2px solid ${purple}`,
                    borderRadius: 12,
                    padding: "14px 16px",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontWeight: 800, fontSize: 14, color: textDark }}>{p.name}</span>
                    {p.link && <span style={{ fontSize: 12, color: purple, fontWeight: 600 }}>{p.link}</span>}
                  </div>
                  {p.technologies && <div style={{ fontSize: 12, color: textMuted, marginTop: 2 }}>{p.technologies}</div>}
                  {p.description && <div style={{ fontSize: 13, color: textMid, marginTop: 5 }}>{p.description}</div>}
                </div>
              ))}
            </CreativeSection>
          )}
        </div>

        {/* Right Sidebar */}
        <div
          style={{
            background: "#f9f9f9",
            padding: "36px 24px",
            borderLeft: "1px solid #eee",
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {/* Skills */}
          {skillList.length > 0 && (
            <div>
              <SideLabel title="Skills" color={green} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {skillList.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: COLORS[i % COLORS.length].bg,
                      color: COLORS[i % COLORS.length].text,
                      borderRadius: 6,
                      padding: "4px 12px",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications / Awards */}
          {certifications?.filter((c) => c.include !== false).length > 0 && (
            <div>
              <SideLabel title="Awards & Certs" color={yellow} />
              {certifications
                .filter((c) => c.include !== false)
                .map((cert, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fffbea",
                      border: `1.5px solid ${yellow}`,
                      borderRadius: 8,
                      padding: "8px 12px",
                      marginBottom: 8,
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 12.5, color: textDark }}>{cert.name}</div>
                    <div style={{ fontSize: 11.5, color: textMuted }}>
                      {cert.organization}{cert.date ? ` · ${cert.date}` : ""}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Interests */}
          {interestList.length > 0 && (
            <div>
              <SideLabel title="Passions" color={coral} />
              {interestList.map((item, i) => (
                <div key={i} style={{ fontSize: 12.5, color: textMid, marginBottom: 5, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 16 }}>✦</span>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CreativeSection({ title, children, color }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "#1a1a1a",
          }}
        >
          {title}
        </span>
        <div style={{ flex: 1, height: 2, background: color, opacity: 0.25, borderRadius: 2 }} />
      </div>
      {children}
    </div>
  );
}

function SideLabel({ title, color }) {
  return (
    <div
      style={{
        display: "inline-block",
        background: color,
        color: "#fff",
        fontWeight: 900,
        fontSize: 10,
        letterSpacing: "2px",
        textTransform: "uppercase",
        padding: "3px 10px",
        borderRadius: 4,
        marginBottom: 10,
      }}
    >
      {title}
    </div>
  );
}