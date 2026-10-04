export interface ProfileData {
  fullName: string;
  roleTitle: string;
  typewriterRoles: string[];
  introLede: string;
  aboutQuote: string;
  aboutDescription: string;
  badgeExperience: string;
  badgeLanguage: string;
  email: string;
  phone: string;
  githubUrl: string;
  telegramUrl: string;
  telegramHandle: string;
  facebookUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  substackUrl: string;
  cvUrl: string;
  location: string;
}

export interface ProjectData {
  id: number;
  title: string;
  categoryTag: string;
  description: string;
  terminalCommand: string;
  terminalOutput: string;
  colSpan: 'w4' | 'w2' | 'w3';
  chips: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface SkillCategoryData {
  name: string;
  skills: string[];
}

export interface EducationFactData {
  label: string;
  value: string;
}

export interface ArticleData {
  id: number;
  title: string;
  metaInfo: string;
  summary: string;
  url: string;
}

export const profileData: ProfileData = {
  fullName: "Lai Vathanatola",
  roleTitle: "IT Support & Network Engineering Specialist",
  typewriterRoles: [
    "IT Support Specialist",
    "Network Engineering Student",
    "Systems Infrastructure",
    "Computer Maintenance"
  ],
  introLede:
    "IT student at ACLEDA University of Business specializing in network engineering and systems infrastructure. Hands-on experience providing IT support, computer maintenance, and troubleshooting for computers and software.",
  aboutQuote:
    "Hands-on experience providing IT support and troubleshooting for computers and software at ACLEDA University. Skilled in computer maintenance, software installation, and network systems.",
  aboutDescription:
    "IT student at ACLEDA University of Business specializing in network engineering and systems infrastructure. Hands-on experience providing IT support and troubleshooting for computers and software at ACLEDA University. Skilled in computer maintenance, software installation, and Microsoft Office, with a strong foundation in English communication. Eager to grow as an IT support or network professional through practical experience and continuous learning.",
  badgeExperience: "ACLEDA Univ IT Support",
  badgeLanguage: "Khmer (Fluent) & English",
  email: "vathanatola07021@gmail.com",
  phone: "+855 70216205",
  githubUrl: "",
  telegramUrl: "https://t.me/lai_vathanatola",
  telegramHandle: "@lai_vathanatola",
  facebookUrl: "https://www.facebook.com/share/1DRWM4T7Vp/?mibextid=wwXIfr",
  linkedinUrl: "",
  websiteUrl: "",
  substackUrl: "",
  cvUrl: "#contact",
  location: "CAMBODIA // 11.5564° N, 104.9282° E"
};

export const marqueeSkills: string[] = [
  "Frontend Development",
  "Backend Development",
  "Python & Django",
  "HTML5 & CSS3",
  "JavaScript (ES6+)",
  "RESTful APIs",
  "Three.js WebGL",
  "IT Support",
  "Network Engineering",
  "Computer Maintenance",
  "Hardware Diagnostics",
  "Systems Infrastructure",
  "Cisco Packet Tracer",
  "TCP/IP & LAN"
];

export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "Campus IT Support & Workstation Diagnostics",
    categoryTag: "ACLEDA University of Business · Jul 2025 – Sep 2025",
    description:
      "Delivered hands-on IT support across faculty and student computer workstations. Diagnosed and resolved hardware issues, performed component maintenance, deployed software, and remediated operating system anomalies.",
    terminalCommand: "$ sfc /scannow && DISM /Online /Cleanup-Image /CheckHealth",
    terminalOutput: "PASS Windows Component Store healthy · No corruption detected",
    colSpan: "w4",
    chips: [
      "IT Support",
      "Hardware Maintenance",
      "Windows 11/10",
      "Diagnostic Utilities",
      "Software Deployment"
    ],
    githubUrl: "",
    liveUrl: ""
  },
  {
    id: 2,
    title: "Enterprise LAN Subnetting & Routing Lab",
    categoryTag: "Network Engineering Specialization",
    description:
      "Architected multi-subnet enterprise network topology with Cisco Packet Tracer, configuring VLAN segmentation, inter-VLAN routing, and DHCP pools.",
    terminalCommand: "Router# show ip route connected",
    terminalOutput: "C 192.168.10.0/24 via VLAN10 · C 192.168.20.0/24 via VLAN20",
    colSpan: "w2",
    chips: ["Cisco Packet Tracer", "VLANs", "IPv4 Subnetting", "TCP/IP", "Routing"],
    githubUrl: "",
    liveUrl: ""
  },
  {
    id: 3,
    title: "Automated OS Deployment & Recovery Toolkit",
    categoryTag: "Systems Infrastructure",
    description:
      "Created rapid-provisioning boot environments for Windows operating system installation, automated driver configuration, and core software provisioning.",
    terminalCommand: "bootrec /fixmbr && bootrec /rebuildbcd",
    terminalOutput: "Total identified Windows installations: 1 · Added to BCD",
    colSpan: "w2",
    chips: ["OS Installation", "Sysprep", "Recovery Tools", "Driver Management"],
    githubUrl: "",
    liveUrl: ""
  },
  {
    id: 4,
    title: "CITO Computer Center Graphic & Productivity Suite",
    categoryTag: "Certified Systems Application · Jan 2025",
    description:
      "Mastered professional office automation workflows using Microsoft Excel, Word, and PowerPoint alongside Adobe Photoshop for digital asset generation and media preparation.",
    terminalCommand: "CITO Certification Verification // Grade: Distinction",
    terminalOutput: "PASS 120h Office Automation & Adobe Photoshop Curriculum Completed",
    colSpan: "w4",
    chips: [
      "Microsoft Office",
      "Excel",
      "Word",
      "PowerPoint",
      "Adobe Photoshop"
    ],
    githubUrl: "",
    liveUrl: ""
  }
];

export const skillCategoriesData: SkillCategoryData[] = [
  {
    name: "IT Support & System Operations",
    skills: [
      "IT Support",
      "Troubleshooting & Problem Solving",
      "Computer Maintenance & Hardware",
      "Software Installation & Updates",
      "Operating System Installation (Windows 10/11)",
      "Customer Service & User Assistance"
    ]
  },
  {
    name: "Network & Systems Infrastructure",
    skills: [
      "Basic Networking & TCP/IP",
      "Network Engineering Specialization",
      "LAN Setup & Cabling",
      "Cisco Packet Tracer & Topology Design",
      "Subnetting & IP Configuration"
    ]
  },
  {
    name: "Productivity, Creative & Languages",
    skills: [
      "Microsoft Office (Word, Excel, PowerPoint)",
      "Adobe Photoshop",
      "Khmer (Native / Fluent)",
      "English (Intermediate / PUC-IFL Academic)",
      "Technical Documentation"
    ]
  }
];

export const educationFactsData: EducationFactData[] = [
  { label: "Degree", value: "B.S. in Information Technology (2024 – Present)" },
  { label: "University", value: "ACLEDA University of Business" },
  { label: "Specialization", value: "Network Engineering & Systems Infrastructure" },
  { label: "Experience", value: "IT Support at ACLEDA University (Jul 2025 – Sep 2025)" },
  { label: "English Training", value: "PUC-IFL Intensive English (1,020 hrs) & SPEL (120 hrs)" },
  { label: "Certifications", value: "CITO Computer Skills (Jan 2025) & High School Diploma (Nov 2023)" },
  { label: "Languages", value: "Khmer (Fluent) · English (Intermediate)" },
  { label: "Location", value: "Prek Doung, Kien Svay, Kandal Province, Cambodia" }
];

export const articlesData: ArticleData[] = [
  {
    id: 1,
    title: "Essential Hardware & Software Troubleshooting Checklist for Campus Workstations",
    metaInfo: "IT Support · 5 min read",
    summary:
      "A methodical step-by-step procedure for diagnosing hardware failures, corrupted drivers, and network interface errors in high-density computer laboratories.",
    url: "#work"
  },
  {
    id: 2,
    title: "Practical Network Engineering: Implementing VLANs and IPv4 Subnetting",
    metaInfo: "Networking · 8 min read",
    summary:
      "How to plan IP address schemes, isolate departmental broadcast traffic with VLANs, and configure reliable gateway routing for campus networks.",
    url: "#work"
  },
  {
    id: 3,
    title: "Bridging Technical IT Support and Customer Communication",
    metaInfo: "Helpdesk Operations · 6 min read",
    summary:
      "Effective user communication techniques in bilingual environments (Khmer and English) to resolve IT tickets faster and maintain high user satisfaction.",
    url: "#work"
  }
];
