import { motion } from 'motion/react';
import AnimatedSection, { AnimatedItem } from './AnimatedSection';

const team = [
  {
    id: 1,
    name: 'Gurinder Jagga',
    role: 'Founder & Creative Director',
    bio: 'Visionary leader with a passion for crafting digital brands that leave a lasting impression. Drives the creative vision behind every project.',
    avatar: 'GJ',
    color: 'var(--color-accent)',
  },
  {
    id: 2,
    name: 'Shubham Nautiyal',
    role: 'Backend Developer',
    bio: 'Architecting robust, scalable backends that power seamless experiences. Specialist in APIs, databases, and cloud infrastructure.',
    avatar: 'SN',
    color: '#3B82F6',
    linkedin: 'https://www.linkedin.com/in/shubham-nautiyal-7869992a7/',
  },
  {
    id: 3,
    name: 'Yuvraj',
    role: 'Frontend Developer',
    bio: 'Bringing designs to life with pixel-perfect precision. Expert in React, animations, and building interfaces users love to interact with.',
    avatar: 'YV',
    color: '#10B981',
    linkedin: 'https://www.linkedin.com/in/yuvraj-nln-340147167/',
  },
];


/* Clean SVG icons replacing emojis per taste-skill anti-emoji policy */
const ValueIcon = ({ type }) => {
  const icons = {
    target: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    bolt: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    gem: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9z" />
        <path d="M2 9h20" />
        <path d="M12 22L8 9l4-6 4 6z" />
      </svg>
    ),
  };
  return icons[type] || null;
};

export default function About() {
  return (
    <AnimatedSection id="about" className="section-dark" labelledBy="about-title">
      <div className="about__layout">
        <AnimatedItem className="about__story">
          <span className="section-label">Who We Are</span>
          <h2 className="section-title" id="about-title">
            Small team, <span className="accent-text">real impact.</span>
          </h2>
          <p className="about__description">
            We're a tight-knit team of developers and designers who care deeply about our craft. 
            We work directly with founders and teams to build web products that are fast, intuitive, 
            and built to scale.
          </p>
          <p className="about__description">
            No bloated account teams or endless bureaucracy. When you work with Jagga Digital, 
            you talk directly with the people writing your code and designing your product.
          </p>
          <div className="about__values">
            {[
              { icon: 'target', title: 'Direct Collaboration', desc: 'Work directly with builders who understand your vision.' },
              { icon: 'bolt', title: 'Performance & Speed', desc: 'Sub-second loading times and responsive performance.' },
              { icon: 'gem', title: 'Thoughtful Craft', desc: 'Clean architecture, pixel precision, and maintainable code.' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="about__value"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  type: 'spring',
                  stiffness: 80,
                  damping: 18,
                  delay: index * 0.12,
                }}
              >
                <div className="about__value-icon">
                  <ValueIcon type={value.icon} />
                </div>
                <div>
                  <h3 className="about__value-title">{value.title}</h3>
                  <p className="about__value-desc">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedItem>

        <div className="about__team">
          <AnimatedItem>
            <h3 className="about__team-heading">Meet the Team</h3>
          </AnimatedItem>
          <div className="about__team-grid">
            {team.map((member, index) => {
              const CardWrapper = member.linkedin ? motion.a : motion.div;
              return (
              <CardWrapper
                key={member.id}
                href={member.linkedin}
                target={member.linkedin ? "_blank" : undefined}
                rel={member.linkedin ? "noopener noreferrer" : undefined}
                className="about__member"
                id={`team-member-${member.id}`}
                style={member.linkedin ? { textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' } : {}}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  type: 'spring',
                  stiffness: 80,
                  damping: 18,
                  delay: index * 0.1,
                }}
              >
                <motion.div
                  className="about__member-avatar"
                  style={{ background: member.color }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 24px ${member.color}50`,
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                >
                  {member.avatar}
                </motion.div>
                <h4 className="about__member-name">{member.name}</h4>
                <span className="about__member-role">{member.role}</span>
                <p className="about__member-bio">{member.bio}</p>
              </CardWrapper>
            )})}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
