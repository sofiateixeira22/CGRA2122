import { CGFobject } from "../lib/CGF.js";
import { MyTrainModel } from "./MyTrainModel.js";
/**
 * MyAnimatedTrain
 * @constructor
 * @param scene - Reference to MyScene object
 * @param track - Reference to MyTrack object
 */

export class MyAnimatedTrain extends CGFobject {
    constructor(scene, trackList) {
        super(scene);
        this.trackList = trackList;
        this.speed = 0.1;

        this.trackPrev = 0;
        this.trackNext = 1;

        this.position = [this.trackList.listTrackSeq[this.trackPrev].p0.x, 0, this.trackList.listTrackSeq[this.trackPrev].p0.z];
        this.track = [this.trackList.listTrackSeq[this.trackPrev].p0.x, 0, this.trackList.listTrackSeq[this.trackPrev].p0.z];
        this.orientation = Math.atan2(this.trackList.listTrackSeq[this.trackNext].p0.x - this.trackList.listTrackSeq[this.trackPrev].p0.x, this.trackList.listTrackSeq[this.trackNext].p0.z - this.trackList.listTrackSeq[this.trackPrev].p0.z);
        this.trackDist = Math.sqrt(Math.pow((this.trackList.listTrackSeq[this.trackNext].p0.x - this.trackList.listTrackSeq[this.trackPrev].p0.x), 2) + Math.pow((this.trackList.listTrackSeq[this.trackNext].p0.z-this.trackList.listTrackSeq[this.trackPrev].p0.z), 2));
        
        this.lastT = 0;
        
        this.train = new MyTrainModel(this.scene);
    }

    update(t) {
        if(this.lastT == 0) {
            this.lastT = (t / 1000);
            let deltaT = (t / 1000) - this.lastT;
            let deltaP = [Math.sin(this.orientation) * deltaT * this.speed, 0, Math.cos(this.orientation) * deltaT * this.speed];
            this.position[0] = this.position[0] + deltaP[0];
            this.position[2] = this.position[2] + deltaP[2];
            return;
        }

        if(this.lastT != 0) {
            let deltaT = (t / 1000) - this.lastT;
            let deltaP = [Math.sin(this.orientation) * deltaT * this.speed, 0, Math.cos(this.orientation) * deltaT * this.speed];
            this.position[0] = this.position[0] + deltaP[0];
            this.position[2] = this.position[2] + deltaP[2];
            let distance = Math.sqrt(Math.pow((this.position[0] - this.track[0]), 2) + Math.pow((this.position[2]-this.track[2]), 2));

            if (distance >= this.trackDist) {
                this.trackPrev += 1;
                this.trackNext += 1;

                if (this.trackPrev > (this.trackList.listTrackSeq.length - 1)) {
                    this.trackPrev = 0;
                    this.trackNext = 1;
                }

                if (this.trackPrev == (this.trackList.listTrackSeq.length - 1)) this.trackNext = 0;

                this.track = [this.trackList.listTrackSeq[this.trackPrev].p0.x, 0, this.trackList.listTrackSeq[this.trackPrev].p0.z];
                this.orientation = Math.atan2(this.trackList.listTrackSeq[this.trackNext].p0.x - this.trackList.listTrackSeq[this.trackPrev].p0.x, this.trackList.listTrackSeq[this.trackNext].p0.z - this.trackList.listTrackSeq[this.trackPrev].p0.z);
                this.trackDist = Math.sqrt(Math.pow((this.trackList.listTrackSeq[this.trackNext].p0.x - this.trackList.listTrackSeq[this.trackPrev].p0.x), 2) + Math.pow((this.trackList.listTrackSeq[this.trackNext].p0.z-this.trackList.listTrackSeq[this.trackPrev].p0.z), 2));
            }
        }

        this.lastT = t / 1000;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(0.3, 0.3, 0.3);
        this.train.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.trackList.display();
        this.scene.popMatrix();

    }
}
