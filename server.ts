import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";

const db = new Database("soccer.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT,
    location TEXT DEFAULT 'Oakland',
    grad_year INTEGER,
    stats TEXT, -- JSON string
    benchmarks TEXT, -- JSON string
    highlights_url TEXT,
    bio TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS scout_activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER,
    scout_name TEXT,
    viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(player_id) REFERENCES players(id)
  );
`);

// Seed sample data if empty
const playerCount = db.prepare("SELECT COUNT(*) as count FROM players").get() as { count: number };
if (playerCount.count === 0) {
  const playersToSeed = [
    {
      name: "Julian Rivera",
      position: "Central Midfielder",
      location: "Oakland",
      grad_year: 2026,
      stats: { goals: 4, assists: 12, appearances: 18 },
      benchmarks: {
        benchmark_group: "U16 Central Midfielders",
        first_touch_percentile: 94,
        weak_foot_percentile: 88,
        passing_consistency_percentile: 91,
        ball_control_pressure_percentile: 96,
        hidden_gem_score: 92,
        standout_summary: "Exceptional spatial awareness and technical composure. Elite first-touch metrics combined with high-pressure ball retention makes him a top-tier prospect for possession-based systems.",
        is_verified: true
      },
      highlights_url: "https://example.com/julian-highlights",
      bio: "Technical playmaker with a high football IQ. Looking to play at the D1 level."
    },
    {
      name: "Marcus Chen",
      position: "Winger",
      location: "San Francisco",
      grad_year: 2025,
      stats: { goals: 14, assists: 8, appearances: 22 },
      benchmarks: {
        benchmark_group: "U17 Wingers",
        first_touch_percentile: 89,
        weak_foot_percentile: 92,
        passing_consistency_percentile: 78,
        ball_control_pressure_percentile: 94,
        hidden_gem_score: 88,
        standout_summary: "Explosive 1v1 ability with elite weak-foot proficiency. Marcus consistently beats defenders in tight spaces and delivers high-quality crosses.",
        is_verified: true
      },
      highlights_url: "https://example.com/marcus-highlights",
      bio: "Dynamic winger with pace and clinical finishing. 4-year varsity starter."
    },
    {
      name: "Sarah Williams",
      position: "Center Back",
      location: "Oakland",
      grad_year: 2026,
      stats: { tackles: 45, interceptions: 32, appearances: 20 },
      benchmarks: {
        benchmark_group: "U16 Center Backs",
        first_touch_percentile: 82,
        weak_foot_percentile: 75,
        passing_consistency_percentile: 95,
        ball_control_pressure_percentile: 88,
        hidden_gem_score: 94,
        standout_summary: "Elite distribution from the back. Sarah's passing consistency under pressure is in the top 5% for her age group, making her a perfect modern ball-playing defender.",
        is_verified: true
      },
      highlights_url: "https://example.com/sarah-highlights",
      bio: "Commanding presence in defense. Strong communicator and tactical leader."
    },
    {
      name: "Leo Rodriguez",
      position: "Goalkeeper",
      location: "Berkeley",
      grad_year: 2027,
      stats: { cleanSheets: 8, saves: 64, appearances: 15 },
      benchmarks: {
        benchmark_group: "U15 Goalkeepers",
        first_touch_percentile: 85,
        weak_foot_percentile: 70,
        passing_consistency_percentile: 88,
        ball_control_pressure_percentile: 92,
        hidden_gem_score: 90,
        standout_summary: "Modern sweeper-keeper with exceptional distribution. Leo's ability to initiate attacks and handle back-passes under pressure is elite for his age.",
        is_verified: true
      },
      highlights_url: "https://example.com/leo-highlights",
      bio: "Agile shot-stopper with great distribution. Trained with regional ODP teams."
    }
  ];

  const insertStmt = db.prepare(`
    INSERT INTO players (name, position, location, grad_year, stats, benchmarks, highlights_url, bio)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const player of playersToSeed) {
    insertStmt.run(
      player.name,
      player.position,
      player.location,
      player.grad_year,
      JSON.stringify(player.stats),
      JSON.stringify(player.benchmarks),
      player.highlights_url,
      player.bio
    );
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/players", (req, res) => {
    const players = db.prepare("SELECT * FROM players ORDER BY created_at DESC").all();
    res.json(players.map(p => ({
      ...p,
      stats: JSON.parse(p.stats || "{}"),
      benchmarks: JSON.parse(p.benchmarks || "null")
    })));
  });

  app.post("/api/players", (req, res) => {
    const { name, position, location, grad_year, stats, benchmarks, highlights_url, bio } = req.body;
    const info = db.prepare(`
      INSERT INTO players (name, position, location, grad_year, stats, benchmarks, highlights_url, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, position, location, grad_year, JSON.stringify(stats), JSON.stringify(benchmarks || null), highlights_url, bio);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/players/:id", (req, res) => {
    const player = db.prepare("SELECT * FROM players WHERE id = ?").get(req.params.id);
    if (!player) return res.status(404).json({ error: "Player not found" });
    
    // Log scout activity if requested (simple simulation for MVP)
    if (req.query.scout) {
      db.prepare("INSERT INTO scout_activity (player_id, scout_name) VALUES (?, ?)").run(req.params.id, req.query.scout);
    }

    res.json({
      ...player,
      stats: JSON.parse(player.stats || "{}"),
      benchmarks: JSON.parse(player.benchmarks || "null")
    });
  });

  app.get("/api/activity/:playerId", (req, res) => {
    const activity = db.prepare("SELECT * FROM scout_activity WHERE player_id = ? ORDER BY viewed_at DESC").all();
    res.json(activity);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
