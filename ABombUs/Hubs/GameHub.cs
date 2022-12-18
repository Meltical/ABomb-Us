using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ABombUs.Hubs
{
    public class GameHub : Hub
    {
        public Task NewGame()
        {
            Game.GenerateBoard();
            return BroadcastBoard();
        }

        public Task Click(int c, int r)
        {
            switch(Game.Click(c, r))
            {
                case Game.ClickResult.Update:
                    return BroadcastBoard();
                case Game.ClickResult.GameWon:
                    return BroadcastGameWon();
                case Game.ClickResult.GameOver:
                    return BroadcastGameOver();
                case Game.ClickResult.Ignore: 
                default: return Task.CompletedTask;
            }
        }

        public Task Flag(int c, int r)
        {
            switch(Game.Flag(c, r))
            {
                case Game.FlagResult.Update:
                    return BroadcastBoard();
                case Game.FlagResult.Ignore:
                default: return Task.CompletedTask;
            }
        }

        private Task BroadcastBoard() => Clients.All.SendAsync("update", JsonConvert.SerializeObject(Game.board));
        private Task BroadcastGameOver() => Clients.All.SendAsync("gameover", JsonConvert.SerializeObject(Game.board));
        private Task BroadcastGameWon() => Clients.All.SendAsync("gamewon", JsonConvert.SerializeObject(Game.board));
    }
}
