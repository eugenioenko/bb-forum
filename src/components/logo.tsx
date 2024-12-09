import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/home" aria-label="go to home">
      <svg
        viewBox="0 0 256 256"
        widths="256"
        height="256"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        className="max-w-full h-auto"
      >
        <g transform="matrix(1,0,0,1,3,2)">
          <circle
            cx="125"
            cy="126"
            r="120"
            style={{ fill: "var(--color-primary)" }}
          />
        </g>
        <g transform="matrix(1.52941,0,0,1.19626,-65.4706,-19.7383)">
          <path
            d="M152,86.301L152,160.699C152,169.696 146.287,177 139.25,177L113.75,177C106.713,177 101,169.696 101,160.699L101,86.301C101,77.304 106.713,70 113.75,70L139.25,70C146.287,70 152,77.304 152,86.301Z"
            fill="#fff"
          />
        </g>
        <g transform="matrix(1,0,0,1.57143,-17,-68.5714)">
          <path
            d="M188,100.75L188,104.25C188,105.216 186.768,106 185.25,106L141.75,106C140.232,106 139,105.216 139,104.25L139,100.75C139,99.784 140.232,99 141.75,99L185.25,99C186.768,99 188,99.784 188,100.75Z"
            style={{ fill: "var(--color-accent)" }}
          />
        </g>
        <g transform="matrix(1,0,0,1.57143,-17,-50.5714)">
          <path
            d="M188,100.75L188,104.25C188,105.216 186.768,106 185.25,106L141.75,106C140.232,106 139,105.216 139,104.25L139,100.75C139,99.784 140.232,99 141.75,99L185.25,99C186.768,99 188,99.784 188,100.75Z"
            style={{ fill: "var(--color-accent)" }}
          />
        </g>
        <g transform="matrix(1,0,0,1.57143,-17,-32.5714)">
          <path
            d="M188,100.75L188,104.25C188,105.216 186.768,106 185.25,106L141.75,106C140.232,106 139,105.216 139,104.25L139,100.75C139,99.784 140.232,99 141.75,99L185.25,99C186.768,99 188,99.784 188,100.75Z"
            style={{ fill: "var(--color-accent)" }}
          />
        </g>
      </svg>
    </Link>
  );
};
