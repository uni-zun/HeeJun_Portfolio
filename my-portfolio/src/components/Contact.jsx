// src/components/Contact.jsx
import { useState, useMemo, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Mail, Github, MapPin, CalendarDays, Copy } from "lucide-react";

function useClipboard(timeout = 1400) {
  const [copied, setCopied] = useState(false);
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (e) {
      console.error("Clipboard copy failed:", e);
    }
  };
  return { copied, copy };
}

export default function Contact() {
  const email = "yhj0566@gmail.com";
  const github = "https://github.com/uni-zun";
  const location = "Gwangju, Korea";
  const birthday = "1997-05-12";

  const { copied, copy } = useClipboard();
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 400, damping: 35, mass: 0.8 },
      },
    }),
    []
  );

  const hoverLift = prefersReducedMotion
    ? {}
    : { whileHover: { y: -2 }, whileTap: { scale: 0.98 } };
  const cardBase =
    "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300";

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-zinc-100 py-16"
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-5xl px-6 relative">
        {/* Title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-6xl md:text-7xl font-light text-zinc-900 tracking-tight mb-8"
          >
            Contact
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-16 h-px bg-zinc-900 mx-auto"
          />
        </motion.div>

        {/* 카드 */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* 이메일 */}
          <motion.button
            {...hoverLift}
            onClick={() => copy(email)}
            className={`${cardBase} min-h-32 flex items-start text-left group pb-10 relative`}
            aria-label="이메일 복사"
            title="클릭 시 이메일이 복사됩니다"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-zinc-900 p-2 text-white">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm text-zinc-500">Email</div>
                <div className="font-medium text-zinc-900 flex items-center gap-2">
                  {email}
                  <Copy
                    className="h-4 w-4 text-zinc-400 group-hover:text-zinc-700 transition"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* 토스트 */}
            <motion.div
              initial={false}
              animate={
                copied && !prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: copied ? 1 : 0, y: copied ? 0 : 4 }
              }
              className="pointer-events-none absolute left-5 bottom-4 rounded-full bg-zinc-50 px-3 py-1 text-xs text-zinc-600 shadow-sm"
              aria-live="polite"
            >
              {copied ? "이메일이 복사되었습니다!" : " "}
            </motion.div>
          </motion.button>

          {/* 깃허브 */}
          <motion.a
            {...hoverLift}
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardBase} min-h-32 flex items-start`}
            aria-label="깃허브 프로필 새 탭에서 열기"
            title="GitHub: uni-zun"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-zinc-900 p-2 text-white">
                <Github className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm text-zinc-500">GitHub</div>
                <div className="font-medium text-zinc-900">uni-zun</div>
              </div>
            </div>
          </motion.a>

          {/* 지역 / 생일 */}
          <motion.div
            {...hoverLift}
            className={cardBase}
            role="region"
            aria-label="프로필 기본 정보"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-zinc-900 p-2 text-white">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm text-zinc-500">Location</div>
                <div className="font-medium text-zinc-900">{location}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="rounded-xl bg-zinc-900 p-2 text-white">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm text-zinc-500">Birthday</div>
                <div className="font-medium text-zinc-900">{birthday}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 하단 안내 */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            협업/채용 관련 문의는 이메일로 보내주세요. 빠르게 답장드릴게요.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
