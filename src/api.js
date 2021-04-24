import { useState, useEffect } from "react";
// import axios from "axios";

export default function useCountryData() {
  //   const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCountryData()
      .then((happinessRankings) => {
        setRowData(happinessRankings);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    rowData,
    error,
  };
}

function getCountryData() {
  const url = "http://131.181.190.87:3000/rankings?year=2020";
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
