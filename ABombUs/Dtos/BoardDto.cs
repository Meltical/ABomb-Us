using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

public class BoardDto
{
    [JsonProperty("board")]
    public (int Value, bool Visible, bool Flagged)[,] Board { get; set; }

    [JsonProperty("state")]
    public BoardState State { get; set; }

    [JsonProperty("exploded_mine")]
    public (int x, int y)? ExplodedMine { get; set; }
}

[JsonConverter(typeof(StringEnumConverter))]
public enum BoardState
{
    Playing,
    Lost,
    Won
}