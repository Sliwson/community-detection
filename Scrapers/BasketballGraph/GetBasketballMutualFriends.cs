using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace BasketballGraph
{
    public static class GetBasketballMutualFriends
    {
        private static string path = @"C:\Users\Admin\Desktop\PlayersConnection.csv";
        private static string writePath = @"C:\Users\Admin\Desktop\CommonRelation.csv";
        private static int vertices_count = 4801;

        public static void ReadCommonRelation()
        {
            List<(int player1, int player2)> pairs = ReadAllPairs();

            List<int>[] ownRelations = new List<int>[vertices_count];
            List<(int, int)>[] commonRelation = new List<(int, int)>[vertices_count];
            for (int i = 0; i < vertices_count; i++)
            {
                ownRelations[i] = new List<int>();
                commonRelation[i] = new List<(int, int)>();
            }


            foreach (var pair in pairs)
            {
                ownRelations[pair.player1].Add(pair.player2);
                ownRelations[pair.player2].Add(pair.player1);
            }

            for (int i = 0; i < vertices_count; i++)
            {
                for (int j = 0; j < vertices_count; j++)
                {
                    if (!pairs.Contains((i, j)))
                        continue;

                    var count = ownRelations[i].Intersect(ownRelations[j]).Count();
                    if (count != 0)
                    {
                        commonRelation[i].Add((j, count));
                    }
                }
            }

            var csv = new StringBuilder();
            int index = 1;

            for (int i = 0; i < commonRelation.Count(); i++)
            {
                for (int j = 0; j < commonRelation[i].Count(); j++)
                {
                    var player1 = i.ToString();
                    var player2 = commonRelation[i][j].Item1.ToString();
                    var count = commonRelation[i][j].Item2.ToString();

                    var newLine = string.Format("{0};{1};{2};{3}", index, player1, player2, count);
                    csv.AppendLine(newLine);

                    index++;
                }
            }

            File.WriteAllText(writePath, csv.ToString());
        }

        private static List<(int, int)> ReadAllPairs()
        {
            List<(int, int)> pairs = new List<(int, int)>();
            using (var reader = new StreamReader(path))
            {
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(';');

                    pairs.Add((int.Parse(values[0]), int.Parse(values[1])));
                }
            }
            return pairs;
        }
    }
}
