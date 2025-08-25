// src/components/ProjectDetail.jsx
import { motion } from "framer-motion";

const Card = ({ title, children }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
    {title && (
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
    )}
    {children}
  </div>
);

const Bullet = ({ text }) => (
  <li className="leading-relaxed text-gray-700">{text}</li>
);

export default function ProjectDetail({ project }) {
  const d = project?.detail || null;

  return (
    <div className="space-y-8">
      {/* 프로젝트 개요 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card title="프로젝트 개요">
          {!d ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
              <div className="text-gray-400 text-3xl mb-3">📝</div>
              <div className="text-gray-600 font-medium mb-2">
                상세 내용 준비 중
              </div>
              <div className="text-gray-500 text-sm">
                프로젝트의 기획 배경, 개발 과정, 주요 기능 등의
                <br />
                상세 내용이 곧 추가될 예정입니다.
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {d.goals?.length ? (
                <section>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    목표
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {d.goals.map((g, i) => (
                      <Bullet key={i} text={g} />
                    ))}
                  </ul>
                </section>
              ) : null}

              {d.background?.length ? (
                <section>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    배경
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {d.background.map((b, i) => (
                      <Bullet key={i} text={b} />
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          )}
        </Card>
      </motion.div>

      {/* 기술 스택 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card title="기술 스택">
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + index * 0.04 }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-800 transition-colors cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {d?.stackReasons?.length ? (
            <div className="mt-5 space-y-2">
              {d.stackReasons.map((s, i) => (
                <div key={i} className="text-gray-700">
                  <span className="font-semibold text-gray-900">{s.name}</span>
                  <span className="mx-2 text-gray-400">·</span>
                  <span>{s.reason}</span>
                </div>
              ))}
            </div>
          ) : null}
        </Card>
      </motion.div>

      {/* 개발 기간 & 팀 구성 / 주요 성과 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card title="프로젝트 정보">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">개발 기간</span>
              <span className="font-medium text-gray-900">
                {project.duration}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">팀 구성</span>
              <span className="font-medium text-gray-900">
                {project.teamSize}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">프로젝트 유형</span>
              <span className="font-medium text-gray-900">
                {project.result}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">개발 시기</span>
              <span className="font-medium text-gray-900">
                {project.period}
              </span>
            </div>
          </div>
        </Card>

        <Card title="주요 성과">
          <div className="space-y-3">
            {project.hasAward ? (
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span>프로젝트 우수상 수상</span>
              </div>
            ) : null}
            {d?.outcomes?.length ? (
              d.outcomes.map((o, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{o}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>최신 기술 스택 활용</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>사용자 경험 중심 설계</span>
                </div>
              </>
            )}
          </div>

          {d?.metrics?.length ? (
            <div className="mt-5 grid grid-cols-2 gap-3">
              {d.metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 p-3 text-center bg-gray-50"
                >
                  <div className="text-xs text-gray-500">{m.label}</div>
                  <div className="text-xl font-semibold text-gray-900">
                    {m.value}
                  </div>
                  {m.note ? (
                    <div className="text-xs text-gray-500 mt-1">{m.note}</div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </Card>
      </motion.div>

      {/* 역할 & 기여 / 주요 기능 */}
      {d ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card title="담당 역할 및 기여">
            {d.role?.title ? (
              <div className="text-gray-900 font-semibold mb-2">
                {d.role.title}
              </div>
            ) : null}
            {d.role?.contributions?.length ? (
              <ul className="list-disc pl-5 space-y-1">
                {d.role.contributions.map((c, i) => (
                  <Bullet key={i} text={c} />
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">역할 및 기여가 곧 추가됩니다.</div>
            )}
          </Card>

          <Card title="주요 기능">
            {d.features?.length ? (
              <ul className="list-disc pl-5 space-y-1">
                {d.features.map((f, i) => (
                  <Bullet key={i} text={f} />
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">주요 기능이 곧 추가됩니다.</div>
            )}
          </Card>
        </motion.div>
      ) : null}

      {/* 문제 해결 사례 */}
      {d?.problems?.length ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card title="문제 해결 사례">
            <div className="space-y-4">
              {d.problems.map((p, i) => (
                <div key={i} className="rounded-lg border border-gray-200 p-4">
                  <div className="font-semibold text-gray-900">문제</div>
                  <div className="text-gray-700 mb-2">{p.title}</div>
                  <div className="font-semibold text-gray-900">해결</div>
                  <div className="text-gray-700">{p.solution}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      ) : null}

      {/* 회고 */}
      {d?.retrospective ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card title="프로젝트 회고">
            <div className="space-y-4">
              {d.retrospective.regrets?.length ? (
                <section>
                  <div className="text-gray-900 font-semibold mb-1">
                    아쉬웠던 점
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {d.retrospective.regrets.map((r, i) => (
                      <Bullet key={i} text={r} />
                    ))}
                  </ul>
                </section>
              ) : null}

              {d.retrospective.improvements?.length ? (
                <section>
                  <div className="text-gray-900 font-semibold mb-1">
                    개선 방안
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {d.retrospective.improvements.map((r, i) => (
                      <Bullet key={i} text={r} />
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </Card>

          <Card title="배운 점 & 깨달음">
            <div className="space-y-4">
              {d.retrospective.learnings?.length ? (
                <section>
                  <div className="text-gray-900 font-semibold mb-1">
                    새롭게 알게 된 점
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {d.retrospective.learnings.map((l, i) => (
                      <Bullet key={i} text={l} />
                    ))}
                  </ul>
                </section>
              ) : null}

              {d.retrospective.insights?.length ? (
                <section>
                  <div className="text-gray-900 font-semibold mb-1">
                    깨달은 점
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {d.retrospective.insights.map((l, i) => (
                      <Bullet key={i} text={l} />
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </Card>
        </motion.div>
      ) : null}

      {/* 선택: 갤러리 */}
      {d?.gallery?.length ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card title="스크린샷">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {d.gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  loading="lazy"
                  alt={`screenshot-${i + 1}`}
                  className="w-full h-36 object-cover rounded-lg border border-gray-200"
                />
              ))}
            </div>
          </Card>
        </motion.div>
      ) : null}
    </div>
  );
}
