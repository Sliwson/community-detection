using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;

namespace MutualFriends
{
    public static class GetFilmwebMutualFriends
    {
        private static string path = @"C:\Users\Admin\source\repos\Sliwson\community-detection\Data\Filmweb\allActorsRelation.csv";
        private static string writePath = @"C:\Users\Admin\source\repos\Sliwson\community-detection\Data\Filmweb\allActorsRelation2.csv";

        public static void ReadCommonRelation()
        {
            List<(int player1, int player2)> pairs = ReadAllPairs(out List<int> dates, out List<int> how_many);

            Dictionary<int, List<int>> ownRelations = new Dictionary<int, List<int>>();
            List<int> commonRelations = new List<int>();
           
            List<int> playersIds = pairs.Select(x => x.player1).ToList();
            playersIds.AddRange(pairs.Select(x => x.player2).ToList());
            playersIds = playersIds.Distinct().ToList();

            foreach(var id in playersIds)
            {
                ownRelations.Add(id, new List<int>());
            }

            foreach (var pair in pairs)
            {
                ownRelations[pair.player1].Add(pair.player2);
                ownRelations[pair.player2].Add(pair.player1);
            }

            for (int i = 0; i < pairs.Count; i++)
            {
                var count = ownRelations[pairs[i].player1].Intersect(ownRelations[pairs[i].player2]).Count();
                commonRelations.Add(count);
            }

            var csv = new StringBuilder();
            int index = 0;

            string first_line = "first_number;second_number;date;how_many;friends";
            csv.AppendLine(first_line);

            foreach (var pair in pairs)
            {
                var newLine = string.Format("{0};{1};{2};{3};{4}", pair.player1, pair.player2, dates[index], how_many[index], commonRelations[index]);
                csv.AppendLine(newLine);

                index++;
            }

            File.WriteAllText(writePath, csv.ToString());
        }

        private static List<(int, int)> ReadAllPairs(out List<int> date, out List<int> how_many)
        {
            date = new List<int>();
            how_many = new List<int>();

            List<(int, int)> pairs = new List<(int, int)>();
            using (var reader = new StreamReader(path))
            {
                bool first_row = true;
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(';');

                    if (first_row)
                    {
                        first_row = false;
                        continue;
                    }

                    pairs.Add((int.Parse(values[0]), int.Parse(values[1])));

                    int dateToAdd;
                    try
                    {
                        dateToAdd = int.Parse(values[2]);
                    }
                    catch (Exception)
                    {
                        dateToAdd = date.Last();
                    }

                    date.Add(dateToAdd);
                    how_many.Add(int.Parse(values[3]));
                }
            }
            return pairs;
        }
    }
}
