import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  Quat,
  tween,
  Vec2,
  Vec3,
} from "cc";

import { chunk } from "lodash-es";

const { ccclass, property } = _decorator;

@ccclass("TableMgr")
export class TableMgr extends Component {
  @property({ type: Prefab })
  public pokerPrefab: Prefab = null!;

  private cards: Node[] = [];

  private seats: Node[] = [];

  onLoad() {
    this.createPocker();
  }

  start() {
    this.handleSeats();
  }

  createPocker() {
    for (let i = 9; i >= 0; i--) {
      if (i < 3) {
        this.seats.push(this.node.getChildByName(`Seat${i}`));
      }
      const pocker: Node = instantiate(this.pokerPrefab);
      pocker.active = false;
      this.cards.push(pocker);
    }
  }

  handleSeats() {
    const cards = chunk(this.cards, 3);

    setTimeout(async () => {
      for (const [i, seat] of this.seats.entries()) {
        await this.dealCards(seat, cards[i]);
      }
    }, 500);
  }

  async dealCards(seat: Node, cards: Node[]): Promise<void> {
    const dealNode = this.node.getChildByName("Deal");
    const dealPosition = dealNode.getPosition();
    let seatPosition = seat.getPosition();

    for (const [index, cardNode] of cards.entries()) {
      cardNode.setParent(this.node);

      seatPosition.x += 40;
      // 将扑克牌从发牌位置移动到玩家手中的位置
      await new Promise<void>((resolve) => {
        tween(cardNode)
          .call(() => {
            cardNode.setPosition(dealPosition);
            cardNode.active = true;
            cardNode.setScale(0.5, 0.5);
          })
          .to(
            0.5,
            {
              scale: new Vec3(1, 1, 0),
              position: seatPosition,
            },
            {
              easing: "smooth",
            }
          )
          .call(() => {
            resolve();
          })
          .start();
      });
    }
  }
}
