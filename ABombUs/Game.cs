using System;
using System.Collections.Generic;
using System.Linq;

namespace ABombUs
{
    public static class Game
    {
        public static (int Value, bool Visible, bool Flagged)[,] board;
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
        public static void GenerateBoard(int initialColumn, int initialRow)
        {
            board = new (int Value, bool Visible, bool Flagged)[Width, Height];
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
                board[column, row] = (Mine, false, false);
                foreach (var tile in AdjacentTiles(column, row))
                {
                    if (board[tile.Column, tile.Row].Value != Mine)
                    {
                        board[tile.Column, tile.Row].Value++;
                    }
                }
            }
        }
        private static void Reveal(int column, int row)
        {
            board[column, row].Visible = true;
            if (board[column, row].Value == 0)
            {
                foreach (var (c, r) in AdjacentTiles(column, row))
                {
                    if (!board[c, r].Visible)
                    {
                        Reveal(c, r);
                    }
                }
            }
        }
        public enum ClickResult
        {
            GameOver,
            Update,
            GameWon,
            Ignore
        }
        public static (ClickResult State, List<(int x, int y)> ExplodedMines, List<(int x, int y)> WrongMines) Click(int column, int row)
        {
            if (!board[column, row].Flagged)
            {
                if (!board[column, row].Visible)
                {
                    if (board[column, row].Value == Mine)
                    {
                        for (int c = 0; c < Width; c++)
                        {
                            for (int r = 0; r < Height; r++)
                            {
                                if (board[c, r].Value == Mine)
                                {
                                    board[c, r].Visible = true;
                                }
                            }
                        }
                        return (ClickResult.GameOver, new List<(int x, int y)>() { (column, row) }, null);
                    }
                    else if (board[column, row].Value == 0)
                    {
                        Reveal(column, row);
                    }
                    else
                    {
                        board[column, row].Visible = true;
                    }

                    int visibleCount = 0;
                    for (int c = 0; c < Width; c++)
                    {
                        for (int r = 0; r < Height; r++)
                        {
                            if (board[c, r].Visible)
                            {
                                visibleCount++;
                            }
                        }
                    }

                    if (visibleCount == Width * Height - MineCount)
                    {
                        return (ClickResult.GameWon, null, null);
                    }
                }
                else
                {
                    var adjacentTiles = AdjacentTiles(column, row);
                    if (adjacentTiles.Count(x => board[x.Column, x.Row].Flagged) >= board[column, row].Value)
                    {
                        foreach (var (c, r) in adjacentTiles)
                        {
                            if (!board[c, r].Flagged && !board[c, r].Visible)
                            {
                                var clickResponse = Click(c, r);
                                if (clickResponse.State == ClickResult.GameOver)
                                {
                                    var explodedMines = new List<(int x, int y)>();
                                    var wrongMines = new List<(int x, int y)>();
                                    foreach (var (x, y) in adjacentTiles)
                                    {
                                        var cell = board[x, y];
                                        if (cell.Value == Mine && !cell.Flagged)
                                        {
                                            explodedMines.Add((x, y));
                                        }
                                        else if (cell.Value != Mine && cell.Flagged)
                                        {
                                            wrongMines.Add((x, y));
                                        }
                                        else
                                        {
                                            board[x, y].Visible = true;
                                        }
                                    }
                                    return (ClickResult.GameOver, explodedMines, wrongMines);
                                }
                            }
                        }
                    }
                }
                return (ClickResult.Update, null, null);
            }
            return (ClickResult.Ignore, null, null);
        }
        public enum FlagResult
        {
            Update,
            Ignore
        }
        public static FlagResult Flag(int column, int row)
        {
            if (!board[column, row].Visible)
            {
                board[column, row].Flagged = !board[column, row].Flagged;
                return FlagResult.Update;
            }

            return FlagResult.Ignore;
        }
    }
}
