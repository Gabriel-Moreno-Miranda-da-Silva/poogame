interface action {
    name: string;
    user: character;
    target: character;
    coins: number;
    chance: number;
    activate: number;
    Execute(): void;
    Special(): void;
}

class character{
    public name: string;
    public id: number;
    private hpCurrent: number;
    private hpMax: number;
    private attackPwr: number;
    private defensePwr: number;
    private speed: number;
    private actions: action[];

  constructor(
    hpMax: number,
    attackPwr: number,
    defensePwr: number,
    speed: number,
    actions: action[] = []
  ) {
    this.hpMax = hpMax;
    this.hpCurrent = hpMax;
    this.attackPwr = attackPwr;
    this.defensePwr = defensePwr;
    this.speed = speed;
    this.actions = actions;
  }

  private executeByIndex(target: character, index: number) {
    const action = this.actions[index]

    if(action) {
        action.user = this
        action.target = target
        const coins = coinRoll(action.coins, action.chance)
        if(coins >= action.activate) {
            action.Special()
        }
        else {
            action.Execute()
        }
    }
  }

  private roll(min: number, max: number): number {
    return Math.floor(Math.random()*(max-min+1) + min);
}
  
  private verifyChance(chance: number): boolean {
    const roll = this.roll(1, 100)
    return roll <= chance
  }

  private coinRoll(coins: number, chance: number): number {
    let count = 0
    for(let i=0; i<coins; i++) {
        if(this.verifyChance(chance)) {
            count = count + 1
        }
    }
    return count
  }

  action1 (target: character): void {
    this.executeByIndex(target, 0)
  }

  action2 (target: character): void {
    this.executeByIndex(target, 1)
  }

  action3 (target: character): void {
    this.executeByIndex(target, 2)
  }
}





