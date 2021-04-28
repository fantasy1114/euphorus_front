import { useState, useEffect } from "react";
const token = localStorage.getItem("token");

export default function useCountryData(route, searchCountry, searchYear) {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (route === "rankings") {
      getCountryRankings(searchCountry, searchYear)
        .then((happinessRankings) => {
          setRowData(happinessRankings);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    } else if (route === "factors") {
      getCountryFactors(searchCountry);
    }
  }, [searchCountry, searchYear]);

  return {
    loading,
    rowData,
    error,
  };
}

function getCountryRankings(searchCountry, searchYear) {
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

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

function getCountryFactors(searchCountry) {
  const url = `http://131.181.190.87:3000/factors/2020?country=${searchCountry}`;
  return fetch(url, { headers }).then((res) => console.log(res.json()));

  // .then((rankings) =>
  //   rankings.map((ranking) => ({
  //     rank: ranking.rank,
  //     country: ranking.country,
  //     score: ranking.score,

  //   }))
  // );
}
