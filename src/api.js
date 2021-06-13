import { useState, useEffect } from "react";

export default function useCountryData(
  route,
  searchCountry,
  searchYear,
  searchLimit
) {
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
      getCountryFactors(searchCountry, searchYear, searchLimit)
        .then((countryFactors) => {
          setRowData(countryFactors);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    }
  }, [route, searchCountry, searchYear, searchLimit]);

  return {
    loading,
    rowData,
    error,
  };
}

function getCountryRankings(searchCountry, searchYear) {
  const url = `https://salty-refuge-23420.herokuapp.com/rankings?year=${searchYear}&country=${searchCountry}`;
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

function getCountryFactors(searchCountry, searchYear, searchLimit) {
  const token = localStorage.getItem("token");

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const url = `https://salty-refuge-23420.herokuapp.com/factors/${searchYear}?limit=${searchLimit}&country=${searchCountry}`;
  return fetch(url, { headers })
    .then((res) => res.json())
    .then((countries) =>
      countries.map((country) => ({
        rank: country.rank,
        country: country.country,
        score: country.score,
        economy: country.economy,
        family: country.family,
        health: country.health,
        freedom: country.freedom,
        generosity: country.generosity,
        trust: country.trust,
      }))
    );
}
