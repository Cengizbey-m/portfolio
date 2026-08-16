"use client";

import * as React from "react";
import { Upload, Shuffle, Eye, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";

/**
 * Classic sliding tile puzzle. The board is N x N tiles with the last one
 * removed; you slide neighbours into the gap until the picture is rebuilt.
 *
 * Two details matter for it to feel fair:
 *  1. The shuffle walks the blank tile randomly instead of permuting the array,
 *     so every board it produces is guaranteed solvable.
 *  2. Tiles are background-position crops of one image, so any uploaded photo
 *     works without slicing it into separate files.
 */

const SIZES = [3, 4, 5] as const;
type Size = (typeof SIZES)[number];

const DEFAULT_IMAGE = "/images/bloom/bloom-1.png";
const BEST_KEY = "cengiz.puzzle.best.v1";

type Board = number[]; // value = original tile index, last index = blank

function solvedBoard(n: number): Board {
  return Array.from({ length: n * n }, (_, i) => i);
}

function isSolved(board: Board): boolean {
  return board.every((v, i) => v === i);
}

/** Indices adjacent to `pos` on an n x n grid. */
function neighbours(pos: number, n: number): number[] {
  const r = Math.floor(pos / n);
  const c = pos % n;
  const out: number[] = [];
  if (r > 0) out.push(pos - n);
  if (r < n - 1) out.push(pos + n);
  if (c > 0) out.push(pos - 1);
  if (c < n - 1) out.push(pos + 1);
  return out;
}

/** Shuffle by walking the blank tile, which can only reach solvable states. */
function shuffleBoard(n: number): Board {
  const board = solvedBoard(n);
  const blankValue = n * n - 1;
  let blankPos = board.indexOf(blankValue);
  let previous = -1;
  const moves = n * n * 20;

  for (let i = 0; i < moves; i++) {
    const options = neighbours(blankPos, n).filter((p) => p !== previous);
    const pick = options[Math.floor(Math.random() * options.length)];
    board[blankPos] = board[pick];
    board[pick] = blankValue;
    previous = blankPos;
    blankPos = pick;
  }

  // A shuffle that lands back on solved would be an anticlimax.
  if (isSolved(board)) return shuffleBoard(n);
  return board;
}

export function PixelPuzzle() {
  const [size, setSize] = React.useState<Size>(3);
  const [board, setBoard] = React.useState<Board>(() => solvedBoard(3));
  const [imageUrl, setImageUrl] = React.useState<string>(DEFAULT_IMAGE);
  const [isCustom, setIsCustom] = React.useState(false);
  const [moves, setMoves] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const [won, setWon] = React.useState(false);
  const [peek, setPeek] = React.useState(false);
  const [best, setBest] = React.useState<Record<string, number>>({});

  const fileRef = React.useRef<HTMLInputElement>(null);
  const objectUrlRef = React.useRef<string | null>(null);

  const blankValue = size * size - 1;

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(BEST_KEY);
      if (raw) setBest(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Release the blob URL when we swap images or unmount.
  React.useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!started || won) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [started, won]);

  const startGame = React.useCallback(
    (n: Size) => {
      setSize(n);
      setBoard(shuffleBoard(n));
      setMoves(0);
      setSeconds(0);
      setWon(false);
      setStarted(true);
      unlock("play-puzzle");
      sfx.click();
    },
    []
  );

  function recordBest(n: Size, moveCount: number) {
    setBest((prev) => {
      const key = String(n);
      const next = { ...prev };
      if (next[key] === undefined || moveCount < next[key]) next[key] = moveCount;
      try {
        window.localStorage.setItem(BEST_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function moveTile(pos: number) {
    if (!started || won) return;
    const blankPos = board.indexOf(blankValue);
    if (!neighbours(blankPos, size).includes(pos)) return;

    const next = [...board];
    next[blankPos] = next[pos];
    next[pos] = blankValue;
    setBoard(next);
    sfx.hover();

    const nextMoves = moves + 1;
    setMoves(nextMoves);

    if (isSolved(next)) {
      setWon(true);
      setStarted(false);
      sfx.unlock();
      recordBest(size, nextMoves);
      unlock("puzzle-solved");
      if (size >= 4) unlock("puzzle-hard");
    }
  }

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setImageUrl(url);
    setIsCustom(true);
    startGame(size);
  }

  function useDefaultImage() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setImageUrl(DEFAULT_IMAGE);
    setIsCustom(false);
    startGame(size);
  }

  const bestForSize = best[String(size)];
  const showFullImage = peek || won || !started;

  return (
    <div className="space-y-4">
      {/* Scoreboard */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm bg-black/25 px-3 py-2 font-mono text-sm ring-1 ring-white/10">
        <div className="flex flex-wrap items-center gap-4">
          <span>
            <span className="text-muted-foreground">MOVES</span>{" "}
            <span className="text-foreground">{moves}</span>
          </span>
          <span>
            <span className="text-muted-foreground">TIME</span>{" "}
            <span className="tabular-nums text-foreground">{seconds}s</span>
          </span>
          <span>
            <span className="text-muted-foreground">BEST</span>{" "}
            <span className="text-[hsl(var(--steam-gold))]">
              {bestForSize === undefined ? "-" : `${bestForSize} mv`}
            </span>
          </span>
        </div>
        <Button onClick={() => startGame(size)} className="normal-case font-medium tracking-normal">
          <Shuffle className="h-4 w-4" /> {started || won ? "Shuffle" : "Start"}
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 rounded-sm bg-black/20 p-1 ring-1 ring-white/10">
          {SIZES.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => startGame(n)}
              className={`rounded px-3 py-1.5 text-xs font-semibold transition ${
                size === n
                  ? "bg-[hsl(var(--steam-link))]/20 text-[hsl(var(--steam-link))] ring-1 ring-[hsl(var(--steam-link))]/40"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {n}×{n}
            </button>
          ))}
        </div>

        <Button
          variant="secondary"
          onClick={() => fileRef.current?.click()}
          className="normal-case font-medium tracking-normal"
        >
          <Upload className="h-4 w-4" /> Use my photo
        </Button>
        {isCustom ? (
          <Button
            variant="secondary"
            onClick={useDefaultImage}
            className="normal-case font-medium tracking-normal"
          >
            <ImageIcon className="h-4 w-4" /> Default image
          </Button>
        ) : null}
        <Button
          variant="secondary"
          onMouseDown={() => setPeek(true)}
          onMouseUp={() => setPeek(false)}
          onMouseLeave={() => setPeek(false)}
          onTouchStart={() => setPeek(true)}
          onTouchEnd={() => setPeek(false)}
          className="normal-case font-medium tracking-normal"
        >
          <Eye className="h-4 w-4" /> Hold to peek
        </Button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onUpload}
          className="hidden"
        />
      </div>

      {/* Board */}
      <div className="flex justify-center">
        <div
          className="relative w-full max-w-md overflow-hidden rounded-md border border-border bg-black/40 ring-1 ring-white/10"
          style={{ aspectRatio: "1 / 1" }}
        >
          <div
            className="grid h-full w-full gap-[2px] p-[2px]"
            style={{
              gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
            }}
          >
            {board.map((tileValue, pos) => {
              const isBlank = tileValue === blankValue && !showFullImage;
              const row = Math.floor(tileValue / size);
              const col = tileValue % size;
              // Percentage background-position crops the shared image per tile.
              // Board sizes start at 3, so the divisor is never zero.
              const posX = (col / (size - 1)) * 100;
              const posY = (row / (size - 1)) * 100;

              return (
                <button
                  key={pos}
                  type="button"
                  onClick={() => moveTile(pos)}
                  aria-label={isBlank ? "Empty space" : `Tile ${tileValue + 1}`}
                  className={`relative rounded-[3px] transition-opacity duration-150 ${
                    isBlank
                      ? "cursor-default bg-black/60"
                      : "cursor-pointer ring-1 ring-black/40 hover:brightness-110"
                  }`}
                  style={
                    isBlank
                      ? undefined
                      : {
                          backgroundImage: `url(${imageUrl})`,
                          backgroundSize: `${size * 100}% ${size * 100}%`,
                          backgroundPosition: `${posX}% ${posY}%`,
                        }
                  }
                />
              );
            })}
          </div>

          {won ? (
            <div className="absolute inset-0 grid place-items-center bg-black/70 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-lg font-bold text-[hsl(var(--steam-green))]">Solved! 🧩</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {moves} moves · {seconds}s
                  {bestForSize === moves ? " · new best" : ""}
                </p>
                <Button
                  onClick={() => startGame(size)}
                  className="mt-3 normal-case font-medium tracking-normal"
                >
                  Play again
                </Button>
              </div>
            </div>
          ) : null}

          {!started && !won ? (
            <div className="absolute inset-0 grid place-items-center bg-black/60 backdrop-blur-[2px]">
              <Button
                onClick={() => startGame(size)}
                className="normal-case font-medium tracking-normal"
              >
                <Shuffle className="h-4 w-4" /> Shuffle and start
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Tap a tile next to the gap to slide it. Rebuild the picture in as few moves as you can.
        Upload your own photo and it becomes the puzzle. Every shuffle is generated by walking the
        gap around the board, so the position you get is always solvable.
      </p>
    </div>
  );
}
