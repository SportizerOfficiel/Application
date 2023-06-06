/** @format */

import Ballon from "./DesignSystem/Atoms/Ballon";
import CartonJaune from "./DesignSystem/Atoms/CartonJaune";
import CartonRouge from "./DesignSystem/Atoms/CartonRouge";
import Fautes from "./DesignSystem/Atoms/Fautes";
import FreeThrow from "./DesignSystem/Atoms/FreeThrow";
import ThreePointer from "./DesignSystem/Atoms/ThreePointer";
import TwoPointer from "./DesignSystem/Atoms/TwoPointer";

const SportConfig = {
  Football: {
    Display:false,
    Img: "https://img.lemde.fr/2022/11/26/0/0/2340/1560/664/0/75/0/c9e9566_8830d2670b8b49fdbcf01579d46a0655-0-f682a76166f84e52b3f6a1bb547458eb.jpg",
    PlayerList: {
      PlayerPerTeam: 11,
      SubPlayerPerTeam: 11,
    },
    PlayerSettings: {
      maxFaults: 2,
      Fautes: {
        CartonRouge: { value: 2, icon: CartonRouge },
        CartonJaune: { value: 1, icon: CartonJaune },
      },
      Goals: {
        Goal: { value: 1, icon: Ballon },
      },
    },
    Details: {
      Category: {
        description: 'Catégorie de jeu (U15, U17, U20, Senior)',
        value: ["U15", "U17", "U20", "Senior"],
        display: true,
      },
      Division: {
        description: 'Division de jeu (Amateur, Professional)',
        value: ["Amateur", "Professional"],
        display: true,
      },
      PeriodDuration: {
        description: 'Durée de chaque période en minutes',
        value: 45,
        display: true,
      },
      PeriodsBeforeBreak: {
        description: 'Nombre de périodes avant la pause',
        value: 2,
        display: true,
      },
      BreakDuration: {
        description: 'Durée de la pause en minutes',
        value: 15,
        display: true,
      },
      PeriodsBeforeOvertime: {
        description: 'Nombre de périodes avant la prolongation',
        value: null,
        display: false,
      },
      OvertimeDuration: {
        description: 'Durée de chaque période de prolongation',
        value: null,
        display: false,
      },
      MaxOvertimes: {
        description: 'Nombre maximum de prolongations',
        value: null,
        display: false,
      },
    }
  },
  Basketball: {
    Display:true,
    Img: "https://media.discordapp.net/attachments/1055399563529302026/1107019541093031996/Regtx5_basketball_dunk_d4dc96c5-3adb-44e2-bfc0-600b94e87144.png?width=1042&height=1042",
    PlayerList: {
      PlayerPerTeam: 5,
      SubPlayerPerTeam: 5,
    },
    PlayerSettings: {
      maxFaults: 5,
      cumulate: true,
      Fautes: {
        PersonalFoul: { value: 1, icon: Fautes },
      },
      Goals: {
        TwoPointer: { value: 2, icon: TwoPointer },
        ThreePointer: { value: 3, icon: ThreePointer },
        FreeThrow: { value: 1, icon: FreeThrow },
      },
    },
    Details: {
      Category: {
        description: 'Catégorie de jeu (Junior, Senior)',
        value: ["Junior", "Senior"],
        display: true,
      },
      Division: {
        description: 'Division de jeu (Amateur, Professional)',
        value: ["Amateur", "Professional"],
        display: true,
      },
      PeriodDuration: {value: 10, description: "Durée de chaque quart-temps en minutes", display: true}, 
      PeriodsBeforeBreak: {value: 1, description: "Nombre de quart-temps avant la pause de mi-temps", display: true}, 
      BreakDuration: {value: 15, description: "Durée de la pause de mi-temps en minutes", display: true}, 
      InterPeriodBreakDuration: {value: 10, description: "Durée de la pause entre les quart-temps en minutes", display: true}, 
      
      PeriodsBeforeOvertime: {value: 3, description: "Nombre de quart-temps avant une éventuelle prolongation", display: true},  
      MaxOvertimePeriods: {value: 1, description: "Nombre de périodes de prolongation", display: true}, 
      OvertimeDuration: {value: 5, description: "Durée de chaque période de prolongation en minutes", display: true},
      OvertimeBreakDuration: {value: 5, description: "Durée de chaque période de prolongation en minutes", display: true},  
    
      TimeOutsPerTeam: {value: 5, description: "Nombre de temps morts que chaque équipe peut demander pendant un match", display: true},
      TimeOutsDuration: {value: 5, description: "Nombre de temps morts que chaque équipe peut demander pendant un match", display: true}
    }
  },
  Handball: {
    Display:false,
    Img: "https://pyrene-hand.fr/wp-content/uploads/sites/287/2019/04/6-2.jpg",
    PlayerList: {
      PlayerPerTeam: 7,
      SubPlayerPerTeam: 7,
    },
    PlayerSettings: {
      maxFaults: 0,
      Fautes: {},
      Goals: {
        Goal: 1,
      },
    },
    Details: {
      Category: ["Junior", "Senior"],
      Division: ["Amateur", "Professional"],
      GameDuration: 60, // Durée de la partie en minutes
      HalfTimeDuration: 30, // Durée de la mi-temps en minutes
      HalfTimeBreakTime: 10, // Durée de la pause à la mi-temps en minutes
    },
  },
  Volleyball: {
    Display:false,
    Img: "https://dicodusport.fr/wp-content/uploads/2016/03/Definition-Volley-ball.png",
    PlayerList: {
      PlayerPerTeam: 6,
      SubPlayerPerTeam: 6,
    },
    PlayerSettings: {
      maxFaults: 0,
      Fautes: {},
      Goals: {
        Point: 1,
      },
    },
    Details: {
      Category: ["Junior", "Senior"],
      Division: ["Amateur", "Professional"],
      GameDuration: 60, // Durée de la partie en minutes
    },
  },
  Badminton: {
    Display:false,
    Img: "https://dicodusport.fr/wp-content/uploads/2016/01/Definition-badminton.png",
    PlayerList: {
      PlayerPerTeam: 1,
      SubPlayerPerTeam: 1,
    },
    PlayerSettings: {
      maxFaults: 0,
      Fautes: {},
      Goals: {
        Point: 1,
      },
    },
    Details: {
      Category: ["Junior", "Senior"],
      Division: ["Amateur", "Professional"],
      SetsToWin: 2, // Nombre de sets nécessaires pour remporter un match
      GameDuration: 45, // Durée de la partie en minutes
    },
  },
  Tennis: {
    Display:false,
    Img: "https://www.lequipe.fr/_medias/img-photo-jpg/caroline-garcia-n-a-pas-reussi-a-peser-sur-le-match-interrompu-par-la-pluie-rob-prange-rob-prange-afp7/1500000001783957/0:0,1841:1227-828-552-75/99ee9",
    PlayerList: {
      PlayerPerTeam: 1,
      SubPlayerPerTeam: 1,
    },
    PlayerSettings: {
      maxFaults: 0,
      Fautes: {},
      Goals: {
        15: 1,
        30: 2,
        40: 3,
        Game: 4,
      },
    },
    Details: {
      Category: ["Junior", "Senior"],
      Division: ["Amateur", "Professional"],
      SetsToWin: 3, // Nombre de sets nécessaires pour remporter un match
      GameDuration: 180, // Durée de la partie en minutes
    },
  },
};

export default SportConfig;
