const SportConfig = {
  Football: {
    Img: "https://img.lemde.fr/2022/11/26/0/0/2340/1560/664/0/75/0/c9e9566_8830d2670b8b49fdbcf01579d46a0655-0-f682a76166f84e52b3f6a1bb547458eb.jpg",
    PlayerList: {
      PlayerPerTeam: 11,
      SubPlayerPerTeam: 11
    },
    Details: {
      Category: ["U15", "U17", "U20", "Senior"],
      Division: ["Amateur", "Professional"],
      GameDuration: 90, // Durée de la partie en minutes
      HalfTimeDuration: 45, // Durée de la mi-temps en minutes
      HalfTimeBreakTime: 15 // Durée de la pause à la mi-temps en minutes
    }
  },
  Basketball: {
    Img: "https://media.discordapp.net/attachments/1055399563529302026/1107019541093031996/Regtx5_basketball_dunk_d4dc96c5-3adb-44e2-bfc0-600b94e87144.png?width=1042&height=1042",
    PlayerList: {
      PlayerPerTeam: 5,
      SubPlayerPerTeam: 5
    },
    Details: {
      Category: ["Junior", "Senior"],
      Division: ["Amateur", "Professional"],
      QuarterDuration: 10, // Durée de chaque quart-temps en minutes
      HalfTimeBreakTime: 15, // Durée de la pause à la mi-temps en minutes
      GameDuration: 40 // Durée de la partie en minutes
    }
  },
  Handball: {
    Img: "https://pyrene-hand.fr/wp-content/uploads/sites/287/2019/04/6-2.jpg",
    PlayerList: {
      PlayerPerTeam: 7,
      SubPlayerPerTeam: 7
    },
    Details: {
      Category: ["Junior", "Senior"],
      Division: ["Amateur", "Professional"],
      GameDuration: 60, // Durée de la partie en minutes
      HalfTimeDuration: 30, // Durée de la mi-temps en minutes
      HalfTimeBreakTime: 10 // Durée de la pause à la mi-temps en minutes
    }
  },
  Volleyball: {
    Img: "https://dicodusport.fr/wp-content/uploads/2016/03/Definition-Volley-ball.png",
    PlayerList: {
      PlayerPerTeam: 6,
      SubPlayerPerTeam: 6
    },
    Details: {
      Category: ["Junior", "Senior"],
      Division: ["Amateur", "Professional"],
      GameDuration: 60 // Durée de la partie en minutes
    }
  },
  Badminton: {
    Img: "https://dicodusport.fr/wp-content/uploads/2016/01/Definition-badminton.png",
    PlayerList: {
      PlayerPerTeam: 1,
      SubPlayerPerTeam: 1
    },
    Details: {
      Category: ["Junior", "Senior"],
      Division: ["Amateur", "Professional"],
      SetsToWin: 2, // Nombre de sets nécessaires pour remporter un match
      GameDuration: 45 // Durée de la partie en minutes
    }
  },
  Tennis: {
    Img: "https://www.lequipe.fr/_medias/img-photo-jpg/caroline-garcia-n-a-pas-reussi-a-peser-sur-le-match-interrompu-par-la-pluie-rob-prange-rob-prange-afp7/1500000001783957/0:0,1841:1227-828-552-75/99ee9",
    PlayerList: {
      PlayerPerTeam: 1,
      SubPlayerPerTeam: 1
    },
    Details: {
      Category: ["Junior", "Senior"],
      Division: ["Amateur", "Professional"],
      SetsToWin: 3, // Nombre de sets nécessaires pour remporter un match
      GameDuration: 180 // Durée de la partie en minutes
    }
  }
};



  
  export default SportConfig;
  