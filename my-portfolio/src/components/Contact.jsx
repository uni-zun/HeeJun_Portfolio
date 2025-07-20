import { Mail, Github, MapPin, Cake } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 py-32 overflow-hidden"
    >
      {/* 상단 웨이브 경계 */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-0">
        <svg viewBox="0 0 1440 120" className="w-full h-24 fill-white">
          <path d="M0,32L48,48C96,64,192,96,288,90.7C384,85,480,43,576,32C672,21,768,43,864,69.3C960,96,1056,128,1152,122.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* 섹션 헤더 */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center text-6xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight"
        >
          Contact
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-12 h-px bg-gray-900 mx-auto mb-16 origin-left"
        />

        {/* 정보 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-10 space-y-6"
        >
          <ContactItem icon={<Cake />} text="1997.05.12" />
          <ContactItem
            icon={<Mail />}
            text="yhj0566@gmail.com"
            href="mailto:yhj0566@gmail.com"
          />
          <ContactItem
            icon={<Github />}
            text="깃허브 바로가기"
            href="https://github.com/uni-zun"
          />
          <ContactItem icon={<MapPin />} text="광주 각화동" />
        </motion.div>
      </div>
    </section>
  );
}

function ContactItem({ icon, text, href }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="text-gray-700 group-hover:scale-105 transition-transform duration-200">
        {icon}
      </div>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-gray-800 underline underline-offset-4 hover:text-gray-900 transition"
        >
          {text}
        </a>
      ) : (
        <span className="text-lg text-gray-800">{text}</span>
      )}
    </div>
  );
}
