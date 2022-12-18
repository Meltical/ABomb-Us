using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace ABombUs
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Game.GenerateBoard();
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
