using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ABombUs.Hubs
{
    public class GameHub : Hub
    {
        public Task NewGame(int c, int r)
        {
            Game.GenerateBoard(c, r);
            return Click(c, r);
        }

        public Task Click(int c, int r)
        {
            var click = Game.Click(c, r);
            switch (click.State)
            {
                case Game.ClickResult.Update:
                    return BroadcastBoard(BoardState.Playing);
                case Game.ClickResult.GameWon:
                    return BroadcastBoard(BoardState.Won);
                case Game.ClickResult.GameOver:
                    return BroadcastBoard(BoardState.Lost, click.ExplodedMines, click.WrongMines);
                case Game.ClickResult.Ignore:
                default: return Task.CompletedTask;
            }
        }

        public Task Flag(int c, int r)
        {
            switch (Game.Flag(c, r))
            {
                case Game.FlagResult.Update:
                    return BroadcastBoard(BoardState.Playing);
                case Game.FlagResult.Ignore:
                default: return Task.CompletedTask;
            }
        }

        private Task BroadcastBoard(BoardState state, List<(int x, int y)> explodedMines = null, List<(int x, int y)> wrongMines = null) 
        {
            return Clients.All.SendAsync("updateBoard", JsonConvert.SerializeObject(new BoardDto
            {
                Board = Game.board,
                State = state,
                ExplodedMines = explodedMines,
                WrongMines = wrongMines,
            }));
        }
    }
}
