import React, {useState} from 'react';
import styled from 'styled-components';
import PlayerGame from '../Mollecules/PlayerGame';
import ChangePopup from '../Mollecules/ChangePopup';
import Score from '../Atoms/Score';
import Chrono from '../Mollecules/Chrono';
import equipe1 from '../../../public/equipe1'
import equipe2 from '../../../public/equipe2'
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

    function addPoints(points){
        points+=1;
    }
    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        setIsOpen(true);
    };
    const closePopup = () => {
        setIsOpen(false);
    };

    let total =0;
    for (let i=0; i<equipe1.length; i++) {
        total += equipe1[i].score;
    }

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
                    <Bouton text={'Remplacement'} onClick={openPopup}/>
                    {isOpen && (
                        <StyledPopup>
                            <ContentPopup>
                                <h2>Remplacement</h2>
                                {equipe1.slice(5,50).map(joueur => 
                                    <PlayerGame number={joueur.num} name={joueur.name} apparait={0}></PlayerGame>
                                )}
                                <button onClick={closePopup}>Fermer</button>
                            </ContentPopup>
                        </StyledPopup>
                    )}
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
                    <Bouton text={'Remplacement'}/>
                </div>
            </div>
        </div>
      </center>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
        <p style={{ marginRight: '100px', fontSize: '50px' }}>
            <Score score={total}></Score>
        </p>
        <p style={{colore: 'yellow' ,fontSize: '50px'}}>SPOTIZER</p>
        <p style={{ marginLeft: '100px', fontSize: '50px' }}>74</p>
      </div>
    </div>
    );
};

export default TeamListGame;