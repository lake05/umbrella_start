import {
  _decorator,
  Component,
  director,
  Node,
  Label,
  AudioSource,
  assert,
  AudioClip,
} from "cc";
const { ccclass, property } = _decorator;

enum SwitchType {
  ON = "开启音乐",
  OFF = "关闭音乐",
}

@ccclass("LoginMgr")
export class LoginMgr extends Component {
  @property(AudioClip)
  public btnClip: AudioClip = null!;

  @property(AudioSource)
  public _audioSource: AudioSource = null!;

  onLoad() {
    const audioSource = this.node.getComponent(AudioSource)!;
    assert(audioSource);
    this._audioSource = audioSource;
  }

  onSoundSwitchClick(e) {
    this._audioSource.playOneShot(this.btnClip, 1);
    const target = (e.target as Node).getComponentInChildren(Label) as Label;
    if (target.string === SwitchType.ON) {
      target.string = SwitchType.OFF;
      this._audioSource.play();
    } else {
      target.string = SwitchType.ON;
      this._audioSource.pause();
    }
  }

  onGuestLoginClick() {
    this._audioSource.stop();
    this._audioSource.playOneShot(this.btnClip, 1);
    director.loadScene("HallScene");
  }
}
