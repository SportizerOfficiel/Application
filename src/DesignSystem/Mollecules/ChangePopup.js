import React from 'react';
import Popup from 'reactjs-popup';
import Bouton from '@/DesignSystem/Atoms/Bouton';
import 'reactjs-popup/dist/index.css';

const ChangePopup = ({}) => {
    return (
        <div>
            <Popup trigger=
                {<Bouton text="+ Remplacements"></Bouton>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <h3 style={{textAlign: 'center'}}>
                                + Remplacements
                            </h3>
                            <h4>Sur le terrain</h4>
                            <h4>Sur le banc</h4>
                            <div>
                                <Bouton text="Valider l'organisation de l'équipe" onClick=
                                    {() => close()}>
                                </Bouton>
                            </div>
                        </div>
                    )
                }
            </Popup>
        </div>
    );
};

export default ChangePopup;