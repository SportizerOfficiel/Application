import React from 'react';
import { Howl } from 'howler';
import Bouton from '@/DesignSystem/Atoms/Bouton';

function BoutonBuzzer() {
    const audioFile = "../public/bball_buzzer.wav";

    const playSound = () => {
        const sound = new Howl({
            src: [audioFile]
        });
        sound.play();
    };
  
    return (
      <div>
        <Bouton text="Buzzer 🔊"></Bouton>
      </div>
    );
  }

export default BoutonBuzzer();