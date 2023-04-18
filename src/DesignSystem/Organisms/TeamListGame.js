import React, {useState} from 'react';
import styled from 'styled-components';
import PlayerGame from '../Mollecules/PlayerGame';
import ChangePopup from '../Mollecules/ChangePopup';
import Score from '../Atoms/Score';
import Chrono from '../Mollecules/Chrono';
import Bouton from '../Atoms/Bouton';


const StyledPopup = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ContentPopup = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;


const TeamListGame = ({}) => {

    const equipe1 = [
        {
            "num": 21,
            "name": "Embiid",
            "jaune": 2, 
            "rouge": 0, 
            "score": 45
        },
        {
            "num": 15,
            "name": "Jokic",
            "jaune": 0, 
            "rouge": 0, 
            "score": 20
        },
        {
            "num": 34,
            "name": "Antetoukoumpo",
            "jaune": 0, 
            "rouge": 1, 
            "score": 32
        },
        {
            "num": 10,
            "name": "Fournier",
            "jaune": 0, 
            "rouge": 0, 
            "score": 17
        },
        {
            "num": 77,
            "name": "Doncic",
            "jaune": 0, 
            "rouge": 0, 
            "score": 23
        },
        {
            "num": 27,
            "name": "Gobert",
            "jaune": 0, 
            "rouge": 0, 
            "score": 0
        },
        {
            "num": 88,
            "name": "Batum",
            "jaune": 0, 
            "rouge": 0, 
            "score": 0
        }
    ]

    const equipe2 = [
        {
            "num": 12,
            "name": "Cousins",
            "jaune": 4, 
            "rouge": 0, 
            "score": 18
        },
        {
            "num": 5,
            "name": "Durant",
            "jaune": 1, 
            "rouge": 0, 
            "score": 35
        },
        {
            "num": 13,
            "name": "Derozan",
            "jaune": 0, 
            "rouge": 1, 
            "score": 27
        },
        {
            "num": 11,
            "name": "Thompson",
            "jaune": 0, 
            "rouge": 0, 
            "score": 19
        },
        {
            "num": 10,
            "name": "Irving",
            "jaune": 0, 
            "rouge": 0, 
            "score": 23
        },
        {
            "num": 45,
            "name": "Mitchell",
            "jaune": 0, 
            "rouge": 0, 
            "score": 0
        },
        {
            "num": 0,
            "name": "Westbrook",
            "jaune": 0, 
            "rouge": 0, 
            "score": 0
        }
    ]

    function addPoints(points){
        points+=1;
    };
    function totalPoints(team){
        let total =0;
        for (let i=0; i<team.length; i++) {
            total += team[i].score;
        }
        return total;
    };
    const [isOpen1, setIsOpen1] = useState(false);
    const openPopup1 = () => {
        setIsOpen1(true);
    };
    const closePopup1 = () => {
        setIsOpen1(false);
    };
    const [isOpen2, setIsOpen2] = useState(false);
    const openPopup2 = () => {
        setIsOpen2(true);
    };
    const closePopup2 = () => {
        setIsOpen2(false);
    };
    
    return (
        <div style={{ textAlign: 'center' }}>
      <div>
        <div style={{ display: 'inline-block' }}>
          <h1>MEUDON</h1>
        </div>
        <div style={{ display: 'inline-block', margin: '0 10px' }}>
          VS
        </div>
        <div style={{ display: 'inline-block' }}>
          <h2>RAMBOUILLET</h2>
        </div>
      </div>

      <center>
        <div className="my-class" style={{ textAlign: 'center' }}>
            <div className="myclass3" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="myclass3">
                    {equipe1.slice(0,5).map(joueur => 
                        <PlayerGame number={joueur.num} name={joueur.name} score={joueur.score} fonction={addPoints(joueur.score)} apparait={1}></PlayerGame>
                    )}
                    <Bouton text={'Remplacement'} onClick={openPopup1}/>
                    <div>{isOpen1 && (
                        <StyledPopup>
                            <ContentPopup>
                                <h2>Remplacement</h2>
                                {equipe1.slice(5,50).map(joueur => 
                                    <PlayerGame number={joueur.num} name={joueur.name} apparait={0}></PlayerGame>
                                )}
                                <Bouton onClick={closePopup1} text={'Fermer'}></Bouton>
                            </ContentPopup>
                        </StyledPopup>
                    )}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p><button className="class">Correction</button></p>
                    <p><button className="class">Buzzer</button></p>
                    <Chrono/>
                    <h2>4</h2>
                </div>
                <div className="myclass3" style={{ display: 'inline'}}>
                    {equipe2.slice(0,5).map(joueur => 
                        <PlayerGame number={joueur.num} name={joueur.name} score={joueur.score} fonction={addPoints(joueur.score)}></PlayerGame>
                    )}
                    <Bouton text={'Remplacement'} onClick={openPopup2}/>
                    <div>{isOpen2 && (
                        <StyledPopup>
                            <ContentPopup>
                                <h2>Remplacement</h2>
                                {equipe2.slice(5,50).map(joueur => 
                                    <PlayerGame number={joueur.num} name={joueur.name} apparait={0}></PlayerGame>
                                )}
                                <Bouton onClick={closePopup2} text={'Fermer'}></Bouton>
                            </ContentPopup>
                        </StyledPopup>
                    )}</div>
                </div>
            </div>
        </div>
      </center>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
        <p style={{ marginRight: '100px', fontSize: '50px' }}>
            <Score score={totalPoints(equipe1)}></Score>
        </p>
        <p style={{colore: 'yellow' ,fontSize: '50px'}}>SPOTIZER</p>
        <p style={{ marginLeft: '100px', fontSize: '50px' }}>
            <Score score={totalPoints(equipe2)}></Score>
        </p>
      </div>
    </div>
    );
};

export default TeamListGame;