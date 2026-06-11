/* eslint-disable @next/next/no-html-link-for-pages */
import NotfoundImage from "@/public/wired-lineal-1140-error-in-reveal.gif";
import Image from "next/image";

export default function GlobalNotFound() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center" as const,
      backgroundColor: "#f8f8f8",
      height: "100vh",
      padding: "20px",
    },
    image: {
      marginBottom: "20px",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "10px",
    },
    message: {
      fontSize: "1.2rem",
      color: "#666",
      marginBottom: "20px",
    },
    buttonWrapper: {
      marginTop: "20px",
    },
  };

  return (
    <html>
      <body
        style={{ margin: 0, padding: 0, height: "100vh", overflow: "hidden" }}
      >
        <div style={styles.container}>
          <Image
            src={NotfoundImage}
            width={300}
            height={300}
            alt="Page Not Found"
            style={styles.image}
          />
          <h1 style={styles.title}>404 - Page Not Found</h1>
          <p style={styles.message}>
            Sorry, the page you&apos;re looking for doesn&apos;t exist.
          </p>
          <a
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#fcc800",
              color: "#333",
              textDecoration: "none",
              borderRadius: "4px",
              border: "solid 1px #333",
            }}
            href="/"
          >
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}
