import { useState, useEffect } from "react";

export default function useCountryData(search) {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCountryData(search)
      .then((happinessRankings) => {
        setRowData(happinessRankings);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [search]);

  return {
    loading,
    rowData,
    error,
  };
}

function getCountryData(search) {
  const url = `http://131.181.190.87:3000/rankings?country=${search}`;
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
