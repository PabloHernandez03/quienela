import alemania from "@/img/alemania.png"
import italia from "@/img/italia.png"
import espana from "@/img/espana.png"
import inglaterra from "@/img/inglaterra.png"
import francia from "@/img/francia.png"

export default function DashBoardView() {
    interface Match {
        homeTeam: string;
        awayTeam: string;
        date: string;
        time: string;
      }
      
      interface League {
        name: string;
        logo: string;
        matches: Match[];
      }
      
      const leagues: League[] = [
        {
          name: "Premier League",
          logo: inglaterra,
          matches: [
            { homeTeam: "Manchester City", awayTeam: "Chelsea", date: "2024-12-26", time: "16:00" },
            { homeTeam: "Liverpool", awayTeam: "Arsenal", date: "2024-12-27", time: "18:30" },
          ],
        },
        {
          name: "Serie A",
          logo: italia,
          matches: [
            { homeTeam: "Juventus", awayTeam: "Milan", date: "2024-12-26", time: "15:00" },
            { homeTeam: "Napoli", awayTeam: "Inter", date: "2024-12-27", time: "20:00" },
          ],
        },
        {
          name: "LaLiga",
          logo: espana,
          matches: [
            { homeTeam: "Barcelona", awayTeam: "Real Madrid", date: "2024-12-26", time: "21:00" },
            { homeTeam: "Atletico Madrid", awayTeam: "Sevilla", date: "2024-12-27", time: "19:00" },
          ],
        },
        {
          name: "Bundesliga",
          logo: alemania,
          matches: [
            { homeTeam: "Bayern Munich", awayTeam: "Dortmund", date: "2024-12-26", time: "17:00" },
            { homeTeam: "Leipzig", awayTeam: "Leverkusen", date: "2024-12-27", time: "15:30" },
          ],
        },
        {
          name: "Ligue 1",
          logo: francia,
          matches: [
            { homeTeam: "PSG", awayTeam: "Marseille", date: "2024-12-26", time: "20:45" },
            { homeTeam: "Lyon", awayTeam: "Monaco", date: "2024-12-27", time: "18:15" },
          ],
        },
      ];

      return (
        <>
          <div className="flex flex-wrap justify-center gap-12 my-10">
            {leagues.map((league, index) => (
              <div
                key={index}
                className="bg-first w-1/3 flex flex-col items-center justify-center rounded-3xl"
              >
                <div className="flex items-center justify-center w-full">
                {league.name !== "Ligue 1" ? (
                    <img src={league.logo} alt={league.name} className="w-1/5" />
                ) : (
                    <img src={league.logo} alt={league.name} className="w-1/5 my-5" />
                )}
                  <div className="text-center m-2 text-white text-xl font-bold">
                    <h2>{league.name}</h2>
                  </div>
                </div>
                <hr className="w-64 border-t-2 border-white pt-2" />
                <div className="w-5/6 my-5">
                  {league.matches.map((match, matchIndex) => (
                    <div key={matchIndex} className="mb-2 text-center text-base bg-white rounded-xl px-5 pt-1">
                        <div className="flex justify-between gap-3">
                            <div className="flex justify-between w-1/2">
                                <p>
                                    <span className="font-bold">{match.homeTeam}</span>
                                </p>
                                <input
                                    type="text"
                                    placeholder="#"
                                    className="w-6 text-center border rounded"
                                />
                            </div>
                            <div className="flex justify-between w-1/2">
                                <p>
                                    <span className="font-bold">{match.awayTeam}</span>
                                </p>
                                <input
                                        type="text"
                                        placeholder="#"
                                        className="w-6 text-center border rounded"
                                    />
                            </div>
                        </div>
                        <p>
                            {match.date} - {match.time}
                        </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      );      
}