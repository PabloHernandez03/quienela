import alemania from "/img/alemania.png"
import italia from "/img/italia.png"
import espana from "/img/espana.png"
import inglaterra from "/img/inglaterra.png"
import francia from "/img/francia.png"


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
        folder: string;
      }

      // interface Team {
      //   name: string;
      //   logo: string;
      // }

      // const teams: Team[] = [
      //   { name: "Manchester City", logo: "manchestercity" },
      //   { name: "Chelsea", logo: "chelsea" },
      //   { name: "Liverpool", logo: "liverpool" },
      //   { name: "Arsenal", logo: "arsenal" },
      //   { name: "Juventus", logo: "juventus" },
      //   { name: "Milan", logo: "milan" },
      //   { name: "Napoli", logo: "napoli" },
      //   { name: "Inter", logo: "inter" },
      //   { name: "Barcelona", logo: "barcelona" },
      //   { name: "Real Madrid", logo: "realmadrid" },
      //   { name: "Atletico Madrid", logo: "atleticomadrid" },
      //   { name: "Sevilla", logo: "Sevilla" },
      //   { name: "Bayern Munich", logo: "bayernmunich" },
      //   { name: "Dortmund", logo: "dortmund" },
      //   { name: "Leipzig", logo: "leipzig" },
      //   { name: "Leverkusen", logo: "leverkusen" },
      //   { name: "PSG", logo: "psg" },
      //   { name: "Marseille", logo: "marseille" },
      //   { name: "Lyon", logo: "lyon" },
      //   { name: "Monaco", logo: "monaco"},
      // ];
      
      const leagues: League[] = [
        {
          name: "Premier League",
          logo: inglaterra,
          folder: "inglaterra",
          matches: [
            { homeTeam: "Manchester City", awayTeam: "Chelsea", date: "2024-12-26", time: "16:00" },
            { homeTeam: "Liverpool", awayTeam: "Arsenal", date: "2024-12-27", time: "18:30" },
          ],
        },
        {
          name: "Serie A",
          logo: italia,
          folder: "italia",
          matches: [
            { homeTeam: "Juventus", awayTeam: "Milan", date: "2024-12-26", time: "15:00" },
            { homeTeam: "Napoli", awayTeam: "Inter", date: "2024-12-27", time: "20:00" },
          ],
        },
        {
          name: "LaLiga",
          logo: espana,
          folder: "espana",
          matches: [
            { homeTeam: "Barcelona", awayTeam: "Real Madrid", date: "2024-12-26", time: "21:00" },
            { homeTeam: "Atletico Madrid", awayTeam: "Sevilla", date: "2024-12-27", time: "19:00" },
          ],
        },
        {
          name: "Bundesliga",
          logo: alemania,
          folder: "alemania",
          matches: [
            { homeTeam: "Bayern Munich", awayTeam: "Dortmund", date: "2024-12-26", time: "17:00" },
            { homeTeam: "Leipzig", awayTeam: "Leverkusen", date: "2024-12-27", time: "15:30" },
          ],
        },
        {
          name: "Ligue 1",
          logo: francia,
          folder: "francia",
          matches: [
            { homeTeam: "PSG", awayTeam: "Marseille", date: "2024-12-26", time: "20:45" },
            { homeTeam: "Lyon", awayTeam: "Monaco", date: "2024-12-27", time: "18:15" },
          ],
        },
      ];

    const getTeamLogo = (folder: string, team: string) => {
      const teamSlug = team.toLowerCase().replace(/ /g, "");
      console.log(`/img/${folder}/${teamSlug}.png`);
      return `/img/${folder}/${teamSlug}.png`;
    };

      return (
        <>
          <div className="flex flex-wrap justify-center mt-10">
            {leagues.map((league, index) => (
              <div
                key={index}
                className="bg-first w-4/5 lg:w-[460px] xl:w-[550px] flex flex-col items-center justify-center rounded-3xl mb-10 mx-5"
              >
                <div className="flex items-center justify-center w-full">
                {league.name !== "Ligue 1" ? (
                    <img src={league.logo} alt={league.name} className="w-1/5 sm:w-20 xl:w-1/5" />
                ) : (
                    <img src={league.logo} alt={league.name} className="w-1/5 sm:w-20 xl:w-1/5 my-5" />
                )}
                  <div className="text-center m-2 text-white text-xl font-bold">
                    <h2>{league.name}</h2>
                  </div>
                </div>
                <hr className="w-5/6 border-t-2 border-white pt-2" />
                <div className="w-5/6 my-5">
                  {league.matches.map((match, matchIndex) => (
                    <div key={matchIndex} className="mb-2 text-center text-base bg-white rounded-xl px-5 pt-1">
                        <div className="flex justify-between gap-3">
                            <div className="flex justify-between w-1/2 items-center">
                                <div className="sm:hidden"></div>
                                  <img
                                      src={getTeamLogo(league.folder, match.homeTeam)}
                                      alt={match.homeTeam}
                                      className="w-16 h-16 sm:w-8 sm:h-8"
                                  />
                                <p className="hidden sm:inline">
                                    <span className="font-bold">{match.homeTeam}</span>
                                </p>
                                <input
                                    type="text"
                                    placeholder="#"
                                    className="text-center border rounded h-8 w-8"
                                />
                            </div>
                            <div className="flex justify-between w-1/2 items-center">
                            <div className="sm:hidden"></div>
                                <img
                                      src={getTeamLogo(league.folder, match.awayTeam)}
                                      alt={match.awayTeam}
                                      className="w-16 h-16 sm:w-8 sm:h-8"
                                  />
                                <p className="hidden sm:inline">
                                    <span className="font-bold">{match.awayTeam}</span>
                                </p>
                                <input
                                        type="text"
                                        placeholder="#"
                                        className="text-center border rounded h-8 w-8"
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