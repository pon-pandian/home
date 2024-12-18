import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1.5 seconds
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjusted to 1.5 seconds for loading
  }, []);

  return (
    <div style={styles.container}>
      {loading ? (
        // Show loader while loading
        <div style={styles.loader}>Loading...</div>
      ) : (
        <>
          {/* Layer wipe transition from right to left */}
          <motion.div
            initial={{ width: "100%" }} // Start with full width
            animate={{
              width: "0%", // Animate to 0 width (wiping from right to left)
              transition: { duration: 2, ease: "linear" },
            }}
            exit={{ width: "100%" }}
            style={styles.overlay}
          />
          {/* Content after the wipe transition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 2, duration: 1 }, // Delay for wipe effect
            }}
            style={styles.content}
          >
            <h2>Content Loaded!</h2>
            <p>Your content is now visible after the wipe effect.</p>
          </motion.div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  loader: {
    fontSize: "2rem",
    fontWeight: "bold",
    padding: "20px",
    backgroundColor: "#3498db",
    borderRadius: "50%",
    color: "#fff",
    textAlign: "center",
    width: "150px",
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff", // Wipe color (white)
    zIndex: 2,
  },
  content: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
};

export default LoadingPage;
