import { useState, useEffect } from 'react'
import { FaHome, FaUser, FaBriefcase, FaTools, FaGraduationCap, FaEnvelope, FaLinkedin, FaGithub, FaCode, FaDatabase, FaCloud, FaServer, FaAward, FaTrophy, FaCertificate, FaJava } from 'react-icons/fa'

const navItems = [
  { id: 'home', label: 'Home', icon: <FaHome /> },
  { id: 'about', label: 'About', icon: <FaUser /> },
  { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
  { id: 'skills', label: 'Skills', icon: <FaTools /> },
  { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
  { id: 'contact', label: 'Contact', icon: <FaEnvelope /> },
]

const skillCategories = [
  {
    title: 'Languages & Frameworks',
    icon: <FaCode className="text-2xl mb-4 text-blue-400" />,
    skills: [
      { name: 'Java', level: 90 },
      { name: 'Spring Boot', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'React', level: 85 },
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: <FaCloud className="text-2xl mb-4 text-blue-400" />,
    skills: [
      { name: 'AWS', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 75 },
      { name: 'CI/CD', level: 85 },
    ]
  },
  {
    title: 'Database & Tools',
    icon: <FaDatabase className="text-2xl mb-4 text-blue-400" />,
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Git', level: 90 },
      { name: 'Maven', level: 85 },
    ]
  }
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-slate-800' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent select-none hover:scale-105 transition-transform duration-300 cursor-pointer px-3 py-1">
                  JD
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-transparent transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800
                    ${activeSection === item.id
                      ? 'text-blue-400 bg-slate-900/80'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-slate-900/80'}
                  `}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-800 text-gray-300 group-hover:bg-blue-600 group-hover:text-white'
                  }`}>
                    <span className="relative text-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {item.icon}
                    </span>
                  </span>
                  <span className="relative font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative group text-gray-300 hover:text-blue-400 focus:outline-none transition-all duration-200 p-2 rounded-lg"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 group-hover:bg-blue-600">
                  <svg className="h-5 w-5 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-gray-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 animate-fade-in-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800
                    ${activeSection === item.id
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-blue-400'}
                  `}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-800 text-gray-300 group-hover:bg-blue-600 group-hover:text-white'
                  }`}>
                    <span className="relative text-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {item.icon}
                    </span>
                  </span>
                  <span className="relative font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/10 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10px] opacity-50">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-500/30 rounded-full blur-[128px] animate-pulse"></div>
              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>
            </div>
          </div>

          <div className="text-center text-white relative z-10 animate-fade-in-up max-w-4xl mx-auto px-4">
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full transform scale-150 animate-pulse"></div>
                <div className="relative">
                  <div className="inline-block p-3 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm mb-6 group hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl animate-wave inline-block">👋</span>
                  </div>
                  <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg animate-gradient">
                    JIJO DANIEL
                  </h1>
                  <div className="relative inline-block">
                    <p className="text-2xl md:text-3xl mb-3 text-gray-300 font-light">
                      Senior Software Developer
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-blue-200 flex items-center justify-center gap-2">
                  <span className="inline-block w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    📍
                  </span>
                  Toronto, Ontario
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-gray-300 text-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">📱</span>
                    <span>(437) 985-5859</span>
                  </div>
                  <span className="hidden md:inline text-blue-500/50">•</span>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">✉️</span>
                    <span>jijodaniel95@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-6 pt-6">
                <a
                  href="https://www.linkedin.com/in/jijo-daniel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                  <button className="relative bg-gradient-to-r from-blue-600/90 to-blue-700/90 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-3 hover:gap-5">
                    <FaLinkedin className="text-2xl transform group-hover:scale-110 transition-all duration-200" />
                    <span>LinkedIn</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                </a>
                <a
                  href="https://github.com/jijodaniel95"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                  <button className="relative bg-gradient-to-r from-gray-800/90 to-gray-900/90 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-3 hover:gap-5">
                    <FaGithub className="text-2xl transform group-hover:scale-110 transition-all duration-200" />
                    <span>GitHub</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-slate-800/60 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional Summary</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-xl p-8 shadow-xl border border-slate-700/50">
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <FaCode className="text-2xl text-blue-400" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-lg">
                        Java Developer with <span className="text-blue-400 font-semibold">5.3 years</span> of hands-on experience across the software development lifecycle. Skilled in developing scalable and high-performance enterprise applications using Spring Boot and Core Java. Proficient in ORM frameworks such as Hibernate and JPA.
                      </p>
                      <p className="text-lg">
                        Experienced in microservices architecture using Spring Boot and REST APIs. Developed and maintained RESTful (JAX-RS, Spring Boot) and SOAP web services with Swagger and WADL documentation integration. Comfortable with UNIX systems and Shell scripting for automation and environment management.
                      </p>
                      <p className="text-lg">
                        Holds a Master's degree in Computer Applications (MCA) from Saintgits College of Engineering with a CGPA of 7.74, and a Bachelor's degree in Computer Applications (BCA) from Parumala Mar Gregorious College with a CGPA of 6.68. Strong foundation in computer science fundamentals and modern software development practices.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-500/10 p-3 rounded-lg">
                      <FaServer className="text-2xl text-purple-400" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-lg">
                        Hands-on experience with messaging queues like RabbitMQ and Kafka. Expert in build tools like Maven and Gradle. Successfully migrated Fusion legacy services to modern Spring Boot-based microservices architecture, improving system maintainability and scalability.
                      </p>
                      <p className="text-lg">
                        Expertise in cloud-native development using Kubernetes and Google Cloud Platform (GCP). Experience with NGINX for load balancing and reverse proxy configurations in distributed systems.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-pink-500/10 p-3 rounded-lg">
                      <FaCloud className="text-2xl text-pink-400" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-lg">
                        Proficient in both Java and Go, with a proven record of <span className="text-blue-400 font-semibold">100% on-time</span> project delivery and successful RFP-based project extensions. Strong ability to work independently while collaborating effectively within team environments.
                      </p>
                      <p className="text-lg">
                        Strong focus on system reliability, incident management, and continuous improvement through R&D initiatives. Proven track record of proactively identifying and resolving technical challenges.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-semibold text-blue-400 mb-6">Soft Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-full border border-blue-500/20">Effective Communication</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 rounded-full border border-purple-500/20">Problem-Solving</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-red-500/10 text-pink-400 rounded-full border border-pink-500/20">Team Leadership</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-full border border-blue-500/20">Analytical Thinking</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 rounded-full border border-purple-500/20">Time Management</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-red-500/10 text-pink-400 rounded-full border border-pink-500/20">Documentation</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-full border border-blue-500/20">Team Mentorship</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 rounded-full border border-purple-500/20">Independent Work</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-red-500/10 text-pink-400 rounded-full border border-pink-500/20">R&D</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-full border border-blue-500/20">Attention to Detail</span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">5.3+</div>
                      <div className="text-gray-400">Years Experience</div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
                      <div className="text-gray-400">Project Delivery</div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-400 mb-2">50+</div>
                      <div className="text-gray-400">Microservices</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 bg-slate-900/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-full hidden md:block"></div>
              
              <div className="space-y-12">
                {/* Infosys Senior Role */}
                <div className="relative group">
                  <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                    <div className="md:text-right mb-8 md:mb-0 md:pr-8">
                      <div className="bg-slate-800/60 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700/50 group-hover:border-blue-500/50 relative">
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full hidden md:block">
                          <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-blue-400 mb-2">Senior System Engineer</h3>
                        <p className="text-gray-300 mb-1">Infosys Ltd, Kerala, India</p>
                        <p className="text-gray-400 text-sm">January 2023 - October 2024</p>
                      </div>
                    </div>
                    <div className="md:pl-8">
                      <div className="bg-slate-800/60 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700/50 group-hover:border-blue-500/50">
                        <ul className="list-none space-y-3 text-gray-300">
                          <li className="flex items-start gap-3">
                            <span className="text-blue-400 mt-1">→</span>
                            <span>Spearheaded the development of 50+ RESTful microservices using Spring Boot and Golang, deployed across distributed systems, ensuring system interoperability and scalability.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-400 mt-1">→</span>
                            <span>Orchestrated migration of 100+ microservices from OpenShift to GCP, reducing infrastructure costs by 40%.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-400 mt-1">→</span>
                            <span>Engineered NGINX-based routing solutions for optimized traffic distribution and peak load management with minimal latency.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-400 mt-1">→</span>
                            <span>Utilized GKE for containerized application management, ensuring high availability and scalability.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-400 mt-1">→</span>
                            <span>Upgraded Java monolithic design to Microservice architecture using Kafka, Spring Boot, Docker, and Kubernetes.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-400 mt-1">→</span>
                            <span>Achieved 100% project delivery with less than 2% defect rate across multiple high-stakes projects.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Infosys System Engineer Role */}
                <div className="relative group">
                  <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                    <div className="md:text-right mb-8 md:mb-0 md:pr-8">
                      <div className="bg-slate-800/60 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700/50 group-hover:border-purple-500/50 relative">
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full hidden md:block">
                          <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-purple-400 mb-2">System Engineer</h3>
                        <p className="text-gray-300 mb-1">Infosys Ltd, Kerala, India</p>
                        <p className="text-gray-400 text-sm">December 2021 - December 2022</p>
                      </div>
                    </div>
                    <div className="md:pl-8">
                      <div className="bg-slate-800/60 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700/50 group-hover:border-purple-500/50">
                        <ul className="list-none space-y-3 text-gray-300">
                          <li className="flex items-start gap-3">
                            <span className="text-purple-400 mt-1">→</span>
                            <span>Engineered and optimized 40+ server-side RESTful APIs using Spring Boot and Go, achieving 99.9% uptime.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-400 mt-1">→</span>
                            <span>Developed Go proxies for GCP Transformation, ensuring seamless integration and performance.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-400 mt-1">→</span>
                            <span>Created shell scripts to automate compilation, packaging, and deployment of MSA services in Apache TomEE.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-400 mt-1">→</span>
                            <span>Developed SOAP APIs for legacy system integrations, connecting 15+ key applications.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-400 mt-1">→</span>
                            <span>Reduced incident response times by 50% through comprehensive root cause analyses.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coolminds Role */}
                <div className="relative group">
                  <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                    <div className="md:text-right mb-8 md:mb-0 md:pr-8">
                      <div className="bg-slate-800/60 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700/50 group-hover:border-pink-500/50 relative">
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full hidden md:block">
                          <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-pink-400 mb-2">Software Engineer</h3>
                        <p className="text-gray-300 mb-1">Coolminds Technologies(P) Ltd</p>
                        <p className="text-gray-400 text-sm">July 2019 - November 2021</p>
                      </div>
                    </div>
                    <div className="md:pl-8">
                      <div className="bg-slate-800/60 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700/50 group-hover:border-pink-500/50">
                        <ul className="list-none space-y-3 text-gray-300">
                          <li className="flex items-start gap-3">
                            <span className="text-pink-400 mt-1">→</span>
                            <span>Designed and deployed full-stack solutions that improved internal process automation and reduced manual workload by 40%.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-pink-400 mt-1">→</span>
                            <span>Developed RESTful APIs using Spring Boot and Structs, increasing development speed by 25%.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-pink-400 mt-1">→</span>
                            <span>Developed custom APIs for client web applications, improving data retrieval speeds by 60%.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-pink-400 mt-1">→</span>
                            <span>Developed and tested Java-based programs ensuring robust technical design and implementation.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-slate-800/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Skills</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <FaCode className="text-3xl text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-400">Core Skills</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Backend Development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Microservices Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>System Design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>API Design (REST & SOAP)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Cloud Native Development</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-purple-500/10 p-3 rounded-lg">
                    <FaCloud className="text-3xl text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-purple-400">Technologies</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Java, Spring Boot, Hibernate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Golang, XML, JSON, YAML</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    <span>GCP, Kubernetes, Docker</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    <span>DevOps & CI/CD Tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Shell Scripting, PowerShell</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-pink-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-pink-500/10 p-3 rounded-lg">
                    <FaDatabase className="text-3xl text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-pink-400">Databases</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-pink-400">•</span>
                    <span>Oracle, SQL Server</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-400">•</span>
                    <span>MySQL, PostgreSQL</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-400">•</span>
                    <span>DB2</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-400">Testing & API Tools</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>JUnit, Mockito</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Postman, SoapUI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Swagger, JMeter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>SonarQube</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-400">Tools & IDEs</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>IntelliJ IDEA, Eclipse</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Spring Tool Suite, VS Code</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Git, GitHub, GitLab, SVN</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Maven, Gradle, Jenkins</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    <span>JIRA, Confluence</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-slate-900/50 p-8 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-semibold text-blue-400 mb-6">Development Practices & Concepts</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-full border border-blue-500/20">Agile Development</span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 rounded-full border border-purple-500/20">Scrum</span>
                <span className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-red-500/10 text-pink-400 rounded-full border border-pink-500/20">SDLC</span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-full border border-blue-500/20">DevOps</span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 rounded-full border border-purple-500/20">CI/CD</span>
                <span className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-red-500/10 text-pink-400 rounded-full border border-pink-500/20">Design Patterns</span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-full border border-blue-500/20">SOLID Principles</span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 rounded-full border border-purple-500/20">Code Reviews</span>
                <span className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-red-500/10 text-pink-400 rounded-full border border-pink-500/20">Unit Testing</span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-full border border-blue-500/20">Performance Testing</span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 rounded-full border border-purple-500/20">Virtualization</span>
                <span className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-red-500/10 text-pink-400 rounded-full border border-pink-500/20">Domain-Driven Design</span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 rounded-full border border-blue-500/20">System Design</span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 rounded-full border border-purple-500/20">API Design</span>
                <span className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-red-500/10 text-pink-400 rounded-full border border-pink-500/20">Cloud Native</span>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 bg-slate-900/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Education</h2>
            <div className="space-y-8">
              <div className="group bg-slate-900/50 hover:bg-slate-900/70 p-8 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-slate-700/50 hover:border-blue-500/50">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-500/10 p-4 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FaGraduationCap className="text-4xl text-blue-400" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-2xl font-semibold text-blue-300 mb-1 group-hover:text-blue-400 transition-colors">Master of Computer Applications (MCA)</h3>
                      <p className="text-xl text-gray-400">Saintgits College of Engineering</p>
                      <p className="text-gray-500">India</p>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="bg-slate-800/50 px-4 py-2 rounded-lg">
                        <p className="text-gray-400 text-sm">Duration</p>
                        <p className="text-blue-300 font-medium">Jan 2017 - Jan 2019</p>
                      </div>
                      <div className="bg-slate-800/50 px-4 py-2 rounded-lg">
                        <p className="text-gray-400 text-sm">CGPA</p>
                        <p className="text-blue-300 font-medium">7.74</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg p-4">
                      <h4 className="text-blue-300 font-medium mb-2">Key Coursework</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Advanced Algorithms</span>
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Distributed Systems</span>
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Cloud Computing</span>
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Database Management</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group bg-slate-900/50 hover:bg-slate-900/70 p-8 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-slate-700/50 hover:border-blue-500/50">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-500/10 p-4 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FaGraduationCap className="text-4xl text-blue-400" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-2xl font-semibold text-blue-300 mb-1 group-hover:text-blue-400 transition-colors">Bachelor of Computer Applications (BCA)</h3>
                      <p className="text-xl text-gray-400">Parumala Mar Gregorious College</p>
                      <p className="text-gray-500">India</p>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="bg-slate-800/50 px-4 py-2 rounded-lg">
                        <p className="text-gray-400 text-sm">Duration</p>
                        <p className="text-blue-300 font-medium">Jan 2013 - Jan 2016</p>
                      </div>
                      <div className="bg-slate-800/50 px-4 py-2 rounded-lg">
                        <p className="text-gray-400 text-sm">CGPA</p>
                        <p className="text-blue-300 font-medium">6.68</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg p-4">
                      <h4 className="text-blue-300 font-medium mb-2">Key Coursework</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Data Structures</span>
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Web Development</span>
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Programming Fundamentals</span>
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Software Engineering</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Certificates Section */}
        <section className="py-20 bg-slate-800/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Awards & Certificates</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Awards Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
                  <FaAward className="text-3xl text-blue-500" />
                  Awards & Honors
                </h3>
                <div className="space-y-4">
                  <div className="group bg-slate-900/50 hover:bg-slate-900/70 p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-slate-700/50 hover:border-blue-500/50">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-500/10 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <FaTrophy className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-1 group-hover:text-blue-400 transition-colors">Infosys Insta Award</h4>
                        <p className="text-gray-400 text-sm mb-2">September 2023</p>
                        <p className="text-gray-300">Significant contribution in Infosys Migration Tool (IMP) for migration work</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-slate-900/50 hover:bg-slate-900/70 p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-slate-700/50 hover:border-blue-500/50">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-500/10 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <FaTrophy className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-1 group-hover:text-blue-400 transition-colors">Infosys Insta Award</h4>
                        <p className="text-gray-400 text-sm mb-2">March 2023</p>
                        <p className="text-gray-300">Key developer in OpenShift to Anthos Microservices migration</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-slate-900/50 hover:bg-slate-900/70 p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-slate-700/50 hover:border-blue-500/50">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-500/10 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <FaTrophy className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-1 group-hover:text-blue-400 transition-colors">Infosys Insta Award</h4>
                        <p className="text-gray-400 text-sm mb-2">December 2022</p>
                        <p className="text-gray-300">Key developer in GCP Transformation Proxy development release</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificates Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center gap-3">
                  <FaCertificate className="text-3xl text-blue-500" />
                  Certificates
                </h3>
                <div className="grid gap-4">
                  <div className="group bg-slate-900/50 hover:bg-slate-900/70 p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-slate-700/50 hover:border-blue-500/50">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/10 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <FaCloud className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-300 group-hover:text-blue-400 transition-colors">Developing Containerized Applications on Google Cloud</h4>
                        <p className="text-gray-400">Coursera</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-slate-900/50 hover:bg-slate-900/70 p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-slate-700/50 hover:border-blue-500/50">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/10 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <FaCode className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-300 group-hover:text-blue-400 transition-colors">Java Full Stack Developer Specialization</h4>
                        <p className="text-gray-400">Coursera</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-slate-900/50 hover:bg-slate-900/70 p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-slate-700/50 hover:border-blue-500/50">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/10 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <FaCloud className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-300 group-hover:text-blue-400 transition-colors">Google Cloud Practitioner</h4>
                        <p className="text-gray-400">Infosys</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-slate-900/50 hover:bg-slate-900/70 p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-slate-700/50 hover:border-blue-500/50">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/10 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <FaJava className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-300 group-hover:text-blue-400 transition-colors">Java SE8 Developer</h4>
                        <p className="text-gray-400">Infosys</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-slate-900/50 hover:bg-slate-900/70 p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-slate-700/50 hover:border-blue-500/50">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/10 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <FaJava className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-300 group-hover:text-blue-400 transition-colors">Java Programmer</h4>
                        <p className="text-gray-400">Infosys</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-slate-800/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-gray-300 text-lg">Feel free to reach out for opportunities or just to say hi!</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                  <a
                    href="mailto:jijodaniel95@gmail.com"
                    className="relative flex items-center gap-4 bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="bg-blue-500/10 p-4 rounded-lg">
                      <FaEnvelope className="text-3xl text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400 mb-1">Email</h3>
                      <p className="text-gray-300">jijodaniel95@gmail.com</p>
                    </div>
                  </a>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                  <a
                    href="tel:+14379855859"
                    className="relative flex items-center gap-4 bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 group-hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="bg-purple-500/10 p-4 rounded-lg">
                      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-400 mb-1">Phone</h3>
                      <p className="text-gray-300">(437) 985-5859</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-75"></div>
                <form className="relative bg-slate-900/50 p-8 rounded-xl border border-slate-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg bg-slate-800/60 border border-slate-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg bg-slate-800/60 border border-slate-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-slate-800/60 border border-slate-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 transition-all duration-300"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <div className="text-right">
                    <button
                      type="submit"
                      className="group relative inline-flex items-center justify-center"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                      <span className="relative px-8 py-3 bg-slate-900 rounded-lg leading-none flex items-center divide-x divide-gray-600">
                        <span className="flex items-center space-x-2 pr-6">
                          <span className="text-blue-400 group-hover:text-blue-300 transition-colors">Send Message</span>
                        </span>
                        <span className="pl-6 text-purple-400 group-hover:text-purple-300 transition-colors">→</span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/95 backdrop-blur-xl text-white py-12 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="relative group inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent select-none hover:scale-105 transition-transform duration-300 cursor-pointer px-3 py-1">
                  JD
                </div>
              </div>
              <p className="mt-2 text-gray-400">Senior Software Developer</p>
            </div>

            <div className="text-center">
              <p className="text-gray-400">&copy; {new Date().getFullYear()} Jijo Daniel</p>
              <p className="text-gray-500 text-sm mt-1">All rights reserved.</p>
            </div>

            <div className="flex justify-center md:justify-end space-x-6">
              <a
                href="https://github.com/jijodaniel95"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <FaGithub className="text-2xl text-gray-400 hover:text-white transition-colors duration-300 relative" />
              </a>
              <a
                href="https://www.linkedin.com/in/jijo-daniel"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <FaLinkedin className="text-2xl text-gray-400 hover:text-white transition-colors duration-300 relative" />
              </a>
              <a
                href="mailto:jijodaniel95@gmail.com"
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <FaEnvelope className="text-2xl text-gray-400 hover:text-white transition-colors duration-300 relative" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
