import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audioContext = new AudioContext();
  private buffers: { [key: string]: AudioBuffer } = {};
  private sources: { [key: string]: AudioBufferSourceNode | null} = {};

  constructor() {
    this.loadSounds('piano', ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']);
    //this.loadSounds('spells', ['fire', 'earth', 'water', 'air']);
  }

  loadSounds(category: string, notes: string[]) {
    notes.forEach(note => {
      const path = `assets/sounds/${category}/${note}.mp3`;
      fetch(path)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          this.buffers[note] = audioBuffer;
        })
        .catch(error => console.error(`Error loading ${note} from ${path}:`, error));
    });
  }

  playNote(note: string) {
    // Stop the current note if it's playing
    if (this.sources[note]) {
      this.sources[note]?.stop();
      this.sources[note]?.disconnect();
    }

    const buffer = this.buffers[note];
    if(!buffer){
      console.error(`No buffer found for note: ${note}`);
      return;
    }

    // Create a new source for the note
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start(0);

    // Replace the old source with the new one
    this.sources[note] = source;

    // When the note stops, disconnect the source
    source.onended = () => {
      source.disconnect();
      this.sources[note] = null;
    };
  }
}
