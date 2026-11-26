export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GithubStatsData {
  username: string;
  profileUrl: string;
  totalContributions: number | null;
  topLanguage: string | null;
  activeRepos: number | null;
  weeks: (ContributionDay | null)[][];
  fetchFailed: boolean;
}

async function fetchJson<T>(url: string, timeoutMs = 6000): Promise<T | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'astro-portfolio-build',
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function getGithubActivity(username = '0xriyans'): Promise<GithubStatsData> {
  const profileUrl = `https://github.com/${username}`;

  const [contribPayload, userPayload, reposPayload] = await Promise.all([
    fetchJson<{ total?: { lastYear?: number }; contributions?: ContributionDay[] }>(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    ),
    fetchJson<{ public_repos?: number }>(`https://api.github.com/users/${username}`),
    fetchJson<{ language?: string | null; fork?: boolean }[]>(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    ),
  ]);

  const rawDays = Array.isArray(contribPayload?.contributions) ? contribPayload.contributions : [];
  const totalContributions =
    typeof contribPayload?.total?.lastYear === 'number' ? contribPayload.total.lastYear : null;

  const activeRepos =
    typeof userPayload?.public_repos === 'number' ? userPayload.public_repos : null;

  let topLanguage: string | null = null;
  if (Array.isArray(reposPayload) && reposPayload.length > 0) {
    const counts = new Map<string, number>();
    for (const repo of reposPayload) {
      if (!repo.fork && repo.language) {
        counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
      }
    }
    let bestCount = 0;
    for (const [lang, count] of counts.entries()) {
      if (count > bestCount) {
        bestCount = count;
        topLanguage = lang;
      }
    }
  }

  const weeks: (ContributionDay | null)[][] = [];
  if (rawDays.length > 0) {
    let currentWeek: (ContributionDay | null)[] = [];
    const firstDay = new Date(`${rawDays[0].date}T00:00:00Z`).getUTCDay();
    for (let pad = 0; pad < firstDay; pad++) {
      currentWeek.push(null);
    }
    for (const day of rawDays) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }
  }

  // Keep max 53 columns as requested (last 12 months: 53x7)
  const trimmedWeeks = weeks.slice(-53);

  return {
    username,
    profileUrl,
    totalContributions,
    topLanguage,
    activeRepos,
    weeks: trimmedWeeks,
    fetchFailed: trimmedWeeks.length === 0,
  };
}
