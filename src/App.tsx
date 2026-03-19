import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Users, 
  User, 
  Video, 
  BarChart3, 
  MapPin, 
  GraduationCap, 
  Plus, 
  Eye, 
  ChevronRight,
  Search,
  Activity,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Play,
  Ruler,
  Weight,
  Calendar,
  Award,
  Link as LinkIcon,
  MessageSquare
} from 'lucide-react';
import { Player, ScoutActivity, PlayerBenchmarks } from './types';

// --- Components ---

const LiveTicker = () => (
  <div className="bg-emerald-600 text-white py-3 overflow-hidden whitespace-nowrap border-y border-emerald-500">
    <div className="inline-block animate-marquee">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="mx-8 text-[10px] font-black uppercase tracking-[0.2em] flex-shrink-0">
          • Scout View: Stanford University viewed Leo Rodriguez • Commitment: Marcus Chen to UCLA • New Benchmark: Julian Rivera 94th Percentile • 
          • Sighting: Duke Scout at Florida State Cup • Update: 3 New D1 offers for Leo Rodriguez • Market Trend: Rising demand for left-footed center backs •
          • Scholarship Alert: 14 new D1 programs joined Next11 • Verified: Julian Rivera benchmarks verified by national team •
        </span>
      ))}
    </div>
  </div>
);

const TrustStats = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-3xl overflow-hidden my-20 shadow-sm">
    {[
      { label: 'Players Tracked', value: '5M+', sub: 'Global Database' },
      { label: 'Verified Scouts', value: '12K+', sub: 'Active Recruiters' },
      { label: 'Colleges Active', value: '850+', sub: 'NCAA & NAIA' },
      { label: 'Placement Rate', value: '92%', sub: 'Success Metric' },
    ].map((stat, i) => (
      <div key={i} className="bg-white p-10 hover:bg-zinc-50 transition-colors group cursor-default">
        <p className="text-5xl font-bold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors">{stat.value}</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{stat.label}</p>
        <p className="text-[10px] text-zinc-300 font-medium">{stat.sub}</p>
      </div>
    ))}
  </div>
);

const FeaturesBento = () => (
  <section className="py-20 text-left">
    <div className="flex items-center gap-3 mb-12">
      <div className="h-px flex-1 bg-zinc-100" />
      <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400 px-4">The Next11 Advantage</h3>
      <div className="h-px flex-1 bg-zinc-100" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
      <div className="md:col-span-8 bg-zinc-900 rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
          <BarChart3 size={200} className="text-emerald-500" />
        </div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
            <BarChart3 className="text-emerald-400" />
          </div>
          <h4 className="text-3xl font-bold text-white mb-4">Verified Intelligence</h4>
          <p className="text-zinc-400 text-lg max-w-md leading-relaxed font-medium">
            Our proprietary AI analyzes performance data to provide objective intelligence scores recognized by top scouts.
          </p>
        </div>
        <button className="relative z-10 self-start mt-8 bg-white text-zinc-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-400 transition-colors">
          Explore Methodology
        </button>
      </div>
      
      <div className="md:col-span-4 bg-emerald-50 rounded-3xl p-10 flex flex-col justify-between border border-emerald-100 hover:bg-emerald-100 transition-colors group">
        <div>
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
            <Video className="text-emerald-600" />
          </div>
          <h4 className="text-2xl font-bold text-emerald-900 mb-4">Synced Proof</h4>
          <p className="text-emerald-800/70 text-sm leading-relaxed font-medium">
            Every benchmark is backed by video evidence. Scouts don't just see the numbers; they see the proof.
          </p>
        </div>
        <div className="mt-8 aspect-video bg-white/50 rounded-xl border border-emerald-200 flex items-center justify-center group-hover:bg-white transition-colors">
          <Play size={24} className="text-emerald-600 fill-current" />
        </div>
      </div>

      <div className="md:col-span-4 bg-zinc-50 rounded-3xl p-10 border border-zinc-200 hover:border-zinc-400 transition-colors">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-zinc-100">
          <Users className="text-zinc-900" />
        </div>
        <h4 className="text-2xl font-bold text-zinc-900 mb-4">Direct Access</h4>
        <p className="text-zinc-500 text-sm leading-relaxed font-medium">
          Bypass the gatekeepers. Your profile is directly accessible to our network of 12,000+ verified recruiters.
        </p>
      </div>

      <div className="md:col-span-8 bg-white border border-zinc-200 rounded-3xl p-10 flex items-center gap-10 hover:shadow-xl transition-shadow">
        <div className="flex-1">
          <h4 className="text-2xl font-bold text-zinc-900 mb-4">Scout Dashboard</h4>
          <p className="text-zinc-500 text-sm leading-relaxed font-medium">
            Advanced filtering, custom watchlists, and real-time alerts for scouts looking for specific player profiles.
          </p>
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-3 flex-1">
          {[1,2,3,4].map(i => <div key={i} className="h-12 bg-zinc-50 rounded-lg border border-zinc-100" />)}
        </div>
      </div>
    </div>
  </section>
);

const TrendingProspects = ({ players }: { players: Player[] }) => {
  const trending = players.slice(0, 3);
  
  return (
    <section className="py-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Market Watch</h3>
          <h2 className="text-4xl font-bold text-zinc-900 tracking-tight">Trending Prospects</h2>
        </div>
        <button className="text-sm font-bold text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2">
          View All <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trending.length > 0 ? trending.map((player, i) => (
          <div key={player.id} className="bg-white border border-zinc-200 rounded-3xl p-8 hover:border-emerald-500 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl">
              Hot #{i + 1}
            </div>
            <div className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{player.position}</p>
              <h4 className="text-2xl font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">{player.name}</h4>
              <p className="text-sm text-zinc-500 font-medium">{player.location}</p>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Scout Interest</p>
                <p className="text-xl font-bold text-zinc-900">{(85 + i * 4)}%</p>
              </div>
              <div className="flex-1 bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Market Value</p>
                <p className="text-xl font-bold text-emerald-600">High</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1,2,3].map(j => (
                  <div key={j} className="w-8 h-8 rounded-full bg-zinc-100 border-2 border-white" />
                ))}
                <div className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
                  +12
                </div>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Scouts Viewing</p>
            </div>
          </div>
        )) : (
          [1,2,3].map(i => (
            <div key={i} className="h-64 bg-zinc-100 rounded-3xl animate-pulse" />
          ))
        )}
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-20">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-4 bg-zinc-900 rounded-3xl p-10 text-white flex flex-col justify-between">
        <div>
          <div className="flex gap-1 mb-6">
            {[1,2,3,4,5].map(i => <Award key={i} size={16} className="text-emerald-400 fill-current" />)}
          </div>
          <p className="text-xl font-medium leading-relaxed italic mb-8">
            "Next11 has completely changed how we identify talent in the Midwest. The data is objective and the video proof is seamless."
          </p>
        </div>
        <div>
          <p className="font-bold text-lg">David Henderson</p>
          <p className="text-zinc-400 text-sm">Lead Scout, Big Ten Conference</p>
        </div>
      </div>
      
      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-zinc-200 rounded-3xl p-10 flex flex-col justify-between hover:shadow-xl transition-all">
          <p className="text-zinc-600 font-medium leading-relaxed mb-8">
            "I was overlooked for years playing in a small town. Next11 put my benchmarks in front of the right people, and I just committed to my dream school."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-100 rounded-full" />
            <div>
              <p className="font-bold text-zinc-900">Julian Rivera</p>
              <p className="text-zinc-400 text-xs uppercase font-bold tracking-widest">D1 Committed Athlete</p>
            </div>
          </div>
        </div>
        
        <div className="bg-emerald-600 rounded-3xl p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Trophy size={200} />
          </div>
          <p className="text-emerald-50 font-medium leading-relaxed mb-8 relative z-10">
            "The most credible platform for youth soccer. Period. If you're serious about the next level, you need to be on Next11."
          </p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-emerald-500 rounded-full" />
            <div>
              <p className="font-bold text-white">Coach Sarah Miller</p>
              <p className="text-emerald-200 text-xs uppercase font-bold tracking-widest">Elite Academy Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BenchmarkCard = ({ benchmarks, playerName, position }: { benchmarks: PlayerBenchmarks; playerName: string; position: string }) => {
  const metrics = [
    { label: 'First Touch', value: benchmarks.first_touch_percentile },
    { label: 'Weak Foot Usage', value: benchmarks.weak_foot_percentile },
    { label: 'Passing Consistency', value: benchmarks.passing_consistency_percentile },
    { label: 'Ball Control (Pressure)', value: benchmarks.ball_control_pressure_percentile },
  ];

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold text-zinc-900">{playerName}</h3>
            {benchmarks.is_verified && (
              <CheckCircle2 size={18} className="text-emerald-500" />
            )}
          </div>
          <p className="text-zinc-500 text-sm font-medium">{position} • {benchmarks.benchmark_group}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-0.5">Hidden Gem</p>
          <p className="text-2xl font-bold text-emerald-600 leading-none">{benchmarks.hidden_gem_score}</p>
        </div>
      </div>

      <div className="space-y-5 mb-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Benchmark Summary</p>
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500 font-medium">{metric.label}</span>
              <span className="font-bold text-zinc-900">{metric.value}th Percentile</span>
            </div>
            <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-emerald-500 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-100 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={16} className="text-emerald-600" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Scout Insight</span>
        </div>
        <p className="text-sm text-zinc-600 leading-relaxed italic font-medium">
          "{benchmarks.standout_summary}"
        </p>
      </div>

      <button className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-zinc-200">
        <Play size={16} className="fill-current" />
        View Synced Proof Clips
      </button>
    </div>
  );
};

const PlayerCard = ({ player, onClick }: { player: Player; onClick: () => void | Promise<void>; key?: React.Key }) => (
  <motion.div 
    layoutId={`player-${player.id}`}
    onClick={() => onClick()}
    className="bg-white border border-zinc-200 rounded-xl p-6 cursor-pointer hover:shadow-lg hover:border-emerald-200 transition-all group"
  >
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors">{player.name}</h3>
        <p className="text-zinc-500 text-sm font-medium">{player.position} • Age {player.age}</p>
      </div>
      <div className="bg-zinc-50 border border-zinc-100 text-zinc-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
        Class of {player.grad_year}
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
        <MapPin size={14} className="text-zinc-400" />
        {player.location}
      </div>
      <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
        <Ruler size={14} className="text-zinc-400" />
        {player.height}
      </div>
    </div>

    <div className="flex items-center justify-between pt-5 border-t border-zinc-50">
      <div className="flex gap-6">
        <div className="text-left">
          <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest mb-1">Goals</p>
          <p className="font-mono font-bold text-zinc-900">{player.stats.goals || 0}</p>
        </div>
        <div className="text-left">
          <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest mb-1">Assists</p>
          <p className="font-mono font-bold text-zinc-900">{player.stats.assists || 0}</p>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
        <ChevronRight size={18} className="text-zinc-300 group-hover:text-emerald-500 transition-colors" />
      </div>
    </div>
  </motion.div>
);

const PlayerDetail = ({ player, onBack, activity }: { player: Player; onBack: () => void; activity: ScoutActivity[]; key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="max-w-6xl mx-auto"
  >
    <button 
      onClick={onBack}
      className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 mb-10 transition-colors group"
    >
      <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-zinc-900 transition-colors">
        <ArrowLeft size={16} />
      </div>
      <span className="text-sm font-bold uppercase tracking-widest">Back to Scouts</span>
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-8 space-y-10">
        <div className="bg-white border border-zinc-200 rounded-2xl p-10 shadow-sm">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-5xl font-bold text-zinc-900 tracking-tight mb-4">{player.name}</h1>
              <div className="flex flex-wrap gap-6 text-zinc-500 text-sm font-medium">
                <span className="flex items-center gap-2"><MapPin size={16} className="text-zinc-400" /> {player.location}</span>
                <span className="flex items-center gap-2"><Trophy size={16} className="text-zinc-400" /> {player.position}</span>
                <span className="flex items-center gap-2"><Calendar size={16} className="text-zinc-400" /> Age {player.age}</span>
                <span className="flex items-center gap-2"><GraduationCap size={16} className="text-zinc-400" /> Class of {player.grad_year}</span>
              </div>
              <div className="flex flex-wrap gap-6 text-zinc-500 text-sm font-medium mt-3">
                <span className="flex items-center gap-2"><Ruler size={16} className="text-zinc-400" /> {player.height}</span>
                <span className="flex items-center gap-2"><Weight size={16} className="text-zinc-400" /> {player.weight}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Player Bio</h3>
            <p className="text-zinc-600 leading-relaxed font-medium">{player.bio || "No bio provided."}</p>
          </div>

          {player.achievements && player.achievements.length > 0 && (
            <div className="mt-12">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">Achievements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {player.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-zinc-600 text-sm font-medium bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          )}

          {player.references && player.references.length > 0 && (
            <div className="mt-12">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">References</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {player.references.map((ref, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 border border-zinc-100 shadow-sm">
                    <p className="font-bold text-zinc-900 text-sm mb-1">{ref.name}</p>
                    <p className="text-xs text-zinc-500 mb-3">{ref.role}</p>
                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-widest">
                      <MessageSquare size={14} />
                      {ref.contact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-zinc-900 text-white rounded-2xl p-10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <Video size={24} className="text-emerald-400" />
              Highlight Reel
            </h3>
            {player.highlights_url && (
              <a 
                href={player.highlights_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2"
              >
                Open Original <LinkIcon size={14} />
              </a>
            )}
          </div>
          {player.highlights_url ? (
            <div className="aspect-video bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700 group relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center z-10">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                  <Play size={28} className="text-white fill-current ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-zinc-400 text-[10px] font-mono bg-black/50 px-2 py-1 rounded">SOURCE: {new URL(player.highlights_url).hostname}</p>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700">
              <p className="text-zinc-500 italic text-sm">No highlights uploaded yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-10">
        {player.benchmarks && (
          <BenchmarkCard 
            benchmarks={player.benchmarks} 
            playerName={player.name} 
            position={player.position} 
          />
        )}

        <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-8">Key Performance Stats</h3>
          <div className="space-y-5">
            {Object.entries(player.stats).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center pb-4 border-b border-zinc-50 last:border-0 last:pb-0">
                <span className="text-zinc-500 capitalize text-sm font-medium">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-mono font-bold text-xl text-zinc-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 mb-6">Recent Scout Activity</h3>
          <div className="space-y-6">
            {activity.length > 0 ? (
              activity.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-emerald-900 text-sm">{act.scout_name}</p>
                    <p className="text-emerald-600/70 text-[10px] font-bold uppercase tracking-wider mt-0.5">
                      {new Date(act.viewed_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-emerald-600/60 text-sm italic">No recent activity recorded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'landing' | 'scout' | 'player'>('landing');
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerActivity, setPlayerActivity] = useState<ScoutActivity[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state for player creation
  const [formData, setFormData] = useState({
    name: '',
    position: 'Forward',
    location: '',
    grad_year: 2026,
    highlights_url: '',
    bio: '',
    stats: { goals: 0, assists: 0, appearances: 0 }
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/players');
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerClick = async (player: Player) => {
    setSelectedPlayer(player);
    // Simulate scout view for MVP
    try {
      await fetch(`/api/players/${player.id}?scout=University Scout`);
      const actRes = await fetch(`/api/activity/${player.id}`);
      const actData = await actRes.json();
      setPlayerActivity(actData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Profile created successfully!');
        fetchPlayers();
        setView('scout');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => { setView('landing'); setSelectedPlayer(null); }}
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold italic">N</div>
            <span className="font-bold text-xl tracking-tight">Next11</span>
          </div>
          
          <div className="flex gap-8">
            <button 
              onClick={() => { setView('scout'); setSelectedPlayer(null); }}
              className={`text-sm font-bold transition-colors ${view === 'scout' ? 'text-emerald-600' : 'text-zinc-400 hover:text-zinc-900'}`}
            >
              Scouts
            </button>
            <button 
              onClick={() => { setView('player'); setSelectedPlayer(null); }}
              className={`text-sm font-bold transition-colors ${view === 'player' ? 'text-emerald-600' : 'text-zinc-400 hover:text-zinc-900'}`}
            >
              Players
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
                <div className="text-left">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
                    <Zap size={14} />
                    Live National Directory
                  </div>
                  <h1 className="text-8xl font-bold tracking-tighter text-zinc-900 mb-8 leading-[0.85]">
                    ELITE TALENT <br />
                    <span className="text-emerald-600">NATIONWIDE.</span>
                  </h1>
                  <p className="text-xl text-zinc-500 max-w-lg mb-12 font-medium leading-relaxed">
                    Connecting top youth soccer prospects across the United States with college scouts through verified data.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <button 
                      onClick={() => setView('player')}
                      className="bg-zinc-900 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-zinc-200 group"
                    >
                      <User size={22} className="group-hover:scale-110 transition-transform" />
                      I'm a Player
                    </button>
                    <button 
                      onClick={() => setView('scout')}
                      className="bg-white border border-zinc-200 text-zinc-900 px-10 py-5 rounded-xl font-bold text-lg hover:border-zinc-900 transition-all flex items-center justify-center gap-3 group"
                    >
                      <Search size={22} className="group-hover:scale-110 transition-transform" />
                      I'm a Scout
                    </button>
                  </div>
                  
                  <div className="mt-16 flex items-center gap-8 border-t border-zinc-100 pt-8">
                    <div>
                      <p className="text-2xl font-bold text-zinc-900">12,402</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Active Scouts</p>
                    </div>
                    <div className="w-px h-8 bg-zinc-100" />
                    <div>
                      <p className="text-2xl font-bold text-zinc-900">850+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Colleges</p>
                    </div>
                    <div className="w-px h-8 bg-zinc-100" />
                    <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-50 bg-zinc-200 overflow-hidden">
                          <img src={`https://picsum.photos/seed/scout${i}/40/40`} alt="Scout" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:block relative">
                  <div className="bg-zinc-50 border border-zinc-200 rounded-[40px] p-8 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="flex justify-between items-center mb-8">
                      <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400">Live Scout Activity</h4>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <div className="w-2 h-2 rounded-full bg-zinc-200" />
                        <div className="w-2 h-2 rounded-full bg-zinc-200" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { name: 'Stanford Scout', action: 'viewed', target: 'Leo Rodriguez', time: '2m ago' },
                        { name: 'UCLA Scout', action: 'shortlisted', target: 'Marcus Chen', time: '15m ago' },
                        { name: 'Duke Scout', action: 'viewed', target: 'Sarah Williams', time: '1h ago' },
                      ].map((act, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-zinc-100 flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-zinc-100 rounded-full" />
                            <div>
                              <p className="text-xs font-bold text-zinc-900">{act.name}</p>
                              <p className="text-[10px] text-zinc-400">{act.action} {act.target}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600">{act.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -left-10 bg-white border border-zinc-200 rounded-3xl p-6 shadow-xl -rotate-6">
                    <p className="text-3xl font-bold text-emerald-600">92%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Commitment Rate</p>
                  </div>
                </div>
              </div>

              <LiveTicker />
              <TrustStats />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-20">
                <div className="lg:col-span-8">
                  <TrendingProspects players={players} />
                </div>
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-zinc-900 rounded-3xl p-8 text-white h-full flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute -right-10 -top-10 opacity-10 group-hover:scale-110 transition-transform">
                      <MapPin size={240} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-400 mb-6">Global Reach</h3>
                      <h4 className="text-3xl font-bold mb-4">Scouting Heatmap</h4>
                      <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                        Real-time visualization of where scouts are active. Currently trending: Southern California, Texas, and Florida.
                      </p>
                    </div>
                    <div className="mt-12 relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Active Scouts</span>
                        <span className="text-[10px] font-bold text-emerald-400">842 Live</span>
                      </div>
                      <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-zinc-200 rounded-3xl p-8 hover:shadow-lg transition-all">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Recruitment Rumors</h3>
                    <div className="space-y-4">
                      {[
                        { text: "UCLA showing heavy interest in Midwest defenders", type: "RUMOR" },
                        { text: "Duke Scout spotted at Florida State Cup", type: "SIGHTING" },
                        { text: "3 New D1 offers for Leo Rodriguez", type: "UPDATE" }
                      ].map((rumor, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                            rumor.type === 'RUMOR' ? 'bg-amber-100 text-amber-700' : 
                            rumor.type === 'SIGHTING' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {rumor.type}
                          </span>
                          <p className="text-xs font-medium text-zinc-600 leading-tight">{rumor.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-20">
                <div className="lg:col-span-4">
                  <div className="bg-emerald-600 rounded-3xl p-10 text-white h-full relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
                      <Award size={180} />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-200 mb-6">Spotlight</h3>
                    <h4 className="text-4xl font-bold mb-6 leading-tight">Player of the Week</h4>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
                      <p className="text-2xl font-bold mb-1">Leo Rodriguez</p>
                      <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest mb-4">Forward • Class of 2026</p>
                      <div className="flex justify-between items-center text-sm">
                        <span>Scout Interest</span>
                        <span className="font-mono font-bold">98%</span>
                      </div>
                    </div>
                    <button className="w-full bg-white text-emerald-600 py-4 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors">
                      View Full Profile
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <Testimonials />
                </div>
              </div>

              <FeaturesBento />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-20">
                <div className="bg-white border border-zinc-200 rounded-3xl p-8 hover:border-zinc-900 transition-colors">
                  <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center mb-6">
                    <Activity className="text-zinc-900" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Market Trends</h4>
                  <p className="text-zinc-500 text-sm font-medium">Rising demand for left-footed center backs in the 2026 class.</p>
                </div>
                <div className="bg-white border border-zinc-200 rounded-3xl p-8 hover:border-zinc-900 transition-colors">
                  <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center mb-6">
                    <GraduationCap className="text-zinc-900" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Scholarship Alert</h4>
                  <p className="text-zinc-500 text-sm font-medium">14 new D1 programs just joined the Next11 network this week.</p>
                </div>
                <div className="bg-white border border-zinc-200 rounded-3xl p-8 hover:border-zinc-900 transition-colors">
                  <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center mb-6">
                    <Award className="text-zinc-900" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Verified Status</h4>
                  <p className="text-zinc-500 text-sm font-medium">Get your benchmarks verified by our national scouting team.</p>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'scout' && !selectedPlayer && (
            <motion.div 
              key="scout-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Live National Directory</span>
                  </div>
                  <h2 className="text-5xl font-bold text-zinc-900 tracking-tight">Prospect Directory</h2>
                </div>
                <div className="w-full md:w-auto flex items-center gap-3 bg-white border border-zinc-200 rounded-xl px-5 py-3 shadow-sm focus-within:border-emerald-500 transition-colors">
                  <Search size={18} className="text-zinc-400" />
                  <input type="text" placeholder="Search by name, position, or city..." className="outline-none text-sm bg-transparent w-full md:w-64" />
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 bg-zinc-100 animate-pulse rounded-2xl" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {players.map(player => (
                    <PlayerCard 
                      key={player.id} 
                      player={player} 
                      onClick={() => handlePlayerClick(player)} 
                    />
                  ))}
                  {players.length === 0 && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-200 rounded-3xl">
                      <Users size={48} className="mx-auto text-zinc-300 mb-4" />
                      <p className="text-zinc-400 font-medium">No players registered yet.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {view === 'scout' && selectedPlayer && (
            <PlayerDetail 
              key="player-detail"
              player={selectedPlayer} 
              onBack={() => setSelectedPlayer(null)} 
              activity={playerActivity}
            />
          )}

          {view === 'player' && (
            <motion.div 
              key="player-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white border border-zinc-200 rounded-2xl p-12 shadow-sm">
                <div className="text-center mb-12">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                    <Plus size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Create Your Profile</h2>
                  <p className="text-zinc-500 mt-2 font-medium">Join the national network of elite youth talent.</p>
                </div>
                
                <form onSubmit={handleCreatePlayer} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        placeholder="Marcus Johnson"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Location</label>
                      <input 
                        required
                        type="text" 
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        placeholder="Los Angeles, CA"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Position</label>
                      <select 
                        value={formData.position}
                        onChange={e => setFormData({...formData, position: e.target.value})}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option>Forward</option>
                        <option>Midfielder</option>
                        <option>Defender</option>
                        <option>Goalkeeper</option>
                      </select>
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Graduation Year</label>
                      <input 
                        type="number" 
                        value={formData.grad_year}
                        onChange={e => setFormData({...formData, grad_year: parseInt(e.target.value)})}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Highlight Video URL</label>
                    <input 
                      type="url" 
                      value={formData.highlights_url}
                      onChange={e => setFormData({...formData, highlights_url: e.target.value})}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      placeholder="YouTube or Vimeo link"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Short Bio</label>
                    <textarea 
                      value={formData.bio}
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                      rows={4}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none"
                      placeholder="Tell scouts about your playing style and goals..."
                    />
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit"
                      className="w-full bg-zinc-900 text-white py-5 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200"
                    >
                      Publish Profile
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center text-white text-[10px] font-bold italic">N</div>
            <span className="font-bold text-sm tracking-tight uppercase">Next11 MVP</span>
          </div>
          <p className="text-zinc-400 text-sm">© 2026 Next11 Soccer Intelligence. Verified pathways for every athlete.</p>
          <div className="flex gap-6 text-zinc-400">
            <a href="#" className="hover:text-zinc-900 transition-colors"><Activity size={20} /></a>
            <a href="#" className="hover:text-zinc-900 transition-colors"><Users size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
