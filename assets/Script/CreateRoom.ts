import { _decorator, Component, Animation } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CreateRoom")
export class CreateRoom extends Component {
  @property(Animation)
  BodyAnim: Animation = null;

  onCloseClick() {
    this.node.active = false;
    this.BodyAnim?.play();
  }

  onOpenClick() {
    this.node.active = true;
    this.BodyAnim?.play();
  }

  onCreate() {
    console.log(
      "🚀 ~ file: CreateRoom.ts:10 ~ CreateRoom ~ onCreate ~ onCreate:"
    );
  }
}
