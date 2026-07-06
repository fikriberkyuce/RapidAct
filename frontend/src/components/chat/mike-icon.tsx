"use client";

import React from "react";

export function MikeIcon({
    spin = false,
    done = false,
    error = false,
    mike = false,
    size = 24,
    style,
}: {
    spin?: boolean;
    done?: boolean;
    error?: boolean;
    mike?: boolean;
    size?: number;
    style?: React.CSSProperties;
}) {
    void mike;

    const fill = error
        ? "#ef4444"
        : done
          ? "#22c55e"
          : "currentColor";

    return (
        <span
            className="shrink-0 inline-block"
            style={{
                animation: spin ? "spin 1.2s linear infinite" : undefined,
                ...style,
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-5 -5 250 330"
                width={size}
                height={size}
                style={{ display: "block" }}
            >
                {/* Chevron ">" with bottom arm curving into "2" tail */}
                <path
                    fill="none"
                    stroke={fill}
                    strokeWidth="46"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="
                        M 32 24
                        L 196 130
                        L 64 236
                        Q 20 270 52 300
                        Q 72 316 110 316
                        L 204 316
                    "
                />
                {/* Capsule inside the chevron */}
                <rect
                    x="52" y="84" width="28" height="96"
                    rx="14" ry="14"
                    fill="none"
                    stroke={fill}
                    strokeWidth="5.5"
                />
            </svg>
        </span>
    );
}
