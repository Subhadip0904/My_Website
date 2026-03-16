export const resumeData = {
  basics: {
    name: "Subhadip Banerjee",
    title: "Computer Science Engineer | Software Developer",
    summary: "Software Developer and Computer Science Engineer with a strong foundation in building scalable backend architectures and integrating cutting-edge AI/ML and Generative AI models. Passionate about bridging the gap between complex software engineering challenges and intelligent, real-world AI solutions.",
    location: "Sesto San Giovanni, Milan, Italy",
    email: "dipbanerjee604@gmail.com",
    phone: "+39 344 560 1950",
    links: [
      { name: "GitHub", url: "https://github.com/Subhadip0904" },
      { name: "LinkedIn", url: "https://linkedin.com/in/subhadip-banerjee" }
    ]
  },
  experience: [
    {
      company: "Micron International Academy, University of Naples Federico II",
      role: "Academic-Industrial Program Participant",
      dates: "Jan 2026 – Jun 2026 (On-going)",
      location: "Naples, Italy",
      bullets: [
        "Selected via Politecnico di Milano Career Days for a competitive academic–industrial program in partnership with Micron Technology.",
        "Proactively applying AI-driven code analysis and logical test generation to mNAND embedded systems; gained exposure to FTL, UFS/eMMC standards, RTOS, and AI-assisted hardware characterization using logic analyzers."
      ]
    },
    {
      company: "Capgemini Technology Services India Ltd.",
      role: "Software Analyst",
      dates: "Jul 2022 – Jul 2024",
      location: "Mumbai, India",
      bullets: [
        "Architected automated CI/CD pipelines for Agile delivery, reducing release cycle times by 15% through process automation and cross-team coordination.",
        "Authored 30+ technical specification documents, improving QA efficiency and ensuring full audit compliance; collaborated cross-functionally on enterprise-scale software deliveries."
      ]
    },
    {
      company: "WhiteHat Jr",
      role: "User Engagement",
      dates: "August 2021 - October 2021",
      location: "India",
      bullets: []
    },
    {
      company: "Tech Mahindra",
      role: "Technical Support Specialist",
      dates: "February 2021 - August 2021",
      location: "India",
      bullets: []
    }
  ],
  achievements: [
    { metric: "15%", context: "Accelerated release cycle times by architecting automated CI/CD pipelines and streamlining cross-team agile delivery." },
    { metric: "94%", context: "Achieved peak diagnostic accuracy in COVID-19 detection models by leveraging advanced CNNs and transfer learning on 2,500+ CT scans." },
    { metric: "40%", context: "Boosted reporting efficiency and system throughput for an AI-Powered Internship Platform designed for 20,000+ concurrent users." },
    { metric: "87%", context: "Delivered high-precision classification on a massive 10,500+ image dataset using optimized EfficientNetV2B0 architectures." },
    { metric: "69.6%", context: "Outperformed baseline models by 20% in Mars Terrain Segmentation using custom U-Net with gated skip connections." },
    { metric: "30+", context: "Authored comprehensive technical specifications, driving QA efficiency and ensuring full enterprise audit compliance." },
    { metric: "Top 5%", context: "Secured a final weighted score of 27.9/30 in the highly competitive BIP CyberSec Talent Week 2025." }
  ],
  projects: [
    {
      title: "Blood Cell Classification",
      stack: ["PyTorch", "Keras", "EfficientNetV2B0"],
      bullets: [
        "Trained an 8-class image classifier on 10,530 images using EfficientNetV2B0 achieving 87% test accuracy.",
        "Benchmarked ResNet50V2 (77%), ConvNeXt-Base (38%); applied CLAHE preprocessing, RandAugment, and weighted cross-entropy loss for class imbalance."
      ],
      links: [],
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Mars Terrain Segmentation",
      stack: ["PyTorch", "U-Net", "Albumentations"],
      bullets: [
        "Built a custom U-Net with 4-layer encoder-decoder and gated skip connections, achieving Val. IoU 69.63% / Kaggle IoU 64.62%.",
        "Achieved 20pp gain over baseline via AdamW + CrossEntropy; used Albumentations augmentation pipeline."
      ],
      links: [],
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "AI-Powered Internship Platform",
      stack: ["Alloy 6", "UML"],
      bullets: [
        "Collaboratively designed and formally specified a full-stack matching platform using Alloy 6, automating constraint validation for matchmaking and recommendation modules.",
        "Delivered 73-page RASD (15 use cases, 14 sequence diagrams, UML); improved reporting efficiency by 40%; designed for 20,000 concurrent users."
      ],
      links: [],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Detection of COVID-19 from chest CT images",
      stack: ["CNNs", "Deep Learning"],
      bullets: [
        "Used Convolutional Neural Networks (CNNs) to detect COVID-19 from chest CT images.",
        "Developed an accurate and efficient model distinguishing COVID-19 patterns from other lung conditions to aid healthcare professionals."
      ],
      links: [],
      image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Geospatial Data Analysis for Zomato",
      stack: ["Python", "Data Analysis"],
      bullets: [
        "Analysed a dataset to get all relevant details about all restaurants in Banglore that support online orderes via Zomato.",
        "Used python to find most famous cuisines, most popular restaurant chains, highest rated cuisines and restaurants using charts and graphs."
      ],
      links: [],
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Airline Ticket Management",
      stack: ["Big Data Analytics"],
      bullets: [
        "Analysis masses of big data of airline ticket and reflecting the relevant information after pre-processing.",
        "Checked ticket capacity and updated reservation information and Ticket issue Register."
      ],
      links: [],
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80"
    }
  ],
  skills: [
    {
      category: "ML/DL Frameworks",
      items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Hugging Face Transformers", "LangChain", "FAISS", "EfficientNet", "ResNet", "U-Net"]
    },
    {
      category: "Generative AI & LLMs",
      items: ["Prompt Engineering", "RAG Pipelines", "LLM Fine-tuning", "Oracle GenAI (OCI)", "OpenAI API", "Mistral AI"]
    },
    {
      category: "Computer Vision",
      items: ["Semantic Segmentation", "Image Classification", "Transfer Learning", "Data Augmentation (Albumentations)"]
    },
    {
      category: "MLOps & Tools",
      items: ["Git", "GitFlow", "Docker", "Kubernetes", "Flask", "FastAPI", "MLflow", "Weights & Biases", "DVC", "Linux", "Agile/Scrum", "Jupyter", "NumPy", "Pandas", "Matplotlib"]
    },
    {
      category: "Programming",
      items: ["Python", "C/C++", "Java", "SQL"]
    },
    {
      category: "Embedded/Systems",
      items: ["mNAND Architecture", "FTL basics", "UFS/eMMC", "RTOS basics", "Logic Analyzers", "AI Test Generation"]
    },
    {
      category: "Cybersecurity",
      items: ["Network & System Security", "Threat Detection", "AI for Security", "Secure Software Development", "Penetration Testing", "Wireshark", "Burp Suite"]
    },
    {
      category: "Cloud & Other",
      items: ["Google Cloud Platform (GCP)", "Chatbot Development"]
    }
  ],
  education: [
    {
      degree: "MSc, Computer Science and Engineering",
      institution: "Politecnico di Milano, Italy",
      dates: "Sep 2024 – Present",
      details: "Specialization: Artificial Intelligence, Machine Learning, Deep Learning, Software Engineering"
    },
    {
      degree: "B.Tech, Computer Science and Engineering",
      institution: "University of Engineering and Management, Kolkata, India",
      dates: "Jun 2019 – Jun 2023",
      details: "Thesis: COVID-19 detection from CT scans using CNN-based image classification – achieved 94% accuracy on a dataset of 2,500 scans using transfer learning."
    },
    {
      degree: "Senior Secondary Education, Science(PCM)",
      institution: "Guru Gobind Singh Public School - Chas, Bokaro Steel City",
      dates: "July 2017 - May 2019",
      details: ""
    },
    {
      degree: "Matriculation",
      institution: "St.Xavier’s School Purulia",
      dates: "May 2008 - April 2017",
      details: ""
    }
  ],
  certifications: [
    "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional – Oracle Cloud; covers LLMs, prompt engineering, RAG and AI application deployment on OCI.",
    "BIP CyberSec Talent Week 2025 Certificate of Completion"
  ],
  awards: [
    "MAECI Merit-Based Scholarship (2024 - 2026) – Italian Ministry of Foreign Affairs; awarded for academic excellence to international students."
  ],
  languages: [
    { language: "English", proficiency: "C1 (Fluent)" },
    { language: "Italian", proficiency: "B1 (Intermediate)" }
  ],
  extra: [
    "Mission: Building the Future Through Intelligent and Scalable Systems. My goal is to bridge the gap between complex technical requirements and real-world applications. Whether it's designing robust backend architectures, automating delivery pipelines, or integrating AI capabilities, I strive to build software solutions that are innovative, efficient, and impactful."
  ]
};
