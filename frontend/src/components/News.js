import React, { useState, useEffect } from "react";
import "../styles/News.css";

const News = () => {
    const [tickers, setTickers] = useState(""); // Default value
  const [topics, setTopics] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const apiKey = "OH87FZGISJPOZDCT";
    const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${tickers}&topics=${topics}&time_from=${today}T0000&sort=LATEST&limit=10&apikey=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.feed) {
        setNews(data.feed.slice(0, 10)); // Ensure only 10 items are displayed
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    }
    setLoading(false);
  };

  return (
    <div className="news-container">
      <h2>Financial News</h2>
      <div className="news-form">
        <input
          type="text"
          placeholder="Enter tickers (e.g., AAPL, TSLA)"
          value={tickers}
          onChange={(e) => setTickers(e.target.value)}
          className="news-input"
        />
        <input
          type="text"
          placeholder="Enter topics (e.g., technology, finance)"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          className="news-input"
        />
        <button onClick={fetchNews} disabled={loading} className="news-button">
          {loading ? "Loading..." : "Fetch News"}
        </button>
      </div>
      {loading && <div className="loading-spinner"></div>}
      <div className="news-list">
        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} className="news-item">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <p><strong>Topics:</strong> {item.topics.map(t => t.topic).join(", ")}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
              <hr className="news-divider" />
            </div>
          ))
        ) : (
          !loading && <p>No news available.</p>
        )}
      </div>
    </div>
  );
};

export default News;
