export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 2.5 27 7v8.2c0 6.9-4.7 12.3-11 14.3C9.7 27.5 5 22.1 5 15.2V7l11-4.5Z"
        fill="url(#g)"
        stroke="rgba(52,211,153,0.6)"
        strokeWidth="1.2"
      />
      <path
        d="M11.5 16.2l3 3.3 6-7"
        stroke="#06251b"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="g" x1="5" y1="3" x2="27" y2="29">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
