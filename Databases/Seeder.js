/** @format */

const mongoose = require("mongoose");
const { default: dbConnect } = require("./Client");
const Club = require("./Models/Clubs");
const Match = require("./Models/Matchs");
const Player = require("./Models/Players");
import HandleRequest from "@/Utils/HandleRequest";

const Seeder = HandleRequest(async ({ body, id }) => {
  await dbConnect();

  // Créez deux clubs fictifs de basket
  const club1 = new Club({
    Name: "sportizer a",
    Sport: "Basketball",
    Logo: "https://media.discordapp.net/attachments/1055399563529302026/1107812501074223244/Regtx5_logo_basket_405b35e5-60f6-4524-98ee-44a307af8fed.png?width=1042&height=1042",
    Color: "blue",
  });
  await club1.save();

  const club2 = new Club({
    Name: "sportizer b",
    Sport: "Basketball",
    Logo: "https://cdn.discordapp.com/attachments/1055399563529302026/1107812618665738320/Regtx5_logo_basketball_34ffa24d-5a51-4e4d-9d8e-40d8d0a0596f.png",
    Color: "red",
  });
  await club2.save();

  // Créez plusieurs joueurs fictifs et assignez-les aux clubs
  const players = [
    { Name: "John Doe", Category: "Senior A", Numero: 1, idClub: club1._id },
    { Name: "Jane Smith", Category: "Senior A", Numero: 2, idClub: club1._id },
    { Name: "Michael Johnson", Category: "Senior A", Numero: 3, idClub: club1._id },
    { Name: "Emily Davis", Category: "U12", Numero: 4, idClub: club1._id },
    { Name: "David Wilson", Category: "Senior A", Numero: 5, idClub: club1._id },
    { Name: "Sarah Thompson", Category: "U12", Numero: 6, idClub: club1._id },
    { Name: "Daniel Brown", Category: "Senior A", Numero: 7, idClub: club1._id },
    { Name: "Olivia Taylor", Category: "U12", Numero: 8, idClub: club1._id },
    { Name: "Michael Jordan", Category: "Senior A", Numero: 9, idClub: club1._id },
    { Name: "LeBron James", Category: "U12", Numero: 10, idClub: club1._id },
    { Name: "Kobe Bryant", Category: "Senior A", Numero: 11, idClub: club1._id },
    { Name: "Shaquille O'Neal", Category: "U12", Numero: 12, idClub: club1._id },
    { Name: "Larry Bird", Category: "Senior A", Numero: 13, idClub: club1._id },
    { Name: "Karen Johnson", Category: "U12", Numero: 14, idClub: club1._id },
    { Name: "Kareem Abdul-Jabbar", Category: "Senior A", Numero: 15, idClub: club1._id },
    { Name: "Bill Russell", Category: "U12", Numero: 16, idClub: club1._id },
    { Name: "Stephen Curry", Category: "Senior A", Numero: 17, idClub: club2._id },
    { Name: "Kevin Durant", Category: "U12", Numero: 18, idClub: club2._id },
    { Name: "Klay Thompson", Category: "Senior A", Numero: 19, idClub: club2._id },
    { Name: "Draymond Green", Category: "U12", Numero: 20, idClub: club2._id },
    { Name: "Wilt Chamberlain", Category: "Senior A", Numero: 21, idClub: club2._id },
    { Name: "Jerry West", Category: "U12", Numero: 22, idClub: club2._id },
    { Name: "Shaquille O'Neal", Category: "Senior A", Numero: 23, idClub: club2._id },
    { Name: "Larry Bird", Category: "U12", Numero: 24, idClub: club2._id },
    { Name: "Magic Johnson", Category: "Senior A", Numero: 25, idClub: club2._id },
    { Name: "Kareem Abdul-Jabbar", Category: "U12", Numero: 26, idClub: club2._id },
    { Name: "Bill Russell", Category: "Senior A", Numero: 27, idClub: club2._id },
  ];

  const createdPlayers = await Player.insertMany(players);
  // Select 8 Senior A players for each team
  const seniorAHomeSidePlayers = createdPlayers
    .filter((player) => player.Category === "Senior A" && player.idClub.toString() === club1._id.toString())
    .slice(0, 8);
  const seniorAOutSidePlayers = createdPlayers
    .filter((player) => player.Category === "Senior A" && player.idClub.toString() === club2._id.toString())
    .slice(0, 8);

  // Create a match for the Senior A category
  const seniorAMatch = new Match({
    Sport: "Basketball",
    Category: "Senior A",
    Duration: 120,
    HomeSideClub: club1._id,
    OutSideClub: club2._id,
    HomeSidePlayers: seniorAHomeSidePlayers.map((player) => ({
      player: player._id,
      isSub: false,
      points: [
        { type: "2-Pointer", value: 2 }, // Fake points
        { type: "3-Pointer", value: 3 }, // Fake points
      ],
      faults: [
        { type: "Personal", value: 1 }, // Fake faults
      ],
    })),
    OutSidePlayers: seniorAOutSidePlayers.map((player) => ({
      player: player._id,
      isSub: false,
      points: [
        { type: "2-Pointer", value: 2 }, // Fake points
        { type: "3-Pointer", value: 3 }, // Fake points
      ],
      faults: [
        { type: "Personal", value: 2 }, // Fake faults
      ],
    })),
  });
  await seniorAMatch.save();

  // Select 8 U12 players for each team
  const u12HomeSidePlayers = createdPlayers
    .filter((player) => player.Category === "U12" && player.idClub.toString() === club1._id.toString())
    .slice(0, 8);
  const u12OutSidePlayers = createdPlayers
    .filter((player) => player.Category === "U12" && player.idClub.toString() === club2._id.toString())
    .slice(0, 8);

  // Create a match for the U12 category
  const u12Match = new Match({
    Sport: "Basketball",
    Category: "U12",
    Duration: 90,
    HomeSideClub: club1._id,
    OutSideClub: club2._id,
    HomeSidePlayers: seniorAHomeSidePlayers.map((player) => ({
      player: player._id,
      isSub: false,
      points: [
        { type: "2-Pointer", value: 2 }, // Fake points
        { type: "3-Pointer", value: 3 }, // Fake points
      ],
      faults: [
        { type: "Personal", value: 1 }, // Fake faults
      ],
    })),
    OutSidePlayers: seniorAOutSidePlayers.map((player) => ({
      player: player._id,
      isSub: false,
      points: [
        { type: "2-Pointer", value: 2 }, // Fake points
        { type: "3-Pointer", value: 3 }, // Fake points
      ],
      faults: [
        { type: "Personal", value: 2 }, // Fake faults
      ],
    })),
  });
  await u12Match.save();

  return "OKEY";
});

export { Seeder };
