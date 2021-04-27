import { useState, useEffect } from "react";

export default function useCountryData(searchCountry, searchYear) {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCountryData(searchCountry, searchYear)
      .then((happinessRankings) => {
        setRowData(happinessRankings);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [searchCountry, searchYear]);

  return {
    loading,
    rowData,
    error,
  };
}

function getCountryData(searchCountry, searchYear) {
  const url = `http://131.181.190.87:3000/rankings?year=${searchYear}&country=${searchCountry}`;
  return fetch(url)
    .then((res) => res.json())
    .then((rankings) =>
      rankings.map((ranking) => ({
        rank: ranking.rank,
        country: ranking.country,
        score: ranking.score,
        year: ranking.year,
      }))
    );
}
