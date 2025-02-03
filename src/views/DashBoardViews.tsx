import { useEffect, useState } from "react";

// import teamsData from "../data/teamsData.json";
import leaguesData from "../data/leaguesData.json";
// import matchesData from "../data/matchesData.json";

interface DashBoardViewProps {
  selectedDate: Date;
}

export default function DashBoardView({ selectedDate }: DashBoardViewProps) {
      interface League {
        name: string;
        logo: string;
        folder: string;
      }

      // interface Team {
      //   name: string;
      //   logo: string;
      // }

      interface Match {
        liga: League;
        homeTeam: string;
        awayTeam: string;
        homeLogo: string;
        awayLogo: string;
        date: string;
        time: string;
        homeScore?: number;
        awayScore?: number;
      }

      const formatDateForAPI = (date: Date) => {
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
      };
      
      const fetchMatches = async (date: Date) => {
        const formattedDate = formatDateForAPI(date);
        const response = await fetch(
          `https://api.promiedos.com.ar/games/${formattedDate}`
        );
        const data = await response.json();
        const matchesByLeague: { [key: string]: Match[] } = {};
        console.log(formattedDate)

        data.leagues
          .filter((league: any) =>
        ["Premier League", "Serie A", "Ligue 1", "LaLiga", "Bundesliga"].includes(league.name)
          )
          .forEach((league: any) => {
        matchesByLeague[league.name] = league.games.map((game: any) => {
          const [date, time] = game.start_time.split(" ");
          return {
        liga: {
          name: league.name,
          logo: league.url_name,
          folder: league.url_name,
        },
        homeTeam: game.teams[0].name,
        awayTeam: game.teams[1].name,
        homeLogo: game.teams[0].url_name,
        awayLogo: game.teams[1].url_name,
        date: date,
        time: time,
        homeScore: game.game_time === -1 ? undefined : game.scores[0],
        awayScore: game.game_time === -1 ? undefined : game.scores[1],
          };
        });
          });

        return matchesByLeague;
      };
      
      const [matches, setMatches] = useState<{ [key: string]: Match[] }>({});
      const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
      const [predictions, setPredictions] = useState<{ 
        [league: string]: { 
          [matchIndex: number]: {
            home: string;
            away: string;
          } 
        } 
      }>({});
      const leagues: League[] = leaguesData;
      
      useEffect(() => {
        fetchMatches(selectedDate).then((matches) => {
          setMatches(matches);
        });
      }, [selectedDate]);

      const handlePredictionChange = (
        league: string, 
        matchIndex: number, 
        team: 'home' | 'away', 
        value: string
      ) => {
        setPredictions(prev => ({
          ...prev,
          [league]: {
            ...prev[league],
            [matchIndex]: {
              ...prev[league]?.[matchIndex],
              [team]: value.replace(/[^0-9]/g, '') // Solo números
            }
          }
        }));
      };

      return (
        <>
          <div className="flex flex-wrap justify-center mt-10">
            {leagues.map((league, index) => (
              <div
                key={index}
                className="bg-first w-4/5 lg:w-[460px] xl:w-[550px] flex flex-col items-center rounded-3xl mb-10 mx-5"
              >
                <div className="flex items-center justify-center w-full relative">
                  <img
                    src={`img/${league.logo}`}
                    alt={league.name}
                    className={`w-1/5 sm:w-20 xl:w-1/5 ${
                      league.name === "Ligue 1" ? "my-5" : ""
                    }`}
                  />
                  <div className="text-center m-2 text-white text-xl font-bold">
                    <h2>{league.name}</h2>
                  </div>
                    {matches[league.name]?.length > 0 && (
                      <button
                      onClick={() => setSelectedLeague(league.name)}
                      className="absolute top-2 right-2 px-2 p-1 pb-3 bg-third rounded-full hover:bg-fifth transition-colors flex items-center justify-center"
                      >
                      📷
                      </button>
                    )}
                </div>
                <hr className="w-5/6 border-t-2 border-white pt-2" />
                { /* MODAL PREDICCIONES */ }
                {selectedLeague && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-first rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="flex justify-between items-center p-4 sticky top-0 bg-first">
                        <h3 className="text-white text-xl font-bold">
                          Predicciones - {selectedLeague}
                        </h3>
                        <button
                          onClick={() => setSelectedLeague(null)}
                          className="text-white text-3xl hover:text-gray-300"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="p-4 space-y-4">
                        {matches[selectedLeague]?.map((match, matchIndex) => {
                          const homePred = predictions[selectedLeague]?.[matchIndex]?.home || '-';
                          const awayPred = predictions[selectedLeague]?.[matchIndex]?.away || '-';
                          
                            return (
                            <div key={matchIndex} className="bg-white rounded-lg p-2 sm:p-4 shadow-lg">
                              <div className="flex items-center justify-between gap-4 mb-3">
                              <div className="flex justify-center items-center gap-2 flex-1 sm:justify-start">
                                <img
                                src={`img/${match.liga.folder}/${match.homeLogo}.png`}
                                alt={match.homeTeam}
                                className="w-16 h-16 sm:w-12 sm:h-12"
                                />
                                <span className="hidden sm:inline font-bold text-sm md:text-base">
                                {match.homeTeam}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                                {match.homeScore !== undefined && match.awayScore !== undefined ? (
                                <>
                                  <span className="text-2xl font-bold text-blue-600">{match.homeScore}</span>
                                  <span className="mx-1 text-xl">-</span>
                                  <span className="text-2xl font-bold text-red-600">{match.awayScore}</span>
                                </>
                                ) : (
                                <>
                                  <span className="text-2xl font-bold text-blue-600">{homePred}</span>
                                  <span className="mx-1 text-xl">-</span>
                                  <span className="text-2xl font-bold text-red-600">{awayPred}</span>
                                </>
                                )}
                              </div>

                              <div className="flex justify-center items-center gap-2 flex-1 sm:justify-end">
                                <span className="hidden sm:inline font-bold text-sm md:text-base">
                                {match.awayTeam}
                                </span>
                                <img
                                src={`img/${match.liga.folder}/${match.awayLogo}.png`}
                                alt={match.awayTeam}
                                className="w-16 h-16 sm:w-12 sm:h-12"
                                />
                              </div>
                              </div>
                              <p className="text-center text-gray-600 text-sm">
                              {match.date} - {match.time}
                              </p>
                            </div>
                            );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                { /* TARJETA LIGA */}
                <div className="w-5/6 my-5">
                    {matches[league.name]?.length > 0 ? (
                    matches[league.name]?.map((match, matchIndex) => (
                    <div key={matchIndex} className="mb-2 text-center text-base bg-white rounded-xl px-5 pt-1">
                      <div className="flex justify-between gap-0 sm:gap-3">
                        <div className="flex justify-between w-1/2 items-center">
                          <div className="sm:hidden"></div>
                            <img
                              src={`img/${league.folder}/${match.homeLogo}.png`}
                              alt={match.homeTeam}
                              className="w-16 h-16 sm:w-8 sm:h-8"
                            />
                          <p className="hidden sm:inline">
                            <span className="font-bold">{match.homeTeam}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-0 sm:gap-2 bg-gray-100 px-[1px] py-2 sm:px-4 rounded-lg">
                          {match.homeScore !== undefined && match.awayScore !== undefined ? (
                          <>
                            <span className="text-center h-6 w-6 sm:h-8 sm:w-8 sm:text-xl font-bold text-blue-600">
                            {match.homeScore}
                            </span>
                            <span className="mx-1 text-xl">-</span>
                            <span className="text-center h-6 w-6 sm:h-8 sm:w-8 sm:text-xl font-bold text-red-600">
                            {match.awayScore}
                            </span>
                          </>
                          ) : (
                          <>
                            <input
                            type="text"
                            placeholder="#"
                            className="text-center border h-6 w-6 sm:h-8 sm:w-8 sm:text-xl font-bold text-blue-600"
                            value={predictions[league.name]?.[matchIndex]?.home || ''}
                            onChange={(e) => handlePredictionChange(league.name, matchIndex, 'home', e.target.value)}
                            maxLength={2}
                            />
                            <span className="mx-1 text-xl">-</span>
                            <input
                            type="text"
                            placeholder="#"
                            className="text-center border rounded h-6 w-6 sm:h-8 sm:w-8 sm:text-xl font-bold text-red-600"
                            value={predictions[league.name]?.[matchIndex]?.away || ''}
                            onChange={(e) => handlePredictionChange(league.name, matchIndex, 'away', e.target.value)}
                            maxLength={2}
                            />
                          </>
                          )}
                        </div>
                        <div className="flex sm:justify-between w-1/2 items-center">
                        <div className="sm:hidden"></div>
                          <p className="hidden sm:inline">
                            <span className="font-bold">{match.awayTeam}</span>
                          </p>
                          <img
                              src={`img/${league.folder}/${match.awayLogo}.png`}
                              alt={match.awayTeam}
                              className="w-16 h-16 sm:w-8 sm:h-8"
                            />
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {match.date} - {match.time}
                      </p>
                    </div>
                    ))
                  ) : (
                      <p className="text-white text-center">No hay partidos para esta fecha</p>
                    )
                    }
                </div>
              </div>
            ))}
          </div>
        </>
      );      
}