import { _decorator, AudioClip, Component, Node, resources, tween } from "cc";
import { CreateRoom } from "./CreateRoom";
import { AudioMgr } from "./AudioMgr";
const { ccclass, property } = _decorator;

@ccclass("HallMgr")
export class HallMgr extends Component {
  @property(Node)
  createRoom: Node = null!;

  onLoad(): void {
    globalThis.sound = {
      bgm: null! as AudioClip,
      btnClickSound: null! as AudioClip,
    };

    resources.load("Audio/bg", AudioClip, (err, clip: AudioClip) => {
      if (err) {
        console.log(err);
        return;
      }

      globalThis.sound.bgm = clip;

      AudioMgr.inst.play(clip);
    });
    resources.load("Audio/btn", AudioClip, (err, clip: AudioClip) => {
      if (err) {
        console.log(err);
        return;
      }

      globalThis.sound.btnClickSound = clip;
    });
  }

  onCreateRoomClick() {
    AudioMgr.inst.playOneShot(globalThis.sound.btnClickSound);
    this.createRoom?.getComponent(CreateRoom)?.onOpenClick();
  }
}
