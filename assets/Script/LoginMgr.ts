import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoginMgr")
export class LoginMgr extends Component {
  start() {}

  public onGuestLoginClick() {
    director.loadScene("HallScene");
  }
}
