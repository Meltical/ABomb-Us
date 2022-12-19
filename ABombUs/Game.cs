using System;
using System.Collections.Generic;
using System.Linq;

namespace ABombUs
{
    public static class Game
    {
        public static BoardState State;
        public static (int Value, bool Visible, bool Flagged)[,] Board;
        private const int Mine = -1;
        private const int Width = 30;
        private const int Height = 15;
        private const int MineCount = 99;
        private static Random Random = new Random();

        private static IEnumerable<(int Column, int Row)> AdjacentTiles(int column, int row)
        {
            //    A B C
            //    D + E
            //    F G H

            /* A */
            if (row > 0 && column > 0) yield return (column - 1, row - 1);
            /* B */
            if (row > 0) yield return (column, row - 1);
            /* C */
            if (row > 0 && column < Width - 1) yield return (column + 1, row - 1);
            /* D */
            if (column > 0) yield return (column - 1, row);
            /* E */
            if (column < Width - 1) yield return (column + 1, row);
            /* F */
            if (row < Height - 1 && column > 0) yield return (column - 1, row + 1);
            /* G */
            if (row < Height - 1) yield return (column, row + 1);
            /* H */
            if (row < Height - 1 && column < Width - 1) yield return (column + 1, row + 1);
        }

        public static void SetEmptyBoard()
        {
            Board = new (int Value, bool Visible, bool Flagged)[Width, Height];
            State = BoardState.Empty;
        }

        public static void GenerateBoard(int initialColumn, int initialRow)
        {
            Board = new (int Value, bool Visible, bool Flagged)[Width, Height];
            var coordinates = new List<(int Column, int Row)>();
            for (int column = 0; column < Width; column++)
            {
                for (int row = 0; row < Height; row++)
                {
                    coordinates.Add((column, row));
                }
            }
            var initialTiles = AdjacentTiles(initialColumn, initialRow);
            initialTiles = initialTiles.Append((initialColumn, initialRow));
            coordinates.RemoveAll(x => initialTiles.Contains(x));
            for (int i = 0; i < MineCount; i++)
            {
                int randomIndex = Random.Next(0, coordinates.Count);
                (int column, int row) = coordinates[randomIndex];
                coordinates.RemoveAt(randomIndex);
                Board[column, row] = (Mine, false, false);
                foreach (var tile in AdjacentTiles(column, row))
                {
                    if (Board[tile.Column, tile.Row].Value != Mine)
                    {
                        Board[tile.Column, tile.Row].Value++;
                    }
                }
            }
        }

        private static void Reveal(int column, int row)
        {
            Board[column, row].Visible = true;
            if (Board[column, row].Value == 0)
            {
                foreach (var (c, r) in AdjacentTiles(column, row))
                {
                    if (!Board[c, r].Visible)
                    {
                        Reveal(c, r);
                    }
                }
            }
        }

        public static (List<(int x, int y)> ExplodedMines, List<(int x, int y)> WrongMines) Click(int column, int row)
        {
            if (!Board[column, row].Flagged)
            {
                if (!Board[column, row].Visible)
                {
                    return HandleClick(column, row);
                }
                else
                {
                    //TODO: Use SignalState to Ignore useless Chord replies
                    return HandleChord(column, row);
                }
            }

            return (null, null);
        }

        private static (List<(int x, int y)> ExplodedMines, List<(int x, int y)> WrongMines) HandleChord(int column, int row)
        {
            var adjacentTiles = AdjacentTiles(column, row);
            if (adjacentTiles.Count(x => Board[x.Column, x.Row].Flagged) >= Board[column, row].Value)
            {
                foreach (var (c, r) in adjacentTiles)
                {
                    if (!Board[c, r].Flagged && !Board[c, r].Visible)
                    {
                        var clickResponse = Click(c, r);
                        if (State == BoardState.Lost)
                        {

                            return (GetExplodedMines(adjacentTiles), GetWrongMines());
                        }
                    }
                }
            }

            return (null, null);
        }

        private static List<(int x, int y)> GetExplodedMines(IEnumerable<(int, int)> adjacentTiles)
        {
            var explodedMines = new List<(int x, int y)>();
            var wrongMines = new List<(int x, int y)>();
            foreach (var (x, y) in adjacentTiles)
            {
                var cell = Board[x, y];
                if (cell.Value == Mine && !cell.Flagged)
                {
                    explodedMines.Add((x, y));
                }
                else
                {
                    Board[x, y].Visible = true;
                }
            }
            return explodedMines;
        }

        private static List<(int x, int y)> GetWrongMines()
        {
            var wrongMines = new List<(int x, int y)>();
            for (int c = 0; c < Width; c++)
            {
                for (int r = 0; r < Height; r++)
                {
                    if (Board[c, r].Value != Mine && Board[c, r].Flagged)
                    {
                        wrongMines.Add((c, r));
                    }
                }
            }

            return wrongMines;
        }

        private static (List<(int x, int y)> ExplodedMines, List<(int x, int y)> WrongMines) HandleClick(int column, int row)
        {
            if (Board[column, row].Value == Mine)
            {
                for (int c = 0; c < Width; c++)
                {
                    for (int r = 0; r < Height; r++)
                    {
                        if (Board[c, r].Value == Mine)
                        {
                            Board[c, r].Visible = true;
                        }
                    }
                }
                State = BoardState.Lost;
                return (new List<(int x, int y)>() { (column, row) }, GetWrongMines());
            }
            else if (Board[column, row].Value == 0)
            {
                Reveal(column, row);
            }
            else
            {
                Board[column, row].Visible = true;
            }

            int visibleCount = 0;
            for (int c = 0; c < Width; c++)
            {
                for (int r = 0; r < Height; r++)
                {
                    if (Board[c, r].Visible)
                    {
                        visibleCount++;
                    }
                }
            }

            if (visibleCount == Width * Height - MineCount)
            {
                State = BoardState.Won;
            }

            State = BoardState.Playing;
            return (null, null);
        }

        public static SignalState Flag(int column, int row)
        {
            if (!Board[column, row].Visible)
            {
                Board[column, row].Flagged = !Board[column, row].Flagged;
                return SignalState.Update;
            }

            return SignalState.Ignore;
        }

        public enum SignalState
        {
            Update,
            Ignore
        }
    }
}
