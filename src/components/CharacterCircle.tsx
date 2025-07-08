import { useEffect, useRef, useState } from "react";
import styles from "../styles/CharacterCircle.module.css";
import placeHolderImg from "../assets/images/tv_no_signal.gif";

type CharacterCircleProps = {
  videoSrc: string;
};

export function CharacterCircle({ videoSrc }: CharacterCircleProps) {
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
    const placeholderTimeout = setTimeout(() => {
      setShowVideo(true);
    }, 500);

    return () => clearTimeout(placeholderTimeout);
  }, [videoSrc]);

  // Play video when showVideo becomes true
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Autoplay might be blocked or some other issue
          console.warn("Video play failed:", error);
        });
      }
    }
  }, [showVideo]);

  function onVideoEnded() {
    setShowVideo(false);
    setTimeout(() => setShowPlaceholder(true), 200);
  }

  return (
    <div className={styles.circle}>
      <img
        src={placeHolderImg}
        alt="Placeholder"
        className={`${styles.placeholderImg} ${
          showPlaceholder ? styles.fadeIn : styles.fadeOutToBlack
        }`}
      />

      {showVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          className={`${styles.video} ${
            showVideo ? styles.fadeIn : styles.fadeOut
          }`}
          onEnded={onVideoEnded}
        />
      )}
    </div>
  );
}
