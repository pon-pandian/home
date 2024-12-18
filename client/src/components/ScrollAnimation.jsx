import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const ScrollEffect = () => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const startScroll = 0; // Top of the page
    const middleScroll = 300; // Middle of scroll effect
    const endScroll = 600; // End of scroll effect

    if (scrollY <= startScroll) {
      controls.start({
        x: "0vw", // Center
        scale: 1,
      });
    } else if (scrollY > startScroll && scrollY <= middleScroll) {
      controls.start({
        x: "-50vw", // Move left
        scale: 2,
      });
    } else if (scrollY > middleScroll && scrollY <= endScroll) {
      controls.start({
        x: "0vw", // Return to center
        scale: 3,
      });
    }
  }, [scrollY, controls]);

  return (
    <div style={{ height: "200vh", background: "#f7f7f7", padding: "20px" }}>
      <motion.div
        animate={controls}
        transition={{ type: "spring", stiffness: 50 }}
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "#3498db",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default ScrollEffect;

// import React, { useEffect, useState } from "react";
// import { motion, useAnimation } from "framer-motion";

// const ScrollEffect = () => {
//   const [scrollY, setScrollY] = useState(0);
//   const controls = useAnimation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const startScroll = 0; // Top of the page
//     const middleScroll = 300; // Middle of scroll effect
//     const endScroll = 600; // End of scroll effect

//     if (scrollY <= startScroll) {
//       controls.start({
//         x: "0vw", // Center
//         scale: 1,
//       });
//     } else if (scrollY > startScroll && scrollY <= middleScroll) {
//       controls.start({
//         x: "-50vw", // Move left
//         scale: 1,
//       });
//     } else if (scrollY > middleScroll && scrollY <= endScroll) {
//       controls.start({
//         x: "0vw", // Return to center
//         scale: 0.5, // Decrease size
//       });
//     }
//   }, [scrollY, controls]);

//   return (
//     <div style={{ height: "200vh", background: "#f9f9f9", padding: "20px" }}>
//       <motion.div
//         animate={controls}
//         transition={{ type: "spring", stiffness: 50 }}
//         style={{
//           width: "200px",
//           height: "200px",
//           borderRadius: "50%",
//           background: "#e74c3c",
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//         }}
//       />
//     </div>
//   );
// };

// export default ScrollEffect;
