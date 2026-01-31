import React, { useState } from "react";

import "./home.css";
const Home = () => {
  const [file, setFile] = useState(null);
  const [emailTo, setEmailTo] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, PNG, DOCX files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    if (emailTo) formData.append("emailTo", emailTo);
    formData.append("expiry", new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());

    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });


      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setDownloadLink(data.downloadLink);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(downloadLink);
    alert("Copied to clipboard!");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">📤 Share Your File</h1>

      <form onSubmit={handleUpload} className="home-form">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="home-input"
        />

        <input
          type="email"
          placeholder="Recipient's Email (optional)"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
          className="home-input"
        />

        <button type="submit" disabled={isLoading} className="home-button">
          {isLoading ? "Uploading..." : "Upload File"}
        </button>
      </form>

      {downloadLink && (
        <div className="home-link-section">
          <p>✅ File uploaded!</p>
          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="home-link"
          >
            {downloadLink}
          </a>
          <button onClick={copyToClipboard} className="home-copy-button">
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
