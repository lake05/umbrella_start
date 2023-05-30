import { _decorator, Component, Node, tween } from "cc";
import { CreateRoom } from "./CreateRoom";
const { ccclass, property } = _decorator;

@ccclass("HallMgr")
export class HallMgr extends Component {
  @property(Node)
  createRoom: Node = null!;

  onCreateRoomClick() {
    this.createRoom.getComponent(CreateRoom).onOpenClick();
  }
}
