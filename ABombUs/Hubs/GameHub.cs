using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace ABombUs.Hubs
{
    public class GameHub : Hub
    {
        public Task NewGame()
        {
            Game.GenerateBoard();
            return BroadcastBoard(BoardState.Playing);
        }

        public Task Click(int c, int r)
        {
            switch(Game.Click(c, r))
            {
                case Game.ClickResult.Update:
                    return BroadcastBoard(BoardState.Playing);
                case Game.ClickResult.GameWon:
                    return BroadcastBoard(BoardState.Won);
                case Game.ClickResult.GameOver:
                    return BroadcastBoard(BoardState.Lost, (c, r));
                case Game.ClickResult.Ignore: 
                default: return Task.CompletedTask;
            }
        }

        public Task Flag(int c, int r)
        {
            switch(Game.Flag(c, r))
            {
                case Game.FlagResult.Update:
                    return BroadcastBoard(BoardState.Playing);
                case Game.FlagResult.Ignore:
                default: return Task.CompletedTask;
            }
        }

        private Task BroadcastBoard(BoardState state, (int x, int y)? explodedMine = null) => Clients.All.SendAsync("updateBoard", JsonConvert.SerializeObject(new BoardDto
        {
            Board = Game.board,
            State = state,
            ExplodedMine = explodedMine
        }));
    }
}
