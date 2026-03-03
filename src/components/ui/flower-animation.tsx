"use client"

export function FlorerAnimation() {
  return (
    <div className="relative mx-auto h-[460px] w-[360px] sm:h-[520px] sm:w-[420px]">
      <div className="flowers-scene" aria-hidden="true">
        <div className="flowers">
          <div className="flower flower--1">
            <div className="flower__leafs flower__leafs--1">
              <div className="flower__leaf flower__leaf--1" />
              <div className="flower__leaf flower__leaf--2" />
              <div className="flower__leaf flower__leaf--3" />
              <div className="flower__leaf flower__leaf--4" />
              <div className="flower__white-circle" />
              <div className="flower__light flower__light--1" />
              <div className="flower__light flower__light--2" />
              <div className="flower__light flower__light--3" />
              <div className="flower__light flower__light--4" />
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1" />
              <div className="flower__line__leaf flower__line__leaf--2" />
              <div className="flower__line__leaf flower__line__leaf--3" />
              <div className="flower__line__leaf flower__line__leaf--4" />
            </div>
          </div>

          <div className="flower flower--2">
            <div className="flower__leafs flower__leafs--2">
              <div className="flower__leaf flower__leaf--1" />
              <div className="flower__leaf flower__leaf--2" />
              <div className="flower__leaf flower__leaf--3" />
              <div className="flower__leaf flower__leaf--4" />
              <div className="flower__white-circle" />
              <div className="flower__light flower__light--1" />
              <div className="flower__light flower__light--2" />
              <div className="flower__light flower__light--3" />
              <div className="flower__light flower__light--4" />
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1" />
              <div className="flower__line__leaf flower__line__leaf--2" />
              <div className="flower__line__leaf flower__line__leaf--3" />
              <div className="flower__line__leaf flower__line__leaf--4" />
            </div>
          </div>

          <div className="flower flower--3">
            <div className="flower__leafs flower__leafs--3">
              <div className="flower__leaf flower__leaf--1" />
              <div className="flower__leaf flower__leaf--2" />
              <div className="flower__leaf flower__leaf--3" />
              <div className="flower__leaf flower__leaf--4" />
              <div className="flower__white-circle" />
              <div className="flower__light flower__light--1" />
              <div className="flower__light flower__light--2" />
              <div className="flower__light flower__light--3" />
              <div className="flower__light flower__light--4" />
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1" />
              <div className="flower__line__leaf flower__line__leaf--2" />
              <div className="flower__line__leaf flower__line__leaf--3" />
              <div className="flower__line__leaf flower__line__leaf--4" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .flowers-scene, .flowers-scene * { box-sizing: border-box; }
        .flowers-scene {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: visible;
          pointer-events: none;
          background: transparent;
          perspective: 1000px;
          filter: drop-shadow(0 0 1.1vmin rgba(35, 240, 255, 0.2));
        }

        .flowers {
          position: relative;
          transform: scale(0.55);
        }

        .flower {
          position: absolute;
          bottom: 8vmin;
          transform-origin: bottom center;
          z-index: 10;
          --fl-speed: 0.8s;
        }

        .flower--1 { animation: moving-flower-1 4s ease-in-out infinite; }
        .flower--1 .flower__line { height: 70vmin; }
        .flower--2 {
          left: 50%;
          transform: rotate(18deg);
          animation: moving-flower-2 4s ease-in-out infinite;
        }
        .flower--2 .flower__line { height: 60vmin; }
        .flower--3 {
          left: 50%;
          transform: rotate(-16deg);
          animation: moving-flower-3 4s ease-in-out infinite;
        }
        .flower--3 .flower__line { height: 56vmin; }

        .flower__leafs {
          position: relative;
          animation: blooming-flower 2s backwards;
        }

        .flower__leaf {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 8vmin;
          height: 11vmin;
          border-radius: 51% 49% 47% 53% / 44% 45% 55% 69%;
          background-color: #a7ffee;
          background-image: linear-gradient(to top, #54b8aa, #a7ffee);
          transform-origin: bottom center;
          opacity: 0.92;
          box-shadow: inset 0 0 2vmin rgba(255,255,255,0.35);
        }
        .flower__leaf--1 { transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg); }
        .flower__leaf--2 { transform: translate(-50%, -4%) rotateX(40deg); }
        .flower__leaf--3 { transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg); }
        .flower__leaf--4 {
          width: 8vmin;
          height: 8vmin;
          transform-origin: bottom left;
          border-radius: 4vmin 10vmin 4vmin 4vmin;
          transform: translate(-0%, 18%) rotateX(70deg) rotate(-43deg);
          background-image: linear-gradient(to top, #39c6d6, #a7ffee);
          z-index: 1;
          opacity: 0.8;
        }

        .flower__white-circle {
          position: absolute;
          left: -3.5vmin;
          top: -3vmin;
          width: 9vmin;
          height: 4vmin;
          border-radius: 50%;
          background-color: #fff;
          box-shadow: 0 0 1vmin 0.3vmin rgba(255,255,200,0.35);
        }
        .flower__white-circle::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 60%;
          border-radius: inherit;
          background-image: linear-gradient(90deg, rgb(255,235,18), rgb(255,206,0));
        }

        .flower__line {
          width: 1.5vmin;
          background-image:
            linear-gradient(to left, rgba(0,0,0,0.2), transparent, rgba(255,255,255,0.2)),
            linear-gradient(to top, transparent 10%, #14757a, #39c6d6);
          box-shadow: inset 0 0 2px rgba(0,0,0,0.5);
          animation: grow-flower-tree 2.8s backwards;
        }

        .flower__line__leaf {
          --w: 7vmin;
          --h: calc(var(--w) + 2vmin);
          position: absolute;
          top: 20%;
          left: 90%;
          width: var(--w);
          height: var(--h);
          border-top-right-radius: var(--h);
          border-bottom-left-radius: var(--h);
          background-image: linear-gradient(to top, rgba(20,117,122,0.4), #39c6d6);
        }
        .flower__line__leaf--1 { transform: rotate(70deg) rotateY(30deg); }
        .flower__line__leaf--2 { top: 45%; transform: rotate(70deg) rotateY(30deg); }
        .flower__line__leaf--3,
        .flower__line__leaf--4 {
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
          border-top-left-radius: var(--h);
          border-bottom-right-radius: var(--h);
          left: -460%;
          transform: rotate(-70deg) rotateY(30deg);
        }
        .flower__line__leaf--3 { top: 12%; }
        .flower__line__leaf--4 { top: 40%; }

        .flower__light {
          position: absolute;
          bottom: 0;
          width: 1vmin;
          height: 1vmin;
          background-color: rgba(255, 251, 0, 0.75);
          border-radius: 50%;
          filter: blur(0.2vmin);
          animation: light-ans 4s linear infinite backwards;
        }
        .flower__light:nth-child(odd) { background-color: rgba(35, 240, 255, 0.85); }
        .flower__light--1 { left: -2vmin; animation-delay: 1.0s; }
        .flower__light--2 { left:  3vmin; animation-delay: 0.5s; }
        .flower__light--3 { left: -6vmin; animation-delay: 0.3s; }
        .flower__light--4 { left:  6vmin; animation-delay: 0.9s; }

        @keyframes light-ans {
          0%   { opacity:0; transform:translateY(0); }
          30%  { opacity:1; transform:translateY(-7vmin) translateX(-2vmin); }
          60%  { opacity:1; transform:translateY(-16vmin) translateX(2vmin); }
          100% { opacity:0; transform:translateY(-28vmin); filter:blur(1vmin); }
        }
        @keyframes moving-flower-1 { 0%,100%{transform:rotate(2deg);}  50%{transform:rotate(-2deg);} }
        @keyframes moving-flower-2 { 0%,100%{transform:rotate(18deg);} 50%{transform:rotate(14deg);} }
        @keyframes moving-flower-3 { 0%,100%{transform:rotate(-16deg);} 50%{transform:rotate(-19deg);} }
        @keyframes grow-flower-tree { 0%{height:0; border-radius:1vmin;} }
        @keyframes blooming-flower { 0%{transform:scale(0);} }

        @media (min-width: 640px) {
          .flowers { transform: scale(0.68); }
        }
      `}</style>
    </div>
  )
}
