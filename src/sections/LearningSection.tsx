import { motion } from 'framer-motion';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';
import { Brain, Link as LinkIcon, Hexagon, Sparkles } from 'lucide-react';

interface LearningItem {
  id: string;
  title: string;
  description: string;
  icon: typeof Brain;
  iconColor: string;
  status: 'In Progress' | 'Planned';
  percent: number;
  barColor: string;
}

const ITEMS: LearningItem[] = [
  { id: 'ml', title: 'Machine Learning', description: 'Learning ML algorithms, scikit-learn, and practical implementation.', icon: Brain, iconColor: '#8B5CF6', status: 'In Progress', percent: 60, barColor: '#8B5CF6' },
  { id: 'spring-cloud', title: 'Spring Cloud', description: 'Exploring microservices architecture, Eureka, Gateway & Config Server.', icon: LinkIcon, iconColor: '#3B82F6', status: 'In Progress', percent: 45, barColor: '#3B82F6' },
  { id: 'kubernetes', title: 'Kubernetes', description: 'Learning container orchestration and K8s fundamentals.', icon: Hexagon, iconColor: '#8B5CF6', status: 'Planned', percent: 30, barColor: '#8B5CF6' },
  { id: 'genai', title: 'Generative AI', description: 'Exploring LLMs, prompt engineering and building AI-powered apps.', icon: Sparkles, iconColor: '#10B981', status: 'In Progress', percent: 50, barColor: '#10B981' },
];

export function LearningSection() {
  return (
    <section id="learning" className="py-16 md:py-24 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <motion.div variants={fadeUpItem} className="lg:sticky lg:top-24 w-[280px] shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
                <span className="text-[11px] font-medium text-[#8B5CF6] tracking-widest uppercase">CURRENT LEARNING</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#F1F1F4] leading-tight mb-4">
                What I&apos;m Learning
              </h2>
              <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-[260px]">
                Technologies and concepts I&apos;m currently exploring to stay ahead in the tech world.
              </p>
            </motion.div>

            <motion.div variants={fadeUpItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
              {ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id}
                    className="bg-transparent border border-white/[0.07] rounded-2xl p-5 flex flex-col justify-between hover:border-white/[0.14] transition-all duration-300 min-h-[220px] group">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${item.iconColor}15`, border: `1px solid ${item.iconColor}30` }}>
                          <Icon className="w-5 h-5" style={{ color: item.iconColor }} />
                        </div>
                        <h3 className="text-[14px] font-bold text-[#F1F1F4] group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-[12px] text-[#9CA3AF] leading-relaxed mb-4">{item.description}</p>
                    </div>
                    <div className="mt-auto">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-semibold bg-white/5 mb-3"
                        style={{ color: item.iconColor }}>
                        {item.status}
                      </span>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${item.barColor}, ${item.barColor}99)` }}
                          />
                        </div>
                        <div className="flex justify-end">
                          <span className="text-[11px] font-mono text-[#F1F1F4]">
                            {item.percent}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
