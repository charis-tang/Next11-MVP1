export interface PlayerStats {
  goals?: number;
  assists?: number;
  appearances?: number;
  cleanSheets?: number;
  tackles?: number;
  passAccuracy?: number;
}

export interface PlayerBenchmarks {
  benchmark_group: string;
  first_touch_percentile: number;
  weak_foot_percentile: number;
  passing_consistency_percentile: number;
  ball_control_pressure_percentile: number;
  hidden_gem_score: number;
  standout_summary: string;
  is_verified: boolean;
}

export interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  location: string;
  grad_year: number;
  height: string;
  weight: string;
  stats: PlayerStats;
  benchmarks?: PlayerBenchmarks;
  highlights_url: string;
  bio: string;
  achievements: string[];
  references: { name: string; role: string; contact: string }[];
  created_at: string;
}

export interface ScoutActivity {
  id: number;
  player_id: number;
  scout_name: string;
  viewed_at: string;
}
