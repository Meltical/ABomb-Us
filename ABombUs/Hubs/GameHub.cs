using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace ABombUs.Hubs
{
    public class GameHub : Hub
    {
        public Task MouseMove(int x, int y, string color)
        {
            return Clients.Others.SendAsync("mouseMove", Context.ConnectionId, x, y, color);
        }

        public Task GetBoard()
        {
            return RespondBoard();
        }

        public Task NewGame()
        {
            Game.SetEmptyBoard();
            return BroadcastBoard();
        }

        public Task StartGame(int c, int r)
        {
            Game.GenerateBoard(c, r);
            return Click(c, r);
        }

        public Task Click(int c, int r)
        {
            if (Game.State == BoardState.Lost || Game.State == BoardState.Won)
            {
                return Task.CompletedTask;
            }

            var click = Game.Click(c, r);
            return BroadcastBoard(click.ExplodedMines, click.WrongMines);
        }

        public Task Flag(int c, int r)
        {
            if (Game.State == BoardState.Lost || Game.State == BoardState.Won)
            {
                return Task.CompletedTask;
            }

            switch (Game.Flag(c, r))
            {
                case Game.SignalState.Update:
                    return BroadcastBoard();
                case Game.SignalState.Ignore:
                default: return Task.CompletedTask;
            }
        }

        private Task BroadcastBoard(List<(int x, int y)> explodedMines = null, List<(int x, int y)> wrongMines = null)
        {
            return Clients.All.SendAsync("updateBoard", JsonConvert.SerializeObject(new BoardDto
            {
                Board = Game.Board,
                State = Game.State,
                ExplodedMines = explodedMines,
                WrongMines = wrongMines,
            }));
        }

        private Task RespondBoard(List<(int x, int y)> explodedMines = null, List<(int x, int y)> wrongMines = null)
        {
            return Clients.Caller.SendAsync("updateBoard", JsonConvert.SerializeObject(new BoardDto
            {
                Board = Game.Board,
                State = Game.State,
                ExplodedMines = explodedMines,
                WrongMines = wrongMines,
            }));
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            Clients.Others.SendAsync("disconnect", Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
