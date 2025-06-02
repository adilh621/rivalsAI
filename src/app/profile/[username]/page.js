// src/app/profile/[username]/page.js
import Image from 'next/image';
import BasicInfoCard from '../../../components/BasicInfoCard';
import RankInfoCard from '../../../components/RankInfoCard';
import HeroCard from '../../../components/HeroCard';
import RoleTimePieChart from '../../../components/RoleTimePieChart';

export default async function ProfilePage({ params }) {
  const username = (await params)?.username;
  let data;

  try {
    const res = await fetch(`https://api.tracker.gg/api/v2/marvel-rivals/standard/profile/ign/${username}`, {
      headers: {
        "TRN-Api-Key": process.env.TRACKER_API_KEY,
      },
      next: { revalidate: 60 },
    });

    console.log("API request status:", res.status);
    console.log("API request ok?", res.ok);

    data = await res.json();

    if (data.errors?.some(err => err.code === "CollectorResultStatus::Private")) {
      const errorText = await res.text(); // this is safe here
      console.log("API fetch failed:", errorText);
      return <div className="text-center text-red-500 mt-10">User has set their profile to private.</div>;
    }
  } catch (error) {
    onsole.error("Caught fetch error:", error.message);
    return <div className="text-center text-red-500 mt-10">Failed to fetch data.</div>;
  }

  const segments = data.data?.segments || [];
  const currentSeason = 4;

  const topHeroes = segments
    .filter(seg => seg.type === 'hero' && seg.attributes?.season === currentSeason)
    .filter(seg => seg.stats?.timePlayed?.value)
    .sort((a, b) => b.stats.timePlayed.value - a.stats.timePlayed.value)
    .slice(0, 3);

  const overviewSegment = segments.find(seg => seg.type === 'overview' && seg.attributes?.season === currentSeason);
  const peaksSegment = segments.find(seg => seg.type === 'ranked-peaks');

  const currentRank = overviewSegment?.stats?.ranked?.metadata?.tierName || null;
  const currentRankIcon = overviewSegment?.stats?.ranked?.metadata?.iconUrl || null;

  const seasonPeak = overviewSegment?.stats?.peakRanked?.metadata?.tierName || null;
  const seasonPeakIcon = overviewSegment?.stats?.peakRanked?.metadata?.iconUrl || null;

  const lifetimePeak = peaksSegment?.stats?.lifetimePeakRanked?.metadata?.tierName || null;
  const lifetimePeakIcon = peaksSegment?.stats?.lifetimePeakRanked?.metadata?.iconUrl || null;

  const rankInfo = {
    currentRank,
    currentRankIcon,
    seasonPeak,
    seasonPeakIcon,
    lifetimePeak,
    lifetimePeakIcon
  };

  const roleTimeData = segments
    .filter(segment => segment.type === 'hero-role' && segment.attributes?.season === 4 && segment.attributes?.mode === 'all')
    .map(segment => ({
      name: segment.metadata?.name,
      timePlayed: segment.stats?.timePlayed?.value || 0,
    }));

  const avatarUrl = data.data?.platformInfo?.avatarUrl;

  return (
    <div className="p-6 text-white">
      <div className="flex items-center gap-4 mb-4">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={`${username}'s avatar`}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
        <h1 className="text-2xl font-bold">Showing {username}'s stats</h1>
      </div>

      <BasicInfoCard data={data.data} />

      <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <RankInfoCard rankInfo={rankInfo} />
        <RoleTimePieChart data={roleTimeData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {topHeroes.map((segment, index) => (
          <HeroCard key={index} segment={segment} />
        ))}
      </div>
    </div>
  );
}
