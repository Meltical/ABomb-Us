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
		private static IEnumerable<(int Row, int Column)> AdjacentTiles(int column, int row)
		{
			//    A B C
			//    D + E
			//    F G H

			/* A */
			if (row > 0 && column > 0) yield return (row - 1, column - 1);
			/* B */
			if (row > 0) yield return (row - 1, column);
			/* C */
			if (row > 0 && column < Width - 1) yield return (row - 1, column + 1);
			/* D */
			if (column > 0) yield return (row, column - 1);
			/* E */
			if (column < Width - 1) yield return (row, column + 1);
			/* F */
			if (row < Height - 1 && column > 0) yield return (row + 1, column - 1);
			/* G */
			if (row < Height - 1) yield return (row + 1, column);
			/* H */
			if (row < Height - 1 && column < Width - 1) yield return (row + 1, column + 1);
		}
		public static void GenerateBoard()
		{
			board = new (int Value, bool Visible, bool Flagged)[Width, Height];
			var coordinates = new List<(int Row, int Column)>();
			for (int column = 0; column < Width; column++)
			{
				for (int row = 0; row < Height; row++)
				{
					coordinates.Add((column, row));
				}
			}
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
				foreach (var (r, c) in AdjacentTiles(column, row))
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
		public static ClickResult Click(int column, int row)
        {
			if (!board[column, row].Flagged)
			{
				if(!board[column, row].Visible)
                {
					if (board[column, row].Value == Mine)
					{
						for (int c = 0; c < Width; c++)
						{
							for (int r = 0; r < Height; r++)
							{
								board[c, r].Visible = true;
							}
						}
						return ClickResult.GameOver;
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
						return ClickResult.GameWon;
					}
				}
                else
                {
					var adjacentTiles = AdjacentTiles(column, row);
					if(adjacentTiles.Count(x => board[x.Column, x.Row].Flagged) == board[column, row].Value)
                    {
						foreach (var (r, c) in adjacentTiles)
						{
							if (!board[c, r].Flagged && !board[c, r].Visible)
							{
								Click(c, r);
							}
						}
					}
				}
				return ClickResult.Update;
			}
			return ClickResult.Ignore;
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
