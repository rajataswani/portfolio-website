// Constants and Configuration

// Color Palette
export const COLORS = {
    primary: {
        DEFAULT: '#0d1117',
        light: '#161b22',
        dark: '#0a0f1c',
    },
    accent: {
        purple: '#8b5cf6',
        blue: '#3b82f6',
        cyan: '#06b6d4',
    },
    glow: {
        purple: '#a78bfa',
        blue: '#60a5fa',
    },
    text: {
        primary: '#f0f6fc',
        secondary: '#8b949e',
        tertiary: '#6e7681',
    },
};

// Personal Information
export const PERSONAL_INFO = {
    name: 'Rajat Aswani',
    title: 'Senior Technical Executive',
    email: 'aswanirajat@gmail.com',
    phone: '+91 9408030307',
    location: 'Ahmedabad, Gujarat, India',
    github: 'https://github.com/rajataswani',
    linkedin: 'https://linkedin.com/in/rajataswani',
};

// Projects Data
export const PROJECTS = [
    {
        id: 1,
        title: 'Maggic-Mock',
        subtitle: 'Personalized Mock Test Generator',
        description: 'Customizable mock tests with subject, question, and time options. Detailed test analysis with weak subject identification and normalized scores. Actual GATE interface with previous year papers and competitive tests.',
        tech: ['Python', 'ReactJs', 'Data Interpolation'],
        link: 'https://maggic-mock.vercel.app/',
        github: null,
        features: [
            'Customizable mock tests',
            'Detailed test analysis',
            'GATE interface simulation'
        ]
    },
    {
        id: 2,
        title: 'F-Chain',
        subtitle: 'Anonymous Feedback System',
        description: 'Immutable Blockchain tracking and Transparency in Student\'s Feedback. Feedback Showcasing helps in Enhancement of Reputation of University. Automated Resolution helps in Continuous Improvement.',
        tech: ['Blockchain', 'Solidity', 'Ethereum Smart Contracts'],
        link: null,
        github: 'https://github.com/rajataswani/fchain',
        features: [
            'Blockchain-based feedback',
            'Anonymous submissions',
            'Automated resolution system'
        ]
    }
];

// Skills Data
export const SKILLS = {
    languages: ['Python', 'JavaScript', 'TypeScript', 'Solidity'],
    frameworks: ['React', 'Next.js', 'Node.js', 'Express'],
    blockchain: ['Ethereum Smart Contracts', 'Web3.js', 'Solidity'],
    other: ['Data Structures & Algorithms', 'Git', 'REST APIs']
};

// Achievements Data
export const ACHIEVEMENTS = [
    {
        id: 1,
        title: 'GATE 2025',
        subtitle: 'Graduate Aptitude Test in Engineering',
        rank: null,
        totalCandidates: null,
        percentile: null,
        year: '*achieved in third year of Undergraduation',
        icon: '🏆',
        gateResults: [
            {
                paper: 'CS (Computer Science)',
                rank: 2797,
                totalCandidates: 170825,
                percentile: 98.36
            },
            {
                paper: 'DA (Data Science & AI)',
                rank: 3748,
                totalCandidates: 57054,
                percentile: 93.43
            }
        ]
    },
    {
        id: 2,
        title: 'Hackathons',
        subtitle: '',
        rank: null,
        totalCandidates: null,
        percentile: null,
        year: null,
        icon: '🚀',
        details: [
            'Participated in national-level hackathons including:',
            '• HackForIndia (2023)',
            '• SSIP (2023)',
            '• SIH (2023)',
            '',
            'Finalist at :',
            '• Jumbled Coding Competition (2023)',
            '• CVMU Hackathon (2024)',
            '• Rajasthan Police Hackathon (2024)',
            '• Ideathon (by IGNITE) (2025)',
            '',
            '🥇 Won:',
            '• 1st Place – Perpetual Model Competition (2022)',
            '• 1st Place – Technical-Creative Reel Competition (2023)',
            '• 1st Place – Venture Verse (2025)',
            '',
            'Built scalable and production-ready prototypes under 24–48 hour constraints.'
        ]
    },
    {
        id: 3,
        title: 'Education & Outreach',
        subtitle: '',
        rank: null,
        totalCandidates: null,
        percentile: null,
        year: null,
        icon: '🎤',
        details: [
            '• Conducted hands-on workshop on AWS Amplify for 150+ participants at AWS Student Community Day 2025 (organized by AWSCCSOU) ',
            '',
            '• Delivered session on Computer Science fundamentals such as Operating Systems, DBMS, Programming, and Data Structures & Algorithms to 1,000+ students',
            '',
            'Recognized for simplifying complex technical concepts for large audiences.'
        ]
    }
];

// Experience/Timeline Data
export const EXPERIENCE = [
    {
        id: 1,
        title: 'Senior Technical Executive',
        organization: 'Silver Oak University IEEE SB',
        period: 'Jan 2026 - Present',
        description: [
            'Active volunteering in events, demonstrating strong organizational skills',
            'Awarded Member of the Month for exceptional contributions',
            'Delivered content and facilitated speaker logistics, ensuring smooth presentations',
            'Managed mass mailing for IEEE events, ensuring timely communication'
        ],
        current: true,
        isPromotion: false,
        companyId: 'ieee-sb' // Group identifier for nested timeline
    },
    {
        id: 2,
        title: 'Webmaster',
        organization: 'Silver Oak University IEEE SB',
        period: 'Jan 2025 - Dec 2025',
        description: [
            'Managed and maintained IEEE Student Branch website',
            'Implemented new features and improved user experience',
            'Collaborated with team members on technical projects'
        ],
        current: false,
        isPromotion: false,
        companyId: 'ieee-sb' // Same company, will be nested
    },
    {
        id: 3,
        title: 'Content Creator',
        organization: 'Silver Oak University',
        period: 'May 2023 - July 2024',
        description: [
            'Enhanced College\'s online presence through visually captivating reels',
            'Collaborated with Department Representatives for Effective Messaging',
            'Polished reels through meticulous editing and post-processing',
            'Gained 10,000+ reach within a few weeks'
        ],
        current: false,
        isPromotion: false,
        companyId: 'sou' // Different company
    }
];

// Education Data
export const EDUCATION = {
    degree: 'Bachelor of Technology, Computer Engineering',
    institution: 'Aditya Silver Oak Institute of Technology, Ahmedabad',
    period: '2022 - 2026 (expected)',
    cgpa: 9.73
};

// Particle System Configuration
export const PARTICLE_CONFIG = {
    mobile: {
        number: 50,
        size: { min: 1, max: 3 }
    },
    tablet: {
        number: 100,
        size: { min: 1, max: 4 }
    },
    desktop: {
        number: 150,
        size: { min: 1, max: 5 }
    }
};

// Animation Timing
export const ANIMATION_TIMING = {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    verySlow: 1.5
};

// Breakpoints
export const BREAKPOINTS = {
    mobile: 768,
    tablet: 1024,
    desktop: 1280
};
