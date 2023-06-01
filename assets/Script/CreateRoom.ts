import { _decorator, Component, Animation, director } from "cc";
import { AudioMgr } from "./AudioMgr";
const { ccclass, property } = _decorator;

@ccclass("CreateRoom")
export class CreateRoom extends Component {
  @property(Animation)
  BodyAnim: Animation = null;

  onCloseClick() {
    AudioMgr.inst.playOneShot(globalThis.sound.btnClickSound);
    this.node.active = false;
    this.BodyAnim?.play();
  }

  onOpenClick() {
    AudioMgr.inst.playOneShot(globalThis.sound.btnClickSound);
    this.node.active = true;
    this.BodyAnim?.play();
  }

  onCreate() {
    AudioMgr.inst.playOneShot(globalThis.sound.btnClickSound);
    director.loadScene("TableScene");
  }
}
