using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

public class BoardDto
{
    [JsonProperty("board")]
    public (int Value, bool Visible, bool Flagged)[,] Board { get; set; }

    [JsonProperty("state")]
    public BoardState State { get; set; }

    [JsonProperty("exploded_mines")]
    public List<(int x, int y)> ExplodedMines { get; set; }

    [JsonProperty("wrong_mines")]
    public List<(int x, int y)> WrongMines { get; set; }
}

[JsonConverter(typeof(StringEnumConverter))]
public enum BoardState
{
    Playing,
    Lost,
    Won
}