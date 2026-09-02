import type { ExperienceItem, ProjectItem, SkillCategory, EducationItem, StatItem, AccoladeItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Gurmukh Singh',
  handle: 'gurmukh050304',
  tagline: 'Architecting autonomous systems, data pipelines, and low-latency environments.',
  bio: 'Specializing in computer systems, reinforcement learning, automated ETL pipelines, and high-throughput infrastructure. Passionate about kernel-level Linux optimization, distributed workflows, and reproducible computational pipelines.',
  email: 'gurmukh050304@gmail.com',
  phone: '+91 9992153036',
  location: 'Punjab, India',
  status: 'Available for Autonomous Systems & Infrastructure Engineering',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  systemSpecs: {
    os: 'Arch Linux x86_64',
    kernel: '6.12.9-zen1',
    wm: 'Hyprland (Wayland)',
    shell: 'zsh 5.9 + tmux',
    editor: 'Neovim 0.10.2 (Lua)',
    uptime: '14 days, 3 hours'
  }
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'ltts',
    role: 'Tech Intern',
    company: 'Larsen & Toubro Technology Services',
    period: 'June 2025 – July 2025',
    location: 'India',
    badge: 'Tier-III Infrastructure',
    description: 'Assisted in mission-critical Tier-III Datacenter operations and infrastructure management, ensuring high availability, continuous monitoring, and fault resilience.',
    highlights: [
      'Monitored high-density server racks and power distribution units (PDUs) to prevent load anomalies and thermal bottlenecks.',
      'Aided in automated telemetry aggregation and server health diagnostics across multi-tenant bare-metal clusters.',
      'Formulated standard operating procedures (SOPs) for failover routing and network maintenance under strict SLAs.'
    ],
    technologies: ['Linux Server', 'Data Center Ops', 'Telemetry Monitoring', 'Networking', 'Infrastructure SLAs'],
    type: 'internship',
    alignment: 'left'
  },
  {
    id: 'technometer',
    role: 'Head of Technical Department',
    company: 'Technometer Club',
    period: 'Aug 2025 – Present',
    location: 'Amity University Punjab',
    badge: 'Leadership (Promoted within 6 mos)',
    description: 'Spearheading hackathons, technical symposiums, and engineering workshops while directing a 3-person core technical team. Promoted to Head within 6 months.',
    highlights: [
      'Directing end-to-end technical execution for university hackathons engaging 300+ competitive student developers.',
      'Led the architecture and deployment of real-time submission evaluation portals and automated leaderboard synchronizers.',
      'Mentored and upskilled junior developers in Git workflows, microservices, and rapid product prototyping.'
    ],
    technologies: ['Technical Leadership', 'Event Architecture', 'Hackathons', 'Team Mentorship', 'Automated Scoring'],
    type: 'leadership',
    alignment: 'right'
  },
  {
    id: 'iitm-mentor',
    role: 'Statistics Mentor',
    company: 'Indian Institute of Technology, Madras',
    period: 'Jan 2024 – Apr 2024',
    location: 'Remote',
    badge: 'Pedagogy & Foundations',
    description: 'Coached 25 undergraduate students in fundamental statistical concepts, probability theory, hypothesis testing, and quantitative reasoning.',
    highlights: [
      'Conducted live weekly problem-solving recitations breaking down continuous distributions, CLT, and maximum likelihood estimation.',
      'Designed algorithmic Python and R walkthroughs demonstrating empirical validation of theoretical probabilistic models.',
      'Achieved a 94% retention rate and high student appraisal scores across foundational coursework modules.'
    ],
    technologies: ['Statistics', 'Probability Theory', 'R', 'Python', 'Hypothesis Testing', 'Data Science Pedagogy'],
    type: 'mentorship',
    alignment: 'left'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'spotify-telegram',
    title: 'Spotify to Telegram Archiver',
    category: 'Automation & Distributed ETL',
    summary: 'Autonomous headless media archiving pipeline syncing playlists to cloud channels.',
    description: 'Engineered an automated playlist-saving and archival microservice utilizing Docker, n8n orchestration, and the Spotify Web API. Eliminates repetitive manual exports and achieves automated differential synchronization.',
    impact: 'Reduced manual playlist offloading and archival time by 95% with zero dropped payload cycles.',
    metrics: { label: 'Time Reduction', value: '95%' },
    tags: ['Docker', 'n8n', 'Node.js', 'REST APIs', 'Telegram Bot API', 'Automation'],
    architectureNotes: 'Event-driven webhook triggers -> JWT auth renewal -> Rate-limited parallel chunk downloading -> Audio tag preservation -> Telegram CDN dispatch.',
    featured: true,
    gridSpan: 'col-span-12 lg:col-span-7'
  },
  {
    id: 'rl-neat-agent',
    title: 'Autonomous Reinforcement Learning Agent',
    category: 'AI / Neuroevolution',
    summary: 'Population-based genetic algorithm learning optimal game physics control from scratch.',
    description: 'Developed an autonomous population-based neuroevolution agent using Python, Pygame, and the NEAT (NeuroEvolution of Augmenting Topologies) algorithm to master Flappy Bird environment physics.',
    impact: 'Evolved neural topologies from zero hidden nodes to superhuman precision (>100k obstacles cleared) in under 18 generations.',
    metrics: { label: 'Survival Fitness', value: '∞ Score' },
    tags: ['Python', 'Pygame', 'NEAT', 'Genetic Algorithms', 'Reinforcement Learning', 'Topology Optimization'],
    architectureNotes: 'Custom fitness function penalizing idle hovering -> dynamic speciation via genomic distance metric -> crossover & mutation of structural synapse weights.',
    featured: true,
    gridSpan: 'col-span-12 lg:col-span-5'
  },
  {
    id: 'pothole-vision',
    title: 'Pothole Detection Computer Vision Pipeline',
    category: 'Computer Vision & Edge AI',
    summary: 'Sub-30ms inference pipeline processing vehicular dashcam feeds for road hazards.',
    description: 'Trained and deployed a high-speed YOLOv8 computer vision detection pipeline coupled with OpenCV for real-time vehicular dashcam hazard mapping and road degradation monitoring.',
    impact: 'Achieved 48+ FPS inference on edge hardware with 91.4% mAP50 precision under varying illumination conditions.',
    metrics: { label: 'Processing Speed', value: '48+ FPS' },
    tags: ['YOLOv8', 'OpenCV', 'PyTorch', 'Python', 'Object Detection', 'Edge Computing'],
    architectureNotes: 'TensorRT quantized weights -> asynchronous OpenCV frame ring buffer -> bounding box IoU spatial tracking -> geo-tagged JSON anomaly logging.',
    featured: false,
    gridSpan: 'col-span-12 lg:col-span-5'
  },
  {
    id: 'automated-report-card',
    title: 'Automated Report Card & Ranking Engine',
    category: 'Data Engineering & Document Synthesis',
    summary: 'Scalable data pipeline transforming raw student cohorts into publication-grade transcripts.',
    description: 'Constructed an automated Python, Pandas, and LaTeX document generation pipeline capable of digesting raw tabular CSV data and compiling customized, publication-quality PDF report cards with dynamic ranking and percentile logic.',
    impact: 'Processes 1,000+ academic transcripts per batch in under 45 seconds with 100% typographic consistency.',
    metrics: { label: 'Batch Processing', value: '<45s / 1k' },
    tags: ['Python', 'Pandas', 'LaTeX', 'PDF Generation', 'ETL Pipeline', 'Data Cleansing'],
    architectureNotes: 'CSV parsing with strict schema validation -> statistical z-score & percentile computation -> Jinja2 to LaTeX templating engine -> headless pdflatex worker subprocesses.',
    featured: false,
    gridSpan: 'col-span-12 lg:col-span-7'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming Languages',
    icon: 'code',
    description: 'Primary computational languages and systems programming toolchains',
    skills: [
      { name: 'Python', level: 'Advanced', details: 'NumPy, Pandas, PyTorch, Pygame, AsyncIO, Flask/FastAPI', tag: 'Core' },
      { name: 'Rust', level: 'Intermediate', details: 'Memory safety, Tokio async, Cargo tooling, CLI engineering', tag: 'Systems' },
      { name: 'C / C++', level: 'Intermediate', details: 'Pointers, memory management, algorithmic data structures, POSIX', tag: 'Systems' },
      { name: 'TypeScript / JS', level: 'Advanced', details: 'Modern ESNext, React 19, Vite, Async/Await, Strict typing', tag: 'Frontend/Web' },
      { name: 'Java', level: 'Proficient', details: 'OOP principles, Collections framework, JVM runtime internals', tag: 'Backend' },
      { name: 'SQL', level: 'Proficient', details: 'PostgreSQL, complex JOINs, indexing strategies, query plans', tag: 'Data' },
      { name: 'R', level: 'Proficient', details: 'Hypothesis testing, statistical distributions, ggplot2 modeling', tag: 'Scientific' }
    ]
  },
  {
    name: 'AI, ML & Data Pipelines',
    icon: 'cpu',
    description: 'Neural architectures, computer vision models, and data workflows',
    skills: [
      { name: 'Neuroevolution (NEAT)', level: 'Advanced', details: 'Genetic topology evolution, speciation, fitness optimization', tag: 'RL' },
      { name: 'Computer Vision', level: 'Advanced', details: 'YOLOv8, OpenCV, Image preprocessing, Real-time bounding inference', tag: 'Vision' },
      { name: 'PyTorch', level: 'Proficient', details: 'Tensors, autograd, custom neural network training loops', tag: 'Deep Learning' },
      { name: 'Pandas & NumPy', level: 'Advanced', details: 'Vectorized computing, ETL data transforms, feature extraction', tag: 'Data' },
      { name: 'LaTeX Synthesis', level: 'Advanced', details: 'Automated programmatic document rendering and typesetting', tag: 'Publishing' }
    ]
  },
  {
    name: 'Systems, DevOps & Tools',
    icon: 'terminal',
    description: 'Operating systems, container runtimes, automation, and tooling',
    skills: [
      { name: 'Linux (Arch / Debian)', level: 'Advanced', details: 'Kernel parameters, systemd, Wayland/Hyprland, bash/zsh scripting', tag: 'OS' },
      { name: 'Docker', level: 'Proficient', details: 'Multi-stage builds, container isolation, docker-compose orchestration', tag: 'Containers' },
      { name: 'Git & Version Control', level: 'Advanced', details: 'Branching strategies, interactive rebasing, automated CI workflows', tag: 'Tooling' },
      { name: 'n8n Automation', level: 'Advanced', details: 'Self-hosted workflow automations, webhook integrations, error retries', tag: 'Automation' },
      { name: 'Neovim & Lua', level: 'Advanced', details: 'Modal editing, custom Lua config, LSP integration, Treesitter', tag: 'Workflow' }
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: 'Amity University Punjab',
    degree: 'Bachelor of Technology in Computer Science & Engineering (B.Tech CSE)',
    cgpa: 7.58,
    maxCgpa: 10.0,
    period: '2022 – 2026',
    details: 'Focus on Distributed Systems, Operating Systems, Algorithm Analysis, and Computer Architecture.',
    coursework: ['Data Structures & Algorithms', 'Operating Systems Internals', 'Database Management', 'Computer Networks', 'Automata Theory']
  },
  {
    institution: 'Indian Institute of Technology, Madras (IIT Madras)',
    degree: 'Foundation Level in Data Science',
    cgpa: 9.50,
    maxCgpa: 10.0,
    period: '2023 – 2024',
    details: 'Rigorous coursework in computational thinking, linear algebra, inferential statistics, and scientific Python programming.',
    coursework: ['Mathematical Foundations for Data Science', 'Probability & Statistics', 'Computational Thinking with Python']
  }
];

export const STATS: StatItem[] = [
  {
    id: 'isi-rank',
    label: 'ISI All India Rank',
    targetValue: 78,
    prefix: 'AIR #',
    subtext: 'Out of 20,000+ national candidates in Indian Statistical Institute exam',
    iconName: 'trophy'
  },
  {
    id: 'leetcode',
    label: 'LeetCode Percentile',
    targetValue: 12,
    prefix: 'Top ',
    suffix: '%',
    subtext: 'Algorithmic problem solving across dynamic programming & graph theory',
    iconName: 'code'
  },
  {
    id: 'iit-cgpa',
    label: 'IIT Madras CGPA',
    targetValue: 9.5,
    decimals: 1,
    suffix: ' / 10',
    subtext: 'Foundation in Data Science academic standing',
    iconName: 'award'
  },
  {
    id: 'efficiency',
    label: 'ETL Pipeline Optimization',
    targetValue: 95,
    suffix: '%',
    subtext: 'Manual overhead eliminated via containerized n8n microservices',
    iconName: 'zap'
  }
];

export const ACCOLADES: AccoladeItem[] = [
  {
    title: 'AIR 78 — ISI Admission Test',
    achievement: 'All India Rank 78',
    category: 'National Competitive Exam',
    rank: '#78',
    badge: 'Top 0.4% Nationally',
    description: 'Secured 78th rank nationally among 20,000+ competitors in the rigorous Indian Statistical Institute admission test evaluating advanced mathematical and statistical acumen.',
    verified: true
  },
  {
    title: '1st Place — Logic League (Anviksha 2.0)',
    achievement: 'Championship Winner (1st Prize)',
    category: 'Technical Hackathon & Algorithmic Contest',
    rank: 'Winner 🥇',
    badge: 'First Place',
    description: 'Secured the first prize in the national algorithmic competition testing high-speed logical modeling, puzzle theory, and time-constrained competitive coding.',
    verified: true
  },
  {
    title: 'LeetCode Global Top 12%',
    achievement: 'Top 12th Percentile',
    category: 'Algorithmic Problem Solving',
    rank: 'Top 12%',
    badge: 'Knight Track',
    description: 'Consistent high rating in LeetCode contests solving complex graph algorithms, tree decompositions, bitwise logic, and dynamic programming.',
    verified: true
  }
];

export const BOOT_LOGS: string[] = [
  '[  0.000000] Linux version 6.12.9-arch1-1-zen (gcc version 14.2.1)',
  '[  0.000004] Command line: BOOT_IMAGE=/vmlinuz-linux-zen root=UUID=7e3b9a10-22c5 rw quiet splash',
  '[  0.002140] x86/fpu: Supporting XSAVE feature 0x001: \'x87 floating point registers\'',
  '[  0.002142] x86/fpu: Supporting XSAVE feature 0x002: \'SSE registers\'',
  '[  0.008432] e820: [mem 0x0000000000000000-0x000000000009fbff] usable',
  '[  0.024501] ACPI: Core revision 20240827, 8 P-Cores, 8 E-Cores activated',
  '[  0.038120] CPU0: AMD / Intel Architectural Performance Monitoring ready',
  '[  0.061099] Memory: 32714208K/33554432K available (32GB DDR5 @ 6000MHz)',
  '[  0.089400] secureboot: Secure boot disabled (Custom Arch Kernel)',
  '[  0.114520] devtmpfs: initialized successfully',
  '[  0.130981] pci 0000:00:00.0: [8086:4660] type 00 class 0x060000 Host bridge',
  '[  0.165219] nvme 0000:01:00.0: PCIe Bus Error: severity=Corrected',
  '[  0.198302] nvme0n1: p1(EFI) p2(LUKS encrypted /) p3(ZRAM swap)',
  '[  0.224108] systemd[1]: Inserted module \'dm_crypt\'',
  '[  0.245812] systemd-fsck[412]: /dev/mapper/root: clean, 412093/31200000 files',
  '[  0.281903] systemd[1]: Mounting /dev/nvme0n1p2 on /sysroot...',
  '[  0.312440] systemd[1]: Starting NetworkManager.service...',
  '[  0.345600] systemd[1]: Loading kernel modules: zram, btrfs, snd_hda_intel',
  '[  0.389201] systemd[1]: Reached target Local File Systems (pre).',
  '[  0.420110] systemd[1]: Started WireGuard Tunnel Interface (wg0).',
  '[  0.461900] systemd[1]: Initializing Hyprland Compositor & Wayland Socket...',
  '[  0.510200] hyprland: Using DRM backend on /dev/dri/card0 (NVIDIA RTX 40-Series)',
  '[  0.540112] hyprland: Configured 144Hz G-Sync adaptive sync monitor.',
  '[  0.589100] waybar: Initialized modular status indicators (CPU, RAM, Audio).',
  '[  0.640220] portfolio-runtime: Initializing Gurmukh Singh systems core...',
  '[  0.680000] [  OK  ] Reached target Graphical Interface.'
];
