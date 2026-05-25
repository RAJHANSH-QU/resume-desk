import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
  },

  // Header
  header: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#1a1a2e',
    paddingBottom: 12,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: 9.5,
    color: '#444',
  },
  contactItem: {
    marginRight: 12,
  },

  // Section
  section: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#1a1a2e',
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#c9a84c',
    paddingBottom: 3,
  },

  // Summary
  summaryText: {
    fontSize: 10.5,
    color: '#333',
    lineHeight: 1.7,
  },

  // Experience
  jobBlock: {
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a2e',
  },
  company: {
    fontSize: 10,
    color: '#0f3460',
    marginTop: 1,
  },
  dateText: {
    fontSize: 9.5,
    color: '#555',
  },
  jobDesc: {
    fontSize: 10,
    color: '#444',
    marginTop: 4,
    lineHeight: 1.6,
  },

  // Education
  eduBlock: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a2e',
  },
  institution: {
    fontSize: 10,
    color: '#0f3460',
    marginTop: 1,
  },
  grade: {
    fontSize: 9.5,
    color: '#666',
    marginTop: 1,
  },

  // Skills — plain text list
  skillItem: {
    fontSize: 10.5,
    color: '#333',
    lineHeight: 1.8,
  },

  // Certifications
  certBlock: {
    marginBottom: 6,
  },
  certName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a2e',
  },
  certOrg: {
    fontSize: 9.5,
    color: '#666',
    marginTop: 1,
  },

  // Projects
  projectBlock: {
    marginBottom: 8,
  },
  projectName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a2e',
  },
  projectTech: {
    fontSize: 9.5,
    color: '#c9a84c',
    marginTop: 1,
  },
  projectDesc: {
    fontSize: 10,
    color: '#444',
    marginTop: 3,
    lineHeight: 1.6,
  },
  projectLink: {
    fontSize: 9.5,
    color: '#0f3460',
    marginTop: 1,
  },

  // Interests
  interestItem: {
    fontSize: 10.5,
    color: '#333',
    lineHeight: 1.8,
  },
});

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function ClassicATS({ data }) {
  const { personal, experience, education, skills, projects, certifications, interests } = data;

  const skillList = skills?.list ? skills.list.split('\n').filter(Boolean) : [];
  const interestList = interests?.list ? interests.list.split('\n').filter(Boolean) : [];

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personal.firstName} {personal.lastName}
          </Text>
          <View style={styles.contactRow}>
            {personal.email && <Text style={styles.contactItem}>{personal.email}</Text>}
            {personal.phone && <Text style={styles.contactItem}>{personal.phone}</Text>}
            {personal.location && <Text style={styles.contactItem}>{personal.location}</Text>}
            {personal.linkedin && <Text style={styles.contactItem}>{personal.linkedin}</Text>}
            {personal.portfolio && <Text style={styles.contactItem}>{personal.portfolio}</Text>}
          </View>
        </View>

        {/* Summary */}
        {personal.summary && (
          <Section title="Summary">
            <Text style={styles.summaryText}>{personal.summary}</Text>
          </Section>
        )}

        {/* Experience */}
        {experience?.filter(e => e.include !== false).length > 0 && (
          <Section title="Experience">
            {experience.filter(e => e.include !== false).map((job, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{job.jobTitle}</Text>
                    <Text style={styles.company}>{job.company}</Text>
                  </View>
                  <Text style={styles.dateText}>
                    {job.startDate} — {job.endDate || 'Present'}
                  </Text>
                </View>
                {job.description && (
                  <Text style={styles.jobDesc}>{job.description}</Text>
                )}
              </View>
            ))}
          </Section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <Section title="Education">
            {education.map((edu, i) => (
              <View key={i} style={styles.eduBlock}>
                <View>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  {edu.grade && <Text style={styles.grade}>{edu.grade}</Text>}
                </View>
                <Text style={styles.dateText}>
                  {edu.startYear} — {edu.endYear}
                </Text>
              </View>
            ))}
          </Section>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <Section title="Skills">
            {skillList.map((s, i) => (
              <Text key={i} style={styles.skillItem}>{s}</Text>
            ))}
          </Section>
        )}

        {/* Certifications */}
        {certifications?.filter(c => c.include !== false).length > 0 && (
          <Section title="Certifications">
            {certifications.filter(c => c.include !== false).map((cert, i) => (
              <View key={i} style={styles.certBlock}>
                <Text style={styles.certName}>{cert.name}</Text>
                <Text style={styles.certOrg}>
                  {cert.organization}{cert.date ? ` · ${cert.date}` : ''}
                </Text>
              </View>
            ))}
          </Section>
        )}

        {/* Projects */}
        {projects?.filter(p => p.name).length > 0 && (
          <Section title="Projects">
            {projects.filter(p => p.name).map((p, i) => (
              <View key={i} style={styles.projectBlock}>
                <Text style={styles.projectName}>{p.name}</Text>
                {p.technologies && <Text style={styles.projectTech}>{p.technologies}</Text>}
                {p.description && <Text style={styles.projectDesc}>{p.description}</Text>}
                {p.link && <Text style={styles.projectLink}>{p.link}</Text>}
              </View>
            ))}
          </Section>
        )}

        {/* Interests */}
        {interestList.length > 0 && (
          <Section title="Interests">
            {interestList.map((item, i) => (
              <Text key={i} style={styles.interestItem}>{item}</Text>
            ))}
          </Section>
        )}

      </Page>
    </Document>
  );
}