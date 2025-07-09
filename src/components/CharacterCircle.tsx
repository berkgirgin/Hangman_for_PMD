import { useEffect, useRef, useState } from "react";
import styles from "../styles/CharacterCircle.module.css";

type CharacterCircleProps = {
  placeholderMedia: { type: "img" | "video"; src: string };
  videoSrc?: string | null; // optional temporary video to play instead of placeholder
  onClick?: () => void;
  onVideoEnded?: () => void;
};

export function CharacterCircle({
  placeholderMedia,
  videoSrc,
  onClick,
  onVideoEnded,
}: CharacterCircleProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoSrc) {
      setShowVideo(false);
      setShowPlaceholder(true);
      return;
    }
    setShowPlaceholder(false);
    const timer = setTimeout(() => setShowVideo(true), 500);
    return () => clearTimeout(timer);
  }, [videoSrc]);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn("Video play failed:", err));
      }
    }
  }, [showVideo]);

  function handleVideoEnded() {
    setShowVideo(false);
    setTimeout(() => setShowPlaceholder(true), 200);
    if (onVideoEnded) onVideoEnded();
  }

  return (
    <div
      className={styles.circle}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      {showPlaceholder &&
        (placeholderMedia.type === "img" ? (
          <img
            src={placeholderMedia.src}
            alt="Placeholder"
            className={styles.placeholderImg}
          />
        ) : (
          <video
            src={placeholderMedia.src}
            muted
            loop
            playsInline
            autoPlay
            className={`${styles.placeholderVideo} ${styles.video}`}
          />
        ))}

      {showVideo && videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          className={styles.video}
          onEnded={handleVideoEnded}
          autoPlay
        />
      )}
    </div>
  );
}
