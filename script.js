const notes = ['g#3','b3','c#4','d#4','f#4','g#4','b4','c#5','d#5','f#5','g#5','b5','c#6','d#6','f#6','g#6'];
const notes2 = ['g#3','b3','c#4','d#4','f#4','g#4','b4','c#5','d#5','f#5','g#5','b5','c#6','d#6','f#6','g#6'];
const sampleMusic = ["d#6","b4","f#6","g#4","","d#4","b3","d#6","d#6","b3","","b5","d#5","","g#5",""];
const sampleChords = ['','','','','','c#6','','','g#3','','g#6','','','','',''];
var rhthym = 0;
var flipper = true;
var masterVolume = 1;
var genMusic = [];
var genMusic2 = [];
const pingPong = new Tone.PingPongDelay("4n", 0.2).toDestination();
const reverb = new Tone.Reverb({
    "decay" : 15
}).toDestination();
const reverb2 = new Tone.Reverb().toDestination();
const filter = new Tone.Filter(400, 'highpass');
const filter2 = new Tone.Filter(800, 'lowpass');
const feedbackDelay = new Tone.FeedbackDelay(0.125, 0.25).toDestination();
const compressor = new Tone.Compressor({ 
    ratio : 2 ,
    threshold : -13 ,
    release : 0.05 ,
    attack : 0.002 ,
    knee : 24
});
const chorus = new Tone.Chorus().toDestination().start();

const synth = new Tone.FMSynth({});
const bassSynth = new Tone.Synth().toDestination();
Tone.Master.volume.value = masterVolume;
synth.chain(filter, filter2, chorus, reverb, reverb2, compressor,pingPong, feedbackDelay, Tone.Destination);
var now;
var isPlaying = false;
loop = new Tone.Loop((time) =>{
    if(flipper == true){
        if(sampleMusic[rhthym%16]!=''){
            synth.triggerAttackRelease(sampleMusic[rhthym%16],'16n',time);
            if(sampleChords[rhthym%16]!=''){
                synth.triggerAttackRelease(sampleChords[rhthym%16],'16n',time+0.01);
            }
        }
    }
    else{
        if(sampleChords[rhthym%16]!=''){
            synth.triggerAttackRelease(sampleChords[rhthym%16],'16n',time);
        }
    }   
    rhthym++;
    if(rhthym>16){
        flipper = !flipper;
        rhthym =0;
        synth.triggerAttackRelease('d#1','1n',time);
    }
}, "2n");


// function loopStep(time){
    
// }

for(let i = 0; i < 16; i++){
    var randomNum = Math.floor(Math.random()*35);
    var randomNum2 = Math.floor(Math.random()*60);
    if(randomNum > 15){
        genMusic[i] = '';
    }
    else{
        let note = notes[randomNum];
        genMusic[i] = note;
    }

    if(randomNum2 > 15){
        genMusic2[i] = '';
    }
    else{
        let note = notes[randomNum2];
        genMusic2[i] = note;
    }
}

console.log(genMusic);
console.log(genMusic2);

window.addEventListener('keydown',function(e){
    // synth.triggerAttackRelease("C4",0.5);
    if(!isPlaying){
        loop.start();
        Tone.Transport.start();
        isPlaying = !isPlaying;
        // for(let i =0; i<16;i++){
            //synth.triggerAttack(genMusic[2],'16n');
        // }
    }
});

window.addEventListener('keyup',function(e){
    //synth.triggerRelease();
    //isPlaying = false;
});



