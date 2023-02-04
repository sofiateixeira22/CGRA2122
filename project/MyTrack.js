import { CGFobject } from "../lib/CGF.js";
import { MyTrackSegment } from "./MyTrackSegment.js";
/**
 * MyTrack
 * @constructor
 * @param scene - Reference to MyScene object
 * @param list - Reference to list
 */
export class MyTrack extends CGFobject {
    constructor(scene) {
        super(scene);
        this.list = [
            [6, 0, "simple"],
            [16, 0, "station"],  
            [22, 8, "simple"],
            [16, 16, "station"],
            [6, 16, "simple"],
            [0, 8, "station"]
        ];
        this.listTrackSeq = new Array();
        this.initBuffers();
    }
    
    initBuffers() {
        for(let i = 0; i < this.list.length; i++) {
            if((i+1)%this.list.length == 0) {
                var p0 = {x: this.list[i][0], z: this.list[i][1]};
                var p1 = {x: this.list[0][0], z: this.list[0][1]};
            } else {
                var p0 = {x: this.list[i][0], z: this.list[i][1]};
                var p1 = {x: this.list[i+1][0], z: this.list[i+1][1]};
            }
            this.myTrackSeq = new MyTrackSegment(this.scene, p0, p1);
            this.listTrackSeq[i] = this.myTrackSeq;
        }
    }

    display() {
        for(let i = 0; i < this.listTrackSeq.length; i++)
            this.listTrackSeq[i].display();
    }
}