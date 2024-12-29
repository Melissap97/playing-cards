import { IMonster } from "../interfaces/monster.interface";
import { MonsterType } from "../utils/monster.utils";

export class Monster implements IMonster{

    id: number = -1;
    name: string = "My Monster";
    image: string = "/pikachu.png";
    type: MonsterType = MonsterType.ELECTRIC;
    hp: number = 60;
    figureCaption: string = "N°001 Monster";

    attackName: string = "Geo Impact";
    attackStrength: number = 60;
    attackDescription: string = "This is a long description of a monster attack. Probably something to do with electricity..."

    copy(): Monster {
        return Object.assign(new Monster(), this);
    }
    static fromJson(monsterJson: IMonster): Monster {
        return Object.assign(new Monster(), monsterJson);
    }

    toJson(): IMonster {
        const monsterJson: IMonster = Object.assign({}, this);
        delete monsterJson.id;
        return monsterJson;
    }
}