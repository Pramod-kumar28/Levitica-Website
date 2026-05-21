import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FaBullhorn, FaUsers, FaHandshake, FaUserTie, FaChartLine, FaRocket } from "react-icons/fa6";
import { FaPhone, FaChartPie, FaGoogle, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const consultancyServices = [
  {
    icon: FaBullhorn,
    title: "Digital Marketing Strategy",
    desc: "Comprehensive marketing strategies including SEO, SEM, social media, and content marketing.",
    longDesc: "We help businesses increase online visibility, drive targeted traffic, and generate qualified leads through data-driven marketing campaigns.",
    color: "orange",
    bgLight: "bg-orange-50 dark:bg-orange-950/20",
    bgDark: "bg-orange-100 dark:bg-orange-950/40",
    iconBg: "bg-orange-100 dark:bg-orange-950/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    numberColor: "text-orange-200",
    hoverColor: "group-hover:border-orange-200",
    stats: ["SEO Optimization", "Social Media", "Email Marketing", "Content Strategy"],
  },
  {
    icon: FaPhone,
    title: "Brand Development",
    desc: "Build a powerful brand identity that resonates with your target audience.",
    longDesc: "From logo design to brand voice, we craft authentic brand experiences that create lasting connections with your customers.",
    color: "pink",
    bgLight: "bg-pink-50 dark:bg-pink-950/20",
    bgDark: "bg-pink-100 dark:bg-pink-950/40",
    iconBg: "bg-pink-100 dark:bg-pink-950/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    numberColor: "text-pink-200",
    hoverColor: "group-hover:border-pink-200",
    stats: ["Brand Strategy", "Visual Identity", "Brand Voice", "Market Positioning"],
  },
  {
    icon: FaChartPie,
    title: "Sales Analytics & CRM",
    desc: "Optimize your sales process with data-driven insights and CRM implementation.",
    longDesc: "Transform your sales data into actionable insights with custom dashboards and automated CRM workflows.",
    color: "green",
    bgLight: "bg-green-50 dark:bg-green-950/20",
    bgDark: "bg-green-100 dark:bg-green-950/40",
    iconBg: "bg-green-100 dark:bg-green-950/30",
    iconColor: "text-green-600 dark:text-green-400",
    numberColor: "text-green-200",
    hoverColor: "group-hover:border-green-200",
    stats: ["Sales Forecasting", "CRM Setup", "Pipeline Management", "Performance Metrics"],
  },
  {
    icon: FaUsers,
    title: "Lead Generation",
    desc: "Targeted lead generation campaigns to grow your customer base and increase revenue.",
    longDesc: "We identify, engage, and convert high-quality leads through multi-channel campaigns tailored to your ideal customer profile.",
    color: "blue",
    bgLight: "bg-blue-50 dark:bg-blue-950/20",
    bgDark: "bg-blue-100 dark:bg-blue-950/40",
    iconBg: "bg-blue-100 dark:bg-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    numberColor: "text-blue-200",
    hoverColor: "group-hover:border-blue-200",
    stats: ["B2B Lead Gen", "B2C Campaigns", "LinkedIn Outreach", "Email Sequences"],
  },
  {
    icon: FaHandshake,
    title: "IT Consultancy",
    desc: "Strategic IT advisory services to align technology with your business goals.",
    longDesc: "Our IT experts help you leverage technology as a competitive advantage through strategic planning and implementation.",
    color: "purple",
    bgLight: "bg-purple-50 dark:bg-purple-950/20",
    bgDark: "bg-purple-100 dark:bg-purple-950/40",
    iconBg: "bg-purple-100 dark:bg-purple-950/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    numberColor: "text-purple-200",
    hoverColor: "group-hover:border-purple-200",
    stats: ["Tech Stack Audit", "Digital Transformation", "Cloud Strategy", "Security Assessment"],
  },
  {
    icon: FaUserTie,
    title: "Staffing Solutions",
    desc: "Access to pre-vetted technical talent for your projects and permanent roles.",
    longDesc: "We connect you with top-tier talent that matches your culture, requirements, and budget constraints.",
    color: "teal",
    bgLight: "bg-teal-50 dark:bg-teal-950/20",
    bgDark: "bg-teal-100 dark:bg-teal-950/40",
    iconBg: "bg-teal-100 dark:bg-teal-950/30",
    iconColor: "text-teal-600 dark:text-teal-400",
    numberColor: "text-teal-200",
    hoverColor: "group-hover:border-teal-200",
    stats: ["Permanent Hiring", "Contract Staffing", "Remote Talent", "Executive Search"],
  },
];

const ConsultancyMarketing = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  const getColorClasses = (color) => {
    const colors = {
      orange: {
        number: "text-orange-200 dark:text-orange-800/40 group-hover:text-orange-300 dark:group-hover:text-orange-400",
        border: "border-gray-100 dark:border-dark_border/20 group-hover:border-orange-200 dark:group-hover:border-orange-500/30",
        icon: "text-orange-500",
        button: "bg-orange-600 hover:bg-orange-700",
        gradient: "from-orange-600 to-red-600",
      },
      pink: {
        number: "text-pink-200 dark:text-pink-800/40 group-hover:text-pink-300 dark:group-hover:text-pink-400",
        border: "border-gray-100 dark:border-dark_border/20 group-hover:border-pink-200 dark:group-hover:border-pink-500/30",
        icon: "text-pink-500",
        button: "bg-pink-600 hover:bg-pink-700",
        gradient: "from-pink-600 to-rose-600",
      },
      green: {
        number: "text-green-200 dark:text-green-800/40 group-hover:text-green-300 dark:group-hover:text-green-400",
        border: "border-gray-100 dark:border-dark_border/20 group-hover:border-green-200 dark:group-hover:border-green-500/30",
        icon: "text-green-500",
        button: "bg-green-600 hover:bg-green-700",
        gradient: "from-green-600 to-emerald-600",
      },
      blue: {
        number: "text-blue-200 dark:text-blue-800/40 group-hover:text-blue-300 dark:group-hover:text-blue-400",
        border: "border-gray-100 dark:border-dark_border/20 group-hover:border-blue-200 dark:group-hover:border-blue-500/30",
        icon: "text-blue-500",
        button: "bg-blue-600 hover:bg-blue-700",
        gradient: "from-blue-600 to-indigo-600",
      },
      purple: {
        number: "text-purple-200 dark:text-purple-800/40 group-hover:text-purple-300 dark:group-hover:text-purple-400",
        border: "border-gray-100 dark:border-dark_border/20 group-hover:border-purple-200 dark:group-hover:border-purple-500/30",
        icon: "text-purple-500",
        button: "bg-purple-600 hover:bg-purple-700",
        gradient: "from-purple-600 to-indigo-600",
      },
      teal: {
        number: "text-teal-200 dark:text-teal-800/40 group-hover:text-teal-300 dark:group-hover:text-teal-400",
        border: "border-gray-100 dark:border-dark_border/20 group-hover:border-teal-200 dark:group-hover:border-teal-500/30",
        icon: "text-teal-500",
        button: "bg-teal-600 hover:bg-teal-700",
        gradient: "from-teal-600 to-cyan-600",
      },
    };
    return colors[color] || colors.orange;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-darkmode dark:to-darklight border-b border-lightgray dark:border-dark_border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 mb-4">
            <FaRocket className="text-sm" />
            <span className="text-sm font-semibold uppercase tracking-wide">Consultancy & Marketing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
            Consultancy & <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Marketing</span>
          </h2>
          <p className="text-gray-600 dark:text-slate-300 max-w-2xl mx-auto mt-4">
            Strategic solutions to help your business grow and succeed in today's competitive market
          </p>
        </div>

        {/* Two Column Layout with Numbers */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {consultancyServices.map((service, index) => {
            const Icon = service.icon;
            const colors = getColorClasses(service.color);
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex gap-5 group cursor-pointer transition-all duration-300 hover:translate-x-1"
              >
                <div className={`text-3xl font-bold ${colors.number} transition w-12`}>
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div className={`flex-1 pb-6 border-b ${colors.border} transition`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg ${service.iconBg} flex items-center justify-center`}>
                      <Icon className={`${service.iconColor} text-lg`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {service.stats.slice(0, 2).map((stat, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 rounded-full ${service.bgLight} ${service.iconColor}`}>
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ConsultancyMarketing;