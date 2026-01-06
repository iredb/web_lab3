import { useEffect, useState } from "react";

import snowflakeImageOne from "../../assets/images/snowflake1.svg";
import snowflakeImageTwo from "../../assets/images/snowflake2.svg";
import snowflakeImageThree from "../../assets/images/snowflake3.svg";

const SNOWFLAKE_IMAGES = [
  snowflakeImageOne,
  snowflakeImageTwo,
  snowflakeImageThree,
];

const SNOWFLAKE_SPAWN_INTERVAL_MILLISECONDS = 250;
const MAX_SNOWFLAKES_ON_SCREEN = 70;
const CLEANUP_MARGIN_PIXELS = 80;

const getRandomNumberInRange = (min, max) => min + Math.random() * (max - min);
const getRandomArrayItem = (array) => array[(Math.random() * array.length) | 0];

export function SnowfallBackground() {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    let animationFrameRequestId = 0;

    let lastAnimationFrameTimestamp = performance.now();
    let lastSnowflakeSpawnTimestamp = lastAnimationFrameTimestamp;

    const createSnowflake = () => {
      const initialHorizontalPosition = getRandomNumberInRange(
        0,
        window.innerWidth
      );

      return {
        id: lastSnowflakeSpawnTimestamp + Math.random(),
        imageSource: getRandomArrayItem(SNOWFLAKE_IMAGES),

        sizeInPixels: getRandomNumberInRange(8, 18),
        opacity: getRandomNumberInRange(0.35, 0.85),

        baseHorizontalPosition: initialHorizontalPosition,
        horizontalPosition: initialHorizontalPosition,
        verticalPosition: getRandomNumberInRange(-60, -10),

        fallSpeedPixelsPerSecond: getRandomNumberInRange(35, 90),

        swayAmplitudePixels: getRandomNumberInRange(10, 40),
        swayFrequencyRadiansPerSecond: getRandomNumberInRange(0.8, 2.2),
        swayPhaseRadians: getRandomNumberInRange(0, Math.PI * 2),

        rotationDegrees: getRandomNumberInRange(0, 360),
        rotationSpeedDegreesPerSecond: getRandomNumberInRange(-60, 60),
      };
    };

    const animationLoop = (currentTimestamp) => {
      const deltaSeconds =
        (currentTimestamp - lastAnimationFrameTimestamp) / 1000;

      lastAnimationFrameTimestamp = currentTimestamp;

      if (
        currentTimestamp - lastSnowflakeSpawnTimestamp >
        SNOWFLAKE_SPAWN_INTERVAL_MILLISECONDS
      ) {
        lastSnowflakeSpawnTimestamp = currentTimestamp;

        setSnowflakes((previousSnowflakes) => {
          if (previousSnowflakes.length >= MAX_SNOWFLAKES_ON_SCREEN) {
            return previousSnowflakes;
          }

          return [...previousSnowflakes, createSnowflake()];
        });
      }

      setSnowflakes((previousSnowflakes) => {
        const viewportHeight = window.innerHeight;
        const currentTimeInSeconds = currentTimestamp / 1000;

        return previousSnowflakes
          .map((snowflake) => {
            const updatedVerticalPosition =
              snowflake.verticalPosition +
              snowflake.fallSpeedPixelsPerSecond * deltaSeconds;

            const horizontalSwayOffset =
              Math.sin(
                currentTimeInSeconds * snowflake.swayFrequencyRadiansPerSecond +
                  snowflake.swayPhaseRadians
              ) * snowflake.swayAmplitudePixels;

            const updatedHorizontalPosition =
              snowflake.baseHorizontalPosition + horizontalSwayOffset;

            const updatedRotationDegrees =
              snowflake.rotationDegrees +
              snowflake.rotationSpeedDegreesPerSecond * deltaSeconds;

            return {
              ...snowflake,
              verticalPosition: updatedVerticalPosition,
              horizontalPosition: updatedHorizontalPosition,
              rotationDegrees: updatedRotationDegrees,
            };
          })
          .filter(
            (snowflake) =>
              snowflake.verticalPosition <
              viewportHeight + CLEANUP_MARGIN_PIXELS
          );
      });

      animationFrameRequestId = requestAnimationFrame(animationLoop);
    };

    animationFrameRequestId = requestAnimationFrame(animationLoop);

    return () => cancelAnimationFrame(animationFrameRequestId);
  }, []);

  return (
    <div className="snowfall" aria-hidden="true">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="snowflake-wrapper"
          style={{
            left: snowflake.horizontalPosition,
            top: snowflake.verticalPosition,
            width: snowflake.sizeInPixels,
            height: snowflake.sizeInPixels,
            opacity: snowflake.opacity,
          }}
        >
          <img
            className="snowflake"
            src={snowflake.imageSource}
            alt=""
            style={{
              width: snowflake.sizeInPixels,
              height: snowflake.sizeInPixels,
              transform: `rotate(${snowflake.rotationDegrees}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
