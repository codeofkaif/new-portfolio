import { useState } from 'react';
import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import { skills } from '@/data/skills';
import { staggerContainer, fadeUpItem } from '@/lib/motionVariants';

// ── Category filter tabs ──────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Language', 'Backend', 'Database', 'DevOps', 'Frontend', 'CS'] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

// ── Custom tooltip ────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: { name: string; proficiency: number; color: string } }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      className="px-3 py-2 rounded-xl text-xs font-semibold"
      style={{
        background: 'rgba(16,21,31,0.95)',
        border: `1px solid ${d.color}50`,
        color: d.color,
        backdropFilter: 'blur(12px)',
      }}
    >
      {d.name} — {d.proficiency}%
    </div>
  );
}

// ── Skill legend row ──────────────────────────────────────────────────────────
function SkillLegendItem({ skill }: { skill: typeof skills[number] }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold text-[#D1D5DB] truncate">{skill.name}</span>
          <span className="text-[10px] font-mono text-[#6B7280] ml-2 shrink-0">{skill.proficiency}%</span>
        </div>
        <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: skill.color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function TechRadar() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  // Recharts needs data sorted by proficiency desc for nice radial bars
  const chartData = [...filtered]
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, 12) // max 12 bars for readability
    .map((s) => ({ name: s.name, proficiency: s.proficiency, fill: s.color, color: s.color }));

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-60px' }}
      className="space-y-8"
    >
      {/* Category filter tabs */}
      <motion.div variants={fadeUpItem} className="flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-200"
            style={
              activeCategory === cat
                ? {
                    background: 'rgba(245,199,106,0.15)',
                    borderColor: 'rgba(245,199,106,0.4)',
                    color: '#F5C76A',
                  }
                : {
                    background: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    color: '#6B7280',
                  }
            }
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Two-column: chart + legend */}
      <motion.div
        variants={fadeUpItem}
        className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-center"
      >
        {/* Radial bar chart */}
        <div
          className="relative rounded-2xl p-6"
          style={{
            background: 'rgba(16,21,31,0.55)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Heading inside chart panel */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#F5C76A', boxShadow: '0 0 8px 2px rgba(245,199,106,0.5)' }}
            />
            <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-[#9CA3AF]">
              Proficiency Radar
            </span>
            <span className="ml-auto text-[10px] text-[#4B5563] font-mono">
              {filtered.length} skills · {activeCategory}
            </span>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="18%"
                outerRadius="95%"
                barSize={10}
                data={chartData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  dataKey="proficiency"
                  background={{ fill: 'rgba(255,255,255,0.03)' }}
                  cornerRadius={5}
                  isAnimationActive
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
                <Tooltip content={<CustomTooltip />} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] text-center pointer-events-none">
            <p className="text-2xl font-black text-[#F1F1F4]">{filtered.length}</p>
            <p className="text-[10px] text-[#6B7280] font-mono uppercase tracking-wider">skills</p>
          </div>
        </div>

        {/* Legend: bar chart per skill */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-3 max-h-[460px] overflow-y-auto"
          style={{
            background: 'rgba(16,21,31,0.55)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.08) transparent',
          }}
        >
          <p className="text-[11px] font-mono font-semibold tracking-wider uppercase text-[#9CA3AF] mb-2">
            Skill Breakdown
          </p>
          {filtered.map((skill) => (
            <SkillLegendItem key={skill.name} skill={skill} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
