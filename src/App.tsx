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
  Play
} from 'lucide-react';
import { Player, ScoutActivity, PlayerBenchmarks } from './types';

// --- Components ---

const BenchmarkCard = ({ benchmarks, playerName, position }: { benchmarks: PlayerBenchmarks; playerName: string; position: string }) => {
  const metrics = [
    { label: 'First Touch', value: benchmarks.first_touch_percentile },
    { label: 'Weak Foot Usage', value: benchmarks.weak_foot_percentile },
    { label: 'Passing Consistency', value: benchmarks.passing_consistency_percentile },
    { label: 'Ball Control (Pressure)', value: benchmarks.ball_control_pressure_percentile },
  ];

  return (
    <div className="bg-zinc-900 text-white rounded-3xl p-8 border border-zinc-800 shadow-2xl overflow-hidden relative group">
      {/* Background Accent */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-black tracking-tight">{playerName}</h3>
              {benchmarks.is_verified && (
                <CheckCircle2 size={20} className="text-emerald-400 fill-emerald-400/20" />
              )}
            </div>
            <p className="text-zinc-400 font-medium text-sm uppercase tracking-wider">{position} • {benchmarks.benchmark_group}</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Hidden Gem</p>
            <p className="text-3xl font-black text-emerald-400 leading-none">{benchmarks.hidden_gem_score}</p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">Baseline Benchmark Summary</p>
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-400">{metric.label}</span>
                <span className="text-emerald-400">{metric.value}th Percentile</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-800/50 rounded-2xl p-5 border border-zinc-700/50 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Scout Insight</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed italic">
            "{benchmarks.standout_summary}"
          </p>
        </div>

        <button className="w-full bg-white text-zinc-900 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 group/btn">
          <Play size={16} className="fill-current" />
          View Synced Proof Clips
        </button>
      </div>
    </div>
  );
};

const PlayerCard = ({ player, onClick }: { player: Player; onClick: () => void | Promise<void>; key?: React.Key }) => (
  <motion.div 
    layoutId={`player-${player.id}`}
    onClick={() => onClick()}
    className="bg-white border border-zinc-200 rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow group"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">{player.name}</h3>
        <p className="text-zinc-500 font-medium">{player.position}</p>
      </div>
      <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
        Class of {player.grad_year}
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="flex items-center gap-2 text-zinc-600 text-sm">
        <MapPin size={16} className="text-zinc-400" />
        {player.location}
      </div>
      <div className="flex items-center gap-2 text-zinc-600 text-sm">
        <GraduationCap size={16} className="text-zinc-400" />
        College Prospect
      </div>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
      <div className="flex gap-4">
        <div className="text-center">
          <p className="text-xs text-zinc-400 uppercase font-bold">Goals</p>
          <p className="font-mono font-bold">{player.stats.goals || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-zinc-400 uppercase font-bold">Assists</p>
          <p className="font-mono font-bold">{player.stats.assists || 0}</p>
        </div>
      </div>
      <ChevronRight size={20} className="text-zinc-300 group-hover:text-emerald-500 transition-colors" />
    </div>
  </motion.div>
);

const PlayerDetail = ({ player, onBack, activity }: { player: Player; onBack: () => void; activity: ScoutActivity[]; key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="max-w-5xl mx-auto"
  >
    <button 
      onClick={onBack}
      className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
    >
      <ArrowLeft size={20} />
      Back to Scouts
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-white border border-zinc-200 rounded-3xl p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-black text-zinc-900 mb-2">{player.name}</h1>
              <div className="flex flex-wrap gap-4 text-zinc-500">
                <span className="flex items-center gap-1"><MapPin size={18} /> {player.location}</span>
                <span className="flex items-center gap-1"><Trophy size={18} /> {player.position}</span>
                <span className="flex items-center gap-1"><GraduationCap size={18} /> Class of {player.grad_year}</span>
              </div>
            </div>
          </div>
          
          <div className="prose prose-zinc max-w-none">
            <h3 className="text-lg font-bold mb-2">Bio</h3>
            <p className="text-zinc-600 leading-relaxed">{player.bio || "No bio provided."}</p>
          </div>
        </div>

        <div className="bg-zinc-900 text-white rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Video size={24} className="text-emerald-400" />
            Highlight Reel
          </h3>
          {player.highlights_url ? (
            <div className="aspect-video bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700">
              <p className="text-zinc-500">Video Embed: {player.highlights_url}</p>
            </div>
          ) : (
            <div className="aspect-video bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700">
              <p className="text-zinc-500 italic">No highlights uploaded yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-5 space-y-8">
        {player.benchmarks && (
          <BenchmarkCard 
            benchmarks={player.benchmarks} 
            playerName={player.name} 
            position={player.position} 
          />
        )}

        <div className="bg-white border border-zinc-200 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-emerald-600" />
            Key Stats
          </h3>
          <div className="space-y-4">
            {Object.entries(player.stats).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-zinc-50">
                <span className="text-zinc-500 capitalize">{key}</span>
                <span className="font-mono font-bold text-lg">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-900">
            <Activity size={20} className="text-emerald-600" />
            Scout Activity
          </h3>
          <div className="space-y-4">
            {activity.length > 0 ? (
              activity.map((act) => (
                <div key={act.id} className="text-sm">
                  <p className="font-bold text-emerald-800">{act.scout_name}</p>
                  <p className="text-emerald-600/70 text-xs">{new Date(act.viewed_at).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p className="text-emerald-600/60 text-sm italic">No recent activity</p>
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
        body: JSON.stringify({ ...formData, location: 'Oakland' })
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
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black italic">N</div>
            <span className="font-black text-xl tracking-tight uppercase">Next11</span>
          </div>
          
          <div className="flex gap-8">
            <button 
              onClick={() => { setView('scout'); setSelectedPlayer(null); }}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${view === 'scout' ? 'text-emerald-600' : 'text-zinc-400 hover:text-zinc-900'}`}
            >
              Scouts
            </button>
            <button 
              onClick={() => { setView('player'); setSelectedPlayer(null); }}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${view === 'player' ? 'text-emerald-600' : 'text-zinc-400 hover:text-zinc-900'}`}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <h1 className="text-7xl font-black tracking-tighter text-zinc-900 mb-6 leading-[0.9]">
                FROM OAKLAND <br />
                <span className="text-emerald-600">TO THE NEXT LEVEL.</span>
              </h1>
              <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-12 font-medium">
                Connecting talented youth soccer players from Oakland with college scouts. 
                Showcase your highlights, track your stats, and get noticed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setView('player')}
                  className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                >
                  <User size={20} />
                  I'm a Player
                </button>
                <button 
                  onClick={() => setView('scout')}
                  className="bg-white border-2 border-zinc-200 text-zinc-900 px-8 py-4 rounded-2xl font-bold text-lg hover:border-zinc-900 transition-colors flex items-center justify-center gap-2"
                >
                  <Search size={20} />
                  I'm a Scout
                </button>
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
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-4xl font-black text-zinc-900 mb-2">Prospect Directory</h2>
                  <p className="text-zinc-500 font-medium">Browsing top talent from the Oakland area.</p>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-4 py-2">
                  <Search size={18} className="text-zinc-400" />
                  <input type="text" placeholder="Search players..." className="outline-none text-sm bg-transparent" />
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white border border-zinc-200 rounded-3xl p-10 shadow-sm">
                <h2 className="text-3xl font-black text-zinc-900 mb-8 flex items-center gap-3">
                  <Plus className="text-emerald-600" />
                  Create Your Profile
                </h2>
                
                <form onSubmit={handleCreatePlayer} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 transition-colors"
                        placeholder="e.g. Marcus Johnson"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Position</label>
                      <select 
                        value={formData.position}
                        onChange={e => setFormData({...formData, position: e.target.value})}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 transition-colors"
                      >
                        <option>Forward</option>
                        <option>Midfielder</option>
                        <option>Defender</option>
                        <option>Goalkeeper</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Graduation Year</label>
                      <input 
                        type="number" 
                        value={formData.grad_year}
                        onChange={e => setFormData({...formData, grad_year: parseInt(e.target.value)})}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Highlight Video URL</label>
                      <input 
                        type="url" 
                        value={formData.highlights_url}
                        onChange={e => setFormData({...formData, highlights_url: e.target.value})}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 transition-colors"
                        placeholder="YouTube or Vimeo link"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Short Bio</label>
                    <textarea 
                      value={formData.bio}
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                      rows={4}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 transition-colors resize-none"
                      placeholder="Tell scouts about your playing style and goals..."
                    />
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
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
            <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center text-white text-[10px] font-black italic">N</div>
            <span className="font-black text-sm tracking-tight uppercase">Next11 MVP</span>
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
