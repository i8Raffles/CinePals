import React from "react";

function YouTubePlayer({ videoId, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <h2 style={{ color: "white", textAlign: "left" }}>Trailer Player</h2>
        <iframe width="660" height="415" 
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
        <button style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1, color: "white", backgroundColor: "transparent", border: "none", fontSize: "18px" }} onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default YouTubePlayer;